import { defineComponent } from 'vue'

import Symbols from 'settings/dependency-type.config'
import { useService } from 'shared/utils/service'

import type { VNode } from 'shared/utils/type'
import style from './index.module.scss'

const LayoutView = defineComponent({
	setup() {
		return (): VNode => (
			<el-row class={style.layout}>
				<el-col span={20}>
					<el-main class={style.main}>
						<div
							id="whiteboard-container"
							class={style.whiteboardContainer}
						></div>
						<div id="toolPanel-container" class={style.toolPanelContainer}>
							<el-button
								type={'primary'}
								onClick={(): void => {
									const { boardService } = useService()
									boardService.addElement(Symbols.Text)
								}}
							>
								点击新增文本元素
							</el-button>
						</div>
					</el-main>
				</el-col>
				<el-col span={4}>
					<el-aside class={style.rightSide}>
						<div
							id="propPanel-container"
							class={style.propPanelContainer}
						></div>
					</el-aside>
				</el-col>
			</el-row>
		)
	},
})

export default LayoutView
