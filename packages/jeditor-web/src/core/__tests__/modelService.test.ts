import { defineComponent } from 'vue'

import { createIdentifier } from 'common/utils/uuid'
import container from 'web-src/dependency-inject.config'

import type ModelService from 'core/modelService'
import type PluginService from 'core/pluginService'
import { ElementModel, TYPES } from 'core/type'
import { EditorPlugin } from 'extensions/type'

describe('modelService', () => {
	let pluginService: PluginService
	let modelService: ModelService
	let plugin: EditorPlugin
	let model: ElementModel

	beforeEach(() => {
		container.snapshot()

		vi.mock('common/utils/uuid', async importOriginal => {
			const mod = (await importOriginal()) as object
			return {
				...mod,
				createIdentifier: vi.fn(() => 'validId'),
			}
		})

		pluginService = container.get<PluginService>(TYPES.PluginService)
		modelService = container.get<ModelService>(TYPES.ModelService)

		plugin = {
			type: 'validType',
			view: defineComponent({
				setup() {
					return 'plugin'
				},
			}),
			model: class {

				public id = createIdentifier()
				public type = 'validType'
				public props = {
					position: { x: 0, y: 0 },
					border: {
						type: 'solid',
						color: '#000000',
						weight: 1,
						radius: 1,
					},
					opacity: 1,
				}
			
},
		}

		pluginService.usePlugin(plugin)

		model = modelService.generateModel('validType')
	})

	afterEach(() => {
		container.restore()
	})

	it('should generate a model if given valid type', () => {
		const pluginModel = new plugin.model()

		expect(model).not.toBeNull()
		expect(model).toEqual(pluginModel)
		expect(model.id).toBe('validId')
		expect(model.type).toBe('validType')
		expect(model.props).toEqual({
			position: { x: 0, y: 0 },
			border: {
				type: 'solid',
				color: '#000000',
				weight: 1,
				radius: 1,
			},
			opacity: 1,
		})
	})

	it('should has a model in modelPool and a modelId in modelIdPool if set a specific type model', () => {
		modelService.setModel(model)

		expect(modelService.modelPool.has('validType')).toBe(true)
		expect(modelService.modelIdPool.has('validType')).toBe(true)
	})

	it('should get model given a valid type and id', () => {
		const model = modelService.getModel('validType', 'validId')
		const pluginModel = new plugin.model()

		expect(model).not.toBeNull()
		expect(model).toEqual(pluginModel)
	})

	it('should get null given a invalid type or id', () => {
		const invalidTypeModel = modelService.getModel('invalidType', 'validId')
		const invalidIdModel = modelService.getModel('validType', 'invalidId')

		expect(invalidTypeModel).toBeNull()
		expect(invalidIdModel).toBeNull()
	})

	it('should get a id array given a valid type', () => {
		const ids = modelService.getModelIds('validType')

		expect(ids).not.toBeNull()
		expect(ids?.length).toBe(1)
		expect(ids?.[0]).toBe('validId')
	})

	it('should get a object equalTo "{ validType: ["validId"] }"', () => {
		const allIds = modelService.getAllModelIds()

		expect(allIds).not.toBeNull()
		expect(allIds).toEqual({
			validType: ['validId'],
		})
	})

	it('should get a object equalTo "{}" when modelIdPool is empty', () => {
		modelService.modelIdPool = new Map()
		const allIds = modelService.getAllModelIds()

		expect(allIds).toEqual({})
	})
})
