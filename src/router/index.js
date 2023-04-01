import Vue from 'vue'
import VueRouter from 'vue-router'


//파이어베이스 앱 객체 모듈 가져오기
//import firebase from 'firebase/app';
//https://firebase.google.com/docs/auth/web/start?hl=ko
import { getAuth, onAuthStateChanged } from "firebase/auth";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'start-page',
    component:()=>import('../components/start_page.vue')
  },
 {
  path:'/main',
  name:"main_page",
  component:()=>import('../components/main_page.vue'),
    //메인페이지는 인증과 연동
    meta:{bAuth:true}
 },
 {
  path:'/login',
  name:'login_page',
  component:()=>import('../components/login_page.vue')
 },
 {
  path:'/register',
  name:'register_page',
  component:()=>import('../components/register_page.vue')
 },
 {
  //사용자가 라우터에 등록된 것 외에 다른 주소 입력 시 에러 페이지 연결
  path:'*',
  name:'error_page',
  component:()=>import('../components/error_page.vue')
 }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//라우터  이동에 개입하여 인증이 필요한 경우 login 페이지로 전환
//https://firebase.google.com/docs/auth/web/manage-users?hl=ko
router.beforeEach((to, from, next)=>{

  const bNeedAuth=to.matched.some(record=>record.meta.bAuth)
  const auth = getAuth();
  const bCheckAuth= auth.currentUser;

 // console.log("  bNeedAuth  값이 true 이면 로그인이 필요한 페이지로 이동:" ,bNeedAuth);
  //console.log("  !bCheckAuth 널값이면 true :" ,!bCheckAuth);
  if (bNeedAuth && !bCheckAuth) {
    next('/login')
  } else {
    next()
  }
})

export default router
