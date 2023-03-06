import {
	defineComponent,
	reactive,
	watchEffect,
	ref,
	h,
	resolveComponent,
} from 'vue'

import PropPanelService from 'core/propPanelService'
import Symbols from 'settings/dependency-type.config'
import { container } from 'shared/utils/dependencyInject'
import { ee } from 'shared/utils/event'

import type PropPanelModel from '../model'
import type ModelService from 'core/modelService'
import type { PanelItem } from 'shared/utils/type'
import type { PropType } from 'vue'
import './index.module.scss'

const PropPanelView = defineComponent({
	props: {
		model: {
			type: Object as PropType<PropPanelModel>,
			required: true,
		},
	},
	setup() {
		const curPanel = reactive<PanelItem[]>([])
		const curType = ref(Symbol.for(''))

		watchEffect(() => {
			ee.on('propPanelAcitve', ({ type, id }: { type: symbol; id: string }) => {
				if (curType.value.toString() != type.toString()) {
					curType.value = type
					curPanel.length = 0

					const propPanelService = container.get<PropPanelService>(
						Symbols.PropPanelService
					)

					const panel = propPanelService.getPanel(Symbols.Text)
					curPanel.push(...panel)

					const modelService = container.get<ModelService>(Symbols.ModelService)
					const model = modelService.getModel(type, id)
					model
				}
			})
		})

		return () => (
			<div>
				{curPanel.map(el => {
					const [event, eventHandler] = el.event
					return h(resolveComponent('Symbol(Text)'), {
						[event]: eventHandler,
						text: JSON.stringify('DDDDD'),
					})
				})}
			</div>
		)
	},
})

export default PropPanelView
