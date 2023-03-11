export function useDrag(el: HTMLElement): void {
	// the distance of mouse to element[left|top]
	const distanceOfMouseToElement = {
		left: 0,
		top: 0,
	}

	function handleMousedown(e: MouseEvent): void {
		const { left, top } = el.getBoundingClientRect()

		distanceOfMouseToElement.left = e.clientX - left
		distanceOfMouseToElement.top = e.clientY - top

		document.addEventListener('mousemove', handleMousemove)
		document.addEventListener('mouseup', handleMouseup)
	}

	function handleMousemove(e: MouseEvent): void {
		const board = document.getElementById('whiteboard')
		if (board) {
			const { clientX, clientY } = e

			const newBoundingClientLeft = clientX - distanceOfMouseToElement.left
			const newBoundingClientTop = clientY - distanceOfMouseToElement.top

			const { left, top } = board.getBoundingClientRect()

			const leftToBoard = newBoundingClientLeft - left
			const topToBoard = newBoundingClientTop - top

			const whiteboard = document.getElementById('whiteboard')
			if (leftToBoard < 0 || topToBoard < 0) return

			if (whiteboard) {
				if (
					leftToBoard + el.offsetWidth > whiteboard.offsetWidth ||
					topToBoard + el.offsetHeight > whiteboard.offsetHeight
				)
					return
			}

			el.style.left = leftToBoard + 'px'
			el.style.top = topToBoard + 'px'
		}
	}

	function handleMouseup(): void {
		document.removeEventListener('mousemove', handleMousemove)
		document.removeEventListener('mouseup', handleMouseup)
	}

	function handleMouseenter(): void {
		el.style.cursor = 'move'
		el.style.userSelect = 'none'
	}

	function handleMouseleave(): void {
		el.style.cursor = 'move'
		el.style.userSelect = 'initial'
	}

	el.addEventListener('mousedown', handleMousedown)
	el.addEventListener('mouseenter', handleMouseenter)
	el.addEventListener('mouseleave', handleMouseleave)
}
