const result = document.getElementById("result");
let expression = "";

// Map scientific functions safely
const funcs = {
  sin: (x) => Math.sin(x),
  cos: (x) => Math.cos(x),
  tan: (x) => Math.tan(x),
  sqrt: (x) => Math.sqrt(x),
  log: (x) => Math.log10(x),
  ln: (x) => Math.log(x)
};

// Handle button clicks with event delegation
document.querySelector(".buttons").addEventListener("click", (e) => {
  const btn = e.target;

  if (btn.dataset.value) {
    expression += btn.dataset.value;
    result.value = expression;
  }

  if (btn.dataset.func) {
    expression += `${btn.dataset.func}(`;
    result.value = expression;
  }

  if (btn.dataset.action === "clear") {
    expression = "";
    result.value = "";
  }

  if (btn.dataset.action === "back") {
    expression = expression.slice(0, -1);
    result.value = expression;
  }

  if (btn.dataset.action === "calculate") {
    try {
      // Replace function names with mapped versions
      let safeExpr = expression;
      Object.keys(funcs).forEach(fn => {
        safeExpr = safeExpr.replaceAll(fn, `funcs.${fn}`);
      });
      expression = eval(safeExpr).toString();
      result.value = expression;
    } catch {
      result.value = "Error";
      expression = "";
    }
  }
});
