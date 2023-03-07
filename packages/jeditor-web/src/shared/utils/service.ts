import Symbols from 'settings/dependency-type.config'

import { container } from './dependencyInject'

import type BoardService from 'core/boardService'
import type EditorPluginService from 'core/editorPluginService'
import type ModelService from 'core/modelService'
import type PropPanelPluginService from 'core/propPanelPluginService'
import type PropPanelService from 'core/propPanelService'

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
