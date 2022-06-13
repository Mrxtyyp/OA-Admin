<script lang="ts">
export default {
  name: 'Role',
}
</script>

<script setup lang="ts">
import {
  getRoleList,
  roleAddApi,
  roleDeleteApi,
  roleUpdateApi,
} from '@/api/system/role'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { reactive, ref, onMounted, nextTick } from 'vue'
import { Plus, Search, Refresh } from '@element-plus/icons-vue'
import { menuTreeApi } from '@/api/system/menu'
import { IRole, MenuIneterface } from '@/types/type'

const form = reactive({
  user: '',
})
const roleList = ref([])
const page = ref(1)
const pageSize = ref(20)
const totalPage = ref(0)
const loading = ref(true)
const size = ref('default')

const formRef = ref<FormInstance>()

// 编辑角色
async function handleUpdate(row: IRole) {
  console.log(row)
  editId.value = row.id ? row.id : ''
  const keys: string[] = Object.keys(addAndUpdateForm)
  function isValidKey(
    key: string | number | symbol,
    obj: object,
  ): key is keyof typeof obj {
    return key in obj
  }
  keys.forEach(key => {
    if (isValidKey(key, addAndUpdateForm)) {
      addAndUpdateForm[key] = row[key]
    }
  })
  dialogFormVisible.value = true
  await nextTick()
  treeRef.value.setCheckedKeys([])
  if (row.permission) {
    // 回显权限按钮
    const permissionArr = row.permission.split(',')
    permissionArr.forEach(item => {
      const node = treeRef.value.getNode(item)
      if (node.isLeaf) {
        treeRef.value.setChecked(node, true)
      }
    })
  }
}

async function handleDelete(id: string) {
  const { code } = await roleDeleteApi(id)
  if (code != 200) return
  ElMessage.success('删除成功！')
  onSearch()
}

function handleCurrentChange(val: number) {
  console.log(`current page: ${val}`)
}

function handleSizeChange(val: number) {
  console.log(`${val} items per page`)
}

function handleSelectionChange(val: any) {
  console.log('handleSelectionChange', val)
}

async function onSearch() {
  loading.value = true
  const { data } = await getRoleList({
    page: page.value,
    size: pageSize.value,
    name: form.user,
  })
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

const dialogFormVisible = ref(false)
const editId = ref('')
const addAndUpdateForm = reactive({
  name: '',
  remark: '',
  permission: '',
})
const menuTreeData = reactive<MenuIneterface[]>([])
const addAndUpdateFormRef = ref<FormInstance>()

const validatePermiission = (rule: any, value: any, callback: any) => {
  const choose = treeRef.value.getCheckedKeys()
  if (!choose.length) {
    callback(new Error('请选择对应权限'))
  }
  callback()
}

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  permission: [
    { required: true, validator: validatePermiission, trigger: 'blur' },
  ],
})
const treeRef = ref()

// 关闭弹窗
function dialogCloseHandle() {
  addAndUpdateForm.name = ''
  addAndUpdateForm.remark = ''
  addAndUpdateForm.permission = ''
  treeRef.value.setCheckedKeys([], false)
}

// 新增或添加数据
function submitOption(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.validate(async valid => {
    if (!valid) return
    const checkedKeys = treeRef.value.getCheckedKeys()
    const halfKeys = treeRef.value.getHalfCheckedKeys()
    addAndUpdateForm.permission = checkedKeys.concat(halfKeys).toString()
    const { code } = editId.value
      ? await roleUpdateApi(editId.value, addAndUpdateForm)
      : await roleAddApi(addAndUpdateForm)
    if (code != 200) return
    ElMessage.success(`${editId.value ? '编辑' : '添加'}成功！`)
    onSearch()
    await nextTick()
    dialogFormVisible.value = false
  })
}

// 获取菜单树
const getMenuTree = async () => {
  const { data } = await menuTreeApi()
  menuTreeData.push(...data)
}

onMounted(() => {
  onSearch()
  getMenuTree()
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
        <el-button type="primary" :icon="Plus" @click="dialogFormVisible = true"
          >新增角色</el-button
        >
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
              <el-popconfirm
                title="是否确认删除?"
                @confirm="handleDelete(scope.row.id)"
              >
                <template #reference>
                  <el-button type="text">删除</el-button>
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

    <el-dialog
      v-model="dialogFormVisible"
      width="550px"
      :title="`${editId ? '编辑' : '新增'}菜单`"
      @closed="dialogCloseHandle"
    >
      <el-form
        ref="addAndUpdateFormRef"
        :model="addAndUpdateForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="addAndUpdateForm.name"
            autocomplete="off"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item label="角色备注" prop="remark">
          <el-input
            v-model="addAndUpdateForm.remark"
            autocomplete="off"
            placeholder="请输入角色备注"
          />
        </el-form-item>

        <el-form-item label="权限标识" prop="permission">
          <el-tree
            ref="treeRef"
            style="width: 100%"
            :data="menuTreeData"
            node-key="id"
            :props="{
              label: 'name',
            }"
            show-checkbox
            :height="208"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关闭</el-button>
          <el-button type="primary" @click="submitOption(addAndUpdateFormRef)"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
