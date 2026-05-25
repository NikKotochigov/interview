// =============================================================================
// Условие задачи (граф — BFS, достижимость)
// =============================================================================
//
// Дано:
//   - ориентированный граф (список смежности): graph[u] = [соседи u]
//   - вершины start, end
//
// Вернуть:
//   - true, если существует путь из start в end
//   - false иначе
//
// Примеры (граф ниже):
//   bfs(graph, 'a', 'g')  →  true
//   bfs(graph, 'a', 'z')  →  false
//
// Сложность:
//   Время:  O(V + E)
//   Память: O(V) — очередь и visited
//
// Алгоритм: BFS — очередь FIFO, обход слоями.
//
// Пример bfs(graph, 'a', 'g'):
//
// Очередь [a]     | visited: a
// Обрабатываем a  | соседи b, c → в очередь [b, c]
// Обрабатываем b  | сосед e     → [c, e]
// Обрабатываем c  | соседи d, f → [e, d, f]
// Обрабатываем e  | сосед g === end → return true ✓
//
// Путь: a → … → e → g  (например a → b → e → g или a → c → f → e → g)

//   a
//  / \
// b   c
// |   |
// e   f
// \  /
//  g  

const graph = {
    a: ['b', 'c'],
    b: ['e'],
    c: ['d', 'f'],
    d: ['e'],
    e: ['g'],
    f: ['e'],
    g: [],
};

// visited — помечаем при извлечении из очереди (shift), не при добавлении
// queue   — кто ждёт обхода; shift() с начала = слой за слоем (ширина)
const bfs = (graph, start, end) => {
    if (start === end) return true;

    const visited = new Set();
    const queue = [start];

    while (queue.length > 0) {
        const node = queue.shift();

        if (visited.has(node)) continue;
        visited.add(node);

        for (const neighbor of graph[node]) {
            if (neighbor === end) return true;

            if (!visited.has(neighbor)) {
                queue.push(neighbor);
            }
        }
    }

    return false;
};

console.log(bfs(graph, 'a', 'g')); // true
console.log(bfs(graph, 'a', 'z')); // false (вершины z нет)
