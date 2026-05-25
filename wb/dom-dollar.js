/**
 * Мини-$ как на интервью: лёгкая обёртка над DOM с цепочкой вызовов.
 *
 * Пример:
 * const node = $('.js-node')
 * node
 *   .addClass('node')
 *   .toggleClass('item')
 *   .removeClass('node')
 *   .css({ color: 'red', paddingTop: '10px' })
 *   .html('<li>hello</li>')
 */

function $(selector) {
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector;

  const api = {
    addClass(className) {
      if (el && className) el.classList.add(className);
      return api;
    },

    removeClass(className) {
      if (el && className) el.classList.remove(className);
      return api;
    },

    toggleClass(className) {
      if (el && className) el.classList.toggle(className);
      return api;
    },

    css(styles) {
      if (!el || !styles || typeof styles !== 'object') return api;

      for (const key of Object.keys(styles)) {
        /** @type {any} */
        const val = styles[key];
        if (val === undefined || val === null) continue;

        // key в camelCase -> styleProperty в camelCase
        // (браузер и так принимает paddingTop, но оставим явно)
        el.style[key] = String(val);
      }

      return api;
    },

    html(htmlString) {
      if (!el) return api;
      el.innerHTML = htmlString == null ? '' : String(htmlString);
      return api;
    },
  };

  return api;
}

// Для node/тестов (в браузере обычно не нужно)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { $ };
}
