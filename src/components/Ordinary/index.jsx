/**
* layout ordinary
*
*/

import React, {Component} from 'react';
import Circle from './circle';
import './index.less';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.heigth = window.innerHeight 
                || document.documentElement.clientHeight 
                || document.body.clientHeight;
  }

  componentDidMount() {

  }

  render() {

    let height = this.heigth;
    let config = this.props.config.layout;
    let intro = config.intro && config.intro.map(function(item,index){
      let data = Object.keys(item)[0];
      return (
        <li key={'intro'+ index} style={{"animationDelay": (index*0.3)+"s"}}>
          <lable>{data}:</lable>
          <span>{item[data]}</span>
        </li>
        )
    });
    return (
      <div id="layout-ordinary-main">
        <div className="layout-bg" style={{height: height+'px'}}></div>
        <div className="layout-content" style={{height: height+'px'}}>
          <Circle conTitle={config.title1}/>
          <div className="layout-hel">{config.title2}</div>
          <div className="layout-name">{config.title3}<span>,</span></div>
          <div className="layout-intro">{config.title4}</div>
          <ul className="layout-bot">
            {intro}
          </ul>
        </div>
      </div>
        
      )
  }
}