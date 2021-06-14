import Vue from 'vue'
import App from './App.vue'
import store from './store'
import AlertAlert from 'vue-alert-alert'
import UUID from "vue-uuid"

import './App.scss'
Vue.use(AlertAlert)
Vue.use(UUID);

Vue.config.productionTip = false

const promise = new Promise((res) => {

    let instance

    window.INACTIVITY_TIME = 100000000
    window.ENABLE_API_LOG = true
    window.DIRECT_AUTH = true
    window.LANGUAGE = 'IT'

    // window.OnServerAnsReceived = function(oGameData) { shine
    window.OnServerAnsReceived = function() {
        // console.log('OnServerAnsReceived: ', oGameData)
    }

    // window.OnServerAuthSuccess = function(oInitData) {
    window.OnServerAuthSuccess = function() {
        // console.log('OnServerAuthSuccess: ', oInitData)
        res(instance)
    }

    window.OnServerConnClosed = function() {

    }

    // window.OnServerErrHandler = function(msgErr) { shine
    window.OnServerErrHandler = function() {
        // console.log('OnServerErrHandler: ', msgErr)
    }

    const options = {
        ipAddr: 'gst.gamingroom.biz',
        port: 1331,
        protocol: 'wss',
        idGame: 8,
        user: 'msp',
        token: 1234
    }

    instance = new window.CServerApiMgr(...Object.values(options));

})

export let apiInstance = {}

promise.then((val) => {
    apiInstance = val
    new Vue({
        store,
        render: h => h(App)
    }).$mount('#app')
})