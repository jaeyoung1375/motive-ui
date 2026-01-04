import { Code } from '../types/Code';
import { get } from './AxiosUtils';

/**
 * content : 코드 목록 조회
 * params: {string} groupCode
 */
export const pfnCodeList = async (codeGroup: string) => {
  const res = await get<ApiResponse<Code[]>>('/codes', {
    params: { codeGroup }
  });

  return res;
};
