import React from "react"
import { inject,observer } from "mobx-react"

@inject('TodoStore')
@observer
export default class TodoList extends React.Component {
  createNew(e) {
    if (e.which === 13) {
      this.props.TodoStore.createTodo(e.target.value)
      e.target.value = ""
    }
  }

  filter(e) {
    this.props.TodoStore.filter = e.target.value
  }

  toggleComplete(todo) {
    todo.complete = !todo.complete
  }

  render() {
    const { clearComplete, filter, filteredTodos } = this.props.TodoStore

    const todoLis = filteredTodos.map(todo => (
      <li key={todo.id}>
       <input type="checkbox" onChange={this.toggleComplete.bind(this, todo)} value={todo.complete} checked={todo.complete} />
       <span>{todo.value}</span>
      </li>
    ))
    return <div>
      <h1>todos</h1>
      <input className="new" onKeyPress={this.createNew.bind(this)} />
      <input className="filter" value={filter} onChange={this.filter.bind(this)} />
      <ul>{todoLis}</ul>
      <button onClick={clearComplete}>Clear Complete</button>
    </div>
  }
}
