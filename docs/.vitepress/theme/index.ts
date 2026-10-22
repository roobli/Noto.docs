// Without VitePress's bundled Inter: the site uses the native system stack.
import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import ScreenshotToggle from './components/ScreenshotToggle.vue'
import ShotGallery from './components/ShotGallery.vue'
import RoobliMdView from './components/RoobliMdView.vue'
import DownloadTiles from './components/DownloadTiles.vue'
import './styles/tokens.css'
import './styles/base.css'
import './styles/chrome.css'
import './styles/doc.css'
import './styles/home.css'
import './styles/components.css'
import './styles/motion.css'
import { installA11y } from './a11y'

installA11y()

const Theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ScreenshotToggle', ScreenshotToggle)
    app.component('ShotGallery', ShotGallery)
    app.component('RoobliMdView', RoobliMdView)
    app.component('DownloadTiles', DownloadTiles)
  },
}

export default Theme
