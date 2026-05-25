/**
 * TypeScript: PickByType — выбрать из интерфейса поля определённого типа
 *
 * Задача: из любого типа достать только ключи, у которых значение extends Condition.
 */

// =============================================================================
// Пример из условия
// =============================================================================

type Project = {
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
};

type PickByType<Target, Condition> = Pick<
  Target,
  {
    [Key in keyof Target]: Target[Key] extends Condition ? Key : never;
  }[keyof Target]
>;

type ProjectDates = PickByType<Project, Date>;
// {
//   start_date: Date;
//   end_date: Date;
// }

type ProjectInputFields = PickByType<Project, string>;
// {
//   name: string;
//   description: string;
// }

// =============================================================================
// Как работает (пошагово для Project + Date)
// =============================================================================
//
// 1. Mapped type по ключам Target:
//    { name: never, description: never, start_date: "start_date", end_date: "end_date" }
//
//    Target[Key] extends Date ? Key : never
//    — string не extends Date → never
//    — Date extends Date → оставляем имя ключа
//
// 2. [keyof Target] — union значений:
//    never | never | "start_date" | "end_date"  →  "start_date" | "end_date"
//    (never исчезает из union)
//
// 3. Pick<Project, "start_date" | "end_date"> — только эти поля
//
// =============================================================================
// Замечания
// =============================================================================
//
// - extends — structural: Date | string extends Date → только Date-поля
// - optional поля (prop?: T) дают Target[Key] = T | undefined — обычно всё ещё extends T
// - для union-условий можно PickByType<Project, string | Date> — поля, где тип extends string | Date
//
// =============================================================================
// Проверка (compile-time)
// =============================================================================

const dates: ProjectDates = {
  start_date: new Date(),
  end_date: new Date(),
};

const fields: ProjectInputFields = {
  name: "App",
  description: "Demo",
};

export type { PickByType, Project, ProjectDates, ProjectInputFields };
export { dates, fields };
