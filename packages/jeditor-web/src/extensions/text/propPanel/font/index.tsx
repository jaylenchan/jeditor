import { defineComponent } from 'vue'

import EditBlockWrapper from 'shared/components/EditBlockWrapper'

import type { TextModelProps } from 'extensions/text/types'
import type { ReactiveElementModel, VNode } from 'shared/utils/type'
import type { PropType } from 'vue'


const FontBlock = defineComponent({
	props: {
		model: {
			type: Object as PropType<ReactiveElementModel<TextModelProps>>,
			required: true,
		},
	},
	setup({ model }) {
		const fontOptions = [
			{
				label: '正楷',
				value: '',
			},
		]

		return (): VNode => (
			<EditBlockWrapper blockName="字体">
				<el-row
					onClick={(): void => {
						model
					}}
				>
					<el-select size="small">
						{fontOptions.map(
							(font: { label: string; value: string }, index: number) => (
								<el-option
									label={font.label}
									value={font.value}
									key={index}
								></el-option>
							)
						)}
					</el-select>
				</el-row>
			</EditBlockWrapper>
		)
	},
})

export default FontBlock
