<template>
  <ul class="card-list" :style="{ marginTop: showWorkTab ? '0' : '10px' }">
    <li class="art-custom-card" v-for="(item, index) in dataList" :key="index">
      <span class="des custom-text subtitle">{{ item.des }}</span>
      <CountTo
        class="number custom-text box-title"
        :endVal="item.num"
        :duration="500"
        separator=""
      ></CountTo>
      <i class="iconfont-sys custom-text" v-html="item.icon"></i>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { useSettingStore } from '@/store/modules/setting'
  import { CountTo } from 'vue3-count-to'
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n();
  const settingStore = useSettingStore()
  const showWorkTab = computed(() => settingStore.showWorkTab)

  const dataList = reactive([
    {
      des: t('console.dashboard.total'),
      icon: '&#xe721;',
      startVal: 0,
      duration: 500,
      num: 5,
      change: '+20%'
    },
    {
      des: t('console.dashboard.unredeemed'),
      icon: '&#xe724;',
      startVal: 0,
      duration: 1,
      num: 1,
      change: '+10%'
    },
    {
      des: t('console.dashboard.inUse'),
      icon: '&#xe7aa;',
      startVal: 0,
      duration: 500,
      num: 4,
      change: '-12%'
    },
    {
      des: t('console.dashboard.expired'),
      icon: '&#xe82a;',
      startVal: 0,
      duration: 500,
      num: 0,
      change: '+30%'
    }
  ])
</script>

<style lang="scss" scoped>
  .card-list {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    width: calc(100% + var(--console-margin));
    margin-top: 0 !important;
    margin-left: calc(0px - var(--console-margin));
    background-color: transparent !important;

    li {
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: calc(25% - var(--console-margin));
      height: 140px;
      padding: 0 18px;
      margin: 0 0 0 var(--console-margin);
      background: var(--art-main-bg-color);

      $icon-size: 52px;

      .iconfont-sys {
        position: absolute;
        top: 0;
        right: 20px;
        bottom: 0;
        width: $icon-size;
        height: $icon-size;
        margin: auto;
        overflow: hidden;
        font-size: 22px;
        line-height: $icon-size;
        color: var(--el-color-primary) !important;
        text-align: center;
        background-color: var(--el-color-primary-light-9);
        border-radius: 12px;
      }

      .des {
        display: block;
        height: 14px;
        font-size: 14px;
        line-height: 14px;
      }

      .number {
        display: block;
        margin-top: 10px;
        font-size: 28px;
        font-weight: 400;
      }

      .change-box {
        display: flex;
        align-items: center;
        margin-top: 10px;

        .change-text {
          display: block;
          font-size: 13px;
          color: var(--art-text-gray-600);
        }

        .change {
          display: block;
          margin-left: 5px;
          font-size: 13px;
          font-weight: bold;
        }
      }
    }
  }

  .dark {
    .card-list {
      li {
        .iconfont-sys {
          background-color: #232323 !important;
        }
      }
    }
  }
</style>
