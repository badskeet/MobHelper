<!-- Analize Page Template -->
<template>
    <f7-page>
    	<template v-for="onetask in $root.tasks"  v-if="onetask.id_task == taskid">
		<f7-navbar>
      <f7-nav-left><f7-link icon-f7="chevron-left" back></f7-link></f7-nav-left>
			<f7-nav-title>{{onetask.vt}}<br/><span>на {{onetask.dt_end}}</span></f7-nav-title>
			<f7-nav-right><f7-link icon-f7="info" class="item-link item-content popup-open" data-popup="#my-popup"></f7-link></f7-nav-right>
		</f7-navbar>

	<f7-block>
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
	<f7-button big bold round color="white" :bgColor="onetask.id_status == '1'?'green':'gray'" @click="TakeTask(taskid)" :text="onetask.id_status == '1'?'В работе':'Взять в работу'"></f7-button>
  <br />
	<f7-button big  round color="white" :bgColor="onetask.id_status == '4'?'green':'gray'" @click="RejectTask(taskid)" :text="onetask.id_status == '4'?'Отказазано от задачи':'Отказаться от задачи'"></f7-button>
  <br />
  <f7-button big  round color="black" @click="openPriorDialog()" text="тест"></f7-button>


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

      openPriorDialog() {
        const self = this;
        const app = self.$f7;
        if (!self.dialog) {
          self.dialog = app.dialog.create({
            title: 'Приоритет',
            text: 'С каким приоритетом принять в работу?',
            buttons: [
              {
                text: 'Высокий приоритет',
              },
              {
                text: 'Нормальный приоритет',
              },
              {
                text: 'Низкий приоритет',
              },
            ],
            verticalButtons: true,
          });
        }

        // Open
        self.dialog.open();
      },

	}
}
</script>

