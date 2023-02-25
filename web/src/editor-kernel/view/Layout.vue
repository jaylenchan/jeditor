<script setup lang="ts">
import layout from './layout.module.scss'
</script>

<template>
  <el-container :class="layout.container" direction="vertical">
    <el-row>
      <el-header :class="layout.header">Header</el-header>
    </el-row>
    <el-row :class="layout.bottom">
      <el-col :span="3">
        <el-aside :class="layout.componentTool">Aside</el-aside>
      </el-col>
      <el-col :span="15">
        <el-main :class="layout.whiteboard">Main</el-main>
      </el-col>
      <el-col :span="6">
        <el-aside :class="layout.propTool">Aside</el-aside>
      </el-col>
    </el-row>
  </el-container>
</template>
