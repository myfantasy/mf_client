import data_provider from '@/data model/service call.js'


export default class User {
    constructor() {
      this.name = '';
      this.id = 0;
      this.picture = null;
      this.is_logged_in = false;
    }

    clear(){
      this.name = '';
      this.id = 0;
      this.picture = null;
      this.is_logged_in = false;
    }

    static clear_current_user(){
      current_user.clear();
      data_provider.delete_from_cache(queries.get_current_user());
    }

    static load_current_user(use_cache = true){
      
      return data_provider.get(use_cache, queries.get_current_user()).then(current_user_pkg => {
        console.log('user get_current_user then 1', current_user_pkg);
        if(current_user_pkg.is_ok && current_user_pkg.user_info){
          
          current_user.id = current_user_pkg.user_info.user_id;
          current_user.name = current_user_pkg.user_info.name;
          console.log('user get_current_user - current user updated',current_user, current_user_pkg);
        }
      });
    }

    static check_login(login, pwd){
      console.log('test login with ', login, " ["+pwd+"]");
      return data_provider.post(queries.check_login(), {'login': login, 'pwd': pwd, 'need_json': true})
      .then(loaded => {
        //current_user = loaded.user;
        if(loaded.is_ok){
          User.clear_current_user();
          current_user.id = loaded.user_id;
          current_user.is_logged_in = true;
        }
        else return Promise.reject(loaded);
        return loaded;
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
      return "/user/data/account_info_get.json";
    },
    check_login(){
      return "/user/login.json";
    },
    
    logout(){
      return "/user/logout.json";
    }
  }