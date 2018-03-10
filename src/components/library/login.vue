<template>
  <div class="flexColCenterCenter grow">


      <div class="login_form panel">
          <h3>Войдите, используя логин/пароль</h3>
          <div class="error_msg">
              <!--Такой пары логин-пароль не найдено-->
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
    }
  },
  methods:{
    check_login(){
        console.log($(this.$refs.login).val(), $(this.$refs.pwd).val());
        User.check_login($(this.$refs.login).val(), $(this.$refs.pwd).val());
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
