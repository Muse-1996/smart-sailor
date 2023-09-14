<!--
 * @Author: Muse admin@yunsinek.cn
 * @Date: 2023-09-13 16:19:18
 * @LastEditors: Muse admin@yunsinek.cn
 * @LastEditTime: 2023-09-14 14:04:26
 * @FilePath: /be-free/src/views/DomToSvg.vue
 * @Description: Dom转Svg
-->
<template>
  <div id="dom2svg">
    <div class="preview">
      预览
      <div class="pa-10 full">
        <div class="dom-con" id="domCon"
          :style="{ width: conMaxWidth + 'px', height: conMaxWidth + 'px', backgroundColor: color, background: color, borderRadius: showRadius ? (radiusValue + 'px') : '0px', border: showBorder ? '1px dashed #ccc' : 'none', }">
          <img v-show="iconUrl" :src="iconUrl" :style="{ width: iconMaxWidth + 'px' }">
        </div>
      </div>
      <a-tabs class="main-ctrol" type="card-gutter" :editable="true" show-add-button auto-switch>
        <a-tab-pane v-for="(item, index) of data" :key="item.key" :title="item.title" :closable="false">
          <div class="main-ctrol">
            <div class="pa-10 full relative" :style="{display:item.key === '1'?'flex':'none'}">
              <div class="full" style="width:500px;margin-top: 50px;">
                <a-radio-group v-model="color" :options="colorOptions">
                  <template #label="{ data }">
                    <a-tag style="min-width:74px;margin-bottom: 6px;" :color="data.label">{{ data.label }}</a-tag>
                  </template>
                </a-radio-group>
              </div>
              <ColorPicker style="width:220px;box-shadow: none;" theme="light" :colors-default="colorDefault"
                :color="color" :sucker-hide="false" :sucker-canvas="suckerCanvas" :sucker-area="suckerArea"
                @changeColor="changeColor" />
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="control">
      <div>
        <a-upload action="/" :auto-upload="false" @change="onPicChange" :draggable="true" tip="上传图像" />
      </div>
      <div style="margin-top:20px">
        <a-card>
          <div class="flex">
            <icon-expand class="mr-10" :size="24" />
            <a-slider show-input :default-value="80" :min="20" :max="100" :style="{ width: '250px' }"
              :format-tooltip="formatter" />
          </div>
        </a-card>
      </div>
      <div style="margin-top:20px">
        <a-card>
          <div class="flex">
            <icon-rotate-left class="mr-10" :size="24" />
            <a-slider show-input :default-value="radiusValue" :min="0" :max="conMaxWidth" :style="{ width: '250px' }"
              :format-tooltip="formatterRadius" />
          </div>
        </a-card>
      </div>
      <div style="margin-top:20px">
        <a-card>
          <a-tag class="mr-10" @check="(v: boolean) => showBorder = v" checkable color="arcoblue"
            :default-checked="true">边框显示</a-tag>
          <a-tag @check="(v: boolean) => showRadius = v" checkable color="arcoblue" :default-checked="true">圆角显示</a-tag>
        </a-card>
      </div>
      <div style="margin-top:20px;text-align: right;">
        <a-dropdown-button @click="exportSource" @select="selectExportType">
          <icon-upload /> 导出为{{ exportType }}
          <template #icon>
            <icon-down />
          </template>
          <template #content>
            <a-doption value="svg">.svg</a-doption>
            <a-doption value="png">.png</a-doption>
          </template>
        </a-dropdown-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { IconUpload, IconDown, IconExpand, IconRotateLeft } from '@arco-design/web-vue/es/icon';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image-more';
import moment from 'moment'
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'

const iconUrl = ref('')
const conMaxWidth = 100
const iconMaxWidth = ref(80)
const radiusValue = ref(10)
const showBorder = ref(true)
const showRadius = ref(true)
const exportType = ref('svg')
const colorOptions = ['#f53f3f',
  '#7816ff',
  '#00b42a',
  '#165dff',
  '#ff7d00',
  '#eb0aa4',
  '#7bc616',
  '#86909c',
  '#b71de8',
  '#0fc6c2',
  '#ffb400',
  '#168cff',
  '#ff5722']
const color = ref('#59c7f9'),
  suckerCanvas = null,
  suckerArea: any[] = [],
  colorDefault: string[] = [],
  isSucking = false;
const data = ref([
  {
    key: '1',
    title: '颜色控制',
    content: 'Content of Tab Panel 1'
  },
]);

const onPicChange = (v: any[]) => {
  if (v && v?.length === 0) {
    iconUrl.value = ''
    return
  }
  iconUrl.value = v[v.length - 1].url;
  console.log(iconUrl.value);
}

const formatter = (value: number) => {
  iconMaxWidth.value = conMaxWidth * (value / 100)
  return `${Math.round((value / 100) * 100)}%`
};

const formatterRadius = (value: number) => {
  radiusValue.value = value
  return `${value}px`
};

const selectExportType = (v) => {
  exportType.value = v
}



const exportSource = () => {
  showBorder.value = false
  nextTick(() => {
    const el = document.getElementById('domCon')
    if (exportType.value === 'svg') {
      domtoimage
        .toSvg(el, {
          filter: (node: any) => {
            return node.tagName !== 'i';
          },
          bgColor: color.value
        })
        .then(downloadImg)
        .catch(function (error: any) {
          console.error('oops, something went wrong!', error);
        });
    }

    if (exportType.value === 'png') {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = el!.offsetWidth;
      canvas.height = el!.offsetHeight;
      html2canvas(el as HTMLElement,{ backgroundColor: null }).then(function(canvas) {
        const imgURL = canvas.toDataURL('image/png');
        downloadImg(imgURL)
      });
    }
  })


}


const downloadImg = (dataUrl: string) => {
  const time = moment().format('yyyy-MM-DD_hh-mm-ss')
  const a = document.createElement('a');
  const event = new MouseEvent('click');
  a.download = time;
  a.href = dataUrl;
  a.dispatchEvent(event);
  showBorder.value = true
}

const changeColor = (colorResult: any) => {
  console.log(colorResult);

  const { r, g, b, a } = colorResult.rgba
  color.value = `rgba(${r}, ${g}, ${b}, ${a})`
}

</script>

<style scoped>
#dom2svg {
  display: flex;
  padding: 20px;
  height: 100%;
}

.preview {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-ctrol {
  height: 36vh;
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.control {
  width: 300px;
  border-left: 1px solid #eee;
  padding: 10px;
}

.dom-con {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px auto;
  transition: all 0.3s ease;
  background: pink;
  background-color: aquamarine;
}

.mr-10 {
  margin-right: 10px;
}

.ml-10 {
  margin-left: 10px;
}

.pa-10 {
  padding: 10px;
}

.full {
  flex: 1
}

.flex {
  display: flex;
  align-items: center;
}

.relative{
  position: relative;
}
</style>

<style>
.arco-tabs-type-card>.arco-tabs-content,
.arco-tabs-type-card-gutter>.arco-tabs-content {
  border-right: 0px;
}

.hu-color-picker.light > div:nth-child(3){
  position: absolute !important;
  top:0;
  left: 20px!important;
  z-index:1000000
}

.hu-color-picker.light > div:nth-child(4){
  position: absolute !important;
  top:0;
  left: 260px!important;
  z-index:1000000
}
</style>