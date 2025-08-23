<template>
  <div class="daily-reports">
    <!-- Header -->
    <div class="header">
      <button class="back-btn" @click="goBack">
        <i class="fas fa-chevron-left"></i> Back
      </button>
      <h1 class="title">저장된 일일 보고서</h1>
      <button class="filter-btn" @click="showFilterModal = true">
        <i class="fas fa-filter"></i>
      </button>
    </div>

    <!-- Stats Summary -->
    <div class="stats-summary">
      <div class="stat-card">
        <div class="stat-number">{{ reports.length }}</div>
        <div class="stat-label">총 보고서</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ thisMonthReports }}</div>
        <div class="stat-label">이번 달</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ avgScore.toFixed(1) }}</div>
        <div class="stat-label">평균 점수</div>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="search-section">
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input 
          type="text" 
          placeholder="보고서 검색..." 
          v-model="searchQuery"
          @input="filterReports"
        />
      </div>
    </div>

    <!-- Reports List -->
    <div class="reports-list">
      <div 
        v-for="report in filteredReports" 
        :key="report.id" 
        class="report-card"
        @click="viewReport(report)"
      >
        <div class="report-header">
          <div class="report-date">{{ formatDate(report.date) }}</div>
          <div class="report-score" :class="getScoreClass(report.overallScore)">
            {{ report.overallScore }}/10
          </div>
        </div>
        
        <div class="report-content">
          <h3 class="report-title">{{ report.title }}</h3>
          <p class="report-summary">{{ report.summary }}</p>
        </div>

        <div class="report-categories">
          <span 
            v-for="category in report.categories" 
            :key="category.name"
            class="category-tag"
            :style="{ backgroundColor: category.color }"
          >
            {{ category.name }}
          </span>
        </div>

        <div class="report-actions">
          <button class="action-btn share" @click.stop="shareReport(report)">
            <i class="fas fa-share-alt"></i>
          </button>
          <button class="action-btn download" @click.stop="downloadReport(report)">
            <i class="fas fa-download"></i>
          </button>
          <button class="action-btn delete" @click.stop="deleteReport(report)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredReports.length === 0" class="empty-state">
      <i class="fas fa-file-alt"></i>
      <h3>저장된 보고서가 없습니다</h3>
      <p>일일 건강 및 활동 보고서가 자동으로 여기에 저장됩니다.</p>
    </div>

    <!-- Filter Modal -->
    <div v-if="showFilterModal" class="modal-overlay" @click.self="showFilterModal = false">
      <div class="modal">
        <h3>보고서 필터</h3>
        
        <div class="filter-section">
          <label>기간</label>
          <select v-model="filterPeriod">
            <option value="all">전체</option>
            <option value="week">최근 1주일</option>
            <option value="month">최근 1개월</option>
            <option value="3months">최근 3개월</option>
          </select>
        </div>

        <div class="filter-section">
          <label>점수 범위</label>
          <div class="score-range">
            <input type="range" v-model="scoreRange.min" min="0" max="10" />
            <span>{{ scoreRange.min }} - {{ scoreRange.max }}</span>
            <input type="range" v-model="scoreRange.max" min="0" max="10" />
          </div>
        </div>

        <div class="filter-section">
          <label>카테고리</label>
          <div class="category-filters">
            <label v-for="cat in availableCategories" :key="cat" class="checkbox-label">
              <input type="checkbox" v-model="selectedCategories" :value="cat" />
              {{ cat }}
            </label>
          </div>
        </div>

        <div class="modal-actions">
          <button class="cancel-btn" @click="resetFilters">초기화</button>
          <button class="apply-btn" @click="applyFilters">적용</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useNavigation } from '../composables/useRouter'
import { formatDate } from '../utils/common'

const { goBack } = useNavigation()

interface Report {
  id: string
  date: Date
  title: string
  summary: string
  overallScore: number
  categories: Array<{
    name: string
    score: number
    color: string
  }>
  content: string
}

// Sample data
const reports = ref<Report[]>([
  {
    id: '1',
    date: new Date('2024-08-23'),
    title: '건강한 하루',
    summary: '운동을 충분히 하고 영양 균형을 잘 맞춘 하루였습니다.',
    overallScore: 8.5,
    categories: [
      { name: '운동', score: 9, color: '#22c55e' },
      { name: '영양', score: 8, color: '#3b82f6' },
      { name: '수면', score: 7, color: '#8b5cf6' }
    ],
    content: '상세 내용...'
  },
  {
    id: '2',
    date: new Date('2024-08-22'),
    title: '개선이 필요한 하루',
    summary: '수면 시간이 부족했고 운동량도 목표에 미달했습니다.',
    overallScore: 5.2,
    categories: [
      { name: '운동', score: 4, color: '#22c55e' },
      { name: '수면', score: 3, color: '#8b5cf6' },
      { name: '스트레스', score: 8, color: '#ef4444' }
    ],
    content: '상세 내용...'
  },
  {
    id: '3',
    date: new Date('2024-08-21'),
    title: '균형잡힌 하루',
    summary: '모든 영역에서 균형잡힌 하루를 보냈습니다.',
    overallScore: 7.8,
    categories: [
      { name: '운동', score: 8, color: '#22c55e' },
      { name: '영양', score: 7, color: '#3b82f6' },
      { name: '정신건강', score: 8, color: '#f59e0b' }
    ],
    content: '상세 내용...'
  }
])

const searchQuery = ref('')
const showFilterModal = ref(false)
const filterPeriod = ref('all')
const scoreRange = reactive({ min: 0, max: 10 })
const selectedCategories = ref<string[]>([])

