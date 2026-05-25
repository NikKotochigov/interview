// =============================================================================
// Условие задачи (структуры данных — односвязный список)
// =============================================================================
//
// Реализовать класс LinkedList:
//   - append(value)  — добавить в конец, O(n)
//   - prepend(value) — добавить в начало, O(1)
//   - toArray()      — массив значений от head до конца
//
// Пример:
//   append(1), append(2), append(3)  →  toArray() = [1, 2, 3]
//   prepend(0)                     →  toArray() = [0, 1, 2, 3]
//
// Сложность:
//   append:   O(n) время, O(1) память
//   prepend:  O(1) время, O(1) память
//   toArray:  O(n) время, O(n) память
//
// Узел: { value, next }. head — первый узел или null.
//
// Пример построения списка [1, 2, 3]:
//
// append(1):  head → [1|·]
// append(2):  head → [1|·] → [2|·]
// append(3):  head → [1|·] → [2|·] → [3|null]
//
// toArray(): [1, 2, 3]

class ListNode {
    constructor(value, next = null) {
        this.value = value; // данные узла
        this.next = next;   // ссылка на следующий узел (или null)
    }
}

class LinkedList {
  constructor() {
    this.head = null; // первый узел; пустой список — head === null
    this.size = 0;
  }

  // Добавить в конец — O(n), т.к. идём от head до последнего узла
  append(value) {
    const node = new ListNode(value);

    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }

    this.size++;
  }

  // Добавить в начало — O(1)
  prepend(value) {
    this.head = new ListNode(value, this.head);
    this.size++;
  }

  // Для отладки: список → массив
  toArray() {
    const result = [];
    let current = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }
}

const list = new LinkedList();

list.append(1);
list.append(2);
list.append(3);

console.log(list.toArray()); // [1, 2, 3]

list.prepend(0);
console.log(list.toArray()); // [0, 1, 2, 3]
