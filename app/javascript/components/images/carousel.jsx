import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import {blueA400,redA400,green600} from 'material-ui/styles/colors';
const styles = {
  image:{
    maxWidth: '100%'
  },
  container:{
    overflow: 'hidden',
    position: 'relative',
  },
  infiniteWidth:{
    whiteSpace: 'nowrap',
    position: 'relative',
    transition: 'all 0.4s'
  },
  controls:{
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  leftButton:{
    position: 'absolute',
    top: '47%',
    left: '-1.8em'
  },
  rightButton:{
    position: 'absolute',
    top: '47%',
    right: '-1.8em'
  }
}

export class Carousel extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      images: []
    }
  }

  images(){
    return this.props.images.map(image => {
      return <img style={styles.image} src={image.urls.original} />
    })
  }

  getLeftValue(){
    let styles = window.getComputedStyle(this.refs.carousel,null);
    return parseInt(styles.getPropertyValue("left"));
  }

  getContainerWidth(){
    let styles = window.getComputedStyle(this.refs.carousel.firstChild,null);
    let imgWidth = parseInt(styles.getPropertyValue("width"));
    return imgWidth * (this.props.images.length - 1);
  }

  goLeft(){
    let currentPosition = this.getLeftValue()
    let newPosition = currentPosition + 300;
    if(newPosition > 0) newPosition = 0;
    this.refs.carousel.style.left = newPosition+'px';
  }

  goRight(){
    let currentPosition = this.getLeftValue()
    let newPosition = currentPosition - 300;
    if((newPosition * -1) > this.getContainerWidth()) newPosition = -this.getContainerWidth();
    this.refs.carousel.style.left = newPosition+'px';
  }

  controls(){
    if(this.props.images.length > 1){
      return(
        <div style={styles.controls}>
          <FloatingActionButton onClick={(e)=>this.goLeft()} iconStyle={{backgroundColor: green600}} style={styles.leftButton}>
            <KeyboardArrowLeft />
          </FloatingActionButton>
          <FloatingActionButton onClick={(e)=>this.goRight()} iconStyle={{backgroundColor: green600}} style={styles.rightButton}>
            <KeyboardArrowRight />
          </FloatingActionButton>
        </div>
      );
    }
    return "";
  }
  render(){
    return(
      <div style={{position:'relative'}}>
        {this.controls()}
        <div style={styles.container}>
          <div style={styles.infiniteWidth} ref="carousel">
            {this.images()}
          </div>
        </div>
      </div>

    );
  }
}
