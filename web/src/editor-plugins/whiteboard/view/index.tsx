import { defineComponent, h, resolveComponent } from 'vue'
import style from './index.module.scss'

const WhiteboardView = defineComponent({
  setup() {
    const elements = [
      {
        type: 'Picture',
        props: { text: '1' },
      },
      {
        type: 'Text',
        props: {
          text: '2',
        },
      },
    ]

    return () => (
      <div class={style.container}>
        {elements.map(el => {
          return h(resolveComponent(el.type), { ...el.props })
        })}
        渲染区域
      </div>
    )
  },
})

export default WhiteboardView

export type IWhiteboardView = typeof WhiteboardView
