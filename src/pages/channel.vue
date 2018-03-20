<!-- Channel Page Template -->
<template>
    <f7-page>
		<f7-navbar>
			<f7-nav-left><f7-link icon-f7="chevron-left" back></f7-link></f7-nav-left>
			<f7-nav-title>{{vttname}}</f7-nav-title>
		</f7-navbar>
		<f7-list media-list>
			<f7-list-item v-for="chtask in $root.tasks"
      :key="chtask.id_tasks"
      v-if="chtask.violation_type_top == vttname"
      :link="'/analize/' + chtask.id_task + '/'"
      :title="chtask.vt"
      after=""
      subtitle=""
      :text="chtask.tsk"
      :badgeColor="FromNowToEnd(chtask.dt_end) < 0?'red':FromNowToEnd(chtask.dt_end) < 30?'orange':'green'"
      :badge="FromNowToEnd(chtask.dt_end)+' дней'"></f7-list-item>
		</f7-list>
    </f7-page>
</template>

<script>
//import signal from '../pages/signal.vue';
export default {
  //name: 'Channel',
  props: {
      vttname: String,
  },

  data () {
    return {

    }
  },

  methods: {
      FromNowToEnd: function(eventdate) {
      var d = new Date(Date.parse(eventdate));
      var nowd = new Date();
      var diffday = (d - nowd)/ 86400000;
      return Math.round(diffday);
    },


  }

}
</script>
