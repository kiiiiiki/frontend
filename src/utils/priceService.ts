export type PricePoint = { date: string; value: number };
export type Deal = { id:string; market:string; item:string; unit:string; price:number; discountPct?:number; distanceKm?:number };

const delay = (ms:number)=> new Promise(r=>setTimeout(r, ms));

export const priceService = {
  async getWeeklyTrend(): Promise<PricePoint[]> {
    await delay(200);
    const base = 3200;
    return Array.from({length:14}, (_,i)=>({
      date: new Date(Date.now()-(13-i)*86400000).toISOString().slice(5,10),
      value: Math.round(base + Math.sin(i/2)*120 + (Math.random()*60-30))
    }));
  },
  async getYoYBars(): Promise<{ name:string; value:number }[]> {
    await delay(120);
    const current = 3150 + Math.round(Math.random()*120);
    const lastYear = 3350 + Math.round(Math.random()*120);
    return [{name:'작년', value:lastYear},{name:'현재', value:current}];
  },
  async getBestDeals(): Promise<Deal[]> {
    await delay(150);
    return [
      { id:'d1', market:'이마트', item:'사과', unit:'1kg', price:4980, discountPct:18, distanceKm:1.2 },
      { id:'d2', market:'홈플러스', item:'바나나', unit:'1kg', price:3980, discountPct:22, distanceKm:2.1 },
    ];
  },
  async listSavedReports(): Promise<{id:string; date:string; type:'daily'|'weekly'; url?:string}[]> {
    await delay(100);
    const key = 'reports-demo';
    const raw = localStorage.getItem(key);
    if(raw) return JSON.parse(raw);
    const seed = [{id:crypto.randomUUID(), date:'2025-09-29', type:'daily', url:'/sample.pdf'}];
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  },
  async saveReport(type:'daily'|'weekly'){
    await delay(300);
    const key = 'reports-demo';
    const list = await this.listSavedReports();
    const item = {id:crypto.randomUUID(), date:new Date().toISOString().slice(0,10), type, url:'/sample.pdf'};
    const next = [item, ...list];
    localStorage.setItem(key, JSON.stringify(next));
    return next;
  },
  async askLLMReason(deal: Deal){
    await delay(400);
    // 실제론 GPT/Gemini API 호출 위치
    return `**추천 이유**
- 가격: ${deal.price.toLocaleString()}원 (${deal.discountPct || 0}% 할인)
- 거리: 약 ${deal.distanceKm ?? 1.5}km
- 영양: 비타민C 충족, 당일 섭취량 기준 적정
- 예산 내 최저가이며 현재 수요 대비 재고 충분`;
  }
};
