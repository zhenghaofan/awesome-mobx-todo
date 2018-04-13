import React from 'react'
import ReactDOM from 'react-dom';
import {DatePicker} from 'antd'
import {Button, Input, Icon} from 'antd'
import moment from 'moment'
import { observer, inject } from 'mobx-react'

import '../common/left.css'

const dateFormat = 'YYYY/MM/DD'

@inject('todos')
@inject('date')
@observer
export default class Left extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   currentDate : this.props.date.newDate
    // }
  }

  addTodo(e) {
    let todo = ReactDOM.findDOMNode(this.refs.newInput).value.trim();
    if (todo) {
      this.props.todos.addTodo(todo);
      ReactDOM.findDOMNode(this.refs.newInput).value = '';
    }
  }

  onDateChange(_date) {
    this.props.date.setDay(_date)
  }

  render() {
    const dateStore = this.props.date
    return (
      <div className="left-container">
        <Button onClick={dateStore.backDay.bind(dateStore)}>
          <Icon type="left"/>
        </Button>
        <DatePicker defaultValue={moment(dateStore.newDate, dateFormat)} value={moment(dateStore.newDate)} format={dateFormat} onChange={this.onDateChange.bind(this)} ></DatePicker>
        <Button onClick={dateStore.forwardDay.bind(dateStore)}>
          <Icon type="right"/>
        </Button>
        <div className="todo-container">
          <Input className="todo-input" ref="newInput" placeholder="输入你要做的事情" autoFocus={true} />
          <Button type="primary" onClick={this.addTodo}>干吧</Button>
        </div>
      </div>
    )
  }
}
