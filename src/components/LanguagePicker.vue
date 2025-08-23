<template>
  <div class="language-picker">
    <!-- Header -->
    <div class="header">
      <button class="back-btn" @click="goBack">
        <i class="fas fa-chevron-left"></i> Back
      </button>
      <h1 class="title">언어 변경하기</h1>
      <button class="reset-btn" @click="resetToDefault">초기화</button>
    </div>

    <!-- Current Language -->
    <div class="current-language">
      <h2>현재 언어</h2>
      <div class="language-card selected">
        <img :src="getCurrentLanguageFlag()" :alt="getCurrentLanguageName()" class="flag" />
        <div class="language-info">
          <h3>{{ getCurrentLanguageName() }}</h3>
          <p>{{ getCurrentLanguageNative() }}</p>
        </div>
        <i class="fas fa-check-circle check-icon"></i>
      </div>
    </div>

    <!-- Available Languages -->
    <div class="available-languages">
      <h2>사용 가능한 언어</h2>
      <div class="languages-list">
        <div 
          v-for="language in languages" 
          :key="language.code"
          class="language-card"
          :class="{ 
            selected: language.code === selectedLanguage,
            disabled: !language.available 
          }"
          @click="selectLanguage(language)"
        >
          <img :src="language.flag" :alt="language.name" class="flag" />
          <div class="language-info">
            <h3>{{ language.name }}</h3>
            <p>{{ language.nativeName }}</p>
            <span v-if="!language.available" class="coming-soon">{{ t('language.comingSoon') }}</span>
          </div>
          <div class="language-status">
            <i v-if="language.code === selectedLanguage" class="fas fa-check-circle check-icon"></i>
            <i v-else-if="!language.available" class="fas fa-clock pending-icon"></i>
            <div v-else class="select-circle"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Language Features -->
    <div class="language-features">
      <h2>언어별 지원 기능</h2>
      <div class="features-grid">
        <div class="feature-card">
          <i class="fas fa-microphone"></i>
          <h4>음성 인식</h4>
          <p>자연스러운 음성 명령</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-brain"></i>
          <h4>AI 대화</h4>
          <p>맥락을 이해하는 대화</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-globe"></i>
          <h4>지역 정보</h4>
          <p>현지화된 콘텐츠</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-calendar"></i>
          <h4>날짜 형식</h4>
          <p>지역별 날짜 표시</p>
        </div>
      </div>
    </div>

    <!-- Settings -->
    <div class="language-settings">
      <h2>언어 설정</h2>
      <div class="settings-list">
        <div class="setting-item">
          <div class="setting-info">
            <h4>자동 번역</h4>
            <p>외국어 콘텐츠 자동 번역</p>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="languageSettings.autoTranslate" />
            <span class="slider"></span>
          </label>
        </div>
        
        <div class="setting-item">
          <div class="setting-info">
            <h4>발음 도움말</h4>
            <p>어려운 단어 발음 가이드</p>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="languageSettings.pronunciationHelp" />
            <span class="slider"></span>
          </label>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>지역 방언</h4>
            <p>지역별 특색있는 표현 사용</p>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="languageSettings.dialectSupport" />
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </div>

    <!-- Download Languages -->
    <div class="download-section">
      <h2>오프라인 언어팩</h2>
      <p class="download-info">인터넷 연결 없이도 사용할 수 있는 언어팩을 다운로드하세요.</p>
      <div class="download-list">
        <div 
          v-for="pack in languagePacks" 
          :key="pack.code"
          class="download-item"
        >
          <div class="pack-info">
            <img :src="pack.flag" :alt="pack.name" class="pack-flag" />
            <div class="pack-details">
              <h4>{{ pack.name }}</h4>
              <p>{{ pack.size }} • {{ pack.features.join(', ') }}</p>
            </div>
          </div>
          <div class="pack-actions">
            <div v-if="pack.status === 'downloaded'" class="status downloaded">
              <i class="fas fa-check"></i>
              완료
            </div>
            <div v-else-if="pack.status === 'downloading'" class="status downloading">
              <i class="fas fa-download"></i>
              {{ pack.progress }}%
            </div>
            <button v-else class="download-btn" @click="downloadPack(pack)">
              <i class="fas fa-download"></i>
              다운로드
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Changes -->
    <div class="save-section">
      <button class="save-btn" @click="saveLanguageSettings" :disabled="!hasChanges">
        <i class="fas fa-save"></i>
        변경사항 저장
      </button>
      <p class="save-note">언어를 변경하면 앱이 다시 시작됩니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useNavigation } from '../composables/useRouter'
