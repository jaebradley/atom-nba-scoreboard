'use babel';

import React from 'react';
import Marquee from 'react-marquee';
import Client from 'nba-stats-client';

import parseGames from '../parseGames';

class Games extends React.Component {
  constructor(props) {
    super(props);

    this.state = { games: '', intervalId: null };
  }

  componentDidMount = () => {
    Client.getGamesFromDate(new Date()).then(data => {
      this.setState({ games: parseGames(data) });
    });

    const intervalId = setInterval(this.fetchGames, 60000);
    this.setState({ intervalId });
  }

  componentWillUnmount = () => {
     clearInterval(this.state.intervalId);
  }


  fetchGames = () => {
    Client.getGamesFromDate(new Date()).then(data => {
      this.setState({ games: parseGames(data) });
    });
  }

  render() {
    const {
      games,
    } = this.state;
    return ( <Marquee text={games} trailing={1} loop hoverToStop />);
  }
};

export default Games;
