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
    return new Promise(function(resolve, reject) {
      var Resto = Parse.Object.extend('Resto');
      var query = new Parse.Query(Resto);
      query.find({
        success: function(results) {
          let restos = []
          for (restoObject of results) {
            restos.push({
              name: restoObject.get('name'),
              id: restoObject.id,
            });
          }
          resolve(restos);
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
    var relation = rating.relation("restoId");
    relation.add(Resto.createWithoutData(restoId));
    return rating.save({
      value: value,
      date: new Date(),
      username: LoginService.getUsername(),
    });
  }
}
