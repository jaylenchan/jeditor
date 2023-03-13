import { defineComponent } from 'vue'

import EditBlockWrapper from 'shared/components/EditBlockWrapper'

import style from './index.module.scss'

import type { TextModelProps } from 'extensions/text/types'
import type { ReactiveElementModel, VNode } from 'shared/utils/type'
import type { PropType } from 'vue'

const TextBlock = defineComponent({
	props: {
		model: {
			type: Object as PropType<ReactiveElementModel<TextModelProps>>,
			required: true,
		},
	},
	setup({ model }) {
		return (): VNode => (
			<EditBlockWrapper blockName="内容">
				<div>
					<el-input
						class={style.input}
						type="textarea"
						resize="none"
						vModel={model.props.text}
					/>
				</div>
			</EditBlockWrapper>
		)
	},
})

export default TextBlock
