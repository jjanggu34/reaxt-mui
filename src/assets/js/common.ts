import { progressBar } from "@src/components/Loading";
import axios from 'axios';
import DataSet from "@assets/io/DataSet";
import { useNavigate } from "react-router-dom";

//앱 실행 환경
export enum AppEnvType {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  LOCAL = 'local'
}

export const APP_ENV = (import.meta.env.VITE_APP_ENV as AppEnvType) || AppEnvType.LOCAL;
export const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

//상단 헤더 높이
export const headerHeight = 50;
//하단 헤더 높이
export const bottomNavHeight = 60;

//Data Type : 데이터 폼
// export type DataSet = Record<string,string|number|boolean|JSON|unknown>;


//Data Type : 데이터 전송 요청 폼
export type ApiReq  = {
  serviceCd: string;
  param: DataSet;
}

//Data Type : 데이터 전송 응답 폼
export type ApiRes  = {
  header: {
    respCd: string;
    respMsg: string;
  };
  data: DataSet;
}

export const GLog = (() => {
  const _debug = (logMessage: string): void => {
    if (APP_ENV != AppEnvType.PRODUCTION)console.log("[DEBUG]:" + logMessage);
  };

  const _info = (logMessage: string): void => {
    if (APP_ENV != AppEnvType.PRODUCTION)console.info("[INFO]:" + logMessage);
  };
  
  const _warn = (logMessage: string): void => {
    if (APP_ENV != AppEnvType.PRODUCTION)console.warn("[WARN]:" + logMessage);
  };

  // 에러 익셉션 객체(error)를 선택적 매개변수로 추가
  const _error = (msg: string, error?: unknown): void => {
    if (APP_ENV != AppEnvType.PRODUCTION) {
      if (error == null) {
        console.error("[ERROR]:" + msg);
      } else {
        console.error("[ERROR]:" + msg, error);
      }
    }
  };

  return {
    d: _debug,
    i: _info,
    w: _warn,
    e: _error
  };
})();


/**
 * 공통 함수 모음
 */

export const makeForm = (serviceCd:string): ApiReq => ({
  serviceCd,
  param: new DataSet({})
});

export const addFormData = (form: ApiReq, name: string, value: string): void => {
  form.param.putString(name,value);
};

/**
 * gp_backend 서비스랑 통신하는 함수 입니다.
 * @param req 서비스명,파라미터
 */
export const doAction = async (req: ApiReq): Promise<ApiRes> => {
  try {
    const response = await axios.post(API_URL+'/'+req.serviceCd+'.act', req.param, {
      headers: { 'Content-Type': 'application/json' }
    });

    //응답 데이터
    const { APP_HEADER: appHeader, ...data } = response.data;

    //응답 리턴
    return {
      header: {
        respCd: appHeader?.respCd || "N00000", // 성공 코드
        respMsg: appHeader?.respMsg || "성공적으로 처리되었습니다."
      },
      data: new DataSet(data) // 성공 시 반환 데이터
    };
  } catch (error: any) {
    // 에러 발생 시 처리
    const errorMsg = error.response?.data?.message|| error.message || "처리 중 오류가 발생하였습니다.";

    return {
      header: {
        respCd: "E00000", // 에러 코드
        respMsg: errorMsg
      },
      data: new DataSet({}) // 실패 시 데이터는 null
    };
  }
};


/**
 * 페이지 전환 전 로딩을 켜고, 일정 시간 후 uri로 navigate 합니다.
 * @param uri 이동할 페이지의 경로
 */

export const useAppNavigator = () => {
  const navigate = useNavigate();

  // ✅ `doActionURL()`을 navigate에 추가하여 반환
  const doActionURL = (uri: string) => {
    progressBar(true);
    setTimeout(() => {
      navigate(uri);
      progressBar(false);
    }, 500);
  };

  return Object.assign(navigate, { doActionURL });
};


export default { 
  GLog, 
  APP_ENV, 
  API_URL, 
  headerHeight, 
  bottomNavHeight, 
  makeForm, 
  addFormData, 
  doAction,
  useAppNavigator
};