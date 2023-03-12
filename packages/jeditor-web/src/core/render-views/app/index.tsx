import { defineComponent } from 'vue'

import type { VNode } from 'shared/utils/type'
import style from './index.module.scss'

const App = defineComponent({
	setup() {
		return (): VNode => (
			<el-container class={style.container}>
				<el-row class={style.wrapper}>
					<el-col span={20}>
						<el-main class={style.main}>
							<div id="board-container" class={style.boardContainer}></div>
							<div id="toolpanel-container" class={style.toolPanelContainer}>
								{/* <el-button
									type={'primary'}
									onClick={(): void => {
										const { boardService } = useService()
										boardService.addElement(Symbols.Text)
									}}
								>
									点击新增文本元素
								</el-button> */}
							</div>
						</el-main>
					</el-col>
					<el-col span={4}>
						<el-aside class={style.rightSide}>
							<div id="proppanel-container"></div>
						</el-aside>
					</el-col>
				</el-row>
			</el-container>
		)
	},
})

export default App
