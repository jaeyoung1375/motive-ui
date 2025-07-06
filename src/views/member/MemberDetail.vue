<script setup lang="ts">
import { post } from '~/api/useAxios'
import router from '~/router'
import type { MemberInfo } from '~/types/member'
import { onMounted, ref, watch } from 'vue'

/* variable */
/* 회원번호 */
let userNo = ''

const modified = ref(false)

const memberDetail = ref<MemberInfo>({
  userName: '',
  userNo: '',
  email: '',
  tel1: '',
  tel2: '',
  tel3: '',
  birthDate: '',
})

const memberDetailView = ref<MemberInfo>({
  userName: '',
  userNo: '',
  email: '',
  tel1: '',
  tel2: '',
  tel3: '',
  birthDate: '',
})

/**
 * 회원번호로 회원 상세 받아오기
 * () => void
 */
const getMemberDetail = async (userNo: string) => {
  console.log('request userNo is :' + userNo)
  const res = await post<MemberInfo>('/member/get-member-detail', { userNo: parseInt(userNo) })
  // 통신에 성공하여 데이터를 받아왔다면 데이터 화면에 load
  if (res && res.data) {
    const transformedData =
      res.data.birthDate.length === 8
        ? {
            ...res.data,
            birthYear: res.data.birthDate.substring(0, 4),
            birthMonth: res.data.birthDate.substring(4, 6),
            birthDay: res.data.birthDate.substring(6, 8),
          }
        : res.data

    memberDetail.value = transformedData
    memberDetailView.value = transformedData
  } else {
    console.log('데이터를 받아오지 못했습니다.')
  }
}

/**
 * 회원 상세 수정하기
 * () => void
 */
const modifyMemberDetail = async () => {
  const res = await post<MemberInfo>('/member/modify-member-detail', memberDetailView.value)
}

const validateNumber = (ev: Event) => {
  const target = ev.target as HTMLElement
  const id = target.id as keyof MemberInfo

  if (typeof memberDetailView.value[id] === 'string') {
    memberDetailView.value[id] = memberDetailView.value[id].replace(/[^0-9]/g, '')
  }
}

const handleClickModifyBtn = () => {
  modifyMemberDetail()
}

// trigger when any value in memberDetailView has been changed.
watch(
  memberDetailView,
  (newValue) => {
    console.log('changed')
    if (JSON.stringify(memberDetailView.value) !== JSON.stringify(memberDetail.value)) {
      console.log(newValue)
      console.log(memberDetail.value)

      // [수정] 버튼 활성화
      modified.value = true
    } else {
      modified.value = false
    }
  },
  { deep: true },
)

onMounted(() => {
  // 이전 화면에서 받아온 회원번호
  userNo = window.history.state?.userNo as string

  // 회원번호를 받아왔다면
  if (userNo) {
    getMemberDetail(userNo)
  }
  // 회원번호를 받아오지 못했다면 회원목록으로 다시 이동
  else {
    router.push({
      name: 'Member',
    })
  }
})
</script>

<template>
  <div>memberDetail</div>

  <div class="container">
    <div class="card member-card p-4 text-center bg-white rounded-4">
      <div class="card-body">
        <h3 class="mt-3">{{ memberDetailView.userName }}</h3>
        <p class="text-muted">회원 ID: {{ memberDetailView.userNo }}</p>

        <hr />

        <div class="text-start">
          <p>
            <strong>이메일:</strong>
            <input type="text" v-model="memberDetailView.email" />
          </p>
          <p>
            <strong>전화번호:</strong>
            <input
              type="tel"
              id="tel1"
              class="inputTel"
              v-model="memberDetailView.tel1"
              @input="validateNumber($event)"
            />-<input
              type="tel"
              id="tel2"
              class="inputTel"
              v-model="memberDetailView.tel2"
              @input="validateNumber($event)"
            />-<input
              type="tel"
              id="tel3"
              class="inputTel"
              v-model="memberDetailView.tel3"
              @input="validateNumber($event)"
            />
          </p>
          <p>
            <strong>생년월일:</strong>
            <input
              id="birthYear"
              type="text"
              v-model="memberDetailView.birthYear"
              @input="validateNumber"
            />년
            <input
              id="birthMonth"
              type="text"
              v-model="memberDetailView.birthMonth"
              @input="validateNumber"
            />월
            <input
              id="birthDay"
              type="text"
              v-model="memberDetailView.birthDay"
              @input="validateNumber"
            />일
          </p>
          <p><strong>가입일:</strong> 2023-06-15</p>
        </div>

        <div class="d-flex justify-content-center gap-2 mt-4">
          <button class="btn btn-primary" :disabled="!modified" @click="handleClickModifyBtn">
            수정
          </button>
          <button class="btn btn-danger">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #f8f9fa;
}

.member-card {
  max-width: 600px;
  margin: 50px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.member-avatar {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #fff;
  margin-top: -60px;
}

.inputTel {
  width: 3rem;
}

input {
  margin-left: 1rem;
  background-color: transparent;
  height: 20px;
  width: 160px;
  outline: 0;
  border-width: 0 0 1px;
}
input#birthYear {
  width: 3rem;
}
input#birthMonth,
input#birthDay {
  width: 2rem;
}

*:focus {
  outline: none;
}
</style>
