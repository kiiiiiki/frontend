<template>
  <div class="overlay" @click.self="closeMenu">
    <div class="side-menu">
      <!-- 프로필 -->
      <div class="profile-section">
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="avatar"
          class="avatar"
        />
        <div class="username">Austin</div>
      </div>

      <!-- 메뉴 리스트 -->
      <ul class="menu-list">
        <li><i class="fas fa-store"></i> Shop</li>
        <li><i class="fas fa-wallet"></i> Finance</li>
        <li><i class="fas fa-heartbeat"></i> Health care</li>
        <li><i class="fas fa-bell"></i> Medicine/Schedule Reminder</li>
        <li><i class="fas fa-chart-line"></i> Trends</li>
        <li><i class="fas fa-star"></i> History Report</li>
      </ul>

      <!-- 닫기 버튼 -->
      <button class="close-btn" @click="closeMenu">닫기</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const closeMenu = () => {
  router.go(-1) // 이전 페이지로 돌아가기
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(15, 30, 37, 0.85);
  z-index: 999;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
}

.side-menu {
  width: 250px;
  background-color: #132c35;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  animation: slideIn 0.3s ease forwards;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  margin-bottom: 0.5rem;
}
.username {
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #e1e1e1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 14px;
}
.menu-list li {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.menu-list i {
  width: 20px;
  text-align: center;
  color: #3dd598;
}

.close-btn {
  margin-top: auto;
  background-color: #3dd598;
  color: #0f1e25;
  border: none;
  border-radius: 10px;
  padding: 0.6rem;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
</style>
