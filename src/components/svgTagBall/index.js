import React from 'react';
import './index.css';

export default class SvgTagBall extends React.Component {
  constructor(props) {
    super(props);
    this.svgWidth = 920;
    this.svgHeight = 300;
    this.maxRadius = 35;
    this.sepsilon = 1;
    this.padding = 10;
    this.distant = 30;
    this.delay = 10;
    this.balls = [];
    this.texts = [];
    this.state = {
      position: [
        {
          text: 'MIA',
        },
        {
          text: 'MIC',
        },
        {
          text: 'MIW',
        },
        {
          text: 'MIQ',
        },
        {
          text: 'MIS',
        },
        {
          text: 'MIR',
        },
        {
          text: 'MIG',
        },
      ],
    };
    this.CONST_OFFSET = 0.2;
    this.positions = this.getPositions();
  }

  getPositions() {
    var cols = Math.floor(this.svgWidth / ((this.maxRadius + this.padding) * 2));
    var rows = Math.floor(this.svgHeight / ((this.maxRadius + this.padding) * 2));
    var positions = [];
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        let position = {};
        position.x =
          i === 0
            ? this.maxRadius + this.padding
            : (this.maxRadius + this.padding) * 2 * i + (this.maxRadius + this.padding);
        position.y =
          j === 0
            ? this.maxRadius + this.padding
            : (this.maxRadius + this.padding) * 2 * j + (this.maxRadius + this.padding);
        positions.push(position);
      }
    }
    positions.sort(function() {
      return Math.random() - 0.5;
    });
    return positions;
  }

  componentDidMount() {
    this.svgElement = this.refs.svgElement;
    this.init();
  }

  init() {
    if (this.svgSupport()) {
      this.createElement();
      this.appendElement();
    }
  }

  tick() {
    //move
    if (this.balls && this.balls.length > 0) {
      for (var i = 0; i < this.balls.length; i++) {
        this.texts[i].setAttribute('x', this.balls[i].cx.baseVal.value);
        this.texts[i].setAttribute('y', this.balls[i].cy.baseVal.value + 5);
        this.move(this.balls[i]);
        this.getWallCollision(this.balls[i]);
        this.getBallCollision(this.balls[i]);
      }
    }
  }

  move(ball) {
    ball.cx.baseVal.value += ball.v.cx;
    ball.cy.baseVal.value += ball.v.cy;
  }

  ball_cx(ball) {
    return ball.cx.baseVal.value;
  }
  ball_cy(ball) {
    return ball.cy.baseVal.value;
  }
  ball_r(ball) {
    return ball.r.baseVal.value;
  }

  getBallCollision(thisBall) {
    for (var i = 0, thatBall = this.balls; i < thatBall.length; i++) {
      if (thisBall.i === i) continue;
      if (this.getCheckCollision(thisBall, thatBall[i])) {
        this.setBallCollistion(thisBall, thatBall[i]);
      }
    }
  }
  setBallCollistion(thisBall, thatBall) {
    let Vab = this.diff(thisBall.v, thatBall.v);
    let n = this.collisionN(thisBall, thatBall);

    let Ma = this.raduisToMass(this.ball_r(thisBall));
    let Mb = this.raduisToMass(this.ball_r(thatBall));

    let f_numberator = -(1 + this.sepsilon) * this.dot(Vab, n);
    let f_denominator = this.dot(n, n) * (1 / Ma + 1 / Mb);
    let f = f_numberator / f_denominator;
    thisBall.v = this.add(thisBall.v, this.multi(n, f / Ma));
    thatBall.v = this.diff(thatBall.v, this.multi(n, f / Mb));
  }

  collisionN(ts, ta) {
    let gv = new this.Vetor(0, 0);

    let delta_x = this.ball_cx(ta) - this.ball_cx(ts);
    let delta_y = this.ball_cy(ta) - this.ball_cy(ts);

    let theta = Math.atan2(delta_y, delta_x);
    gv.cx = Math.cos(theta);
    gv.cy = Math.sin(theta);

    return gv;
  }

  diff(ts, ta) {
    let gv = new this.Vetor(0, 0);
    gv.cx = ts.cx - ta.cx;
    gv.cy = ts.cy - ta.cy;

    return gv;
  }

  raduisToMass(ballRadius) {
    return Math.PI * (ballRadius * ballRadius);
  }

  dot(ts, ta) {
    return ts.cx * ta.cx + ts.cy * ta.cy;
  }

  add(ts, ta) {
    let gv = new this.Vetor(0, 0);

    gv.cx = ts.cx + ta.cx;
    gv.cy = ts.cy + ta.cy;

    return gv;
  }

  multi(t, s) {
    let gv = new this.Vetor(0, 0);

    gv.cx = s * t.cx;
    gv.cy = s * t.cy;

    return gv;
  }

  getCheckCollision(thisBall, thatBall) {
    let delta_x = this.ball_cx(thisBall) - this.ball_cx(thatBall);
    let delta_y = this.ball_cy(thisBall) - this.ball_cy(thatBall);

    let d = Math.sqrt(delta_x * delta_x + delta_y * delta_y);

    return d < this.ball_r(thisBall) + this.ball_r(thatBall);
  }

  getWallCollision(ball) {
    if (
      this.ball_cx(ball) + this.ball_r(ball) > this.svgWidth ||
      this.ball_cx(ball) - this.ball_r(ball) < 0
    ) {
      ball.v.cx = -ball.v.cx;
    }

    if (
      this.ball_cy(ball) + this.ball_r(ball) > this.svgHeight ||
      this.ball_cy(ball) - this.ball_r(ball) < 0
    ) {
      ball.v.cy = -ball.v.cy;
    }
  }

  createElement() {
    var nowElement, textElement;
    for (var i = 0; i < this.state.position.length; i++) {
      // ball
      nowElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      nowElement.i = i;
      nowElement.id = 'svgE' + i;
      nowElement.cx.baseVal.value = this.positions[i].x;
      nowElement.cy.baseVal.value = this.positions[i].y;
      nowElement.r.baseVal.value = this.maxRadius;
      nowElement.setAttribute('fill', '#4f0a72');
      nowElement.strokeWidth = '1';
      nowElement.v = new this.Vetor(this.responseEle(), this.responseEle());
      this.balls[i] = nowElement;
      // Text
      textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textElement.i = i;
      textElement.id = 'svgT' + i;
      textElement.setAttribute('x', this.positions[i].x);
      textElement.setAttribute('y', this.positions[i].y + 5);
      textElement.setAttribute('text-anchor', 'middle');
      textElement.setAttribute('fill', '#fff');
      //textElement.setAttribute("font-weight", "600");
      textElement.setAttribute('font-size', '20px');
      textElement.innerHTML = this.state.position[i].text;
      this.texts[i] = textElement;
    }
  }

  responseEle() {
    return this.reEle(-this.getNewVetor(), this.getNewVetor());
  }

  reEle(min, max) {
    return Math.random() * (max - min) + min;
  }

  getNewVetor() {
    return this.distant / 1000 * this.delay;
  }

  Vetor(cxCom, cyCom) {
    this.cx = cxCom;
    this.cy = cyCom;
  }

  appendElement() {
    let self = this;
    let gElement = this.refs.gElement;
    for (var i = 0; i < self.balls.length; i++) {
      gElement.appendChild(self.balls[i]);
      gElement.appendChild(self.texts[i]);
    }
  }

  svgSupport() {
    return this.svgElement.namespaceURI == 'http://www.w3.org/2000/svg';
  }

  getTagBall() {
    var position = this.state.position;
    var tagArray = [];
    position.forEach(function(item, index) {
      tagArray.push(
        <g key={'svgTag-' + index}>
          <circle cx={item.x} cy={item.y} r={item.r} stroke="blue" strokeWidth="1" fill="#4f0a72" />
          <text x={item.x - 12} y={item.y + 5} fill="#ffffff">
            {item.text}
          </text>
        </g>,
      );
    });

    return tagArray;
  }

  render() {
    let props = this.props;
    return (
      <div className="fe-svg-tall-ball-content">
        <svg
          ref="svgElement"
          width={this.svgWidth || props.width || 920}
          height={this.svgHeight || props.height || 300}
        >
          <g ref="gElement">
            <rect
              width={this.svgWidth || props.width || 920}
              height={this.svgHeight || props.height || 300}
              fill="transparent"
              x="0"
              y="0"
              rx="20"
              ry="20"
            />
          </g>
        </svg>
      </div>
    );
  }
}