import { useUserStore } from '../stores/user'
import { IMAGES } from '../constants/images'
import { setLocale, type SupportedLocale } from '../i18n'

const { goBack } = useNavigation()
const userStore = useUserStore()
const { t, locale } = useI18n()

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  available: boolean
}

interface LanguagePack {
  code: string
  name: string
  flag: string
  size: string
  features: string[]
  status: 'available' | 'downloading' | 'downloaded'
  progress?: number
}

const selectedLanguage = ref<SupportedLocale>(locale.value as SupportedLocale)

const languages: Language[] = [
  {
    code: 'ko' as SupportedLocale,
    name: t('language.available') === 'Available Languages' ? 'Korean' : '한국어',
    nativeName: '한국어',
    flag: IMAGES.FLAG_KOREA,
    available: true
  },
  {
    code: 'en' as SupportedLocale,
    name: t('language.available') === 'Available Languages' ? 'English' : '영어',
    nativeName: 'English',
    flag: IMAGES.FLAG_USA,
    available: true
  },
  {
    code: 'nl' as SupportedLocale,
    name: t('language.available') === 'Available Languages' ? 'Dutch' : '네덜란드어',
    nativeName: 'Nederlands',
    flag: IMAGES.FLAG_NETHERLANDS,
    available: true
  },
  {
    code: 'es' as SupportedLocale,
    name: t('language.available') === 'Available Languages' ? 'Spanish' : '스페인어',
    nativeName: 'Español',
    flag: IMAGES.FLAG_SPAIN,
    available: true
  },
  {
    code: 'ja' as SupportedLocale,
    name: t('language.available') === 'Available Languages' ? 'Japanese' : '일본어',
    nativeName: '日本語',
    flag: 'https://flagcdn.com/w40/jp.png',
    available: false
  },
  {
    code: 'zh' as SupportedLocale,
    name: t('language.available') === 'Available Languages' ? 'Chinese' : '중국어',
    nativeName: '中文',
    flag: 'https://flagcdn.com/w40/cn.png',
    available: false
  },
  {
    code: 'de' as SupportedLocale,
    name: t('language.available') === 'Available Languages' ? 'German' : '독일어',
    nativeName: 'Deutsch',
    flag: 'https://flagcdn.com/w40/de.png',
    available: false
  },
  {
    code: 'fr' as SupportedLocale,
    name: t('language.available') === 'Available Languages' ? 'French' : '프랑스어',
    nativeName: 'Français',
    flag: 'https://flagcdn.com/w40/fr.png',
    available: false
  }
]

const languageSettings = reactive({
  autoTranslate: true,
  pronunciationHelp: false,
  dialectSupport: true
})

const languagePacks = ref<LanguagePack[]>([
  {
    code: 'ko',
    name: '한국어 고급팩',
    flag: IMAGES.FLAG_KOREA,
    size: '85MB',
    features: ['음성인식', 'TTS', '방언지원'],
    status: 'downloaded'
  },
  {
    code: 'en',
    name: '영어 프리미엄팩',
    flag: IMAGES.FLAG_USA,
    size: '120MB',
    features: ['음성인식', 'TTS', '의료용어'],
    status: 'available'
  },
  {
    code: 'nl',
    name: '네덜란드어 기본팩',
    flag: IMAGES.FLAG_NETHERLANDS,
    size: '95MB',
    features: ['음성인식', 'TTS'],
    status: 'downloading',
    progress: 45
  }
])

const hasChanges = computed(() => {
  return selectedLanguage.value !== locale.value
})

const getCurrentLanguageFlag = () => {
  const current = languages.find(lang => lang.code === locale.value)
  return current?.flag || IMAGES.FLAG_KOREA
}

const getCurrentLanguageName = () => {
  const current = languages.find(lang => lang.code === locale.value)
  return current?.name || 'Korean'
}

const getCurrentLanguageNative = () => {
  const current = languages.find(lang => lang.code === locale.value)
  return current?.nativeName || '한국어'
}

const selectLanguage = (language: Language) => {
  if (!language.available) return
  
  selectedLanguage.value = language.code
}

const resetToDefault = () => {
  selectedLanguage.value = 'ko'
  languageSettings.autoTranslate = true
  languageSettings.pronunciationHelp = false
  languageSettings.dialectSupport = true
}

