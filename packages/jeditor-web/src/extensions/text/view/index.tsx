import { defineComponent } from 'vue'

import style from './index.module.scss'

import type { TextModelProps } from '../types'
import type { ReactiveElementModel, VNode } from 'shared/utils/type'
import type { PropType } from 'vue'


const View = defineComponent({
	props: {
		model: {
			type: Object as PropType<ReactiveElementModel<TextModelProps>>,
			required: true,
		},
	},
	setup({ model }) {
		return (): VNode => (
			<div
				class={style.text}
				style={{
					fontSize: model.props.font.size + 'px',
					fontFamily: model.props.font.family,
					left: model.props.layout.x,
					top: model.props.layout.y,
					width: !model.props.size.width ? '100%' : model.props.size.width,
					height: !model.props.size.height ? '100%' : model.props.size.height,
				}}
			>
				{model.props.text}
			</div>
		)
	},
})

export default View
