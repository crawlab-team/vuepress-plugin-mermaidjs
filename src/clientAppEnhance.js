import {defineClientAppEnhance} from '@vuepress/client'
import {Mermaid} from './mermaid'

export default defineClientAppEnhance(({app}) => {
  app.component('ClMermaid', Mermaid);
});
