import React from 'react'
import ExpressionBuilder from './expression-builder/ExpressionBuilder'
import ExpressionBuilder2 from './ExpressionBuilder/ExpressionBuilder';

function App() {
  const fake = new Fake();

  return (
    <div className="wrapper">
      <h1>First REACT</h1>
      <ExpressionBuilder viewModel={fake} />
      <h2>Second REACT</h2>
      <ExpressionBuilder2 expression='( 1 + age ) > 34' viewModel={new Fake()} onExpressionChanged={onExpressionChanged} />
    </div>
  );

  function onExpressionChanged(val) {
    console.log('val', val);
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