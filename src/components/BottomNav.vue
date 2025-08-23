<template>
  <div class="bottom-nav">
    <i class="fas fa-home" :class="{ active: currentRoute === 'mainhome' }" @click="goToHome"></i>
    <i class="fas fa-microphone main-icon" :class="{ active: currentRoute === 'voicerecognition' }" @click="goToVoice"></i>
    <i class="fas fa-cog" :class="{ active: currentRoute === 'settings' }" @click="goToSettings"></i>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

const currentRoute = computed(() => route.name?.toString().toLowerCase() || '')

const goToHome = () => {
  router.push('/main_home')
}

const goToVoice = () => {
  router.push('/voice')
}

const goToSettings = () => {
  router.push('/settings')
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #14252f;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.8rem 0;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
}

.bottom-nav i {
  font-size: 20px;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s ease;
}

.bottom-nav i:hover {
  color: #3dd598;
}

.main-icon {
  font-size: 26px !important;
  color: #3dd598 !important;
}

.active {
  color: #3dd598 !important;
}
</style>