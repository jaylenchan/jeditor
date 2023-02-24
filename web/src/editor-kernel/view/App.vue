<script setup lang="ts">
import Layout from './Layout.vue'
// import {
//   RendererElement,
//   RendererNode,
//   VNode,
//   createVNode,
//   ref,
//   render,
//   getCurrentInstance,
//   resolveComponent,
// } from 'vue'

// type Component<T extends (...args: any[]) => any> = T extends (
//   ...args: infer O
// ) => any
//   ? O
//   : never

// type VNodeParams = Component<typeof createVNode>

// const container = ref<Element>()
// const app = getCurrentInstance()
// const PicComp = resolveComponent('Picture')
// /**
//  * 真正的应该是数据驱动渲染这里：测试数据这里
//  * TODO
//  */
// function addPic() {
//   if (container.value && app) {
//     insert({
//       el: container.value!,
//       component: PicComp,
//       props: {
//         text: '你好，世界🤝',
//       },
//     })
//   }
// }

// type EVNode = VNode<
//   RendererNode,
//   RendererElement,
//   {
//     [key: string]: unknown
//   }
// > | null
// function insert({
//   el,
//   component,
//   props,
// }: {
//   el: Element
//   component: VNodeParams[0]
//   props: VNodeParams[1]
// }) {
//   let vnode: EVNode = createVNode(component, props)
//   render(vnode, el)
// }
</script>

<template>
  <Layout></Layout>
</template>

<style scoped></style>
