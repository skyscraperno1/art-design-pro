<template>
  <div class="page-content">
    <table-bar
      :showTop="false"
      @search="search"
      @reset="resetForm(searchFormRef)"
      @changeColumn="changeColumn"
      :columns="columns"
    >
      <template #top>
        <el-form :model="searchForm" ref="searchFormRef" label-width="82px">
          <el-row :gutter="20">
            <form-input label="用户名" prop="name" v-model="searchForm.name" />
            <form-input label="邮箱" prop="email" v-model="searchForm.email" />
            <form-input label="账号" prop="account" v-model="searchForm.account" />
            <form-select label="性别" prop="sex" v-model="searchForm.sex" :options="sexOptions" />
          </el-row>
          <el-row :gutter="20">
            <form-input label="用户ID" prop="id" v-model="searchForm.id" />
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <el-button @click="showDialog('add')">添加成员</el-button>
      </template>
    </table-bar>

    <art-table :data="tableData" :currentPage="1" :pageSize="10" :total="50">
      <template #default>
        <el-table-column
          label="用户名"
          prop="avatar"
          #default="scope"
          width="200px"
          v-if="columns[0].show"
        >
          <div class="user" style="display: flex; align-items: center">
            <img class="avatar" :src="scope.row.avatar" />
            <div>
              <p class="user-name">{{ scope.row.username }}</p>
              <p class="mobile">{{ scope.row.mobile }}</p>
            </div>
          </div>
        </el-table-column>
          <el-table-column label="邮箱" prop="email" width="200px" v-if="columns[1].show" />
        <el-table-column label="性别" prop="sex" #default="scope" sortable v-if="columns[2].show">
          {{ scope.row.sex === 1 ? '男' : '女' }}
        </el-table-column>
        <el-table-column label="ESIM" prop="esim" v-if="columns[3].show" />
        <el-table-column
          label="状态"
          prop="status"
          :filters="[
            { text: '已验证', value: '1' },
            { text: '未验证', value: '2' },
            { text: '异常', value: '3' },
            { text: '注销', value: '4' }
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
          v-if="columns[4].show"
        >
          <template #default="scope">
            <el-tag :type="getTagType(scope.row.status)">
              {{ buildTagText(scope.row.status) }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="创建日期" prop="create_time" sortable v-if="columns[5].show" />
        <el-table-column label="绑定ESIM状态" prop="bindingStatus" sortable v-if="columns[6].show" >
          <template #default="scope">
            <el-tag :type="scope.row.bindingStatus ? 'success' : 'danger'">
              {{ scope.row.bindingStatus ? '已绑定' : '未绑定' }}  
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150px">
          <template #default="scope">
            <button-table type="edit" @click="showDialog('edit', scope.row)" />
            <button-table type="delete" @click="deleteUser" />
          </template>
        </el-table-column>
      </template>
    </art-table>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '添加用户' : '编辑用户'"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formData.sex">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="ESIM" prop="esim">
          <el-input v-model="formData.esim" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { ACCOUNT_TABLE_DATA } from '@/mock/formData'
  import { FormInstance } from 'element-plus'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import type { FormRules } from 'element-plus'

  const dialogType = ref('add')
  const dialogVisible = ref(false)

  const formData = reactive({
    username: '',
    email: '',
    sex: '',
    esim: ''
  })

  const sexOptions = [
    {
      value: '男',
      label: '男'
    },
    {
      value: '女',
      label: '女'
    }
  ]

  const columns = reactive([
    { name: '用户名', show: true },
    { name: '邮箱', show: true },
    { name: '性别', show: false },
    { name: 'ESIM', show: true },
    { name: '状态', show: true },
    { name: '创建日期', show: false },
    { name: '绑定ESIM状态', show: true }
  ])

  const searchFormRef = ref<FormInstance>()
  const searchForm = reactive({
    name: '',
    phone: '',
    email: '',
    account: '',
    id: '',
    sex: '',
    level: ''
  })

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }

  const tableData = ACCOUNT_TABLE_DATA

  const showDialog = (type: string, row?: any) => {
    dialogVisible.value = true
    dialogType.value = type

    if (type === 'edit' && row) {
      formData.username = row.username
      formData.email = row.email
      formData.sex = row.sex === 1 ? '男' : '女'
      formData.esim = row.esim
    } else {
      formData.username = ''
      formData.email = ''
      formData.sex = '男'
      formData.esim = ''
    }
  }

  const deleteUser = () => {
    ElMessageBox.confirm('确定要注销该用户吗？', '注销用户', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error'
    }).then(() => {
      ElMessage.success('注销成功')
    })
  }

  const search = () => {}

  const changeColumn = (list: any) => {
    columns.values = list
  }

  const filterTag = (value: string, row: any) => {
    return row.status === value
  }

  const getTagType = (status: string) => {
    switch (status) {
      case '1':
        return 'success'
      case '2':
        return 'info'
      case '3':
        return 'warning'
      case '4':
        return 'danger'
      default:
        return 'info'
    }
  }

  const buildTagText = (status: string) => {
    let text = ''
    if (status === '1') {
      text = '已验证'
    } else if (status === '2') {
      text = '未验证'
    } else if (status === '3') {
      text = '异常'
    } else if (status === '4') {
      text = '注销'
    }
    return text
  }

  const rules = reactive<FormRules>({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
    ],
    sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
    dep: [{ required: true, message: '请选择部门', trigger: 'change' }]
  })

  const formRef = ref<FormInstance>()

  const handleSubmit = async () => {
    if (!formRef.value) return

    await formRef.value.validate((valid) => {
      if (valid) {
        ElMessage.success(dialogType.value === 'add' ? '添加成功' : '更新成功')
        dialogVisible.value = false
      }
    })
  }
</script>

<style lang="scss" scoped>
  .page-content {
    width: 100%;
    height: 100%;

    .user {
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 6px;
      }

      > div {
        margin-left: 10px;

        .user-name {
          font-weight: 500;
          color: var(--art-text-gray-800);
        }
      }
    }
  }
</style>
