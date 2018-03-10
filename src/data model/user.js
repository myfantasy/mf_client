import data_provider from '@/data model/service call.js'


export default class User {
    constructor() {
      this.title = '';
      this.id = 0;
      this.picture = null;
      this.is_logged_in = false;
    }

    clear(){
      this.title = '';
      this.id = 0;
      this.picture = null;
      this.is_logged_in = false;
    }

    static load_current_user(use_cache = true){
      
      return data_provider.get(use_cache, queries.get_current_user() + "?id=" + current_user.id);
    }

    static check_login(login, pwd){
      console.log('test login with ', login, " ["+pwd+"]");
      return data_provider.post(queries.check_login(), {'login': login, 'pwd': pwd, 'need_json': true})
      .then(loaded => {
        //current_user = loaded.user;
        if(loaded.is_ok){
          current_user.clear();
          current_user.id = loaded.user_id;
          current_user.is_logged_in = true;
        }
        console.log('handler in user class ', loaded);return loaded;
      })
      .catch(error =>  {current_user.clear(); console.log('catch in User login'); return Promise.reject(error);});
      
    }

    static logout(){
      console.log('logout called');
      return data_provider.get(false, queries.logout())
      .then(res => {
        current_user.clear();
        console.log(current_user);
      });
    }




    static staticMethod() {
      console.log('staticMethod',data_provider);
        var res = data_provider.get(true, "/admin/library/users/get_current_user.json");
      return res;
    }
    static anotherStaticMethod() {
      console.log('anotherStaticMethod');
      return this.staticMethod();
    }


    static queries(){
      return queries;
    }

    static get_current_user(){
      return current_user;
    }
  }

  var current_user = new User();


  var queries = {
    get_current_user(){
      return "/user/get_user.json";
    },
    check_login(){
      return "/user/login.json";
    },
    logout(){
      return "/user/logout.json";
    }
  }