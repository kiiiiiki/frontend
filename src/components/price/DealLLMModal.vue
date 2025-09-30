<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-gray-900 text-white p-6 rounded-xl w-[90%] max-w-lg">
      <header class="flex justify-between mb-2">
        <h4 class="font-bold">{{ deal.market }} · {{ deal.item }}</h4>
        <button @click="$emit('close')">✕</button>
      </header>
      <p class="text-sm text-gray-400 mb-3">가격: {{ deal.price.toLocaleString() }}원 · 할인 {{ deal.discountPct || 0 }}%</p>
      <pre class="whitespace-pre-wrap text-sm bg-gray-800 p-3 rounded">{{ reason }}</pre>
      <footer class="mt-3 text-right">
        <button class="bg-blue-600 px-3 py-1 rounded" @click="$emit('close')">확인</button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Deal } from '@/utils/priceService'
defineProps<{ deal: Deal; reason: string }>()
defineEmits(['close'])
</script>
