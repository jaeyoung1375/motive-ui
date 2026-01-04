import { useEffect, useState } from 'react';
import './Login.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '~util/AxiosUtils';
export default function Login() {
  const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URL = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URL = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

  const navigate = useNavigate();
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code');

  useEffect(() => {
    // init
    // kakaoLoginCallback();
  }, []);

  const kakaoLoginCallback = async () => {
    if (code) {
      const res = await axios.post('/oauth/kakao', { code });

      if (res.status === 200 && res.data) {
        localStorage.setItem('user', res.data.userId);
        navigate('/');
      }
    }
  };

  // 카카오 로그인
  const kakaoLogin = async () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URL}`;
  };

  // 구글 로그인
  const googleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URL}&response_type=code&scope=profile email openid`;
  };

  const googleServerLogin = () => {
    window.location.href = 'http://localhost/oauth2/authorization/google';
  };

  return (
    <>
      <div className="wrapper">
        <form method="post" className="loginForm" action="/member/login">
          <h2>로그인</h2>

          <div className="textForm">
            <input name="id" type="text" className="id" placeholder="아이디" />
          </div>
          <div className="textForm">
            <input
              name="password"
              type="password"
              className="pw"
              placeholder="비밀번호"
            />
          </div>
          <div className="login_btn">
            <input
              type="submit"
              className="btn"
              id="login_button"
              value="L O G I N"
            />
          </div>
          <div className="sns-wrap">
            <span className="before"></span>
            <p>SNS 계정으로 로그인</p>
            <span className="after"></span>
          </div>

          <div className="icon_wrap">
            <a className="icon" onClick={kakaoLogin}>
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="52.0006"
                  height="52.0006"
                  rx="26.0003"
                  fill="#FEE500"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.3641 24.8054C15.3641 27.6418 17.2054 30.1425 20.0099 31.6304L18.8305 35.9642C18.7264 36.3471 19.1614 36.6521 19.4958 36.4299L24.6687 32.9978C25.106 33.0404 25.5492 33.0652 26.0006 33.0652C31.8743 33.0652 36.6371 29.3672 36.6371 24.8054C36.6371 20.2435 31.8743 16.5455 26.0006 16.5455C20.1257 16.5455 15.3641 20.2435 15.3641 24.8054Z"
                  fill="black"
                />
              </svg>
            </a>

            <a className="icon" onClick={googleServerLogin}>
              <svg
                width="53"
                height="53"
                viewBox="0 0 53 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.296069"
                  y="0.296313"
                  width="51.4097"
                  height="51.4097"
                  rx="25.7049"
                  fill="white"
                  stroke="#D3D7DF"
                  strokeWidth="0.590916"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M36.2121 26.2429C36.2121 25.4887 36.1444 24.7635 36.0187 24.0673H26.0011V28.1816H31.7255C31.4789 29.5112 30.7295 30.6377 29.603 31.3919V34.0607H33.0405C35.0518 32.209 36.2121 29.4822 36.2121 26.2429Z"
                  fill="#4285F4"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.0004 36.6377C28.8722 36.6377 31.28 35.6852 33.0398 34.0607L29.6023 31.3919C28.6498 32.0301 27.4315 32.4072 26.0004 32.4072C23.2301 32.4072 20.8852 30.5362 20.0488 28.0221H16.4952V30.7779C18.2454 34.2541 21.8425 36.6377 26.0004 36.6377Z"
                  fill="#34A853"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.0498 28.0221C19.837 27.3839 19.7162 26.7022 19.7162 26.0011C19.7162 25.3001 19.837 24.6184 20.0498 23.9802V21.2244H16.4962C15.7758 22.6603 15.3649 24.2848 15.3649 26.0011C15.3649 27.7175 15.7758 29.3419 16.4962 30.7779L20.0498 28.0221Z"
                  fill="#FBBC05"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.0004 19.5952C27.562 19.5952 28.9641 20.1318 30.0664 21.1858L33.1172 18.1351C31.2751 16.4187 28.8674 15.3647 26.0004 15.3647C21.8425 15.3647 18.2454 17.7483 16.4952 21.2245L20.0488 23.9803C20.8852 21.4662 23.2301 19.5952 26.0004 19.5952Z"
                  fill="#EA4335"
                />
              </svg>
            </a>
            <a
              className="icon"
              href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=65c16479aad3bd2432ff5b21c96824cf&redirect_uri=http://localhost/oauth"
            >
              <svg
                width="53"
                height="53"
                viewBox="0 0 53 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.0012207"
                  y="0.000854492"
                  width="52.0006"
                  height="52.0006"
                  rx="26.0003"
                  fill="#1EC800"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M29.0852 17.1375V25.932L23.0591 17.1375H16.5468V34.5712H23.0381V25.7756L29.0632 34.5712H35.5755V17.1375H29.0852Z"
                  fill="white"
                />
              </svg>
            </a>
            <a
              className="icon"
              href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=65c16479aad3bd2432ff5b21c96824cf&redirect_uri=http://localhost/oauth"
            >
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_4633_135226)">
                  <rect
                    width="52.0006"
                    height="52.0006"
                    rx="26.0003"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M29.2137 15.4014C28.4797 16.315 27.2471 17.0002 26.2637 17.0002C26.1529 17.0002 26.0421 16.9859 25.9729 16.9716C25.959 16.9145 25.9313 16.7432 25.9313 16.5719C25.9313 15.4014 26.4992 14.2594 27.1224 13.5313C27.9118 12.5749 29.2275 11.8611 30.3217 11.8183C30.3494 11.9468 30.3632 12.1038 30.3632 12.2608C30.3632 13.4171 29.8785 14.5734 29.2137 15.4014ZM24.397 33.8476C23.9034 34.0661 23.4357 34.2731 22.8011 34.2731C21.4438 34.2731 20.502 32.9884 19.4218 31.4181C18.1615 29.5623 17.1366 26.693 17.1366 23.9807C17.1366 19.6125 19.8927 17.3 22.6072 17.3C23.3995 17.3 24.1234 17.5994 24.7671 17.8657C25.2824 18.0788 25.7463 18.2707 26.1527 18.2707C26.5052 18.2707 26.9445 18.0917 27.4565 17.8832C28.1716 17.5919 29.0286 17.2429 29.989 17.2429C30.5984 17.2429 32.8282 17.3 34.2963 19.4698C34.2878 19.4765 34.2699 19.4887 34.2437 19.5065C33.8825 19.7523 31.9557 21.0634 31.9557 23.7523C31.9557 27.0784 34.7671 28.2633 34.8641 28.2918C34.8616 28.2982 34.8559 28.3165 34.8467 28.3456C34.7543 28.6405 34.3137 30.046 33.3683 31.4752C32.4404 32.8456 31.4571 34.2446 29.989 34.2446C29.2655 34.2446 28.8044 34.0341 28.3284 33.8168C27.8203 33.5849 27.2953 33.3452 26.4158 33.3452C25.5317 33.3452 24.9482 33.6035 24.397 33.8476Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4633_135226">
                    <rect width="52.0006" height="52.0006" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
