import React from 'react';

// requisito 1
class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
    }
  }

  

  render() {
    return (

      <div>
        <h1>Xablau</h1>
        <p>Home</p>
      </div>

    );
  }
}

export default Home;
