<template>
  <div class="page-content" :style="{ height: minHeight }">
    <el-row>
      <el-col :span="12">
        <div class="grid-content ep-bg-purple" />
      </el-col>
      <el-col :span="12">
        <div class="grid-content ep-bg-purple-light" />
      </el-col>
    </el-row>
    <div class="person-list">
      <el-scrollbar>
        <div
          v-for="item in personList"
          :key="item.id"
          class="person-item"
          :class="{ active: selectedPerson?.id === item.id }"
          @click="selectPerson(item)"
        >
          <div class="avatar-wrapper">
            <el-avatar :size="40" :src="item.avatar">
              {{ item.name.charAt(0) }}
            </el-avatar>
            <div class="status-dot" :class="{ online: item.online }"></div>
          </div>
          <div class="person-info">
            <div class="info-top">
              <span class="person-name">{{ item.name }}</span>
              <span class="last-time">{{ item.lastTime }}</span>
            </div>
            <div class="info-bottom">
              <span class="email">{{ item.email }}</span>
              <el-badge v-if="item.unread" :value="item.unread" class="unread-badge" />
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="chat-modal">
      <div class="header">
        <div class="header-left">
          <span class="name">Art Bot</span>
          <div class="status">
            <div class="dot" :class="{ online: isOnline, offline: !isOnline }"></div>
            <span class="status-text">{{ isOnline ? '在线' : '离线' }}</span>
          </div>
        </div>
        <div class="header-right"> </div>
      </div>
      <div class="chat-container">
        <!-- 聊天消息区域 -->
        <div class="chat-messages" ref="messageContainer">
          <template v-for="(message, index) in messages" :key="index">
            <div :class="['message-item', message.isMe ? 'message-right' : 'message-left']">
              <el-avatar :size="32" :src="message.avatar" class="message-avatar" />
              <div class="message-content">
                <div class="message-info">
                  <span class="sender-name">{{ message.sender }}</span>
                  <span class="message-time">{{ message.time }}</span>
                </div>
                <div class="message-text">{{ message.content }}</div>
              </div>
            </div>
          </template>
        </div>

        <!-- 聊天输入区域 -->
        <div class="chat-input">
          <el-input
            v-model="messageText"
            type="textarea"
            :rows="3"
            placeholder="输入消息"
            resize="none"
            @keyup.enter.prevent="sendMessage"
          >
            <template #append>
              <div class="input-actions">
                <el-button :icon="Paperclip" circle plain />
                <el-button :icon="Picture" circle plain />
                <el-button type="primary" @click="sendMessage">发送</el-button>
              </div>
            </template>
          </el-input>
          <div class="chat-input-actions">
            <div class="left">
              <i class="iconfont-sys">&#xe634;</i>
              <i class="iconfont-sys">&#xe809;</i>
            </div>
            <el-button type="primary" @click="sendMessage">发送</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { Picture, Paperclip } from '@element-plus/icons-vue'
  import mittBus from '@/utils/mittBus'
  import meAvatar from '@/assets/img/avatar/avatar5.jpg'
  import aiAvatar from '@/assets/img/avatar/avatar10.jpg'
  import { useSettingStore } from '@/store/modules/setting'

  // 抽屉显示状态
  const isDrawerVisible = ref(false)
  // 是否在线
  const isOnline = ref(true)

  interface Person {
    id: number
    name: string
    email: string
    avatar: string
    online?: boolean
    lastTime: string
    unread?: number
  }

  const selectedPerson = ref<Person | null>(null)
  const settingStore = useSettingStore()
  const showWorkTab = computed(() => settingStore.showWorkTab)
  const minHeight = computed(() => `calc(100vh - ${showWorkTab.value ? 120 : 75}px)`)

  const personList = ref<Person[]>([
    {
      id: 1,
      name: '梅洛迪·梅西',
      email: 'melody@altbox.com',
      avatar: meAvatar,
      online: true,
      lastTime: '20小时前',
      unread: 0
    },
    {
      id: 2,
      name: '马克·史密斯',
      email: 'max@kt.com',
      avatar: '',
      online: true,
      lastTime: '2周前',
      unread: 6
    },
    {
      id: 3,
      name: '肖恩·宾',
      email: 'sean@dellito.com',
      avatar: '',
      online: false,
      lastTime: '5小时前',
      unread: 5
    },
    {
      id: 4,
      name: '爱丽丝·约翰逊',
      email: 'alice@domain.com',
      avatar: '',
      online: true,
      lastTime: '1小时前',
      unread: 2
    },
    {
      id: 5,
      name: '鲍勃·布朗',
      email: 'bob@domain.com',
      avatar: '',
      online: false,
      lastTime: '3天前',
      unread: 1
    },
    {
      id: 6,
      name: '查理·戴维斯',
      email: 'charlie@domain.com',
      avatar: '',
      online: true,
      lastTime: '10分钟前',
      unread: 0
    },
    {
      id: 7,
      name: '戴安娜·普林斯',
      email: 'diana@domain.com',
      avatar: '',
      online: true,
      lastTime: '15分钟前',
      unread: 3
    },
    {
      id: 8,
      name: '伊桑·亨特',
      email: 'ethan@domain.com',
      avatar: '',
      online: true,
      lastTime: '5分钟前',
      unread: 0
    },
    {
      id: 9,
      name: '杰西卡·琼斯',
      email: 'jessica@domain.com',
      avatar: '',
      online: false,
      lastTime: '1天前',
      unread: 4
    },
    {
      id: 10,
      name: '彼得·帕克',
      email: 'peter@domain.com',
      avatar: '',
      online: true,
      lastTime: '2小时前',
      unread: 1
    },
    {
      id: 11,
      name: '克拉克·肯特',
      email: 'clark@domain.com',
      avatar: '',
      online: true,
      lastTime: '30分钟前',
      unread: 2
    },
    {
      id: 12,
      name: '布鲁斯·韦恩',
      email: 'bruce@domain.com',
      avatar: '',
      online: false,
      lastTime: '3天前',
      unread: 0
    },
    {
      id: 13,
      name: '韦德·威尔逊',
      email: 'wade@domain.com',
      avatar: '',
      online: true,
      lastTime: '10分钟前',
      unread: 5
    },
    {
      id: 14,
      name: '娜塔莎·罗曼诺夫',
      email: 'natasha@domain.com',
      avatar: '',
      online: true,
      lastTime: '1小时前',
      unread: 3
    },
    {
      id: 15,
      name: '托尼·斯塔克',
      email: 'tony@domain.com',
      avatar: '',
      online: false,
      lastTime: '2周前',
      unread: 0
    }
  ])

  const selectPerson = (person: Person) => {
    selectedPerson.value = person
  }

  // 消息相关数据
  const messageText = ref('')
  const messages = ref([
    {
      id: 1,
      sender: 'Art Bot',
      content: '你好！我是你的AI助手，有什么我可以帮你的吗？',
      time: '10:00',
      isMe: false,
      avatar: aiAvatar
    },
    {
      id: 2,
      sender: 'Ricky',
      content: '我想了解一下系统的使用方法。',
      time: '10:01',
      isMe: true,
      avatar: meAvatar
    },
    {
      id: 3,
      sender: 'Art Bot',
      content: '好的，我来为您介绍系统的主要功能。首先，您可以通过左侧菜单访问不同的功能模块...',
      time: '10:02',
      isMe: false,
      avatar: aiAvatar
    },
    {
      id: 4,
      sender: 'Ricky',
      content: '听起来很不错，能具体讲讲数据分析部分吗？',
      time: '10:05',
      isMe: true,
      avatar: meAvatar
    },
    {
      id: 5,
      sender: 'Art Bot',
      content: '当然可以。数据分析模块可以帮助您实时监控关键指标，并生成详细的报表...',
      time: '10:06',
      isMe: false,
      avatar: aiAvatar
    },
    {
      id: 6,
      sender: 'Ricky',
      content: '太好了，那我如何开始使用呢？',
      time: '10:08',
      isMe: true,
      avatar: meAvatar
    },
    {
      id: 7,
      sender: 'Art Bot',
      content: '您可以先创建一个项目，然后在项目中添加相关的数据源，系统会自动进行分析。',
      time: '10:09',
      isMe: false,
      avatar: aiAvatar
    },
    {
      id: 8,
      sender: 'Ricky',
      content: '明白了，谢谢你的帮助！',
      time: '10:10',
      isMe: true,
      avatar: meAvatar
    },
    {
      id: 9,
      sender: 'Art Bot',
      content: '不客气，有任何问题随时联系我。',
      time: '10:11',
      isMe: false,
      avatar: aiAvatar
    }
  ])

  const messageId = ref(10) // 用于生成唯一的消息ID

  const userAvatar = ref(meAvatar) // 使用导入的头像

  // 发送消息
  const sendMessage = () => {
    const text = messageText.value.trim()
    if (!text) return

    messages.value.push({
      id: messageId.value++,
      sender: 'Ricky',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      avatar: userAvatar.value
    })

    messageText.value = ''
    scrollToBottom()
  }

  // 滚动到底部
  const messageContainer = ref<HTMLElement | null>(null)
  const scrollToBottom = () => {
    setTimeout(() => {
      if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight
      }
    }, 100)
  }

  const openChat = () => {
    isDrawerVisible.value = true
  }

  onMounted(() => {
    scrollToBottom()
    mittBus.on('openChat', openChat)
  })
