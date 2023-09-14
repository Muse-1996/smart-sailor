<!--
 * @Author: Muse admin@yunsinek.cn
 * @Date: 2023-09-13 15:39:11
 * @LastEditors: Muse admin@yunsinek.cn
 * @LastEditTime: 2023-09-14 13:52:27
 * @FilePath: /be-free/src/components/layout/slide.vue
 * @Description: 
-->
<template>
  <div id="slide">
    <a-typography-title :heading="6">
      功能清单
    </a-typography-title>
    <a-radio-group @change="selectRadioChange">
      <template v-for="item in slideBlocks" :key="item.routeName">
        <a-radio :value="item.routeName">
          <template #radio="{ checked }">
            <a-space
              align="start"
              class="custom-radio-card"
              :class="{ 'custom-radio-card-checked': checked }"
            >
              <div>
                <div className="custom-radio-card-title">
                  {{ item.title }}
                </div>
                <a-typography-text type="secondary">
                  {{ item.subtitle }}
                </a-typography-text>
              </div>
            </a-space>
          </template>
        </a-radio>
      </template>
    </a-radio-group>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'

  interface SlideBlock {
    id: number
    title: string
    subtitle: string
    routeName: string
  }

  const router = useRouter()
  const slideBlocks  = [
    {
      id: 1,
      title: '扁平Icon图标生成器',
      subtitle: '方便快捷的生成扁平化的Icon图标',
      routeName: 'dom2svg'
    }
  ];

  const selectRadioChange = (v) =>{
    if(v){
      router.push({name:v})
    }
  }
</script>


<style scoped>

#slide { 
  width: 400px;
  padding: 0px 10px;
}

.custom-radio-card {
  padding: 10px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 250px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.custom-radio-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-radio-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 100%;
}

.custom-radio-card-title {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.custom-radio-card:hover,
.custom-radio-card-checked,
.custom-radio-card:hover .custom-radio-card-mask,
.custom-radio-card-checked  .custom-radio-card-mask{
  border-color: rgb(var(--primary-6));
}

.custom-radio-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-radio-card:hover .custom-radio-card-title,
.custom-radio-card-checked .custom-radio-card-title {
  color: rgb(var(--primary-6));
}

.custom-radio-card-checked .custom-radio-card-mask-dot {
  background-color: rgb(var(--primary-6));
}

</style>