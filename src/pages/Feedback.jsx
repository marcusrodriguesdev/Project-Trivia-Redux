import React from 'react';

import GravatarHeader from '../components/GravatarHeader';
import FeedbackMensage from '../components/FeedbackMensage';

export default class Feedback extends React.Component {
  render() {
    return (
      <div>
        <GravatarHeader />
        <FeedbackMensage />
      </div>
    );
  }
}
