/**
 * SOLID в React — примеры кода
 *
 * Важно: SOLID придумали для ООП, но идеи отлично ложатся на React:
 * компоненты/хуки = единицы ответственности, композиция = расширение, контракты пропсов = интерфейсы.
 */

// =============================================================================
// S — Single Responsibility Principle (одна ответственность)
// =============================================================================

// BAD: один компонент делает всё (данные + логика + UI)
// function UsersPage() {
//   const [users, setUsers] = useState([]);
//   useEffect(() => { fetch('/api/users').then(r => r.json()).then(setUsers) }, []);
//   return <table>{users.map(/* ... */)}</table>;
// }

// GOOD: разделяем на "контейнер" (данные) и "презентацию" (UI)
function UsersTable({ users }) {
  return (
    <table>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function useUsersQuery(api) {
  const [state, setState] = React.useState({ loading: true, data: [], error: null });

  React.useEffect(() => {
    let cancelled = false;
    api
      .getUsers()
      .then(data => !cancelled && setState({ loading: false, data, error: null }))
      .catch(error => !cancelled && setState({ loading: false, data: [], error }));
    return () => {
      cancelled = true;
    };
  }, [api]);

  return state;
}

function UsersPage({ api }) {
  const { loading, data, error } = useUsersQuery(api);
  if (loading) return 'Loading…';
  if (error) return 'Error';
  return <UsersTable users={data} />;
}

// =============================================================================
// O — Open/Closed Principle (открыт для расширения, закрыт для изменения)
// =============================================================================

// Идея: таблица расширяется конфигурацией колонок, а не if/else внутри Table
function DataTable({ rows, columns }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(c => (
            <th key={c.key}>{c.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.id}>
            {columns.map(c => (
              <td key={c.key}>{c.render(r)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Расширяем таблицу новой колонкой — НЕ меняя DataTable
const userColumns = [
  { key: 'email', title: 'Email', render: u => u.email },
  { key: 'role', title: 'Role', render: u => u.role },
];

function UsersWithConfigTable({ users }) {
  return <DataTable rows={users} columns={userColumns} />;
}

// =============================================================================
// L — Liskov Substitution Principle (взаимозаменяемость)
// =============================================================================

// Идея: если компонент используется как "кнопка", он должен соблюдать контракт:
// - onClick вызывается при клике
// - disabled реально блокирует действие

function Button({ disabled, onClick, children }) {
  return (
    <button disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

// BAD: визуально "disabled", но клики всё равно проходят → нарушает ожидания
function BadButton({ disabled, onClick, children }) {
  return (
    <div
      aria-disabled={disabled}
      onClick={onClick} // даже если disabled=true, всё равно клик сработает
      style={{ opacity: disabled ? 0.5 : 1, cursor: 'pointer' }}
    >
      {children}
    </div>
  );
}

// GOOD: если делаем кастомную кнопку — соблюдаем контракт disabled
function DivButton({ disabled, onClick, children }) {
  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={e => {
        if (disabled) return;
        onClick?.(e);
      }}
      onKeyDown={e => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') onClick?.(e);
      }}
      style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {children}
    </div>
  );
}

// =============================================================================
// I — Interface Segregation Principle (не заставляй зависеть от лишнего)
// =============================================================================

// BAD: "комбайн" пропсов — половина всегда лишняя/undefined
// <Field type="text" options={...} mask={...} rows={...} ... />

// GOOD: несколько маленьких компонентов с узкими пропсами
function TextField({ value, onChange, placeholder }) {
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />;
}

function SelectField({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// =============================================================================
// D — Dependency Inversion Principle (зависеть от абстракций)
// =============================================================================

// BAD: компонент напрямую делает fetch → сложно тестировать/переиспользовать
// function UsersPage() {
//   useEffect(() => { fetch('/api/users') ... }, []);
// }

// GOOD: компонент зависит от "контракта" api (абстракция), а не от fetch
// Благодаря этому в тестах можно подставить fakeApi.

function createFakeApi() {
  return {
    getUsers: async () => [{ id: 1, email: 'a@b.com', role: 'admin' }],
  };
}

function ExampleD() {
  const api = React.useMemo(() => createFakeApi(), []);
  return <UsersPage api={api} />;
}

// =============================================================================
// Итог (одной строкой)
// =============================================================================
// S: делим data/UI. O: расширяем конфигом/children. L: соблюдаем контракт пропсов.
// I: узкие пропсы вместо "комбайна". D: UI зависит от API-интерфейса, а не от fetch.

