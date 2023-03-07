import { defineComponent } from 'vue'

import { useRef } from 'shared/utils/render'

import style from './index.module.scss'

const Layout = defineComponent({
	props: {
		onModelChanged: {
			type: Function,
			required: true,
		},
	},
	emits: ['modelChanged'],
	setup({ onModelChanged }) {
		const [text, setText] = useRef(1)

		function handleClick() {
			onModelChanged(setText)
		}

		return () => (
			<div class={style.layout} onClick={handleClick}>
				{text.value}
			</div>
		)
	},
})

export default Layout
