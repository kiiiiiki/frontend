<template>
  <div class="forecast-page">
    <!-- 상단 헤더 -->
    <div class="header">
      <span class="back-btn" @click="goBack">← Back</span>
      <h2 class="page-title">식료품 가격 비교</h2>
    </div>

    <!-- 상단 제목: ✅ 선택한 과일명 사용 -->
    <h1 class="title">{{ fruit }} 구매를<br />도와드릴게요</h1>

    <!-- 1) 주간 {{fruit}} 가격 변동 추이 -->
    <div class="card">
      <div class="chart-title">주간 {{ fruit }} 가격 변동 추이</div>
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
          <!-- ✅ item을 fruit로 -->
          <p class="deal-title">{{ bestDeal.market }} · {{ bestDeal.item }} ({{ bestDeal.unit }})</p>
          <p class="deal-price">{{ formatWon(bestDeal.price) }} · 할인 {{ bestDeal.discountPct }}%</p>
        </div>
      </div>
    </div>

    <!-- 상품 상세 모달 -->
    <div v-if="selectedProduct" class="overlay" @click.self="selectedProduct=null">
      <div class="modal">
        <header class="modal-head">
          <div>
            <h3>{{ selectedProduct.product }}</h3>
            <span class="modal-unit">{{ selectedProduct.unit }}</span>
          </div>
          <button class="x" @click="selectedProduct=null">✕</button>
        </header>

        <div class="modal-body">
          <div class="price-info">
            <div class="price-stat">
              <span class="label">최저가</span>
              <span class="value best">{{ formatWon(getMinPrice(selectedProduct)) }}</span>
            </div>
            <div class="price-stat">
              <span class="label">최고가</span>
              <span class="value">{{ formatWon(getMaxPrice(selectedProduct)) }}</span>
            </div>
            <div class="price-stat">
              <span class="label">평균가</span>
              <span class="value">{{ formatWon(getAvgPrice(selectedProduct)) }}</span>
            </div>
          </div>

          <div class="stores-list">
            <h4>매장별 가격 비교</h4>
            <div
              v-for="(store, idx) in sortedStores(selectedProduct)"
              :key="idx"
              class="store-item"
              :class="{ best: idx === 0 }"
            >
              <div class="store-rank">{{ idx + 1 }}</div>
              <div class="store-info">
                <div class="store-name">
                  {{ store.name }}
                  <span v-if="idx === 0" class="best-badge">최저가</span>
                </div>
                <div class="store-location">{{ store.location }}</div>
                <div v-if="store.discount" class="store-discount">{{ store.discount }}</div>
              </div>
              <div class="store-price">{{ formatWon(store.price) }}</div>
            </div>
          </div>
        </div>

        <footer class="modal-foot">
          <button class="cta" @click="selectedProduct=null">확인</button>
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
import { useRouter, useRoute } from 'vue-router'   // ✅ useRoute 추가
import BottomNav from './BottomNav.vue'

const router = useRouter()
const route  = useRoute()                           // ✅ 현재 라우트 접근
const goBack = () => router.go(-1)

const weeklyRef = ref<HTMLDivElement|null>(null)
const yoyRef    = ref<HTMLDivElement|null>(null)

const fruit = ref<string>((route.query.fruit as string) || '바나나')  // ✅ 과일명 쿼리로 수신

const weekly = ref<{date:string,value:number}[]>([])
const currentPrice = ref(0)
const lastYearPrice = ref(0)

// ✅ 최저가 제안: item을 fruit로 세팅
const bestDeal = ref({ market:'이마트', item: fruit.value, unit:'1kg', price:3980, discountPct:20 })

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
      min: Math.min(...values) - 50,
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

interface GroceryItem {
  category: string
  product: string
  unit: string
  stores: Store[]
}

function openLLM(){
  llmReason.value =
`[추천 이유]
- 가격: ${formatWon(bestDeal.value.price)} (할인 ${bestDeal.value.discountPct}%)
- 영양: ${fruit.value} 1회 제공 기준, 권장 섭취량 충족에 유리
- 거리: 인근 매장 1.2km`
  showModal.value = true
}

const categories = computed(() => {
  const categoryMap = new Map<string, number>()
  groceryData.value.forEach(item => {
    categoryMap.set(item.category, (categoryMap.get(item.category) || 0) + 1)
  })

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    count,
    emoji: categoryEmojiMap[name] || '🛒'
  }))
})

