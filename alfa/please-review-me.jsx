import React from "react";
import sendMetric from "metrics";
import sendData from "data";
import bigComputations from "bigComputations";

/*
ПЕРВОНАЧАЛЬНЫЙ ВАРИАНТ (как на скрине, с проблемами):

import React from 'react';
import sendMetric from 'metrics';
import sendData from 'data';
import bigComputations from 'bigComputations';

const pleaseReviewMe = (props) => {
  const [data, setDate] = React.useState(bigComputations(props.argument));
  const [items] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);

  React.useEffect(() => {
    document.addEventListener('click', () => {
      sendMetric('click');
    });
  });

  const click = React.useCallback((id) => {
    sendData(data, id);
  });

  return (
    <React.Fragment>
      {items.map((item) => (
        <div onClick={() => click(item.id)}>{item.id}</div>
      ))}
    </React.Fragment>
  );
};

export default pleaseReviewMe;
*/

/**
 * Исправленная версия компонента со скрина:
 * - тяжёлые вычисления не запускаются на каждом рендере
 * - document listener вешается 1 раз и снимается в cleanup
 * - зависимости useCallback корректные (чтобы не было stale data)
 * - опечатки setDate -> setData
 */
const PleaseReviewMe = (props) => {
  // Вариант 1 (как на скрине, но правильно): посчитать 1 раз при монтировании
  // Если props.argument должен влиять на data после mount — см. вариант 2 ниже.
  const [data, setData] = React.useState(() => bigComputations(props.argument));

  // Вариант 2 (если argument может меняться и нужно пересчитывать data):
  // const data = React.useMemo(() => bigComputations(props.argument), [props.argument]);

  // Если items не меняются — это просто константа (не state)
  const items = React.useMemo(() => [{ id: 1 }, { id: 2 }, { id: 3 }], []);

  React.useEffect(() => {
    const onDocClick = () => {
      sendMetric("click");
    };

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const click = (id) => {
    sendData(data, id);
  };

  return (
    <React.Fragment>
      {items.map((item) => (
        <div key={item.id} onClick={() => click(item.id)}>
          {item.id}
        </div>
      ))}
    </React.Fragment>
  );
};

export default PleaseReviewMe;
