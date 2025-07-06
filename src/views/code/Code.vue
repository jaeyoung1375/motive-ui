<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'        // 반응형 상태와 생명주기 훅 import
import { get, post, put, del } from '~api/useAxios'  // 공통 Axios import
import type { Code } from '~types/code'              // 코드 데이터 타입 import

const codeList = ref<Code[]>([])  // 공통 코드 리스트 저장
const keyword = ref('')           // 검색어
const isEditMode = ref(false)     // 수정 모드 여부
const form = ref({                // 등록/수정 폼 데이터 저장
  codeId: 0,       // 코드 ID
  codeGroup: '',   // 코드 그룹
  codeValue: '',   // 코드 값
  codeName: '',    // 코드 이름
  codeSorting: 1,  // 정렬 순서
  useYn: 'Y',      // 사용 여부 (Y/N)
})
/* 모달 처리 */
const editModalBtn = ref<HTMLElement | null>(null)
const closeBtn = ref<HTMLElement | null>(null)  // 모달 온오프 핸들러
/* 페이징 처리 */
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(codeList.value.length / pageSize.value))
})
/* 정렬 처리 */
const sortKey = ref<keyof Code | ''>('')     // 정렬 기준 키
const sortOrder = ref<'asc' | 'desc'>('asc') // 오름차순/내림차순
/* 체크박스 처리 */
const selectedIds = ref<number[]>([])

// 공통 코드 목록을 서버에서 가져오는 함수
const fetchCodeList = () => {
  get<Code[]>(
    `/code/list`,
    {
      params: { keyword: keyword.value },  // 파라미터에 검색어 키워드 추가
    }
  )
    .then((res) => {
      codeList.value = res.data.map((item: any) => ({
        ...item,
        codeSorting: Number(item.codeSorting),
        registerDate: item.registerDate ? new Date(item.registerDate) : null,
        changeDate: item.changeDate ? new Date(item.changeDate) : null,
      }))
      currentPage.value = 1  // 검색 결과 새로 나오면 항상 첫 페이지로
    })
    .catch((error) => {
      alert('코드를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.')
      console.error('코드 불러오기 실패:', error)
    })
}

// 수정 버튼 클릭 시 폼에 해당 코드 정보 입력
const setForm = (code?: Code) => {
  form.value = {
    codeId: code?.codeId || 0,
    codeGroup: code?.codeGroup || '',
    codeValue: code?.codeValue || '',
    codeName: code?.codeName || '',
    codeSorting: code?.codeSorting || 1,
    useYn: code?.useYn || 'Y',
  }
  isEditMode.value = !!code
}

// 코드 등록/수정
const onSubmit = () => {
  const method = isEditMode.value
    ? put(`/code/${form.value.codeId}`, form.value)
    : post(`/code`, form.value)

  method
    .then(() => {
      fetchCodeList()
      setForm()
      if (closeBtn.value) closeBtn.value.click()
    })
    .catch((error) => {
      alert('코드를 저장하는 데 실패했습니다. 나중에 다시 시도해주세요.')
      console.error('저장 실패:', error)
    })
}

// 날짜를 YYYY-MM-DD 포맷으로 리턴
const formatDate = (date: Date | null): string => {
  return date ? new Intl.DateTimeFormat('ko-KR').format(date) : '-'
}

const openEditModal = (code: Code) => {
  setForm(code) // 폼 데이터 채우기
  editModalBtn.value?.click() // 숨겨진 버튼 클릭 트리거
}

