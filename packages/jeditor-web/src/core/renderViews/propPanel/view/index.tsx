import { defineComponent, nextTick, reactive, watchEffect } from 'vue'

import Symbols from 'settings/dependency-type.config'
import { ee } from 'shared/utils/event'
import { useService } from 'shared/utils/service'

import type PropPanelModel from '../model'
import type { ReactiveElementModel, VNode } from 'shared/utils/type'
import type { PropType } from 'vue'

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
			ee.on('elementSelected', (model: ReactiveElementModel) => {
				const { propPanelService } = useService()
				const panel = propPanelService.usePanel(Symbols.Text, model)
				if (panel) {
					curPanel.length = 0
					nextTick(() => {
						curPanel.push(...panel)
					})
				}
			})
		})

		return (): VNode => <>{curPanel}</>
	},
})

export default PropPanelView