const filteredProducts = computed(() => {
  if (!selectedCategory.value) return []
  return groceryData.value.filter(item => item.category === selectedCategory.value)
})

const formatWon = (v: number) => `${v.toLocaleString()}원`

const getMinPrice = (product: GroceryItem) => {
  return Math.min(...product.stores.map(s => s.price))
}

const getMaxPrice = (product: GroceryItem) => {
  return Math.max(...product.stores.map(s => s.price))
}

const getAvgPrice = (product: GroceryItem) => {
  const sum = product.stores.reduce((acc, s) => acc + s.price, 0)
  return Math.round(sum / product.stores.length)
}

const sortedStores = (product: GroceryItem) => {
  return [...product.stores].sort((a, b) => a.price - b.price)
}

const selectCategory = (category: string) => {
  selectedCategory.value = category
}

const selectProduct = (product: GroceryItem) => {
  selectedProduct.value = product
}

// 더미 데이터
const dummyGroceryData: GroceryItem[] = [
  {
    category: '과일',
    product: '사과',
    unit: '1kg',
    stores: [
      { name: '이마트 성수점', price: 8900, location: '서울 성동구', discount: null },
      { name: '롯데마트 잠실점', price: 9500, location: '서울 송파구', discount: '10% 할인' },
      { name: '홈플러스 강동점', price: 8500, location: '서울 강동구', discount: null },
      { name: '동네슈퍼 행복마트', price: 10000, location: '서울 성동구', discount: null }
    ]
  },
  {
    category: '과일',
    product: '바나나',
    unit: '1송이',
    stores: [
      { name: '이마트 성수점', price: 3500, location: '서울 성동구', discount: null },
      { name: '롯데마트 잠실점', price: 3800, location: '서울 송파구', discount: null },
      { name: '홈플러스 강동점', price: 3200, location: '서울 강동구', discount: '특가' }
    ]
  },
  {
    category: '채소',
    product: '양파',
    unit: '1kg',
    stores: [
      { name: '이마트 성수점', price: 2500, location: '서울 성동구', discount: null },
      { name: '롯데마트 잠실점', price: 2800, location: '서울 송파구', discount: null },
      { name: '홈플러스 강동점', price: 2300, location: '서울 강동구', discount: '세일' },
      { name: '농협 하나로마트', price: 2000, location: '서울 성동구', discount: '직거래' }
    ]
  },
  {
    category: '채소',
    product: '당근',
    unit: '500g',
    stores: [
      { name: '이마트 성수점', price: 1500, location: '서울 성동구', discount: null },
      { name: '롯데마트 잠실점', price: 1800, location: '서울 송파구', discount: null },
      { name: '홈플러스 강동점', price: 1400, location: '서울 강동구', discount: null }
    ]
  },
  {
    category: '육류',
    product: '돼지고기 삼겹살',
    unit: '100g',
    stores: [
      { name: '이마트 성수점', price: 2500, location: '서울 성동구', discount: null },
      { name: '롯데마트 잠실점', price: 2800, location: '서울 송파구', discount: null },
      { name: '홈플러스 강동점', price: 2400, location: '서울 강동구', discount: '특가' },
      { name: '정육점 한우마을', price: 2900, location: '서울 성동구', discount: null }
    ]
  },
  {
    category: '육류',
    product: '닭가슴살',
    unit: '1kg',
    stores: [
      { name: '이마트 성수점', price: 7500, location: '서울 성동구', discount: null },
      { name: '롯데마트 잠실점', price: 8000, location: '서울 송파구', discount: null },
      { name: '홈플러스 강동점', price: 7200, location: '서울 강동구', discount: '세일' }
    ]
  },
  {
    category: '유제품',
    product: '우유',
    unit: '1L',
    stores: [
      { name: '이마트 성수점', price: 2800, location: '서울 성동구', discount: null },
      { name: '롯데마트 잠실점', price: 3000, location: '서울 송파구', discount: null },
      { name: '홈플러스 강동점', price: 2700, location: '서울 강동구', discount: null },
      { name: 'GS25 편의점', price: 3200, location: '서울 성동구', discount: null }
    ]
  },
  {
    category: '유제품',
    product: '요구르트',
    unit: '4개입',
    stores: [
      { name: '이마트 성수점', price: 3500, location: '서울 성동구', discount: '1+1' },
      { name: '롯데마트 잠실점', price: 3800, location: '서울 송파구', discount: null },
      { name: '홈플러스 강동점', price: 3400, location: '서울 강동구', discount: null }
    ]
  },
  {
    category: '계란',
    product: '계란',
    unit: '30개',
    stores: [
      { name: '이마트 성수점', price: 6500, location: '서울 성동구', discount: null },
      { name: '롯데마트 잠실점', price: 7000, location: '서울 송파구', discount: null },
      { name: '홈플러스 강동점', price: 6200, location: '서울 강동구', discount: '특가' },
      { name: '농협 하나로마트', price: 5800, location: '서울 성동구', discount: '직거래' }
    ]
  },
  {
    category: '곡물',
    product: '쌀',
    unit: '10kg',
    stores: [
      { name: '이마트 성수점', price: 35000, location: '서울 성동구', discount: null },
      { name: '롯데마트 잠실점', price: 36000, location: '서울 송파구', discount: null },
      { name: '홈플러스 강동점', price: 34500, location: '서울 강동구', discount: null },
      { name: '농협 하나로마트', price: 33000, location: '서울 성동구', discount: '햅쌀특가' }
    ]
  }
]

