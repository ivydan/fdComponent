import React, {Component} from 'react';
import './index.less';

export default class Index extends Component {
	constructor(props) {
		super(props);
		this.state={};
	}

	render() {

		return (
			<div className="Footer-main">
				<div className="fe-auth">Autor:776057569@qq.com</div>
				<div className="fe-auth">Autor:543469916@qq.com</div>
				<div className="fe-footer">
					Copyright © 2016
					<a href="http://www.miitbeian.gov.cn/">浙ICP备16036051号</a>
				</div>
			</div>
		);
	}
}