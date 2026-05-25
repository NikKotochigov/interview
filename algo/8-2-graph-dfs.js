// =============================================================================
// Условие задачи (граф — DFS, достижимость)
// =============================================================================
//
// Дано:
//   - ориентированный граф (список смежности), тот же что в 8-1-graph-bfs.js
//   - вершины start, end
//
// Вернуть:
//   - true, если существует путь из start в end
//   - false иначе
//
// Примеры:
//   dfs(graph, 'a', 'g')  →  true
//   dfs(graph, 'a', 'z')  →  false
//
// Сложность:
//   Время:  O(V + E)
//   Память: O(V) — стек / рекурсия и visited
//
// Алгоритм: DFS — стек (итеративно) или рекурсия.
//
// Пример dfs(graph, 'a', 'g'):
//   stack: [a] → pop a, push b,c → [b,c]
//   pop c ... или pop b (зависит от порядка push) — уходит вглубь по одной ветке
//   типичный путь: a → b → e → g → true
//
// BFS: очередь + shift — слоями.
// DFS: стек + pop — вглубь.

const graph = {
    a: ['b', 'c'],
    b: ['e'],
    c: ['d', 'f'],
    d: ['e'],
    e: ['g'],
    f: ['e'],
    g: [],
};

// --- Итеративный DFS (стек) — зеркало BFS ---
const dfs = (graph, start, end) => {
    if (start === end) return true;

    const visited = new Set();
    const stack = [start];

    while (stack.length > 0) {
        const node = stack.pop(); // последний = «самый глубокий» из добавленных

        if (node === end) return true;
        if (visited.has(node)) continue;

        visited.add(node);

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
            }
        }
    }

    return false;
};

// --- Рекурсивный DFS — та же логика, call stack вместо массива ---
const dfsRecursive = (graph, start, end, visited = new Set()) => {
    if (start === end) return true;

    visited.add(start);

    for (const neighbor of graph[start]) {
        if (!visited.has(neighbor)) {
            if (dfsRecursive(graph, neighbor, end, visited)) return true;
        }
    }

    return false;
};

console.log(dfs(graph, 'a', 'g'));           // true
console.log(dfs(graph, 'a', 'z'));           // false
console.log(dfsRecursive(graph, 'a', 'g'));  // true
