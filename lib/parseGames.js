'use babel';

import NbaEmoji from 'nba-emoji';
import moment from 'moment-timezone';

const parseGames = (games) => {
  return games.map(game => {
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
  }).join('  ⎮  ');
};

const formatGameMessage = (startTime, period, periodStatus, remainingTimeInPeriod, gameStatus, homeTeamAbbreviation, homeScore, visitorTeamAbbreviation, visitorScore) => {
  if (gameStatus == 1) {
    visitorScore = '';
    homeScore = '';
  }

  const visitorTeamDetails = formatTeamDetails(visitorTeamAbbreviation, visitorScore);
  const homeTeamDetails = formatTeamDetails(homeTeamAbbreviation, homeScore);
  const gameDetails = formatGameDetails(startTime, period, periodStatus, remainingTimeInPeriod, gameStatus);

  return `${visitorTeamDetails} @ ${homeTeamDetails} ${gameDetails}`;
}

const formatTeamDetails = (teamAbbreviation, teamScore) => {
  return `${NbaEmoji.getEmoji(teamAbbreviation)} ${teamAbbreviation} ${teamScore || ''}`;
}

const formatGameDetails = (startTime, period, periodStatus, remainingTimeInPeriod, gameStatus) => {
  if (gameStatus == 1) {
    return `(${formatStartTime(periodStatus)})`;
  }

  if (gameStatus == 3) {
    return '(FINAL)';
  }

  if (periodStatus == 'Halftime') {
    return '(HALFTIME)';
  }

  if (period && remainingTimeInPeriod) {
    return `(${remainingTimeInPeriod} ${formatPeriod(parseInt(period, 10))})`;
  }
}

const formatStartTime = (startTime) => {
  return `${moment(startTime, 'h:mm a ET').format('h:mm A')} ET`;
 }

const formatPeriod = (period) => {
  if (period > 4) {
    return `OT${5 - period}`
  }

  return `Q${period}`;
}

export default parseGames;
