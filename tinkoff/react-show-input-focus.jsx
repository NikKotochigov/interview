/**
 * Задача (интервью): кнопка по клику показывает input и должна поставить на него фокус.
 *
 * Почему ломается вариант с setIsVisible(true) и сразу inputRef.current.focus():
 * setState асинхронный — после клика ре-рендер ещё не выполнен, <input> в DOM ещё не
 * смонтирован, ref.current === null, фокус не ставится.
 *
 * Исправление: фокус после того, как input появился — например useEffect при isVisible === true.
 */

import { useEffect, useRef, useState } from "react";

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      inputRef.current?.focus();
    }
  }, [isVisible]);

  const showInput = () => {
    setIsVisible(true);
  };

  return (
    <div>
      <button onClick={showInput}>Show and focus input</button>
      {isVisible && <input ref={inputRef} type="text" />}
    </div>
  );
}
