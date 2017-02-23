import { createStore } from 'redux';

const defaultState = {
  todos: [{
    task: 'Learn Redux',
  }],
};

function todos(state = defaultState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: state.todos.concat([{
          task: action.task }]),
      });
    case 'DONE_TODO':
      return Object.assign({}, state, {
        todos: state.todos.filter(filterTodo =>
          filterTodo !== action.todo,
        ),
      });
    default:
      return state;
  }
}

export default createStore(todos);