</script>

<style lang="scss">
  .chat-modal {
    .el-overlay {
      background-color: rgb(0 0 0 / 20%) !important;
    }
  }
</style>

<style lang="scss" scoped>
  .page-content {
    display: flex;

    .person-list {
      box-sizing: border-box;
      width: 360px;
      height: 100%;
      padding: 20px;
      margin-right: 20px;
      background-color: var(--art-main-bg-color);
      border: 1px solid var(--art-border-color);
      border-radius: 6px;

      .person-item {
        display: flex;
        align-items: center;
        padding: 12px;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.3s ease;

        &:hover,
        &.active {
          background-color: var(--el-fill-color-light);
        }

        .avatar-wrapper {
          position: relative;
          margin-right: 12px;

          .status-dot {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 10px;
            height: 10px;
            background-color: var(--el-color-danger);
            border: 2px solid #fff;
            border-radius: 50%;

            &.online {
              background-color: var(--el-color-success);
            }
          }
        }

        .person-info {
          flex: 1;
          min-width: 0;

          .info-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 4px;

            .person-name {
              font-size: 14px;
              font-weight: 500;
              color: var(--el-text-color-primary);
            }

            .last-time {
              font-size: 12px;
              color: var(--el-text-color-secondary);
            }
          }

          .info-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .email {
              overflow: hidden;
              font-size: 12px;
              color: var(--el-text-color-secondary);
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .unread-badge {
              :deep(.el-badge__content) {
                border: none;
              }
            }
          }
        }
      }
    }

    .chat-modal {
      box-sizing: border-box;
      flex: 1;
      height: 100%;
      background-color: var(--art-main-bg-color);
      border: 1px solid var(--art-border-color);
      border-radius: 6px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 16px 0;
      margin-bottom: 20px;

      .header-left {
        .name {
          font-size: 16px;
          font-weight: 500;
        }

        .status {
          display: flex;
          gap: 4px;
          align-items: center;
          margin-top: 6px;

          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;

            &.online {
              background-color: var(--art-success);
            }

            &.offline {
              background-color: var(--art-danger);
            }
          }

          .status-text {
            font-size: 12px;
            color: var(--art-gray-500);
          }
        }
      }

      .header-right {
        .icon-close {
          cursor: pointer;
        }
      }
    }

    .chat-container {
      display: flex;
      flex-direction: column;
      height: calc(100% - 85px);

      .chat-messages {
        flex: 1;
        padding: 30px 16px;
        overflow-y: auto;
        border-top: 1px solid var(--el-border-color-lighter);

        &::-webkit-scrollbar {
          width: 5px !important;
        }

        .message-item {
          display: flex;
          flex-direction: row;
          gap: 8px;
          align-items: flex-start;
          width: 100%;
          margin-bottom: 30px;

          .message-text {
            font-size: 14px;
            color: var(--art-gray-900);
            border-radius: 6px;
          }

          &.message-left {
            justify-content: flex-start;

            .message-content {
              align-items: flex-start;

              .message-info {
                flex-direction: row;
              }

              .message-text {
                background-color: #f8f5ff;
              }
            }
          }

          &.message-right {
            flex-direction: row-reverse;

            .message-content {
              align-items: flex-end;

              .message-info {
                flex-direction: row-reverse;
              }

              .message-text {
                background-color: #e9f3ff;
              }
            }
          }

          .message-avatar {
            flex-shrink: 0;
          }

          .message-content {
            display: flex;
            flex-direction: column;
            max-width: 70%;

            .message-info {
              display: flex;
              gap: 8px;
              margin-bottom: 4px;
              font-size: 12px;

              .message-time {
                color: var(--el-text-color-secondary);
              }

              .sender-name {
                font-weight: 500;
              }
            }

            .message-text {
              padding: 10px 14px;
              line-height: 1.4;
            }
          }
        }
      }

      .chat-input {
        padding: 16px; // 增加填充以提升输入区域的布局

        .input-actions {
          display: flex;
          gap: 8px;
          padding: 8px 0;
        }

        .chat-input-actions {
          display: flex;
          align-items: center; // 修正为单数
          justify-content: space-between;
          margin-top: 12px;

          .left {
            display: flex;
            align-items: center;

            i {
              margin-right: 20px;
              font-size: 16px;
              color: var(--art-gray-500);
              cursor: pointer;
            }
          }

          // 确保发送按钮与输入框对齐
          el-button {
            min-width: 80px;
          }
        }
      }
    }
  }

  @media only screen and (max-width: $device-ipad-pro) {
    .page-content {
      flex-direction: column;

      .person-list {
        width: 100%;
        height: 30%;
        margin-right: 0;
      }

      .chat-modal {
        height: calc(70% - 30px);
        margin-top: 20px;
      }
    }
  }

  .dark {
    .chat-container {
      .chat-messages {
        .message-item {
          &.message-left {
            .message-text {
              background-color: #232323 !important;
            }
          }

          &.message-right {
            .message-text {
              background-color: #182331 !important;
            }
          }
        }
      }
    }
  }
</style>
