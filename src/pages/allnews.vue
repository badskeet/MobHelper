  <!-- AllNews Page Template -->
  <template>
    <f7-page>
		<f7-navbar>
			<f7-nav-title>Все новости</f7-nav-title>
		</f7-navbar>

				<div class="list media-list">
				  <ul>

				    <li v-for="curnews in $root.news" :key="curnews.id">
				      <a :href="'/news/' + curnews.id + '/'" class="item-link item-content">
				        <div class="item-inner">
				          <div class="item-title-row">
				            <div class="item-title">{{new Date(Date.parse(curnews.date)).toLocaleDateString()}}</div>
				            <div class="item-after">{{new Date(Date.parse(curnews.date)).toLocaleTimeString().substr(0, 5)}}</div>
				          </div>
				          <div class="item-subtitle">{{curnews.title}}</div>
				          <div class="item-text">{{curnews.description}}</div>
				        </div>
				      </a>
				    </li>
				    
				  </ul>
				</div>
    </f7-page>
  </template> 

<script>
// Import main settings
import main from '../main.js';
import axios from 'axios';

export default {
    data: function () {

      //const self = this;
      // Reference to root Store object
      //const news = this.$root.news;

      return {
      		//news: this.news
      }
    },

	created() {
		this.getNews();
	},
	
	methods: {
    //Get all news
      getNews: function(){
        const self = this
        this.loading = true
        axios.get(this.$newsURL).then((response)=>{
          console.log(response);
          this.loading = false;
          this.$root.news = response.data; //self.news = response.data;
          }).catch((error)=>{
              console.log(error);
              })
      }

	}


}
</script>



