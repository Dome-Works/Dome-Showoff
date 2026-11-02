import { createApp } from 'vue'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './styles/tokens.css'
import './styles/base.css'
import App from './App.vue'
import reveal from './directives/reveal'
import { initAnalytics } from './analytics'

createApp(App).directive('reveal', reveal).mount('#app')
initAnalytics()
