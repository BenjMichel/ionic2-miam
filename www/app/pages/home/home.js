import {Page} from 'ionic/ionic'
import {ParseService} from '../../services/parseService'

@Page({
  templateUrl: 'app/pages/home/home.html',
})
export class HomePage {
  constructor() {}

  addResto(resto) {
    ParseService.addResto(resto);
  }
}
