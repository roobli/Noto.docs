import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ScreenshotToggle from './components/ScreenshotToggle.vue'
import './custom.css'

const Theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ScreenshotToggle', ScreenshotToggle)
  },
}

export default Theme
