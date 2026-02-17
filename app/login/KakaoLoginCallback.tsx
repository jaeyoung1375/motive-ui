import { useLocation } from "react-router-dom";
import axios from "@util/AxiosUtils";

export default function GoogleLoginCallback() {
  const { search } = useLocation();
  const code = new URLSearchParams(search).get("code");

  const sendCode = async (code: string) => {
    const res = await axios.post("/oauth/kakao", { code });

    if (res) {
      const token = res;
    }
  };

  if (code) {
    sendCode(code);
  }

  return (
    <>
      <h2>카카오 로그인 중입니다...</h2>
    </>
  );
}
