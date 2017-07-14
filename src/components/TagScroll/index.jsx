import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      animation: false
    }
    this.height = window.innerHeight 
                || document.documentElement.clientHeight 
                || document.body.clientHeight;
  }

  componentDidMount() {
    let self = this;

    // document.addEventListener('scroll',(e) => {
    //   if ( document.body.scrollTop >= 100 && document.body.scrollTop <= self.height) {
    //     if (this.state.animation == true) {
    //       return false;
    //     }
    //     self.setState({
    //       animation: true
    //     })
    //   }
    //   if ( document.body.scrollTop > self.height || document.body.scrollTop < 100) {
    //     if (this.state.animation == false) {
    //       return false;
    //     }
    //     self.setState({
    //       animation: false
    //     })
    //   }
    // },false);

    document.addEventListener('scroll',(e) => {
      let height = this.height
      let offsetop = this.refs.tagScroll.getBoundingClientRect();
      if(offsetop.top < height/5*3 && offsetop.top > -250) {
        if(this.state.animation === false){
          this.setState({
            animation: true
          })
        }
      } else if (offsetop.top > height/5*3 || offsetop.top < -250) {
        if(this.state.animation === true){
          this.setState({
            animation: false
          })
        }
      }
    })
    
  }

  getListData(data) {
    let recSou;
    if (data && data.length !== 0) {
      recSou = data.map((item,index) => {
        let i = index + 1;
        return (
            <li className={this.state.animation ? 'scroll-tranUp-'+i
                  : 'scroll-tranDown-'+i}
                key={'tag-scroll-'+index}>
              {item}
              <span>
                {item}
                <br />
                熟练
              </span>
            </li>
          );
      })
    }

    return recSou;
  }

  render() {
    let data = this.props.config.tag;
    let listData = this.getListData(data);
    return (
        <div className="tag-scroll" ref="tagScroll">
          <div className="tag-title">
            <p className={this.state.animation ? 'scroll-tranUp-1' : 'scroll-tranDown-1'}>
              我掌握的技能
            </p>
          </div>
          <ul>
            {listData}
          </ul>
        </div>
      );
  }
}