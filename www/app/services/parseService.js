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
}
