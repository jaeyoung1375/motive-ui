<template>
<div class="sidebar border-end p-3" style="width: 250px;">
  <h2>시스템관리</h2>
<ul class="list-unstyled">
  <li>
    <button class="btn btn-link" data-bs-toggle="collapse" data-bs-target="#menu1">
      ▸ 권한 관리
    </button>
    <ul class="collapse ps-3" id="menu1">
      <li>
        <button class="btn btn-link" data-bs-toggle="collapse" data-bs-target="#menu1-1">
          ▸ 관리자 계정 관리
        </button>
      </li>
    </ul>
  </li>

  <li>
    <button class="btn btn-link" data-bs-toggle="collapse" data-bs-target="#menu2">
      ▸ 메뉴 관리
    </button>
    <ul class="collapse ps-3" id="menu2">
      <li>
        <button class="btn btn-link" data-bs-toggle="collapse" data-bs-target="#menu2-1">
          ▸ 관리자 계정 관리
        </button>
      </li>
    </ul>
  </li>

  <li>
    <button class="btn btn-link" data-bs-toggle="collapse" data-bs-target="#menu3">
      ▸ 코드 관리
    </button>
    <ul class="collapse ps-3" id="menu3">
      <li>
        <button class="btn btn-link" data-bs-toggle="collapse" data-bs-target="#menu3-1">
          ▸ 관리자 계정 관리
        </button>
      </li>
    </ul>
  </li>
</ul>
</div>
</template>

<script setup lang="ts"></script>

<style scoped>
</style>