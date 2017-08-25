import React, { Component } from 'react';
import { raf, height, width } from '../util/common';

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.height =
      800 ||
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.width =
      1200 || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    this.INIT_HUE = 180;
    this.DELTA_HUE = 0.1;
    this.SNOW_COUNT = { INIT: 100, DELTA: 1 };
    this.BACKGROUND_COLOR = 'hsl(%h, 50%, %l%)';
    this.hue = this.INIT_HUE;
    this.INIT_POSITION_MARGIN = 20;
    this.VELOCITY = { MIN: -1, MAX: 1 };
    this.DELTA_ROTATE = { MIN: -Math.PI / 180 / 2, MAX: Math.PI / 180 / 2 };
    this.SCALE = { INIT: 0.04, DELTA: 0.01 };
    this.depth = 3;
    this.Color = 'rgba(255, 255, 255, 0.8)';
    this.LineWidth = 1;
    this.Blur = 10;
    this.Offset = 4;
    this.Radius = 20;
    this.TOP_RADIUS = { MIN: 1, MAX: 3 };
  }

  _renderOSnow(canvas, context, center, radius) {
    context.save();
    context.beginPath();
    context.translate(this.width/2, this.height/2   ); //重新印射画布的起始位置

    //绘制坐标
    context.moveTo(0, -300);
    context.lineTo(0, 300);
    context.stroke();
    context.moveTo(-this.width/2+100, 0);
    context.lineTo(this.width/2-100, 0);
    //end

    context.strokeStyle = this.Color;
    context.lineWidth = this.LineWidth;
    context.shadowColor = this.Color;
    context.shadowBlur = this.Blur;

    


    //绘制-----
    let angle60 = Math.PI / 180 * 60;
    let sin60 = Math.sin(angle60);
    let cos60 = Math.cos(angle60);
    let threshold = (Math.random() * this.Radius / this.Offset) | 0;
    let rate = 0.5 + Math.random() * 0.5;
    let offsetY = this.Offset * Math.random() * 2;
    let offsetCount = this.Radius / this.Offset;
    let topRadius = this._getRandomValue(this.TOP_RADIUS);

    // console.log('COMMON:',threshold);
    // for (var i = 0; i < 1; i++) {
    //   context.save();
    //   context.rotate(angle60 * i);

    //   for (var j = 0; j <= threshold; j++) {
    //     var y = -this.Offset * j;
    //     context.moveTo(0, y);
    //     context.lineTo(y * sin60, y * cos60);
    //   }
    //   for (var j = threshold; j < offsetCount; j++) {
    //     var y = -this.Offset * j,
    //       x = j * (offsetCount - j + 1) * rate;

    //     context.moveTo(x, y - offsetY);
    //     context.lineTo(0, y);
    //     context.lineTo(-x, y - offsetY);
    //   }

    //   context.moveTo(0, 0);
    //   context.lineTo(0, this.Radius);
    //   context.arc(0, -this.Radius - topRadius, topRadius, Math.PI / 2, Math.PI * 2.5, false);
    //   context.restore();
    // }

    context.stroke();
    context.restore();
  }

  componentDidMount() {
    this._renderDraw();
  }

  _getRandomValue(range) {
    return range.MIN + (range.MAX - range.MIN) * Math.random();
  }

  _renderSnowInit(){
    
  }

  _renderDraw() {
    let canvas = this.refs.Snow,
      context = canvas.getContext('2d'),
      center = { x: this.width / 2, y: this.height / 2 },
      radius = Math.sqrt(center.x * center.x + center.y * center.y);

    canvas.width = this.width;
    canvas.height = this.height;

    context.fillStyle = '#666';
    context.fillRect(0, 0, this.width, this.height);
    
    this._renderOSnow(canvas, context, center, radius);

    this._renderSnowInit(canvas, context, center, radius);

    // context.save();
    // context.strokeStyle = "#fff";
    // context.moveTo(300, 200);
    // context.lineTo(300, 250);

    // context.arc(350, 200, 10, Math.PI / 2, Math.PI * 2.5, false);
    // context.stroke();

    // context.restore();
    
    // context.save();
    // context.fillStyle = "#fff";
    // context.rotate(Math.PI/180*30);
    // context.fillRect(300, 200, 80, 2);
    // context.restore();

    // context.save();
    // context.fillStyle = "#fff";
    // context.rotate(Math.PI/180*30);
    // context.fillRect(300, 180, 80, 2);
    // context.restore();

    // context.fillStyle = "#fff";
    // context.rotate(Math.PI/180*30);
    // context.fillRect(300, 150, 80, 2);
  }

  render() {
    return (
      <div style={{padding: "20px"}}>
        <canvas id="Snow" ref="Snow" />
      </div>
    );
  }
}
