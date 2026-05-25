import React, { createContext, useContext, useState } from 'react';

/**
 * Вариант 1: один counter и в проп, и в Context.
 * Вопрос: сколько ререндеров A и B при одном нажатии?
 * Ответ: по одному ререндеру A и B за клик (одно обновление state → один коммит).
 *
 * Вариант 2: два state (counter1 в проп B, counter2 в value Provider), в handleClick оба +1.
 * Вопрос: поменяется ли количество ререндеров?
 * Ответ: нет — в одном обработчике клика оба setState батчатся (React 18+; в обработчиках
 * событий React и раньше обычно батчил). Снова один коммит → по одному ререндеру A и B.
 * B не рендерится дважды из-за «и проп, и контекст» — это один проход реконсиляции.
 *
 * Вариант 3: как вариант 2, но B объявлена ВНУТРИ тела A.
 * Вопрос: поменяется ли количество рендеров?
 * Ответ: за клик по-прежнему один коммит → тело A выполняется один раз; оба setState батчатся.
 * Главное отличие: при каждом рендере A функция B — новая ссылка → для React это ДРУГОЙ тип
 * дочернего элемента → не «ререндер того же B», а размонтаж старого инстанса и монтаж нового
 * (теряется локальный state и сбрасываются эффекты только что смонтированной B).
 *
 * С момента монтирования после первого клика у вариантов 1–2: по 2 отрисовки A и B (mount + update).
 * Strict Mode в dev может удваивать вызовы render-функций — отдельный нюанс.
 */

const CounterContext = createContext(null);

const B = ({ counter }) => {
  const counterFromContext = useContext(CounterContext);

  return (
    <>
      <div>{counter}</div>
      <div>{counterFromContext}</div>
    </>
  );
};

// Вариант 1 — сколько ререндеров А и B при нажатии на кнопку?
const AOneCounter = () => {
  const [counter, setCounter] = useState(0);

  return (
    <CounterContext.Provider value={counter}>
      <button type="button" onClick={() => setCounter((prev) => prev + 1)}>
        Click me
      </button>
      <B counter={counter} />
    </CounterContext.Provider>
  );
};

// Вариант 2 — поменяется ли количество ререндеров в таком случае?
const ATwoCounters = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const handleClick = () => {
    setCounter1((prev) => prev + 1);
    setCounter2((prev) => prev + 1);
  };

  return (
    <CounterContext.Provider value={counter2}>
      <button type="button" onClick={handleClick}>
        Click me
      </button>
      <B counter={counter1} />
    </CounterContext.Provider>
  );
};

// Вариант 3 — B внутри A: поменяется ли количество рендеров в таком случае?
const ATwoCountersNestedB = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const handleClick = () => {
    setCounter1((prev) => prev + 1);
    setCounter2((prev) => prev + 1);
  };

  const BNested = ({ counter }) => {
    const counterFromContext = useContext(CounterContext);

    return (
      <>
        <div>{counter}</div>
        <div>{counterFromContext}</div>
      </>
    );
  };

  return (
    <CounterContext.Provider value={counter2}>
      <button type="button" onClick={handleClick}>
        Click me
      </button>
      <BNested counter={counter1} />
    </CounterContext.Provider>
  );
};

export { AOneCounter, ATwoCounters, ATwoCountersNestedB, B, CounterContext };
export default AOneCounter;
