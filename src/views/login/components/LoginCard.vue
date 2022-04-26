<template>
  <div class="modal">
    <el-form ref="userForm" :model="user" status-icon :rules="rules">
      <div class="title">火星</div>
      <el-form-item prop="userName">
        <el-input v-model="user.userName" type="text" :prefix-icon="User" />
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input v-model="user.userPwd" type="password" :prefix-icon="View" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-login" @click="login(userForm)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { User, View } from '@element-plus/icons-vue'
import { ElMessage, FormInstance } from 'element-plus'
import { loginApi } from '@/api'
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'

const userStore = useUserStore()

const router = useRouter()

const userForm = ref<FormInstance>()

const user = reactive({
  userName: '',
  userPwd: '',
})

const rules = {
  userName: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
  ],
  userPwd: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
}

const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async valid => {
    if (!valid) return false
    const res = await loginApi(user)
    console.log(res)
    userStore.setUserInfo(res.data)

    ElMessage({
      message: '登录成功！',
      type: 'success',
    })

    router.push({
      path: '/store',
    })
  })
}
</script>
<style scoped lang="scss">
.modal {
  width: 500px;
  padding: 50px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px 3px #c7c9cb4d;
  .title {
    font-size: 50px;
    line-height: 1.5;
    text-align: center;
    margin-bottom: 30px;
  }
  .btn-login {
    width: 100%;
  }
}
</style>
