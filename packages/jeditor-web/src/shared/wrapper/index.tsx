import { defineComponent } from 'vue'

const Wrapper = defineComponent({
	props: {
		id: {
			type: String,
			required: true,
		},
		type: {
			type: Symbol,
			required: true,
		},
	},
	emits: ['selected'],
	setup({ id, type }, { slots, emit }) {
		return () => {
			return (
				<div
					id="element-wrapper"
					onClick={() => {
						emit('selected', { id, type })
					}}
				>
					{slots.default && slots.default()}
				</div>
			)
		}
	},
})

export default Wrapper
