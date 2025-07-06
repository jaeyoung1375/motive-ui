<template>
  <div class="col-8">
    <div v-if="menuDto.menuId == ''">메뉴를 선택해주세요</div>
    <div
      data-bs-spy="scroll"
      data-bs-target="#navbar-example3"
      data-bs-smooth-scroll="true"
      class="scrollspy-example-2"
      tabindex="0"
      v-else
    >
      <label for="menuId" class="form-label">메뉴 ID</label>
      <input
        class="form-control"
        type="text"
        id="menuId"
        v-model="menuDto.menuId"
        disabled
        readonly
      />
      <label for="menuName" class="form-label">메뉴 명</label>
      <input class="form-control" type="text" id="menuName" v-model="menuDto.menuName" />
      <label for="menuUrl" class="form-label">메뉴 URL</label>
      <input class="form-control" type="text" id="menuUrl" v-model="menuDto.menuUrl" />
      <label for="upMenuId" class="form-label">상위메뉴 ID</label>
      <input class="form-control" type="text" id="upMenuId" v-model="menuDto.upMenuId" />
      <label for="menuSorting" class="form-label">정렬 순서</label>
      <input class="form-control" type="text" id="menuSorting" v-model="menuDto.menuSorting" />
      <label for="menuLevel" class="form-label">메뉴 레벨</label>
      <input class="form-control" type="text" id="menuLevel" v-model.number="menuDto.menuLevel" />
      <label for="useYn" class="form-label">사용 여부</label>
      <input class="form-control" type="text" id="useYn" v-model="menuDto.useYn" />
      <label for="registerId" class="form-label">등록자</label>
      <input class="form-control" type="text" id="registerId" v-model="menuDto.registerId" />
      <label for="registerDate" class="form-label">등록일시</label>
      <input class="form-control" type="text" id="registerDate" v-model="menuDto.registerDate" />
      <label for="changeId" class="form-label">수정자</label>
      <input class="form-control" type="text" id="changeId" v-model="menuDto.changeId" />
      <label for="changeDate" class="form-label">수정일시</label>
      <input class="form-control" type="text" id="changeDate" v-model="menuDto.changeDate" />
      <div class="mt-2">
        <button type="button" class="btn btn-success me-2" @click="handleModifyMenu()">수정</button>
        <button type="button" class="btn btn-danger me-4" @click="handleRemoveMenu(menuDto.menuId)">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getMenu, menuData, modifyMenu, removeMenu } from '~/utils/Menu'
import { menuDto } from '~/stores/menu'
import { useRouter } from 'vue-router'
const menuList = ref<Menu[]>([])
const router = useRouter()
// 메뉴 리스트
menuData(menuList)

const handleModifyMenu = async () => {
  await getMenu(menuDto.value.menuId)
  if (confirm('수정하시겠습니까?')) {
    const updatedMenu = await modifyMenu(menuDto.value)
    menuDto.value = updatedMenu
    await menuData(menuList) // 수정 후 갱신
    router.go(0)
  }
}

const handleRemoveMenu = async (menuId: string) => {
  if (confirm('삭제하시겠습니까?')) {
    removeMenu(menuId)
    router.go(0)
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
.no-animation.collapse,
.no-animation.collapsing {
  transition: none !important;
  height: auto !important;
  overflow: visible !important;
}
</style>
