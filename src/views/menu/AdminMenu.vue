<template>
  <div class="d-flex">
    <Sidebar />
    <div class="flex-grow-1 p-3">
      <div class="row">
        <div class="col-4">
          <nav id="navbar-example3" class="h-100 flex-column align-items-stretch pe-4 border-end">
            <nav class="nav nav-pills flex-column">
              <!-- rotuer-link, nav 태그에서 menu 를 가져오기 위해서 template 태그로 처리 -->
              <template v-for="menu in topMenus" :key="menu.menuId">
                <a
                  class="nav-link"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#menu' + menu.menuId"
                  @click="getMenu(menu.menuId)"
                  >{{ menu.menuName }}</a
                >
                <nav
                  class="nav nav-pills flex-column collapse no-animation"
                  v-if="hasChildren(menu.menuId)"
                  :id="'menu' + menu.menuId"
                >
                  <a
                    class="ms-3 my-1"
                    v-for="child in getChild(menu.menuId)"
                    @click="getMenu(child.menuId)"
                    :key="child.menuId"
                    >{{ child.menuName }}</a
                  >
                </nav>
              </template>
              <button type="button" class="btn btn-info me-4" @click="createMenu()">
                메뉴 추가
              </button>
            </nav>
          </nav>
        </div>

        <div class="col-8">
          <div
            data-bs-spy="scroll"
            data-bs-target="#navbar-example3"
            data-bs-smooth-scroll="true"
            class="scrollspy-example-2"
            tabindex="0"
          >
            <AdminMenuDetail v-if="selectedMode === 'detail'" />
            <AdminMenuCreate v-else-if="selectedMode === 'create'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'
import { computed, ref } from 'vue'
import { getMenu, menuData, selectedMode } from '~/utils/Menu'
import AdminMenuDetail from './AdminMenuDetail.vue'
import AdminMenuCreate from './AdminMenuCreate.vue'
import { defaultMenuDto, menuDto } from '~/stores/menu'
const menuList = ref<Menu[]>([])

menuData(menuList)

const topMenus = computed(() =>
  menuList.value.filter((menu) => menu.upMenuId == null || menu.upMenuId == ''),
)

const getChild = (parentId: string) => menuList.value.filter((menu) => menu.upMenuId === parentId)

const hasChildren = (parentId: string) => menuList.value.some((menu) => menu.upMenuId === parentId)

// 메뉴 등록
const createMenu = async () => {
  selectedMode.value = 'create'
  menuDto.value = { ...defaultMenuDto }
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
