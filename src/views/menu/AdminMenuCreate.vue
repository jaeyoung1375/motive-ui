<template>
  <div class="col-8">
    <div
      data-bs-spy="scroll"
      data-bs-target="#navbar-example3"
      data-bs-smooth-scroll="true"
      class="scrollspy-example-2"
      tabindex="0"
    >
      <label for="menuId" class="form-label">메뉴 ID</label>
      <input class="form-control" type="text" id="menuId" v-model="menuDto.menuId" />
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

      <div class="mt-2">
        <button type="button" class="btn btn-success me-2" @click="handleCreateMenu(menuDto)">
          등록
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { menuDto } from '~/stores/menu'
import { createMenu } from '~/utils/Menu'
import { useRouter } from 'vue-router'
const router = useRouter()

const handleCreateMenu = (menuDto: Menu) => {
  createMenu(menuDto)
  router.go(0)
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
