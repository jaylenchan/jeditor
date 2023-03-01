import style from './index.module.scss'
import { defineComponent } from 'vue'

const App = defineComponent({
  setup() {
    return () => (
      <el-container class={style.container} direction="vertical">
        <el-row>
          <el-header class={style.header}>头部区域</el-header>
        </el-row>
        <el-row class={style.bottom}>
          <el-col span={3}>
            <el-aside class={style.componentPanel}>组件面板</el-aside>
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
