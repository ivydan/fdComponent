import React from 'react';
import "./index.css";

export default class Index extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		let className = this.props.className ? 
			`fd-font-light ${this.props.className}` :
			"fd-font-light";
		let { test, color } = this.props;
		return (
			<div className={className}>
				<span className="lignt-txt" data-text={test}>{test}</span>
				<div className="lignt-bgc" style={
					color ? {background: `linear-gradient(45deg, ${color[0]}, ${color[1]})`}
					:{}
				}></div>
				<div className="lignt-ani"></div>
			</div>
			)
	}
}
