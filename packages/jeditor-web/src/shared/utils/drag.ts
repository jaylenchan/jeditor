import { reactive } from 'vue'

export function useDrag(el: HTMLElement) {
	const mouseLayout = reactive({ x: 0, y: 0, deltaX: 0, deltaY: 0 })
	const elementLayout = reactive({ left: el.clientLeft, top: el.clientTop })

	function handleMouseDown(event: MouseEvent) {
		event.stopPropagation()

		mouseLayout.x = event.clientX
		mouseLayout.y = event.clientY

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)

		if (getComputedStyle(el).position != 'absolute')
			el.style.position = 'absolute'
	}

	function handleMouseMove(event: MouseEvent) {
		event.stopPropagation()

		const deltaX = event.clientX - mouseLayout.x
		const deltaY = event.clientY - mouseLayout.y

		mouseLayout.x = event.clientX
		mouseLayout.y = event.clientY
		mouseLayout.deltaX = deltaX
		mouseLayout.deltaY = deltaY

		elementLayout.left = elementLayout.left + mouseLayout.deltaX
		elementLayout.top = elementLayout.top + mouseLayout.deltaY

		el.style.left = elementLayout.left + 'px'
		el.style.top = elementLayout.top + 'px'
	}

	function handleMouseUp() {
		document.removeEventListener('mousemove', handleMouseMove)
		document.removeEventListener('mouseup', handleMouseUp)
	}

	function handleMouseEnter() {
		el.style.cursor = 'move'
		el.style.userSelect = 'none'
	}

	function handleMouseLeave() {
		el.style.cursor = 'move'
	}

	el.addEventListener('mouseenter', handleMouseEnter)
	el.addEventListener('mouseleave', handleMouseLeave)
	el.addEventListener('mousedown', handleMouseDown)
}
