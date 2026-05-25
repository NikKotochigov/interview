/**
 * Задача: Todo — типы через Omit и Pick (Сбер / подготовка).
 */

// =============================================================================
// Задача
// =============================================================================
//
// interface Todo {
//   title: string;
//   description: string;
//   completed: boolean;
// }
//
// /* реализовать тип в котором будут поля title и description с помощью Omit */
// type TodoTitleAndDescription = ...
//
// /* реализовать тип в котором будут поля title и completed с помощью Pick */
// type TodoTitleAndCompleted = ...

// =============================================================================
// Решение
// =============================================================================
//
// Omit<T, K> — объектный тип без ключей K. Убираем completed → остаются title и description.
// Pick<T, K> — только перечисленные ключи K. Берём 'title' | 'completed'.

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoTitleAndDescription = Omit<Todo, 'completed'>;

type TodoTitleAndCompleted = Pick<Todo, 'title' | 'completed'>;

// Проверка (раскомментировать при необходимости):
// const a: TodoTitleAndDescription = { title: 't', description: 'd' };
// const b: TodoTitleAndCompleted = { title: 't', completed: false };
