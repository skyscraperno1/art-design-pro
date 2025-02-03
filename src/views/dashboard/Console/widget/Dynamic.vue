<template>
  <div class="region dynamic art-custom-card">
    <div class="card-header">
      <div class="title">
        <h4 class="custom-text box-title">{{ $t('console.dynamic.member') }}</h4>
        <p class="custom-text subtitle">{{ $t('console.dynamic.total') }} <span>{{ num }}</span></p>
      </div>
    </div>
    <art-table :data="list" :pagination="false">
      <template #default>
        <el-table-column :label="$t('console.dynamic.user')" prop="username" width="150">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <img class="avatar" :src="scope.row.avatar" />
              <span class="user-name">{{ scope.row.username }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Remark" prop="type" />
      </template>
    </art-table>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue-demi'
  import avatar1 from '@/assets/img/avatar/avatar1.jpg'
  import avatar2 from '@/assets/img/avatar/avatar2.jpg'
  import avatar3 from '@/assets/img/avatar/avatar3.jpg'
  import avatar4 from '@/assets/img/avatar/avatar4.jpg'

  const num = 4

  const list = reactive([
    {
      username: '中小鱼',
      type: '',
      avatar: avatar1,
    },
    {
      username: '何小荷',
      type: '',
      avatar: avatar2,
    },
    {
      username: '誶誶淰',
      type: '',
      avatar: avatar3,
    },
    {
      username: '发呆草',
      type: '123',
      avatar: avatar4,
    },
  ])
</script>

<style lang="scss" scoped>
  .dynamic {
    box-sizing: border-box;
    flex: 1;
    padding: 0 25px;
    margin-left: var(--console-margin);

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 6px;
    }

    .user-name {
      margin-left: 10px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      padding: 20px 0 0;
    }

    .list {
      height: calc(100% - 100px);
      overflow: hidden;

      > div {
        height: 70px;
        overflow: hidden;
        line-height: 70px;
        border-bottom: 1px solid var(--art-border-color);

        span {
          font-size: 13px;
        }

        .user {
          font-weight: 500;
          color: var(--art-text-gray-800);
        }

        .type {
          margin: 0 8px;
        }

        .target {
          color: var(--main-color);
        }
      }
    }
  }
</style>
