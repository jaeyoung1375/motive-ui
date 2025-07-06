<template>
  <router-link to="/" class="navbar-brand"
    ><img src="../../assets/logo.gif" class="img-logo"
  /></router-link>
  <ul class="nav nav-tabs">
    <li class="nav-item dropdown" v-for="(menu, i) in topMenus" :key="i">
      <router-link
        :to="menu.menuUrl"
        class="nav-link"
        :class="{ 'dropdown-toggle': hasChildren(menu.menuId) }"
        :data-bs-toggle="hasChildren(menu.menuId) ? 'dropdown' : null"
        role="button"
        aria-expanded="false"
        >{{ menu.menuName }}</router-link
      >
      <ul v-if="hasChildren(menu.menuId)" class="dropdown-menu">
        <li v-for="(child, j) in getChild(menu.menuId)" :key="j">
          <router-link
            :to="child.menuUrl"
            class="dropdown-item dropdown-toggle"
            role="button"
            @mouseenter="activeSubmenu = j"
            @mouseleave="activeSubmenu = null"
            >{{ child.menuName }}</router-link
          >
          <ul
            v-if="hasChildren(child.menuId)"
            class="dropdown-menu sub-dropdown"
            :style="{ display: activeSubmenu === j ? 'block' : 'none' }"
          >
            <li v-for="(grandChild, k) in getChild(child.menuId)" :key="k">
              <router-link :to="grandChild.menuUrl" class="dropdown-item">
                {{ grandChild.menuName }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="nav-item dropdown">
      <span class="nav-link" @click="logout()">로그아웃</span>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { logout } from '~/utils/Login'
import { menuData } from '~/utils/Menu'
import { computed, ref } from 'vue'
const menuList = ref<Menu[]>([])
const activeSubmenu = ref()

menuData(menuList, 'Y')

const topMenus = computed(() =>
  menuList.value.filter((menu) => menu.upMenuId == null || menu.upMenuId == ''),
)

const getChild = (parentId: string) => menuList.value.filter((menu) => menu.upMenuId === parentId)

const hasChildren = (parentId: string) => menuList.value.some((menu) => menu.upMenuId === parentId)
</script>
<style scoped>
.img-logo {
  width: 200px;
}
.sub-dropdown {
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 0.2rem;
  white-space: nowrap;
  z-index: 999;
}
</style>
