import React from 'react';
import WebpackerReact from 'webpacker-react';
import {Login} from 'components/registration/login';
import {SignUp} from 'components/registration/signup';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
class Registration extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showLogin: true
    }
    this.toggle = this.toggle.bind(this);
  }
  toggle(e){
    e.preventDefault();
    this.setState({
      showLogin: !this.state.showLogin
    })
  }
  render(){
    return (
      <div>
        { this.state.showLogin ? <Login toggle={this.toggle}/> : <SignUp toggle={this.toggle}/> }
      </div>
    );
  }
}

WebpackerReact.setup({Registration});
/*document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Registration />,
    document.getElementById('react-container'),
  );
});*/
