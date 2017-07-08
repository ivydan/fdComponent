import React from 'react';
import "./index.css";

export default class Index extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		let className = this.props.className ? `FD-font-light ${this.props.className}` :"FD-font-light"
		return (
			<div className={className}>
				<span className="lignt-txt">{this.props.test}</span>
				<div className="lignt-bgc"></div>
			</div>
			)
	}
}
