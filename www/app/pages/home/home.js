import {Page} from 'ionic/ionic'
import {ParseService} from '../../services/parseService'

@Page({
  templateUrl: 'app/pages/home/home.html',
})
export class HomePage {
  constructor() {
    let that = this;
    this.restos = null;
    ParseService.getRestos().then(function(restos) {
      that.restos = restos;
    });
  }

  addResto(resto) {
    ParseService.addResto(resto);
  }
}
