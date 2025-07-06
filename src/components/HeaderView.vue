<template>
  <body>
    <header class="hdex-header">
      <div class="top-bar">
        <div class="center">
          <h1 class="logo">MOTIVE</h1>
        </div>
        <div class="right">
          <span class="lang">KOR / ₩</span>
          <span class="icon">🔍</span>
          <router-link to="/user/login">
            <span class="icon">👤</span></router-link
          >

          <span class="icon">🛍️</span>
        </div>
      </div>

      <nav class="nav-bar">
        <a href="#">SHOP</a>
        <a href="#">FEATURED</a>
        <a href="#">COLLECTION</a>
        <a href="#">MEN</a>
        <a href="#">WOMEN</a>
        <a href="#">ACC</a>
        <a href="#">SKIN</a>
        <a href="#">BEST</a>
      </nav>
    </header>
  </body>
</template>

<script setup></script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.hdex-header {
  border-bottom: 1px solid #000;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  position: relative;
}

.left .menu-icon {
  font-size: 18px;
  cursor: pointer;
}

.center .logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: 900;
  margin: 0;
}

.right {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 14px;
}

.icon {
  cursor: pointer;
}

.nav-bar {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 10px 0 20px;
  margin-top: 16px;
}

.nav-bar a {
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 14px;
}
</style>
