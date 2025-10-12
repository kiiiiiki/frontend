<template>
  <div class="select-page">
    <div class="header">
      <span class="back" @click="goBack">← Back</span>
    </div>

    <h1 class="title">무슨 과일을 고를까요?</h1>
    <p class="sub">아래 10가지 과일 중 하나를 선택해 주세요.</p>

    <div class="grid">
      <button
        v-for="f in fruits"
        :key="f.value"
        :class="['chip', selected === f.value && 'active']"
        @click="selected = f.value"
      >
        {{ f.label }}
      </button>
    </div>

    <div class="footer">
      <button class="confirm" :disabled="!selected" @click="goPrice">
        {{ selected ? `${labelOf(selected)} 선택` : '과일 선택' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => router.go(-1)

const fruits = [
  { label: '딸기', value: '딸기' },
  { label: '방울토마토', value: '방울토마토' },
  { label: '복숭아', value: '복숭아' },
  { label: '샤인머스캣', value: '샤인머스캣' },
  { label: '바나나', value: '바나나' },
  { label: '배', value: '배' },
  { label: '감귤', value: '감귤' },
  { label: '파인애플', value: '파인애플' },
  { label: '망고', value: '망고' },
  { label: '오렌지', value: '오렌지' },
]

const selected = ref<string>('바나나')
const labelOf = (v:string) => fruits.find(x=>x.value===v)?.label || v

function goPrice() {
  router.push({ path: '/price', query: { fruit: selected.value } })
}
</script>

<style scoped>
.select-page{ background:#0f1e25; color:#fff; min-height:100vh; padding:1.5rem; box-sizing:border-box }
.header{ display:flex; margin-bottom:1rem; font-size:14px }
.back{ color:#ffc107; cursor:pointer }
.title{ font-size:24px; font-weight:800; margin:4px 0 6px }
.sub{ color:#cbd5e1; font-size:14px; margin-bottom:1rem }
.grid{
  display:grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap:.6rem;
}
.chip{
  background:#1e2e36;
  border:1px solid rgba(255,255,255,.08);
  color:#e5e7eb;
  border-radius:12px;
  padding:.9rem .8rem;
  text-align:center;
  font-weight:600;
}
.chip.active{ outline:2px solid #3dd598; }
.footer{ margin-top:1.2rem; display:flex; justify-content:flex-end }
.confirm{
  background:#ffc107; color:#0f1e25; font-weight:800;
  border-radius:12px; padding:.7rem 1.1rem;
}
.confirm:disabled{ background:#a1a1aa; color:#0f1e25; opacity:.6 }
</style>
