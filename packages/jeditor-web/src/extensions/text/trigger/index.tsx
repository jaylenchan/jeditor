import { defineComponent, h } from 'vue'

import Symbols from 'settings/dependency-type.config'
import { useService } from 'shared/utils/service'

import type { VNode } from 'shared/utils/type'

const Trigger = defineComponent({
	setup() {
		return (): VNode => (
			<div>
				<el-button
					type={'primary'}
					onClick={(): void => {
						const { whiteboardService } = useService()
						whiteboardService.addElement(Symbols.Text)
					}}
				>
					文本元素
				</el-button>
			</div>
		)
	},
})

export default h(Trigger)
