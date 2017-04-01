'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './games.routes';

export class GamesComponent {
  edit = true;
  awesomeGames = [];
  newGame = '';
  newPlatform = '';
  newGenre = '';
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/games')
      .then(response => {
        this.awesomeGames = response.data;
      });
  }
  addGame() {
    if(this.newGame && this.newPlatform && this.newGenre) {
      this.$http.post('/api/games', {
        name: this.newGame,
        platform: this.newPlatform,
        genre: this.newGenre,
        edit: false
      });
      this.newGame = '';
      this.newPlatform = '';
      this.newGenre = '';
      this.$onInit();
    }
  }
  deleteGame(game) {
    this.$http.delete(`/api/games/${game._id}`);
    this.$onInit();
  }
  toggleEdit(game) {
    game.edit = !game.edit;
    this.$http.put(`/api/games/${game._id}`, game);

    //this.$onInit();

  }
  saveGame(game){
    game.edit = !game.edit;
    this.$http.put(`/api/games/${game._id}`, game);
    this.$onInit();
  }
}

export default angular.module('curdApp.games', [uiRouter])
  .config(routes)
  .component('games', {
    template: require('./games.html'),
    controller: GamesComponent
  })
  .name;

  