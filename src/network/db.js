import Cookies from "js-cookie";

class DB {

  static initialize(data) {

    Cookies.set('token', data.token.token);
    Cookies.set('refreshToken', data.token.refreshToken);
    Cookies.set('user', JSON.stringify(data.user));
  }

  static getUser() {
    const user = Cookies.get('user');

    if(user!=null){
      return JSON.parse(user)
    }else{
      return null;
    }
    
  }
}

export default DB;
