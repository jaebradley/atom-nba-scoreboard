'use babel';

import React from 'react';
import Marquee from 'react-marquee';
import Client from 'nba-stats-client';
import moment from 'moment-timezone';

import GamesFetcher from '../GamesFetcher';

class Games extends React.Component {
  constructor(props) {
    super(props);

    this.state = { parsedGames: '', intervalId: null };
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.parsedGames != nextState.parsedGames;
  }

  componentDidMount = () => {
    this.fetchGames();
    
    const intervalId = setInterval(this.fetchGames, 60000);

    this.setState({ intervalId });
  }

  componentWillUnmount = () => {
     clearInterval(this.state.intervalId);
  }

  fetchGames = () => {
    GamesFetcher.fetch().then(games => {
      this.setState({ parsedGames: games });
    }).catch(e => console.error(`Unable to get games: ${e}`));
  }

  render() {
    let {
      parsedGames,
    } = this.state;

    if (parsedGames.length == 0) {
      parsedGames = '😱 Unable to fetch games 😭';
    }

    return (<marquee>{ parsedGames }</marquee>);
  }
};

export default Games;
