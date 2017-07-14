import React from 'react';
import './index.css';

export default class CanTagBall extends React.Component {
  constructor() {
    super(); // 调用父类的constructor(x, y)
    this.position = [
      {
        x: 100,
        y: 100,
        offsetX: Math.random() > 0.5 ? 1 : -1,
        offsetY: Math.random() > 0.5 ? 1 : -1,
        r: 35,
        text: 'WEB',
      },
      {
        x: 220,
        y: 210,
        offsetX: Math.random() > 0.5 ? 1 : -1,
        offsetY: Math.random() > 0.5 ? 1 : -1,
        r: 35,
        text: 'CSS',
      },
      {
        x: 320,
        y: 80,
        offsetX: Math.random() > 0.5 ? 1 : -1,
        offsetY: Math.random() > 0.5 ? 1 : -1,
        r: 35,
        text: 'WGL',
      },
      {
        x: 520,
        y: 180,
        offsetX: Math.random() > 0.5 ? 1 : -1,
        offsetY: Math.random() > 0.5 ? 1 : -1,
        r: 35,
        text: 'THR',
      },
      {
        x: 620,
        y: 80,
        offsetX: Math.random() > 0.5 ? 1 : -1,
        offsetY: Math.random() > 0.5 ? 1 : -1,
        r: 35,
        text: 'DQW',
      },
      {
        x: 860,
        y: 200,
        offsetX: Math.random() > 0.5 ? 1 : -1,
        offsetY: Math.random() > 0.5 ? 1 : -1,
        r: 35,
        text: 'REA',
      },
    ];
    this.CONST_OFFSET = 0.2;
  }

  tick() {
    //动画
    var canvas = this.refs.feBall;
    var ctx = canvas.getContext('2d');
    let self = this;
    let position = this.position;
    let positionNew;
    //animation
    for (var i = 0; i < position.length; i++) {
      position[i].x = position[i].x + self.CONST_OFFSET * position[i].offsetX;
      position[i].y = position[i].y + self.CONST_OFFSET * position[i].offsetY;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.getPosition(position);

      this.getCollisionWall(position[i]);
      this.getCollisionBall(position[i], i);
    }
  }

  getCollisionWall(position) {
    var canvas = this.refs.feBall;
    var ctx = canvas.getContext('2d');

    if (position.x + position.r > canvas.width || position.x - position.r < 0) {
      position.offsetX = -position.offsetX;
    }
    if (position.y + position.r > canvas.height || position.y - position.r < 0) {
      position.offsetY = -position.offsetY;
    }
  }

  getCollisionBall(thisPos, index) {
    var canvas = this.refs.feBall;
    var ctx = canvas.getContext('2d');
    var self = this;
    for (var i = 0; i < self.position.length; i++) {
      if (index === i) continue;
      var thatPos = self.position[i];

      if (
        Math.sqrt(
          (thisPos.x - thatPos.x) * (thisPos.x - thatPos.x) +
            (thisPos.y - thatPos.y) * (thisPos.y - thatPos.y),
        ) <
        thisPos.r + thatPos.r
      ) {
        //				console.log("sqrt:", Math.sqrt((thisPos.x - thatPos.x) * (thisPos.x - thatPos.x) +
        //					(thisPos.y - thatPos.y) * (thisPos.y - thatPos.y)
        //				));
        //				console.log(thisPos.r + thatPos.r);
        let Vab = {
          vetorX: thisPos.offsetX - thatPos.offsetX,
          vetorY: thisPos.offsetY - thatPos.offsetY,
        };
        let delta_x = thisPos.x - thatPos.x;
        let delta_y = thisPos.y - thatPos.y;
        let theta = Math.atan2(delta_y, delta_x);
        let n = {
          vetorX: Math.cos(theta),
          vetorY: Math.sin(theta),
        };
        let Ma = Math.PI * thisPos.r * thisPos.r;
        let Mb = Math.PI * thatPos.r * thatPos.r;

        let f_numberator = -(1 + 1) * (Vab.vetorX * n.vetorX + Vab.vetorY * n.vetorY);
        let f_denominator = (n.vetorX * n.vetorX + n.vetorY * n.vetorY) * (1 / Ma + 1 / Mb);
        let f = f_numberator / f_denominator;

        let VerItem = self.add(thisPos, self.multi(n, f / Ma));
        let VerItemOther = self.diff(thatPos, self.multi(n, f / Mb));
        //				console.log(VerItem);
        thisPos.offsetX = VerItem.vetorX;
        thisPos.offsetY = VerItem.vetorY;

        thatPos.offsetX = VerItemOther.vetorX;
        thatPos.offsetY = VerItemOther.vetorY;
      }
    }
  }

  diff(ts, ta) {
    let gv = {};
    gv.vetorX = ts.offsetX - ta.offsetX;
    gv.vetorY = ts.offsetY - ta.offsetY;

    return gv;
  }

  add(ts, ta) {
    var gv = {};

    gv.vetorX = ts.offsetX + ta.offsetX;
    gv.vetorY = ts.offsetY + ta.offsetY;

    return gv;
  }
  multi(t, s) {
    var gv = {};
    gv.offsetX = s * t.vetorX;
    gv.offsetY = s * t.vetorY;

    return gv;
  }

  componentDidMount() {
    var canvas = this.refs.feBall;
    var ctx = canvas.getContext('2d');
    var position = this.position;
    canvas.width = 920;
    canvas.height = 300;
    var self = this;

    // setInterval(() => {
    // 	self.getCollisionWall(position);
    // 	self.getCollisionBall(position);
    // 	ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 	self.getPosition(position);
    // }, 500)

    // this.getPosition(position);
  }

  getPosition(position) {
    var canvas = this.refs.feBall;
    var ctx = canvas.getContext('2d');
    position.forEach((item, index) => {
      ctx.beginPath();
      ctx.strokeStyle = 'blue';
      ctx.fillStyle = '#4f0a72';
      ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.font = '18px Courier New';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(item.text, item.x - 17, item.y + 5);
      ctx.closePath();
    });
  }

  render() {
    return (
      <div className="fe-can-tag-ball-content">
        <canvas className="tag-ball" ref="feBall" />
      </div>
    );
  }
}
