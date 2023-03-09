import { defineComponent, reactive, ref, watch, watchEffect } from 'vue'

import { ee } from 'shared/utils/event'
import { merge } from 'shared/utils/object'

import type { ElementModel } from 'shared/utils/type'
import type { StyleValue, Ref } from 'vue'
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

function createDot(
	cunstomStyleOptions: {
		left: string
		top: string
		marginTop: string
		marginLeft: string
		cursor: string
	},
	selectedElementWrapperRef: Ref<HTMLDivElement | null>,
	dotPositions: Ref<DotPosition[]>
) {
	const defaultOptions = {
		width: `9px`,
		height: `9px`,
		border: `1px solid rgb(0, 170, 255)`,
		borderRadius: `50%`,
		backgroundColor: `#ffffff`,
		position: 'absolute',
		zIndex: 100,
	}

	const mouseLayout = reactive({
		x: 0,
		y: 0,
		deltaX: 0,
		deltaY: 0,
	})
	const dotRef = ref<HTMLDivElement | null>(null)
	const styleOptions = reactive(merge(defaultOptions, cunstomStyleOptions))

	return (
		<div
			ref={dotRef}
			style={styleOptions as StyleValue}
			onMousedown={handleDotMousedown}
		></div>
	)

	function handleDotMousedown(event: MouseEvent) {
		event.stopPropagation()

		mouseLayout.x = event.clientX
		mouseLayout.y = event.clientY

		document.addEventListener('mousemove', handleDotMousemove)
		document.addEventListener('mouseup', handleDotMouseup)
	}

	function handleDotMousemove(event: MouseEvent) {
		const deltaX = event.clientX - mouseLayout.x
		const deltaY = event.clientY - mouseLayout.y

		mouseLayout.x = event.clientX
		mouseLayout.y = event.clientY
		mouseLayout.deltaX = deltaX
		mouseLayout.deltaY = deltaY

		if (selectedElementWrapperRef.value) {
			const { width, height } =
				selectedElementWrapperRef.value.getBoundingClientRect()
			selectedElementWrapperRef.value.style.width =
				width + mouseLayout.deltaX + 'px'
			selectedElementWrapperRef.value.style.height =
				height + mouseLayout.deltaY + 'px'

			dotPositions.value = getAllDotsPosition(
				width + mouseLayout.deltaX,
				height + mouseLayout.deltaY
			)
		}
	}

	function handleDotMouseup() {
		document.removeEventListener('mousemove', handleDotMousemove)
	}
}

const SelectedElementWrapper = defineComponent({
	props: {
		elementId: {
			type: String,
			required: true,
		},
	},
	setup({ elementId }, { slots }) {
		const dotPositions = ref<DotPosition[]>([])
		const selectedElementWrapperRef = ref<HTMLDivElement | null>(null)
		const selectedActive = ref<boolean>(false)

		watch(selectedElementWrapperRef, selectedElementWrapper => {
			if (selectedElementWrapper) {
				const { width, height } = selectedElementWrapper.getBoundingClientRect()

				dotPositions.value = getAllDotsPosition(width, height)
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
				<>
					{selectedActive.value &&
						dotPositions.value.length > 0 &&
						dotPositions.value.map(dot =>
							createDot(
								{
									left: dot.left + 'px',
									top: dot.top + 'px',
									marginTop: dot.hasBottom ? `-5px` : `-4px`,
									marginLeft: dot.hasRight ? `-5px` : `-4px`,
									cursor: dot.cursor,
								},
								selectedElementWrapperRef,
								dotPositions
							)
						)}
					<div
						class={[
							style.selectedElementWrapper,
							!selectedActive.value && style.notSelected,
						]}
						ref={selectedElementWrapperRef}
					>
						{slots.default?.()}
					</div>
				</>
			)
		}
	},
})

export default SelectedElementWrapper
