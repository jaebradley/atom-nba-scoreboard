'use babel';

import moment from 'moment-timezone';
import Client from 'nba-stats-client';

// TODO: @jaebradley need to figure out why this isn't working and replace simple GamesFetcher service

class GamesService {
  constructor() {
    this.games = [];
    this.lastFetchDate;
  }

  parseStartTime = (formattedStartTime) => {
    return moment
      .tz(formattedStartTime, 'YYYYMMDDh:mm a ET', 'America/New_York')
      .tz('UTC');
  }

  getFirstGameStartTime = () => {
    if (this.games.length > 0) {
      // Games from NBA are ordered by start time
      const firstGame = this.games[0];
      return parseStartTime(`${firstGame.date}${firstGame.startTime}`);
    }
  }

  hasFirstGameStarted = () => {
    const startTime = this.getFirstGameStartTime();
    return startTime && startTime < moment.tz('UTC');
  }

  areAllGamesFinal = () => {
    // TODO: @jaebradley this might be a problem when it comes to delayed or postponed games?
    return this.games.find(game => game.status != 3) == undefined;
  }

  fetchTodaysGames = () => {
    const date = moment.tz('UTC').toDate();

    if (date == this.lastFetchDate && !this.hasFirstGameStarted()) {
      return this.games;
    }

    let gameDate = this.lastFetchDate;
    if (date != gameDate && this.areAllGamesFinal()) {
      gameDate = date;
    }

    return Client.getGamesFromDate(gameDate)
      .then(data => data.sports_content.games.game)
      .then(games => {
        this.games = games;
        this.lastFetchDate = gameDate;
        return games;
      });
  }
}

export default GamesService;
