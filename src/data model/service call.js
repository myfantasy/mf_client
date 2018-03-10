

var service_call_cache = {};

function dev_promise(data, is_reject){
    return new Promise((resolve, reject)=> {

        if(is_reject == true){
          setTimeout(()=> reject({is_ok: false, error_type: 'transport'}), 1000);
        }
        else{
          var tmp = typeof data == "function" ? data() : data;
          setTimeout(()=> resolve(tmp), 300);
        }
    })
  };


import test_user from '@/data model/test data/test user.js'
import test_genres from '@/data model/test data/test genres.js'

var test_provider = {
    get(store_in_cache, url){
        console.clear();

        var token = this.state.active_tokens.length;
        this.state.active_tokens.push(token);
        this.state.is_data_transfer = true;
        console.log(this);
        return test_provider_get(url, token, 0)       
        .then(res => {
            console.log(token,'then inside get call ', res);
            if(store_in_cache && !res.cache_date){
                console.log('updating cache');
                service_call_cache[url] = {cache_date: Date.now(), retult:Object.assign({},res)};
            }
            console.log(store_in_cache, service_call_cache);
            this.state.active_tokens.remove(token);
            this.state.is_data_transfer = this.state.active_tokens.length > 0;

            this.state.problem_tokens.remove(token);
            this.state.is_connection_problems = this.state.problem_tokens.length > 0;
            return res;
        });      
    },
    getCache(){
        return service_call_cache;
    },
    state:{
        active_tokens :[],
        number_of_attempts: 10,
        number_of_attempts_with_cache: 3,
        is_data_transfer: false,
        is_connection_problems: false,
        problem_tokens:[],
    }
};

function calc_wait_time_by_attempt(attempt){
    var res = attempt*500;
    if(res > 4000) return 4000;
    else return res;
}

function test_provider_get(url,token, attempt = 0){
    console.log(attempt, ' call ', url);


    var data = null;
    if(test_user[url])
        data = test_user[url];
    else if(test_genres[url])
        data = test_genres[url];

    return dev_promise(data, attempt != 0)
    .catch(error => {

        if(error && error.error_type && error.error_type == 'transport'){
            test_provider.state.problem_tokens.push(token);
            test_provider.state.is_connection_problems = true;
            if(attempt >= test_provider.state.number_of_attempts_with_cache && test_provider.getCache() && test_provider.getCache()[url]){
                console.log('need return cache');
                return Promise.resolve(Object.assign({}, test_provider.getCache()[url].result));
            }
            else if (attempt >= test_provider.state.number_of_attempts)
                return Promise.reject(error);
            else return new Promise((resolve, reject)=> {
                console.log('wait '+calc_wait_time_by_attempt(attempt)+' sec for next connect');
                setTimeout(()=> resolve(test_provider_get(url, token, attempt + 1)), calc_wait_time_by_attempt(attempt));
            });
        }
        else return Promise.reject(error);
    });
}


export default test_provider;