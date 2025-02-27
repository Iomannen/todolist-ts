import React from 'react';
import './label.css';

class Label extends React.PureComponent {
  render() {
    return (
      <div className="label">
        <div className="blue">to</div>
        <div className="violet">do</div>
      </div>
    );
  }
}

export default Label;
