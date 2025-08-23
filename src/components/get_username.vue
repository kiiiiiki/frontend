<template>
  <div class="container">
    <div class="content">
      <!-- 로고 -->
      <div class="logo-box"></div>

      <!-- 타이틀 -->
      <h1 class="title">거의 다 왔어요!</h1>
      <p class="subtitle">이름을 알려주세요</p>

      <!-- 입력 필드 -->
      <div class="input-box">
        <div class="input-group">
          <div class="icon">
            <i class="fas fa-user"></i>
          </div>
          <input type="text" placeholder="Your full name" v-model="fullName" />
        </div>

        <div class="input-group">
          <div class="icon">
            <i class="fas fa-user"></i>
          </div>
          <input type="text" placeholder="Username" v-model="username" />
        </div>
      </div>

      <!-- 하단 버튼 -->
      <div class="button-group">
        <button class="back-btn" @click="goBack">←</button>
        <button class="next-btn" @click="goNext">다음 →</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fullName = ref('')
const username = ref('')

const goBack = () => {
  router.back()
}

const goNext = () => {
  if (!fullName.value || !username.value) {
    alert('이름과 사용자명을 입력해주세요.')
    return
  }

  router.push('/permission')
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.container {
  background-color: #0f1e25;
  color: #ffffff;
  font-family: 'Noto Sans KR', sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  box-sizing: border-box;
}

.content {
  width: 100%;
  max-width: 340px;
}

.logo-box {
  width: 32px;
  height: 32px;
  background-color: #22c55e;
  border-radius: 8px;
  margin-bottom: 2.5rem;
}

.title {
  font-size: 24px;
  font-weight: 800;
  margin: 0;
}

.subtitle {
  font-size: 14px;
  color: #b0b8c1;
  margin-bottom: 2rem;
}

.input-box {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  background-color: #1c3c47;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
}

.input-group input {
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  flex: 1;
  margin-left: 0.75rem;
}

.icon {
  color: #ffc107;
  font-size: 16px;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2.5rem;
}

.back-btn {
  width: 48px;
  height: 48px;
  background-color: #14532d;
  color: #a8f4d4;
  font-size: 20px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}

.next-btn {
  flex: 1;
  background-color: #3dd598;
  color: #0f1e25;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  padding: 0 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.next-btn:hover {
  background-color: #2fc08d;
}
</style>
