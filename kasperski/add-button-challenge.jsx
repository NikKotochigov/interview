/**
 * Задача (как на скрине):
 * - При каждом клике на кнопку "Add" появляется новая кнопка со случайным текстом (например, id).
 * - При клике на появившуюся кнопку она удаляется.
 */

import { useCallback, useMemo, useState } from "react";

function makeId() {
  return Math.random().toString(36).slice(2, 8);
}

export default function App() {
  const [items, setItems] = useState([]);

  const add = useCallback(() => {
    setItems((prev) => [...prev, { id: makeId(), label: makeId() }]);
  }, []);

  const removeById = useCallback((id) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const buttons = useMemo(
    () =>
      items.map((x) => (
        <button key={x.id} onClick={() => removeById(x.id)}>
          {x.label}
        </button>
      )),
    [items, removeById]
  );

  return (
    <div className="wrapper">
      <button onClick={add}>Add</button>
      <div className="box-wrapper">{buttons}</div>
    </div>
  );
}

