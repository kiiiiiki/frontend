<template>
  <div class="mobile-container">
    <!-- Header -->
    <div class="header">
      <button class="back-btn" @click="goBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h1 class="header-title">로그인</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Globe Icon -->
      <div class="globe-icon-container">
        <div class="globe-icon">
          <svg width="140" height="140" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill="#6366F1" />
            <path d="M50 10a40 40 0 1 0 0.01 0z" fill="#fff" fill-opacity="0.15"/>
            <path d="M30 50a20 20 0 0 1 40 0" stroke="#fff" stroke-width="3" fill="none"/>
            <ellipse cx="50" cy="50" rx="30" ry="12" fill="#fff" fill-opacity="0.15"/>
            <ellipse cx="50" cy="50" rx="20" ry="8" fill="#fff" fill-opacity="0.15"/>
          </svg>
        </div>
      </div>

      <!-- Title -->
      <div class="title-section">
        <h2 class="main-title">언어 선택</h2>
        <p class="subtitle">원활한 소통을 위해 선호하는 언어를 선택해 주세요.</p>
      </div>

      <!-- Language Form -->
      <div class="form-section">
        <div class="form-group">
          <label class="form-label">당신의 선호 언어</label>
          <div class="select-wrapper">
            <select v-model="selectedLang" class="form-select">
              <option value="ko">한국어</option>
              <option value="en">영어(English)</option>
              <option value="zh">중국어(中文)</option>
              <option value="ja">일본어(日本語)</option>
              <option value="vi">베트남어(Tiếng Việt)</option>
              <option value="th">태국어(ภาษาไทย)</option>
              <option value="ru">러시아어(Русский)</option>
              <option value="es">스페인어(Español)</option>
              <option value="fr">프랑스어(Français)</option>
              <option value="de">독일어(Deutsch)</option>
            </select>
            <svg class="select-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Next Button -->
      <div class="button-section">
        <button class="next-btn" @click="goNext">
          다음으로 넘어가기
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const selectedLang = ref('vi')

// 이전 페이지에서 전달된 정보 받기
const route = useRoute()
const city = route.query.city || ''
const address = route.query.address || ''

function goBack() {
  router.back()
}

function goNext() {
  router.push({
    path: '/user',
    query: {
      city,
      address,
      language: selectedLang.value
    }
  })
}

function onStartClick() {
  // TODO: Implement start action, e.g., go to home or main app page
  router.push('/')
}
</script>

<style scoped>
.mobile-container {
  width: 100%;
  min-height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  background-color: #F8F9FA;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: white;
  border-bottom: 1px solid #E5E7EB;
}

.back-btn {
  padding: 0.5rem;
  color: #6B7280;
  background: none;
  border: none;
  cursor: pointer;
}

.header-title {
  flex: 1;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1F2937;
  margin-right: 2.5rem;
}

.content {
  flex: 1;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
}

.globe-icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.globe-icon {
  padding: 0.5rem;
}

.title-section {
  text-align: center;
  margin-bottom: 3rem;
}

.main-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1rem;
  color: #6B7280;
  font-weight: 500;
}

.form-section {
  flex: 1;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 2rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 0.5rem;
}

.select-wrapper {
  position: relative;
}

.form-select {
  width: 100%;
  padding: 1rem;
  border: 2px solid #E5E7EB;
  border-radius: 0.75rem;
  font-size: 1rem;
  background-color: white;
  appearance: none;
  cursor: pointer;
}

.form-select:focus {
  outline: none;
  border-color: #6366F1;
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  pointer-events: none;
}

.button-section {
  margin-top: auto;
}

.next-btn {
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.next-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
}

.start-btn {
  width: 100%;
  margin-top: 0;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #6366F1 0%, #818CF8 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.start-section {
  margin-top: 2.5rem;
}

.start-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

@media (max-width: 430px) {
  .mobile-container {
    max-width: 100vw;
  }
}
</style>
