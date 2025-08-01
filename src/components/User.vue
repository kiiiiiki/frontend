<template>
  <div class="mobile-container">
    <div class="header">
      <button class="back-btn" @click="goBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h1 class="header-title">회원 정보</h1>
    </div>
    <div class="content">
      <div class="title-section">
        <h2 class="main-title">입력하신 정보</h2>
        <p class="subtitle">아래는 사용자가 입력한 정보입니다.</p>
      </div>
      <div class="info-list">
        <div class="info-item">
          <span class="info-label">지역:</span>
          <span class="info-value">{{ city }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">상세 주소:</span>
          <span class="info-value">{{ address }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">선호 언어:</span>
          <span class="info-value">{{ language }}</span>
        </div>
      </div>
    </div>
    <div class="start-section">
      <button class="start-btn" @click="onStartClick">
        시작하기
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()


const city = route.query.city || '-'
const address = route.query.address || '-'
const languageCode = route.query.language || '-'

const languageMap: Record<string, string> = {
  ko: '한국어',
  en: '영어(English)',
  zh: '중국어(中文)',
  ja: '일본어(日本語)',
  vi: '베트남어(Tiếng Việt)',
  th: '태국어(ภาษาไทย)',
  ru: '러시아어(Русский)',
  es: '스페인어(Español)',
  fr: '프랑스어(Français)',
  de: '독일어(Deutsch)'
}
const langKey = Array.isArray(languageCode) ? languageCode[0] : languageCode
const language = languageMap[String(langKey)] || langKey

function goBack() {
  router.back()
}

function onStartClick() {
  // TODO: Implement main app start action
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
.title-section {
  text-align: center;
  margin-bottom: 2rem;
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
.info-list {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.info-item {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
}
.info-label {
  color: #6B7280;
  font-weight: 500;
}
.info-value {
  color: #1F2937;
  font-weight: 700;
}

.start-section {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
}

.start-btn {
  width: 100%;
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

.start-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}
</style>
