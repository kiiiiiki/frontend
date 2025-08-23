<template>
  <div class="integrations-manager">
    <!-- Header -->
    <div class="header">
      <button class="back-btn" @click="goBack">
        <i class="fas fa-chevron-left"></i> Back
      </button>
      <h1 class="title">연동/권한 관리</h1>
      <button class="help-btn" @click="showHelpModal = true">
        <i class="fas fa-question-circle"></i>
      </button>
    </div>

    <!-- Permissions Overview -->
    <div class="permissions-overview">
      <h2>권한 상태</h2>
      <div class="permission-grid">
        <div 
          v-for="permission in permissions" 
          :key="permission.id"
          class="permission-card"
          :class="{ active: permission.enabled }"
        >
          <div class="permission-icon">
            <i :class="permission.icon" :style="{ color: permission.color }"></i>
          </div>
          <div class="permission-info">
            <h3>{{ permission.name }}</h3>
            <p>{{ permission.description }}</p>
            <span class="status" :class="{ enabled: permission.enabled }">
              {{ permission.enabled ? '허용됨' : '거부됨' }}
            </span>
          </div>
          <div class="permission-toggle">
            <label class="switch">
              <input 
                type="checkbox" 
                v-model="permission.enabled"
                @change="updatePermission(permission)"
              />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Connected Services -->
    <div class="connected-services">
      <h2>연동된 서비스</h2>
      <div class="services-list">
        <div 
          v-for="service in connectedServices" 
          :key="service.id"
          class="service-card"
        >
          <div class="service-icon">
            <img :src="service.logo" :alt="service.name" />
          </div>
          <div class="service-info">
            <h3>{{ service.name }}</h3>
            <p>{{ service.description }}</p>
            <span class="connected-date">{{ formatDate(service.connectedAt) }}부터 연동</span>
          </div>
          <div class="service-actions">
            <button class="settings-btn" @click="configureService(service)">
              <i class="fas fa-cog"></i>
            </button>
            <button class="disconnect-btn" @click="disconnectService(service)">
              연동 해제
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Available Services -->
    <div class="available-services">
      <h2>연동 가능한 서비스</h2>
      <div class="services-grid">
        <div 
          v-for="service in availableServices" 
          :key="service.id"
          class="available-service-card"
          @click="connectService(service)"
        >
          <div class="service-logo">
            <img :src="service.logo" :alt="service.name" />
          </div>
          <div class="service-details">
            <h3>{{ service.name }}</h3>
            <p>{{ service.description }}</p>
            <div class="service-benefits">
              <span v-for="benefit in service.benefits" :key="benefit" class="benefit-tag">
                {{ benefit }}
              </span>
            </div>
          </div>
          <div class="connect-btn">
            <i class="fas fa-plus"></i>
            연동하기
          </div>
        </div>
      </div>
    </div>

    <!-- Data Usage -->
    <div class="data-usage">
      <h2>데이터 사용량</h2>
      <div class="usage-stats">
        <div class="usage-item">
          <div class="usage-label">건강 데이터</div>
          <div class="usage-bar">
            <div class="usage-progress" style="width: 65%"></div>
          </div>
          <div class="usage-value">65% 사용</div>
        </div>
        <div class="usage-item">
          <div class="usage-label">금융 데이터</div>
          <div class="usage-bar">
            <div class="usage-progress" style="width: 40%"></div>
          </div>
          <div class="usage-value">40% 사용</div>
        </div>
        <div class="usage-item">
          <div class="usage-label">캘린더 데이터</div>
          <div class="usage-bar">
            <div class="usage-progress" style="width: 80%"></div>
          </div>
          <div class="usage-value">80% 사용</div>
        </div>
      </div>
    </div>

    <!-- Help Modal -->
    <div v-if="showHelpModal" class="modal-overlay" @click.self="showHelpModal = false">
      <div class="modal help-modal">
        <h3>권한 및 연동 도움말</h3>
        <div class="help-content">
          <div class="help-section">
            <h4>권한이란?</h4>
            <p>앱이 귀하의 개인 정보에 접근할 수 있는 허가입니다. 언제든지 변경할 수 있습니다.</p>
          </div>
          <div class="help-section">
            <h4>안전한 연동</h4>
            <p>모든 연동 서비스는 OAuth 2.0 표준을 사용하여 안전하게 보호됩니다.</p>
          </div>
          <div class="help-section">
            <h4>데이터 보호</h4>
            <p>개인 데이터는 암호화되어 저장되며, 제3자와 공유되지 않습니다.</p>
          </div>
        </div>
        <button class="close-help-btn" @click="showHelpModal = false">확인</button>
      </div>
    </div>

    <!-- Service Configuration Modal -->
    <div v-if="showConfigModal" class="modal-overlay" @click.self="showConfigModal = false">
      <div class="modal config-modal">
        <h3>{{ selectedService?.name }} 설정</h3>
        <div class="config-options">
          <div class="config-item">
            <label>동기화 빈도</label>
            <select v-model="serviceConfig.syncFrequency">
              <option value="realtime">실시간</option>
              <option value="hourly">1시간마다</option>
              <option value="daily">매일</option>
              <option value="weekly">매주</option>
            </select>
          </div>
          <div class="config-item">
            <label>데이터 범위</label>
            <div class="checkbox-group">
              <label v-for="option in serviceConfig.dataTypes" :key="option.id" class="checkbox-label">
                <input type="checkbox" v-model="option.enabled" />
                {{ option.name }}
              </label>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="cancel-btn" @click="showConfigModal = false">취소</button>
          <button class="save-btn" @click="saveServiceConfig">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useNavigation } from '../composables/useRouter'
