<template>
  <div class="voice-container">
    <!-- 상태 텍스트 -->
    <div class="status">{{ isListening ? '음성 인식 중...' : '음성 인식 시작하기' }}</div>

    <!-- LLM 박스 -->
    <div class="llm-box">
      <div class="llm-label">LLM이 탐색중</div>
      <div class="waveform">
        <div v-for="n in 20" :key="n" class="bar" :class="{ active: isListening }" />
      </div>
      <div class="stop-icon" @click="stopListening" v-if="isListening">⛔</div>
    </div>

    <!-- 하단 명령 원 -->
    <div class="bottom-command">
      <div class="big-circle">
        <!-- 주변 기능 버튼 -->
        <div class="option heart" @click="goToHealth"><i class="fas fa-heart"></i></div>
        <div class="option shop" @click="goToShop"><i class="fas fa-shopping-cart"></i></div>
        <div class="option news" @click="goToNews"><i class="fas fa-newspaper"></i></div>
        <div class="option finance" @click="goToFinance"><i class="fas fa-dollar-sign"></i></div>

        <!-- 중앙 마이크 버튼 -->
        <div class="option mic-center" @click="startListening">
          <i class="fas fa-microphone"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isListening = ref(false)

const startListening = () => {
  if (!isListening.value) {
    isListening.value = true
    console.log('🎤 음성 인식 시작됨')
    // 실제 음성 인식 로직은 Web Speech API 또는 Whisper API 등 연동 필요
  }
}

const stopListening = () => {
  if (isListening.value) {
    isListening.value = false
    console.log('🛑 음성 인식 중단됨')
    // 실제 중단 로직도 여기에 연결
  }
}

const goToHealth = () => {
  router.push('/health')
}

const goToNews = () => {
  router.push('/news')
}

const goToShop = () => {
  router.push('/price-select')
}

const goToFinance = () => {
  router.push('/finance')
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.voice-container {
  background-color: #0f1e25;
  color: white;
  min-height: 100vh;
  font-family: 'Noto Sans KR', sans-serif;
  position: relative;
  padding: 1rem;
  overflow: hidden;
  text-align: center;
}

.status {
  font-size: 20px;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

/* LLM 탐색 박스 */
.llm-box {
  width: 140px;
  height: 220px;
  background: linear-gradient(to bottom, #4b4bff, #ff4b4b);
  margin: 0 auto;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
}
.llm-label {
  font-size: 12px;
}
.waveform {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-grow: 1;
}
.bar {
  width: 3px;
  height: 20px;
  background-color: #555;
  border-radius: 2px;
}
.bar.active {
  background-color: white;
  animation: bounce 1s infinite ease-in-out alternate;
}
.bar:nth-child(odd).active {
  animation-delay: 0.1s;
}
@keyframes bounce {
  0% {
    height: 8px;
  }
  100% {
    height: 30px;
  }
}

.stop-icon {
  font-size: 20px;
  cursor: pointer;
}

/* 하단 명령 원형 UI */
.bottom-command {
  position: absolute;
  bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
}
.big-circle {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background-color: #1e333d;
  position: relative;
}
.option {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #3dd598;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0f1e25;
  font-size: 20px;
  position: absolute;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.option:hover {
  transform: scale(1.1);
}

/* 중앙 마이크 */
.mic-center {
  background-color: #3dd598 !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.mic-center:hover {
  transform: translate(-50%, -50%) scale(1.1) !important;
}
/* 주변 기능 */
.heart {
  background-color: #f87171;
  left: 15%;
  top: 20%;
}
.shop {
  background-color: #fbbf24;
  right: 15%;
  top: 20%;
}
.news {
  background-color: #6366f1;
  left: 15%;
  bottom: 20%;
}
.finance {
  background-color: #60a5fa;
  right: 15%;
  bottom: 20%;
}
</style>
