import { defineComponent } from 'vue'

import type { TextReactiveElementModel } from 'extensions/text/types'
import type { VNode } from 'shared/utils/type'
import type { PropType } from 'vue'


const sizeOptions = [
	16, 20, 24, 30, 36, 40, 48, 56, 64, 72, 80, 88, 96, 108, 128,
]

const FontSize = defineComponent({
	props: {
		model: {
			type: Object as PropType<TextReactiveElementModel>,
			required: true,
		},
	},
	setup({ model }) {
		return (): VNode => {
			return (
				<el-select vModel={model.props.font.size} size="small">
					{sizeOptions.map((size, index) => (
						<el-option value={size} label={size} key={index}></el-option>
					))}
				</el-select>
			)
		}
	},
})

export default FontSize
