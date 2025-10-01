<template>
  <div class="forecast-page">
    <!-- 상단 헤더 -->
    <div class="header">
      <span class="back-btn" @click="goBack">← Back</span>
    </div>

    <!-- 상단 제목 -->
    <h1 class="title">바나나 구매를<br />도와드릴게요</h1>

    <!-- 1) 주간 바나나 가격 변동 추이 -->
    <div class="card">
      <div class="chart-title">주간 바나나 가격 변동 추이</div>
      <div ref="weeklyRef" class="chart-box"></div>
    </div>

    <!-- 2) 작년 대비 현재 가격 -->
    <div class="card">
      <div class="chart-title">작년 대비 현재 가격</div>
      <div class="chart-box relative">
        <span class="label">{{ formatWon(currentPrice) }}</span>
        <div ref="yoyRef" class="abs-chart"></div>
      </div>
    </div>

    <!-- 3) 최저가 구매처 제안 -->
    <div class="card">
      <div class="chart-title">최저가 구매처 제안</div>
      <div class="best-deal-box">
        <div class="deal-info">
          <p class="deal-title">{{ bestDeal.market }} · {{ bestDeal.item }} ({{ bestDeal.unit }})</p>
          <p class="deal-price">{{ formatWon(bestDeal.price) }} · 할인 {{ bestDeal.discountPct }}%</p>
        </div>
        <button class="deal-btn" @click="openLLM">가격할인</button>
      </div>
    </div>

    <!-- LLM 모달 -->
    <div v-if="showModal" class="overlay" @click.self="showModal=false">
      <div class="modal">
        <header class="modal-head">
          <h4>{{ bestDeal.market }} - {{ bestDeal.item }}</h4>
          <button class="x" @click="showModal=false">✕</button>
        </header>
        <pre class="reason">{{ llmReason }}</pre>
        <footer class="modal-foot">
          <button class="cta" @click="showModal=false">확인</button>
        </footer>
      </div>
    </div>

    <!-- 하단 네비 -->
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { useRouter } from 'vue-router'
import BottomNav from './BottomNav.vue'

const router = useRouter()
const goBack = () => router.go(-1)

const weeklyRef = ref<HTMLDivElement|null>(null)
const yoyRef    = ref<HTMLDivElement|null>(null)

const weekly = ref<{date:string,value:number}[]>([])
const currentPrice = ref(0)
const lastYearPrice = ref(0)

const bestDeal = ref({ market:'이마트', item:'바나나', unit:'1kg', price:3980, discountPct:20 })
const showModal = ref(false)
const llmReason = ref('')
const formatWon = (v:number)=> `${v.toLocaleString()}원`

let lineChart:echarts.ECharts|null = null
let barChart:echarts.ECharts|null = null

function drawWeekly(){
  if(!weeklyRef.value) return
  lineChart = lineChart || echarts.init(weeklyRef.value)
  const values = weekly.value.map(d=>d.value)
  lineChart.setOption({
    tooltip:{ trigger:'axis' },
    grid:{ left: 40, right: 20, top: 20, bottom: 40 },
    xAxis:{ type:'category', data: weekly.value.map(d=>d.date) },
    yAxis:{
      type:'value',
      min: Math.min(...values) - 50,  // 데이터 기준으로 축 좁히기
      max: Math.max(...values) + 50
    },
    series:[{
      type:'line',
      smooth:true,
      areaStyle:{},
      data: values
    }]
  })
}
function drawYoY(){
  if(!yoyRef.value) return
  barChart = barChart || echarts.init(yoyRef.value)
  barChart.setOption({
    tooltip:{},
    grid:{ left: 40, right: 20, top: 20, bottom: 40 },
    xAxis:{ type:'category', data:['작년','현재'] },
    yAxis:{ type:'value', min: Math.min(lastYearPrice.value,currentPrice.value)-50 },
    series:[{ type:'bar', data:[lastYearPrice.value, currentPrice.value], barWidth:'40%' }]
  })
}
function resize(){ lineChart?.resize(); barChart?.resize() }

function openLLM(){
  llmReason.value =
`[추천 이유]
- 가격: ${formatWon(bestDeal.value.price)} (할인 ${bestDeal.value.discountPct}%)
- 영양: 바나나 1개당 칼륨 422mg, 비타민B6 0.4mg
- 거리: 인근 매장 1.2km`
  showModal.value = true
}

onMounted(()=>{
  // 최근 14일 더미 데이터
  weekly.value = Array.from({length:14},(_,i)=>({
    date:new Date(Date.now()-(13-i)*86400000).toISOString().slice(5,10),
    value:3300+Math.round(Math.random()*200)
  }))
  currentPrice.value = weekly.value.at(-1)?.value || 3500
  lastYearPrice.value = currentPrice.value + (Math.random()*400-200)

  drawWeekly(); drawYoY()
  window.addEventListener('resize', resize)
})
onUnmounted(()=> window.removeEventListener('resize', resize))
</script>

<style scoped>
.forecast-page{ background:#0f1e25; color:#fff; padding:1.5rem; padding-bottom:80px; min-height:100vh; }
.header{ display:flex; margin-bottom:1rem; font-size:14px }
.back-btn{ color:#ffc107; cursor:pointer }
.title{ font-size:24px; font-weight:bold; margin-bottom:1.5rem; }
.card{ background:#1e2e36; border-radius:20px; padding:1rem; margin-bottom:1.2rem; }
.chart-title{ font-size:14px; color:#ccc; margin-bottom:0.6rem }
.chart-box{ background:#263843; height:300px; border-radius:12px }   /* ✅ 높이 늘림 */
.abs-chart{ position:absolute; inset:0; }
.label{ position:absolute; top:12px; left:12px; background:#3dd598; color:#0f1e25; padding:4px 8px; border-radius:10px; font-size:12px; font-weight:600; z-index:1 }

/* best deal */
.best-deal-box{ display:flex; justify-content:space-between; align-items:center; background:#263843; padding:12px; border-radius:12px }
.deal-title{ font-weight:bold; margin-bottom:4px }
.deal-price{ color:#9ca3af; font-size:13px }
.deal-btn{ background:#ffc107; color:#0f1e25; font-weight:600; padding:6px 12px; border-radius:8px; cursor:pointer }

/* modal */
.overlay{ position:fixed; inset:0; background:rgba(0,0,0,.45); display:flex; align-items:center; justify-content:center; z-index:50 }
.modal{ background:#0b1220; color:#e5e7eb; border-radius:16px; padding:16px; width:90%; max-width:500px }
.modal-head{ display:flex; justify-content:space-between; margin-bottom:8px }
.reason{ background:#0f172a; padding:12px; border-radius:8px; white-space:pre-wrap; margin-bottom:8px }
.cta{ background:#2563eb; color:#fff; padding:6px 12px; border-radius:8px }
</style>

