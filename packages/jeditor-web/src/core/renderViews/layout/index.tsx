import { defineComponent } from 'vue'

import style from './index.module.scss'

import type { VNode } from 'shared/utils/type'


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
						<div
							id="toolPanel-container"
							class={style.toolPanelContainer}
						></div>
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
