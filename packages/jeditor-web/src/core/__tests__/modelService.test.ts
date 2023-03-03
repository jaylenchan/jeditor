import container from 'web-src/dependency-inject.config'

import type ModelService from 'core/modelService'
import { TYPES } from 'core/type'

describe('modelService', () => {
	beforeEach(() => {
		container.snapshot()
	})

	afterEach(() => {
		container.restore()
	})

	test('genenrateModel', () => {
		const modelService = container.get<ModelService>(TYPES.ModelService)
		// const boardModel = modelService.generateModel("Whiteboard")

		// expect(boardModel.type).toBe("Whiteboard")
		expect(modelService.modelPool.size).toBe(0)
	})
})
