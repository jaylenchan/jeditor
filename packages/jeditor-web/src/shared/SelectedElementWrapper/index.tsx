import { defineComponent, ref, watch, watchEffect } from 'vue'

import { useDrag } from 'shared/utils/drag'
import { ee } from 'shared/utils/event'

import type { ElementModel } from 'shared/utils/type'
import type { StyleValue } from 'vue'
import style from './index.module.scss'

interface DotLayout {
	left: number
	top: number
	inRight: boolean
	inBottom: boolean
	cursor: string
}

enum Cursor {
	TopLeft = 'nw-resize',
	TopCenter = 'n-resize',
	TopRight = 'ne-resize',
	CenterLeft = 'w-resize',
	CenterRight = 'e-resize',
	BottomLeft = 'sw-resize',
	BottomCenter = 's-resize',
	BottomRight = 'se-resize',
}

// all dot is positioned relative to the selected parent -> SelectedElementWrapper
function getDotsPositions({
	width,
	height,
}: {
	width: number
	height: number
}): DotLayout[] {
	const dots = [
		// ================ top ============
		{
			// top-left
			left: 0,
			top: 0,
			inRight: false,
			inBottom: false,
			cursor: Cursor.TopLeft,
		},
		{
			// top-center
			left: Math.round(width / 2),
			top: 0,
			inRight: false,
			inBottom: false,
			cursor: Cursor.TopCenter,
		},

		{
			// top-right
			left: width,
			top: 0,
			inRight: true,
			inBottom: false,
			cursor: Cursor.TopRight,
		},
		// ================ top =============

		// ================ center ==========
		{
			// center-left
			left: 0,
			top: Math.round(height / 2),
			inRight: false,
			inBottom: false,
			cursor: Cursor.CenterLeft,
		},
		{
			// center-right
			left: width,
			top: Math.round(height / 2),
			inRight: true,
			inBottom: false,
			cursor: Cursor.CenterRight,
		},
		// ================ center ==========

		// ================ bottom ==========
		{
			// bottom-left
			left: 0,
			top: height,
			inRight: false,
			inBottom: true,
			cursor: Cursor.BottomLeft,
		},
		{
			// bottom-center
			left: Math.round(width / 2),
			top: height,
			inRight: false,
			inBottom: true,
			cursor: Cursor.BottomCenter,
		},
		{
			// bottom-right
			left: width,
			top: height,
			inRight: true,
			inBottom: true,
			cursor: Cursor.BottomRight,
		},
		// ================ bottom ==========
	]

	return dots
}

// create all dot
function createDots(dotLayoutList: DotLayout[]) {
	if (!dotLayoutList || !dotLayoutList.length) return

	return dotLayoutList.map(dotLayout => {
		const styleConfig = {
			width: `9px`,
			height: `9px`,
			border: `2px solid rgb(0, 170, 255)`,
			borderRadius: `50%`,
			backgroundColor: `rgb(0, 170, 255)`,
			zIndex: 100,
			position: 'absolute',
			left: dotLayout.left + 'px',
			top: dotLayout.top + 'px',
			marginTop: dotLayout.inBottom ? `-7px` : `-5px`,
			marginLeft: dotLayout.inRight ? `-7px` : `-5px`,
			cursor: dotLayout.cursor,
		}

		return <div style={styleConfig as StyleValue}></div>
	})
}

const SelectedElementWrapper = defineComponent({
	props: {
		elementId: {
			type: String,
			required: true,
		},
	},
	setup({ elementId }, { slots }) {
		const dotPositions = ref<DotLayout[]>([])
		const selectedElementWrapperRef = ref<HTMLDivElement | null>(null)
		const selectedActive = ref<boolean>(false)

		watch(selectedElementWrapperRef, selectedElementWrapper => {
			if (selectedElementWrapper) {
				useDrag(selectedElementWrapper)

				const { width, height } = selectedElementWrapper.getBoundingClientRect()
				dotPositions.value = getDotsPositions({ width, height })
			}
		})

		watchEffect(() => {
			ee.on('elementSelected', (model: ElementModel) => {
				if (elementId == model.id) {
					selectedActive.value = true
				} else {
					selectedActive.value = false
				}
			})
		})

		return () => {
			return (
				<div
					class={[
						style.selectedElementWrapper,
						// !selectedActive.value && style.notSelected,
					]}
					ref={selectedElementWrapperRef}
				>
					{dotPositions.value.length > 0 && createDots(dotPositions.value)}
					{slots.default?.()}
				</div>
			)
		}
	},
})

export default SelectedElementWrapper
