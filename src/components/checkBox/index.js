import React from 'react';
import cName from 'classnames';
import _ from 'lodash';
import './index.less';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state={dataSource: []};
    }

    componentWillMount(){
        let { children , checked, dataSource} = this.props;
        if(dataSource.length === 0 && children){
            dataSource.push({
                checked,
                value: children,
                label: children
            })
        }
        this.setState({
            dataSource
        })
    }

    _handleChange(data,e){
        e.stopPropagation();
        let Doptions = _.cloneDeep(this.state.dataSource)
        Doptions.map((item, index) => {
            if(item.value === data.value){
                item.checked = !item.checked;
            }
        });
        this.props.onChange && this.props.onChange(Doptions);
        this.setState({
            dataSource:Doptions 
        });
    }

    render() {

        let { dataSource } = this.state;
        return <span>
            {dataSource.map((item, index) =>{
                return <label className={cName({
                    'fd-checkbox': true,
                    'fd-checkbox-disable': item.disabled === true
                })}>
                    <span className={cName({
                        'checkbox': true,
                        'checkbox-disable': item.disabled === true,
                        'checkbox-check': item.checked
                    })}>
                        <input 
                            type="checkbox" 
                            checked={item.checked} 
                            disabled={item.disabled === true}
                            value={item.value || index}
                            onChange={this._handleChange.bind(this,item)} />
                        <span className="checkbox-inner" ></span>
                    </span>
                    <span>{item.label}</span>
                </label>
            })}
        </span>;
    }
}