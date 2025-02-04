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
            <form-input label="国家" prop="country" v-model="searchForm.country" />
            <form-select
              label="容量"
              prop="capacity"
              v-model="searchForm.capacity"
              :options="Capacity"
            />
            <form-input label="APN" prop="apn" v-model="searchForm.apn" />
            <form-select label="运营商" prop="sex" v-model="searchForm.sex" :options="Provider" />
          </el-row>
          <el-row :gutter="20">
            <form-select
              label="有效日期"
              prop="validDate"
              v-model="searchForm.validDate"
              :options="ValidDate"
            />
          </el-row>
        </el-form>
      </template>
    </table-bar>

    <art-table :data="mockData" :currentPage="1" :pageSize="10" :total="50">
      <template #default>
        <el-table-column
          label="商品"
          prop="name"
          #default="scope"
          width="400px"
          v-if="columns[0].show"
        >
          <div class="user" style="display: flex; align-items: center">
            <img class="avatar" :src="scope.row.flag" />
            <div>
              <p class="product-name">{{ scope.row.name }}</p>
              <p class="detail">韓国 eSIM | 5日間 1GB/毎日</p>
            </div>
          </div>
        </el-table-column>
        <el-table-column label="价格" prop="price" #default="scope" sortable v-if="columns[1].show">
          <div> {{ scope.row.price }}$ </div>
        </el-table-column>
        <el-table-column label="容量" prop="capacity" v-if="columns[2].show"></el-table-column>
        <el-table-column label="Apn" prop="apn" v-if="columns[3].show" />
        <el-table-column
          label="状态"
          prop="status"
          :filters="[
            { text: 'Selling', value: '1' },
            { text: 'Sold out', value: '2' },
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
        <el-table-column fixed="right" label="操作" width="80px">
          <template #default="scope">
            <button-table type="more" />
          </template>
        </el-table-column>
      </template>
    </art-table>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '添加用户' : '编辑用户'"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" label-width="80px">
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
  import { FormInstance } from 'element-plus'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import type { FormRules } from 'element-plus'
  import { Provider, Capacity, ValidDate, mockData } from './MobileProvider'

  const dialogType = ref('add')
  const dialogVisible = ref(false)

  const formData = reactive({
    username: '',
    email: '',
    sex: '',
    esim: ''
  })

  const columns = reactive([
    { name: '商品', show: true },
    { name: '价格', show: true },
    { name: '容量', show: true },
    { name: 'APN', show: true },
    { name: '状态', show: true }
  ])

  const searchFormRef = ref<FormInstance>()
  const searchForm = reactive({
    country: '',
    capacity: '',
    apn: '',
    account: '',
    validDate: '',
    sex: '',
    level: ''
  })

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
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
        return 'danger'
      default:
        return 'info'
    }
  }

  const buildTagText = (status: string) => {
    let text = ''
    if (status === '1') {
      text = 'Selling'
    } else if (status === '2') {
      text = 'Sold Out'
    } 
    return text
  }

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
        width: 60px;
        height: 40px;
        border-radius: 2px;
      }

      > div {
        margin-left: 10px;

        .product-name {
          cursor: pointer;
          color: var(--art-primary);
        }
      }
    }
  }
</style>
