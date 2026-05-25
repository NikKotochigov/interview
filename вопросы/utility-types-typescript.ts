/**
 * Utility Types (утилитарные типы) в TypeScript — кратко + примеры
 *
 * Utility types — это встроенные "конструкторы типов", которые позволяют
 * переиспользовать и трансформировать существующие типы без копипасты.
 *
 * Самые частые на собеседованиях:
 * Partial, Required, Readonly, Pick, Omit, Record,
 * Exclude, Extract, NonNullable,
 * Parameters, ReturnType, Awaited, InstanceType, ConstructorParameters.
 */

// =============================================================================
// Базовые примеры: Partial / Required / Readonly
// =============================================================================

type User = {
  id: number;
  name: string;
  email?: string;
};

// Partial<T> — делает ВСЕ свойства необязательными
type UserPatch = Partial<User>;
const patch1: UserPatch = { name: "Ada" }; // ok

// Required<T> — делает ВСЕ свойства обязательными (включая optional)
type UserRequired = Required<User>;
// const u1: UserRequired = { id: 1, name: "Ada" }; // ошибка: нет email
const u2: UserRequired = { id: 1, name: "Ada", email: "a@b.com" };

// Readonly<T> — делает свойства только для чтения
type ReadonlyUser = Readonly<User>;
const ru: ReadonlyUser = { id: 1, name: "Ada" };
// ru.name = "Bob"; // ошибка

// =============================================================================
// Pick / Omit — выбрать / исключить поля
// =============================================================================

// Pick<T, K> — оставить только перечисленные ключи
type UserPreview = Pick<User, "id" | "name">;
const prev: UserPreview = { id: 1, name: "Ada" };

// Omit<T, K> — убрать перечисленные ключи
type UserWithoutEmail = Omit<User, "email">;
const noEmail: UserWithoutEmail = { id: 1, name: "Ada" };

// =============================================================================
// Record — "словарь" ключ -> значение
// =============================================================================

// Record<K, V>
type ById = Record<string, User>;
const usersById: ById = {
  "1": { id: 1, name: "Ada" },
};

// Часто: ключи-литералы
type Size = "s" | "m" | "l";
type SizeMap = Record<Size, number>;
const sizeMap: SizeMap = { s: 1, m: 2, l: 3 };

// =============================================================================
// Exclude / Extract — работа с union-типами
// =============================================================================

type Status = "idle" | "loading" | "success" | "error";

// Exclude<T, U> — убрать из T всё, что подходит под U
type NotError = Exclude<Status, "error">; // "idle" | "loading" | "success"

// Extract<T, U> — оставить из T только то, что подходит под U
type OnlySuccessOrError = Extract<Status, "success" | "error">; // "success" | "error"

// =============================================================================
// NonNullable — убрать null и undefined
// =============================================================================

type MaybeUser = User | null | undefined;
type DefUser = NonNullable<MaybeUser>; // User

// =============================================================================
// Parameters / ReturnType — достать типы из функции
// =============================================================================

function fetchUser(id: number, verbose?: boolean) {
  return { id, name: "Ada" } as User;
}

type FetchUserParams = Parameters<typeof fetchUser>; // [number, (boolean | undefined)?]
type FetchUserResult = ReturnType<typeof fetchUser>; // User

// =============================================================================
// Awaited — "развернуть" Promise
// =============================================================================

type P1 = Awaited<Promise<number>>; // number
type P2 = Awaited<number>; // number (если не Promise — оставит как есть)

// =============================================================================
// ConstructorParameters / InstanceType — про классы/конструкторы
// =============================================================================

class Service {
  constructor(public baseUrl: string, public timeoutMs: number) {}
  ping() {
    return "ok";
  }
}

type ServiceCtorArgs = ConstructorParameters<typeof Service>; // [string, number]
type ServiceInstance = InstanceType<typeof Service>; // Service

const args: ServiceCtorArgs = ["https://api", 5000];
const svc: ServiceInstance = new Service(...args);

// =============================================================================
// Bonus: Uppercase / Lowercase / Capitalize / Uncapitalize — для строк-литералов
// =============================================================================

type Method = "get" | "post";
type MethodUpper = Uppercase<Method>; // "GET" | "POST"
type Cap = Capitalize<"hello">; // "Hello"

// =============================================================================
// Быстрые ответы для интервью (1 строка)
// =============================================================================
// Partial: все поля опциональными. Required: все обязательными. Readonly: нельзя менять.
// Pick/Omit: выбрать/исключить набор полей объекта.
// Record: объект-словарь ключ -> значение.
// Exclude/Extract: убрать/оставить части union-типа.
// NonNullable: убрать null/undefined.
// Parameters/ReturnType: достать типы аргументов/результата функции.
// Awaited: получить "значение внутри Promise".
// InstanceType/ConstructorParameters: достать тип инстанса/аргументы конструктора.

