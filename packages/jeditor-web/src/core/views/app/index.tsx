import { defineComponent } from 'vue'

import Symbols from 'settings/dependency-type.config'
import { useService } from 'shared/utils/service'

import style from './index.module.scss'

const App = defineComponent({
	setup() {
		return () => (
			<el-container class={style.container} direction="vertical">
				<el-row>
					<el-header class={style.header}>头部区域</el-header>
				</el-row>
				<el-row class={style.bottom}>
					<el-col span={3}>
						<el-aside class={style.componentPanel}>
							<div>组件面板</div>
							<el-button
								type={'primary'}
								onClick={() => {
									const { boardService } = useService()
									boardService.addElement(Symbols.Text)
								}}
							>
								点击新增文本元素
							</el-button>
						</el-aside>
					</el-col>
					<el-col span={16}>
						<el-main class={style.whiteboard} id="board-container"></el-main>
					</el-col>
					<el-col span={5}>
						<el-aside
							class={style.propPanel}
							id="prop-panel-container"
						></el-aside>
					</el-col>
				</el-row>
			</el-container>
		)
	},
})

export default App
