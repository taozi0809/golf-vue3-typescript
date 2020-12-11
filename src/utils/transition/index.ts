import { App } from 'vue'
import ElCollapseTransition from './collapse-transition/index.vue'

export default (app: App): void => {
    console.log(ElCollapseTransition)
    app.component(ElCollapseTransition.name, ElCollapseTransition)
}

export { ElCollapseTransition }
