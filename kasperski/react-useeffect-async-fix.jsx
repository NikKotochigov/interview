/**
 * Исправленный пример из скрина: загрузка данных в React через useEffect.
 *
 * Частые ошибки в исходнике:
 * - useEffect(async () => ...) — эффект не должен возвращать Promise
 * - data = undefined → data.map падает (нужно [])
 * - нет зависимостей useEffect → stale data / не обновится при queryParameter
 * - нет защиты от setState после unmount
 */

import { useEffect, useState } from "react";

// Заглушка для примера (в реальном коде приходит снаружи)
async function fetchDataFromServer(queryParameter) {
  await new Promise((r) => setTimeout(r, 200));
  return [`result for: ${queryParameter}`];
}

export function DataList({ queryParameter }) {
  const [data, setData] = useState([]); // чтобы можно было делать data.map
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchDataFromServer(queryParameter);
        if (!cancelled) setData(result);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [queryParameter]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Ошибка: {String(error?.message ?? error)}</div>;

  return (
    <div>
      {data.map((dataElement, idx) => (
        <div key={idx}>{dataElement}</div>
      ))}
    </div>
  );
}

