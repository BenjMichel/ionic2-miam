import {appId, jsKey} from './parseConfig.js';
import {LoginService} from './loginService';

export class ParseService {
  static init() {
    Parse.initialize(appId, jsKey);
  }

  static addResto(name) {
    var Resto = Parse.Object.extend('Resto');
    var resto = new Resto();
    return resto.save({name: name});
  }

  static getRestos() {
    let that = this;
    return new Promise(function(resolve, reject) {
      that.getNumberOfRatingsByResto().then(function(ratings) {
        var Resto = Parse.Object.extend('Resto');
        var query = new Parse.Query(Resto);
        query.find({
          success: function(results) {
            let restos = []
            for (restoObject of results) {
              let resto = {
                name: restoObject.get('name'),
                id: restoObject.id,
                count: 0,
              }
              if (ratings[restoObject.id]) {
                resto.count = ratings[restoObject.id].count;
                resto.hasUserRated = ratings[restoObject.id].hasUserRated;
              }
              restos.push(resto);
            }
            resolve(restos);
          },
          error: function(error) {
            reject(error);
          }
        });
      }).catch(function(error) {
        reject(error);
      });
    })
  }

  static getNumberOfRatingsByResto() {
    return new Promise(function(resolve, reject) {
      var Rating = Parse.Object.extend('Rating');
      var query = new Parse.Query(Rating);
      query.greaterThan('date', moment().startOf('day').toDate());
      query.find({
        success: function(results) {
          let ratings = {};
          let username = LoginService.getUsername();
          for (ratingObject of results) {
            let id = ratingObject.get('restoId').id;
            if (!ratings[id]) {
              ratings[id] = {
                count: 0,
                hasUserRated: false,
              };
            }
            ratings[id].count += 1;
            if (ratingObject.get('username') === username) {
              ratings[id].hasUserRated = true;
            }
          }
          resolve(ratings);
        },
        error: function(error) {
          reject(error);
        }
      });
    })
  }

  static saveRating(restoId, value) {
    var Rating = Parse.Object.extend('Rating');
    var Resto = Parse.Object.extend('Resto');
    var rating = new Rating();
    return rating.save({
      value: value,
      restoId: Resto.createWithoutData(restoId),
      date: new Date(),
      username: LoginService.getUsername(),
    });
  }
}
