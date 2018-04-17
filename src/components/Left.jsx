import React from 'react'
import ReactDOM from 'react-dom';
import {DatePicker} from 'antd'
import {Button, Input, Icon, Tag} from 'antd'
import moment from 'moment'
import { observer, inject } from 'mobx-react'
import Parabola from '../third-party/parabola'

import '../common/left.css'

const dateFormat = 'YYYY/MM/DD'

@inject('todoStore')
@inject('dateStore')
@inject('flyStore')
@observer
export default class Left extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoText: ''
    }

    // this.tagEl = null
  }

  handleChange = (e) => {
    this.setState({todoText: e.target.value})
  }

  addTodo = () => {
    let todo = ReactDOM.findDOMNode(this.refs.newInput).value.trim();
    if (todo) {
      this.createTagElement();
      // this.fly();
      this.props.todoStore.addTodo(moment(this.props.dateStore.newDate).format('YYYY/MM/DD'), todo);
      ReactDOM.findDOMNode(this.refs.newInput).value = '';
    }
  }

  // checkEnter = (e) => {
  //   if(e.key === 'Enter') {
  //     this.addTodo();
  //   }
  // };

  onDateChange(_date) {
    this.props.dateStore.setDay(_date)
  }

  createTagElement() {
    let d = document.createElement('div');
    d.innerText = this.state.todoText;
    d.className = 'left-tag';
    this.refs.todoContainer.appendChild(d);
    this.props.flyStore.originEl = d;
  }

  render() {
    let dateStore = this.props.dateStore
    return (
      <div className="left-container">
        <Button onClick={dateStore.backDay.bind(dateStore)}>
          <Icon type="left"/>
        </Button>
        <DatePicker defaultValue={moment(dateStore.newDate, dateFormat)} value={moment(dateStore.newDate)} format={dateFormat} onChange={this.onDateChange.bind(this)} ></DatePicker>
        <Button onClick={dateStore.forwardDay.bind(dateStore)}>
          <Icon type="right"/>
        </Button>
        <div className="todo-container" ref="todoContainer">
          <Input className="todo-input" ref="newInput" placeholder="输入你要做的事情" autoFocus={true} onPressEnter={this.addTodo} onChange={this.handleChange} />
          <Button type="primary" onClick={this.addTodo.bind(this)}>干吧</Button>
        </div>
      </div>
    )
  }
}
