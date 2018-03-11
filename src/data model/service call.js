var service_call_cache = {};

function dev_promise(data, is_reject){
    return new Promise((resolve, reject)=> {
        var tmp = typeof data == "function" ? data() : data;
        if(tmp && tmp.is_ok == false){
            setTimeout(()=> reject(tmp), 100);

        }
        else{
            if(is_reject == true){
                setTimeout(()=> reject({is_ok: false, err_type: 'transport'}), 1000);
            }
            else{
                var tmp = typeof data == "function" ? data() : data;
                setTimeout(()=> resolve(tmp), 100);
            }
        }
    })
  };


import test_user from '@/data model/test data/test user.js'
import test_genres from '@/data model/test data/test genres.js'

var test_provider = {
    get(store_in_cache, url){

        var token = this.state.active_tokens.length;
        this.state.active_tokens.push(token);
        this.state.is_data_transfer = true;
        
        return test_provider_get(url, token, 0)       
        .then(res => {
            console.log('test_provider then 1',res);
            if(store_in_cache && !res.cache_date){
                console.log('updating cache');
                service_call_cache[url] = {cache_date: Date.now(), retult:Object.assign({},res)};
            }
            
            this.state.active_tokens.remove(token);
            this.state.is_data_transfer = this.state.active_tokens.length > 0;

            this.state.problem_tokens.remove(token);
            this.state.is_connection_problems = this.state.problem_tokens.length > 0;
            return res;
        });      
    },
    post(url, data){
        console.log('post call ', url, data);
      return this.get(false, url);  
    },
    getCache(){
        return service_call_cache;
    },
    delete_from_cache(url){
        service_call_cache[url] = undefined;
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

        if(error && error.err_type && error.err_type == 'transport'){
            test_provider.state.problem_tokens.push(token);
            test_provider.state.is_connection_problems = true;
            if(attempt >= test_provider.state.number_of_attempts_with_cache && test_provider.getCache() && test_provider.getCache()[url]){
                console.log('returning from client cache');
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


var real_provider_hidden = {
    ajax_call_get(url, timeout = 2000){
        return new Promise(function (resolve, reject) {
            console.log('call service to', url);
            const xhr = new XMLHttpRequest();
            xhr.timeout = timeout;
            xhr.onreadystatechange = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var res = xhr.response;
                        if(typeof xhr.response == "string")
                            res = JSON.parse(xhr.response);
                    
                        if(res.is_ok == true)
                            resolve(res);
                        else {
                            console.log("Service return error!", res);
                            reject(res);
                        }
                    } else {
                        console.log('service call failed with status ' + xhr.status, url);
                        reject({is_ok: false, err_type: 'transport', err_text: xhr.status + " " + xhr.statusText});
                    }
                }
            }
            xhr.ontimeout = function () {
                console.log('service call failed by timeout', url);
                reject({is_ok: false, err_type: 'transport', err_text: 'timeout'})
            }
            xhr.open('get', url, true)
            xhr.send();
        });
    },
    ajax_call_post(url, data, timeout = 2000){
        return new Promise(function (resolve, reject) {
            var serialData = JSON.stringify(data);
            console.log('call post service to', url, data, serialData);
            const xhr = new XMLHttpRequest();
            xhr.timeout = timeout;
            xhr.onreadystatechange = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var res = xhr.response;
                        if(typeof xhr.response == "string")
                            res = JSON.parse(xhr.response);
                        
                        if(res.is_ok == true)
                            resolve(res);
                        else {
                            console.log("Service return error!", res);
                            reject(res);
                        }
                    } else {
                        console.log('service call failed with status ' + xhr.status, url);
                        reject(xhr.status);
                    }
                }
            }
            xhr.ontimeout = function () {
                console.log('service call failed by timeout', url);
                reject('timeout')
            }
            xhr.open('post', url, true)
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(serialData);
        });
    },
    calc_timeout_by_attempt(attempt){

        if(attempt == 0)
            return 2000;
        else if(attempt == 1)
            return 10000;
        else if(attempt == 2)
            return 20000;
        else
            return 30000;
    },
    get_with_cache_and_recall(url, token, attempt = 0){
        console.log(attempt, ' call get ', url);
        return this.ajax_call_get(url, this.calc_timeout_by_attempt(attempt))
        .catch(error => {
    
            if(error && error.err_type && error.err_type == 'transport'){
                real_provider.state.problem_tokens.push(token);
                real_provider.state.is_connection_problems = true;
                if(attempt >= real_provider.state.number_of_attempts_with_cache && test_provider.getCache() && test_provider.getCache()[url]){
                    console.log('returning from client cache');
                    return Promise.resolve(Object.assign({}, real_provider.getCache()[url].result));
                }
                else if (attempt >= this.state.number_of_attempts)
                    return Promise.reject(error);
                else return new Promise((resolve, reject)=> {
                    console.log('wait '+calc_wait_time_by_attempt(attempt)+' sec for next connect');
                    setTimeout(()=> resolve(this.get_with_cache_and_recall(url, token, attempt + 1)), calc_wait_time_by_attempt(attempt));
                });
            }
            else return Promise.reject(error);
        });
    },
    post_with_recall(url, data, token, attempt = 0){
        console.log(attempt, ' call post ', url);
        return this.ajax_call_post(url, data, this.calc_timeout_by_attempt(attempt))
        .catch(error => {
    
            if(error && error.err_type && error.err_type == 'transport'){
                real_provider.state.problem_tokens.push(token);
                real_provider.state.is_connection_problems = true;

                if (attempt >= this.state.number_of_attempts)
                    return Promise.reject(error);
                else return new Promise((resolve, reject)=> {
                    console.log('wait '+calc_wait_time_by_attempt(attempt)+' sec for next connect');
                    setTimeout(()=> resolve(this.post_with_recall(url, data, token, attempt + 1)), calc_wait_time_by_attempt(attempt));
                });
            }
            else return Promise.reject(error);
        });
    }
}


