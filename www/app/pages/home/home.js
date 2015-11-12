import {Page} from 'ionic/ionic'
import {ParseService} from '../../services/parseService'


@Page({
  templateUrl: 'app/pages/home/home.html',
})
export class HomePage {
  constructor() {
    this.restos = [];
    this.fetchRestosInContinuous();
  }

  fetchRestosInContinuous() {
    var that = this;
    const recursiveFetchResto = function () {
      that.fetchRestos();
      setTimeout(function () {
        recursiveFetchResto();
      }, 5000);
    }

    recursiveFetchResto();
  }

  compareRestosRating(a, b) {
    if (a.count != b.count){
      return b.count - a.count;
    }
    return b.name > a.name;
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
    if (resto.hasUserRated) {
      return;
    }
    ParseService.saveRating(resto.id, 1);
    resto.hasUserRated = true;
    resto.count += 1;
    this.restos = this.restos.sort(this.compareRestosRating);
  }
}
