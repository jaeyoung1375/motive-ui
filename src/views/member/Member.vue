<script setup lang="ts">
import { get } from '~/api/useAxios'
import router from '~/router'
import type { MemberInfo } from '~/types/member'
import { onMounted, ref } from 'vue'

import { logout } from '~/utils/Login'
import { isSessionValid } from '~/utils/Login'


/* variable */
const memberList = ref<Array<MemberInfo>>([])

const handleClickMember = (userNo: string) => {
  console.log(userNo)

  router.push({
    name: 'MemberDetail',
    state: {
      userNo,
    },
  })
}

onMounted(async () => {


  const res = await get<Array<MemberInfo>>('/member/get-member-list')
  if (res && res.data) {
    memberList.value = res.data
  }
})
</script>

<template>
  <div class="container" style="max-width: 600px">
    <div class="py-5 text-center">
      <h2>회원 목록</h2>
    </div>
    <div class="row">
      <div class="col">
        <button
          class="btn btn-primary float-end"
          onclick="location.href='joinForm.html'"
          th:onclick="|location.href='@{/basic/members/join}'|"
          type="button"
        >
          회원 등록
        </button>
      </div>
    </div>
    <hr class="my-4" />
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>생년월일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in memberList" @click="handleClickMember(member.userNo)">
            <td>
              {{ member.userName }}
            </td>
            <td>
              {{ member.email }}
            </td>
            <td>
              {{ member.tel1 + '-' + member.tel2 + '-' + member.tel3 }}
            </td>
            <td>
              {{ member.birthDate }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <input type="button" @click="logout()">logout</input>
  <!-- /container -->
</template>

<style scoped></style>
