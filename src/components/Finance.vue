<template>
  <div class="finance-page">
    <!-- 📌 상단 제목 -->
    <div class="header">
      <span class="back-btn" @click="goBack">← Back</span>
      <h1>My 금융</h1>
      <i class="fas fa-star star-icon"></i>
    </div>

    <!-- 📊 코스피 실시간 차트 -->
    <KospiChart />

    <!-- 📈 자산 상승 추이 -->
    <div class="card">
      <div class="chart-title">자산 상승 추이</div>
      <div class="line-chart">
        <AssetTrendChart :financeItems="financeItems" />
      </div>
    </div>

    <!-- 📦 자산 카드 -->
    <div class="card-row">
      <div class="asset-card safe">
        <i class="fas fa-piggy-bank icon"></i>
        <div>안전 자산</div>
        <div class="amount">{{ formatCurrency(safeAssetTotal) }}</div>
        <div class="percent">{{ safeAssetPercent }}%</div>
      </div>
      <div class="asset-card risky">
        <i class="fas fa-chart-line icon"></i>
        <div>위험 자산</div>
        <div class="amount">{{ formatCurrency(riskyAssetTotal) }}</div>
        <div class="percent">{{ riskyAssetPercent }}%</div>
      </div>
    </div>

    <!-- 총 자산 -->
    <div class="total-assets">
      <span>총 자산</span>
      <span class="total-amount">{{ formatCurrency(totalAssets) }}</span>
    </div>

    <!-- Finance Items Section -->
    <div class="section">
      <div class="section-header">
        <h3>보유 자산</h3>
        <button class="add-btn" @click="showAddModal = true">
          <i class="fas fa-plus"></i> 추가
        </button>
      </div>

      <!-- Category Filter -->
      <div class="category-filter">
        <button
          :class="['filter-btn', { active: selectedCategory === null }]"
          @click="selectedCategory = null; loadFinanceItems()"
        >
          전체
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          :class="['filter-btn', { active: selectedCategory === cat }]"
          @click="selectedCategory = cat; loadFinanceItems()"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Finance Items List -->
      <div class="finance-list">
        <div v-for="item in financeItems" :key="item.id" class="finance-item">
          <div class="finance-item-header">
            <div class="item-left">
              <span :class="['category-badge', getRiskClass(item.category)]">{{ item.category }}</span>
              <span class="item-name">{{ item.name }}</span>
            </div>
            <button class="delete-btn" @click="deleteItem(item.id)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <div class="finance-item-body">
            <span class="item-amount">{{ formatCurrency(item.amount) }}</span>
          </div>
          <p v-if="item.content" class="finance-content">{{ item.content }}</p>
          <span class="finance-date">{{ formatDate(item.createdAt) }}</span>
        </div>
        <div v-if="financeItems.length === 0" class="empty-state">
          등록된 자산이 없습니다.<br>
          <small>상단의 추가 버튼을 눌러 보유 자산을 등록하세요</small>
        </div>
      </div>
    </div>

    <!-- AI 금융 보고서 섹션 -->
    <div class="section">
      <div class="section-header">
        <h3>AI 금융 분석 보고서</h3>
        <button
          v-if="!isNewUser"
          class="refresh-btn"
          @click="loadFinanceReport"
          :disabled="loadingReport"
        >
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': loadingReport }"></i>
        </button>
      </div>

      <!-- 신규 사용자 가이드 -->
      <div v-if="isNewUser" class="new-user-guide">
        <div class="guide-icon">
          <i class="fas fa-chart-line"></i>
        </div>
        <h4>자산 정보를 등록해주세요</h4>
        <p>맞춤형 AI 금융 분석을 받으려면 먼저 보유 자산을 입력해주세요.</p>
        <div class="guide-actions">
          <button class="guide-btn primary" @click="showAddModal = true">
            <i class="fas fa-plus"></i> 자산 추가하기
          </button>
        </div>
      </div>

      <!-- AI 보고서 영역 -->
      <div v-else>
        <div v-if="loadingReport" class="loading-message">
          <i class="fas fa-spinner fa-spin"></i> AI가 금융 분석 보고서를 생성하는 중...
        </div>
        <div v-else-if="reportError" class="error-message">
          {{ reportError }}
        </div>
        <div v-else-if="!financeReportText" class="empty-message">
          자산 정보를 바탕으로 AI 분석 보고서를 생성합니다. 새로고침 버튼을 클릭하세요.
        </div>
        <div v-else class="recommendation-text" v-html="formatMarkdown(financeReportText)"></div>
      </div>
    </div>

    <!-- Add Finance Item Modal -->
    <div v-if="showAddModal" class="modal-overlay" @click="closeAddModal">
      <div class="modal-content" @click.stop>
        <h3>자산 추가</h3>
        <div class="form-group">
          <label>자산 타입</label>
          <select v-model="newItem.category">
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
              <template v-if="isSafeAsset(cat)"> (안전자산)</template>
              <template v-else> (위험자산)</template>
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>자산 이름</label>
          <input
            v-model="newItem.name"
            type="text"
            placeholder="예: 삼성전자, 비트코인, KB정기예금 등"
          />
        </div>
        <div class="form-group">
          <label>금액 (원)</label>
          <input
            v-model.number="newItem.amount"
            type="number"
            placeholder="0"
            min="0"
          />
        </div>
        <div class="form-group">
          <label>메모 (선택)</label>
          <textarea v-model="newItem.content" rows="3" placeholder="추가 설명을 입력하세요 (선택사항)"></textarea>
        </div>
        <div class="modal-actions">
          <button class="cancel-btn" @click="closeAddModal">취소</button>
          <button class="save-btn" @click="addFinanceItem">추가</button>
        </div>
      </div>
    </div>

    <!-- 하단 네비게이션 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from './BottomNav.vue'
