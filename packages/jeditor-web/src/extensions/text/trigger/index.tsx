import { defineComponent, h } from 'vue'

import Symbols from 'settings/dependency-type.config'
import { useService } from 'shared/utils/service'

import Icon from './icon.svg'
import style from './index.module.scss'

import type { VNode } from 'shared/utils/type'


const Trigger = defineComponent({
	setup() {
		return (): VNode => (
			<>
				<el-button
					type={'primary'}
					onClick={(): void => {
						const { whiteboardService } = useService()
						whiteboardService.addElement(Symbols.Text)
					}}
					class={style.icon}
				>
					<div
						style={{
							'-webkit-mask': `url(${Icon}) center 100% / 100% no-repeat`,
							width: '18px',
							height: '18px',
							backgroundColor: `currentcolor`,
						}}
						class={style.svg}
					/>
				</el-button>
			</>
		)
	},
})

export default h(Trigger)
