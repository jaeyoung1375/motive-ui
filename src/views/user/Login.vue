<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <body>
    <div class="login-container">
      <div class="login-box">
        <!-- 왼쪽 패널 -->
        <div class="left-panel">
          <h2>다양한 서비스를<br />로그인 한 번으로<br />편하게 이용하세요!</h2>
          <img src="http://localhost:8080" alt="모티브 로고" />
          <br />
          <button class="join-button">개인 통합회원 가입</button>
        </div>

        <!-- 오른쪽 패널 -->
        <div class="right-panel">
          <div class="tabs">
            <div class="tab active">개인회원</div>
            <div class="tab">사업자</div>
          </div>

          <div class="input-group">
            <input type="text" placeholder="아이디" />
          </div>
          <div class="input-group">
            <input type="password" placeholder="비밀번호" />
          </div>

          <div class="options">
            <label><input type="checkbox" /> 로그인 유지</label>
            <label><input type="checkbox" /> 아이디 저장</label>
          </div>

          <button class="login-btn">로그인</button>

          <div class="links"><a href="#">아이디 찾기</a> | <a href="#">비밀번호 찾기</a></div>

          <div class="social-login">
            <p>소셜 계정으로 간편 로그인</p>
            <div class="social-icons">
              <img src="/src/assets/image/naver-logo.png" alt="네이버" />
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111615.png" alt="카카오" />
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="구글" />
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="페이스북" />
              <img src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="애플" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script setup lang="ts"></script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans KR', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #fff;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  display: flex;
  border: 1px solid #eee;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  width: 800px;
  max-width: 90%;
}

.left-panel,
.right-panel {
  padding: 40px;
  flex: 1;
}

.left-panel {
  background-color: #fff;
  text-align: center;
  border-right: 1px solid #eee;
}

.left-panel img {
  width: 120px;
  margin: 20px 0;
}

.left-panel h2 {
  font-size: 18px;
  color: #333;
  margin-bottom: 30px;
}

.join-button {
  border: 1px solid #0073ff;
  color: #0073ff;
  padding: 10px 20px;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
  font-size: 14px;
}

.right-panel {
  background-color: #fff;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
}

.tab {
  flex: 1;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
  border-bottom: 2px solid #ccc;
}

.tab.active {
  border-bottom: 2px solid #0073ff;
  color: #0073ff;
}

.input-group {
  margin-bottom: 15px;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.options {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 20px;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #0073ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

.links {
  text-align: center;
  font-size: 12px;
  margin: 10px 0;
}

.social-login {
  text-align: center;
  margin: 20px 0;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.social-icons img {
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.event-banner {
  text-align: center;
  background-color: #000444;
  color: #00e3ff;
  padding: 10px;
  font-size: 13px;
  border-radius: 6px;
  margin-top: 10px;
}
</style>