import KospiChart from './KospiChart.vue'
import AssetTrendChart from './AssetTrendChart.vue'
import financeService, { ASSET_RISK_TYPES } from '../services/financeService'

const router = useRouter()

const financeItems = ref([])
const selectedCategory = ref(null)
const showAddModal = ref(false)

const categories = ['주식', 'ETF', '코인', '펀드', '예금', '적금', '채권', '국채', '선물', '옵션']

const newItem = ref({
  category: '주식',
  name: '',
  amount: 0,
  content: ''
})

// AI 보고서 관련
const financeReportText = ref('')
const loadingReport = ref(false)
const reportError = ref('')

const API_BASE_URL = '/api/v1'

// 신규 사용자 여부 (자산이 없는 경우)
const isNewUser = computed(() => {
  return financeItems.value.length === 0
})

onMounted(async () => {
  await loadFinanceItems()

  // 신규 사용자가 아닐 때만 AI 보고서 자동 로드
  if (!isNewUser.value) {
    await loadFinanceReport()
  }
})

const loadFinanceItems = async () => {
  try {
    const data = await financeService.listItems(selectedCategory.value)
    financeItems.value = data
  } catch (error) {
    console.error('Failed to load finance items:', error)
  }
}

// 안전자산 여부 확인
const isSafeAsset = (category) => {
  return ASSET_RISK_TYPES.SAFE.includes(category)
}

// 위험자산 여부 확인
const isRiskyAsset = (category) => {
  return ASSET_RISK_TYPES.RISKY.includes(category)
}

// 위험도에 따른 CSS 클래스
const getRiskClass = (category) => {
  return isSafeAsset(category) ? 'safe' : 'risky'
}

// 총 자산
const totalAssets = computed(() => {
  return financeItems.value.reduce((sum, item) => sum + (item.amount || 0), 0)
})

// 안전자산 총액
const safeAssetTotal = computed(() => {
  return financeItems.value
    .filter(item => isSafeAsset(item.category))
    .reduce((sum, item) => sum + (item.amount || 0), 0)
})

// 위험자산 총액
const riskyAssetTotal = computed(() => {
  return financeItems.value
    .filter(item => isRiskyAsset(item.category))
    .reduce((sum, item) => sum + (item.amount || 0), 0)
})

// 안전자산 비율
const safeAssetPercent = computed(() => {
  if (totalAssets.value === 0) return 0
  return Math.round((safeAssetTotal.value / totalAssets.value) * 100)
})

// 위험자산 비율
const riskyAssetPercent = computed(() => {
  if (totalAssets.value === 0) return 0
  return Math.round((riskyAssetTotal.value / totalAssets.value) * 100)
})

const addFinanceItem = async () => {
  if (!newItem.value.name.trim()) {
    alert('자산 이름을 입력해주세요')
    return
  }

  if (!newItem.value.amount || newItem.value.amount <= 0) {
    alert('금액을 입력해주세요')
    return
  }

  try {
    await financeService.createItem({
      category: newItem.value.category,
      name: newItem.value.name,
      amount: newItem.value.amount,
      content: newItem.value.content
    })
    // 자산 추가 후 전체 보기로 변경
    selectedCategory.value = null
    await loadFinanceItems()
    closeAddModal()
  } catch (error) {
    console.error('Failed to add finance item:', error)
    alert('자산 추가에 실패했습니다.')
  }
}

