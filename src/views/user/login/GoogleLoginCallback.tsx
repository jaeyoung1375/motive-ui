import { useLocation } from 'react-router-dom';
import axios from '~util/AxiosUtils';
import { useEffect } from 'react';

export default function GoogleLoginCallback() {
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code');

  useEffect(() => {
    // init
    if (code) {
      sendCode(code);
    }
  }, []);

  const sendCode = async (code: string) => {
    const res = await axios.post('/oauth/google', { code });

    if (res) {
      const token = res;
    }
  };

  return (
    <>
      <h2>구글 로그인 중입니다...</h2>
    </>
  );
}
