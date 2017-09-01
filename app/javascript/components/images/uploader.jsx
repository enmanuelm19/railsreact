import React from 'react';
import reqwest from 'reqwest';
import LinearProgress from 'material-ui/LinearProgress';

const styles = {
  image:{
    height: '150px'
  },
  progressBar:{
    height: '5px',
    width: '400px',
    backgroundColor:'#222',
    position: 'relative'
  }
}

export class Uploader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      progress: 0,
      id: 0,
      imageURL: ""
    }
  }

  componentDidMount(){
    this.getImageURL();
    this.upload();
  }

  getImageURL(){
    let imageURL = URL.createObjectURL(this.props.image);
    this.setState({
      imageURL: imageURL
    })
  }

  upload(){
    //AJAX oldschool
    let xhr = new XMLHttpRequest();
    xhr.open('POST','/images.json');

    xhr.onload = (ev)=>{
      if(ev.lengthComputable){
        let progress = (ev.loaded / ev.total) * 100;
        this.setState({
          progress: progress
        })
      }
    }

    xhr.onreadystatechange = (ev)=>{
      if(xhr.readyState == 4){
        this.setState({
          progress: 100
        })

        let response = JSON.parse(xhr.response);
        this.props.notify(response.id);
      }
    }

    xhr.setRequestHeader('X-CSRF-Token', window.authTokenMyPersonalApp.token);

    xhr.send(this.formData());
  }

  componentWillUnmount() {
    this.setState({
      progress: 0
    })
  }

  formData(){
    let formData = new FormData();
    formData.append('image[image_file]', this.props.image);
    return formData;
  }

  image(){
    if(this.state.imageURL){
      return <img src={this.state.imageURL} style={styles.image} ref="image"/>
    }
    return "";
  }

  getImageWidth(){
    if(this.refs.image){
      if(this.refs.image.width){
        return this.refs.image.width;
      }
      return '';
    }
    return "";
  }

  render(){
    return(
      <div>
        <div>{this.image()}</div>
        <LinearProgress mode="determinate" value={this.state.progress} style={{width: this.getImageWidth()}}/>
      </div>
    )
  }
}
