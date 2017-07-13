import React, { Component } from 'react';

module.exports = function fontLight(){
    class FontLight extends Component{
        constructor(props){
            super(props)
        }

        render(){
            let className = this.props.className ? 
                `fd-font-light ${this.props.className}` :
                "fd-font-light";
            let { test, color } = this.props;
            return (
                <div className={className}>
                    <span className="lignt-txt" data-text={test}>{test}</span>
                    <div className="lignt-bgc" style={
                        color ? {background: `linear-gradient(45deg, ${color[0]}, ${color[1]})`}
                        :{}
                    }></div>
                    <div className="lignt-ani"></div>
                </div>
                )
        }
    }

    return FontLight;
}