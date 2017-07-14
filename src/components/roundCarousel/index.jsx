
import React from 'react';
import image1 from './header1.jpg';
import './index.css';

//const $ = require('jquery');

export default class RoundCarousel extends React.Component{
	constructor(props) {
		super(props);
		this.stateArray=[];
		this.stateFalg = 0;
		this.state = {
      stateIndex : 0
    };
	}
	
	componentDidMount(){
		
	}

	addEventListenner(index){
	  let newIndex = index - this.state.stateIndex ;
	  if (newIndex === 1 || newIndex === -4) {
	  	this.stateArray.unshift(this.stateArray.pop());
	  } else if (newIndex === -1 || newIndex === 4) {
	  	this.stateArray.push(this.stateArray.shift());
	  } else {
	  	return false;
	  }
	  
	  this.setState({
	  	stateIndex : index
	  })
	}
	
	getChildrenNodes(){
		let style = {
			listStyle: 'none',
			width: '100%',
			height: '280px',
			margin: '0 auto',
			padding: '0',
			position: 'relative',
		};
		let self = this;
		let width = 510;
		let height = 292;
		let length = this.props.children.length;
		let mid = Math.floor(this.props.children.length / 2);

		if (this.stateFalg === 0) {
			React.Children.map(this.props.children, function (child,i) { 	
	    	let left = (i !== 0) ? ( i <= mid ? (i*40) : (750 - (length - i)*40)) : (350);
	    	let top = (i !== 0) ? ( i <= mid ? (i*45) : (length - i)*45) : 0;
	    	let zIndex = (i !== 0) ? ( i <= mid ? (10-i) : 10-(length - i)) : (10);
	    	let opacity = (i !== 0) ? ( i <= mid ? (1-i*0.2) : 1-(length - i)*0.2) : (1);
	    	let newStyle = {
	    		position: 'absolute',
			    left: left +'px',
			    top: top+'px',
			    width: width+'px',
			    height: height+'px',
			    opacity:opacity,
			    zIndex: zIndex,
			    fontSize: '12px'
	    	};
	    	self.stateArray.push(newStyle);
	    });
			this.stateFalg = 1;
		}
		return (
		    <ul className="round" ref="roundCarousel" style={style}>
		    {
		        React.Children.map(this.props.children, function (child,i) {
	            return <li style={self.stateArray[i]} 
	            					 onClick={self.addEventListenner.bind(self,i)}
	            					 className='round-li'>
	            	<img src={image1} alt="" />
	            	{/*<div style={{position: 'absolute',top:'0',color:'#000',fontSize:'20px'}}>
	            		{i}
	            	</div>*/}
	            </li>;
		        })
		    }
		    </ul>
		);
	}
	
	render(){
		return (
			<div className="fe-round">
				{this.getChildrenNodes()}
			</div>
			);
	}
}