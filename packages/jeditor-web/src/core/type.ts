import type { ModelClass } from 'shared/utils/type'
import type { Component } from 'vue'


export interface BuiltInPlugin {
	type: symbol
	view: Component
	model: ModelClass
}
