<template>
  <div class="full white">
    <PageTableLayout>
      <template #btns>
        <el-button type="primary" icon="Plus" @click="showAddDialog(-1)"
          >新增</el-button
        >
      </template>
      <template #table>
        <el-table
          :data="menuTreeData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          border
          height="100%"
        >
          <el-table-column
            prop="name"
            width="150"
            align="center"
            label="菜单名称"
          />
          <el-table-column
            prop="icon"
            align="center"
            label="图标"
            width="120"
          />
          <el-table-column align="center" label="菜单类型" width="120">
            <template #default="scope">
              <el-tag v-if="scope.row.type == 1">菜单</el-tag>
              <el-tag v-else type="warning">按钮</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            align="center"
            label="权限标识"
            width="120"
          />
          <el-table-column prop="path" align="center" label="路由地址" />
          <el-table-column
            label="编辑时间"
            align="center"
            width="180"
            prop="updateTime"
          />
          <el-table-column
            label="创建时间"
            align="center"
            width="180"
            prop="createTime"
          />
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button @click="showAddDialog(scope.row.id)">新增</el-button>
              <el-button @click="showEditDialog(scope.row)">编辑</el-button>
              <el-button type="danger" @click="deleteMenu(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </PageTableLayout>

    <el-dialog
      v-model="dialogFormVisible"
      width="550px"
      :title="`${editId ? '编辑' : '新增'}菜单`"
      @closed="dialogCloseHandle"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入菜单名字"
          />
        </el-form-item>
        <el-form-item label="菜单类型" prop="type">
          <el-select
            v-model="form.type"
            style="width: 100%"
            @change="changeType"
          >
            <el-option label="菜单" value="1" />
            <el-option label="按钮" value="2" />
          </el-select>
        </el-form-item>
        <template v-if="form.type == '1'">
          <el-form-item label="路由地址" prop="path">
            <el-input v-model="form.path" placeholder="请输入路由地址" />
          </el-form-item>
          <el-form-item label="菜单图标" prop="icon">
            <el-select
              v-model="form.icon"
              placeholder="请选择菜单图标"
              style="width: 100%"
            >
              <el-option v-for="item in IconsName" :key="item" :value="item">
                <Component
                  :is="item"
                  style="width: 20px; height: 20px"
                ></Component>
              </el-option>
            </el-select>
            <!-- <el-input v-model="form.icon" placeholder="请输入菜单图标" /> -->
          </el-form-item>
        </template>

        <el-form-item v-else label="权限标识" prop="code">
          <el-input v-model="form.code" placeholder="请输入权限标识" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关闭</el-button>
          <el-button type="primary" @click="submitOption(formRef)"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  menuListApi,
  menuDeleteApi,
  menuAddApi,
  menuUpdateApi,
} from '@/api/system/menu'
import { MenuIneterface } from '@/types/type'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import * as Icons from '@element-plus/icons-vue'

import type { IMenu } from '@/types/type'

const menuTreeData = ref<MenuIneterface[]>([])
const dialogFormVisible = ref(false)

const IconsName = Object.keys(Icons)

const form = ref<IMenu>({
  name: '',
  type: '1',
  path: '',
  parentId: -1,
  code: '',
  icon: '',
})
const formRef = ref<FormInstance>()

const editId = ref('')

// 验证按钮code
const validateBtnCode = (rule: any, value: any, callback: any) => {
  if (form.value.type === '2' && !form.value.code) {
    callback(new Error('请输入权限标识'))
  }
  callback()
}

const validatePath = (rule: any, value: any, callback: any) => {
  if (form.value.type === '1' && !form.value.path) {
    callback(new Error('请输入菜单路由'))
  }
  callback()
}

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  code: [{ required: true, validator: validateBtnCode, trigger: 'blur' }],
  path: [{ required: true, validator: validatePath, trigger: 'blur' }],
})
// 获取菜单树
const getMenuTree = async () => {
  const { data } = await menuListApi()
  menuTreeData.value = data
}
// 删除菜单
const deleteMenu = async (id: number) => {
  const { code } = await menuDeleteApi(id)
  if (code != 200) return
  ElMessage.success('删除成功！')
  getMenuTree()
}

// 新增显示
const showAddDialog = (parentId?: number) => {
  if (parentId) {
    form.value.parentId = parentId
  }
  dialogFormVisible.value = true
}

// 编辑显示
const showEditDialog = (row: MenuIneterface) => {
  editId.value = row.id
  const keys: string[] = Object.keys(form.value)
  function isValidKey(
    key: string | number | symbol,
    obj: object,
  ): key is keyof typeof obj {
    return key in obj
  }
  keys.forEach(key => {
    if (isValidKey(key, form.value)) {
      form.value[key] = row[key]
    }
  })
  dialogFormVisible.value = true
}

const changeType = () => {
  form.value.code = ''
  form.value.path = ''
  form.value.icon = ''
}

const dialogCloseHandle = () => {
  form.value = {
    name: '',
    type: '1',
    path: '',
    parentId: -1,
    code: '',
    icon: '',
  }
}

// 新增操作
const submitOption = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async valid => {
    if (!valid) return
    const { code } = editId.value
      ? await menuUpdateApi(editId.value, form.value)
      : await menuAddApi(form.value)
    if (code != 200) return
    ElMessage.success(`${editId.value ? '编辑' : '添加'}成功！`)
    getMenuTree()
    dialogFormVisible.value = false
  })
}

onMounted(() => {
  getMenuTree()
})
</script>
<style scoped></style>
