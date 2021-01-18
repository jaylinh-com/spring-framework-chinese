import Vuex from 'vuex'
import store from './store/index'

export default ({
                    Vue,
                    options,
                    router,
                    siteData,
                    isServer
                }) => {
    Vue.use(Vuex)
    Vue.mixin({
        store: store
    })
}