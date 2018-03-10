<template>
    <div class="body">
      <header>
        <div class="header_left">
            <button id="side-left-menu-activate" class="header-menu-btn" data-activates="side-left-menu">
               <i class="material-icons">menu</i>
            </button>
            <a href="#" class="logo">My<i>Fantasy</i></a>
            <a href="#" class="minilogo">My<i>F</i></a>
            <button class="updateBtn" v-on:click="do_refreash" :class="{irotation : connection_state.is_data_transfer, has_connection_problems: connection_state.is_connection_problems}" ref="update_button">
                <!--<i class="material-icons rotatable" >autorenew</i>-->
                <i class="mdi mdi-sync rotatable"></i>
                <span class="connection_problems_marker">!</span>
            </button>
        </div>

        <div class="header_center">
            <div class="search-panel">
                <input id="searchInput" type="search" placeholder="Поиск..." value="" />
                <button class="search-close-btn" onclick="$('#searchInput').val('');"></button>
            </div>
            <div class="header-center-rigth">
                <div class="switch">
                    <label>
                        <input type="checkbox">
                        <span class="lever"></span>
                    </label>
                </div>
            </div>
        </div>

        <div class="header_right">
            <button v-on:click="testMethod">test</button>
            <router-link to="/login">Вход/Регистрация</router-link>

            <button class="header-notification-none-btn tooltipped hide" data-position="bottom" data-delay="50" data-tooltip="Пока уведомлений нет"></button>
            <button class="header-notification-btn dropdown-button hide" data-activates='moreActions1'></button>

            <button type="button" class="dropdown-button hide"
                    data-activates="currentUser-miniActions"
                    data-beloworigin="true"
                    data-constrainWidth="false"
                    data-gutter="0">
                <span>Alice</span> <img src="images/alice.png" class="user-icon-circle" />
            </button>

            <ul id='currentUser-miniActions' class='dropdown-content'>
                <li><a href="#"><i class="material-icons">perm_identity</i>Мой профиль</a></li>
                <li><a href="#"><i class="material-icons">settings</i>Мои настройки</a></li>
                <li class="divider"></li>
                <li><a href="#"><i class="material-icons">exit_to_app</i>Выход</a></li>
            </ul>
        </div>
      </header>
     
      <div class="main">
        <div class="nav-area">
            <nav class="side-menu side-nav fixed" id="side-left-menu">
                <ul>
                    <li><a href="#"><i class="mdi mdi-24px mdi-book-open-page-variant"></i>Продолжить чтение</a></li>
                </ul>
                <ul>
                    <li><router-link to="/genres"><i class="material-icons">list</i>Жанры</router-link></li>
                    <li><a href="#"><i class="material-icons">close</i>Lib.rus.ec</a></li>
                </ul>
                <ul>
                    <li class="active"><a href="mp.html?page=MyProfile"><i class="material-icons">perm_identity</i>Моя страница</a></li>
                    <li><a href="#"><i class="material-icons">group</i>Друзья</a></li>
                    <li><a href="#"><i class="material-icons">message</i>Сообщения</a></li>
                    <li><a href="#"><i class="material-icons">track_changes</i>Подписки</a></li>
                    <li><a href="#"><i class="material-icons">pets</i>Последователи</a></li>
                    <li><a href="#"><i class="material-icons">casino</i>Мои игры слов</a></li>
                </ul>
                <ul>

                    <li class="dropZone">
                        <a href="#"><i class="material-icons">done</i>Прочитанное</a>
                        <div class="dropZoneHover"><i class="material-icons">add</i></div>
                    </li>
                    <li class="dropZone"><a href="#"><i class="material-icons">star</i>Помеченное</a>
                        <div class="dropZoneHover"><i class="material-icons">add</i></div>
                    </li>
                    <li class="dropZone"><a href="#"><i class="material-icons">favorite</i>Любимое</a>
                        <div class="dropZoneHover"><i class="material-icons">add</i></div>
                    </li>
                </ul>
                <ul>
                    <li><a href="#"><i class="material-icons">add</i>Создать полку</a></li>
                </ul>
            </nav>
        </div>
        <div class="main_center">
            <nav class="content-type-nav">
                <ul class="tabs">
                    <li class="tab"><a href="#test1">Книги</a></li>
                    <li class="tab"><a href="#test2">Фильмы</a></li>
                    <li class="tab"><a href="#test3">Песни</a></li>
                    <li class="tab"><a href="#test4">Страницы</a></li>
                    <li class="tab"><a href="#test5">Арты</a></li>
                    <li class="tab"><a href="#test6">Игры Слов</a></li>
                </ul>
            </nav>
            <router-view />
        </div>
        <div class="main_aside">
            <button onclick="$('body').removeClass('BlueTheme').removeClass('GreenTheme').addClass('OrangeTheme');">Orange</button>
            <button onclick="$('body').removeClass('OrangeTheme').removeClass('GreenTheme').addClass('BlueTheme');">Blue</button>
            <button onclick="$('body').removeClass('BlueTheme').removeClass('OrangeTheme').addClass('GreenTheme');">Green</button>
        </div>
      </div>

        <footer>
            <nav>
                <menu>
                    <li><a href="#">О проекте</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Правила</a></li>
                </menu>

                <menu>
                    <li><a href="#">Новости</a></li>
                    <li><a href="#">О нас</a></li>
                    <li><a href="#">Благодарности</a></li>
                </menu>

            </nav>
            <div class="footer-copyright">
                © 2017 MyFantasy project
            </div>
        </footer>
    </div>
</template>


<script>
import User from "@/data model/user.js";
import data_provider from "@/data model/service call.js";

export default {
  name: "AdminMasterPage",
  data() {
    return {
      connection_state: data_provider.state
    };
  },
  computed: {

  },
  methods: {
    testMethod() {
      var u1 = new User("name 1");
      console.log("vue control call");
      User.load_current_user()
        .then(res => {
          console.log("vue control get res", res);
        })
        .catch(err => console.log("vue get error"));
    },
    do_refreash() {}
  },
  mounted() {
    $("#side-left-menu-activate").sideNav();
      $(this.$refs.update_button).tooltip({tooltip: 'Обновить'});
  },
  watch: {
    'connection_state.is_connection_problems'(to, from) {
        var update_btn = this.$refs.update_button;

        if(this.connection_state.is_connection_problems)
            $(update_btn).tooltip({tooltip: 'Имеются проблемы со связью'});
        else if(this.connection_state.is_data_transfer)
            $(update_btn).tooltip({tooltip: 'Идет обновление данных'});
        else
            $(update_btn).tooltip({tooltip: 'Обновить'});
           
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.updateBtn {
  .connection_problems_marker {
    content: "!";
    color: white;
    visibility: hidden;
  }
  &.has_connection_problems {
    .connection_problems_marker {
      visibility: visible;
    }
  }
}
</style>
