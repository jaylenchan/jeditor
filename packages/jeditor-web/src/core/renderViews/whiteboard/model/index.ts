import Symbols from 'settings/dependency-type.config'

import type {
	Border,
	ReactiveElementModel,
	Layout,
	Size,
} from 'shared/utils/type'


class Model implements ReactiveElementModel {

	public readonly id: string
	public readonly type: symbol
	public elements: ReactiveElementModel[]
	public props: {
		border: Border
		opacity: number
		size: Size
		layout: Layout
	}

	constructor() {
		this.id = Symbols.Whiteboard.toString()
		this.type = Symbols.Whiteboard
		this.elements = []
		this.props = {
			layout: {
				x: 0,
				y: 0,
			},
			border: {
				type: 'solid',
				color: '#000000',
				weight: 1,
				radius: 1,
			},
			opacity: 1,
			size: {
				width: 900,
				height: 500,
			},
		}
	}

}

export default Model
