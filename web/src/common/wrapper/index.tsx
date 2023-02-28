import { defineComponent } from 'vue'

const Wrapper = defineComponent({
  props: {
    id: {
      type: String,
    },
  },
  emits: ['selected'],
  setup({ id }, { slots, emit }) {
    return () => {
      return (
        <div
          id="element-wrapper"
          onClick={() => {
            emit('selected', id)
          }}
        >
          {slots.default && slots.default()}
        </div>
      )
    }
  },
})

export default Wrapper
