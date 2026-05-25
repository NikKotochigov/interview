/**
 * this: arrow vs function
 *
 * - Arrow-функция НЕ имеет своего this и берёт его из внешней области видимости.
 * - Обычная function получает this от способа вызова: obj.method() => this === obj.
 */

const myCat = {
  sound: "meow",
  say: () => console.log("say:", this?.sound),
  say2: function () {
    console.log("say2:", this.sound);
  },
};

myCat.say(); // say: undefined
myCat.say2(); // say2: meow

const { say, say2 } = myCat;

say();  // undefined (или window/global) — у arrow this лексический, не зависит от вызова
say2(); // TypeError в strict (this = undefined) / undefined в non-strict

class Cat {
  sound = "meow";

  // В классе arrow будет создан как поле экземпляра и "захватит" this экземпляра.
  say = () => console.log("Cat.say:", this.sound);

  // Обычный метод — this зависит от вызова.
  say2() {
    console.log("Cat.say2:", this.sound);
  }
}

const myCat2 = new Cat();

myCat2.say(); // Cat.say: meow
myCat2.say2(); // Cat.say2: meow

const { say: sayFromInstance, say2: say2FromInstance } = myCat2;

sayFromInstance(); // Cat.say: meow
say2FromInstance(); // TypeError в strict (this = undefined) / undefined в non-strict
