<template>
  <v-app>
  <v-card
    class="mx-auto overflow-hidden"
    height="100%"
    width="100%"
  >
   
    <v-app-bar
      color="primary accent-4"
      dark
      prominent 
      height="64px"
    >
     <!-- 햄버거 아이콘은 반응형 크기가 sm 이상일 때 숨김 -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    

      <router-link to="/" style="cursor: pointer" class="ma-2">
        <!-- 머티리얼디자인아이콘 사용 시 아이콘 이름에 'mid-' 붙임 -->
        <v-icon class="hidden-xs-only" large color="teal 
					lighten-4">mdi-home
        </v-icon>
      </router-link>


      <v-toolbar-title class="headline">
        이메일-구글 인증 로그인
      </v-toolbar-title>

      <v-spacer></v-spacer>

  
         <!-- items 배열을 읽어와서 차례로 메뉴로 바인딩 하여 표시함 -->
        <v-btn  depressed  color="primary" class="ma-2"   value="true" v-for="(item, i) in fnGetMenuItems" :to="item.to" :key="i">
            <v-icon left v-html="item.icon"></v-icon>
            {{item.title}}
        </v-btn> 
       <!-- 로그인 된 경우만 로그아웃 버튼을 표시함 -->
        <v-btn  depressed  color="primary"  class="ma-2" @click="fnDoLogout" v-if="fnGetAuthStatus">
            <v-icon left>mdi-arrow-right-bold-box-outline</v-icon>
            로그아웃
        </v-btn>

        <!-- 로그인 페이지 -->
         <v-btn  depressed  color="primary"  class="ma-2" @click="fonLoginPage" v-if="!fnGetAuthStatus">
            <v-icon left>mdi-arrow-right-bold-box-login</v-icon>
            로그인
        </v-btn>

    </v-app-bar>

    <!-- 왼쪽 토글 메뉴 -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >

      <v-list  nav  dense >
  
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
      
       
          <v-list-item class="mt-5"  v-for="(item, i) in fnGetMenuItems" :to="item.to" :key="i">
            <v-icon left v-html="item.icon"></v-icon>
             {{item.title}}
          </v-list-item>

          <!-- 로그인 된 경우만 로그아웃 버튼을 표시함 -->
          <v-list-item   @click="fnDoLogout" v-if="fnGetAuthStatus">
            <v-icon left>mdi-arrow-right-bold-box-outline</v-icon>
              로그아웃
          </v-list-item>
        </v-list-item-group>
      </v-list>


    </v-navigation-drawer>

    
    <v-card-text>
      <router-view/>
    </v-card-text>


    <v-footer app>
      <div class="mx-auto">&copy; CODE-DESIGN.web.app</div>
    </v-footer>
  </v-card>

</v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
      drawer: false,
      group: null,
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },

    computed:{

      // 스토어에서 현재 인증 상태인지 반환
       fnGetAuthStatus() {
        console.log("스토어에서 현재 인증 상태인지 반환 : ",this.$store.getters.fnGetAuthStatus);
        return this.$store.getters.fnGetAuthStatus
      },

        // 로그인 여부에 따라 다르게 탐색서랍과 툴바 메뉴명 항목 배열 반환
        fnGetMenuItems() {
          if (!this.fnGetAuthStatus) {
            return [{
              title: '회원가입',
              to: '/register',
              icon: 'mdi-lock-open-outline',
            }]
          } else {
            return [{
              title: '메인 페이지',
              to: '/main',
              icon: 'mdi-account'
            }]
          }
       }

    },

     // 스토어의 로그아웃 기능사용
    methods: {
      fnDoLogout() {
        this.$store.dispatch('fnDoLogout')
      },
        // 스토어에 이메일 로그인 처리 요청
      fonLoginPage() {
        console.log("로그인페이지 이동1")
     
        this.$router.push("/login");
      },

    
    },
};
</script>
