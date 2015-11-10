import {appId, jsKey} from './parseConfig.js';

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
              name: restoObject.get('name')
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
}
