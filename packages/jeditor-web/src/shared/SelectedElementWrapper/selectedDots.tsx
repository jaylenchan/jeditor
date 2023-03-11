import type { SetRefFunc } from 'shared/utils/type'
import type { StyleValue } from 'vue'

export enum Cursor {
	TopLeft = 'nw-resize',
	TopCenter = 'n-resize',
	TopRight = 'ne-resize',
	CenterLeft = 'w-resize',
	CenterRight = 'e-resize',
	BottomLeft = 'sw-resize',
	BottomCenter = 's-resize',
	BottomRight = 'se-resize',
}

export enum DragPosition {
	TopLeft,
	TopCenter,
	TopRight,
	CenterLeft,
	CenterRight,
	BottomLeft,
	BottomCenter,
	BottomRight,
}

export interface DotLayout {
	left: number
	top: number
	inRight: boolean
	inBottom: boolean
	cursor: string
	dragPosition: DragPosition
}

// all dot is positioned relative to the selected parent -> SelectedElementWrapper
export function getDotsPositions({
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
			dragPosition: DragPosition.TopLeft,
		},
		{
			// top-center
			left: Math.round(width / 2),
			top: 0,
			inRight: false,
			inBottom: false,
			cursor: Cursor.TopCenter,
			dragPosition: DragPosition.TopCenter,
		},

		{
			// top-right
			left: width,
			top: 0,
			inRight: true,
			inBottom: false,
			cursor: Cursor.TopRight,
			dragPosition: DragPosition.TopRight,
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
			dragPosition: DragPosition.CenterLeft,
		},
		{
			// center-right
			left: width,
			top: Math.round(height / 2),
			inRight: true,
			inBottom: false,
			cursor: Cursor.CenterRight,
			dragPosition: DragPosition.CenterRight,
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
			dragPosition: DragPosition.BottomLeft,
		},
		{
			// bottom-center
			left: Math.round(width / 2),
			top: height,
			inRight: false,
			inBottom: true,
			cursor: Cursor.BottomCenter,
			dragPosition: DragPosition.BottomCenter,
		},
		{
			// bottom-right
			left: width,
			top: height,
			inRight: true,
			inBottom: true,
			cursor: Cursor.BottomRight,
			dragPosition: DragPosition.BottomRight,
		},
		// ================ bottom ==========
	]

	return dots
}

// create all dot
export function createDots(
	dotLayoutList: DotLayout[],
	selectedElementWrapper: HTMLDivElement,
	setDotPositions: SetRefFunc<DotLayout[]>
) {
	if (!dotLayoutList || !dotLayoutList.length) return

	return dotLayoutList.map(dotLayout => {
		const { width, height } = selectedElementWrapper.getBoundingClientRect()
		const layout = {
			originClientX: 0,
			originClientY: 0,
			originWidth: width,
			originHeight: height,
			originTop: 0,
			originLeft: 0,
		}

		function handleMousedown(e: MouseEvent) {
			layout.originClientX = e.clientX
			layout.originClientY = e.clientY
			layout.originTop = selectedElementWrapper.offsetTop
			layout.originLeft = selectedElementWrapper.offsetLeft

			document.addEventListener('mousemove', handleMousemove)
			document.addEventListener('mouseup', handleMouseup)
		}

		function handleMousemove(e: MouseEvent) {
			const { clientX, clientY } = e

			switch (dotLayout.dragPosition) {
				case DragPosition.TopLeft: {
					const newWidth = layout.originWidth - (clientX - layout.originClientX)
					const newHeight =
						layout.originHeight - (clientY - layout.originClientY)

					const newLeft = layout.originLeft + (clientX - layout.originClientX)
					const newTop = layout.originTop + (clientY - layout.originClientY)

					if (newWidth <= 0 || newHeight <= 0) return

					selectedElementWrapper.style.width = newWidth + 'px'
					selectedElementWrapper.style.height = newHeight + 'px'
					selectedElementWrapper.style.left = newLeft + 'px'
					selectedElementWrapper.style.top = newTop + 'px'

					setDotPositions(
						getDotsPositions({ width: newWidth, height: newHeight })
					)

					break
				}
				case DragPosition.TopCenter: {
					const newHeight =
						layout.originHeight - (clientY - layout.originClientY)
					const newTop = layout.originTop + (clientY - layout.originClientY)

					if (newHeight <= 0) return

					selectedElementWrapper.style.height = newHeight + 'px'
					selectedElementWrapper.style.top = newTop + 'px'

					setDotPositions(getDotsPositions({ width, height: newHeight }))

					break
				}
				case DragPosition.TopRight: {
					const newWidth = layout.originWidth + (clientX - layout.originClientX)
					const newHeight =
						layout.originHeight - (clientY - layout.originClientY)
					const newTop = layout.originTop + (clientY - layout.originClientY)

					if (newWidth <= 0 || newHeight <= 0) return

					selectedElementWrapper.style.width = newWidth + 'px'
					selectedElementWrapper.style.height = newHeight + 'px'
					selectedElementWrapper.style.top = newTop + 'px'

					setDotPositions(
						getDotsPositions({ width: newWidth, height: newHeight })
					)

					break
				}
				case DragPosition.CenterLeft: {
					const newWidth = layout.originWidth - (clientX - layout.originClientX)

					const newLeft = layout.originLeft + (clientX - layout.originClientX)

					if (newWidth <= 0) return

					selectedElementWrapper.style.width = newWidth + 'px'
					selectedElementWrapper.style.left = newLeft + 'px'

					setDotPositions(getDotsPositions({ width: newWidth, height }))

					break
				}
				case DragPosition.CenterRight: {
					const newWidth = layout.originWidth + (clientX - layout.originClientX)

					if (newWidth <= 0) return

					selectedElementWrapper.style.width = newWidth + 'px'

					setDotPositions(getDotsPositions({ width: newWidth, height }))

					break
				}
				case DragPosition.BottomLeft: {
					const newWidth = layout.originWidth - (clientX - layout.originClientX)
					const newHeight =
						layout.originHeight + (clientY - layout.originClientY)

					const newLeft = layout.originLeft + (clientX - layout.originClientX)

					if (newWidth <= 0 || newHeight <= 0) return

					selectedElementWrapper.style.width = newWidth + 'px'
					selectedElementWrapper.style.height = newHeight + 'px'
					selectedElementWrapper.style.left = newLeft + 'px'

					setDotPositions(
						getDotsPositions({ width: newWidth, height: newHeight })
					)

					break
				}
				case DragPosition.BottomCenter: {
					const newHeight =
						layout.originHeight + (clientY - layout.originClientY)

					selectedElementWrapper.style.height = newHeight + 'px'

					setDotPositions(getDotsPositions({ width, height: newHeight }))

					break
				}
				case DragPosition.BottomRight: {
					const newWidth = layout.originWidth + (clientX - layout.originClientX)
					const newHeight =
						layout.originHeight + (clientY - layout.originClientY)
					if (newWidth <= 0 || newHeight <= 0) return

					selectedElementWrapper.style.width = newWidth + 'px'
					selectedElementWrapper.style.height = newHeight + 'px'

					setDotPositions(
						getDotsPositions({ width: newWidth, height: newHeight })
					)

					break
				}
			}
		}

		function handleMouseup() {
			document.removeEventListener('mousemove', handleMousemove)
			document.removeEventListener('mouseup', handleMouseup)
		}

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

		return (
			<div
				style={styleConfig as StyleValue}
				onMousedown={handleMousedown}
			></div>
		)
	})
}
