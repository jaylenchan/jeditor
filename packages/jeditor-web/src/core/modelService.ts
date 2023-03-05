import PluginService from 'core/pluginService'
import Symbols from 'settings/dependency-type.config'
import { inject, injectable } from 'shared/utils/dependencyInject'

import { ElementModel } from 'core/type'

interface ModelIds {
	[k: string]: string[]
}

@injectable()
class ModelService {

	@inject(Symbols.PluginService) pluginService!: PluginService

	public modelIdPool: Map<symbol, Set<string>> = new Map()
	public modelPool: Map<symbol, Map<string, ElementModel>> = new Map()

	public generateModel(type: symbol): ElementModel {
		const plugin = this.pluginService.pluginPool.get(type)

		if (plugin && plugin.model) {
			const model = new plugin.model()
			this.setModel(model)
			return model
		} else {
			throw new Error('unknown model type!')
		}
	}

	public setModel(model: ElementModel): void {
		const modelId = model.id
		const modelType = model.type

		let ids = this.modelIdPool.get(modelType)
		let models = this.modelPool.get(modelType)

		if (!ids) {
			ids = new Set<string>()
			this.modelIdPool.set(modelType, ids)
		}
		ids.add(modelId)

		if (!models) {
			models = new Map<string, ElementModel>()
			this.modelPool.set(modelType, models)
		}
		models.set(modelId, model)
	}

	public getModel(type: symbol, id: string): ElementModel | null {
		const models = this.modelPool.get(type)
		if (!models) return null

		const model = models.get(id)
		if (!model) return null

		return model
	}

	public getModelIds(type: symbol): string[] | null {
		const ids = this.modelIdPool.get(type)

		if (!ids) return null

		const modelIds: string[] = []
		for (const id of ids) {
			modelIds.push(id)
		}

		return modelIds
	}

	public getAllModelIds(): ModelIds {
		const modelIds = {} as ModelIds

		for (const [type, ids] of this.modelIdPool) {
			if (!modelIds[type.toString()]) {
				modelIds[type.toString()] = []
			}

			for (const id of ids) {
				modelIds[type.toString()].push(id)
			}
		}

		return modelIds
	}

}

export default ModelService
