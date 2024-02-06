import Cookies from "js-cookie";

class DB {

  static initialize(data) {

    Cookies.set('token', data.token.token);
    Cookies.set('refreshToken', data.token.refreshToken);
    Cookies.set('user', JSON.stringify(data.user));
  }

  static getUser() {
    
    return JSON.parse(Cookies.get('user'))
  }
}

export default DB;
