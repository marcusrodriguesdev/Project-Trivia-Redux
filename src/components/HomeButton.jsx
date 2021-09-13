import React from 'react';
import { Link } from 'react-router-dom';

class HomeButton extends React.Component {
  render() {
    return (
      <div>
        <Link to="/" data-testid="btn-go-home" className="system-btn">
          Home Page
        </Link>
      </div>
    );
  }
}
export default HomeButton;
