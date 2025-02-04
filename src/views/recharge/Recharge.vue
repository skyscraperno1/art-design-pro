<template>
  <div>
    <!-- 余额卡片 -->
    <div class="balance-card box-style">
      <div class="balance-content">
        <div class="balance-label">{{ $t('recharge.balance') }}</div>
        <div class="balance-amount">¥ {{ userBalance }}</div>
      </div>
    </div>

    <!-- 充值记录表格 -->
    <div class="history-card box-style">
      <div class="title">
        <span>{{ $t('recharge.history.title') }}</span>
      </div>
      
      <el-table
        :data="tableData"
        style="width: 100%"
        :empty-text="$t('common.tips')"
      >
        <el-table-column
          :label="$t('recharge.history.time')"
          prop="time"
          width="200"
        />
        <el-table-column
          :label="$t('recharge.history.amount')"
          width="150"
        >
          <template #default="{ row }">
            <span>¥ {{ row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('recharge.history.method')"
        >
          <template #default="{ row }">
            <span>{{ $t(`recharge.history.methods.${row.method}`) }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <!-- 消费记录表格 -->
    <div class="history-card box-style">
      <div class="title">
        <span>{{ $t('recharge.consumption.title') }}</span>
      </div>
      
      <el-table
        :data="consumptionData"
        style="width: 100%"
        :empty-text="$t('common.tips')"
      >
        <el-table-column
          :label="$t('recharge.consumption.time')"
          prop="time"
          width="200"
        />
        <el-table-column
          :label="$t('recharge.consumption.amount')"
          width="150"
        >
          <template #default="{ row }">
            <span class="consumption-amount">-¥ {{ row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('recharge.consumption.type')"
          prop="type"
        >
          <template #default="{ row }">
            <span>{{ $t(`recharge.consumption.types.${row.type}`) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('recharge.consumption.description')"
          prop="description"
        />
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="consumptionCurrentPage"
          v-model:page-size="consumptionPageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          :total="consumptionTotal"
          @size-change="handleConsumptionSizeChange"
          @current-change="handleConsumptionCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 用户余额
const userBalance = ref(1000.00)

// 表格数据
const tableData = ref([
  {
    time: '2024-03-20 15:30:00',
    amount: 100.00,
    method: 'alipay'
  },
  {
    time: '2024-03-19 10:15:00',
    amount: 200.00,
    method: 'wechat'
  },
  {
    time: '2024-03-18 09:00:00',
    amount: 500.00,
    method: 'card'
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100) // 总数据量，实际应从API获取

// 分页处理函数
const handleSizeChange = (val: number) => {
  pageSize.value = val
  // 这里应该调用获取数据的API
  console.log('Page size changed to:', val)
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  // 这里应该调用获取数据的API
  console.log('Current page changed to:', val)
}

// 消费记录数据
const consumptionData = ref([
  {
    time: '2024-03-20 16:30:00',
    amount: 50.00,
    type: 'service',
    description: '购买卡CJIODNFIOSN'
  },
  {
    time: '2024-03-19 14:15:00',
    amount: 30.00,
    type: 'subscription',
    description: '月度订阅费用'
  },
  {
    time: '2024-03-18 11:00:00',
    amount: 20.00,
    type: 'other',
    description: '其他费用'
  }
])

// 消费记录分页相关
const consumptionCurrentPage = ref(1)
const consumptionPageSize = ref(10)
const consumptionTotal = ref(100)

// 消费记录分页处理函数
const handleConsumptionSizeChange = (val: number) => {
  consumptionPageSize.value = val
  // 这里应该调用获取数据的API
  console.log('Consumption page size changed to:', val)
}

const handleConsumptionCurrentChange = (val: number) => {
  consumptionCurrentPage.value = val
  // 这里应该调用获取数据的API
  console.log('Consumption current page changed to:', val)
}
</script>

<style lang="scss" scoped>
.page-content {
  padding: 20px;

  h2 {
    margin-bottom: 20px;
  }
}

.box-style {
  background: var(--art-main-bg-color);
  border: 1px solid var(--art-border-color);
  border-radius: var(--custom-radius);
}

.balance-card {
  margin-bottom: 20px;

  .balance-content {
    text-align: center;
    padding: 24px 0;

    .balance-label {
      font-size: 16px;
      color: var(--el-text-color-secondary);
      margin-bottom: 8px;
    }

    .balance-amount {
      font-size: 32px;
      font-weight: bold;
      color: var(--el-color-primary);
    }
  }
}

.history-card {
  margin-bottom: 20px;
  padding-bottom: 14px;
  .title {
    padding: 15px 25px;
    font-size: 20px;
    font-weight: 400;
    color: var(--art-text-gray-800);
    border-bottom: 1px solid var(--art-border-color);
  }
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.consumption-amount {
  color: var(--el-color-danger);
}
</style>