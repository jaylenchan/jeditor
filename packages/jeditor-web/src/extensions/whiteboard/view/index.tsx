import { defineComponent, h, resolveComponent } from 'vue'
import style from './index.module.scss'
import Wrapper from 'common/wrapper'

const WhiteboardView = defineComponent({
	setup() {
		const elements = [
			{
				type: 'Picture',
				props: {
					id: 'pic11',
					text: '1',
				},
			},
			{
				type: 'Text',
				props: {
					id: 'tex11',
					text: '2',
				},
			},
		]

		return () => (
			<div class={style.container}>
				{elements.map(el => {
					return (
						<Wrapper
							id={el.props.id}
							onSelected={id => {
								console.log('selectedId', id)
							}}
						>
							{h(resolveComponent(el.type), { ...el.props })}
						</Wrapper>
					)
				})}
			</div>
		)
	},
})

export default WhiteboardView

export type IWhiteboardView = typeof WhiteboardView
