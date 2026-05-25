/**
 * Задача: userService.getFilteredUsers — this в колбэке Array.filter (Сбер / подготовка).
 */

// =============================================================================
// Задача: userService + filter
// =============================================================================
//
// Исходный код:
//
//   const userService = {
//     currentFilter: 'active',
//     users: [
//       {name: 'Alex', status: 'active'},
//       {name: 'Nick', status: 'deleted'},
//     ],
//     getFilteredUsers: function() {
//       return this.users.filter(function (user) {
//         return user.status === this.currentFilter;
//       });
//     }
//   };
//
//   console.log(userService.getFilteredUsers());
//
// Что будет выведено: []

// =============================================================================
// Исправление и объяснение
// =============================================================================
//
// Причина []: в колбэке .filter() стоит обычная function — у неё свой this, не userService
// (в strict mode часто undefined). Внутри колбэка this.currentFilter не равен 'active',
// сравнение не проходит ни для одного user.
//
// Нужно, чтобы внутри колбэка this совпадал с объектом сервиса. Варианты:
// — стрелочная функция: this берётся из getFilteredUsers и указывает на userService;
// — .bind(this) на колбэке;
// — сохранить ссылку: const self = this и использовать self.currentFilter.

const userServiceFixed = {
  currentFilter: 'active',
  users: [
    { name: 'Alex', status: 'active' },
    { name: 'Nick', status: 'deleted' },
  ],
  getFilteredUsers() {
    return this.users.filter((user) => user.status === this.currentFilter);
  },
};

// console.log(userServiceFixed.getFilteredUsers());
// → [{ name: 'Alex', status: 'active' }]
