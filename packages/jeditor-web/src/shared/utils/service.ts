import Symbols from 'settings/dependency-type.config'

import { container } from './dependencyInject'

import type EditorPluginService from 'core/editor-plugin-service'
import type ModelService from 'core/model-service'
import type PropPanelPluginService from 'core/proppanel-plugin-service'
import type PropPanelService from 'core/proppanel-service'
import type BoardService from 'core/whiteboard-service'

export function useService() {
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
