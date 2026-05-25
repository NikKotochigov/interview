import React, { useRef } from 'react';

/*
Реализовать хук useFirstRender.

Должен вернуть:
- true на самом первом рендере компонента
- false на всех следующих рендерах
*/

export const useFirstRender = () => {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }
  return false;

};

// Пример использования (как на скрине)
export default function RenderAfterFirstRender(props) {
  // Можно переключить на state-вариант, чтобы увидеть поведение:
  // const isFirstRender = useFirstRenderState();
  const isFirstRender = useFirstRender();

  if (isFirstRender) return 'ничего';
  return props.children;
}

