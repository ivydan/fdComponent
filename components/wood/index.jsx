import React from 'react';
import "./index.css";

export default class Index extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			<div className="fd-wood">
				<div className="wood-content">
					<div className="wood-con-a"></div>
					<div className="wood-con-b"></div>
					<div className="wood-con-c"></div>
				</div>
			</div>
			)
	}
}
