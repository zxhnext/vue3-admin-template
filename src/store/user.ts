import { defineStore } from 'pinia'
import md5 from 'md5'
import { login, getUserInfo } from '@/api/sys'
import { TOKEN } from '@/constant'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { setTimeStamp } from '@/utils/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {} as any
  }),
  getters: {
    hasUserInfo: (state) => {
      return JSON.stringify(state.userInfo) !== '{}'
    }
  },
  actions: {
    /**
     * 初始化路由表
     */
    resetRouter() {
      if (this.userInfo?.permission?.menus) {
        const menus = this.userInfo?.permission?.menus
        menus.forEach((menu: any) => {
          router.removeRoute(menu)
        })
      }
    },
    /**
     * 登录请求动作
     *
     */
    login(userInfo: any) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((data: any) => {
            this.token = data.token
            setItem(TOKEN, data.token)
            // 登录后操作
            router.push('/')
            // 保存登录时间
            setTimeStamp()
            resolve(data)
          })
          .catch((err: any) => {
            reject(err)
          })
      })
    },
    /**
     *
     * 获取用户信息
     */
    async getUserInfo() {
      const res = await getUserInfo()
      this.userInfo = res
      return res
    },
    // 退出登录
    logout() {
      this.resetRouter()
      this.token = ''
      setItem(TOKEN, '')
      this.userInfo = {}
      removeAllItem()
      router.push('/login')
    }
  }
})
