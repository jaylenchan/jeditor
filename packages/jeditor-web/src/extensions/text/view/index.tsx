import { defineComponent, reactive } from 'vue'

import type { Font, Layout } from '../types'
import type { Size } from 'shared/utils/type'
import type { PropType } from 'vue'
import style from './index.module.scss'

const TextView = defineComponent({
	props: {
		text: {
			type: String,
			required: true,
		},
		layout: {
			type: Object as PropType<Layout>,
			required: true,
		},
		font: {
			type: Object as PropType<Font>,
			required: true,
		},
		size: {
			type: Object as PropType<Size>,
			required: true,
		},
	},
	setup({ text, font, layout, size }) {
		const styleOptions = reactive({
			fontSize: font.size + 'px',
			fontFamily: font.family,
			left: layout.x,
			top: layout.y,
			width: !size.width ? '100%' : size.width,
			height: !size.height ? '100%' : size.height,
		})

		return () => (
			<div class={style.text} style={styleOptions}>
				{text}
			</div>
		)
	},
})

export default TextView

export type ITextView = typeof TextView
