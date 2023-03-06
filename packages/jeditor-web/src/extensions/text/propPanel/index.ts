import Symbols from 'settings/dependency-type.config'

import type { PanelItem, PropPanelPlugin } from 'shared/utils/type'

class TextPanel implements PropPanelPlugin {

	type = Symbols.Text
	props: Set<string> = new Set()
	components: Map<string, Set<PanelItem>> = new Map()

	constructor() {
		this.initPanel()
	}

	initPanel() {
		this.editHeight()
		this.editWidth()
		this.editColor()
		this.editBackgroundColor()
		this.editX()
		this.editY()
	}

	editHeight(): void {
		let slider = this.components.get('slider')

		if (!slider) {
			slider = new Set()
			this.components.set('slider', slider)
		}

		if (!this.props.has('height')) {
			slider.add({
				componentType: 'slider',
				prop: 'height',
				event: ['onClick', () => 'onClick'],
			})
			this.props.add('height')
		}
	}

	editWidth() {
		let slider = this.components.get('slider')

		if (!slider) {
			slider = new Set()
			this.components.set('slider', slider)
		}

		if (!this.props.has('width')) {
			slider.add({
				componentType: 'slider',
				prop: 'width',
				event: ['onClick', () => 'onClick'],
			})
			this.props.add('width')
		}
	}

	editColor() {
		let colorPicker = this.components.get('colorPicker')

		if (!colorPicker) {
			colorPicker = new Set()
			this.components.set('colorPicker', colorPicker)
		}

		if (!this.props.has('color')) {
			colorPicker.add({
				componentType: 'colorPicker',
				prop: 'color',
				event: ['onClick', () => 'onClick'],
			})

			this.props.add('color')
		}
	}

	editBackgroundColor() {
		let colorPicker = this.components.get('colorPicker')

		if (!colorPicker) {
			colorPicker = new Set()
			this.components.set('colorPicker', colorPicker)
		}

		if (!this.props.has('backgroundColor')) {
			colorPicker.add({
				componentType: 'colorPicker',
				prop: 'backgroundColor',
				event: ['onClick', () => 'onClick'],
			})

			this.props.add('backgroundColor')
		}
	}

	editX() {
		let input = this.components.get('input')

		if (!input) {
			input = new Set()
			this.components.set('input', input)
		}

		if (!this.props.has('x')) {
			input.add({
				componentType: 'input',
				prop: 'x',
				event: ['onClick', () => 'onClick'],
			})

			this.props.add('x')
		}
	}

	editY() {
		let input = this.components.get('input')

		if (!input) {
			input = new Set()
			this.components.set('input', input)
		}

		if (!this.props.has('y')) {
			input.add({
				componentType: 'input',
				prop: 'y',
				event: ['onClick', () => 'onClick'],
			})

			this.props.add('y')
		}
	}

}

export default TextPanel
