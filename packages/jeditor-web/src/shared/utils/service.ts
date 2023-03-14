import container from 'settings/dependency-inject.config'
import Symbols from 'settings/dependency-type.config'

import type EditorPluginService from 'core/editorPluginService'
import type ModelService from 'core/modelService'
import type PropPanelPluginService from 'core/propPanelPluginService'
import type PropPanelService from 'core/propPanelService'
import type WhiteboardService from 'core/whiteboardService'


type Services = {
	whiteboardService: WhiteboardService
	editorPluginService: EditorPluginService
	modelService: ModelService
	propPanelService: PropPanelService
	propPanelPluginService: PropPanelPluginService
}

export function useService(): Services {
	return {
		whiteboardService: container.get<WhiteboardService>(
			Symbols.WhiteboardService
		),
		editorPluginService: container.get<EditorPluginService>(
			Symbols.EditorPluginService
		),
		modelService: container.get<ModelService>(Symbols.ModelService),
		propPanelService: container.get<PropPanelService>(Symbols.PropPanelService),
		propPanelPluginService: container.get<PropPanelPluginService>(
			Symbols.PropPanelPluginService
		),
	}
}
