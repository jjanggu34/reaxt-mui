/**
 * @fileoverview [확장] global
 *
 * @author 
 * @version 1.0.0
 */

import { createRoot, Root } from "react-dom/client";

declare global {
  interface Document {
    getRoot: (formId: string) => Root;
    removeRoot: (formId: string) => void;
  }
}

// formId별 Root 관리
const rootMap: Map<string, Root> = new Map();

document.getRoot = function (formId: string): Root {
  let container = this.getElementById(formId);

  if (!container) {
    container = this.createElement("div");
    container.id = formId;
    this.body.appendChild(container);
  }

  // 해당 formId에 대한 Root가 없으면 생성 후 저장
  if (!rootMap.has(formId)) {
    rootMap.set(formId, createRoot(container));
  }

  return rootMap.get(formId)!;
};

document.removeRoot = function (formId: string) {
  const container = this.getElementById(formId);
  if (container && rootMap.has(formId)) {
    // React 18의 Root에서 언마운트 (UI 제거)
    rootMap.get(formId)?.unmount();
    rootMap.delete(formId); // Map에서 제거

    // DOM에서도 제거
    container.remove();
  }
};


export {}; // 모듈로 인식하도록 설정