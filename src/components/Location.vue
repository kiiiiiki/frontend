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
      <!-- Map Icon -->
      <div class="map-icon-container">
        <div class="map-icon">
          <svg width="180" height="180" viewBox="0 0 120 120" fill="none">
            <!-- Map background -->
            <rect x="10" y="40" width="100" height="60" rx="8" fill="#E5E7EB" />
            <!-- Green area -->
            <path d="M10 70 Q30 50 50 70 T90 70 L90 100 Q70 90 50 100 T10 100 Z" fill="#86EFAC" />
            <!-- Blue area -->
            <path d="M40 48 Q60 35 80 48 T110 48 L110 75 Q90 65 70 75 T40 75 Z" fill="#93C5FD" />
            <!-- Yellow path -->
            <path d="M20 85 Q40 75 60 85 T100 85" stroke="#FEF08A" stroke-width="3" fill="none" />
            <!-- Location pin -->
            <circle cx="60" cy="55" r="18" fill="#6366F1" />
            <circle cx="60" cy="55" r="8" fill="white" />
          </svg>
        </div>
      </div>

      <!-- Title -->
      <div class="title-section">
        <h2 class="main-title">어디에 살고 계신가요?</h2>
        <p class="subtitle">지역에 맞는 구매 전략을 추천해드릴게요 :)</p>
      </div>

      <!-- Location Form -->
      <div class="form-section">
        <!-- 시/도 선택 -->
        <div class="form-group">
          <label class="form-label">당신의 위치 (시/군/구)</label>
          <div class="select-wrapper">
            <select v-model="selectedCity" class="form-select">
              <option value="">서울시</option>
              <option value="부산시">부산시</option>
              <option value="대구시">대구시</option>
              <option value="인천시">인천시</option>
              <option value="광주시">광주시</option>
              <option value="대전시">대전시</option>
              <option value="울산시">울산시</option>
              <option value="세종시">세종시</option>
              <option value="경기도">경기도</option>
              <option value="강원도">강원도</option>
              <option value="충청북도">충청북도</option>
              <option value="충청남도">충청남도</option>
              <option value="전라북도">전라북도</option>
              <option value="전라남도">전라남도</option>
              <option value="경상북도">경상북도</option>
              <option value="경상남도">경상남도</option>
              <option value="제주도">제주도</option>
            </select>
            <svg class="select-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

        <!-- 상세 주소 -->
        <div class="form-group">
          <label class="form-label">상세 주소</label>
          <div class="address-input-wrapper">
            <input 
              v-model="detailAddress" 
              type="text" 
              class="address-input" 
              placeholder="예) 세종대로 209"
            />
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
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedCity = ref('')
const detailAddress = ref('')

function goBack() {
  router.push('/')
}

function goNext() {
  router.push({
    path: '/selection',
    query: {
      city: selectedCity.value || '',
      address: detailAddress.value || ''
    }
  })
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

/* Header */
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
  margin-right: 2.5rem; /* 뒤로가기 버튼과 균형 맞추기 */
}

/* Content */
.content {
  flex: 1;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
}

/* Map Icon */
.map-icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.map-icon {
  padding: 0.5rem;
}

/* Title Section */
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

/* Form Section */
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

.address-input-wrapper {
  display: flex;
  gap: 0.5rem;
}

.address-input {
  flex: 1;
  padding: 1rem;
  border: 2px solid #E5E7EB;
  border-radius: 0.75rem;
  font-size: 1rem;
  background-color: white;
}

.address-input:focus {
  outline: none;
  border-color: #6366F1;
}


/* Button Section */
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

/* 모바일 반응형 */
@media (max-width: 430px) {
  .mobile-container {
    max-width: 100vw;
  }
}
</style>
