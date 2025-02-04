<template>
  <div class="page-content">
    <h2>{{ $t('purchase.purchaseTitle') }}</h2>

    <el-form :model="formData" :rules="rules" ref="formRef" label-position="top">
      <!-- Country/Region Selection -->
      <el-form-item :label="$t('purchase.country')" prop="country">
        <el-select 
          v-model="formData.country" 
          filterable 
          :placeholder="$t('purchase.selectCountry')"
          @change="handleCountryChange"
        >
          <el-option
            v-for="item in countries"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
            <span>{{ item.emoji }} {{ item.name }}</span>
          </el-option>
        </el-select>
      </el-form-item>

      <!-- Plan Type -->
      <el-form-item :label="$t('purchase.planType')" prop="planType">
        <el-radio-group v-model="formData.planType" @change="handlePlanTypeChange">
          <el-radio-button label="unlimited">{{ $t('purchase.unlimited') }}</el-radio-button>
          <el-radio-button label="data">{{ $t('purchase.dataLimit') }}</el-radio-button>
          <el-radio-button label="daily">{{ $t('purchase.daily') }}</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <!-- Duration -->
      <el-form-item :label="$t('purchase.duration')" prop="duration">
        <el-select 
          v-model="formData.duration" 
          :placeholder="$t('purchase.selectDuration')"
          @change="handleDurationChange"
        >
          <el-option
            v-for="day in availableDurations"
            :key="day"
            :label="`${day} ${$t('purchase.days')}`"
            :value="day"
          />
        </el-select>
      </el-form-item>

      <!-- Data Amount -->
      <el-form-item :label="$t('purchase.dataAmount')" prop="dataAmount" v-if="formData.planType === 'data'">
        <el-select 
          v-model="formData.dataAmount" 
          :placeholder="$t('purchase.selectData')"
          @change="calculatePrice"
        >
          <el-option
            v-for="amount in dataAmounts"
            :key="amount"
            :label="`${amount}GB`"
            :value="amount"
          />
        </el-select>
      </el-form-item>

      <!-- Quantity -->
      <el-form-item :label="$t('purchase.quantity')" prop="quantity">
        <el-input-number 
          v-model="formData.quantity" 
          :min="1" 
          :max="10"
          @change="calculatePrice"
        />
      </el-form-item>

      <!-- Total Price -->
      <div class="price-section">
        <h3>{{ $t('purchase.totalPrice') }}</h3>
        <div class="total-price">{{ formatPrice(totalPrice) }}</div>
      </div>

      <!-- Purchase Buttons -->
      <div class="purchase-actions">
        <el-button 
          type="primary" 
          :loading="loading"
          @click="handleDirectPurchase"
          v-if="hasBalance"
        >
          {{ $t('purchase.purchaseWithBalance') }}
        </el-button>
        
        <el-button 
          type="success" 
          @click="redirectToOfficialSite"
        >
          {{ $t('purchase.purchaseOnOfficial') }}
        </el-button>
      </div>
    </el-form>

    <!-- QR Code Dialog -->
    <el-dialog
      v-model="qrDialogVisible"
      :title="$t('purchase.scanQRCode')"
      width="300px"
      center
    >
      <div class="qr-container">
        <qrcode-vue :value="qrCodeValue" :size="200" level="H" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import QrcodeVue from 'qrcode.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const formRef = ref<FormInstance>()
const loading = ref(false)
const qrDialogVisible = ref(false)
const qrCodeValue = ref('')

// Mock data - Replace with actual API data
const countries = [
  { code: 'JP', name: 'Japan', emoji: '🇯🇵' },
  { code: 'US', name: 'United States', emoji: '🇺🇸' },
  // Add more countries
]

const formData = reactive({
  country: '',
  planType: '',
  duration: '',
  dataAmount: '',
  quantity: 1
})

const rules = reactive<FormRules>({
  country: [{ required: true, message: t('purchase.required'), trigger: 'change' }],
  planType: [{ required: true, message: t('purchase.required'), trigger: 'change' }],
  duration: [{ required: true, message: t('purchase.required'), trigger: 'change' }],
  quantity: [{ required: true, message: t('purchase.required'), trigger: 'change' }]
})

// Mock data - Replace with dynamic data based on selections
const availableDurations = computed(() => {
  return formData.planType === 'daily' ? [1, 3, 5, 7, 15, 30] : [7, 15, 30, 90]
})

const dataAmounts = [1, 3, 5, 10, 20, 50]

const totalPrice = ref(0)
const hasBalance = ref(true) // Replace with actual balance check

const calculatePrice = () => {
  // Implement price calculation logic based on selections
  // This is just a mock calculation
  const basePrice = 10
  const durationMultiplier = formData.duration || 1
  const quantityMultiplier = formData.quantity || 1
  totalPrice.value = basePrice * durationMultiplier * quantityMultiplier
}

const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`
}

const handleCountryChange = () => {
  // Reset dependent fields and recalculate price
  formData.planType = ''
  formData.duration = ''
  formData.dataAmount = ''
  calculatePrice()
}

const handlePlanTypeChange = () => {
  // Reset dependent fields and recalculate price
  formData.duration = ''
  formData.dataAmount = ''
  calculatePrice()
}

const handleDurationChange = () => {
  calculatePrice()
}

const handleDirectPurchase = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true
    
    // Implement purchase logic here
    // Mock API call
    setTimeout(() => {
      qrCodeValue.value = 'https://example.com/esim-purchase'
      qrDialogVisible.value = true
      loading.value = false
    }, 1000)
  } catch (error) {
    console.error('Validation failed:', error)
  }
}

const redirectToOfficialSite = () => {
  // Implement redirect logic with current selection parameters
  window.open('https://official-esim-site.com', '_blank')
}
</script>

<style lang="scss" scoped>
.page-content {
  h2 {
    margin-bottom: 20px;
  }
  .el-form-item {
    margin-bottom: 20px;
  }

  .price-section {
    margin: 20px 0;
    text-align: center;
    
    .total-price {
      font-size: 24px;
      font-weight: bold;
      color: var(--el-color-primary);
    }
  }

  .purchase-actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }

  .qr-container {
    display: flex;
    justify-content: center;
    padding: 20px;
  }
}
</style>