onMounted(async () => {
  try {
    loading.value = true
    error.value = null

    console.log('Loading grocery data with dummy data...')

    // 더미 데이터 사용
    groceryData.value = dummyGroceryData
    console.log('Loaded grocery data:', groceryData.value.length, 'items')

    // 첫 번째 카테고리를 기본 선택
    if (categories.value.length > 0) {
      selectedCategory.value = categories.value[0].name
      console.log('Selected category:', selectedCategory.value)
    }
  } catch (err) {
    error.value = `Error loading data: ${err instanceof Error ? err.message : 'Unknown error'}`
    console.error('Error loading grocery data:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.forecast-page{ background:#0f1e25; color:#fff; padding:1.5rem; padding-bottom:80px; min-height:100vh; }
.header{ display:flex; margin-bottom:1rem; font-size:14px }
.back-btn{ color:#ffc107; cursor:pointer }
.title{ font-size:24px; font-weight:bold; margin-bottom:1.5rem; }
.card{ background:#1e2e36; border-radius:20px; padding:1rem; margin-bottom:1.2rem; }
.chart-title{ font-size:14px; color:#ccc; margin-bottom:0.6rem }
.chart-box{ background:#263843; height:300px; border-radius:12px }
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

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.product-header h4 {
  font-size: 15px;
  font-weight: 600;
}

.product-unit {
  font-size: 12px;
  color: #9ca3af;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
}

.product-price-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.min-price {
  font-size: 16px;
  font-weight: 700;
  color: #4ade80;
}

.price-separator {
  color: #6b7280;
}

.max-price {
  font-size: 14px;
  color: #9ca3af;
}

.product-stores {
  font-size: 12px;
  color: #60a5fa;
}

/* 모달 */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}

.modal {
  background: #1a2a35;
  color: #e5e7eb;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-head h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.modal-unit {
  font-size: 13px;
  color: #9ca3af;
}

.x {
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s;
}

.x:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.modal-body {
  padding: 1.5rem;
}

.price-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.price-stat {
  background: #0f1e25;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
}

.price-stat .label {
  display: block;
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 0.5rem;
}

.price-stat .value {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #e5e7eb;
}

.price-stat .value.best {
  color: #4ade80;
}

.stores-list h4 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #e5e7eb;
}

.store-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #0f1e25;
  border-radius: 12px;
  margin-bottom: 0.8rem;
  border: 2px solid transparent;
}

.store-item.best {
  border-color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
}

.store-rank {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  font-weight: 700;
  font-size: 14px;
}

.store-item.best .store-rank {
  background: #4ade80;
  color: #0f1e25;
}

.store-info {
  flex: 1;
}

.store-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.best-badge {
  background: #4ade80;
  color: #0f1e25;
  font-size: 11px;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
}

.store-location {
  font-size: 12px;
  color: #9ca3af;
}

.store-discount {
  font-size: 12px;
  color: #ffc107;
  margin-top: 0.2rem;
}

.store-price {
  font-size: 16px;
  font-weight: 700;
  color: #4ade80;
}

.modal-foot {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.cta {
  width: 100%;
  background: #4ade80;
  color: #0f1e25;
  padding: 0.8rem;
  border-radius: 8px;
  border: none;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.cta:hover {
  background: #22c55e;
}
</style>
