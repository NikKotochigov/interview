// =============================================================================
// Условие задачи (граф — алгоритм Дейкстры)
// =============================================================================
//
// Дано:
//   - взвешенный ориентированный граф: graph[u] = [[v, weight], ...]
//   - веса рёбер ≥ 0
//   - стартовая вершина start
//
// Вернуть:
//   - dist — объект: кратчайшее расстояние от start до каждой вершины
//   - (опционально) dijkstraWithPath: { distance, path } до end
//
// Пример (граф ниже), start='a':
//   dist: a=0, b=1, c=3, d=3, e=2
//   путь a→e: [a, b, e], длина 2
//
// BFS подходит только когда все рёбра весят 1.
//
// Сложность (эта реализация):
//   Время:  O(V²) — линейный поиск минимума на каждом шаге
//   Память: O(V) — dist, visited, parent
//   С кучей (priority queue): O((V + E) log V)
//
// Идея: dist[v] = лучшая известная длина пути от start до v.
// Каждый шаг: берём вершину u с минимальным dist (ещё не «зафиксированную»),
// обновляем соседей: dist[сосед] = min(dist[сосед], dist[u] + вес ребра).
//
// Граф (веса на рёбрах):
//
//        1
//    a ----→ b
//    | 4     | 2 \
//    ↓       ↓ 1  ↓ 1
//    c ----→ d    e
//         1
//
// Пример dijkstra(graph, 'a'):
//
// dist: a=0, остальные ∞
// шаг 1 | фиксируем a(0) | b=1, c=4
// шаг 2 | фиксируем b(1) | c=min(4,1+2)=3, d=3, e=2
// шаг 3 | фиксируем e(2) | (соседей нет)
// шаг 4 | фиксируем c(3) | d=min(3,3+1)=3
// шаг 5 | фиксируем d(3) | e=min(2,3+3)=2 (уже лучше)
//
// Итог dist: a=0, b=1, c=3, d=3, e=2  → кратчайший путь a→e: 2 (a→b→e)

const graph = {
    a: [['b', 1], ['c', 4]],
    b: [['c', 2], ['d', 2], ['e', 1]],
    c: [['d', 1]],
    d: [['e', 3]],
    e: [],
};

const dijkstra = (graph, start) => {
    const dist = {};
    const visited = new Set();

    for (const node in graph) {
        dist[node] = Infinity;
    }
    dist[start] = 0;

    while (visited.size < Object.keys(graph).length) {
        // 1. Вершина u с минимальным dist среди незафиксированных
        let u = null;
        let minDist = Infinity;

        for (const node in graph) {
            if (!visited.has(node) && dist[node] < minDist) {
                minDist = dist[node];
                u = node;
            }
        }

        if (u === null || minDist === Infinity) break;

        visited.add(u); // 2. Путь до u уже оптимален — больше не улучшим

        // 3. Релаксация рёбер из u
        for (const [neighbor, weight] of graph[u]) {
            const alt = dist[u] + weight;

            if (alt < dist[neighbor]) {
                dist[neighbor] = alt;
            }
        }
        console.log({ u, dist, visited });
    }

    return dist;
};


// const graph = {
//     a: [['b', 1], ['c', 4]],
//     b: [['c', 2], ['d', 2], ['e', 1]],
//     c: [['d', 1]],
//     d: [['e', 3]],
//     e: [],
// };

// Восстановление пути до end (если нужен маршрут, а не только длина)
const dijkstraWithPath = (graph, start, end) => {
    const dist = {};
    const parent = {};
    const visited = new Set();

    for (const node in graph) {
        dist[node] = Infinity;
        parent[node] = null;
    }
    dist[start] = 0;

    while (visited.size < Object.keys(graph).length) {
        let u = null;
        let minDist = Infinity;

        for (const node in graph) {
            if (!visited.has(node) && dist[node] < minDist) {
                minDist = dist[node];
                u = node;
            }
        }

        if (u === null || minDist === Infinity) break;

        visited.add(u);

        for (const [neighbor, weight] of graph[u]) {
            const alt = dist[u] + weight;

            if (alt < dist[neighbor]) {
                dist[neighbor] = alt;
                parent[neighbor] = u;
            }
        }
    }

    const path = [];
    let cur = end;

    while (cur !== null) {
        path.unshift(cur);
        cur = parent[cur];
    }

    return dist[end] === Infinity ? null : { distance: dist[end], path };
};

console.log(dijkstra(graph, 'a'));
console.log(dijkstraWithPath(graph, 'a', 'e'));
