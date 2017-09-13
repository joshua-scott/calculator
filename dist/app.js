'use strict';

const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(btn => btn.textContent = btn.dataset.num || btn.dataset.op);
//# sourceMappingURL=app.js.map
