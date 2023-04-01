// 파이어베이스 앱 객체 모듈 가져오기
import firebase from 'firebase/compat/app'
import { getAuth, signInWithPopup, GoogleAuthProvider ,signInWithEmailAndPassword ,createUserWithEmailAndPassword } from "firebase/auth";

// 파이어베이스 패키지 모듈 가져오기
import 'firebase/compat/auth'
import router from '@/router'

export default {
  state: {
    oUser: null // 사용자 정보를 담을 객체
  },
  mutations: {
    // 사용자 객체를 저장
    fnSetUser(state, payload) {
      state.oUser = payload
    }
  },
  getters: {
    // 사용자 객체를 반환
    fnGetUser(state) {
      return state.oUser
    },
    // 사용자 객체의 값의 유무로 로그인 여부 반환
    fnGetAuthStatus(state) {
      return (state.oUser != null)
    }
  },
  actions: {
    // 이메일 회원 가입 처리
    fnRegisterUser({
      commit
    }, payload) {
      commit('fnSetLoading', true) // 스토어에 시간걸림으로 상태 변경
      // 파이어베이스에 이메일 회원 생성 및 저장
      console.log("1. 파이어베이스에 이메일 회원 생성 및 저장  " ,payload.pEmail, payload.pPassword);
      const auth = getAuth();

        createUserWithEmailAndPassword(auth, payload.pEmail, payload.pPassword)
        .then((userCredential) => {
        
          const user = userCredential.user;
          console.log("회원 가입 성공 : ", user);
          commit('fnSetUser', { email: user.email})// <-- 파이어베이스 v9 마이그레이션 : user 추가
          commit('fnSetLoading', false) // 스토어에 시간완료 상태 변경
          commit('fnSetErrorMessage', '') // 스토어 에러메시지 초기화
          alert("회원 가입을 축하 합니다.");

          router.push('/main') // 로그인 후 첫 화면으로 이동
      
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("errorCode " ,errorCode , errorMessage);
          commit('fnSetErrorMessage', errorMessage)
          commit('fnSetLoading', false)
        });

    },
    
    // 이메일 회원 로그인
    fnDoLogin({
      commit
    }, payload) {
      commit('fnSetLoading', true) // 스토어에 시간걸림으로 상태 변경
      // 파이어베이스에 이메일 회원 로그인 인증 처리 요청
      //firebase.auth().
      console.log(" 2 .파이어베이스에 이메일 회원 로그인 인증 처리 요청  ");
      const auth = getAuth();
      signInWithEmailAndPassword(auth, payload.pEmail,
          payload.pPassword)
        .then(pUserInfo => {
          // 로그인이 성공하면 스토어에 계정정보 저장
          commit('fnSetUser', {
            id: pUserInfo.user.uid,           // <-- 파이어베이스 v9 마이그레이션 : user 추가
            name: pUserInfo.user.displayName, // <-- 파이어베이스 v9 마이그레이션 : user 추가
            email: pUserInfo.user.email,      // <-- 파이어베이스 v9 마이그레이션 : user 추가
            photoURL: pUserInfo.user.photoURL // <-- 파이어베이스 v9 마이그레이션 : user 추가
          })
          commit('fnSetLoading', false) // 시간걸림 상태 해제
          commit('fnSetErrorMessage', '') // 에러메세지 초기화
          router.push('/main') // 로그인 후 화면으로 이동
        })
        .catch(err => {
          commit('fnSetErrorMessage', err.message)
          commit('fnSetLoading', false)
        })
    },
    // 구글 계정 회원 로그인(팝업)
    fnDoGoogleLogin_Popup({
      commit
    }) {
      commit('fnSetLoading', true) // 스토어에 시간걸림으로 상태 변경
      // 파이어베이스에 구글 회원 로그인 인증 처리 요청
      // 로그인제공자객체를 생성
      var oProvider = new firebase.auth.GoogleAuthProvider();
      // 오픈 계정의 범위를 설정합니다. 
      // https://developers.google.com/identity/protocols/googlescopes

      console.log(" oProvider  : ",oProvider);

      oProvider.addScope('profile');
      oProvider.addScope('email');

      //firebase.auth().signInWithPopup(oProvider)
      //문서
      //https://firebase.google.com/docs/auth/web/google-signin?hl=ko#web-version-9_4
      const auth = getAuth();
      

       signInWithPopup(auth, oProvider)
        .then(pUserInfo => {
          // 로그인이 성공하면 스토어에 계정정보 저장
          commit('fnSetUser', {
            id: pUserInfo.user.uid,            // <-- 파이어베이스 v9 마이그레이션 : user 추가
            name: pUserInfo.user.displayName,  // <-- 파이어베이스 v9 마이그레이션 : user 추가
            email: pUserInfo.user.email,       // <-- 파이어베이스 v9 마이그레이션 : user 추가
            photoURL: pUserInfo.user.photoURL  // <-- 파이어베이스 v9 마이그레이션 : user 추가
          })

          console.log("로그인이 성공  pUserInfo  : ",pUserInfo);


          commit('fnSetLoading', false) // 시간걸림 상태 해제
          commit('fnSetErrorMessage', '') // 에러메세지 초기화
          router.push('/main') // 로그인 후 화면으로 이동
        })
        .catch(err => {
          commit('fnSetErrorMessage', err.message)
          commit('fnSetLoading', false)
        })
    },
    // 자동 로그인 처리
    fnDoLoginAuto({
      commit
    }, pUserInfo) {
      // 자동 로그인 시 스토어에 계정정보 저장
      commit('fnSetUser', {
        id: pUserInfo.uid,
        name: pUserInfo.displayName,
        email: pUserInfo.email,
        photoURL: pUserInfo.photoURL
      })
      commit('fnSetLoading', false) // 시간걸림 상태 해제
      commit('fnSetErrorMessage', '') // 에러메세지 초기화  
    },
    // 로그아웃 처리
    fnDoLogout({commit} ) {
      // 파이어베이스에 로그아웃 요청
      console.log("로그 아웃 요쳥");
      const auth = getAuth();
      auth.signOut()
      commit('fnSetUser', null) // 스토어에 계정정보 초기화
       router.push('/') // 첫 화면으로 이동
    }
  }
}