const downloadPack = (pack: LanguagePack) => {
  pack.status = 'downloading'
  pack.progress = 0
  
  // Simulate download progress
  const interval = setInterval(() => {
    if (pack.progress !== undefined && pack.progress < 100) {
      pack.progress += Math.random() * 15
      if (pack.progress >= 100) {
        pack.progress = 100
        pack.status = 'downloaded'
        clearInterval(interval)
      }
    }
  }, 500)
}

const saveLanguageSettings = () => {
  // Apply the language change immediately
  setLocale(selectedLanguage.value)
  
  // Update user store
  userStore.setLanguage(selectedLanguage.value)
  
  // TODO: Save other language settings
  console.log('Language settings saved:', {
    language: selectedLanguage.value,
    settings: languageSettings
  })
  
  alert(t('language.saved'))
  
  // Navigate back to settings
  setTimeout(() => {
    goBack()
  }, 1000)
}
</script>

<style scoped>
.language-picker {
  background-color: var(--primary-bg);
  color: var(--text-primary);
  font-family: var(--font-family);
  min-height: 100vh;
  padding: var(--spacing-md);
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.back-btn, .reset-btn {
  background: none;
  border: none;
  color: var(--accent-yellow);
  font-size: var(--font-size-base);
  cursor: pointer;
  padding: var(--spacing-sm);
}

.title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin: 0;
}

/* Sections */
.current-language,
.available-languages,
.language-features,
.language-settings,
.download-section,
.save-section {
  margin-bottom: var(--spacing-2xl);
}

.current-language h2,
.available-languages h2,
.language-features h2,
.language-settings h2,
.download-section h2 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-lg);
  color: var(--text-secondary);
}

/* Language Cards */
.languages-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.language-card {
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  border: 2px solid transparent;
}

.language-card:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.language-card.selected {
  border-color: var(--accent-green);
  background-color: var(--secondary-bg);
}

.language-card.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.flag {
  width: 40px;
  height: 30px;
  border-radius: var(--radius-sm);
  object-fit: cover;
}

.language-info {
  flex: 1;
}

.language-info h3 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-size-lg);
}

.language-info p {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.coming-soon {
  background-color: var(--accent-yellow);
  color: var(--text-dark);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  margin-top: var(--spacing-xs);
  display: inline-block;
}

.language-status {
  display: flex;
  align-items: center;
}

.check-icon {
  color: var(--accent-green);
  font-size: var(--font-size-xl);
}

.pending-icon {
  color: var(--accent-yellow);
  font-size: var(--font-size-xl);
}

.select-circle {
  width: 24px;
  height: 24px;
  border: 2px solid var(--text-muted);
  border-radius: var(--radius-full);
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.feature-card {
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  text-align: center;
  transition: transform var(--transition-fast);
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-card i {
  font-size: var(--font-size-3xl);
  color: var(--accent-green);
  margin-bottom: var(--spacing-md);
}

.feature-card h4 {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: var(--font-size-lg);
}

.feature-card p {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

/* Settings */
.settings-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.setting-item {
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.setting-info h4 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-size-lg);
}

.setting-info p {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

/* Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--text-muted);
  transition: var(--transition-fast);
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: var(--transition-fast);
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--accent-green);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Download Section */
.download-info {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
  line-height: 1.5;
}

.download-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.download-item {
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pack-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex: 1;
}

.pack-flag {
  width: 32px;
  height: 24px;
  border-radius: var(--radius-sm);
  object-fit: cover;
}

.pack-details h4 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-size-base);
}

.pack-details p {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.pack-actions {
  display: flex;
  align-items: center;
}

.status {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.status.downloaded {
  color: var(--accent-green);
}

.status.downloading {
  color: var(--accent-yellow);
}

.download-btn {
  background-color: var(--accent-green);
  color: var(--text-dark);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: background-color var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.download-btn:hover {
  background-color: var(--accent-green-hover);
}

/* Save Section */
.save-section {
  text-align: center;
}

.save-btn {
  background-color: var(--accent-green);
  color: var(--text-dark);
  border: none;
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg) var(--spacing-2xl);
  font-size: var(--font-size-lg);
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.save-btn:hover:not(:disabled) {
  background-color: var(--accent-green-hover);
  transform: translateY(-2px);
}

.save-btn:disabled {
  background-color: var(--text-muted);
  cursor: not-allowed;
  transform: none;
}

.save-note {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin: 0;
}
</style>