// 정렬 함수
const sortedList = computed(() => {
  if (!sortKey.value) return codeList.value

  return [...codeList.value].sort((a, b) => {
    const key = sortKey.value as keyof Code
    const aVal = a[key]
    const bVal = b[key]

    if (aVal === bVal) return 0

    if (sortOrder.value === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })
})

// 정렬 토글
const toggleSort = (key: keyof Code) => {
  if (sortKey.value === key) {
    // 같은 키 다시 클릭하면 오름/내림 토글
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

// 페이징 계산
const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return sortedList.value.slice(start, start + pageSize.value)
})

// 단일 체크박스 토글
const toggleSelection = (codeId: number) => {
  const index = selectedIds.value.indexOf(codeId)
  if (index >= 0) {
    selectedIds.value.splice(index, 1)
  } else {
    selectedIds.value.push(codeId)
  }
}

// 전체 체크박스 토글
const toggleCheckAll = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  selectedIds.value = checked ? paginatedList.value.map(code => code.codeId) : []
}

// 체크한 항목 삭제
const deleteSelected = () => {
  if (!confirm('선택한 항목을 삭제하시겠습니까?')) return

  Promise.all(selectedIds.value.map(id => del(`/code/${id}`)))
    .then(() => {
      fetchCodeList()
      selectedIds.value = []
    })
    .catch((err) => {
      alert('삭제에 실패했습니다.')
      console.error(err)
    })
}

// 컴포넌트가 마운트될 때 코드 목록 불러오기
onMounted(fetchCodeList)

</script>