const filteredReports = ref(reports.value)

const thisMonthReports = computed(() => {
  const thisMonth = new Date().getMonth()
  return reports.value.filter(report => report.date.getMonth() === thisMonth).length
})

const avgScore = computed(() => {
  if (reports.value.length === 0) return 0
  const sum = reports.value.reduce((acc, report) => acc + report.overallScore, 0)
  return sum / reports.value.length
})

const availableCategories = computed(() => {
  const categories = new Set<string>()
  reports.value.forEach(report => {
    report.categories.forEach(cat => categories.add(cat.name))
  })
  return Array.from(categories)
})

const filterReports = () => {
  filteredReports.value = reports.value.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         report.summary.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesScore = report.overallScore >= scoreRange.min && report.overallScore <= scoreRange.max
    
    const matchesCategory = selectedCategories.value.length === 0 ||
                           report.categories.some(cat => selectedCategories.value.includes(cat.name))
    
    let matchesPeriod = true
    const now = new Date()
    if (filterPeriod.value === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      matchesPeriod = report.date >= weekAgo
    } else if (filterPeriod.value === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      matchesPeriod = report.date >= monthAgo
    } else if (filterPeriod.value === '3months') {
      const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
      matchesPeriod = report.date >= threeMonthsAgo
    }
    
    return matchesSearch && matchesScore && matchesCategory && matchesPeriod
  })
}

const getScoreClass = (score: number) => {
  if (score >= 8) return 'excellent'
  if (score >= 6) return 'good'
  if (score >= 4) return 'fair'
  return 'poor'
}

const viewReport = (report: Report) => {
  console.log('Viewing report:', report.id)
  // TODO: Navigate to detailed report view
}

const shareReport = (report: Report) => {
  console.log('Sharing report:', report.id)
  // TODO: Implement share functionality
}

const downloadReport = (report: Report) => {
  console.log('Downloading report:', report.id)
  // TODO: Implement download functionality
}

const deleteReport = (report: Report) => {
  if (confirm('이 보고서를 삭제하시겠습니까?')) {
    const index = reports.value.findIndex(r => r.id === report.id)
    if (index !== -1) {
      reports.value.splice(index, 1)
      filterReports()
    }
  }
}

const applyFilters = () => {
  filterReports()
  showFilterModal.value = false
}

const resetFilters = () => {
  filterPeriod.value = 'all'
  scoreRange.min = 0
  scoreRange.max = 10
  selectedCategories.value = []
  searchQuery.value = ''
  filterReports()
  showFilterModal.value = false
}
</script>

<style scoped>
.daily-reports {
  background-color: var(--primary-bg);
  color: var(--text-primary);
  font-family: var(--font-family);
  min-height: 100vh;
  padding: var(--spacing-md);
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.back-btn, .filter-btn {
  background: none;
  border: none;
  color: var(--accent-yellow);
  font-size: var(--font-size-base);
  cursor: pointer;
  padding: var(--spacing-sm);
}

.title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin: 0;
}

/* Stats */
.stats-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.stat-card {
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  text-align: center;
}

.stat-number {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--accent-green);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* Search */
.search-section {
  margin-bottom: var(--spacing-xl);
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
}

.search-bar i {
  position: absolute;
  left: var(--spacing-md);
  color: var(--text-muted);
  z-index: 1;
}

.search-bar input {
  width: 100%;
  background-color: var(--card-bg);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 40px;
  color: var(--text-primary);
  font-size: var(--font-size-base);
}

/* Reports */
.reports-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.report-card {
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: transform var(--transition-fast);
  position: relative;
}

.report-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.report-date {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.report-score {
  font-weight: 700;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
}

.report-score.excellent {
  background-color: var(--accent-green);
  color: var(--text-dark);
}

.report-score.good {
  background-color: var(--accent-blue);
  color: white;
}

.report-score.fair {
  background-color: var(--accent-yellow);
  color: var(--text-dark);
}

.report-score.poor {
  background-color: var(--accent-red);
  color: white;
}

.report-content h3 {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: var(--font-size-lg);
}

.report-summary {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.5;
  margin-bottom: var(--spacing-md);
}

.report-categories {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
}

.category-tag {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  color: white;
  font-weight: 500;
}

.report-actions {
  display: flex;
  gap: var(--spacing-sm);
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.report-card:hover .report-actions {
  opacity: 1;
}

.action-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.action-btn:hover {
  background-color: var(--secondary-bg);
}

.action-btn.delete:hover {
  color: var(--accent-red);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-secondary);
}

.empty-state i {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
  color: var(--text-muted);
}

.empty-state h3 {
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-modal);
}

.modal {
  background-color: var(--secondary-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  max-width: 400px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal h3 {
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.filter-section {
  margin-bottom: var(--spacing-lg);
}

.filter-section label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
  color: var(--text-secondary);
}

.filter-section select {
  width: 100%;
  background-color: var(--card-bg);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  color: var(--text-primary);
  font-size: var(--font-size-base);
}

.score-range {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.score-range input[type="range"] {
  flex: 1;
}

.category-filters {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
}

.modal-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-top: var(--spacing-xl);
}

.cancel-btn, .apply-btn {
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.cancel-btn {
  background-color: var(--text-muted);
  color: var(--text-primary);
}

.apply-btn {
  background-color: var(--accent-green);
  color: var(--text-dark);
}

.apply-btn:hover {
  background-color: var(--accent-green-hover);
}
</style>