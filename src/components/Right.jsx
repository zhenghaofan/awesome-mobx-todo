import React from 'react'
import { DatePicker, List, Tag } from 'antd'
import moment from 'moment'
import '../common/right.css'
import {observer, inject} from 'mobx-react'

@inject('todos')
@observer
export default class Right extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date()
    }
  }
  render() {
    const {currentDate} = this.state
    let data = moment(currentDate).format('YYYY/MM/DD')
    let todoList = this.props.todos.todoList;
    return (
      <div className="right-container">
        <DatePicker></DatePicker>
        <h3>{data} Todolist:</h3>
          <List>
                {
                  todoList.length > 0 ? todoList.map((item, index) => {
                    return (
                      <div className="tags-container" key={item}>
                        {index+1}.<Tag><span>{item}</span></Tag>
                      </div>
                    )
                  }) : <div className="no-list">暂无todo</div>
                }
          </List>
      </div>
    )
  }
}