var real_provider = {
    get(store_in_cache, url){

        var token = this.state.active_tokens.length;
        this.state.active_tokens.push(token);
        this.state.is_data_transfer = true;
        
        return real_provider_hidden.get_with_cache_and_recall(url, token, 0)       
        .then(res => {
            
            if(store_in_cache && !res.cache_date){
                console.log('updating cache');
                service_call_cache[url] = {cache_date: Date.now(), retult:Object.assign({},res)};
            }
            
            this.state.active_tokens.remove(token);
            this.state.is_data_transfer = this.state.active_tokens.length > 0;

            this.state.problem_tokens.remove(token);
            this.state.is_connection_problems = this.state.problem_tokens.length > 0;
            return res;
        })        
        .catch(error => {
            
            this.state.active_tokens.remove(token);
            this.state.is_data_transfer = this.state.active_tokens.length > 0;

            this.state.problem_tokens.remove(token);
            this.state.is_connection_problems = this.state.problem_tokens.length > 0;

            return Promise.reject(error);
        }); ;      
    },
    post(url, data){
        var token = this.state.active_tokens.length;
        this.state.active_tokens.push(token);
        this.state.is_data_transfer = true;

        return real_provider_hidden.post_with_recall(url, data, token, 0)       
        .then(res => {
            
            this.state.active_tokens.remove(token);
            this.state.is_data_transfer = this.state.active_tokens.length > 0;

            this.state.problem_tokens.remove(token);
            this.state.is_connection_problems = this.state.problem_tokens.length > 0;
            return res;
        })
        .catch(error => {

            this.state.active_tokens.remove(token);
            this.state.is_data_transfer = this.state.active_tokens.length > 0;

            this.state.problem_tokens.remove(token);
            this.state.is_connection_problems = this.state.problem_tokens.length > 0;

            return Promise.reject(error);
        });   

    },
    getCache(){
        return service_call_cache;
    },
    delete_from_cache(url){
        service_call_cache[url] = undefined;
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

export default test_provider;