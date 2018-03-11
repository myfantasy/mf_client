export default {
    "/user/login.json"(){
        //return {"is_ok":true,"err_code":1,"err_text":"Не нашлось сочетания логин и пароль", "user_id":324324};
        return {"is_ok":true, "user_id":324324};
    },
    "/user/data/account_info_get.json"(){
        return {"user_info":{"user_id":100519,"login":"sch","name":'Alice',"file_id":null},"is_ok":true};
    }


}