import { defineComponent, ref, watch, watchEffect } from 'vue'

import { useDrag } from 'shared/utils/drag'
import { ee } from 'shared/utils/event'
import { useRef } from 'shared/utils/render'

import { createDots, getDotsPositions } from './selectedDots'

import type { DotLayout } from './selectedDots'
import type { ReactiveElementModel } from 'shared/utils/type'
import type { PropType } from 'vue'
import style from './index.module.scss'

const SelectedElementWrapper = defineComponent({
	props: {
		model: {
			type: Object as PropType<ReactiveElementModel>,
			required: true,
		},
	},
	setup({ model }, { slots }) {
		const [dotPositions, setDotPositions] = useRef<DotLayout[]>([])
		const [selectedActive, setSelectedActive] = useRef<boolean>(false)
		const selectedElementWrapperRef = ref<HTMLDivElement | null>(null)

		watch(selectedElementWrapperRef, selectedElementWrapper => {
			if (selectedElementWrapper) {
				useDrag(selectedElementWrapper)

				const { width, height } = selectedElementWrapper.getBoundingClientRect()
				setDotPositions(getDotsPositions({ width, height }))
			}
		})

		watchEffect(() => {
			ee.on('elementSelected', (selectedModel: ReactiveElementModel) => {
				if (model.id == selectedModel.id) {
					setSelectedActive(true)
				} else {
					setSelectedActive(false)
				}
			})
		})

		return () => {
			return (
				<div
					class={[
						style.selectedElementWrapper,
						!selectedActive.value && style.notSelected,
					]}
					ref={selectedElementWrapperRef}
				>
					<div
						class={style.selectedEelementWrapperDots}
						onMousedown={e => e.stopPropagation()}
					>
						{selectedActive.value &&
							dotPositions.value.length > 0 &&
							selectedElementWrapperRef.value &&
							createDots(
								dotPositions.value,
								selectedElementWrapperRef.value,
								setDotPositions
							)}
					</div>
					{slots.default?.()}
				</div>
			)
		}
	},
})

export default SelectedElementWrapper
