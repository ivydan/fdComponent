import React from 'react';
import './index.css';

export default class TagBall extends React.Component {
  constructor() {
    super();
    this.tagSpan = null;
  }

  contentTag() {
    var tag = [
      'ITEM',
      'development',
      'better',
      'DevTools',
      'React',
      'Download',
    ].map((item, index) => {
      return (
        <span className={'tag-span-' + index} key={'tagConent-' + index} ref={'tagCon' + index}>
          {item}
        </span>
      );
    });

    return tag;
  }

  componentDidMount() {}

  render() {
    return (
      <div className="fe-tag-ball-content">
        {this.contentTag()}
      </div>
    );
  }
}
