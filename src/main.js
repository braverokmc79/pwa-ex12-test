import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';

// 파이어베이스 앱 객체 모듈 가져오기
import '@/datasources/firebase'
//인증 상태 관찰자 설정 및 사용자 데이터 가져오기
//https://firebase.google.com/docs/auth/web/start?hl=ko
import { getAuth, onAuthStateChanged } from "firebase/auth";


Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  
  created() {

    const auth = getAuth();
    
    onAuthStateChanged(auth, (pUserInfo) => {
      if (pUserInfo !== null) {
        const uid = user.uid;
        console.log("uid : ", uid);
        // 이미 로그인 되어있었는지 등의 상태를 파악하여 처리함
        store.dispatch('fnDoLoginAuto', pUserInfo);
      }else{
        console.log("로그인 안됨");
      }
    });


  }, 
  render: h => h(App)
}).$mount('#app')