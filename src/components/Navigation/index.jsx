import React, {Component} from 'react';
import logo from './logo.png';
import './index.less';

export default class Index extends Component {

  render() {
    
    return (
      <div className="navigation-main">
        <div className="logo">
          <img src={logo} />
        </div>
        <ul>
          <li><a href="./index.html">主页</a></li>
          <li><a href="./aboutHis.html">关于他</a></li>
          <li><a href="./about.html">关于她</a></li>
          <li><a href="./react.html">React组件</a></li>
        </ul>
      </div>
      )
  }
}