const deleteItem = async (id) => {
  if (!confirm('이 자산을 삭제하시겠습니까?')) return

  try {
    await financeService.deleteItem(id)
    await loadFinanceItems()
  } catch (error) {
    console.error('Failed to delete finance item:', error)
    alert('자산 삭제에 실패했습니다.')
  }
}

// AI 금융 분석 보고서 로드
const loadFinanceReport = async () => {
  loadingReport.value = true
  reportError.value = ''

  try {
    // 자산 정보 구성
    const assetsList = financeItems.value.map(item =>
      `${item.category}: ${item.name} (${formatCurrency(item.amount)})`
    ).join(', ')

    const prompt = `당신은 금융 전문가입니다. 다음 자산 정보를 가진 사용자에게 포트폴리오 분석과 투자 조언을 제공해주세요.

총 자산: ${formatCurrency(totalAssets.value)}
안전 자산: ${formatCurrency(safeAssetTotal.value)} (${safeAssetPercent.value}%)
위험 자산: ${formatCurrency(riskyAssetTotal.value)} (${riskyAssetPercent.value}%)

보유 자산 목록:
${assetsList}

위 자산 정보를 분석하여:
1. 포트폴리오 종합 평가 (강점과 약점)
2. 자산 배분 비율에 대한 의견
3. 추천 투자 전략 또는 개선 방향
4. 리스크 관리 조언

을 간결하고 실용적으로 제시해주세요.`

    console.log('💰 Requesting finance report from LLM')

    // JWT 토큰 가져오기
    const token = localStorage.getItem('jwt_token')
    const headers = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    } else {
      throw new Error('로그인이 필요합니다')
    }

    const response = await fetch(`${API_BASE_URL}/chat-with-tools`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message: prompt,
        stream: true
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    if (!reader) {
      throw new Error('스트림 리더를 생성할 수 없습니다')
    }

    financeReportText.value = ''
    let done = false

    while (!done) {
      const { value, done: readerDone } = await reader.read()
      done = readerDone

      if (value) {
        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.substring(6)
            if (dataStr.trim()) {
              try {
                const data = JSON.parse(dataStr)
                if (data.content) {
                  financeReportText.value += data.content
                }
              } catch (e) {
                // JSON 파싱 오류 무시
              }
            }
          }
        }
      }
    }

    console.log('✅ Finance report loaded successfully')

  } catch (error) {
    console.error('Failed to load finance report:', error)
    reportError.value = '보고서 생성에 실패했습니다. 다시 시도해주세요.'
  } finally {
    loadingReport.value = false
  }
}

// Markdown 포맷팅
const formatMarkdown = (text) => {
  if (!text) return ''

  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
}

const closeAddModal = () => {
  showAddModal.value = false
  newItem.value = { category: '주식', name: '', amount: 0, content: '' }
}

const formatCurrency = (amount) => {
  if (!amount) return '0원'
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(amount)
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.finance-page {
  background-color: #0f1e25;
  color: white;
  font-family: 'Noto Sans KR', sans-serif;
  padding: 1rem;
  padding-bottom: 100px;
  min-height: 100vh;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 0;
  color: #ffc107;
  cursor: pointer;
  font-size: 14px;
}
.star-icon {
  color: gold;
}


.card {
  background-color: #1e2f38;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.bar-chart {
  height: 120px;
  background-color: #273a45;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  font-size: 13px;
}

.chart-title {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 1rem;
  font-weight: 600;
}

.line-chart {
  padding: 0.5rem 0;
}

/* 자산 카드들 */
.card-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}
.asset-card {
  flex: 1;
  background-color: #263944;
  border-radius: 14px;
  padding: 1rem;
  text-align: center;
  font-size: 13px;
  color: #fff;
}
.asset-card .icon {
  font-size: 20px;
  margin-bottom: 0.5rem;
}
.asset-card .amount {
  font-size: 16px;
  font-weight: 700;
  margin: 0.3rem 0;
}
.asset-card .percent {
  font-weight: bold;
  margin-top: 0.3rem;
  font-size: 14px;
}

