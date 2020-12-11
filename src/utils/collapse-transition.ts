import { App } from 'vue'
import CollapseTransition from './transition/collapse-transition/index.vue'

(CollapseTransition as any).install = (app: App): void => {
    console.log("1")
    console.log(CollapseTransition)
    app.component(CollapseTransition.name, CollapseTransition)
}

export default CollapseTransition