import { useUserStore } from '../stores/user'
import { formatDate } from '../utils/common'

const { goBack } = useNavigation()
const userStore = useUserStore()

const showHelpModal = ref(false)
const showConfigModal = ref(false)
const selectedService = ref(null)

interface Permission {
  id: string
  name: string
  description: string
  icon: string
  color: string
  enabled: boolean
}

interface ConnectedService {
  id: string
  name: string
  description: string
  logo: string
  connectedAt: Date
  status: 'active' | 'inactive' | 'error'
}

interface AvailableService {
  id: string
  name: string
  description: string
  logo: string
  benefits: string[]
  category: string
}

const permissions = ref<Permission[]>([
  {
    id: 'health',
    name: '개인 건강정보',
    description: '건강 데이터 및 의료 정보에 접근',
    icon: 'fas fa-heartbeat',
    color: '#f44336',
    enabled: userStore.userSettings.permissions.healthInfo
  },
  {
    id: 'finance',
    name: '금융정보',
    description: '예산, 소비패턴, 금융 데이터 접근',
    icon: 'fas fa-wallet',
    color: '#4caf50',
    enabled: userStore.userSettings.permissions.financialInfo
  },
  {
    id: 'calendar',
    name: '캘린더 및 위치',
    description: '일정 정보와 위치 데이터 접근',
    icon: 'fas fa-calendar-alt',
    color: '#2196f3',
    enabled: userStore.userSettings.permissions.calendarLocation
  },
  {
    id: 'social',
    name: '소셜 계정',
    description: '소셜 미디어 계정 연동',
    icon: 'fas fa-users',
    color: '#9c27b0',
    enabled: userStore.userSettings.permissions.socialAccounts
  }
])

const connectedServices = ref<ConnectedService[]>([
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: '일정 동기화 및 알림',
    logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
    connectedAt: new Date('2024-08-01'),
    status: 'active'
  },
  {
    id: 'samsung-health',
    name: 'Samsung Health',
    description: '건강 데이터 수집',
    logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991154.png',
    connectedAt: new Date('2024-07-15'),
    status: 'active'
  }
])

const availableServices = ref<AvailableService[]>([
  {
    id: 'apple-health',
    name: 'Apple Health',
    description: '포괄적인 건강 데이터 동기화',
    logo: 'https://cdn-icons-png.flaticon.com/512/731/731985.png',
    benefits: ['심박수', '걸음수', '수면패턴'],
    category: 'health'
  },
  {
    id: 'kakao-bank',
    name: 'KakaoBank',
    description: '계좌 잔액 및 거래내역',
    logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968534.png',
    benefits: ['계좌조회', '거래내역', '카드사용'],
    category: 'finance'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: '음악 취향 분석',
    logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111624.png',
    benefits: ['음악분석', '기분추적', '활동추천'],
    category: 'lifestyle'
  },
  {
    id: 'netflix',
    name: 'Netflix',
    description: '시청 패턴 분석',
    logo: 'https://cdn-icons-png.flaticon.com/512/5977/5977590.png',
    benefits: ['콘텐츠추천', '시청시간', '선호장르'],
    category: 'entertainment'
  }
])

const serviceConfig = reactive({
  syncFrequency: 'daily',
  dataTypes: [
    { id: 'basic', name: '기본 정보', enabled: true },
    { id: 'detailed', name: '상세 데이터', enabled: false },
    { id: 'history', name: '이력 데이터', enabled: true }
  ]
})

const updatePermission = (permission: Permission) => {
  const permissionMap = {
    'health': 'healthInfo',
    'finance': 'financialInfo',
    'calendar': 'calendarLocation',
    'social': 'socialAccounts'
  } as const

  const key = permissionMap[permission.id as keyof typeof permissionMap]
  if (key) {
    userStore.updatePermissions({ [key]: permission.enabled })
  }
}