<template>
  <div class="container py-4">
    <!-- 제목 -->
    <h3 class="mb-4 fw-bold text-center">공통 코드 관리</h3>

    <!-- 검색 폼 (엔터 입력 시 검색 실행되도록) -->
    <form @submit.prevent="fetchCodeList" class="mb-4 d-flex justify-content-center gap-2">
      <!-- <input v-model="keyword" placeholder="검색어 입력" class="form-control w-auto" /> -->
      <input
        v-model="keyword"
        placeholder="검색어 입력"
        class="form-control w-auto"
        @keyup.enter="fetchCodeList"
        autofocus
      />
      <button type="submit" class="btn btn-primary">검색</button>
    </form>

    <!-- 페이징 관련 div -->
    <div class="d-flex justify-content-between align-items-center mt-4 mb-2">
      <!-- 삭제 버튼 -->
      <button
        class="btn btn-danger mb-3"
        :disabled="selectedIds.length === 0"
        @click="deleteSelected"
      >
        삭제
      </button>

      <!-- 페이지 사이즈 선택 -->
      <div class="d-flex align-items-center gap-2">
        <label class="mb-0">페이지당</label>
        <select v-model="pageSize" class="form-select form-select-sm w-auto">
          <option :value="5">5개</option>
          <option :value="10">10개</option>
          <option :value="20">20개</option>
        </select>
      </div>
    </div>

    <!-- 목록 테이블 -->
    <div class="table-responsive">
      <table class="table table-bordered table-hover table-sm text-center align-middle">
        <thead class="table-light">
          <tr>
            <th style="display: none;">ID</th>
            <!-- 전체 체크박스 -->
            <th>
              <input
                type="checkbox"
                :checked="paginatedList.length > 0 && paginatedList.every(code => selectedIds.includes(code.codeId))"
                @change="toggleCheckAll"
              />
            </th>
            <th @click="toggleSort('codeGroup')" style="cursor: pointer;">
              코드그룹
              <span v-if="sortKey === 'codeGroup'">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
            <th @click="toggleSort('codeValue')" style="cursor: pointer;">
              코드값
              <span v-if="sortKey === 'codeValue'">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
            <th @click="toggleSort('codeName')" style="cursor: pointer;">
              코드명
              <span v-if="sortKey === 'codeName'">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
            <th @click="toggleSort('codeSorting')" style="cursor: pointer;">
              정렬
              <span v-if="sortKey === 'codeSorting'">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
            <th @click="toggleSort('useYn')" style="cursor: pointer;">
              사용여부
              <span v-if="sortKey === 'useYn'">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
            <th @click="toggleSort('registerDate')" style="cursor: pointer;">
              등록일
              <span v-if="sortKey === 'registerDate'">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
            <th @click="toggleSort('changeDate')" style="cursor: pointer;">
              수정일
              <span v-if="sortKey === 'changeDate'">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="code in paginatedList"
            :key="code.codeId"
            @click="toggleSelection(code.codeId)"
            @dblclick="openEditModal(code)"
            :class="{ 'table-primary': selectedIds.includes(code.codeId) }"
          >
            <td style="display: none;">{{ code.codeId }}</td>
            <!-- 체크박스 -->
            <td>
              <input
                type="checkbox"
                :checked="selectedIds.includes(code.codeId)"
                @click.stop="toggleSelection(code.codeId)"
              />
            </td>
            <td>{{ code.codeGroup }}</td>
            <td>{{ code.codeValue }}</td>
            <td>{{ code.codeName }}</td>
            <td>{{ code.codeSorting }}</td>
            <td>{{ code.useYn }}</td>
            <td>{{ formatDate(code.registerDate) }}</td>
            <td>{{ formatDate(code.changeDate) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이징 관련 div -->
    <div class="d-flex justify-content-between align-items-center mt-1 mb-1">
      <!-- 총 항목 수 or 설명 -->
      <div>
        총 {{ codeList.length }}건
      </div>

      <!-- 공통 코드 등록 버튼 -->
      <div class="text-end">
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#codeModal"
          @click="setForm()"
        >
          등록
        </button>
      </div>
    </div>

    <!-- 페이징 처리 -->
    <nav class="d-flex justify-content-center">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="currentPage--">이전</button>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: page === currentPage }"
        >
          <button class="page-link" @click="currentPage = page">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="currentPage++">다음</button>
        </li>
      </ul>
    </nav>

    <!-- 등록/수정 모달 -->
    <div class="modal fade" id="codeModal" tabindex="-1" aria-labelledby="codeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" style="max-width: 30%;">  <!-- 가로 크기 30%로 설정 -->
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="codeModalLabel">
              공통 코드 {{ isEditMode ? '수정' : '등록' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="닫기"></button>
          </div>

          <form @submit.prevent="onSubmit">
            <div class="modal-body">
              <!-- 코드 그룹 -->
              <div class="mb-3 d-flex align-items-center">
                <label class="form-label me-2 mb-0" style="width: 100px;">코드 그룹</label>
                <input v-model="form.codeGroup" class="form-control" required />
              </div>

              <!-- 코드 값 -->
              <div class="mb-3 d-flex align-items-center">
                <label class="form-label me-2 mb-0" style="width: 100px;">코드 값</label>
                <input v-model="form.codeValue" class="form-control" required />
              </div>

              <!-- 코드 이름 -->
              <div class="mb-3 d-flex align-items-center">
                <label class="form-label me-2 mb-0" style="width: 100px;">코드 이름</label>
                <input v-model="form.codeName" class="form-control" required />
              </div>

              <!-- 정렬 순서 -->
              <div class="mb-3 d-flex align-items-center">
                <label class="form-label me-2 mb-0" style="width: 100px;">정렬 순서</label>
                <input v-model.number="form.codeSorting" type="number" class="form-control" />
              </div>

              <!-- 사용 여부 -->
              <div class="mb-3 d-flex align-items-center">
                <label class="form-label me-2 mb-0" style="width: 100px;">사용 여부</label>
                <select v-model="form.useYn" class="form-select">
                  <option value="Y">사용</option>
                  <option value="N">미사용</option>
                </select>
              </div>
            </div>

            <div class="modal-footer d-flex justify-content-center">
              <button type="submit" class="btn btn-success mx-2">
                {{ isEditMode ? '수정' : '등록' }}
              </button>
              <button ref="closeBtn" type="button" class="btn btn-secondary mx-2" data-bs-dismiss="modal">닫기</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- 숨겨진 수정용 버튼 (화면에는 안 보임) -->
    <button
      ref="editModalBtn"
      class="d-none"
      data-bs-toggle="modal"
      data-bs-target="#codeModal"
    >
      수정 모달 띄우기
    </button>

  </div>
</template>
