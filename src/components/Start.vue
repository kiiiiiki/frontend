<template>
  <div class="home">
    <div class="content">
      <h2 class="subtitle">멀티모달<br />AI 서비스</h2>

      <h1 class="title">
        <span class="saja-white">사</span><span class="saja-orange">자</span>
        <span class="subline">Sound Assistant Generative AI</span>
      </h1>

      <p class="description">
        날씨 · 건강 · 일정 · 금융 · 뉴스 · 식단까지,<br />
        일상을 한 번에 관리하는 AI 비서, <strong>사자</strong>
      </p>

      <p class="secondary-description">
        음성으로 간편하게,<br />
        내게 맞춘 맞춤형 정보와 추천 제공<br />
        매일 종합 리포트로 생활을 더 똑똑하고 편리하게!
      </p>

      <div class="countdown">
        {{ countdown }}초 후 로그인 페이지로 이동합니다...
      </div>
    </div>

    <!-- 워터마크나 로고 아이콘 -->
    <img
      class="lion-icon"
      src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
      alt="lion-icon"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref(2)

onMounted(() => {
  const interval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(interval)
      router.push('/login')
    }
  }, 1000)
})
</script>

<style scoped>
.home {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(-225deg, #3dd598, #25c685);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: 'Noto Sans KR', sans-serif;
  color: white;
  padding: 2rem;
  box-sizing: border-box;
  overflow: hidden;
}

.content {
  max-width: 90%;
  text-align: left;
  z-index: 2;
}

.subtitle {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.title {
  font-size: 48px;
  font-weight: 900;
  margin: 0;
  line-height: 1;
  position: relative;
}

.saja-white {
  color: white;
}

.saja-orange {
  color: #ffb94e;
  margin-left: -2px;
}

.subline {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  margin-top: 8px;
  line-height: 1.6;
}

.description {
  font-size: 14px;
  line-height: 1.6;
  margin-top: 2rem;
  color: #ffffff;
}

.secondary-description {
  font-size: 14px;
  line-height: 1.8;
  margin-top: 1.5rem;
  color: #ffffff;
}

/* 로고 아이콘 (워터마크) */
.lion-icon {
  position: absolute;
  top: 120px;
  right: 40px;
  width: 60px;
  height: 60px;
  opacity: 0.1;
}

.countdown {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 2rem;
  text-align: center;
}
</style>