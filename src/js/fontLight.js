import React from 'react';
import './FontLight.css';

export default class FontLight extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let className = this.props.className
      ? `fd-font-light ${this.props.className}`
      : 'fd-font-light';
    let test = this.props.test;
    let color = this.props.color;
    return (
      <div className={className}>
        <span className="lignt-txt" data-text={test}>
          {test}
        </span>
        <div
          className="lignt-bgc"
          style={color ? { background: `linear-gradient(45deg, ${color[0]}, ${color[1]})` } : {}}
        />
        <div className="lignt-ani" />
      </div>
    );
  }
}
