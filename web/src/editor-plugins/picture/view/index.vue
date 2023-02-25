<script setup lang="ts">
import style from './index.module.scss'
defineProps({
  text: String,
})
</script>

<template>
  <div :class="style.container">图片插件： {{ text }}</div>
</template>

<style scoped></style>
