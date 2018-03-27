<!-- Analize Page Template -->
<template>
    <f7-page>
    	<template v-for="onetask in $root.tasks"  v-if="onetask.id_task == taskid">
		<f7-navbar>
      <f7-nav-left><f7-link icon-f7="chevron-left" back></f7-link></f7-nav-left>
			<f7-nav-title>{{onetask.vt}}<br/><span>на {{onetask.dt_end}}</span></f7-nav-title>
			<f7-nav-right><f7-link icon-f7="info" class="item-link item-content popup-open" data-popup="#my-popup"></f7-link></f7-nav-right>
		</f7-navbar>

	<f7-block v-if="onetask.plan_value != null && onetask.fact_value != null">
		<f7-row no-gap>
		  <f7-col width="50" class="plan"><span>{{onetask.plan_value}}</span><br/>план</f7-col>
		  <f7-col width="50" class="plan"><span>{{onetask.fact_value}}</span><br/>факт</f7-col>
		</f7-row>
	</f7-block>

	<f7-block strong>{{onetask.tsk}}</f7-block>

	<f7-block strong class="bigtext">
		<f7-link external button-active color="blue" :href="'/data/task_' + onetask.id_task + '.pdf'" text-color="blue">Детальная информация по расчёту</f7-link>
	</f7-block>
  <br />
	<f7-button big bold round color="white" :bgColor="onetask.id_status == 1 ?'green':'gray'" @click="openPriorDialog(onetask.id_task)" :text="ButtonTitle(onetask.id_status,onetask.id_priority)"></f7-button>
  <br />
	<f7-button big  round color="white" :bgColor="onetask.id_status == 4 ?'green':'gray'" @click="RejectTask(taskid)" :text="onetask.id_status == '4'?'Отказазано от задачи':'Отказаться от задачи'"></f7-button>


		<!-- Popup Analize-->
	    <f7-popup id="my-popup">
			<f7-view>
				<f7-page>
					<f7-navbar :title="onetask.vt">
						<f7-nav-right>
						  <f7-link popup-close>Закрыть</f7-link>
						</f7-nav-right>
					</f7-navbar>
				  <f7-block><p>{{onetask.tsk}}</p></f7-block>
				</f7-page>
			</f7-view>
	    </f7-popup>


		<!-- Popup Task-->
	    <f7-popup id="my-task-popup">
			<f7-view>
				<f7-page>
					<f7-navbar title="Задание">
						<f7-nav-right>
						  <f7-link popup-close>Закрыть</f7-link>
						</f7-nav-right>
					</f7-navbar>
				  <f7-block><p>onetask.tsk</p></f7-block>
				</f7-page>
			</f7-view>
	    </f7-popup>





	</template>
    </f7-page>

</template>

<script>
import main from '../main.js';
import auth from '../js/auth.js';

export default {
    props: {
      taskid: String,
    },
    data: function () {
      return {
      	//mynews: this.$root.news
      }
    },

    methods: {
      TakeTask(taskid) {
        let axiosConfig = { headers: auth.getAuthHeaderForPost() };
            var updatetask = {
              id_task: taskid,
              flg_new: "0",
              id_status : "1",
            id_priority : "0",
            nk_reason : ""
            }

          this.axios.post(this.$taskURL, JSON.stringify(updatetask), axiosConfig).then((response) => {
            if (response.status === 'success') { self.state.data = response.data; }
            console.log("Task updated!");
            this.$root.getTasks();
            //app.f7.dialog.alert("Статус изменён!")
          }).catch((err) => {
            app.f7.dialog.alert("Не удалось изменить статус!")
            //context.error = err
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

      TakeTaskWithParam(_taskid,_fnew, _status,_prior,_reason) {

        let axiosConfig = { headers: auth.getAuthHeaderForPost() };
        var updatetask = {
          id_task: _taskid.toString(),
          flg_new: _fnew, //флаг нового отклонения (1 - новое/0 - прочитанное)
          id_status : _status, //0 - Не взято в работу, 1	- В работе, 2	- Завершено, 3 -??? , 4 - Отказано
          id_priority : _prior, //0 - Не назначен, 1	- Высокий, 2 - Средний, 3	- Низкий
          nk_reason : _reason //перечень причин послуживших возникновению задачи
        }

        this.axios.post(app.__vue__.$taskURL, JSON.stringify(updatetask), axiosConfig).then((response) => {
          if (response.status === 'success') { self.state.data = response.data; }
          console.log("Task updated!");
          this.$root.getTasks();
        }).catch((err) => { app.f7.dialog.alert("Не удалось отправить задачу!"); });

      },

      openPriorDialog(id) {
        const self = this;
        const app = self.$f7;
        if (!self.dialog) {
          self.dialog = app.dialog.create({
            title: 'Приоритет',
            text: 'С каким приоритетом принять в работу?',
            //label: true,
            buttons: [
              {
                text: 'Высокий приоритет',
                bold: true,
                onClick: function () {
                  self.TakeTaskWithParam(id,"0","1","3","");
                }
              },
              {
                text: 'Нормальный приоритет',
                onClick: function () {
                  self.TakeTaskWithParam(id,"0","1","2","");
                }
              },
              {
                text: 'Низкий приоритет',
                onClick: function () {
                  self.TakeTaskWithParam(id,"0","1","1","");
                }

              },
              {
                text: 'Отмена',
                color: 'red',
                close: true,
              },
            ],
            verticalButtons: true,
            on: {
              closed: function () {
                //console.log('Action Sheet close')
              }
            }
          }); //.then(index => { app.dialog.alert(`You clicked Button ${ index + 1 }`) });
        }

        // Open
        self.dialog.open();
      },

      ButtonTitle: function (stat,prior) {
        var text ='', text2 ='';

        if (stat == 1) {
          text = 'В работе';
        } else {
          text = 'Взять в работу';
        }
        if (prior == 1) {
          text2 = '(низкий)';
        } else if (prior == 2) {
          text2 = '(нормальный)';
        } else if (prior == 3) {
          text2 = '(высокий)';
        }
        return text + ' ' + text2;
      }

	},

  computed: {

  },

}
</script>

