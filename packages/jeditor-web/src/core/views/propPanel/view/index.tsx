import { defineComponent, reactive, watchEffect } from 'vue'

import Symbols from 'settings/dependency-type.config'
import { container } from 'shared/utils/dependencyInject'
import { ee } from 'shared/utils/event'

import type PropPanelModel from '../model'
import type PropPanelService from 'core/propPanelService'
import type { ElementModel, VNode } from 'shared/utils/type'
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
		const curPanel = reactive<VNode[]>([])

		watchEffect(() => {
			ee.on('elementSelected', (model: ElementModel) => {
				const propPanelService = container.get<PropPanelService>(
					Symbols.PropPanelService
				)
				const panel = propPanelService.usePanel(Symbols.Text, model)
				if (panel) {
					curPanel.length = 0
					curPanel.push(...panel)
				}
			})
		})

		return () => <div>{curPanel}</div>
	},
})

export default PropPanelView
