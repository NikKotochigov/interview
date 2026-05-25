import React from 'react';

/**
 * Условие (как на скрине): найти неточности и отрефакторить.
 *
 * Исходник:
 *
 * const PleaseReviewMe = () => {
 *   const [count, setCount] = React.useState(1);
 *   const [items, setItems] = React.useState([{ id: 1 }]);
 *
 *   React.useLayoutEffect(() => {
 *     document.addEventListener('click', () => {
 *       setInterval(() => console.log(count), 1000);
 *     });
 *   });
 *
 *   const click = React.useCallback(() => {
 *     setCount(count + 1);
 *     setItems([...items, { id: count + 1 }]);
 *   });
 *
 *   return (
 *     <>
 *       Current count: {count}
 *       <ul>
 *         {items.map((item) => (
 *           <li>{item.id}</li>
 *         ))}
 *       </ul>
 *       <button onClick={() => click()}>add one</button>
 *     </>
 *   );
 * };
 *
 * Что не так (коротко):
 * - useLayoutEffect без deps: на каждый рендер навешивает новый listener → утечка
 * - listener анонимный: нельзя снять removeEventListener
 * - на каждый клик по document создаётся новый interval без clearInterval → утечка
 * - interval логирует stale count (замыкание)
 * - useCallback без deps: бессмысленно; plus stale items/count в обработчике
 * - setItems([...items, ...]) небезопасно при батчинге → лучше функционально
 * - в списке нет key
 * - onClick={() => click()} лишняя обёртка
 * - useLayoutEffect тут не нужен, достаточно useEffect
 */

export default function PleaseReviewMeRefactored() {
  const [count, setCount] = React.useState(1);
  const [items, setItems] = React.useState([{ id: 1 }]);

  React.useEffect(() => {
    let intervalId = null;

    const onDocClick = () => {
      if (intervalId != null) return;

      intervalId = window.setInterval(() => {
        // Получаем актуальный count без ref (через функциональный setState).
        setCount((c) => {
          // eslint-disable-next-line no-console
          console.log(c);
          return c;
        });
      }, 1000);
    };

    document.addEventListener('click', onDocClick);
    return () => {
      document.removeEventListener('click', onDocClick);
      if (intervalId != null) clearInterval(intervalId);
    };
  }, []);

  const click = () => {
    setCount((c) => {
      const next = c + 1;
      setItems((prev) => [...prev, { id: next }]);
      return next;
    });
  };

  return (
    <>
      <div>Current count: {count}</div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.id}</li>
        ))}
      </ul>
      <button type="button" onClick={click}>
        add one
      </button>
    </>
  );
}

