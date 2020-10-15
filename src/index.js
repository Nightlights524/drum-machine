import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// function Stateless(props) {
//   return (
//     <div>
//     </div>
//   );
// }

// const Stateless = props => {
//   return (
//     <div>
//     </div>
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  render() {  
    return (
      <div>
        <h1>App Title</h1>
      </div>
    );
  }
}
  
// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);