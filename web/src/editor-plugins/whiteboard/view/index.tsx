import { defineComponent } from 'vue'
import style from './index.module.scss'

const WhiteboardView = defineComponent({
  props: {
    text: {
      type: String,
    },
  },
  setup() {
    return () => <div class={style.container}>Whiteboard</div>
  },
})

export default WhiteboardView

export type IWhiteboardView = typeof WhiteboardView
