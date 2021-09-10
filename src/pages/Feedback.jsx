import React from 'react';

import GravatarHeader from '../components/GravatarHeader';
import FeedbackMensage from '../components/FeedbackMensage';
import PlayerResults from '../components/PlayerResults';

export default class Feedback extends React.Component {
  render() {
    return (
      <div>
        <GravatarHeader />
        <FeedbackMensage />
        <PlayerResults />
      </div>
    );
  }
}
