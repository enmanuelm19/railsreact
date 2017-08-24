import React from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import {Base,styles} from './base';
import reqwest from 'reqwest';

export class SignUp extends Base {

  /*syncEmail(ev){
    let element = ev.target;
    let value = element.value;

    this.setState({
      email: value
    })
  }*/
  submit(){
    reqwest({
      url: '/users.json', //it's defined by devise
      method: 'post',
      data: {
        user: {
          email: this.state.email,
          password: this.state.password,
          passwordConfirmation: this.state.passwordConfirmation
        }
      },
      headers:{
        'X-CSRF-Token': window.authTokenMyPersonalApp.token,
      }
    }).then(data => {
      console.log(data);
      this.reload();
    }).catch(err => this.handleError(err));
  }

  handleError(err){
    const jsonError = JSON.parse(err.response);
    const errors = jsonError.errors;
    let errorsResponse = [];
    for (let key in errors) {
      errorsResponse.push(<li key={key}>{errors[key]}</li>)
    }
    this.setState({
      error: errorsResponse
    })
  }

  render(){
    return (
      <MuiThemeProvider>
        <Formsy.Form onValid={()=>this.enableSubmitBtn()} onInvalid={()=>this.disableSubmitBtn()} onValidSubmit={() => this.submit()}>
          <ul>{this.state.error}</ul>
          <div>
            <FormsyText
              onChange={(e)=>this.syncField(e,"email")}
              name="email" required validations="isEmail"
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              underlineFocusStyle={styles.underlineStyle}
              validationError="Introduzca un correo electrónico válido"
              floatingLabelText="Correo electrónico" />
          </div>
          <div>
            <FormsyText
              onChange={(e)=>this.syncField(e,"password")}
              name="password"
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              underlineFocusStyle={styles.underlineStyle}
              required type="password"
              floatingLabelText="Contraseña" />
          </div>
          <div>
            <FormsyText
              onChange={(e)=>this.syncField(e,"passwordConfirmation")}
              name="passwordConfirmation"
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              underlineFocusStyle={styles.underlineStyle}
              required type="password"
              floatingLabelText="Confirmar contraseña" />
          </div>
          <div>
            <RaisedButton type="submit" label="Registro" disabled={!this.state.canSubmit}
              style={styles.buttonTop} backgroundColor={styles.red}
               />
             <a href="#" style={styles.leftSpace} onClick={this.props.toggle}> Ya tengo cuenta </a>
          </div>
        </Formsy.Form>
      </MuiThemeProvider>
    );
  }
}
