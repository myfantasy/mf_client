export default {
    "/user/login.json"(){
        return {"is_ok":true,"err_code":1,"err_text":"Не нашлось сочетания логин и пароль", "user_id":324324};
    },
    "/user/get_user.json?id=324324"(){
        return {"is_ok":true, 'user':{
            id:324324,
            title:'',

        }};
    }


}