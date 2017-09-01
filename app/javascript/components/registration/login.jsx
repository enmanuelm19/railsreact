import React from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import {Base,styles} from './base';
import reqwest from 'reqwest';


export class Login extends Base {

  /*syncEmail(ev){
    let element = ev.target;
    let value = element.value;

    this.setState({
      email: value
    })
  }*/

  submit(){
    reqwest({
      url: '/users/sign_in.json', //it's defined by devise
      method: 'post',
      data: {
        user: {
          email: this.state.email,
          password: this.state.password,
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
    const errorMessage = JSON.parse(err.response).error;
    this.setState({
      error: errorMessage
    })
  }

  render(){
    return (
      <MuiThemeProvider>
        <Formsy.Form onValid={()=>this.enableSubmitBtn()} onInvalid={()=>this.disableSubmitBtn()} onValidSubmit={() => this.submit()}>
          <div>{this.state.error}</div>
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
            <RaisedButton type="submit" label="Iniciar sesión" disabled={!this.state.canSubmit}
              style={styles.buttonTop} backgroundColor={styles.green} labelColor='#ffffff'
               />
             <a href="#" style={styles.leftSpace} onClick={this.props.toggle}> Crear cuenta </a>
          </div>
        </Formsy.Form>
      </MuiThemeProvider>
    );
  }
}