const connectService = (service: AvailableService) => {
  console.log('Connecting to service:', service.name)
  // TODO: Implement OAuth flow
  alert(`${service.name} 연동을 시작합니다. (구현 예정)`)
}

const disconnectService = (service: ConnectedService) => {
  if (confirm(`${service.name} 연동을 해제하시겠습니까?`)) {
    const index = connectedServices.value.findIndex(s => s.id === service.id)
    if (index !== -1) {
      connectedServices.value.splice(index, 1)
      alert(`${service.name} 연동이 해제되었습니다.`)
    }
  }
}

const configureService = (service: ConnectedService) => {
  selectedService.value = service
  showConfigModal.value = true
}

const saveServiceConfig = () => {
  console.log('Saving service config:', serviceConfig)
  alert('설정이 저장되었습니다.')
  showConfigModal.value = false
}
</script>

<style scoped>
.integrations-manager {
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

.back-btn, .help-btn {
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
.permissions-overview,
.connected-services,
.available-services,
.data-usage {
  margin-bottom: var(--spacing-2xl);
}

.permissions-overview h2,
.connected-services h2,
.available-services h2,
.data-usage h2 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-lg);
  color: var(--text-secondary);
}

/* Permissions */
.permission-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.permission-card {
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  border: 2px solid transparent;
  transition: border-color var(--transition-fast);
}

.permission-card.active {
  border-color: var(--accent-green);
}

.permission-icon {
  font-size: var(--font-size-2xl);
  width: 60px;
  text-align: center;
}

.permission-info {
  flex: 1;
}

.permission-info h3 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-size-lg);
}

.permission-info p {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.status {
  font-size: var(--font-size-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  background-color: var(--accent-red);
  color: white;
}

.status.enabled {
  background-color: var(--accent-green);
  color: var(--text-dark);
}

/* Switch Toggle */
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

/* Services */
.services-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.service-card {
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.service-icon img {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-sm);
}

.service-info {
  flex: 1;
}

.service-info h3 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-size-lg);
}

.service-info p {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.connected-date {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.service-actions {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

.settings-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: var(--font-size-lg);
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.settings-btn:hover {
  background-color: var(--secondary-bg);
  color: var(--text-primary);
}

.disconnect-btn {
  background-color: var(--accent-red);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.disconnect-btn:hover {
  background-color: #d32f2f;
}

/* Available Services */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-md);
}

.available-service-card {
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: transform var(--transition-fast);
  border: 2px solid transparent;
}

.available-service-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-green);
  box-shadow: var(--shadow-lg);
}

.service-logo {
  text-align: center;
  margin-bottom: var(--spacing-md);
}

.service-logo img {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-md);
}

.service-details h3 {
  text-align: center;
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
}

.service-details p {
  text-align: center;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-md);
}

.service-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  justify-content: center;
  margin-bottom: var(--spacing-md);
}

.benefit-tag {
  background-color: var(--accent-green);
  color: var(--text-dark);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 500;
}

.connect-btn {
  text-align: center;
  color: var(--accent-green);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

/* Data Usage */
.usage-stats {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.usage-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.usage-label {
  width: 120px;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.usage-bar {
  flex: 1;
  height: 8px;
  background-color: var(--card-bg);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.usage-progress {
  height: 100%;
  background-color: var(--accent-green);
  transition: width var(--transition-normal);
}

.usage-value {
  width: 80px;
  text-align: right;
  font-size: var(--font-size-sm);
  font-weight: 600;
}

/* Modals */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-modal);
}

.modal {
  background-color: var(--secondary-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal h3 {
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.help-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.help-section h4 {
  color: var(--accent-green);
  margin-bottom: var(--spacing-sm);
}

.help-section p {
  color: var(--text-secondary);
  line-height: 1.5;
}

.close-help-btn {
  width: 100%;
  background-color: var(--accent-green);
  color: var(--text-dark);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  font-weight: 600;
  cursor: pointer;
  margin-top: var(--spacing-lg);
}

/* Config Modal */
.config-options {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.config-item label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
  color: var(--text-secondary);
}

.config-item select {
  width: 100%;
  background-color: var(--card-bg);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  color: var(--text-primary);
  font-size: var(--font-size-base);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
}

.modal-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-top: var(--spacing-xl);
}

.cancel-btn, .save-btn {
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
}

.cancel-btn {
  background-color: var(--text-muted);
  color: var(--text-primary);
}

.save-btn {
  background-color: var(--accent-green);
  color: var(--text-dark);
}
</style>