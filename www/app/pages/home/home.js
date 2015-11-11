import {Page} from 'ionic/ionic'
import {ParseService} from '../../services/parseService'

@Page({
  templateUrl: 'app/pages/home/home.html',
})
export class HomePage {
  constructor() {
    this.restos = [];
    this.fetchRestos();
  }

  fetchRestos() {
    let that = this;
    ParseService.getRestos().then(function(restos) {
      that.restos = restos;
    });
  }

  addResto(resto) {
    ParseService.addResto(resto).then(() =>
      this.fetchRestos();
    );
  }

  rate(resto) {
    resto.isActive = true;
    resto.count += 1;
    ParseService.saveRating(resto.id, 1);
  }
}
