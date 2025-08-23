<template>
  <div class="profile-edit">
    <!-- Header -->
    <div class="header">
      <button class="back-btn" @click="goBack">
        <i class="fas fa-chevron-left"></i> Back
      </button>
      <h1 class="title">프로필 수정</h1>
      <button class="save-btn" @click="saveProfile" :disabled="!hasChanges">저장</button>
    </div>

    <!-- Profile Picture -->
    <div class="profile-picture-section">
      <div class="avatar-container">
        <img :src="profileData.avatar || IMAGES.AVATAR_MALE" alt="Profile" class="avatar" />
        <button class="change-photo-btn" @click="changePhoto">
          <i class="fas fa-camera"></i>
        </button>
      </div>
    </div>

    <!-- Profile Form -->
    <div class="form-section">
      <div class="input-group">
        <label>이름</label>
        <input 
          type="text" 
          v-model="profileData.fullName" 
          placeholder="이름을 입력하세요"
          @input="markAsChanged"
        />
        <div v-if="getErrorsForField('fullName').length" class="error-messages">
          <span v-for="error in getErrorsForField('fullName')" :key="error" class="error">{{ error }}</span>
        </div>
      </div>

      <div class="input-group">
        <label>사용자명</label>
        <input 
          type="text" 
          v-model="profileData.username" 
          placeholder="사용자명을 입력하세요"
          @input="markAsChanged"
        />
        <div v-if="getErrorsForField('username').length" class="error-messages">
          <span v-for="error in getErrorsForField('username')" :key="error" class="error">{{ error }}</span>
        </div>
      </div>

      <div class="input-group">
        <label>전화번호</label>
        <input 
          type="tel" 
          v-model="profileData.phone" 
          placeholder="+82 10 1234 5678"
          @input="markAsChanged"
        />
        <div v-if="getErrorsForField('phone').length" class="error-messages">
          <span v-for="error in getErrorsForField('phone')" :key="error" class="error">{{ error }}</span>
        </div>
      </div>

      <div class="input-group">
        <label>이메일</label>
        <input 
          type="email" 
          v-model="profileData.email" 
          placeholder="example@email.com"
          @input="markAsChanged"
        />
        <div v-if="getErrorsForField('email').length" class="error-messages">
          <span v-for="error in getErrorsForField('email')" :key="error" class="error">{{ error }}</span>
        </div>
      </div>
    </div>

    <!-- Delete Account Section -->
    <div class="danger-zone">
      <h3>위험 구역</h3>
      <button class="delete-account-btn" @click="showDeleteConfirm">
        <i class="fas fa-trash"></i>
        계정 삭제
      </button>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="showDeleteModal = false">
      <div class="modal">
        <h3>계정을 정말 삭제하시겠습니까?</h3>
        <p>이 작업은 되돌릴 수 없습니다. 모든 데이터가 영구적으로 삭제됩니다.</p>
        <div class="modal-actions">
          <button class="cancel-btn" @click="showDeleteModal = false">취소</button>
          <button class="confirm-delete-btn" @click="deleteAccount">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useNavigation } from '../composables/useRouter'
import { useValidation } from '../composables/useValidation'
import { useUserStore } from '../stores/user'
import { IMAGES } from '../constants/images'
import { isValidEmail } from '../utils/common'

const { goBack } = useNavigation()
const { validateForm, getErrorsForField, clearErrors } = useValidation()
const userStore = useUserStore()

const profileData = reactive({
  fullName: userStore.userInfo.fullName,
  username: userStore.userInfo.username,
  phone: userStore.userInfo.phone,
  email: userStore.userInfo.email,
  avatar: userStore.userInfo.avatar
})

const hasChanges = ref(false)
const showDeleteModal = ref(false)

const markAsChanged = () => {
  hasChanges.value = true
  clearErrors()
}

