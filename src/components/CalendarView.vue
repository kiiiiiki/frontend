<template>
  <div class="calendar-container">
    <!-- 상단 헤더 -->
    <div class="header">
      <button class="back-btn" @click="goBack"><i class="fas fa-chevron-left"></i> Back</button>
      <div class="title">일정 관리</div>
      <button class="add-btn">
        <i class="fas fa-plus"></i>
      </button>
    </div>

    <!-- 요일 -->
    <div class="days-row">
      <span v-for="day in week" :key="day">{{ day }}</span>
    </div>

    <!-- 날짜 -->
    <div class="dates-grid">
      <span
        v-for="day in daysInMonth"
        :key="day"
        :class="['date', { today: day === 25, selected: day === selectedDate }]"
        @click="selectDate(day)"
      >
        {{ day }}
      </span>
    </div>

    <!-- 일정 목록 -->
    <div class="schedule-list">
      <div class="schedule-item red">
        <i class="fas fa-circle icon"></i>
        <span>여름휴가</span>
      </div>
      <div class="schedule-item orange">
        <i class="fas fa-circle icon"></i>
        <span>프로젝트 마감기한</span>
      </div>
      <div class="schedule-item green">
        <i class="fas fa-circle icon"></i>
        <span>워크샵</span>
      </div>
    </div>

    <!-- 하단 네비게이션 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from './BottomNav.vue'

const router = useRouter()
const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)
const selectedDate = ref(25)

const selectDate = (day) => {
  selectedDate.value = day
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.calendar-container {
  background-color: #0f1e25;
  color: white;
  font-family: 'Noto Sans KR', sans-serif;
  min-height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
}

/* 헤더 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}
.back-btn {
  background: none;
  border: none;
  color: #aaa;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.back-btn:hover {
  color: #ffc107;
}
.title {
  font-size: 16px;
  color: #aaa;
}
.add-btn {
  background-color: #3dd598;
  border: none;
  color: #0f1e25;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 요일 */
.days-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 12px;
  color: #bbb;
}

/* 날짜 */
.dates-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.4rem;
  margin-bottom: 1.5rem;
}
.date {
  width: 100%;
  text-align: center;
  padding: 0.4rem 0;
  border-radius: 50%;
  font-size: 13px;
  color: #ccc;
  transition: background-color 0.2s ease;
}
.date:hover {
  background-color: #1c3c47;
}
.date.today {
  background-color: #3dd598;
  color: #0f1e25;
  font-weight: bold;
}
.date.selected {
  background-color: #1c3c47;
  color: #ffffff;
}

/* 일정 목록 */
.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.schedule-item {
  background-color: #1c3c47;
  border-radius: 12px;
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 14px;
}
.icon {
  font-size: 10px;
}

.schedule-item.red .icon {
  color: #ff5c5c;
}
.schedule-item.orange .icon {
  color: #fcbf49;
}
.schedule-item.green .icon {
  color: #3dd598;
}
</style>
