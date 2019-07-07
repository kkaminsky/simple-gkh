<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <img :src="leaf4" alt="leaf4" class="leaf4" v-show="leafShow" />
            <img :src="leaf3" alt="leaf3" class="leaf3" v-show="leafShow" />
            <img :src="leaf2" alt="leaf2" class="leaf2" v-show="leafShow" />
            <img :src="leaf1" alt="leaf1" class="leaf1" v-show="leafShow" />
            <div class="brand">
              <h1>Чистый город</h1>
              <h3>Сервис для повышения качества жизни населения</h3>
            </div>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div
                    class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center"
            >
              <h2 class="title text-center">Основные преимущества – скорость и удобство подачи обращения</h2>
              <h5 class="description">
                Мы предлагаем сервис, с помощью которого люди смогут с легкостью формировать обращения, и эти обращения будут распознаваться и передаваться к нужным адресатам
              </h5>
            </div>
          </div>
          <div class="features text-center">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-info">
                    <md-icon>chat</md-icon>
                  </div>
                  <h4 class="info-title">Способы подачи через Чат бот  Viber,
                    Яндекс Алиса,
                    Через сайт</h4>

                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-success">
                    <md-icon>verified_user</md-icon>
                  </div>
                  <h4 class="info-title">Распознавание текста с помощью ИИ и распределение заявок по нужным инстанциям</h4>

                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-danger">
                    <md-icon>fingerprint</md-icon>
                  </div>
                  <h4 class="info-title">Просмотр статуса заявки в реальном времени и контроль исполнения ответственными лицами</h4>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section section-tabs">
        <div class="container">
          <div class="wrapper">
            <div id="nav-tabs">
              <h3>Заявления</h3>
              <div class="md-layout">
                <div class="md-layout-item md-size-50 md-small-size-100" v-for="(i,index) in orderSlice">
                  <h3><small>Дело номер {{i.number}}</small></h3>
                  <nav-tabs-card no-label>
                    <template slot="content">
                      <md-tabs md-sync-route :class="classes[parseInt(getRandomArbitrary(0,4))]" md-alignment="left">
                        <md-tab id="tab-home" md-label="Описание" md-icon="face">
                          <p style="text-align: left"> Категории
                          <ul style="text-align: left">
                          <li>
                            {{i.orderCategoriesById.map(c=>c.category.word)[0]}}
                          </li>
                        </ul>
                          Заявитель
                          <ul style="text-align: left">
                            <li >
                              {{i.applicant}}
                            </li>
                          </ul>
                          Исполнитель
                          <ul style="text-align: left">
                            <li >
                              {{i.executor.name}}
                            </li>
                            <li >
                              {{i.executor.communicationData}}
                            </li>

                          </ul>
                          Прогнозируемая дата выполнения
                          <ul>
                            <li>
                              {{parseISOString(i.dateCalculateEnd)}}
                            </li>
                          </ul>
                          </p>
                        </md-tab>

                        <md-tab id="tab-pages" md-label="Текст заявки" md-icon="chat">
                          <p>
                            {{i.text}}
                          </p>
                        </md-tab>

                        <md-tab id="tab-posts" md-label="События" md-icon="build">

                            <ul style="text-align: left" v-for="event in i.events">
                            <li>{{ event.statusTypeByTypeId.name + " - "+parseISOString(event.date)}}</li>
                        </ul>

                        </md-tab>
                      </md-tabs>
                    </template>
                  </nav-tabs-card>
                </div>
              </div>

                <pagination
                        class="pagination-info"
                        v-model="infoPagination"
                        with-text
                        :page-count="Math.ceil(this.orders.length/4)"
                >
                </pagination>




            </div>
          </div>
        </div>
      </div>
      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">Создайте заявку</h2>
              <h4 class="text-center description">
                Опишите как можно более подробно проблему, даже можно своими словами, мы распознаем, и выберите адрес на карте
              </h4>
              <form class="contact-form">
                <div class="md-layout" v-if="show">
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Выше имя</label>
                      <md-input v-model="name" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Адрес или телефон</label>
                      <md-input v-model="email" type="email"></md-input>
                    </md-field>
                  </div>
                </div>
                <md-field maxlength="5">
                  <label>Введите текст заявки</label>
                  <md-textarea v-model="message"></md-textarea>
                </md-field>

                <md-field>
                  <label>Выберите адрес на карте</label>
                  <md-input v-model="address" type="email"></md-input>
                </md-field>
                <div class="md-layout">
                  <div class="md-layout-item md-size-33 mx-auto text-center">
                    <md-button class="md-success" @click="send()">Отправить заявку</md-button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


              <modal v-if="classicModal" @close="classicModalHide">
                <template slot="header">
                  <h4 class="modal-title">{{modalTitle}}</h4>
                  <md-button
                          class="md-simple md-just-icon md-round modal-default-button"
                          @click="classicModalHide"
                  >
                    <md-icon>clear</md-icon>
                  </md-button>
                </template>

                <template slot="body">
                  <div style="text-align: left">
                    Определенная Категории:
                  </div>
                  <br>
                  <div style="text-align: left">
                    {{categs[0]}}
                  </div>
                  <br>
                  <div style="text-align: left">
                    Исполнитель:
                  </div>
                  <br>
                  <div style="text-align: left">
                    {{executor}}
                  </div>
                  <div style="text-align: left">
                    {{executorContacts}}
                  </div>
                  <br>
                  <div style="text-align: left">Ожидаемая дата выполнения: </div>
                  <br>
                  <div style="text-align: left">
                    {{predictDate}}
                  </div>

                </template>

                <template slot="footer">

                  <md-button
                          class="md-success md-simple"
                          @click="classicModalHide"
                  >Ok</md-button
                  >
                </template>
              </modal>

                    <div>
                        <yandex-map :coords="coords" @click="onClick">

                          <ymap-marker
                                  marker-id="123"
                                  :coords="coords"
                                  :options="options"

                          ></ymap-marker>


                          <ymap-marker v-for="(mrk, index) in orders" :key="mrk.id"
                                       marker-id="mrk.id"
                                       marker-type="placemark"
                                       :coords="[ parseFloat(mrk.longitude),parseFloat(mrk.latitude)]"
                                       :balloon-template="balloonTemplate"
                                       :callbacks="{
          click: () =>{
              markerCallback(mrk)
          }
        }">
                          </ymap-marker>

                        </yandex-map>
                    </div>
    </div>
  </div>
