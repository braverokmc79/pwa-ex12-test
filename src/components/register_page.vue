<template>
  <v-container>
    <v-row class="text-center">
        <v-col col="12" class="text-center my-5">
          <h1 class="display-1">회원가입 페이지</h1>
        </v-col>
    </v-row>

    <v-row>
       <!-- 반응형에 따라 다르게 너비 조절 -->
      <v-col  class="text-center" cols="8" offset="2" sm="6" offset-sm="3">
          <!-- 양식의 입력이 제출되면 페이지를 새로 고침하지 않도록 prevent 사용 -->
          <form @submit.prevent="fnRegisterUser">
              <!-- 필수 입력 사항이 되도록 required 어트리뷰트 적용 -->
              <v-text-field name="Email" label="이메일" type="email" v-model="sEmail" required ></v-text-field>

              <v-text-field name="Password" label="비밀번호" type="password" v-model="sPassword" required ></v-text-field>

              <!-- 비밀번호 확인이 맞는지 검사하도록 rules 어트리뷰트 사용 -->
              <v-text-field name="ConfirmPassword" label="비밀번호 확인" type="password" v-model="sConfirmPassword" required
                :rules="[fnCompasrePassword]"
              ></v-text-field>


              <!-- 시간 지연 상태이면 버튼을 사라지게 함 -->
              <v-btn type="submit" v-if="!fnGetLoading" color="orange" dark >회원가입</v-btn>

              <!-- 시간 지연 상태이면 회전 프로그레스 원 표시 -->
              <v-progress-circular
                          v-if="fnGetLoading"
                          :size="70"
                          :width="7"
                          color="grey lighten-1"  
                          indeterminate
                        ></v-progress-circular>


    <v-alert type="error"  class="mt-3"
      dismissible v-model="fnAlert">{{fnGetErrMsg}}</v-alert>

                      
          </form>
      </v-col>
    </v-row>



  </v-container>
</template>

<script>
  console.log(" 현재 페이지 :  register-page");
  export default {
    name: 'register_page',


    mounted:function(){
      //마운트시 초기화
      this.$store.dispatch("setInitLoading");
    },


    data(){
      return{
      
        sEmail:"",    //이메일 입력값 임시 저장
        sPassword:"", //비밀번호 입력값 임시 저장
        sConfirmPassword:"" //비밀번호 입력 확인값 임시 저장
      }
    },


    computed:{
      //비밀번호와 비밀번호 확인 값이 일치하는지 검사
      fnCompasrePassword(){
        if(this.sPassword ==this.sConfirmPassword)return true;
        else return "비밀번호가 일치하지 않습니다.!"
      },

      //오류 메시지 스토어에서 읽어서 반환
      fnGetErrMsg(){
        //state.sErrorMessage
        return this.$store.getters.fnGetErrorMessage;
      },

      //시간 지연 상태 스토어에서 읽어서 반환
      fnGetLoading(){
        return this.$store.getters.fnGetLoading
      },

      fnAlert(){
        //오류 메시지 표시 여부
        return this.$store.getters.fnGetErrorMessage.length===0?false:true;  
      }

    },

    methods:{
      //스토어에 이메일 회원가입 처리 요청
      fnRegisterUser(){
        if(this.fnCompasrePassword==true){
          this.$store.dispatch("fnRegisterUser", {
            pEmail:this.sEmail,
            pPassword:this.sPassword
          })
        }
      }
    },


    //여기서는 다음  warch 를 사용하지 않고 오류 메시지를  처리를 진행봤다..

    // watch:{
    //   //fnGetErrMag() 함수가 오류 메시지를 반환하면 오류 메시지 표시
    //   fnGetErrMsg(pMsg){
    //     if(pMsg) this.bAlert=true;
    //   },

    //   //bAlert값이 false 로 바뀌면 에러 페이지 초기화
    //   bAlert(pValue){
    //     if(pValue===false)this.$store.commit("fnSetErrorMessage", "");
    //   }

    // }


  }
</script>
