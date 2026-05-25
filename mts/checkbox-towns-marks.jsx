/**
 * Задача:
 * 1) При двойном клике логировать действие пользователя
 * 2) Отрисовать чекбоксы по массивам towns и marks
 * 3) Запоминать выбранные чекбоксы
 *
 * Отличия от варианта со скрина (черновик в редакторе):
 *
 * - useEffect + dblclick: там часто нет массива зависимостей — слушатель вешается на каждый
 *   рендер и не снимается → лишние обработчики и «утечка». Здесь [] и cleanup с
 *   removeEventListener.
 *
 * - Чекбоксы: там обычно только name + onChange (неконтролируемый input). Здесь ещё
 *   checked из стейта — контролируемый компонент, UI и selectedCheckboxes не расходятся.
 *
 * - setState: там часто setSelectedCheckboxes([...selectedCheckboxes, ...]) — возможен
 *   устаревший selectedCheckboxes в замыкании. Здесь setSelectedCheckboxes(prev => ...)
 *   всегда видит актуальный массив.
 *
 * - ListItem: здесь явно прокидывается checked; на скрине его обычно не было.
 */

import { memo, useCallback, useEffect, useState } from "react";

const towns = [
  { name: "Moscow" },
  { name: "St. Peterburg" },
  { name: "London" },
];

const marks = [
  { name: "Toyota" },
  { name: "Haval" },
  { name: "Nissan" },
];

const ListItem = memo(function ListItem({ name, checked, onChange }) {
  return (
    <li>
      <input type="checkbox" name={name} checked={checked} onChange={onChange} />
      {name}
    </li>
  );
});

export default function List() {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  useEffect(() => {
    const onDblClick = () => {
      console.log("dblclick: пользователь сделал двойной клик по документу");
    };
    document.addEventListener("dblclick", onDblClick);
    return () => document.removeEventListener("dblclick", onDblClick);
  }, []);

  const handleChange = useCallback((e) => {
    const name = e.target.name;
    setSelectedCheckboxes((prev) =>
      prev.includes(name) ? prev.filter((el) => el !== name) : [...prev, name]
    );
  }, []);

  return (
    <div>
      <p>Посещенные Вами города:</p>
      <ul>
        {towns.map((el) => (
          <ListItem
            key={el.name}
            name={el.name}
            checked={selectedCheckboxes.includes(el.name)}
            onChange={handleChange}
          />
        ))}
      </ul>

      <p>Желаемые Вами марки машин:</p>
      <ul>
        {marks.map((el) => (
          <ListItem
            key={el.name}
            name={el.name}
            checked={selectedCheckboxes.includes(el.name)}
            onChange={handleChange}
          />
        ))}
      </ul>
    </div>
  );
}
