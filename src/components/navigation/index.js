import React, { Component } from 'react';
import FontLight from '../fontLight';
import './index.less';

export default class Index extends Component {
  static defaultProps = {
    logo: <FontLight test="dict-life" color={['#6688ef', '#71ef30']} />,
  };
  render() {
    let { logo } = this.props;
    return (
      <div className="navigation-container">
        <div className="navigation-main">
          <div className="logo">
            {logo}
          </div>
          <ul>
            <li>
              <a href="./index.html">主页</a>
            </li>
            <li>
              <a href="./aboutHis.html">关于他</a>
            </li>
            <li>
              <a href="./about.html">关于她</a>
            </li>
            <li>
              <a href="./react.html">React组件</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
