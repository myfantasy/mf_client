import data_provider from '@/data model/service call.js'


export default class User {
    constructor() {
      this.is_logged_in = false;
      this.name = '';
      
    }


    static load_current_user(use_cache = true){
      console.log('call load_current_user in user class');
      return data_provider.get(use_cache, queries.get_current_user()).then(loaded => {
        console.log('handler in user class ', loaded);return loaded;
      });
    }

    static check_login(login, pwd){
      return data_provider.post(queries.get_current_user(), login, pwd).then(loaded => {
        //current_user = loaded.user;
        console.log('handler in user class ', loaded);return loaded;
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
  }

  var current_user = new User();


  var queries = {
    get_current_user(){
      return "/admin/library/users/get_current_user.json";
    },
    check_login(){
      return "/admin/library/users/check_login.json";
    }
  }