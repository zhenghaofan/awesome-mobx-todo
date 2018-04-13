import {observable, action} from 'mobx'

class todoStore{
  @observable todoList = []

  @action addTodo(text) {
    this.todoList.push(text)
  }

  @action deleteTodo(text){
    const todos = this.todoList;
    const todoIndex = todos.indexOf(text);

    if(todoIndex < 0) {
      return;
    }

    todos.splice(todoIndex, 1)
  }
}
export default new todoStore()
