import { defineComponent } from 'vue'
import style from './index.module.scss'

const Picture = defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup({ text }) {
    return () => <div class={style.container}>图片插件：{text}</div>
  },
})

export default Picture

export type IPicture = typeof Picture
