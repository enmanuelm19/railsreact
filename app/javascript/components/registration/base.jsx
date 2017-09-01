import React from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import {blueA400,redA400,green600} from 'material-ui/styles/colors';


export const styles = {
  buttonTop:{
    marginTop: '1em'
  },
  underlineStyle:{
    borderColor: blueA400
  },
  floatingLabelFocusStyle:{
    color: blueA400
  },
  leftSpace:{
    marginLeft: '1em'
  },
  red: redA400,
  green: green600
}

export class Base extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      canSubmit: true,
      email: '',
      password: '',
      passwordConfirmation: '',
      error: ''
    };
  }

  enableSubmitBtn(){
    this.setState({
      canSubmit: true
    });
  }

  disableSubmitBtn(){
    this.setState({
      canSubmit: false
    });
  }

  reload(){
    window.location.href = window.location.href;
  }

  syncField(ev, fieldName){
    let element = ev.target;
    let value = element.value;

    let jsonState={};
    jsonState[fieldName] = value;
    this.setState(jsonState);
  }
}
