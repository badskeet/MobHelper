
// Import main settings
import main from '../main.js';

export default {
  //name: 'Авторизация пользователя',
  // User object will let us check authentication status
  user: {
    authenticated: false
  },


  // Send a request to the login URL and save the returned JWT
  login(context, creds, redirect) {
    this.logout();
    //context.axios.defaults.withCredentials = true;
    //context.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.getToken();
    //context.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    //context.axios.defaults.headers.post['Content-Type'] = 'application/json';
    //context.axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    let axiosConfig = { headers: {'Content-Type': 'application/json'} };
    context.axios.post(app.__vue__.$loginURL, JSON.stringify(creds), axiosConfig).then((response) => {
      //console.log(response);
      if (response.status === 'success') { self.state.data = response.data; }
      //localStorage.setItem('id_token', response.data.id_token)
      localStorage.setItem('access_token', response.data.access_token)
      console.log("Token received!");
      this.user.authenticated = true;
      app.__vue__.$root.getTasks();
      //this.$emit('close');
      app.f7.loginScreen.close('#my-login-screen');
      // Redirect to a specified route if not empty
      if(redirect) {
        //router.go(redirect)
      }

    }).catch((error) => {
      //console.log("AXIOS ERROR: ", error);
      //if (error.response.status === '401') { app.f7.dialog.alert("Не удалось войти!","Авторизация") }
      console.log("Token not received!");
      app.f7.dialog.alert("Не удалось войти!","Авторизация");
      context.error = error;
    })
  },

  // To log out, we just need to remove the token
  logout() {
    //localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    this.user.authenticated = false
    app.f7.loginScreen.open('#my-login-screen');
    app.__vue__.$root.tasks = null;
    //$f7router.navigate('/signal/')
  },

  checkAuth() {
    var jwt = localStorage.getItem('access_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  },

  getAuthHeaderForPost() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  },






}
