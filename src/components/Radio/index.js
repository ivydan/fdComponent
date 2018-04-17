import React, { Component } from 'react';
import cName from 'classnames';
import _ from 'lodash';
import './index.less';

var Radio = React.createClass({
    PropTypes: {
        options: React.PropTypes.array
    },
    getDefaultProps() {
        return {
            options: []
        }
    },

    getInitialState: function () {
        return {
            options: []
        }
    },

    componentWillMount() {
        let { children, checked, options } = this.props;
        if (options.length === 0 && children) {
            options.push({
                checked,
                value: children,
                label: children
            })
        }
        this.setState({
            options: this.props.options
        })
    },

    render: function () {
        let { options } = this.state;
        return <span>
            {options.map((item, index) => {
                console.log(item, index);
                return <label key={"Radio" + index} className={cName({
                    'component-radio': true,
                    'component-radio-disable': item.disabled === true
                })}>
                    <span className={cName({
                        'c-radio': true,
                        'radio-disable': item.disabled === true,
                        'radio-check': item.checked
                    })}>
                        <input
                            type="radio"
                            checked={item.checked}
                            disabled={item.disabled === true}
                            value={item.value || index}
                            onChange={this._handleChange.bind(this, item)} />
                        <span className="radio-inner" ></span>
                    </span>
                    <span className="radio-label">{item.label}</span>
                </label>
            })}
        </span>;
    },

    _handleChange: function (data, e) {
        e.stopPropagation();
        let Doptions = _.cloneDeep(this.state.options)
        Doptions.map((item, index) => {
            if (item.value === data.value) {
                item.checked = true;
            } else {
                item.checked = false;
            }
        });
        this.props.onChange && this.props.onChange(data);
        this.setState({
            options: Doptions
        });
    }
});

module.exports = Radio;
