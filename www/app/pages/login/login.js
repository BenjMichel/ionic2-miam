import {Page, NavController} from 'ionic/ionic'
import {HomePage} from '../home/home';

@Page({
  templateUrl: 'app/pages/login/login.html',
})
export class LoginPage {
  constructor(nav: NavController) {
    this.nav = nav;
  }

  login(username) {
    window.localStorage['username'] = username;
    this.nav.push(HomePage);
  }
}
