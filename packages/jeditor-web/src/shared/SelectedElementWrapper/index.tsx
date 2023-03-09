import { defineComponent, ref, watch } from 'vue'

import { merge } from 'shared/utils/object'

import type { StyleValue } from 'vue'
import style from './index.module.scss'

interface DotPosition {
	left: number
	top: number
	hasRight: boolean
	hasBottom: boolean
	cursor: string
}

function getAllDotsPosition(width: number, height: number) {
	const dotPositions: DotPosition[] = [
		{
			// left top
			left: 0,
			top: 0,
			hasRight: false,
			hasBottom: false,
			cursor: `nwse-resize`,
		},
		{
			// left center
			left: 0,
			top: Math.round(height / 2),
			hasRight: false,
			hasBottom: false,
			cursor: `ew-resize`,
		},
		{
			// left bottom
			left: 0,
			top: height,
			hasRight: false,
			hasBottom: true,
			cursor: `nesw-resize`,
		},
		{
			// center top
			left: Math.round(width / 2),
			top: 0,
			hasRight: false,
			hasBottom: false,
			cursor: `ns-resize`,
		},
		{
			// center bottom
			left: Math.round(width / 2),
			top: height,
			hasRight: false,
			hasBottom: true,
			cursor: `ns-resize`,
		},
		{
			// right top
			left: width,
			top: 0,
			hasRight: true,
			hasBottom: false,
			cursor: `nesw-resize`,
		},
		{
			// right center
			left: width,
			top: Math.round(height / 2),
			hasRight: true,
			hasBottom: false,
			cursor: `ew-resize`,
		},
		{
			// right bottom
			left: width,
			top: height,
			hasRight: true,
			hasBottom: true,
			cursor: `nwse-resize`,
		},
	]

	return dotPositions
}

function createDot(styleOptions: StyleValue) {
	const defaultOptions: StyleValue = {
		width: `9px`,
		height: `9px`,
		border: `1px solid rgb(0, 170, 255)`,
		borderRadius: `50%`,
		backgroundColor: `#ffffff`,
		position: 'absolute',
		zIndex: 100,
	}

	return <div style={merge(defaultOptions, styleOptions)}></div>
}

const SelectedEelemntWrapper = defineComponent({
	setup(_, { slots }) {
		const dotPositions = ref<DotPosition[]>([])
		const selectedElementWrapperRef = ref<HTMLDivElement | null>(null)

		watch(selectedElementWrapperRef, selectedElementWrapper => {
			if (selectedElementWrapper) {
				const { width, height } = selectedElementWrapper.getBoundingClientRect()

				dotPositions.value = getAllDotsPosition(width, height)
			}
		})

		return () => (
			<>
				{dotPositions.value.length > 0 &&
					dotPositions.value.map(dot =>
						createDot({
							left: dot.left + 'px',
							top: dot.top + 'px',
							marginTop: dot.hasBottom ? `-5px` : `-4px`,
							marginLeft: dot.hasRight ? `-5px` : `-4px`,
							cursor: dot.cursor,
						})
					)}
				<div
					class={style.selectedElementWrapper}
					ref={selectedElementWrapperRef}
				>
					{slots.default?.()}
				</div>
			</>
		)
	},
})

export default SelectedEelemntWrapper
