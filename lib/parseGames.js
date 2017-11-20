'use babel';

import NbaEmoji from 'nba-emoji';
import moment from 'moment';

const parseGames = (data) => {
  return data.sports_content.games.game.map(game => {
    const startTime = game.home_start_time;
    const period = game.period_time.period_value;
    const periodStatus = game.period_time.period_status;
    const gameStatus = game.period_time.game_status;
    const remainingTimeInPeriod = game.period_time.game_clock;
    const homeTeamAbbreviation = game.home.abbreviation;
    const homeScore = game.home.score;
    const visitorTeamAbbreviation = game.visitor.abbreviation;
    const visitorScore = game.visitor.score;
    return formatGameMessage(startTime, period, periodStatus, remainingTimeInPeriod, gameStatus, homeTeamAbbreviation, homeScore, visitorTeamAbbreviation, visitorScore);
  }).join('⎮');
};

const formatGameMessage = (startTime, period, periodStatus, remainingTimeInPeriod, gameStatus, homeTeamAbbreviation, homeScore, visitorTeamAbbreviation, visitorScore) => {
  return `${NbaEmoji.getEmoji(visitorTeamAbbreviation)} ${visitorTeamAbbreviation} ${visitorScore || ''} @ ${NbaEmoji.getEmoji(homeTeamAbbreviation)} ${homeTeamAbbreviation} ${homeScore || ''} ${formatGameDetails(startTime, period, periodStatus, remainingTimeInPeriod, gameStatus)}`;
}

const formatGameDetails = (startTime, period, periodStatus, remainingTimeInPeriod, gameStatus) => {
  if (gameStatus == 1) {
    return `(${periodStatus})`;
  }

  if (gameStatus == 3) {
    return '(FINAL)';
  }

  if (gameStatus == 'Halftime') {
    return '(HALFTIME)';
  }

  if (period && remainingTimeInPeriod) {
    return `(${remainingTimeInPeriod} ${formatPeriod(parseInt(period, 10))})`;
  }
}

const formatPeriod = (period) => {
  if (period > 4) {
    return `OT${5 - period}`
  }

  return `Q${period}`;
}

const formatStartTime = (startTime) => {
  return moment(startTime, 'HHmm').format('h:mm A');
}

export default parseGames;
