import { createStore } from 'vuex'
import state from "@/store/state";
import mutations from "@/store/mutations";
import createPersistedState from 'vuex-persistedstate'

const store =createStore({
  state,
  mutations,
  plugins: [createPersistedState({})]
})


export default store
