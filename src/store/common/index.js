export default {
    state: {
      bIsLoading: false, // 처리 중 시간이 걸림을 나타냄
      sErrorMessage: '', // 처리 중 오류 메시지 내용
    },
    mutations: {
      // 처리 중 시간이 걸리는지 여부 설정
      fnSetLoading(state, payload) {
        state.bIsLoading = payload
      },
      // 처리 중 오류 메시지 저장
      fnSetErrorMessage(state, payload) {
              console.log("처리 중 오류 메시지 저장",payload)
              state.sErrorMessage = payload
      },
    
      fnSetInitMessage(state, payload){
        state.sErrorMessage="";
      }
    },
    getters: {
          // 처리 중 시간이 걸리는지 여부 반환
          fnGetLoading (state) {
            return state.bIsLoading
          },
          // 처리 중 에러 메세지 내용 반환
          fnGetErrorMessage (state) {
                  return state.sErrorMessage
          },
          
    }, 
    actions: {
       
        setInitLoading({commit}, payload) {
          //로딩 false 및 메시지 초기화
          console.log("로딩 false 및 메시지 초기화");
          commit('fnSetLoading', false);
          commit('fnSetInitMessage')
         
        },


    }
  }