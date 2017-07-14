import React, {Component} from 'react';
import './index.less';

export default class Circle extends Component {

	render() {
		let props = this.props;
		let style;
		if(props.conStyle){
			style = props.conStyle;
		}
		return (
			<div className="layout-b">
        <div className="layout-cir" style={style}>
          <span>{props.conTitle}</span>
        </div>
      </div>
			);
	}
}