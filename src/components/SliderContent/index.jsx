import React, {Component} from 'react';
import './index.less';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state={
      animation: false
    };
  }

  componentDidMount(){
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    document.addEventListener('scroll',(e) => {
      let offsetop = this.refs.sliderConetn.getBoundingClientRect();
      if(offsetop.top < height/5*3 && offsetop.top > -540) {
        if(this.state.animation === false){
          this.setState({
            animation: true
          })
        }
      } else if (offsetop.top > height/5*3 || offsetop.top < -540) {
        if(this.state.animation === true){
          this.setState({
            animation: false
          })
        }
      }
    })
  }

  getEducation(data,src) {
    let newSource = data.map((item,index) => {
      return (
        <li key={src+index}>{item}</li>
      );
    });
    return newSource;
  }

  render(){
    let education = this.getEducation(this.props.config.slider.education,"education");
    let occupation = this.getEducation(this.props.config.slider.occupation,"occupation");
    return (
      <div className="slider-content" ref="sliderConetn">
        <div className={this.state.animation ? "slider-left leftSlideT" : "slider-left leftSlideF"}>
          <div className="round-main">
            <div className="round-one"></div>
            <div className="round-two"></div>
          </div>
          <span className="round-current1"></span>
          <span className="round-current2"></span>
          <span className="round-current3"></span>
          <div className="box-r">{this.props.config.layout.title1}</div>
        </div>
        <div className="slider-right">
          <div className={this.state.animation ? "intro rightSlideT" : "intro rightSlideF"}>
            <p>教育经历</p>
            <ul>
              {education}
            </ul>
            <p>求职意向</p>
            <ul>
              {occupation}
            </ul>
          </div>
        </div>
      </div>
    )
  }

}