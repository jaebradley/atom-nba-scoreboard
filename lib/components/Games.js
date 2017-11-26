'use babel';

import React from 'react';
import Marquee from 'react-marquee';
import Client from 'nba-stats-client';
import moment from 'moment-timezone';

import { parseGames } from '../parseGames';
import GamesService from '../GamesService';

class Games extends React.Component {
  constructor(props) {
    super(props);

    this.gamesService = new GamesService();

    this.state = { parsedGames: '', intervalId: null };
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.games != nextState.games
      || nextProps.intervalId != nextState.intervalId;
  }

  componentDidMount = () => {
    this.gamesService.fetchTodaysGames().then(games => {
      const parsedGames = parseGames(games);
      this.setState({ parsedGames });
    }).catch(e => console.error(`Unable to get games: ${e}`));

    const intervalId = setInterval(this.fetchGames, 60000);
    this.setState({ intervalId });
  }

  componentWillUnmount = () => {
     clearInterval(this.state.intervalId);
  }

  fetchGames = () => {
    this.gamesService.fetchTodaysGames().then(games => {
      const parsedGames = parseGames(games);
      this.setState({ parsedGames });
    }).catch(e => console.error(`Unable to get games: ${e}`));
  }

  render() {
    let {
      parsedGames,
    } = this.state;

    if (parsedGames.length == 0) {
      parsedGames = '😱 Unable to fetch games 😭';
    }

    return ( <marquee>{ parsedGames }</marquee>);
  }
};

export default Games;
