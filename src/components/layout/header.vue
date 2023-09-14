<!--
 * @Author: Muse admin@yunsinek.cn
 * @Date: 2023-09-13 15:27:36
 * @LastEditors: Muse admin@yunsinek.cn
 * @LastEditTime: 2023-09-13 16:04:38
 * @FilePath: /be-free/src/components/layout/header.vue
 * @Description: 
-->
<template>
  <a-page-header
      :style="{ background: 'var(--color-bg-2)',borderBottom:'1px solid #eee' }"
      title="ArcoDesign"
      subtitle="ArcoDesign Vue 2.0"
      :show-back="false"
    >
      <template #extra>
        <a-radio-group type="button" default-value="large">
          <a-radio value="mini">Mini</a-radio>
          <a-radio value="small">Small</a-radio>
          <a-radio value="large">Large</a-radio>
        </a-radio-group>
      </template>
    </a-page-header>
</template>
