<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Вход</h4>
              <md-button
                slot="buttons"

                class="md-just-icon md-simple md-white"
              >
                <img :src="vk" @click="oauth()">
              </md-button>
              <p slot="description" class="description">Или по классике</p>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Почта или телефон...</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Пароль...</label>
                <md-input v-model="password"></md-input>
              </md-field>
              <md-button slot="footer" class="md-simple md-success md-lg" @click="login()">
                Вперед
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";

export default {
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      firstname: null,
      email: null,
      password: null
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg")
    },
    vk: {
      type: String,
      default: require("@/assets/img/vk-social-network-logo.svg")
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  methods:{
    login(){
      this.$http.post("/api/getApplicantByEmailOrPhone",{search: this.email}).then(res=>{
        localStorage.setItem("userId",res.data.id)
      })
    },
    oauth(){
      let redirWin = window.open("https://oauth.vk.com/authorize?client_id=7045685&display=page&redirect_uri=http://localhost:8081/redirect&scope=groups&response_type=code&v=5.95",'_blank', 'height=355,width=660,scrollbars=yes,status=1')
      let vm = this
      var timer = setInterval(function() {
        console.log("timer work")
        if(redirWin.closed) {
          clearInterval(timer);
          console.log(localStorage.getItem("123"))
          vm.$http.post("/api/oauth",
                  localStorage.getItem("code")
          ).then(res=>{

            localStorage.setItem("userId",res.data.id)

            vm.$router.push("/profile")
          },err=>{
            alert(err.message)
          })
        }
      }, 500);

    }
  }

};
</script>

<style lang="css"></style>
