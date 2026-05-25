import React, { useRef, useState } from 'react';

/*
Вывести значения полей в консоль при клике на форму,
учитывая что первый input controlled, а второй input uncontrolled.
*/

export default function ControlledUncontrolledForm() {
  const [controlledValue, setControlledValue] = useState('');
  const uncontrolledRef = useRef(null);

  const onSubmitForm = e => {
    e.preventDefault();
    const uncontrolledValue = uncontrolledRef.current?.value ?? '';

    console.log('controlled: ' + controlledValue);
    console.log('uncontrolled: ' + uncontrolledValue);
  };

  return (
    <form onSubmit={onSubmitForm}>
      <input
        placeholder="controlled"
        value={controlledValue}
        onChange={e => setControlledValue(e.target.value)}
      />

      <input ref={uncontrolledRef} placeholder="uncontrolled" defaultValue="" />

      <button type="submit">Отправить заявку на кредит</button>
    </form>
  );
}
