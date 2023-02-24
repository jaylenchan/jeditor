<script setup lang="ts">
import layout from './layout.module.scss'
</script>

<template>
  <el-container :class="layout.container" direction="vertical">
    <el-header :class="layout.header">Header</el-header>
    <el-container>
      <el-aside width="150px">Aside</el-aside>
      <el-main>Main</el-main>
      <el-aside width="300px">Aside</el-aside>
    </el-container>
  </el-container>
</template>
