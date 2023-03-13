import Symbols from 'settings/dependency-type.config'
import { inject, injectable } from 'shared/utils/dependencyInject'

import type EditorPluginService from 'core/editorPluginService'
import type ReactivityService from 'core/reactivityService'
import type { ElementModel, ReactiveElementModel } from 'shared/utils/type'


interface ModelIds {
	[k: string]: string[]
}

@injectable()
class ReactivityModelService {

	@inject(Symbols.ReactivityService)
	private _reactivityService!: ReactivityService

	protected _reactiveModelPool: WeakMap<ElementModel, ReactiveElementModel> =
		new Map()

	protected _createReactiveModel(rawModel: ElementModel): ReactiveElementModel {
		let reactiveModel = this._getReactiveModel(rawModel)

		if (!reactiveModel) {
			reactiveModel = this._reactivityService.toReactive(rawModel)

			this._setReactiveModel(rawModel, reactiveModel)
		}

		return reactiveModel
	}

	protected _setReactiveModel(
		rawModel: ElementModel,
		reactiveModel: ReactiveElementModel
	): void {
		this._reactiveModelPool.set(rawModel, reactiveModel)
	}

	protected _hasReactiveModel(rawModel: ElementModel): boolean {
		return this._reactiveModelPool.has(rawModel)
	}

	protected _getReactiveModel(
		rawModel: ElementModel
	): ReactiveElementModel | null {
		const reactiveModel = this._reactiveModelPool.get(rawModel)

		if (!reactiveModel) return null

		return reactiveModel
	}

	protected _removeReactiveModel(rawModel: ElementModel): void {
		if (!this._hasReactiveModel(rawModel)) return

		this._reactiveModelPool.delete(rawModel)
	}

}

@injectable()
class ModelService extends ReactivityModelService {

	@inject(Symbols.EditorPluginService)
	private _editorPluginService!: EditorPluginService

	private _typeModelsPool: Map<symbol, Set<ElementModel>> = new Map()
	private _typeIdsPool: Map<symbol, Set<string>> = new Map()
	private _idModelPool: Map<string, ElementModel> = new Map()

	public createModel(type: symbol): ReactiveElementModel {
		if (this._editorPluginService.hasPlugin(type)) {
			const plugin = this._editorPluginService.getPlugin(type)
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const modelConstructor = plugin!.model
			const model = new modelConstructor()

			this._setModel(model)
			return this._createReactiveModel(model)
		} else {
			throw new Error(
				`try to create unknown plugin type model : type is _{type.toString()}!`
			)
		}
	}

	public getModelById(id: string): ReactiveElementModel | null {
		const rawModel = this._idModelPool.get(id)

		if (!rawModel) return null

		return this._getReactiveModel(rawModel)
	}

	public getModelsByType(type: symbol): ReactiveElementModel[] {
		const reactiveModels: ReactiveElementModel[] = []
		const rawModels = this._typeModelsPool.get(type)

		if (rawModels && rawModels.size > 0) {
			for (const model of rawModels) {
				const reactiveModel = this._getReactiveModel(model)

				if (!reactiveModel) continue

				reactiveModels.push(reactiveModel)
			}
		}

		return reactiveModels
	}

	public getModelIdsByType(type: symbol): string[] {
		const modelIds: string[] = []
		const ids = this._typeIdsPool.get(type)

		if (ids && ids.size > 0) {
			for (const id of ids) {
				modelIds.push(id)
			}
		}

		return modelIds
	}

	public getAllModelIds(): ModelIds {
		const modelIds = {} as ModelIds

		for (const [type, ids] of this._typeIdsPool) {
			if (!modelIds[type.toString()]) {
				modelIds[type.toString()] = []
			}

			for (const id of ids) {
				modelIds[type.toString()].push(id)
			}
		}

		return modelIds
	}

	// id -> model map
	// type -> models map
	// type -> ids map
	private _setModel(model: ElementModel): void {
		const type = model.type
		const id = model.id

		if (this._idModelPool.get(id)) {
			return
		} else {
			this._idModelPool.set(id, model)
		}

		let typeModels = this._typeModelsPool.get(type)
		if (!typeModels) {
			typeModels = new Set<ElementModel>()
			this._typeModelsPool.set(type, typeModels)
		} else {
			typeModels.add(model)
		}

		let typeIds = this._typeIdsPool.get(type)
		if (!typeIds) {
			typeIds = new Set<string>()
			this._typeIdsPool.set(type, typeIds)
		} else {
			typeIds.add(id)
		}
	}

}

export default ModelService