</template>

<script>
import BasicElements from "./components/BasicElementsSection";
import Navigation from "./components/NavigationSection";
import SmallNavigation from "./components/SmallNavigationSection";
import Tabs from "./components/TabsSection";
import NavPills from "./components/NavPillsSection";
import Notifications from "./components/NotificationsSection";
import TypographyImages from "./components/TypographyImagesSection";
import JavascriptComponents from "./components/JavascriptComponentsSection";
import { LoginCard } from "@/components";
import { NavTabsCard } from "@/components";
import { Pagination } from "@/components";
import { Modal } from "@/components";



export default {
  components: {
    Modal,
    Pagination,
    NavTabsCard,
    BasicElements,
    Navigation,
    SmallNavigation,
    Tabs,
    NavPills,
    Notifications,
    TypographyImages,
    JavascriptComponents,
    LoginCard
  },
  name: "index",
  bodyClass: "index-page",
  props: {
    teamImg1: {
      type: String,
      default: require("@/assets/img/faces/avatar.jpg")
    },
    teamImg2: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg")
    },
    teamImg3: {
      type: String,
      default: require("@/assets/img/faces/kendall.jpg")
    },
    image: {
      type: String,
      default: require("@/assets/img/vue-mk-header.jpg")
    },
    leaf4: {
      type: String,
      default: require("@/assets/img/leaf4.png")
    },
    leaf3: {
      type: String,
      default: require("@/assets/img/leaf3.png")
    },
    leaf2: {
      type: String,
      default: require("@/assets/img/leaf2.png")
    },
    leaf1: {
      type: String,
      default: require("@/assets/img/leaf1.png")
    },
    vk: {
      type: String,
      default: require("@/assets/img/vk-social-network-logo.svg")
    },
    signup: {
      type: String,
      default: require("@/assets/img/city.jpg")
    },
    landing: {
      type: String,
      default: require("@/assets/img/landing.jpg")
    },
    profile: {
      type: String,
      default: require("@/assets/img/profile.jpg")
    }
  },
  data() {
    return {
      firstname: null,
      options:{
        preset: "islands#redDotIcon"
      },
      classicModal: false,
      modalTitle: "",
      email: null,
      address: null,
      addressPoints: null,
      password: null,
      leafShow: false,
      name: null,
      message: null,
      categs:[],
      executor:"",
      executorContacts:"",
      predictDate:"",
      infoPagination: 1,
      classes:["md-info","md-danger","md-warning","md-success"],
      orders: [1,2,3,4,5,6,7],
        coords: [57.153110,65.578404]
    };
  },
  created(){
    this.getOrders()
  },
  methods: {
    leafActive() {
      if (window.innerWidth < 768) {
        this.leafShow = false;
      } else {
        this.leafShow = true;
      }
    },
    getRandomArbitrary(min, max) {
      console.log(Math.random() * (max - min) + min)

  return Math.random() * (max - min) + min;
},
    classicModalHide() {
      this.classicModal = false;
    },
    send(){
      if(localStorage.getItem('userId')===null){
        this.$http.post('/api/registerOrderOther',{
          email: this.email,
          text: this.message,
          latitude: this.addressPoints[0],
          longitude: this.addressPoints[1]
        }).then(res=>{
          this.modalTitle = "Дело с номером " + res.data.number + " приянто!"
          this.categs = res.data.orderCategoriesById.map(c=>c.category.word)
          this.executor = res.data.executor.name
          this.executorContacts = res.data.executor.communicationData
          this.predictDate = this.parseISOString(res.data.dateCalculateEnd)
          this.classicModal = true
          this.getOrders()
        })
      }
      else {
        this.$http.post('/api/registerOrderVk',{
          userId: localStorage.getItem('userId'),
          text: this.message,
          latitude: this.addressPoints[0],
          longitude: this.addressPoints[1]
        }).then(res=>{
          this.modalTitle = "Дело с номером " + res.data.number + " приянто!"
          this.categs = res.data.orderCategoriesById.map(c=>c.category.word)
          this.executor = res.data.executor.name
          this.executorContacts = res.data.executor.communicationData
          this.predictDate = this.parseISOString(res.data.dateCalculateEnd)
          this.classicModal = true
        })

      }
    },
    parseISOString(s) {
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', };
      var b = s.split(/\D+/);
      return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])).toLocaleDateString('ru-RU', options) + " " + new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) ;
    },
    getOrders(){
      this.$http.get('/api/getOrders').then(
              res =>{
                this.orders = res.data
                this.orders.forEach(o=>{
                  console.log(o)
                  console.log(parseFloat(o.longitude))
                })
              }
      )
    },
      onClick(e) {
        this.coords = e.get('coords')
          this.$http.get("https://geocode-maps.yandex.ru/1.x/?apikey=59a55828-0cd7-468b-a92c-c702d2937654&format=json&geocode="+e.get('coords')[1].toString()+","+e.get('coords')[0].toString()).then(
                  res=>{
                    this.address = null
                    this.addressPoints = null
                    this.address = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.name
                    this.addressPoints = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')
                    console.log(this.addressPoints)

                  },
                  err=>{
            alert(err.message)
          })

      },
    markerCallback(mrk){
      this.mrk = mrk
    }

  },
  computed: {
    show(){
      return localStorage.getItem("userId")===null
    },

      balloonTemplate() {
          return `
        <p class="red">Номер дела: ${this.coords}</p>
        <p>Категории: Coming soon</p>
        <img src="http://via.placeholder.com/350x150">
      `
      },
    balloonTemplate2() {
      return `
        <h1 class="red">Hi, everyone!</h1>
        <p>I am here: ${this.coords}</p>
        <img src="http://via.placeholder.com/350x150">
      `
    },
    orderSlice(){
      let orders = this.orders.slice()
      return orders.slice(this.infoPagination*2-2,this.infoPagination*2)
    },
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`
      };
    },
    signupImage() {
      return {
        backgroundImage: `url(${this.signup})`
      };
    },

  },
  mounted() {
    this.leafActive();
    window.addEventListener("resize", this.leafActive);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.leafActive);
  }
};
</script>
<style>
    .ymap-container {
        height: 600px;
    }
    .red {
        color: red;
    }
</style>
<style lang="scss">
.section-download {
  .md-button + .md-button {
    margin-left: 5px;
  }
}

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}
</style>
