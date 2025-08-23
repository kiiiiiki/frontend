<template>
  <div class="forecast-page">
    <!-- 상단 헤더 -->
    <div class="header">
      <span class="back-btn" @click="goBack">← Back</span>
    </div>
    
    <!-- 상단 제목 -->
    <h1 class="title">바나나 구매를<br />도와드릴게요</h1>

    <!-- 막대 차트 카드 -->
    <div class="card">
      <div class="chart-title">주간 바나나 가격 변동 추이</div>
      <div class="bar-chart-placeholder">📊 Bar Chart Placeholder</div>
    </div>

    <!-- 곡선 차트 카드 -->
    <div class="card">
      <div class="chart-title">작년 대비 현재 가격</div>
      <div class="line-chart-placeholder">
        <span class="label">5340원</span>
        📈 Line Chart Placeholder
      </div>
    </div>

    <!-- 하단 네비게이션 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BottomNav from './BottomNav.vue'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.forecast-page {
  background-color: #0f1e25;
  color: white;
  font-family: 'Noto Sans KR', sans-serif;
  padding: 1.5rem;
  padding-bottom: 80px;
  min-height: 100vh;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  margin-bottom: 1rem;
}

.back-btn {
  color: #ffc107;
  cursor: pointer;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.card {
  background-color: #1e2e36;
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1.2rem;
}

.chart-title {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 0.6rem;
}

.bar-chart-placeholder,
.line-chart-placeholder {
  background-color: #263843;
  height: 160px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #9ca3af;
  position: relative;
}

/* price label */
.line-chart-placeholder .label {
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: #3dd598;
  color: #0f1e25;
  padding: 4px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
}
</style>
