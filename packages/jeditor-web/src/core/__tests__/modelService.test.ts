import { defineComponent } from 'vue'

import Whiteboard from 'core/views/whiteboard'
import { isArray } from 'shared/utils/typeCheck'
import { createIdentifier } from 'shared/utils/uuid'
import container from 'dependency-inject.config'
import Symbols from 'dependency-type.config'

import type ModelService from 'core/modelService'
import type PluginService from 'core/pluginService'
import { ElementModel } from 'core/type'
import { EditorPlugin } from 'extensions/type'

describe('modelService', () => {
	let pluginService: PluginService
	let modelService: ModelService
	let plugin: EditorPlugin
	let model: ElementModel

	beforeEach(() => {
		container.snapshot()

		vi.mock('shared/utils/uuid', async importOriginal => {
			const mod = (await importOriginal()) as object
			return {
				...mod,
				createIdentifier: vi.fn(() => 'validId'),
			}
		})

		pluginService = container.get<PluginService>(Symbols.PluginService)
		modelService = container.get<ModelService>(Symbols.ModelService)

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

	it('should throw error if given invalid type when modelService generateModel', () => {
		expect(() => modelService.generateModel('invalidType')).toThrow(
			/unknown model type/
		)
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

	it('should get the whiteboard model if Whiteboard Plugin used', () => {
		const whiteboard = container.get<Whiteboard>(Symbols.Whiteboard)
		pluginService.usePlugin(whiteboard)

		modelService.generateModel('Whiteboard')

		const boardModel = modelService.getBoardModel()

		expect(boardModel).not.toBeNull()
		expect(isArray(boardModel?.elements)).toBe(true)
		expect(boardModel?.id).toBe('validId')
		expect(boardModel?.type).toBe('Whiteboard')
	})

	it('should get null if Whiteboard Plugin not used', () => {
		const boardModel = modelService.getBoardModel()

		expect(boardModel).toBeNull()
	})
})
