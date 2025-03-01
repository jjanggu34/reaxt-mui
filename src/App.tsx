// src/App.tsx
import {Routes,Route,BrowserRouter} from "react-router-dom";

// [메인]
import Layout from "@views/common/Layout";
import Main from "@views/Main";
import NativeTest from "@src/views/test/NativeTest";
import Test from "@src/views/test/Test";
import BankingTest from "@src/views/test/BankingTest";
import InputTest from "@src/views/test/InputTest";
import SelectTest from "@src/views/test/selectUI";

// INQ[조회]
import INQ001 from "@src/views/inq/INQ001";
import INQ002 from "@src/views/inq/INQ002";

// TNF[이체]
import TNF001 from "@src/views/tnf/TNF001";
import TNF002 from "@src/views/tnf/TNF002";
import TNF003 from "@src/views/tnf/TNF003";
import TNF004 from "@src/views/tnf/TNF004";
import TNF005 from "@src/views/tnf/TNF005";

// DEP[수신]
import DEP001 from "@src/views/dep/DEP001";
import DEP002 from "@src/views/dep/DEP002";
import DEP003 from "@src/views/dep/DEP003";
import DEP004 from "@src/views/dep/DEP004";
import DEP005 from "@src/views/dep/DEP005";
import DEP006 from "@src/views/dep/DEP006";

// LON[여신]
import LON001 from "@src/views/lon/LON001";
import LON002 from "@src/views/lon/LON002";
import LON003 from "@src/views/lon/LON003";
import LON004 from "@src/views/lon/LON004";
import LON005 from "@src/views/lon/LON005";
import LON006 from "@src/views/lon/LON006";
import LON007 from "@src/views/lon/LON007";
import LON008 from "@src/views/lon/LON008";
import LON009 from "@src/views/lon/LON009";

// EFC[전자금융관리]
import EFC001 from "@src/views/efc/EFC001";
import EFC002 from "@src/views/efc/EFC002";
import EFC003 from "@src/views/efc/EFC003";
import EFC004 from "@src/views/efc/EFC004";
import EFC005 from "@src/views/efc/EFC005";
import EFC006 from "@src/views/efc/EFC006";
import EFC007 from "@src/views/efc/EFC007";
import EFC008 from "@src/views/efc/EFC008";
import EFC009 from "@src/views/efc/EFC009";
import EFC010 from "@src/views/efc/EFC010";
import EFC011 from "@src/views/efc/EFC011";
import EFC012 from "@src/views/efc/EFC012";
import EFC013 from "@src/views/efc/EFC013";
import EFC014 from "@src/views/efc/EFC014";

// 확장 함수
import "@assets/extension/globalExtensions";
import NativeUtil from "./assets/js/common_native";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인,테스트 페이지 라우트 */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="nativeTest.view" element={<NativeTest />} />
          <Route path="test.view" element={<Test />} />
          <Route path="bankingTest.view" element={<BankingTest />} />
          <Route path="inputTest.view" element={<InputTest />} />
          <Route path="SelectTest.view" element={<SelectTest />} />
        </Route>

        {/* 조회 페이지 라우트 */}
        <Route path="/inq" element={<Layout />}>
          <Route path="INQ001.view" element={<INQ001 />} />
          <Route path="INQ002.view" element={<INQ002 />} />
        </Route>

        {/* 이체 페이지 라우트 */}
        <Route path="/tnf" element={<Layout />}>
          <Route path="TNF001.view" element={<TNF001 />} />
          <Route path="TNF002.view" element={<TNF002 />} />
          <Route path="TNF003.view" element={<TNF003 />} />
          <Route path="TNF004.view" element={<TNF004 />} />
          <Route path="TNF005.view" element={<TNF005 />} />
        </Route>

        {/* 수신 페이지 라우트 */}
        <Route path="/dep" element={<Layout />}>
          <Route path="DEP001.view" element={<DEP001 />} />
          <Route path="DEP002.view" element={<DEP002 />} />
          <Route path="DEP003.view" element={<DEP003 />} />
          <Route path="DEP004.view" element={<DEP004 />} />
          <Route path="DEP005.view" element={<DEP005 />} />
          <Route path="DEP006.view" element={<DEP006 />} />
        </Route>

        {/* 여신 페이지 라우트 */}
        <Route path="/lon" element={<Layout />}>
          <Route path="LON001.view" element={<LON001 />} />
          <Route path="LON002.view" element={<LON002 />} />
          <Route path="LON003.view" element={<LON003 />} />
          <Route path="LON004.view" element={<LON004 />} />
          <Route path="LON005.view" element={<LON005 />} />
          <Route path="LON006.view" element={<LON006 />} />
          <Route path="LON007.view" element={<LON007 />} />
          <Route path="LON008.view" element={<LON008 />} />
          <Route path="LON009.view" element={<LON009 />} />
        </Route>

        {/* 전자금융뱅킹 페이지 라우트 */}
        <Route path="/efc" element={<Layout />}>
          <Route path="EFC001.view" element={<EFC001 />} />
          <Route path="EFC002.view" element={<EFC002 />} />
          <Route path="EFC003.view" element={<EFC003 />} />
          <Route path="EFC004.view" element={<EFC004 />} />
          <Route path="EFC005.view" element={<EFC005 />} />
          <Route path="EFC006.view" element={<EFC006 />} />
          <Route path="EFC007.view" element={<EFC007 />} />
          <Route path="EFC008.view" element={<EFC008 />} />
          <Route path="EFC009.view" element={<EFC009 />} />
          <Route path="EFC010.view" element={<EFC010 />} />
          <Route path="EFC011.view" element={<EFC011 />} />
          <Route path="EFC012.view" element={<EFC012 />} />
          <Route path="EFC013.view" element={<EFC013 />} />
          <Route path="EFC014.view" element={<EFC014 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

//네이티브 호출용 함수 추가
(window as any).NativeUtil = NativeUtil;

export default App;
