import { defineComponent } from 'vue'

const Picture = defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup({ text }) {
    return () => <div>图片插件：{text}</div>
  },
})

export default Picture

export type IPicture = typeof Picture
