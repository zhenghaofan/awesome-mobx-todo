import React from 'react'
import { List, Tag, Tabs, Button } from 'antd'
import moment from 'moment'
import '../common/right.css'
import {observable, computed} from 'mobx'
import {observer, inject} from 'mobx-react'

const TabPane = Tabs.TabPane
@inject('todoStore')
@inject('dateStore')
@observer
export default class Right extends React.Component {
  @observable status = 1;
  constructor(props) {
    super(props)
  }

  @computed get dateString() {
    return moment(this.props.dateStore.newDate).format('YYYY/MM/DD')
  }

  @computed get allTodos() {
    let index = this.props.todoStore.todoList.map((item)=>item.date).indexOf(this.dateString)
      if (index < 0) {
        return [];
      } else {
        return this.props.todoStore.todoList[index].todos;
    }
  }

  @computed get targetTodos() {
    return this.allTodos.filter(item => item.status == this.status)
  }

  getTodos(status) {
    this.status = status;
  }
  deleteTodo(item) {
    this.props.todoStore.deleteTodo(this.dateString, item)
  }
  completeTodo(item) {
    this.props.todoStore.completeTodo(this.dateString, item)
  }
  render() {
    // console.log(this.targetTodos);
    return (
      <div className="right-container">
        <h3>{this.dateString} Todolist:</h3>
          <Tabs defaultActiveKey="1" onChange={this.getTodos.bind(this)}>
          <TabPane tab="要干" key="1">
            <List>
                  {
                    this.targetTodos.length > 0 ? this.targetTodos.map((item, index) => {
                      return (
                        <div className="tags-container" key={item.content}>
                          {index+1}.<Tag closable onClose={this.deleteTodo.bind(this, item.content)}><span>{item.content}</span></Tag>
                        <Button type="primary" size="small" className="f-r" onClick={this.completeTodo.bind(this, item.content)}>mark as complete</Button>
                        </div>
                      )
                    }) : <div className="no-list">暂无todo</div>
                  }
            </List>
          </TabPane>
          <TabPane tab="干完了" key="2">
            <List>
                  {
                    this.targetTodos.length > 0 ? this.targetTodos.map((item, index) => {
                      return (
                        <div className="tags-container" key={item.content}>
                          {index+1}.<Tag closable onClose={this.deleteTodo.bind(this, item.content)}><span>{item.content}</span></Tag>
                        </div>
                      )
                    }) : <div className="no-list">暂无todo</div>
                  }
            </List>
          </TabPane>
          </Tabs>
      </div>
    )
  }
}
