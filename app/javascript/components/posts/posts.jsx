import React from 'react';
import {Post} from './post';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class Posts extends React.Component {

  constructor(props){
    super(props);

    this.state = {
     posts: []
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      posts: nextProps.posts
    })
  }

  publications(){
    if(this.state.posts){
      //Functional way
      return this.state.posts.map(post => {
        return <Post key={post.id} post={post}></Post>;
      })
      /*
      POO way
      let posts = [];
      for (var i = 0; i < this.props.posts.length; i++) {
        let post = this.props.posts[i];
        posts.push(<Post html_content={post.html_content}></Post>);
      }
      return posts;*/
    }
    return "";
  }

  componentDidMount(){
    this.subscribe();
  }

  subscribe(){
    App.post = App.cable.subscriptions.create("PostChannel",{
      connected: ()=>{
        console.log("Subscrito a la websocket");
      },
      disconnected: ()=>{

      },
      received: (data)=>{
         let post = JSON.parse(data.data);
         this.setState({
           posts: [post].concat(this.state.posts)
         })
      }
    })

  }

  render(){
    return(
      <MuiThemeProvider>
        <div>
          {this.publications()}
        </div>
      </MuiThemeProvider>
    );
  }
}
