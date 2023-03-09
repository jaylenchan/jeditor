import { defineComponent } from 'vue'

import EditBlockWrapper from 'extensions/shared/propPanel/EditBlockWrapper'

import type { Font } from 'extensions/text/types'
import type { PropType } from 'vue'

const FontBlock = defineComponent({
	props: {
		onFontChange: {
			type: Function as PropType<(newFont: Font) => void>,
			required: true,
		},
	},
	setup({ onFontChange }) {
		// const selectedFont = ref('')
		// const options = [
		// 	{
		// 		label: '正楷',
		// 		value: 'zhengkai',
		// 	},
		// ]

		return () => (
			<EditBlockWrapper blockName="字体">
				<el-row
					onClick={() => {
						onFontChange({ size: 18, family: '正楷' })
					}}
				>
					{/* <el-row justify="space-between">
						<el-select vModel={selectedFont.value} size="small">
							{options.map((fontItem, index) => (
								<el-option
									key={index}
									label={fontItem.label}
									value={fontItem.value}
								/>
							))}
						</el-select>
						<el-select vModel={selectedFont.value} size="small">
							{options.map((fontItem, index) => (
								<el-option
									key={index}
									label={fontItem.label}
									value={fontItem.value}
								/>
							))}
						</el-select>
					</el-row>
					<el-row>
						<el-select vModel={selectedFont.value} size="small">
							{options.map((fontItem, index) => (
								<el-option
									key={index}
									label={fontItem.label}
									value={fontItem.value}
								/>
							))}
						</el-select>
						<el-button-group>
							<el-button type="primary" icon="Edit" />
							<el-button type="primary" icon="Share" />
							<el-button type="primary" icon="Delete" />
						</el-button-group>
						<el-button></el-button>
					</el-row> */}
				</el-row>
			</EditBlockWrapper>
		)
	},
})

export default FontBlock
