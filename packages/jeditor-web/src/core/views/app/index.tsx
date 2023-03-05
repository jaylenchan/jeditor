import { defineComponent } from 'vue'

import BoardService from 'core/boardService'
import container from 'settings/dependency-inject.config'
import Symbols from 'settings/dependency-type.config'

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
									const boardService = container.get<BoardService>(
										Symbols.BoardService
									)
									boardService.addElement(Symbols.Text)
								}}
							>
								点击新增文本元素
							</el-button>
						</el-aside>
					</el-col>
					<el-col span={15}>
						<el-main class={style.whiteboard} id="board"></el-main>
					</el-col>
					<el-col span={6}>
						<el-aside class={style.propPanel}>属性面板</el-aside>
					</el-col>
				</el-row>
			</el-container>
		)
	},
})

export default App
