import React from 'react'
// import './ExpressionBuilder.css';
import ExpressionBuilder from './ExpressionBuilder/ExpressionBuilder';

class App extends React.Component {
  constructor() {
    super()
    this.fake = new Fake();
    this.state = {
      expression: '( 1 + age ) > 34'
    };
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Expression Builder</h1>
        <ExpressionBuilder expression={this.state.expression} viewModel={this.fake} onExpressionChanged={this.onExpressionChanged.bind(this)} />
        <hr width='100%' />
        <div>{this.state.expression}</div>
      </div>
    );
  }

  onExpressionChanged(expression) {
    this.setState({
      expression
    });
  }
}

export default App;


export class Fake {
  constructor() {
    this.id = null;
    this.name = null;
    this.age = null;
  }
}