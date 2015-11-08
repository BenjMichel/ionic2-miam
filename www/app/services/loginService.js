export class LoginService {
  static login(username) {
    window.localStorage['username'] = username;
  }

  static getUsername() {
    return window.localStorage['username'];
  }

  static isConnected() {
    return ((window.localStorage['username'] !== null) &&
      (window.localStorage['username'] !== undefined));
  }

  static logout() {
    delete window.localStorage['username']
  }
}
