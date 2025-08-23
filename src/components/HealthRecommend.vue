<template>
  <div class="health-page">
    <!-- 상단 -->
    <div class="header">
      <span class="back-btn" @click="goBack">← Back</span>
    </div>

    <!-- 나의 기저질환 -->
    <div class="report-card">
      <div class="report-title">나의 기저질환</div>
      <div class="disease-chart">
        <img src="https://cdn-icons-png.flaticon.com/512/4270/4270302.png" alt="chart" />
        <ul>
          <li><span class="dot orange"></span> 간과류 알레르기</li>
          <li><span class="dot red"></span> 당뇨</li>
          <li><span class="dot green"></span> 고혈압</li>
        </ul>
      </div>
    </div>

    <!-- Week History -->
    <div class="section dark">
      <h3>Week History</h3>
      <div class="history-icons">
        <div class="pill"><img src="https://cdn-icons-png.flaticon.com/512/811/811640.png" /><p>알레지 약</p></div>
        <div class="pill"><img src="https://cdn-icons-png.flaticon.com/512/3457/3457683.png" /><p>비타민 A</p></div>
        <div class="pill"><img src="https://cdn-icons-png.flaticon.com/512/3457/3457686.png" /><p>당삼</p></div>
        <div class="pill"><img src="https://cdn-icons-png.flaticon.com/512/1247/1247944.png" /><p>영양제</p></div>
      </div>
    </div>

    <!-- Recommend -->
    <div class="section">
      <h3>Recommend</h3>
      <div class="recommend-card">
        <img src="https://cdn-icons-png.flaticon.com/512/415/415682.png" />
        <span>오렌지</span>
        <span class="amount">1개</span>
      </div>
      <div class="recommend-card">
        <img src="https://cdn-icons-png.flaticon.com/512/634/634822.png" />
        <span>견과류(소금 무첨가)</span>
        <span class="amount">20g</span>
      </div>
      <div class="recommend-card">
        <img src="https://cdn-icons-png.flaticon.com/512/590/590685.png" />
        <span>바나나</span>
        <span class="amount">2송이</span>
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
  router.go(-1) // 이전 페이지로 돌아가기
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.health-page {
  background-color: #0f1e25;
  color: white;
  font-family: 'Noto Sans KR', sans-serif;
  min-height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  padding-bottom: 80px;
}

/* Header */
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

/* Report Card */
.report-card {
  background-color: #fcd34d;
  border-radius: 20px;
  padding: 1rem;
  color: #1e1e1e;
  margin-bottom: 1rem;
}
.report-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.disease-chart {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.disease-chart img {
  width: 80px;
  height: 80px;
}
.disease-chart ul {
  list-style: none;
  padding: 0;
  font-size: 14px;
}
.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 6px;
  border-radius: 50%;
}
.dot.orange {
  background-color: orange;
}
.dot.red {
  background-color: red;
}
.dot.green {
  background-color: green;
}

/* Section Common */
.section {
  margin-top: 1.5rem;
}
.section.dark h3 {
  color: #e0f2fe;
}
.section h3 {
  font-size: 16px;
  margin-bottom: 0.8rem;
}

/* History */
.history-icons {
  display: flex;
  justify-content: space-between;
}
.pill {
  text-align: center;
  width: 25%;
}
.pill img {
  width: 42px;
  height: 42px;
}
.pill p {
  font-size: 12px;
  margin-top: 0.5rem;
}

/* Recommend Cards */
.recommend-card {
  background-color: #1f2c34;
  border-radius: 12px;
  padding: 0.7rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.7rem;
}
.recommend-card img {
  width: 30px;
  height: 30px;
}
.recommend-card span {
  flex: 1;
}
.recommend-card .amount {
  font-weight: bold;
  color: #3dd598;
  text-align: right;
}

</style>
