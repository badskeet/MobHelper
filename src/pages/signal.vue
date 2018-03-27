	<!-- Signal Page Template -->
	<template>
		<f7-page>
			<f7-navbar>
				<f7-nav-title>Сигналы</f7-nav-title>
				<!-- <f7-nav-right><f7-link icon-f7="sort"></f7-link></f7-nav-right> -->
			</f7-navbar>
		    <f7-subnavbar>
		        <f7-segmented class="segmented-raised">
		            <f7-link class="mygreenbutton" tab-link href="#tab-1">Все</f7-link>
		            <f7-link class="mygreenbutton" tab-link href="#tab-2" tab-link-active>По типу</f7-link>
		            <f7-link class="mygreenbutton" tab-link href="#tab-3">В работе</f7-link>
		        </f7-segmented>
			</f7-subnavbar>
      <loader v-if="!this.$root.isLoadingTasks()" />
      <template v-if="this.$root.isLoadingTasks()" >
        <f7-tabs>
          <f7-tab id="tab-1">
            <div class="list media-list">
              <ul>
                <li v-for="listall in $root.tasks" :key="listall.id_task" class="swipeout">
                  <a :href="'/analize/' + listall.id_task + '/'" class="item-link item-content">
                    <div class="item-content swipeout-content"></div>

                    <div class="item-inner">

                      <div class="item-title-row">
                        <div class="item-title">{{listall.violation_type_top}}</div>
                        <div class="item-after">
                          <f7-badge :color="FromNowToEnd(listall.dt_end) < 0?'red':FromNowToEnd(listall.dt_end) < 30?'orange':'green'">{{FromNowToEnd(listall.dt_end)+' дней'}}</f7-badge>
                        </div>
                      </div>
                      <div class="item-subtitle"></div>
                      <div class="item-text">{{listall.vt}}</div>

                    </div>

                    <div class="swipeout-actions-right swipeout-close">
                      <!-- <f7-swipeout-button close color="green" @click="openActionsPopover(listall.id_task)">В работу</f7-swipeout-button> -->
                      <f7-swipeout-button color="red"  @click="СancellationTask(listall.id_task)">Отклонить</f7-swipeout-button>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </f7-tab>
          <f7-tab id="tab-2" tab-active>
            <div class="list media-list">
              <ul>
                <li v-for="blocklist in $root.channellist">
                  <a :href="'/channel/' + blocklist.violation_type_top + '/'" class="item-link item-content">
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">{{blocklist.violation_type_top}}</div>
                        <div class="item-after">
                          <f7-badge color="gray" v-if="blocklist.count === 1">{{blocklist.count}}</f7-badge>
                          <f7-badge color="orange" v-if="blocklist.count > 1 && blocklist.count <= 5">{{blocklist.count}}</f7-badge>
                          <f7-badge color="red" v-if="blocklist.count > 5">{{blocklist.count}}</f7-badge>
                        </div>
                      </div>
                      <div class="item-subtitle"></div>
                      <div class="item-text"></div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </f7-tab>
          <f7-tab id="tab-3">
          <!--Circle channel badge<div class="circ"><span>Эк</span></div>-->
            <f7-list media-list>

              <f7-list-item v-for="inworklist in $root.tasks"
              :key="inworklist.id_task"
              :link="'/analize/' + inworklist.id_task + '/'"
              :title="inworklist.violation_type_top"
              after=""
              :subtitle="inworklist.vt"
              :text="inworklist.tsk"
              v-if="inworklist.id_status === 1"
              :badgeColor="FromNowToEnd(inworklist.dt_end) < 0?'red':FromNowToEnd(inworklist.dt_end) < 30?'orange':'green'"
              :badge="FromNowToEnd(inworklist.dt_end)+' дней'"
              icon="info">

              </f7-list-item>

            </f7-list>
          </f7-tab>
        </f7-tabs>
      </template>
		</f7-page>
	</template>


