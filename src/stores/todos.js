import {observable, action} from 'mobx'

class Todo {
  @observable status
  constructor(content, status) {
    this.content = content
    this.status = status || 1
  }
}

class todoStore{
  @observable todoList = []

  @action addTodo(date, text) {
    let index = this.todoList.map((item) => item.date).indexOf(date)
    if (index !== -1) {
      if (this.todoList[index].todos.map(item => item.content).indexOf(text) !== -1) return;
      this.todoList[index].todos.push(new Todo(text, 1))
    } else {
      this.todoList.push({
        date: date,
        todos: [new Todo(text, 1)]
      })
    }
  }

  @action deleteTodo(date, text){
    let todolistIndex = this.todoList.map((item) => item.date).indexOf(date)
    if (todolistIndex < 0) return;
    let todoIndex = this.todoList[todolistIndex].todos.map(item => item.content).indexOf(text);
    if(todoIndex < 0) return;

    this.todoList[todolistIndex].todos.splice(todoIndex, 1)
  }

  @action completeTodo(date, text) {
    let todolistIndex = this.todoList.map((item) => item.date).indexOf(date)
    if (todolistIndex < 0) return;
    let todoIndex = this.todoList[todolistIndex].todos.map(item => item.content).indexOf(text);
    if(todoIndex < 0) return;

    this.todoList[todolistIndex].todos[todoIndex].status = 2;
  }
}
export default new todoStore()
