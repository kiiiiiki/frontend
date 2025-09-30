<template>
  <transition name="slide-up">
    <div v-if="visible" class="fixed bottom-4 inset-x-4 z-40">
      <div class="flex justify-between items-center bg-yellow-300 text-black p-3 rounded-xl shadow-lg">
        <div class="text-sm font-medium">
          최적 구매처 제안
          <span v-if="deal"> · {{ deal.market }} {{ deal.item }} {{ deal.price.toLocaleString() }}원</span>
        </div>
        <div class="flex gap-2">
          <button class="px-3 py-1 rounded bg-black text-white" @click="openLLM">자세히</button>
          <button class="px-3 py-1 rounded bg-white" @click="visible=false">닫기</button>
        </div>
      </div>
    </div>
  </transition>

  <DealLLMModal v-if="showModal && deal" :deal="deal" :reason="store.llmReason" @close="showModal=false" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { usePriceStore } from '../../stores/priceStore'
import DealLLMModal from './DealLLMModal.vue'

const store = usePriceStore()
const visible = ref(false)
const showModal = ref(false)
const deal = computed(()=> store.deals[0])

function onScroll(){ visible.value = window.scrollY > 300 }
async function openLLM(){ if(deal.value){ await store.refreshLLM(deal.value); showModal.value=true } }

onMounted(()=> window.addEventListener('scroll', onScroll))
onUnmounted(()=> window.removeEventListener('scroll', onScroll))
</script>
