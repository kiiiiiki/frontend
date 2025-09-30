<template>
  <div class="card">
    <header class="flex justify-between mb-2">
      <h3 class="font-bold">가격 추이 & 작년 대비</h3>
      <small class="text-gray-400">주간 라인 + 현재/작년 막대</small>
    </header>
    <div class="grid md:grid-cols-2 gap-4">
      <div ref="lineRef" class="h-60"></div>
      <div ref="barRef"  class="h-60"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, watch, onMounted } from 'vue'
import { usePriceStore } from '../../stores/priceStore'

const store = usePriceStore()
const lineRef = ref<HTMLDivElement|null>(null)
const barRef  = ref<HTMLDivElement|null>(null)
let line: echarts.ECharts|null = null
let bar: echarts.ECharts|null = null

function draw(){
  if(lineRef.value && !line) line = echarts.init(lineRef.value)
  if(barRef.value && !bar) bar = echarts.init(barRef.value)

  line?.setOption({
    xAxis:{ type:'category', data: store.weekly.map(d=>d.date) },
    yAxis:{ type:'value' },
    series:[{ type:'line', data: store.weekly.map(d=>d.value), smooth:true, areaStyle:{} }]
  })

  bar?.setOption({
    xAxis:{ type:'category', data: store.yoy.map(d=>d.name) },
    yAxis:{ type:'value' },
    series:[{ type:'bar', data: store.yoy.map(d=>d.value) }]
  })
  line?.resize(); bar?.resize()
}

onMounted(()=>{ draw(); window.addEventListener('resize',()=>{line?.resize(); bar?.resize()}) })
watch(()=>[store.weekly, store.yoy], draw)
</script>
