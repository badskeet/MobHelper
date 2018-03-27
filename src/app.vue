<template>
  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <!-- <f7-statusbar></f7-statusbar> -->

    <!-- Views/Tabs container -->
    <f7-views tabs toolbar-through class="ios-edges" theme="green">
      <com-toolbar></com-toolbar>

      <!-- Main view/tab, should have "view-main" class. It also has "tab-active" class -->

      <!-- Signal View -->
      <f7-view id="view-signal" tab tab-active>
        <!-- Signal page will be loaded here dynamically from /signal/ route -->
        <page-signal></page-signal>
      </f7-view>

      <!-- Channel View -->
      <f7-view id="view-channel" tab>
        <!-- Channel page will be loaded here dynamically from /signal/ route -->
        <page-channel></page-channel>
      </f7-view>

      <!-- Analize View -->
      <f7-view id="view-analize" tab>
        <!-- Channel page will be loaded here dynamically from /signal/ route -->
        <page-analize></page-analize>
      </f7-view>

      <!-- Monitor View -->
      <f7-view id="view-monitor" tab>
        <!-- Monitor page will be loaded here dynamically from /monitor/ route -->
        <page-monitor></page-monitor>
      </f7-view>

      <!-- Analitics View -->
      <f7-view id="view-analitics" tab>
        <!-- Analitics page will be loaded here dynamically from /analitics/ route -->
        <page-analitics></page-analitics>
      </f7-view>

      <!-- AllNews View -->
      <f7-view id="view-allnews" tab>
        <!-- AllNews page will be loaded here dynamically from /allnews/ route -->
        <page-allnews></page-allnews>
      </f7-view>

      <!-- News View -->
      <f7-view id="view-news" tab>
        <!-- News page will be loaded here dynamically from /news/ route -->
        <page-news></page-news>
      </f7-view>

    </f7-views>

    <!-- Popovers -->
    <f7-popover id="popover-links">
          <f7-list class="wo-bg">
                <f7-list-item media-list link="mailto:ASChernyshev@sberbank.ru;NKGoltyayev@sberbank.ru?subject=App:Помощник руководителя РБ" external title="Обратная связь">
            <div slot="media"><f7-icon f7="chat"></f7-icon></div>
              </f7-list-item>
                <f7-list-item media-list link="#" @click="exit()" login-screen-open="#my-login-screen" title="Выйти" popover-close>
                  <div slot="media"><f7-icon f7="login"></f7-icon></div>
                </f7-list-item>
            </f7-list>
    </f7-popover>

    <!-- Popup -->
    <f7-popup id="popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>Тестовый попап!</f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>


   <!-- Actions signal -->
   <f7-actions target="" id="TakeInWorkActions">
      <f7-actions-group>
        <f7-actions-label>С каким приоритетом принять в работу?</f7-actions-label>
        <f7-actions-button @click="app.f7.dialog.alert('test1')">Высокий приоритет</f7-actions-button>
        <f7-actions-button label @click="$f7.alert('test2')">Нормальный приоритет</f7-actions-button>
        <f7-actions-button bold @click="$f7.alert('test3')">Низкий приоритет</f7-actions-button>
      </f7-actions-group>
      <f7-actions-group>
        <f7-actions-button color="red" close bold>Отмена</f7-actions-button>
      </f7-actions-group>
    </f7-actions>

    <!-- Login Screen -->
    <f7-login-screen id="my-login-screen" :opened="true">
      <f7-view>
        <f7-page login-screen :page-content="false">
          <div slot="fixed" class="page-content login-screen-content mybg">
        <f7-login-screen-title><!--Login Title--></f7-login-screen-title>
        <div style="display: block;height: 300px;"></div>
        <f7-list form>
        <f7-list-item>
          <f7-icon f7="person" slot="media"></f7-icon>
          <f7-label><!--Login Label--></f7-label>
          <f7-input clear-button icon-f7="favorites" name="username" @input="credentials.username = $event.target.value" :value="credentials.username" placeholder="Имя пользователя" type="text"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-icon f7="lock" slot="media"></f7-icon>
          <f7-label><!--Password Label--></f7-label>
          <f7-input clear-button name="password" type="password" @input="credentials.password = $event.target.value" :value="credentials.password" placeholder="Пароль"></f7-input>
        </f7-list-item>
        </f7-list>
        <f7-list>
        <f7-button raised big fill  color="green" class="login-button" title="Войти" @click="submit()"><b>Войти</b></f7-button>
        <f7-block-footer>
          <p>Забыли пароль?</p>
        </f7-block-footer>
        </f7-list>
      </div>
        </f7-page>
      </f7-view>
    </f7-login-screen>


  </div>
</template>

<script>
  import auth from './js/auth.js';
  import Tabbar from './components/tabbar.vue';
  import SignalPage from './pages/signal.vue';
  import ChannelPage from './pages/channel.vue';
  import AnalizePage from './pages/analize.vue';
  import MonitorPage from './pages/monitor.vue';
  import AnaliticsPage from './pages/analitics.vue';
  import AllNewsPage from './pages/allnews.vue';
  import NewsPage from './pages/news.vue';
  export default {
    name: 'home',
    components: {
      'com-toolbar': Tabbar,
      'page-signal': SignalPage,
      'page-channel': ChannelPage,
      'page-analize': AnalizePage,
      'page-monitor': MonitorPage,
      'page-analitics': AnaliticsPage,
      'page-allnews': AllNewsPage,
      'page-news': NewsPage
    },

    data() {
      return {
        // We need to initialize the component with any properties that will be used in it
        credentials: {
          username: '',
          password: ''
        },
        error: '',
        user: auth.user

      }
    },

    methods: {

      submit() {
        var credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }
        // We need to pass the component's this context to properly make use of http in the auth service
        auth.login(this, credentials)
      },
      exit() {
        auth.logout();
      },

      onF7Ready(f7) {
        auth.checkAuth();
        if(this.user.authenticated) {
          console.log("Auth with Token!");
          this.$root.getTasks();
          f7.loginScreen.close('#my-login-screen');
        } else {
          f7.loginScreen.open('#my-login-screen');
          f7.dialog.alert("Срок действия ключа авторизации истёк или ключ неверный!","Авторизация");
        }
      },


    }



  };
</script>



