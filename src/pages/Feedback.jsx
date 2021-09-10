import React, { Component } from 'react';
import RankingButton from '../components/RankingButton';

import GravatarHeader from '../components/GravatarHeader';
import FeedbackMensage from '../components/FeedbackMensage';
import PlayerResults from '../components/PlayerResults';

export default class Feedback extends Component {
  render() {
    return (
      <div>
        <RankingButton />
        <GravatarHeader />
        <FeedbackMensage />
        <PlayerResults />
      </div>
    );
  }
}
