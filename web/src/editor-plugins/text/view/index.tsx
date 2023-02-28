import { defineComponent } from 'vue'
import style from './index.module.scss'

const TextView = defineComponent({
  props: {
    text: {
      type: String,
    },
  },
  setup({ text }) {
    return () => <div class={style.container}>Text文本:{text}</div>
  },
})

export default TextView

export type ITextView = typeof TextView
