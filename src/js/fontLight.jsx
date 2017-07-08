import React from 'react';
import ReactDom from 'react-dom';

import Font from '../../components/fontLight/index';
import FontTest from '../../components/fontTest/index';
import Wood from '../../components/wood/index';

import "./index.css";

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<div className="fd-title">
					<Font test="WebSiteAB" color={["#6688ef", "#71ef30"]} />
				</div>
				{/*<Wood />*/}
				<div className="fd-flow">
					<span className="flow-comm flow-c">css</span>
					<span className="flow-comm flow-a">abc</span>
					<span className="flow-comm flow-x">xml</span>
				</div>
				
			</div>
		)
	}
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDom.render(<App />, app);