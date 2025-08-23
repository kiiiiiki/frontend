<template>
  <div class="setting-container">
    <!-- 상단 유저 정보 -->
    <div class="user-card">
      <img
        class="avatar"
        src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
        alt="avatar"
      />
      <div class="user-info">
        <div class="name">Austin</div>
        <div class="phone">+91 23 456 7890</div>
        <div class="email">randommail@mail.me</div>
      </div>
      <i class="fas fa-chevron-right arrow"></i>
    </div>

    <!-- 일반 메뉴 리스트 -->
    <div class="menu-section">
      <div class="menu-item">
        <i class="fas fa-user icon red"></i>
        <span>프로필 수정</span>
      </div>
      <div class="menu-item">
        <i class="fas fa-file-alt icon yellow"></i>
        <span>저장된 일일 보고서</span>
      </div>
      <div class="menu-item">
        <i class="fas fa-link icon green"></i>
        <span>연동/권한 관리</span>
      </div>
    </div>

    <!-- 토글 메뉴 -->
    <div class="menu-section">
      <div class="menu-item toggle">
        <div class="left">
          <i class="fas fa-shield-alt icon yellow"></i>
          <span>보안/정책</span>
        </div>
        <input type="checkbox" checked />
      </div>

      <div class="menu-item toggle">
        <div class="left">
          <i class="fas fa-share-alt icon green"></i>
          <span>공유</span>
        </div>
        <input type="checkbox" checked />
      </div>

      <div class="menu-item toggle">
        <div class="left">
          <i class="fas fa-bell icon gray"></i>
          <span>알림 센터</span>
        </div>
        <input type="checkbox" />
      </div>

      <div class="menu-item">
        <i class="fas fa-language icon teal"></i>
        <span>언어 변경하기</span>
      </div>
    </div>

    <!-- 하단 탭 네비게이션 -->
    <BottomNav />
  </div>
</template>

<script setup>
import BottomNav from './BottomNav.vue'
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.setting-container {
  background-color: #0f1e25;
  color: #fff;
  font-family: 'Noto Sans KR', sans-serif;
  min-height: 100vh;
  padding: 1rem;
  padding-bottom: 5rem;
  box-sizing: border-box;
}

/* 유저 카드 */
.user-card {
  display: flex;
  align-items: center;
  background-color: #1e333d;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 1rem;
  position: relative;
}
.avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  margin-right: 1rem;
}
.user-info .name {
  font-weight: bold;
  font-size: 16px;
}
.user-info .phone,
.user-info .email {
  font-size: 12px;
  color: #aaa;
}
.arrow {
  position: absolute;
  right: 16px;
  color: #aaa;
}

/* 메뉴 리스트 */
.menu-section {
  background-color: #1e333d;
  border-radius: 16px;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  gap: 1rem;
  border-bottom: 1px solid #2c4c56;
  font-size: 14px;
}
.menu-item:last-child {
  border-bottom: none;
}

.icon {
  width: 20px;
  text-align: center;
}
.icon.red {
  color: #f87171;
}
.icon.yellow {
  color: #fbbf24;
}
.icon.green {
  color: #34d399;
}
.icon.gray {
  color: #ccc;
}
.icon.teal {
  color: #2dd4bf;
}

/* 토글 스위치 */
.menu-item.toggle {
  justify-content: space-between;
}
.menu-item .left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

input[type='checkbox'] {
  appearance: none;
  width: 36px;
  height: 20px;
  background-color: #555;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
}
input[type='checkbox']:checked {
  background-color: #3dd598;
}
input[type='checkbox']::before {
  content: '';
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.2s ease;
}
input[type='checkbox']:checked::before {
  transform: translateX(16px);
}

</style>
