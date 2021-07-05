import React from 'react'
import ExpressionBuilder from './expression-builder/ExpressionBuilder'

function App() {
  const fake = new Fake();
  return (
    <div className="wrapper">
      <h1>First REACT</h1>
      <ExpressionBuilder viewModel={fake} />
    </div>
  );
}

export default App;


export class Fake {
  constructor() {
    this.id = null;
    this.name = null;
    this.age = null;
  }
}