<template>
  <div class="login-page">
    <div class="login-card">
      <!-- 로고 -->
      <div class="logo-wrapper">
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="logo"
        />
      </div>

      <!-- 인삿말 -->
      <h1 class="welcome-title">어서오세요!</h1>
      <p class="subtitle">개인화 서비스를 위해 로그인 해주세요</p>

      <!-- 사용자명 -->
      <div class="input-group">
        <span class="icon">
          <i class="fas fa-user"></i>
        </span>
        <input type="text" placeholder="Austin" />
      </div>

      <!-- 비밀번호 -->
      <div class="input-group">
        <span class="icon">
          <i class="fas fa-lock"></i>
        </span>
        <input type="password" placeholder="●●●●●●" />
        <span class="eye-toggle">
          <i class="fas fa-eye"></i>
        </span>
      </div>

      <!-- 로그인 버튼 -->
      <button class="login-btn" @click="goToMainHome">로그인 →</button>

      <p class="forgot">Forgot password?</p>

      <!-- 회원가입 버튼 -->
      <button class="signup-btn" @click="gotoSignUp">
        회원가입 하기
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const gotoSignUp = () => {
  router.push('/selection')
}

const goToMainHome = () => {
  router.push('/main_home')
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.login-page {
  background-color: #0f1e25;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-family: 'Noto Sans KR', sans-serif;
  color: white;
}

.login-card {
  background-color: #132c35;
  padding: 2rem;
  border-radius: 20px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  text-align: center;
}

.logo-wrapper img {
  width: 48px;
  height: 48px;
  margin-bottom: 1.5rem;
}

.welcome-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 14px;
  color: #b0b8bd;
  margin-bottom: 2rem;
}

.input-group {
  background-color: #1c3c47;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  color: #fff;
  position: relative;
}

.input-group input {
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  flex: 1;
  margin-left: 0.5rem;
}

.icon {
  font-size: 16px;
  color: #ffc107;
}

.input-group .fa-lock {
  color: #f44336;
}

.eye-toggle {
  position: absolute;
  right: 1rem;
  color: #aaa;
  font-size: 14px;
  cursor: pointer;
}

.login-btn {
  background-color: #3dd598;
  color: #0f1e25;
  border: none;
  border-radius: 12px;
  padding: 0.75rem;
  font-weight: 600;
  font-size: 16px;
  width: 100%;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.login-btn:hover {
  background-color: #33c18a;
}

.forgot {
  color: #99aabb;
  font-size: 13px;
  margin: 1rem 0;
}

.signup-btn {
  background-color: #245e51;
  color: #a8f4d4;
  border: none;
  border-radius: 12px;
  padding: 0.75rem;
  font-weight: 500;
  font-size: 15px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.signup-btn:hover {
  background-color: #2a6c5a;
}
</style>
