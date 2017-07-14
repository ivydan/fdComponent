import React from 'react';
import './index.css';

export default class CanTagBall extends React.Component {
  constructor() {
    super(); // 调用父类的constructor(x, y)
    this.state = {
      position: [
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
      ],
    };
    this.CONST_OFFSET = 0.2;
  }

  tick() {
    //动画
    var canvas = this.refs.feBall;
    var ctx = canvas.getContext('2d');
    let self = this;
    let position = this.state.position;
    let positionNew;
    //animation
    // let positionNew = position.map(function(item, index) {
    // 	let itemX = item.x + self.CONST_OFFSET * item.offsetX;
    // 	let itemY = item.y + self.CONST_OFFSET * item.offsetY;
    // 	return {
    // 		x: itemX,
    // 		y: itemY,
    // 		offsetX: item.offsetX,
    // 		offsetY: item.offsetY,
    // 		r: item.r,
    // 		text: item.text
    // 	};
    // });
    for (var i = 0; i < position.length; i++) {
      position[i].x = position[i].x + self.CONST_OFFSET * position[i].offsetX;
      position[i].y = position[i].y + self.CONST_OFFSET * position[i].offsetY;
    }
    // collision wall
    positionNew = this.getCollisionWall(position);
    positionNew = this.getCollisionBall(positionNew);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.getPosition(positionNew);
  }

  getCollisionBall(position) {
    var canvas = this.refs.feBall;
    var ctx = canvas.getContext('2d');
    var self = this;

    for (var i = 0; i < position.length; i++) {
      for (var j = 0; j < position.length; j++) {
        if (i === j) continue;
        var item = position[i];
        var itemOther = position[j];

        if (
          Math.sqrt(Math.pow(item.x - itemOther.x, 2) + Math.pow(item.y - itemOther.y, 2)) <
          item.r + itemOther.r
        ) {
          // item.offsetX = -item.offsetX;
          // item.offsetY = -item.offsetY;
          let Vab = {
            vetorX: item.offsetX - itemOther.offsetX,
            vetorY: item.offsetY - itemOther.offsetY,
          };
          console.log(Vab);
          let delta_x = item.x - itemOther.x;
          let delta_y = item.y - itemOther.y;
          let theta = Math.atan2(delta_y, delta_x);
          let n = {
            vetorX: Math.cos(theta),
            vetorY: Math.sin(theta),
          };
          let Ma = Math.PI * item.r * item.r;
          let Mb = Math.PI * itemOther.r * itemOther.r;
          //console.log(Ma);
          //console.log(Mb)
          let f_numberator = -(1 + 1) * (Vab.vetorX * n.vetorX + Vab.vetorY * n.vetorY);
          let f_denominator = (n.vetorX * n.vetorX + n.vetorY * n.vetorY) * (1 / Ma + 1 / Mb);
          let f = f_numberator / f_denominator;
          //console.log(f)
          let VerItem = self.add(item, self.multi(n, f / Ma));
          let VerItemOther = self.diff(itemOther, self.multi(n, f / Mb));

          item.offsetX = VerItem.vetorX;
          item.offsetY = VerItem.vetorY;

          itemOther.offsetX = VerItemOther.vetorX;
          itemOther.offsetY = VerItemOther.vetorY;

          //console.log(item, itemOther);
          //debugger;
        }
      }
    }

    // let positionNew = position.map(function(item, index) {

    // 	position.forEach(function(itemOther, indexOther) {
    // 		if (index !== indexOther) {
    // 			if (Math.sqrt(
    // 					Math.pow((item.x - itemOther.x), 2) +
    // 					Math.pow((item.y - itemOther.y), 2)
    // 				) < (item.r + itemOther.r)) {
    // 				item.offsetX = -item.offsetX;
    // 				item.offsetY = -item.offsetY;
    // 			}
    // 		}
    // 	});

    // 	return Object.assign({}, item, {
    // 		offsetX: item.offsetX,
    // 		offsetY: item.offsetY
    // 	});

    // });

    return positionNew;
  }

  diff(ts, ta) {
    let gv = {};
    gv.vetorX = ts.offsetX - ta.vetorX;
    gv.vetorY = ts.offsetY - ta.vetorX;

    return gv;
  }

  add(ts, ta) {
    var gv = {};
    gv.vetorX = ts.offsetX + ta.vetorX;
    gv.vetorY = ts.offsetY + ta.vetorY;

    return gv;
  }
  multi(t, s) {
    var gv = {};
    gv.vetorX = s * t.vetorX;
    gv.vetorY = s * t.vetorY;

    return gv;
  }

  getCollisionWall(position) {
    var canvas = this.refs.feBall;
    var ctx = canvas.getContext('2d');
    // let positionNew = position.map(function(item, index) {

    // 	if (item.x + item.r > canvas.width || item.x - item.r < 0) {
    // 		item.offsetX = -item.offsetX;
    // 	}
    // 	if (item.y + item.r > canvas.height || item.y - item.r < 0) {
    // 		item.offsetY = -item.offsetY;
    // 	}

    // 	// if(parseFloat(item.x) + parseFloat(item.r) > canvas.width
    // 	// 	|| parseFloat(item.x) - parseFloat(item.r) < 0) {
    // 	//     item.offsetX = -item.offsetX;
    // 	// }
    // 	// if(parseFloat(item.y) + parseFloat(item.r) > canvas.height
    // 	// 	|| parseFloat(item.y) - parseFloat(item.r) < 0) {
    // 	//     item.offsetY = -item.offsetY;
    // 	// }

    // 	//var itemX,itemY,offsetXN,offsetYN;
    // 	// if(item.x < item.r ){
    // 	// 	itemX = item.r;
    // 	// 	offsetXN = -item.offsetX;
    // 	// }else if(item.x > canvas.width - item.r){
    // 	// 	itemX = canvas.width - item.r;
    // 	// 	offsetXN = -item.offsetX;
    // 	// }else{
    // 	// 	itemX = item.x;
    // 	// 	offsetXN = item.offsetX;
    // 	// }
    // 	// if(item.y < item.r ){
    // 	// 	itemY = item.r;
    // 	// 	offsetYN = -item.offsetY;
    // 	// }else if(item.y > canvas.height - item.r ){
    // 	// 	itemY = canvas.height - item.r;
    // 	// 	offsetYN = -item.offsetY;
    // 	// }else{
    // 	// 	itemY = item.y;
    // 	// 	offsetYN = item.offsetY;
    // 	// }
    // 	return Object.assign({}, item, {
    // 		offsetX: item.offsetX,
    // 		offsetY: item.offsetY
    // 	});
    // });

    for (var i = 0; i < position.length; i++) {
      if (position[i].x + position[i].r > canvas.width || position[i].x - position[i].r < 0) {
        position[i].offsetX = -position[i].offsetX;
      }
      if (position[i].y + position[i].r > canvas.height || position[i].y - position[i].r < 0) {
        position[i].offsetY = -position[i].offsetY;
      }
    }

    return position;
  }

  componentDidMount() {
    //console.log(3);
    var canvas = this.refs.feBall;
    var ctx = canvas.getContext('2d');
    var position = this.state.position;
    canvas.width = 920;
    canvas.height = 300;

    this.getPosition(position);
  }

  getPosition(position) {
    var canvas = this.refs.feBall;
    var ctx = canvas.getContext('2d');
    // ball
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
    this.setState({
      position: position,
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
