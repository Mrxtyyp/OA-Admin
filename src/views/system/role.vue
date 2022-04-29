<script lang="ts">
export default {
  name: 'Role',
}
</script>

<script setup lang="ts">
import { getRoleList } from '@/api/system/role'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { reactive, ref, onMounted } from 'vue'
import { Plus, Search, Refresh } from '@element-plus/icons-vue'

const form = reactive({
  user: '',
  status: '',
})
const roleList = ref([])
const pageSize = ref(20)
const totalPage = ref(0)
const loading = ref(true)
const size = ref('default')
const switchLoadMap = ref<any>({})

const formRef = ref<FormInstance>()

function handleUpdate(row: any) {
  console.log(row)
}

function handleDelete(row: any) {
  console.log(row)
}

function handleCurrentChange(val: number) {
  console.log(`current page: ${val}`)
}

function handleSizeChange(val: number) {
  console.log(`${val} items per page`)
}

// function onCheckChange(val: any) {
//   console.log('onCheckChange', val)
// }

function handleSelectionChange(val: any) {
  console.log('handleSelectionChange', val)
}

function onChange($index: number, row: any) {
  ElMessageBox.confirm(
    `确认要<strong>停用</strong><strong style='color:var(--el-color-primary)'>${row.name}</strong>角色吗?`,
    '系统提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      dangerouslyUseHTMLString: true,
      draggable: true,
    },
  )
    .then(() => {
      switchLoadMap.value[$index] = Object.assign(
        {},
        switchLoadMap.value[$index],
        {
          loading: true,
        },
      )
      setTimeout(() => {
        switchLoadMap.value[$index] = Object.assign(
          {},
          switchLoadMap.value[$index],
          {
            loading: false,
          },
        )
        ElMessage({
          message: '已成功修改角色状态',
          type: 'success',
        })
      }, 300)
    })
    .catch(() => {
      row.status === 0 ? (row.status = 1) : (row.status = 0)
    })
}

async function onSearch() {
  loading.value = true
  const { data } = await getRoleList()
  roleList.value = data.list
  totalPage.value = data.total
  setTimeout(() => {
    loading.value = false
  }, 500)
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  onSearch()
}

onMounted(() => {
  onSearch()
})
</script>

<template>
  <div class="full white">
    <PageTableLayout>
      <template #filter>
        <el-form ref="formRef" :inline="true" :model="form">
          <el-form-item label="角色名称" prop="user">
            <el-input v-model="form.user" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择" clearable>
              <el-option label="开启" :value="true" />
              <el-option label="关闭" :value="false" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :icon="Search"
              :loading="loading"
              @click="onSearch"
            >
              搜索</el-button
            >
            <el-button :icon="Refresh" @click="resetForm(formRef)"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </template>
      <template #btns>
        <el-button type="primary" :icon="Plus">新增角色</el-button>
      </template>
      <template #table>
        <el-table
          v-loading="loading"
          border
          height="100%"
          :size="size"
          :data="roleList"
          :header-cell-style="{ background: '#fafafa', color: '#606266' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="55" />
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="60"
          />
          <el-table-column label="角色名称" align="center" prop="name" />
          <el-table-column label="角色备注" align="center" prop="remark" />
          <el-table-column label="状态" align="center" prop="status">
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :loading="switchLoadMap[scope.$index]?.loading"
                :active-value="true"
                :inactive-value="false"
                @change="() => onChange(scope.$index, scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="编辑时间"
            align="center"
            width="180"
            prop="updateTime"
          >
          </el-table-column>
          <el-table-column
            label="创建时间"
            align="center"
            width="180"
            prop="createTime"
          >
          </el-table-column>
          <el-table-column label="操作" width="130" align="center">
            <template #default="scope">
              <el-button type="text" @click="handleUpdate(scope.row)"
                >修改</el-button
              >
              <el-popconfirm title="是否确认删除?">
                <template #reference>
                  <el-button type="text" @click="handleDelete(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template #pagination>
        <el-pagination
          v-model:page-size="pageSize"
          :small="size === 'small' ? true : false"
          :page-sizes="[10, 20, 30, 50]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </template>
    </PageTableLayout>
  </div>
</template>
