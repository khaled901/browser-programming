console.log("JS connected ✅");

/* Exercise 9 */
btnGrade.onclick = function () {
  const score = Number(scoreInput.value);

  if (score < 0 || score > 100) {
    gradeOut.innerText = "Grade: Invalid";
  } else if (score >= 90) {
    gradeOut.innerText = "Grade: A";
  } else if (score >= 80) {
    gradeOut.innerText = "Grade: B";
  } else if (score >= 70) {
    gradeOut.innerText = "Grade: C";
  } else if (score >= 60) {
    gradeOut.innerText = "Grade: D";
  } else {
    gradeOut.innerText = "Grade: F";
  }
};

/* Exercise 10 */
function isEven(n) {
  return n % 2 === 0;
}

btnEvenOdd.onclick = function () {
  const n = Number(numEvenOdd.value);

  if (isEven(n)) {
    evenOddOut.innerText = "Result: EVEN";
  } else {
    evenOddOut.innerText = "Result: ODD";
  }
};

/* Exercise 11 */
btnCountdown.onclick = function () {
  const start = Number(countdownInput.value);
  let text = "";

  for (let i = start; i >= 0; i--) {
    text += i + " ";
  }

  countdownOut.innerText = text;
};

/* Exercise 12 */
function sumToN(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

btnSumN.onclick = function () {
  const n = Number(nSumInput.value);
  const result = sumToN(n);
  sumNOut.innerText = "Sum: " + result;
};

/* Exercise 13 */
btnRepeat.onclick = function () {
  const text = repeatText.value;
  const times = Number(repeatCount.value);

  let result = "";

  for (let i = 0; i < times; i++) {
    result += text + " ";
  }

  repeatOut.innerText = result;
};

/* Exercise 14 */
const correctUser = "student";
const correctPass = "1234";

btnLogin.onclick = function () {
  const u = loginUser.value.trim();
  const p = loginPass.value.trim();

  if (u === correctUser && p === correctPass) {
    loginOut.innerText = "Status: Welcome ✅";
    loginOut.style.color = "green";
  } else {
    loginOut.innerText = "Status: Wrong ❌";
    loginOut.style.color = "crimson";
  }
};

/* Exercise 15 */
function min3(a, b, c) {
  let m = a;
  if (b < m) m = b;
  if (c < m) m = c;
  return m;
}

function max3(a, b, c) {
  let m = a;
  if (b > m) m = b;
  if (c > m) m = c;
  return m;
}

btnMinMax.onclick = function () {
  const a = Number(x.value);
  const b = Number(y.value);
  const c = Number(z.value);

  const mn = min3(a, b, c);
  const mx = max3(a, b, c);

  minMaxOut.innerText = "Min: " + mn + " | Max: " + mx;
};

/* Exercise 16 */
function makeTable(n) {
  let result = "";

  for (let i = 1; i <= 10; i++) {
    result += n + " × " + i + " = " + (n * i) + " | ";
  }

  return result;
}

btnTable.onclick = function () {
  const n = Number(tableN.value);
  tableOut.innerText = makeTable(n);
};