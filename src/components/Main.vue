<template>
  <div class="mobile-container">
    <!-- Header -->
    <div class="header">
      <h1 class="header-title">메인 화면</h1>
      <div class="location-info">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="location-icon">
          <path d="M8 2C6.34 2 5 3.34 5 5c0 2.5 3 7 3 7s3-4.5 3-7c0-1.66-1.34-3-3-3z" fill="#6B7280"/>
          <circle cx="8" cy="5" r="1" fill="white"/>
        </svg>
        <span class="location-text">서울, 광진구</span>
      </div>
    </div>

    <!-- Content -->
    <div class="content">

      <!-- Chat Input Frame -->
      <div class="chat-frame">
      <!-- Chat Input Section -->
      <div class="chat-section">
        <input
          v-model="userInput"
          class="chat-input"
          type="text"
          placeholder="예: 오늘의 사과 가격 트렌드 확인해줘"
          @keyup.enter="onSendClick"
        />
        <button class="send-btn" @click="onSendClick">전송</button>
      </div>
      </div>

      <!-- Main Card -->
      <div class="main-card">
        <div class="card-header">
          <div class="avatar-section">
            <div class="avatar">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="white"/>
                <path d="M24 12c-4 0-8 2-8 6 0 2 1 4 3 5-1 2-2 4-2 6 0 3 3 6 7 6s7-3 7-6c0-2-1-4-2-6 2-1 3-3 3-5 0-4-4-6-8-6z" fill="black"/>
                <circle cx="20" cy="20" r="2" fill="white"/>
                <circle cx="28" cy="20" r="2" fill="white"/>
                <path d="M18 26c2 2 6 2 8 0" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
          <button class="main-button" @click="onMainButtonClick">
            망고 가격 트렌드 알려줘
          </button>
        </div>

        <!-- Voice Input Section -->
        <div class="voice-section">
          <div class="voice-waves">
            <div class="wave wave-1"></div>
            <div class="wave wave-2"></div>
            <div class="wave wave-3"></div>
          </div>
          <button class="voice-button" @click="onVoiceClick">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#22c55e"/>
              <path d="M16 10c-2 0-3 1-3 3v6c0 2 1 3 3 3s3-1 3-3v-6c0-2-1-3-3-3z" fill="black"/>
              <path d="M11 16c0 3 2 5 5 5s5-2 5-5" stroke="black" stroke-width="2" fill="none"/>
              <line x1="16" y1="24" x2="16" y2="26" stroke="black" stroke-width="2"/>
            </svg>
          </button>
        </div>

        <!-- Chat Bubble -->
        <div class="chat-bubble">
          <span class="chat-bubble-text">"Cho tôi biết xu hướng giá xoài."</span>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="bottom-nav">
      <div class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#9CA3AF"/>
        </svg>
        <span class="nav-text">Favorite</span>
      </div>
      <div class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7Z" fill="#9CA3AF"/>
        </svg>
        <span class="nav-text">장보기</span>
      </div>
      <div class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" fill="#9CA3AF"/>
        </svg>
        <span class="nav-text">Voucher Shop</span>
      </div>
      <div class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M13 3C9.23 3 6.19 5.95 6 9.66L4.1 12.5C3.85 12.97 4.08 13.56 4.62 13.7L6 14V21C6 21.55 6.45 22 7 22H19C19.55 22 20 21.55 20 21V14L21.38 13.7C21.92 13.56 22.15 12.97 21.9 12.5L20 9.66C19.81 5.95 16.77 3 13 3Z" fill="#9CA3AF"/>
        </svg>
        <span class="nav-text">History</span>
      </div>
      <div class="nav-item active">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" fill="#6366F1"/>
        </svg>
        <span class="nav-text active">AI Explore</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

import { ref } from 'vue'
const userInput = ref('')

function onSendClick() {
  if (!userInput.value.trim()) return;
  // TODO: Handle sending the message
  console.log('User input:', userInput.value)
  userInput.value = ''
}

function onVoiceClick() {
  // TODO: Implement voice recognition
  console.log('Voice button clicked')
}

function onMainButtonClick() {
  // TODO: Implement main button action
  console.log('Main button clicked')
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
  padding: 1rem 1.5rem;
  background-color: white;
  border-bottom: 1px solid #E5E7EB;
}

.header-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0.5rem;
  text-align: center;
}

.location-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.location-icon {
  flex-shrink: 0;
}

.location-text {
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 500;
}

/* Content */
.content {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Chat Section */
.chat-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.chat-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  border: 2px solid #E5E7EB;
  font-size: 1rem;
  background: #fff;
  color: #1F2937;
  outline: none;
  transition: border 0.2s;
}

.chat-input:focus {
  border-color: #6366F1;
}

.send-btn {
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, #6366F1 0%, #818CF8 100%);
  color: white;
  border: none;
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.send-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.chat-message {
  background-color: #E5E7EB;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  max-width: 80%;
}

.chat-text {
  font-size: 0.875rem;
  color: #6B7280;
}

/* Main Card */
.main-card {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  border-radius: 1.5rem;
  padding: 2rem;
  color: white;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.avatar-section {
  display: flex;
  justify-content: center;
}

.chat-frame {
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}
.avatar {
  width: 80px;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-button {
  background-color: white;
  color: #1F2937;
  padding: 1rem 2rem;
  border-radius: 2rem;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.main-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Voice Section */
.voice-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.voice-waves {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 2rem;
}

.wave {
  width: 4px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  animation: wave 1.5s ease-in-out infinite;
}

.wave-1 {
  height: 1rem;
  animation-delay: 0s;
}

.wave-2 {
  height: 2rem;
  animation-delay: 0.3s;
}

.wave-3 {
  height: 1.5rem;
  animation-delay: 0.6s;
}

@keyframes wave {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.5);
  }
}

.voice-button {
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.voice-button:hover {
  transform: scale(1.05);
}

/* Chat Bubble */
.chat-bubble {
  position: absolute;
  right: 1rem;
  bottom: 6rem;
  background-color: white;
  color: #1F2937;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  border-top-right-radius: 0.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 60%;
}

.chat-bubble-text {
  font-size: 0.875rem;
  font-style: italic;
}

/* Bottom Navigation */
.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0.5rem;
  background-color: white;
  border-top: 1px solid #E5E7EB;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: #F3F4F6;
}

.nav-item.active {
  background-color: #EEF2FF;
}

.nav-text {
  font-size: 0.75rem;
  color: #9CA3AF;
  font-weight: 500;
}

.nav-text.active {
  color: #6366F1;
}

@media (max-width: 430px) {
  .mobile-container {
    max-width: 100vw;
  }
}
</style>
