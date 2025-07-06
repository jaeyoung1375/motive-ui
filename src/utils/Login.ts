import { get, post } from '~/api/useAxios'
import router from '~/router'
import { useAuthStore } from '~/stores/auth'

export interface UserInfo {
  userName: string
  role?: string
}

// Login
export async function login(email: string, password: string): Promise<boolean> {
  const authStore = useAuthStore()

  try {
    const getRes = await post<UserInfo>('/login', { email, password }, { withCredentials: true })
    if (getRes.data.userName) {
      authStore.setLoggedIn(true)
      return true
    }
    authStore.setLoggedIn(false)
    return false
  } catch (err) {
    authStore.setLoggedIn(false)
    return false
  }
}

export async function logout(): Promise<boolean> {
  try {
    await post('/logout', {}) // 로그아웃 요청
    const authStore = useAuthStore()
    authStore.setLoggedIn(false)
    console.log('logout')
    router.push({
      name: 'Login',
    })
    return true
  } catch (err) {
    return false
  }
}

/** 세션 유효성 체크 */
export async function isSessionValid(): Promise<boolean> {
  try {
    const response = await get('is-session-valid')
    return response.status === 200
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      console.log('session is not valid')
      return false
    }
    console.log('Unexpected error checking session:', err)
    return false
  }
}
