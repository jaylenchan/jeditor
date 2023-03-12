import Symbols from 'settings/dependency-type.config'

import { container } from './dependencyInject'

import type EditorPluginService from 'core/editor-plugin-service'
import type ModelService from 'core/model-service'
import type PropPanelPluginService from 'core/propPanel-plugin-service'
import type PropPanelService from 'core/propPanel-service'
import type BoardService from 'core/whiteboard-service'

type Services = {
	boardService: BoardService
	editorPluginService: EditorPluginService
	modelService: ModelService
	propPanelService: PropPanelService
	propPanelPluginService: PropPanelPluginService
}

export function useService(): Services {
	return {
		boardService: container.get<BoardService>(Symbols.BoardService),
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
