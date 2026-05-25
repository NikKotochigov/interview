/**
 * TypeScript: narrowing union types
 *
 * Важно: `interface` не существует в runtime, поэтому `instanceof IRectangle` НЕ работает.
 * `instanceof` применим только к классам/функциям-конструкторам.
 */

// ---- ИСХОДНОЕ УСЛОВИЕ (как в задаче) ----

interface ISquare {
  width: number;
}

interface IRectangle extends ISquare {
  height: number;
}

type TShape = ISquare | IRectangle;

// ❌ Так делать нельзя: interface не существует в runtime
// function calculateAreaBad(shape: TShape) {
//   if (shape instanceof IRectangle) {
//     return shape.width * shape.height;
//   } else {
//     return shape.width * shape.width;
//   }
// }

// ---- Variant 1: discriminated union (лучший/самый явный) ----

type Square = { kind: "square"; width: number };
type Rectangle = { kind: "rect"; width: number; height: number };
type Shape = Square | Rectangle;

export function calculateArea(shape: Shape) {
  return shape.kind === "rect"
    ? shape.width * shape.height
    : shape.width * shape.width;
}

// ---- Variant 2: narrowing по наличию поля ----

type Square2 = { width: number };
type Rectangle2 = { width: number; height: number };
type Shape2 = Square2 | Rectangle2;

export function calculateArea2(shape: Shape2) {
  return "height" in shape ? shape.width * shape.height : shape.width ** 2;
}

