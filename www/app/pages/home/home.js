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

  compareRestosRating(a, b) {
    return b.count - a.count;
  }

  fetchRestos() {
    let that = this;
    ParseService.getRestos().then(function(restos) {
      that.restos = restos.sort(that.compareRestosRating);
    });
  }

  addResto(resto) {
    ParseService.addResto(resto).then(() =>
      this.fetchRestos();
    );
  }

  rate(resto) {
    ParseService.saveRating(resto.id, 1);
    resto.hasUserRated = true;
    resto.count += 1;
    this.restos = this.restos.sort(this.compareRestosRating);
  }
}
