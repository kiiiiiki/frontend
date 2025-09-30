<template>
  <div class="space-y-6 p-4">
    <PriceTrendCharts />
    <BestDealSticky />
    <ReportsFAB />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePriceStore } from '@/stores/priceStore'
import PriceTrendCharts from './PriceTrendCharts.vue'
import BestDealSticky from './BestDealSticky.vue'
import ReportsFAB from './ReportsFAB.vue'

const store = usePriceStore()
onMounted(()=> store.bootstrap())
</script>
