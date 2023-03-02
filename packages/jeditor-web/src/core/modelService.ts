import PluginService from 'core/pluginService'
import { inject, injectable } from 'common/utils/dependencyInject'
import { ElementModel, TYPES } from 'core/type'

interface ModelIds {
	[k: string]: string[]
}

@injectable()
class ModelService {

	@inject(TYPES.PluginService) pluginService!: PluginService

	public modelIdPool: Map<string, Set<string>> = new Map()
	public modelPool: Map<string, Map<string, ElementModel>> = new Map()

	public generateModel(type: string): void {
		const plugin = this.pluginService.pluginPool.get(type)
		if (plugin && plugin.model) {
			const model = new plugin.model()
			this.setModel(model)
			console.log('Model', model)
			console.log('modelpool', this.modelIdPool, this.modelPool)
			console.log('modelIds', this.getModelIds(model.type))
			console.log('models', this.getModel(model.type, model.id))
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

	public getModel(type: string, id: string): ElementModel | null {
		const models = this.modelPool.get(type)
		if (!models) return null

		const model = models.get(id)
		if (!model) return null

		return model
	}

	public getModelIds(type?: string): ModelIds | null {
		if (!type) {
			return null
		} else {
			const ids = this.modelIdPool.get(type)

			if (!ids) return null

			const modelIds = {} as ModelIds
			for (const id of ids) {
				if (!modelIds[type]) modelIds[type] = []

				modelIds[type].push(id)
			}

			return modelIds
		}
	}

	public getAllModelIds(): ModelIds {
		const modelIds = {} as ModelIds

		for (const [type, ids] of this.modelIdPool) {
			if (!modelIds[type]) {
				modelIds[type] = []
			}

			for (const id of ids) {
				modelIds[type].push(id)
			}
		}

		return modelIds
	}

}

export default ModelService
