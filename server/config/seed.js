/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Game from '../api/game/game.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Game.find({}).remove()
      .then(() => {
        Game.create({
          name: 'Halo 5',
          platform: 'Xbox One',
          genre: 'shooter',
          edit: false
        }, {
          name: 'Fallout 4',
          platform: 'PS4',
          genre: 'Role-Playing',
          edit: false
        }, {
          name: 'Super Smash Bros.',
          platform: 'Wii U',
          genre: 'Fighting',
          edit: false
        }, {
          name: 'pokemon X',
          platform: '3DS',
          genre: 'Role-Playing',
          edit: false
        }, {
          name: 'Halo 4',
          platform: 'Xbox 360',
          genre: 'shooter',
          edit: false
        });
      })
    .then(() => console.log('finished populating things'))
    .catch(err => console.log('error populating things', err));
  }
}
