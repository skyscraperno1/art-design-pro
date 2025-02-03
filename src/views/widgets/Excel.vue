<template>
  <div class="page-content">
    <ExcelImport @import-success="handleImportSuccess" @import-error="handleImportError">
      <template #import-text> 上传 Excel </template>
    </ExcelImport>

    <ExcelExport
      style="margin-left: 10px"
      :data="tableData"
      filename="用户数据"
      sheetName="用户列表"
      type="success"
      :headers="headers"
      @export-success="handleExportSuccess"
      @export-error="handleExportError"
    >
      导出 Excel
    </ExcelExport>

    <el-button type="danger" @click="handleClear">清除数据</el-button>

    <art-table :data="tableData" style="margin-top: 10px">
      <el-table-column
        v-if="headers"
        v-for="key in Object.keys(headers)"
        :key="key"
        :prop="key"
        :label="headers[key as keyof typeof headers]"
      />
    </art-table>
  </div>
</template>

<script setup lang="ts">

  const handleImportSuccess = (data: any[]) => {
    if (data?.length) {
      headers.value = Object.fromEntries(
        Object.keys(data[0]).map(key => [key, key])
      );
    }
    tableData.value = data
  }

  const handleImportError = (error: Error) => {
    // 处理导入错误
    console.error('导入失败:', error)
  }

  // 使用类型化的ref
  const tableData = ref<any[]>([])

  // 自定义表头映射
  const headers = ref<Record<string, string> | undefined>()

  const handleExportSuccess = () => {
    ElMessage.success('导出成功')
  }

  const handleExportError = (error: Error) => {
    ElMessage.error(`导出失败: ${error.message}`)
  }

  const handleClear = () => {
    tableData.value = []
    headers.value = undefined
  }
</script>