.asset-card.safe {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}
.asset-card.risky {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

/* 총 자산 */
.total-assets {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 14px;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  color: white;
  font-weight: 600;
}

.total-amount {
  font-size: 20px;
  font-weight: 700;
}

/* Finance Items Section */
.section {
  margin-top: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h3 {
  font-size: 16px;
  font-weight: 700;
}

.add-btn {
  background: #60a5fa;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  color: white;
  font-weight: 600;
  transition: background 0.2s ease;
}

.add-btn:hover {
  background: #3b82f6;
}

.category-filter {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.filter-btn {
  background: #273a45;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  color: #ccc;
  transition: all 0.2s ease;
}

.filter-btn.active {
  background: #3dd598;
  color: #0f1e25;
  font-weight: 600;
}

.finance-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.finance-item {
  background: #1e2f38;
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.2s ease;
}

.finance-item:hover {
  background: #253d47;
  transform: translateY(-2px);
}

.finance-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.7rem;
}

.item-left {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex: 1;
}

.category-badge {
  background: #3b82f6;
  color: white;
  padding: 0.3rem 0.7rem;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.category-badge.safe {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.category-badge.risky {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.finance-item-body {
  margin: 0.5rem 0;
}

.item-amount {
  font-size: 18px;
  font-weight: 700;
  color: #3dd598;
}

.delete-btn {
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  font-size: 14px;
  transition: color 0.2s ease;
}

.delete-btn:hover {
  color: #dc2626;
}

.finance-content {
  font-size: 14px;
  color: #e5e7eb;
  margin: 0.5rem 0;
  line-height: 1.4;
}

.finance-date {
  font-size: 11px;
  color: #9ca3af;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-size: 14px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #1a2a35;
  border-radius: 16px;
  padding: 1.5rem;
  width: 90%;
  max-width: 400px;
}

.modal-content h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #d1d5db;
}

.form-group select,
.form-group input,
.form-group textarea {
  width: 100%;
  background: #0f1e25;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0.6rem;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #60a5fa;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-group input[type="number"] {
  text-align: right;
}

.modal-actions {
  display: flex;
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.cancel-btn,
.save-btn {
  flex: 1;
  padding: 0.7rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
}

.cancel-btn {
  background: #6b7280;
  color: white;
}

.save-btn {
  background: #4ade80;
  color: white;
}

.cancel-btn:hover {
  background: #4b5563;
}

.save-btn:hover {
  background: #22c55e;
}

/* AI 보고서 관련 스타일 */
.refresh-btn {
  background: #60a5fa;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  color: white;
  font-size: 14px;
  transition: all 0.2s ease;
}

.refresh-btn:hover:not(:disabled) {
  background: #3b82f6;
  transform: rotate(180deg);
}

.refresh-btn:disabled {
  background: #6b7280;
  cursor: not-allowed;
  opacity: 0.7;
}

.loading-message,
.error-message,
.empty-message {
  background: #1f2c34;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  font-size: 14px;
}

.loading-message {
  color: #60a5fa;
}

.error-message {
  color: #ef4444;
}

.empty-message {
  color: #9ca3af;
}

.recommendation-text {
  background: linear-gradient(135deg, #1f2c34 0%, #2a3f4d 100%);
  border-radius: 12px;
  padding: 1.2rem;
  font-size: 14px;
  line-height: 1.8;
  color: #e5e7eb;
  white-space: pre-wrap;
  border-left: 4px solid #60a5fa;
}

.recommendation-text strong {
  font-weight: 700;
  color: #3dd598;
}

.recommendation-text em {
  font-style: italic;
  color: #60a5fa;
}

.new-user-guide {
  background: linear-gradient(135deg, #1f2c34 0%, #2a3f4d 100%);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  border: 2px solid rgba(61, 213, 152, 0.3);
}

.guide-icon {
  margin-bottom: 1rem;
}

.guide-icon i {
  font-size: 48px;
  color: #3dd598;
}

.new-user-guide h4 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #fff;
}

.new-user-guide > p {
  font-size: 14px;
  color: #9ca3af;
  margin-bottom: 1.5rem;
}

.guide-actions {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.guide-btn {
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.guide-btn.primary {
  background: linear-gradient(135deg, #3dd598, #2db87c);
  color: #0f1e25;
  box-shadow: 0 4px 12px rgba(61, 213, 152, 0.3);
}

.guide-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(61, 213, 152, 0.4);
}

.guide-btn i {
  font-size: 16px;
}

</style>
