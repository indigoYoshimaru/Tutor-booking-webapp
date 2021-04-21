import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import App from '@/components/app'

Vue.use(VueMaterial)

Vue.component(App.name, App)

new Vue({
    el: "#app"
})