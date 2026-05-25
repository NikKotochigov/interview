import React, { useEffect, useRef, useState } from 'react';

/*
Задача со скрина: указать неточности и что исправить.

Исходный код (с ошибками):

const pleaseReviewMe = () => {
  const [count, setCount] = React.useState(1);
  const [items, setItems] = React.useState([{ id: 1 }]);

  React.useLayoutEffect(() => {
    setInterval(() => console.log(count), 1000);
  });

  const click = React.useCallback(() => {
    setCount(count + 1);
    setItems([...items, { id: count + 1 }]);
  });

  return (
    <React.Fragment>
      <ul>
        {items.map((item) => (
          <li>{item.id}</li>
        ))}
      </ul>
      <button onClick={() => click()}>add one</button>
    </React.Fragment>
  );
};

export default PleaseReviewMe;

--------------------------------------------------------------------------------
Что не так
--------------------------------------------------------------------------------
1) Имя компонента camelCase, экспорт PascalCase — несовпадение (часто ReferenceError).
2) useLayoutEffect без массива зависимостей — эффект на каждом рендере: новый setInterval
   без clearInterval → утечка и несколько таймеров.
3) Замыкание в interval: count «застывает» до следующего перезапуска эффекта.
4) useCallback без зависимостей — новая функция каждый рендер; без memo у детей можно убрать.
5) setCount(count + 1) / setItems([...items, ...]) — лучше функциональные обновления.
6) У <li> нет key — предупреждение React и риски при изменении списка.
7) onClick={() => click()} — лишняя обёртка; достаточно onClick={click}.
8) Для таймера useLayoutEffect не нужен; useEffect + cleanup достаточно.
*/

/**
 * Рефакторинг: один интервал, актуальный count через ref, обработчик без лишнего useCallback,
 * key на элементах списка, совпадающее имя экспорта.
 */
export default function PleaseReviewCounter() {
  const [count, setCount] = useState(1);
  const [items, setItems] = useState([{ id: 1 }]);
  const countRef = useRef(count);
  countRef.current = count;

  useEffect(() => {
    const id = setInterval(() => {
      console.log(countRef.current);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const click = () => {
    setCount((c) => c + 1);
    setItems((prev) => [...prev, { id: prev.at(-1).id + 1 }]);
  };

  return (
    <React.Fragment>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.id}</li>
        ))}
      </ul>
      <button type="button" onClick={click}>
        add one
      </button>
    </React.Fragment>
  );
}
