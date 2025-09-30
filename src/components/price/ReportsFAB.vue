<template>
  <button class="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-gray-900 text-white flex items-center justify-center text-xl shadow-lg z-40"
    @click="open=true">📄</button>
  <ReportListPanel v-if="open" @close="open=false"/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ReportListPanel from './ReportListPanel.vue'
const open = ref(false)
</script>
