<template>
  <div class="mobile-container">
    <!-- Header Section -->
    <div class="header-section">
      <div class="subtitle">
        나이도, 국적도 관계없이<br />
        세상 모든 소비자와 함께하는
      </div>
      <div class="main-title">
        "과일가격 예측 서비스"
      </div>
    </div>

    <!-- Main Button Section -->
    <div class="main-button-wrapper">
      <div class="main-button logo-glass" @click="goLocation">
        <div class="fruit-icons">🍏🍇</div>
        <div class="app-name">
          <span class="msa">뭐사</span>
          <span class="gpt">GPT</span>
        </div>
      </div>
    </div>

    <!-- Language Section -->
    <div class="language-section">
      <div class="language-container">
        <span class="lang-text lang-jp">くだもの</span>
        <span class="lang-text lang-vn">trái cây</span>
        <span class="lang-text lang-cn">水果</span>
        <span class="lang-text lang-en">fruit</span>
        <span class="lang-text lang-af">vrugte</span>
        <span class="lang-text lang-ko">과일</span>
      </div>
    </div>

    <!-- Bottom Icons Section -->
    <div class="bottom-icons">
      <div class="icon-group">
        <div class="large-icon">👤</div>
        <div class="small-circles">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function goLocation() {
  router.push('/location');
}
</script>

<style scoped>
/* 깔끔하고 일관된 모바일 UI 스타일 */
.mobile-container {
  width: 100%;
  min-height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  background: linear-gradient(180deg, #e0f2e0 0%, #f3e8ff 50%, #dbeafe 100%);
  border-radius: 2.5rem 2.5rem 0 0;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.5rem;
}

/* Header Section */
.header-section {
  text-align: center;
  padding-top: 3rem;
  margin-bottom: 2rem;
}

.subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  line-height: 1.4;
  margin-bottom: 0.75rem;
}

.main-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

/* Main Button Section */
.main-button-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.main-button {
  width: 180px;
  height: 120px;
  background: linear-gradient(135deg, #e0fbe0 0%, #a7f3d0 60%, #bbf7d0 100%);
  border-radius: 2rem;
  box-shadow: 0 8px 32px 0 rgba(34,197,94,0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10);
  border: 2.5px solid #b6e6c7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(.4,2,.6,1);
  backdrop-filter: blur(2px);
  position: relative;
}

.logo-glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 2rem;
  background: linear-gradient(120deg,rgba(255,255,255,0.25) 0%,rgba(255,255,255,0.10) 100%);
  z-index: 0;
}

.main-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(34, 197, 94, 0.4);
}

.fruit-icons {
  font-size: 2.5rem;
  margin-bottom: 0.2rem;
  position: relative;
  z-index: 1;
}

.app-name {
  font-size: 2.1rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: #222;
  text-shadow: 0 2px 8px rgba(0,0,0,0.10), 0 1px 0 #fff;
  display: flex;
  align-items: flex-end;
  position: relative;
  z-index: 1;
}

.msa {
  font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
  font-weight: 900;
  color: #222;
  margin-right: 0.08em;
  letter-spacing: -0.03em;
  filter: drop-shadow(0 1px 0 #fff) drop-shadow(0 2px 6px #b6e6c7);
}

.gpt {
  font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
  font-weight: 900;
  color: #10b981;
  margin-left: 0.08em;
  letter-spacing: -0.01em;
  filter: drop-shadow(0 1px 0 #fff) drop-shadow(0 2px 6px #b6e6c7);
}

/* Language Section */
.language-section {
  width: 100%;
  height: 120px;
  position: relative;
  margin-bottom: 2rem;
}

.language-container {
  position: relative;
  width: 320px;
  height: 100%;
  margin: 0 auto;
}

.lang-text {
  position: absolute;
  font-size: 1rem;
  color: #6b7280;
  font-weight: 500;
}

.lang-jp {
  left: 8px;
  top: 8px;
  transform: rotate(-20deg);
}

.lang-vn {
  left: 80px;
  top: 0;
  transform: rotate(-10deg);
}

.lang-cn {
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}

.lang-en {
  right: 80px;
  top: 8px;
  transform: rotate(10deg);
}

.lang-af {
  right: 8px;
  top: 24px;
  transform: rotate(20deg);
}

.lang-ko {
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  font-weight: 600;
  color: #4b5563;
}

/* Bottom Icons Section */
.bottom-icons {
  margin-top: auto;
  padding-bottom: 2rem;
}

.icon-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.large-icon {
  font-size: 4rem;
  color: #6b7280;
}

.small-circles {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.circle {
  width: 20px;
  height: 20px;
  background-color: #9ca3af;
  border-radius: 50%;
}

.circle:nth-child(2) {
  width: 32px;
  height: 32px;
}

.circle:nth-child(3) {
  width: 48px;
  height: 48px;
}

/* 모바일 반응형 */
@media (max-width: 430px) {
  .mobile-container {
    border-radius: 0;
    max-width: 100vw;
  }
  
  .language-container {
    width: 100%;
  }
}

@media (max-height: 700px) {
  .header-section {
    padding-top: 2rem;
  }
  
  .main-button-wrapper {
    margin-bottom: 1.5rem;
  }
  
  .language-section {
    height: 80px;
    margin-bottom: 1rem;
  }
}
</style>