<template>
  <div class="flexColCenterCenter grow">


      <div class="login_form panel">
          <h3>Войдите, используя логин/пароль</h3>
          <div class="error_msg">
              <!--Такой пары логин-пароль не найдено-->
              {{error_msg}}
          </div>
          <div class="input-field">
              <input id="login" ref='login' type="email" class="validate" autofocus>
              <label for="login" data-error="Не похоже на email" data-success="">Ваша почта</label>
          </div>
          <div class="input-field">
              <input id="password" ref='pwd' type="password" class="validate" required>
              <label for="password">Пароль</label>
          </div>

          <div class="actions_bar">
              <a href="#" class="ui_link tleft">
                  Забыли пароль?
              </a>


              <materialbutton type="raised" v-on:click="check_login">Войти</materialbutton>


              <a href="mp.html?page=registration" class="ui_link tright">
                  Регистрация
              </a>
          </div>
      </div>
  </div>
</template>


<script>
import button from '@/components/controls/button';
import User from "@/data model/user.js";

export default {
  name: 'Login',
     components:{
      'materialbutton':button
  },
  data () {
    return {
        'error_msg':'',
    }
  },
  methods:{
    check_login(){
        this.error_msg = '';
        User.check_login($(this.$refs.login).val(), $(this.$refs.pwd).val())
        .then(User.load_current_user)
        .then(loaded => showGoodMessage('vue login', 'check_login', 'Успешный вход'))
        .catch(error => {
            console.log(error);
            this.error_msg = error.err_text;
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
