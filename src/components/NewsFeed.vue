<template>
  <div class="news-feed">
    <!-- 상단 헤더 -->
    <div class="header">
      <span class="back-btn" @click="goBack">← Back</span>
    </div>
    
    <!-- 🔼 상단 썸네일 가로 스크롤 -->
    <div class="thumbnail-scroll">
      <div class="thumb-item" v-for="n in 5" :key="n">
        <div class="thumb-placeholder">썸네일</div>
      </div>
    </div>

    <!-- 📰 뉴스 카드 -->
    <div class="news-card">
      <div class="card-header">
        <div class="icon-circle"><i class="fas fa-newspaper"></i></div>
        <div class="news-info">
          <div class="title">오늘의 뉴스</div>
          <div class="time">20 April at 4:20 PM</div>
        </div>
      </div>

      <div class="content">
        <p>
          "거의 다 왔는데…" 20만니스 턴에서 미끄러진 SK하이닉스 [핫종목]
        </p>

        <div class="image-row">
          <div class="img-box" v-for="i in 3" :key="i">이미지</div>
        </div>
      </div>

      <!-- 👍 하단 버튼들 -->
      <div class="card-actions">
        <span><i class="far fa-comment"></i> 7 Comments</span>
        <span><i class="far fa-heart"></i> 49 Likes</span>
        <span><i class="fas fa-share-alt"></i> Share</span>
      </div>

      <!-- 💬 댓글창 -->
      <div class="comment-input">
        <div class="user-icon"><i class="fas fa-user-circle"></i></div>
        <input type="text" placeholder="Write comment..." />
        <i class="fas fa-paperclip attach-icon"></i>
      </div>
    </div>

    <!-- 👤 추가 예시 카드 -->
    <div class="news-card">
      <div class="card-header">
        <div class="icon-circle"><i class="fas fa-user"></i></div>
        <div class="news-info">
          <div class="title">Alice Smith</div>
          <div class="time">4:20 PM</div>
        </div>
      </div>
    </div>

    <!-- 하단 네비게이션 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BottomNav from './BottomNav.vue'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.news-feed {
  background-color: #0f1e25;
  color: white;
  font-family: 'Noto Sans KR', sans-serif;
  padding: 1rem;
  padding-bottom: 100px;
  min-height: 100vh;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  margin-bottom: 1rem;
}

.back-btn {
  color: #ffc107;
  cursor: pointer;
}

/* 썸네일 스크롤 */
.thumbnail-scroll {
  display: flex;
  overflow-x: auto;
  gap: 0.8rem;
  margin-bottom: 1rem;
}
.thumb-item {
  min-width: 100px;
  height: 100px;
  background-color: #1f2f39;
  border-radius: 12px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #ccc;
}

/* 뉴스 카드 */
.news-card {
  background-color: #1f2f39;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 1rem;
}
.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.icon-circle {
  width: 36px;
  height: 36px;
  background-color: #e74c3c;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.8rem;
}
.news-info .title {
  font-weight: bold;
}
.news-info .time {
  font-size: 12px;
  color: #aaa;
}

/* 본문 */
.content p {
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 0.8rem;
}
.image-row {
  display: flex;
  gap: 0.5rem;
}
.img-box {
  flex: 1;
  height: 80px;
  background-color: #2c3e50;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #bbb;
}

/* 액션 버튼 */
.card-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 0.8rem;
  font-size: 13px;
  color: #ccc;
}
.card-actions i {
  margin-right: 4px;
}

/* 댓글 입력창 */
.comment-input {
  display: flex;
  align-items: center;
  margin-top: 0.8rem;
  background-color: #2e3c46;
  padding: 0.5rem 0.8rem;
  border-radius: 12px;
}
.user-icon {
  font-size: 20px;
  margin-right: 0.6rem;
  color: #4ade80;
}
.comment-input input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
}
.attach-icon {
  color: #ccc;
  margin-left: 0.6rem;
}

</style>
