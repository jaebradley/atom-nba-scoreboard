/** @babel */

import moment from 'moment-timezone';
import GamesService from '../lib/GamesService';

describe('GamesService', () => {
  describe('#constructor', () => {
    it('should construct a new GamesService', () => {
      const service = new GamesService();
      expect(service.games).toEqual([]);
      expect(service.lastFetchDate).toBeUndefined();
    });
  });

  describe('#parseStartTime', () => {
    it('should parse the start time', () => {
      const service = new GamesService();
      const expected = moment.tz.zone('UTC').offset(0);
      expect(service.parseStartTime('201711257:30 PM ET')).toEqual(expected);
    });
  });
});
