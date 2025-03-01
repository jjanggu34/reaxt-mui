import { GLog } from '@assets/js/common';
import { messageView } from '@src/components/Alert';
import { progressBar } from '@src/components/Loading';
import DataSet from '@assets/io/DataSet';
import AsyncPromiss from '../io/AsyncPromiss';

export const NativeUtil = (() => {

  // _bridgeCallBack 객체를 각 cmd에 해당하는 콜백 함수를 저장할 수 있도록 선언합니다.
  const _bridgeCallBack: { [cmd: string]: (result: DataSet) => void } = {};

  /** [공통] 앱 환경인지 조회 */
  const _isApp = (): boolean => {
    
    //로컬 예외
    // if (APP_ENV == AppEnvType.LOCAL) {
    //   return false;
    // }
    
    //네이티브면 브릿지 함수가 window object 에 등록되어있는데 이걸로 앱 인지 웹인지 판단
    if (  typeof (window as any)?.webkit?.messageHandlers?.gnb === 'object'  //아이폰
        ||typeof (window as any)?.gnb === 'object')                          //안드로이드
    {
      return true;
    } 

    return false;
  };

  /**
   * [공통]  네이티브 전송 메세지 생성
   * @param callback 네이티브 통신 후 실행할 콜백 함수 이름
   * @param cmd 네이티브 호출할 인터페이스 함수 이름
   * @param param 전달 파라미터
   * @returns 
   */
  const makeMessage = (callback: string, cmd: string, param: DataSet): DataSet => {
    return new DataSet({ callback, cmd, ...param });
  };

  /** [공통]  네이티브 함수 호출  */
  const nativeCall = (message: DataSet): Promise<DataSet> => {
    return new AsyncPromiss((success, fail) => {

      // 네이티브 응답을 받을 콜백을 _bridgeCallBack에 저장
      _bridgeCallBack[message.getString('cmd')] = (result: DataSet) => { success(result); };

      try {
        if (typeof (window as any)?.webkit?.messageHandlers?.gnb === 'object') {
          (window as any)?.webkit?.messageHandlers?.gnb.postMessage(JSON.stringify(message)); //아이폰
        }
        else if (typeof (window as any)?.gnb === 'object') {
          (window as any)?.gnb[message.getString('cmd')](JSON.stringify(message)); //안드로이드
        }
      } catch (e) {
        GLog.e('Native 통신 에러 : ', e);
        progressBar(false);
        fail(new Error('네이티브 인터페이스를 찾을 수 없습니다. : '+message.getString('cmd')));
      }
    });
  };

  /** [공통]  네이티브 함수 호출  */
  const _error = (message: string): void => {
    progressBar(false);
		messageView(message);
	};

  // //네이티브 통신


  /** [공통]  앱종료  */
  const _appClose = () => {
    if (_isApp()) {

      //1. 파라미터 셋팅
      const message = makeMessage('NativeUtil.bridgeCallBack', 'appClose', new DataSet({}));

      //2. 네이티브 통신
      nativeCall(message);

      //앱종료기때문에 이후 로직 필요 없음
    } else {
      progressBar(false);
      messageView("앱에서만 가능합니다.");
    }
  };


  /**[공통] 디바이스 물리 뒤로가기 버튼  */
	const _fnBackBtn = function(){
		GLog.d('뒤로가기');
    progressBar(true);
    setTimeout(() => {
      window.history.back(); // 브라우저의 이전 페이지로 이동
      progressBar(false);
    }, 300);
	};

  /**[공통] 앱이 포어그라운드로 전환후 호출하는 웹 함수  */
  const _fnForeGround = (): void => {
    GLog.d("앱 포어그라운드로 올라옴");
  }

	/**[공통] 앱이 백그라운드로 내려가기전 호출하는 웹 함수  */
  const _fnBackGround = (): void => {
    GLog.d("앱 백그라운드로 내려감");
  }

  /**[공통] 앱이 포어그라운드 상태일때 푸쉬알림 수신시 호출하는 웹함수  */
	const _fnPushLink = (): void => {
    GLog.d("푸쉬링크");
  }

  
  /** 앱웹 체크 메세지 */
  const nativeCheckFail = (): AsyncPromiss => {
    progressBar(false);
    return AsyncPromiss.resolve(new DataSet({ 'resultCd': '9990' , 'msg': '앱에서만 가능합니다.' }));
  }


  /** [1] 디바이스 정보 조회  */
  const _getDeviceInfo = (): AsyncPromiss => {
    if (_isApp()) {
      // 1. 파라미터 셋팅
      const message = makeMessage('NativeUtil.bridgeCallBack', 'getDeviceInfo', new DataSet({}));
  
      // 2. 네이티브 통신
      return nativeCall(message);
    } else {
      // 로컬값 셋팅
      return AsyncPromiss.resolve(new DataSet({
        'APPLICATION_ID': 'com.gnbsoftec.dolphinnative',
        'BUILD_TYPE': '',
        'VERSION_CODE': '1.0.0',
        'VERSION_NAME': '1',
        'SIM_STATE': 'local',
        'NET_OPERATOR': 'local',
        'PHONE_NUMBER': '',
        'PUSH_KEY': 'local'
      }));
    }
  };

  /** [2] 내부 저장소 등록 */
  const _setAppdata = (data : DataSet): AsyncPromiss => {
    GLog.d('내부 저장소 등록');
    if (_isApp()) {
      const message = makeMessage('NativeUtil.bridgeCallBack', 'setLocalStorage', data);
      return nativeCall(message);
    } else {
      return nativeCheckFail();
    }
  };

/** [3] 내부 저장소 조회 */
const _getAppdata = (keys: string[]): AsyncPromiss => {
  if (_isApp()) {
    const message = makeMessage('NativeUtil.bridgeCallBack', 'getLocalStorage', new DataSet({ 'keys' : keys }));
    return nativeCall(message);
  } else {
    return nativeCheckFail();
  }
};

/** [4] 갤러리 이미지 조회 */
const _getGalleryImage = (): AsyncPromiss => {
  if (_isApp()) {
    const message = makeMessage('NativeUtil.bridgeCallBack', 'getGalleryImage', new DataSet({}));
    return nativeCall(message);
  } else {
    return nativeCheckFail();
  }
};

/** [5] 카메라 촬영 후 이미지 조회 */
const _getCameraImage = (): AsyncPromiss => {
  if (_isApp()) {
    const message = makeMessage('NativeUtil.bridgeCallBack', 'getCameraImage', new DataSet({}));
    return nativeCall(message);
  } else {
    return nativeCheckFail();
  }
};

/** [6] 파일 다운로드 (URL) */
const _urlFileDownload = (fileUrl: string): AsyncPromiss => {
  if (_isApp()) {
    const message = makeMessage('NativeUtil.bridgeCallBack', 'urlFileDownload', new DataSet({ 'fileUrl':fileUrl }));
    return nativeCall(message);
  } else {
    return nativeCheckFail();
  }
};

/** [7] 파일 다운로드 (Base64) */
const _base64FileDownload = (fileName: string, base64str: string): AsyncPromiss => {
  if (_isApp()) {
    const message = makeMessage('NativeUtil.bridgeCallBack', 'base64FileDownload', new DataSet({ 'fileName':fileName, 'base64str':base64str  }));
    return nativeCall(message);
  } else {
    return nativeCheckFail();
  }
};

/** [8] 퍼미션 상태 체크 */
const _permissionSelect = (): AsyncPromiss => {
  if (_isApp()) {
    const message = makeMessage('NativeUtil.bridgeCallBack', 'permissionSelect', new DataSet({}));
    return nativeCall(message);
  } else {
    return nativeCheckFail();
  }
};

/** [9] 퍼미션 체크 */
const _permissionCheck = (): AsyncPromiss => {
  if (_isApp()) {
    const message = makeMessage('NativeUtil.bridgeCallBack', 'permissionCheck', new DataSet({}));
    return nativeCall(message);
  } else {
    return nativeCheckFail();
  }
};

/** [11] 알림 메시지 출력 */
const _showNotification = (title: string, message: string): AsyncPromiss => {
  if (_isApp()) {
    const msg = makeMessage('NativeUtil.bridgeCallBack', 'showNotification', new DataSet({'title':title,'msg':message}));
    return nativeCall(msg);
  } else {
    return nativeCheckFail();
  }
};

/** [12] 푸시 리스트 조회 */
const _pushList = (): AsyncPromiss => {
  if (_isApp()) {
    const message = makeMessage('NativeUtil.bridgeCallBack', 'pushList', new DataSet({}));
    return nativeCall(message);
  } else {
    return nativeCheckFail();
  }
};

/** [13] 푸시 리스트 제거 */
const _pushDelete = (): AsyncPromiss => {
  if (_isApp()) {
    const message = makeMessage('NativeUtil.bridgeCallBack', 'pushDelete', new DataSet({}));
    return nativeCall(message);
  } else {
    return nativeCheckFail();
  }
};

/** [14] 푸시 그룹 변경 */
const _pushTopicUpdate = (topic: string): AsyncPromiss => {
  if (_isApp()) {
    const message = makeMessage('NativeUtil.bridgeCallBack', 'pushTopicUpdate', new DataSet({ topic : topic }));
    return nativeCall(message);
  } else {
    return nativeCheckFail();
  }
};

  /** [15] 캡처하기 */
  const _capture = (type: string): AsyncPromiss => {
    if (_isApp()) {
      const message = makeMessage('NativeUtil.bridgeCallBack', 'capture', new DataSet({ type : type }));
      return nativeCall(message);
    } else {
      return nativeCheckFail();
    }
  };

  // 필요한 다른 함수나 변수들도 여기에 추가할 수 있습니다.

  return {
    bridgeCallBack        : _bridgeCallBack			//[공통]네이티브 처리후 콜백함수 저장소 
    ,isApp                : _isApp					    //[공통]네이티브 앱인지 판단
    ,error 							  : _error              //[공통]네이티브 에러 메세지 뷰
		,appClose 						: _appClose 					//[공통]앱종료
		,fnBackGround 				: _fnBackGround 			//[공통]앱이 백그라운드로 내려가기전 호출하는 웹 함수
		,fnForeGround 				: _fnForeGround 			//[공통]앱이 포어그라운드로 전환후 호출하는 웹 함수
		,fnPushLink 					: _fnPushLink 				//[공통]앱이 포어그라운드 상태일때 푸쉬알림 수신시 호출하는 웹함수
		,fnBackBtn 					  : _fnBackBtn 				  //[공통]디바이스 물리 뒤로가기 버튼
		
		,getDeviceInfo 				: _getDeviceInfo 			//[1]디바이스 정보 얻어오기(버전정보,휴대폰번호,푸쉬키)
		,setAppdata 					: _setAppdata 				//[2]내부저장소 등록
		,getAppdata 					: _getAppdata 				//[3]내부저장소 조회
		,getGalleryImage 			: _getGalleryImage 		//[4]갤러리 이미지 조회
		,getCameraImage 		  : _getCameraImage 		//[5]카메라 촬영후 이미지 조회
		,urlFileDownload 			: _urlFileDownload 		//[6]파일 다운로드 (URL)
		,base64FileDownload 	: _base64FileDownload //[7]파일 다운로드 (Base64)
		,permissionSelect 		: _permissionSelect 	//[8]퍼미션 상태체크
		,permissionCheck 			: _permissionCheck 		//[9]퍼미션 체크
		,showNotification 		: _showNotification		//[10]알림 메세지 출력
		,pushList 						: _pushList					  //[11]푸쉬 리스트 조회
		,pushDelete 					: _pushDelete				  //[12]푸쉬 리스트 제거
		,pushTopicUpdate 			: _pushTopicUpdate		//[13]푸쉬 그룹 변경		
		,capture 						  : _capture						//[14]캡처하기
  };
})();

export default NativeUtil;