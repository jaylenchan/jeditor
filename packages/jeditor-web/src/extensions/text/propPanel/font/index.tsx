import { defineComponent } from 'vue'

import EditBlockWrapper from 'shared/components/EditBlockWrapper'

import { FontFamily } from './fontFamily'
import FontSize from './fontSize'

import type { TextReactiveElementModel } from 'extensions/text/types'
import type { VNode } from 'shared/utils/type'
import type { PropType } from 'vue'


const FontBlock = defineComponent({
	props: {
		model: {
			type: Object as PropType<TextReactiveElementModel>,
			required: true,
		},
	},
	setup({ model }) {
		return (): VNode => (
			<EditBlockWrapper blockName="字体">
				<el-row>
					<FontFamily model={model} />
					<FontSize model={model} />
				</el-row>
			</EditBlockWrapper>
		)
	},
})

export default FontBlock
