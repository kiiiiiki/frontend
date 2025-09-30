import { defineStore } from 'pinia'
import { priceService } from '@/utils/priceService'
import type { Deal, PricePoint } from '@/utils/priceService'

export const usePriceStore = defineStore('price', {
  state: () => ({
    weekly: [] as PricePoint[],
    yoy: [] as {name:string; value:number}[],
    deals: [] as Deal[],
    llmReason: '' as string,
    selectedDeal: null as Deal | null,
    reports: [] as {id:string; date:string; type:'daily'|'weekly'; url?:string}[],
    loading: false,
  }),
  actions: {
    async bootstrap(){
      this.loading = true;
      [this.weekly, this.yoy, this.deals, this.reports] = await Promise.all([
        priceService.getWeeklyTrend(),
        priceService.getYoYBars(),
        priceService.getBestDeals(),
        priceService.listSavedReports()
      ]);
      this.loading = false;
    },
    async refreshLLM(deal: Deal){
      this.llmReason = await priceService.askLLMReason(deal);
    },
    async saveReport(type:'daily'|'weekly'){
      this.reports = await priceService.saveReport(type);
    }
  }
})
