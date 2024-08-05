import Cookies from "js-cookie";

class DB {

  static initialize(data) {

    Cookies.set('token', data.token.token);
    Cookies.set('refreshToken', data.token.refreshToken);
  }

  static getUser() {
    const user = Cookies.get('user');

    if(user!=null){
      return JSON.parse(user)
    }else{
      return null;
    }
    
  }

  static updateUser(user) {
    Cookies.set('user', JSON.stringify(user));
  }
}

export default DB;
