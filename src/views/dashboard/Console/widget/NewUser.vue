<template>
  <div class="region new-user art-custom-card">
    <div class="card-header">
      <div class="title">
        <h4 class="custom-text box-title">{{ $t('console.dashboard.inUse') }} ESIM</h4>
      </div>
    </div>
    <art-table :data="tableData" :pagination="false">
      <template #default>
        <el-table-column :label="$t('console.dynamic.user')" prop="username" width="150px">
        </el-table-column>
        <el-table-column :label="$t('console.dynamic.progress')" >
          <template #default="scope">
              <el-progress :percentage="scope.row.pro" :color="scope.row.color" :stroke-width="4" />
              <span style="white-space: nowrap">{{ scope.row.used }}G/{{ scope.row.total }}G</span>
          </template>
        </el-table-column>
      </template>
    </art-table>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, reactive } from 'vue-demi'
  import avatar1 from '@/assets/img/avatar/avatar1.jpg'
  import avatar2 from '@/assets/img/avatar/avatar2.jpg'
  import avatar3 from '@/assets/img/avatar/avatar3.jpg'
  import avatar4 from '@/assets/img/avatar/avatar4.jpg'
  import avatar5 from '@/assets/img/avatar/avatar5.jpg'
  import avatar6 from '@/assets/img/avatar/avatar6.jpg'

  const tableData = reactive([
    {
      username: 'Card1',
      percentage: 60,
      color: '#2C90FF !important',
      used: 15,
      total: 20
    },
    {
      username: 'Card2',
      percentage: 20,
      color: '#BC7FEB !important',
      used: 4,
      total: 20
    },
    {
      username: 'Card3',
      percentage: 60,
      color: '#95DE64 !important',
      used: 12,
      total: 20
    },
    {
      username: 'Card4',
      percentage: 50,
      color: '#B7CBE2 !important',
      used: 10,
      total: 20
    },
  ])

  onMounted(() => {
    addAnimation()
  })

  const addAnimation = () => {
    setTimeout(() => {
      for (let i = 0; i < tableData.length; i++) {
        let item = tableData[i]
        tableData[i].pro = item.percentage
      }
    }, 100)
  }
</script>

<style lang="scss">
  .region {
    // 进度动画
    .el-progress-bar__inner {
      transition: all 1s !important;
    }

    .el-radio-button__original-radio:checked + .el-radio-button__inner {
      color: var(--el-color-primary) !important;
      background: transparent !important;
    }

    .any-table {
      .el-table {
        thead {
          tr {
            height: 55px !important;
          }
        }

        tr {
          height: 55px !important;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .region {
    width: 50%;
    overflow: hidden;

    .any-table {
      box-shadow: none;
    }

    .card-header {
      padding-left: 25px !important;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 6px;
    }

    .user-name {
      margin-left: 10px;
    }
  }

  @media screen and (max-width: $device-notebook) {
    .region {
      width: 46%;
    }
  }
</style>
