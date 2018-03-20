
// Import Vue
import Vue from 'vue';

// Import F7
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';

// Import F7 Styles
import Framework7Styles from 'framework7/dist/css/framework7.css';

// Import AXIOS
import axios from 'axios';
import VueAxios from 'vue-axios';

import sha1 from 'sha1';

// Import Vue resource
//import VueResource from 'vue-resource';

//Auth module
import auth from './js/auth.js';

//Import Framework7 Debuger
import framework7Debug from './js/framework7.debug.js';

//Import Framework7 Debuger
//import Sha from './js/sha.js';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

// Import Routes
import Routes from './routes.js';

// Import App Component
import App from './app';


Vue.config.devtools = true;
Vue.config.productionTip = false;
Vue.config.debug = true;
//Vue.config.silent = true;

//Vue.prototype.$hostname = (Vue.config.productionTip) ? 'http://127.0.0.1:5000' : 'https://www.mobhelper-rbsb.ru'

//Global reactive data array
var mydata = { news:null, tasks:null, channellist:null};

//Global variable
//Vue.prototype.$axiosConfig = axiosConfig; //{ headers: {'Content-Type': 'application/json'} };
Vue.prototype.$loginURL = 'http://194.87.93.37:81/api/login'
Vue.prototype.$dataURL = 'http://194.87.93.37:81/api/tasks';
Vue.prototype.$taskURL = 'http://194.87.93.37:81/api/task';
Vue.prototype.$newsURL ='http://194.87.93.37:81/api/news';

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)

// Init Vue Axios Plugin
Vue.use(VueAxios, axios)

// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    id: 'io.framework7.mobhelperapp', // App bundle ID
    name: 'Mobile Helper of Manager RB', // App name
    theme: 'ios', // Automatic theme detection off
    animateNavBackIcon:true,
    modalButtonCancel: 'Отмена',
    modalTitle: '',
    modalButtonOk: 'Ок',
    modalPreloaderTitle: 'Загрузка...',

    material: true,
    cache: false,
    domCache: false,
    pushState: true,
    swipePanel: 'left',
    swipeBackPage: false,
    swipePanelThreshold: 15,
    smartSelectBackText: 'Назад',
    smartSelectPickerCloseText: 'Закрыть',
    smartSelectPopupCloseText: 'Закрыть',
    swipePanelOnlyClose: true,
    preloadPreviousPage: false,
    uniqueHistory: false,
    debugger: true, //Enable dеbug

    // App routes
    routes: Routes,
       //

  },
  mode:'history',

  // put data block
  data: mydata,

  user: {
    authenticated: false
  },

  // Register App Component
  components: {
    app: App
  },

  //computed block
  computed: {
    //Computed function
    newsUrl: function () {
        return '/analize/' + this.ID_TASK;
    },
    CurrentDate: function () {
      return new Date().toLocaleDateString();
    }


  },

  //On create
    created: function(){
      //this.getNews();
      //this.getTask();
      //this.prepareChannelList();
    },


    /*mounted(){
        this.getNews();
    },*/

    //My methods
    methods: {

      GetAllTaskCount(){
        var count = this.$root.tasks
        if (count != null && count != undefined && count.length > 0) {
            return count.length;
        }
        else {
            return 0;
        }
      },
      isLoadingTasks() { // <loader v-if="!isLoadingTasks()" />
        var count = this.$root.tasks
        if (count != null && count != undefined && count.length > 0) {
          return true;
        } else {
          return false;
        }
      },

     //Get all tasks
      getTasks: function(){
        let axiosConfig = { headers: auth.getAuthHeader() };
        const self = this
        this.loading = true
        axios.get(this.$dataURL, axiosConfig).then((response)=>{
          console.log(response);
          this.loading = false;
          this.$root.tasks = response.data; //self.news = response.data;
          this.channellist = this.countChannelList(this.$root.tasks); //After recieve data starting prepare Short Channel list
          }).catch((error)=>{
              console.log(error);
              })
      },

        //Make Deduplicated Channel list //Function return unique values with count from array by name
        countChannelList: function(originalarr) {
        var compressed = [];
        // make a copy of the input array(Not reference)
        var copyarr = JSON.parse(JSON.stringify(originalarr))//Object.assign({}, originalarr);
        // first loop goes over every element
        for (var i = 0; i < originalarr.length; i++) {
          var myCount = 0;
          // loop over every element in the copy and see if it's the same
          for (var w = 0; w < copyarr.length; w++) {
            if (originalarr[i].violation_type_top == copyarr[w].violation_type_top) {
              // increase amount of times duplicate is found
              myCount++;
              // sets item to undefined
              delete copyarr[w].violation_type_top;
            }
          }
          if (myCount > 0) {
            //assemble new array and add to new result array {VIOLATION_TYPE_TOP, VIOLATION_TYPE_ID, count}
            var a = new Object();
            a.violation_type_top = originalarr[i].violation_type_top;
            a.violation_type_id = originalarr[i].violation_type_id;
            a.count = myCount;
            compressed.push(a);
          }
        }
        return compressed;
        },

        // Get One News
        /*GetOneNews:function(newsid){
          this.news.id.filter(newsid);
        },*/

        OneNewsfilterByID: function(newsId) {
          /*if ('id' in obj && typeof(obj.id) === 'number' && !isNaN(obj.id)) {
            return true;
          } else {
            invalidEntries++;
            return false;
          }*/
        //var newsId = this.$route.params.id;
        var currentNews;
        //this.$root.news.
        for (var e = 0; e< this.news.length; e++)
        {
          if (this.news[i].id == newsId)
          {
            currentNews = this.news[i];
            return currentNews;
          }

        }

    },

    //
    FilterNews: function (arr,newsid) {
      return arr.id.filter(function (id) {
        return newsid === id
        })
      },


    // For testing subitems v-for
    getSubItems:function(item){
      return item.attributes.phone.filter(); // whatever logic you need to return the correct data
    }
    /*
      <li v-for="item in items.data">
          {{ item.attributes.name }}
          <ul>
              <li v-for="subitem in getSubItems(item)">
                 {{ subitem.prop }}
              </li>
          </ul>
      </li>
      */
    //Filther test:   v-for="post in posts | filterBy employee.relationships.post.data.id in 'id'"

  /*
  on: {
      pageInit: function (e, page) {
           console.log(page.context)
           console.log(page.route.context)
       },
       pageAfterOut: function () {
           // page has left the view
       },
  },
*/


}

});
