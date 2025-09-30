<template>
  <div class="fixed inset-0 bg-black/40 flex justify-end z-50" @click.self="$emit('close')">
    <aside class="bg-gray-900 text-white w-[90%] max-w-md h-full p-4">
      <header class="flex justify-between mb-3">
        <strong>저장된 보고서</strong>
        <div class="flex gap-2">
          <button class="bg-gray-700 px-2 py-1 rounded" @click="gen('daily')">일일</button>
          <button class="bg-gray-700 px-2 py-1 rounded" @click="gen('weekly')">주간</button>
          <button class="text-gray-400" @click="$emit('close')">✕</button>
        </div>
      </header>
      <ul class="space-y-2">
        <li v-for="r in store.reports" :key="r.id" class="flex justify-between items-center bg-gray-800 p-2 rounded">
          <span>{{ r.date }} · {{ r.type==='daily'?'일일':'주간' }}</span>
          <a v-if="r.url" :href="r.url" target="_blank" class="text-blue-400">다운로드</a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { usePriceStore } from '@/stores/priceStore'
const store = usePriceStore()
async function gen(type:'daily'|'weekly'){ await store.saveReport(type) }
</script>