const changePhoto = () => {
  // TODO: Implement photo upload functionality
  console.log('Change photo clicked')
  // For now, cycle through some predefined avatars
  const avatars = [
    IMAGES.AVATAR_MALE,
    IMAGES.AVATAR_LION,
    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
  ]
  const currentIndex = avatars.indexOf(profileData.avatar)
  const nextIndex = (currentIndex + 1) % avatars.length
  profileData.avatar = avatars[nextIndex]
  markAsChanged()
}

const saveProfile = () => {
  const isValid = validateForm({
    fullName: {
      value: profileData.fullName,
      rules: { required: true, minLength: 2, message: '이름을 2자 이상 입력해주세요.' }
    },
    username: {
      value: profileData.username,
      rules: { required: true, minLength: 3, message: '사용자명을 3자 이상 입력해주세요.' }
    },
    phone: {
      value: profileData.phone,
      rules: { required: true, minLength: 10, message: '올바른 전화번호를 입력해주세요.' }
    },
    email: {
      value: profileData.email,
      rules: { 
        required: true, 
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        message: '올바른 이메일 주소를 입력해주세요.' 
      }
    }
  })

  if (isValid) {
    userStore.updateUserInfo(profileData)
    hasChanges.value = false
    alert('프로필이 성공적으로 저장되었습니다.')
  }
}

const showDeleteConfirm = () => {
  showDeleteModal.value = true
}

const deleteAccount = () => {
  // TODO: Implement actual account deletion
  console.log('Account deletion requested')
  alert('계정 삭제 기능은 아직 구현되지 않았습니다.')
  showDeleteModal.value = false
}
</script>

<style scoped>
.profile-edit {
  background-color: var(--primary-bg);
  color: var(--text-primary);
  font-family: var(--font-family);
  min-height: 100vh;
  padding: var(--spacing-md);
  padding-bottom: 100px;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.back-btn, .save-btn {
  background: none;
  border: none;
  color: var(--accent-yellow);
  font-size: var(--font-size-base);
  cursor: pointer;
  padding: var(--spacing-sm);
}

.save-btn {
  background-color: var(--accent-green);
  color: var(--text-dark);
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: background-color var(--transition-fast);
}

.save-btn:hover:not(:disabled) {
  background-color: var(--accent-green-hover);
}

.save-btn:disabled {
  background-color: var(--text-muted);
  cursor: not-allowed;
}

.title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin: 0;
}

/* Profile Picture */
.profile-picture-section {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-2xl);
}

.avatar-container {
  position: relative;
  display: inline-block;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 4px solid var(--accent-green);
}

.change-photo-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background-color: var(--accent-green);
  border: none;
  color: var(--text-dark);
  font-size: var(--font-size-lg);
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.change-photo-btn:hover {
  transform: scale(1.1);
}

/* Form */
.form-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: var(--font-size-base);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  color: var(--text-secondary);
}

.input-group input {
  background-color: var(--card-bg);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  color: var(--text-primary);
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  transition: border-color var(--transition-fast);
}

.input-group input:focus {
  outline: none;
  border-color: var(--accent-green);
}

.input-group input::placeholder {
  color: var(--text-muted);
}

.error-messages {
  margin-top: var(--spacing-xs);
}

.error {
  color: var(--accent-red);
  font-size: var(--font-size-xs);
  display: block;
}

/* Danger Zone */
.danger-zone {
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--accent-red);
}

.danger-zone h3 {
  color: var(--accent-red);
  font-size: var(--font-size-lg);
  margin: 0 0 var(--spacing-md) 0;
}

.delete-account-btn {
  background-color: var(--accent-red);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition: background-color var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.delete-account-btn:hover {
  background-color: #d32f2f;
}

/* Modal */
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
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.modal h3 {
  color: var(--accent-red);
  margin-bottom: var(--spacing-md);
}

.modal p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

.cancel-btn, .confirm-delete-btn {
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.cancel-btn {
  background-color: var(--text-muted);
  color: var(--text-primary);
}

.cancel-btn:hover {
  background-color: var(--card-bg);
}

.confirm-delete-btn {
  background-color: var(--accent-red);
  color: white;
}

.confirm-delete-btn:hover {
  background-color: #d32f2f;
}
</style>