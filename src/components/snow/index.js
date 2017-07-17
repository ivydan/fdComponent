import React, { Component } from 'react';
import { raf, height, width } from '../util/common';
// import './index.less';
var SNOW = function(width, height, center, toRandomize) {
  this.width = width;
  this.height = height;
  this.center = center;
  this.init(toRandomize);
};
SNOW.prototype = {
  RADIUS: 20,
  OFFSET: 4,
  INIT_POSITION_MARGIN: 20,
  COLOR: 'rgba(255, 255, 255, 0.8)',
  TOP_RADIUS: { MIN: 1, MAX: 3 },
  SCALE: { INIT: 0.04, DELTA: 0.01 },
  DELTA_ROTATE: { MIN: -Math.PI / 180 / 2, MAX: Math.PI / 180 / 2 },
  THRESHOLD_TRANSPARENCY: 0.7,
  VELOCITY: { MIN: -1, MAX: 1 },
  LINE_WIDTH: 2,
  BLUR: 10,

  init: function(toRandomize) {
    this.setParameters(toRandomize);
    this.createSnow();
  },
  setParameters: function(toRandomize) {
    if (!this.canvas) {
      this.radius = this.RADIUS + this.TOP_RADIUS.MAX * 2 + this.LINE_WIDTH;
      this.length = this.radius * 2;
      this.canvas = document.getElementById('FireWork');
      this.context = this.canvas.getContext('2d');
    }
    this.topRadius = this.getRandomValue(this.TOP_RADIUS);

    var theta = Math.PI * 2 * Math.random();

    this.x = this.center.x + this.INIT_POSITION_MARGIN * Math.cos(theta);
    this.y = this.center.y + this.INIT_POSITION_MARGIN * Math.sin(theta);
    this.vx = this.getRandomValue(this.VELOCITY);
    this.vy = this.getRandomValue(this.VELOCITY);

    this.deltaRotate = this.getRandomValue(this.DELTA_ROTATE);
    this.scale = this.SCALE.INIT;
    this.deltaScale = 1 + this.SCALE.DELTA * 500 / Math.max(this.width, this.height);
    this.rotate = 0;

    if (toRandomize) {
      for (var i = 0, count = Math.random() * 1000; i < count; i++) {
        this.x += this.vx;
        this.y += this.vy;
        this.scale *= this.deltaScale;
        this.rotate += this.deltaRotate;
      }
    }
  },
  getRandomValue: function(range) {
    return range.MIN + (range.MAX - range.MIN) * Math.random();
  },
  createSnow: function() {
    this.context.clearRect(0, 0, this.length, this.length);

    this.context.save();
    this.context.beginPath();
    this.context.translate(this.radius, this.radius);
    this.context.strokeStyle = this.COLOR;
    this.context.lineWidth = this.LINE_WIDTH;
    this.context.shadowColor = this.COLOR;
    this.context.shadowBlur = this.BLUR;

    var angle60 = Math.PI / 180 * 60,
      sin60 = Math.sin(angle60),
      cos60 = Math.cos(angle60),
      threshold = (Math.random() * this.RADIUS / this.OFFSET) | 0,
      rate = 0.5 + Math.random() * 0.5,
      offsetY = this.OFFSET * Math.random() * 2,
      offsetCount = this.RADIUS / this.OFFSET;

    for (var i = 0; i < 6; i++) {
      this.context.save();
      this.context.rotate(angle60 * i);

      for (var j = 0; j <= threshold; j++) {
        var y = -this.OFFSET * j;

        this.context.moveTo(0, y);
        this.context.lineTo(y * sin60, y * cos60);
      }
      for (var j = threshold; j < offsetCount; j++) {
        var y = -this.OFFSET * j,
          x = j * (offsetCount - j + 1) * rate;

        this.context.moveTo(x, y - offsetY);
        this.context.lineTo(0, y);
        this.context.lineTo(-x, y - offsetY);
      }
      this.context.moveTo(0, 0);
      this.context.lineTo(0, -this.RADIUS);
      this.context.arc(
        0,
        -this.RADIUS - this.topRadius,
        this.topRadius,
        Math.PI / 2,
        Math.PI * 2.5,
        false,
      );
      this.context.restore();
    }
    this.context.stroke();
    this.context.restore();
  },
  render: function(context) {
    context.save();

    if (this.scale > this.THRESHOLD_TRANSPARENCY) {
      context.globalAlpha = Math.max(0, (1 - this.scale) / (1 - this.THRESHOLD_TRANSPARENCY));

      if (
        this.scale > 1 ||
        this.x < -this.radius ||
        this.x > this.width + this.radius ||
        this.y < -this.radius ||
        this.y > this.height + this.radius
      ) {
        context.restore();
        return false;
      }
    }
    context.translate(this.x, this.y);
    context.rotate(this.rotate);
    context.scale(this.scale, this.scale);
    context.drawImage(this.canvas, -this.radius, -this.radius);
    context.restore();

    this.x += this.vx;
    this.y += this.vy;
    this.scale *= this.deltaScale;
    this.rotate += this.deltaRotate;
    return true;
  },
};

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.height =
      window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.width =
      window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    this.INIT_HUE = 180;
    this.DELTA_HUE = 0.1;
    this.SNOW_COUNT = { INIT: 100, DELTA: 1 };
    this.BACKGROUND_COLOR = 'hsl(%h, 50%, %l%)';
    this.hue = this.INIT_HUE;
    this.INIT_POSITION_MARGIN = 20;
    this.VELOCITY = { MIN: -1, MAX: 1 };
    this.DELTA_ROTATE = { MIN: -Math.PI / 180 / 2, MAX: Math.PI / 180 / 2 };
    this.SCALE = { INIT: 0.04, DELTA: 0.01 };
  }
  //   static defaultProps = {
  //   }

  componentDidMount() {
    this._renderDraw();

    // this.canvas = this.refs.FireWork;
    // this.context=this.canvas.getContext("2d");

    // this.cx=this.width/2;
    // this.cy=this.height/2;
    // this.center = {x : this.width / 2, y : this.height / 2};
    // this.countRate =  this.width * this.height / 500 / 500;
    // this.radius = Math.sqrt(this.center.x * this.center.x + this.center.y * this.center.y);
    // this.hue = this.INIT_HUE;
    // this.snows = [];
    // this.createSnow(this.SNOW_COUNT.INIT * this.countRate, true);

    // let self = this;
    // var lastTime = 0;
    // var vendors = ['webkit', 'moz'];
    // for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    //     window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    //     window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // name has changed in Webkit
    //         window[vendors[x] + 'CancelRequestAnimationFrame'];
    // }

    // if (!window.requestAnimationFrame) {
    //     window.requestAnimationFrame = (callback, element) => {
    //         var currTime = new Date().getTime();
    //         var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
    //         var id = window.setTimeout(function() {
    //             this._renderDraw(currTime + timeToCall);
    //         }, timeToCall);
    //         lastTime = currTime + timeToCall;
    //         return id;
    //     };
    // }
    // if (!window.cancelAnimationFrame) {
    //     window.cancelAnimationFrame = (id) => {
    //         clearTimeout(id);
    //     };
    // }

    // window.requestAnimationFrame(function tick() {
    //     // Animation logic
    //     self._renderDraw();
    //     window.requestAnimationFrame(tick)
    // });
  }

  createSnow(count, toRandomize) {
    for (var i = 0; i < count; i++) {
      this.snows.push(new SNOW(this.width, this.height, this.center, toRandomize));
    }
  }

  _getRandomValue(range) {
    return range.MIN + (range.MAX - range.MIN) * Math.random();
  }

  _renderDraw() {
    let canvas = this.refs.Snow,
      context = canvas.getContext('2d'),
      center = { x: this.width / 2, y: this.height / 2 },
      radius = Math.sqrt(center.x * center.x + center.y * center.y);

    canvas.width = this.width;
    canvas.height = this.height;

    //创建雪花

    let topRadius = this._getRandomValue({ MIN: 1, MAX: 3 }),
      randomDeg = Math.PI * 2 * Math.random(),
      snow = {
        x: center.x + this.INIT_POSITION_MARGIN * Math.cos(randomDeg),
        y: center.y + this.INIT_POSITION_MARGIN * Math.sin(randomDeg),
        vx: this.getRandomValue(this.VELOCITY),
        vy: this.getRandomValue(this.VELOCITY),
        deltaRotate: this.getRandomValue(this.DELTA_ROTATE),
        scale: this.SCALE.INIT,
        deltaScale: 1 + this.SCALE.DELTA * 500 / Math.max(this.width, this.height),
        rotate: 0,
      };

    console.log(snow);

    //画布背景色填充
    var gradient = context.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius),
      backgroundColor = this.BACKGROUND_COLOR.replace('%h', this.hue);

    gradient.addColorStop(0, backgroundColor.replace('%l', 30));
    gradient.addColorStop(0.2, backgroundColor.replace('%l', 20));
    gradient.addColorStop(1, backgroundColor.replace('%l', 5));

    context.fillStyle = gradient;
    context.fillRect(0, 0, this.width, this.height);

    this.hue += this.DELTA_HUE;
    this.hue %= 360;

    // for(var i = this.snows.length - 1; i >= 0; i--){
    // 	if(!this.snows[i].render(this.context)){
    // 		this.snows.splice(i, 1);
    // 	}
    // }
    // this.hue += this.DELTA_HUE;
    // this.hue %= 360;
    // debugger;
    // this.createSnow(this.SNOW_COUNT.DELTA, false);
  }

  render() {
    return (
      <div className="fireWork-container">
        <canvas id="Snow" ref="Snow" />
      </div>
    );
  }
}
