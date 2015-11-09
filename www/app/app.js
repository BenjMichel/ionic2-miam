import {App, Platform, StatusBar} from 'ionic/ionic';
import {LoginPage} from './pages/login/login';
import {HomePage} from './pages/home/home';
import {LoginService} from './services/loginService';
import {ParseService} from './services/parseService';

@App({
  template: '<ion-nav [root]="root"></ion-nav>',
})

export class MyApp {
  constructor(platform: Platform) {
    this.platform = platform;
    this.initializeApp();
    this.root = (LoginService.isConnected()? HomePage : LoginPage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');
      StatusBar.setStyle(StatusBar.DEFAULT);
      ParseService.init();
    });
  }
}
