import React, { Component } from 'react';
import { Navigator } from 'react-native';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import store from './TodoStore';

class PluralTodo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = store.getState();

    store.subscribe(() => {
      this.setState(store.getState);
    });
  }

  onAddStarted() {
    this.nav.push({
      name: 'taskform',
    });
  }

  onCancel() {
    this.nav.pop();
  }

  onAdd(task) {
    store.dispatch({
      type: 'ADD_TODO',
      task,
    });
    this.nav.pop();
  }

  onDone(todo) {
    store.dispatch({
      type: 'DONE_TODO',
      todo,
    });
  }
  renderScene(route, nav) {
    switch (route.name) {
      case 'taskform':
        return (
          <TaskForm
            onAdd={this.onAdd.bind(this)}
            onCancel={this.onCancel.bind(this)}
          />
        );
      default:
        return (
          <TaskList
            onDone={this.onDone.bind(this)}
            onAddStarted={this.onAddStarted.bind(this)}
            todos={this.state.todos}
          />
        );
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={{ name: 'tasklist', index: 0 }}
        ref={((nav) => {
          this.nav = nav;
        })}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}

export default PluralTodo;
