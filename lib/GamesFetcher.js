'use babel';

import moment from 'moment-timezone';
import Client from 'nba-stats-client';

import parseGames from './parseGames';

class GamesFetcher {
  static fetch() {
    return Client
      .getGamesFromDate(GamesFetcher.getCurrentDate())
      .then(data => data.sports_content.games.game)
      .then(games => parseGames(games));
  }

  static getCurrentDate() {
    return moment.tz('America/New_York').toDate();
  }
}

export default GamesFetcher
