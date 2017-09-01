import React from 'react';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import reqwest from 'reqwest';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {redA400,blueA400,green600} from 'material-ui/styles/colors';
import {markdown} from 'markdown';
import ImageAddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import {Uploader} from '../images/uploader';

const styles = {
  buttonStyle:{
    marginTop: '0.5em',
    marginBottom: '1em'
  },
  displayNoneStyle:{
    display: 'none'
  }
}

export class PostForm extends React.Component {
  constructor(props) {
      super(props);

      this.openFilePicker = this.openFilePicker.bind(this);
      this.storeImageID = this.storeImageID.bind(this);
      this.state = {
        markdown_content: '',
        html_content: '',
        error: '',
        images: [],
        ids: []
      }
  }

  syncField(ev, fieldName){
    let element = ev.target;
    let value = element.value;

    let jsonState={};
    jsonState[fieldName] = value;
    this.setState(jsonState);
  }

  submit(){
    reqwest({
      url: '/posts.json',
      method: 'POST',
      data: {
        post: {
          markdown_content: this.state.markdown_content,
          html_content: markdown.toHTML(this.state.markdown_content),
          images_ids: this.state.ids
        }
      },
      headers:{
        'X-CSRF-Token':window.authTokenMyPersonalApp.token
      }
    }).then(data =>{
      this.props.add(data);
      this.refs.markdown_content.resetValue();
      this.setState({
        images: [],
        ids: []
      })
    }).catch(console.log);
  }

  handleChange(){

  }

  openFilePicker(){
    this.refs.picker.click();
  }

  handleChangeFiles(ev){
    let files = ev.target.files;
    for (var i = 0; i < files.length; i++) {
      let file = files[i];
      this.setState({
        images: this.state.images.concat([file])
      })
    }
  }

  storeImageID(id){
    this.setState({
      ids: this.state.ids.concat([id])
    })
  }

  images(){
    if(this.state.images.length > 0){
      return this.state.images.map(image => {
        return <Uploader image={image} notify={this.storeImageID}></Uploader>
      })
    }
    return "";
  }

  render(){
    return(
      <MuiThemeProvider>
        <Formsy.Form onValidSubmit={()=>this.submit()}>
          <input type="file" multiple="true" ref="picker" style={styles.displayNoneStyle} onChange={(e) => this.handleChangeFiles(e)}></input>
          <FormsyText name="post[markdown_content]"
            multiLine={true} required
            floatingLabelText="Cuentanos...."
            fullWidth={true}
            onChange={(ev) => this.syncField(ev, 'markdown_content')}
            ref="markdown_content">
          </FormsyText>
          <div>{this.images()}</div>
          <div className="text-right">
            <FlatButton icon={<ImageAddAPhoto/>}
              onClick={this.openFilePicker}></FlatButton>
            <RaisedButton type="submit" label="Publicar estado" backgroundColor={green600} labelColor='#ffffff' style={styles.buttonStyle}>
            </RaisedButton>
          </div>
        </Formsy.Form>
      </MuiThemeProvider>
    );
  }
}
