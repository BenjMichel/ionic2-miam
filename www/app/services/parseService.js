import {appId, jsKey} from './parseConfig.js';

export class ParseService {
  static init() {
    Parse.initialize(appId, jsKey);
  }

  static addResto(name) {
    var Resto = Parse.Object.extend('Resto');
    var resto = new Resto();
    resto.save({name: name});
  }

  static getRestos() {
    return new Promise(function(resolve, reject) {
      var Resto = Parse.Object.extend('Resto');
      var query = new Parse.Query(Resto);
      query.find({
        success: function(results) {
          resolve(results);
        },
        error: function(error) {
          reject(error);
        }
      });
    })
  }
}
