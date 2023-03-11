import { defineComponent, reactive } from 'vue'

import type { TextModelProps } from '../types'
import type { ElementModel } from 'shared/utils/type'
import type { PropType } from 'vue'
import style from './index.module.scss'

const TextView = defineComponent({
	props: {
		model: {
			type: Object as PropType<ElementModel<TextModelProps>>,
			required: true,
		},
	},
	setup({ model }) {
		const styleOptions = reactive({
			fontSize: model.props.font.size + 'px',
			fontFamily: model.props.font.family,
			left: model.props.layout.x,
			top: model.props.layout.y,
			width: !model.props.size.width ? '100%' : model.props.size.width,
			height: !model.props.size.height ? '100%' : model.props.size.height,
		})

		return () => (
			<div class={style.text} style={styleOptions}>
				{model.props.text}
			</div>
		)
	},
})

export default TextView

export type ITextView = typeof TextView
