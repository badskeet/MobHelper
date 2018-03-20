<!-- News Page Template -->
<template id="page-news">
    <f7-page>
		<f7-navbar>
			<f7-nav-left><f7-link icon-f7="chevron-left" back></f7-link></f7-nav-left>
			<f7-nav-title>Новости</f7-nav-title>
		</f7-navbar>
		<div v-for="onenews in $root.news" :key="onenews.id" v-if="onenews.id == newsid" >
			<f7-block-header>{{CustomDate(onenews.date)}}</f7-block-header>
		    <f7-block-title>{{onenews.title}}</f7-block-title>
		    <f7-block strong>{{onenews.description}}</f7-block>
		</div>
    </f7-page>
</template>


<script>

//import main from '../main.js';

export default {


    props: {
      newsid: String,
    },

    data: function () {
      return {
      	//mynews: this.$root.news
      }
    },

    methods: {
    	CustomDate: function(olddate) { //Example: 2018-01-02 17:33
			var d = new Date(Date.parse(olddate)),
			custformat = [ d.getFullYear(),('0' + (d.getMonth()+1)).slice(-2),('0' + d.getDate()).slice(-2)].join('-')
                 + ' ' + [ ('0' + d.getHours()).slice(-2), ('0' + d.getMinutes()).slice(-2)].join(':');
		  return custformat;
		}
    }
}
</script>