<script>
import { f7Navbar, f7Page, f7BlockTitle, f7Block, f7Link, f7Button, f7Actions, f7ActionsGroup, f7ActionsLabel, f7ActionsButton } from 'framework7-vue';
import analize from '../pages/analize.vue';
import main from '../main.js';
import auth from '../js/auth.js';
import Loader from '../components/loader.vue';
//import moment from 'moment';

export default {
  components: {
    f7Page,
    f7Navbar,
    f7BlockTitle,
    f7Block,
    f7Link,
    f7Button,
    f7Actions,
    f7ActionsGroup,
    f7ActionsLabel,
    f7ActionsButton,
    Loader,
  },
	name: 'signal',
    data: function () {
      return {
      }
    },

    methods: {

    	FromNowToEnd: function(eventdate) { //Input: 2018-01-02 Output: Digit
			var d = new Date(Date.parse(eventdate));
			var nowd = new Date();
			var diffday = (d - nowd)/ 86400000;
			return Math.round(diffday);
		  },

		  TakeInWork(taskid) {
			  analize.TakeTask(taskid);
		  },

      СancellationTask(id) {
        const self = this;
        app.f7.dialog.confirm("Вы действительно хотите отклонить задачу?", "Задача", function () {
          self.RejectTask(id.toString());
          app.f7.dialog.alert('Задача ' + id + ' отклонена!','Задача');

        });


      },

      RejectTask(taskid) {

        let axiosConfig = { headers: auth.getAuthHeaderForPost() };
        var updatetask = {
          id_task: taskid,
          flg_new: "0",
          id_status : "4",
          id_priority : "0",
          nk_reason : ""
        }

        this.axios.post(app.__vue__.$taskURL, JSON.stringify(updatetask), axiosConfig).then((response) => {
          if (response.status === 'success') { self.state.data = response.data; }
          console.log("Task updated!");
          this.$root.getTasks();
        }).catch((err) => { app.f7.dialog.alert("Не удалось отправить задачу!"); });

      },

      actionsToPopoverClose(){
        const self = this;
        if (self.actionsToPopover) {
          self.actionsToPopover.destroy();
        }
      },

	    openActionsPopover(id) {
	      const self = this;
	      const app = self.$f7;
	      if (!self.actionsToPopover) {
	        self.actionsToPopover = app.actions.create({
	          buttons: [
	            {
	              text: 'С каким приоритетом принять в работу?',
	              label: true,
	            },
	            {
	              text: 'Высокий приоритет',
	              bold: true,
                onClick: function () {
                  app.dialog.alert('Button1 clicked '+id, "Функция неактивна")
                }
	            },
	            {
	              text: 'Нормальный приоритет',
	              onClick: function () {
                  app.dialog.alert('Button1 clicked '+id, "Функция неактивна")
                  //analize.TakeTask(id)
	              }
	            },
	            {
	              text: 'Низкий приоритет',
                onClick: function () {
                  app.dialog.alert('Button1 clicked '+id, "Функция неактивна")
                }
	            },
	            {
	              text: 'Отмена',
	              color: 'red',
                close: true,
                onClick: function () {
                  //this.actionsToPopoverClose();
                  //this.actionsToPopover.destroy();
                }

	            },
	          ],
	          // Need to specify popover target
	          //targetEl: self.$el.querySelector('.button-to-popover'),
            on: {
              closed: function () {

                const self = this;
                if (!self.actionsToPopover) return;
                else {
                  self.app.ations.destroy();
                  //self.actionsToPopover.destroy();
                }

                console.log('Action Sheet closed');

              }
            }
	        });
	      }

	      // Open
	      self.actionsToPopover.open();
	    },

    },

    on: {
      pageBeforeRemove(){
        const self = this;
        if (self.actionsToPopover) {
          self.actionsToPopover.destroy();
        }
      },
    }



}
</script>





