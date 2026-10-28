// ============ ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ============
document.addEventListener('DOMContentLoaded', function() {
    var tabButtons = document.querySelectorAll('.tab-btn');
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].addEventListener('click', function() {
            var all = document.querySelectorAll('.tab-btn');
            for (var j = 0; j < all.length; j++) all[j].classList.remove('active');
            var panels = document.querySelectorAll('.tab-panel');
            for (var k = 0; k < panels.length; k++) panels[k].classList.remove('active');
            this.classList.add('active');
            document.getElementById(this.getAttribute('data-tab')).classList.add('active');
        });
    }
});

// ============ УТИЛИТЫ ============
function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function nz(min, max) {
    var v = 0;
    while (v === 0) v = rnd(min, max);
    return v;
}
function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { var t = b; b = a % b; a = t; }
    return a || 1;
}
function fmt(v) {
    return v >= 0 ? '+ ' + v : '− ' + Math.abs(v);
}

var answers = {};

// ============ ПОКАЗ ОТВЕТА ============
function showAnswer(n) {
    var box = document.getElementById('answer' + n);
    if (!box) return;
    if (box.classList.contains('visible')) {
        box.classList.remove('visible');
        return;
    }
    box.innerHTML = answers[n] || 'Сначала сгенерируйте задачу.';
    box.classList.add('visible');
}

function resetAnswer(n) {
    var box = document.getElementById('answer' + n);
    if (!box) return;
    box.classList.remove('visible');
    box.innerHTML = '';
}

// ============ ЗАДАЧА 1 ============
function generateTask1() {
    var x1 = rnd(-5, 5), y1 = rnd(-5, 5), z1 = rnd(-5, 5);
    var x2, y2, z2;
    do { x2 = rnd(-5, 5); y2 = rnd(-5, 5); z2 = rnd(-5, 5); }
    while (x1 === x2 && y1 === y2 && z1 === z2);

    document.getElementById('task1').innerHTML =
        'Составьте каноническое уравнение прямой, проходящей через точки ' +
        'M₁(' + x1 + '; ' + y1 + '; ' + z1 + ') и M₂(' + x2 + '; ' + y2 + '; ' + z2 + '). ' +
        'Найдите координаты направляющего вектора s.';

    var dx = x2 - x1, dy = y2 - y1, dz = z2 - z1;
    answers[1] =
        '<b>Решение:</b><br>' +
        '1) s = M₁M₂ = {' + dx + '; ' + dy + '; ' + dz + '}.<br>' +
        '2) Каноническое уравнение:<br>' +
        '(x − ' + x1 + ') / ' + dx + ' = (y − ' + y1 + ') / ' + dy + ' = (z − ' + z1 + ') / ' + dz + '<br>' +
        '<b>Ответ:</b> s = {' + dx + '; ' + dy + '; ' + dz + '}.';
    resetAnswer(1);
}

// ============ ЗАДАЧА 2 ============
function generateTask2() {
    var x0 = rnd(-3, 3), y0 = rnd(-3, 3), z0 = rnd(-3, 3);
    var a = rnd(-3, 3), b = rnd(-3, 3), c = rnd(-3, 3);
    var m = nz(-3, 3), n = nz(-3, 3), p = nz(-3, 3);

    document.getElementById('task2').innerHTML =
        'Найдите расстояние от точки M₀(' + x0 + '; ' + y0 + '; ' + z0 + ') ' +
        'до прямой:<br>(x − ' + a + ') / ' + m + ' = (y − ' + b + ') / ' + n + ' = (z − ' + c + ') / ' + p + '.';

    var vx = x0 - a, vy = y0 - b, vz = z0 - c;
    var cx = vy * p - vz * n;
    var cy = vz * m - vx * p;
    var cz = vx * n - vy * m;
    var crossSq = cx * cx + cy * cy + cz * cz;
    var sSq = m * m + n * n + p * p;
    var d = Math.sqrt(crossSq / sSq);

    answers[2] =
        '<b>Решение:</b><br>' +
        '1) Точка на прямой: M₁(' + a + '; ' + b + '; ' + c + '), s = {' + m + '; ' + n + '; ' + p + '}.<br>' +
        '2) M₁M₀ = {' + vx + '; ' + vy + '; ' + vz + '}.<br>' +
        '3) M₁M₀ × s = {' + cx + '; ' + cy + '; ' + cz + '}.<br>' +
        '4) d = √' + crossSq + ' / √' + sSq + ' ≈ ' + d.toFixed(4) + '.<br>' +
        '<b>Ответ:</b> d ≈ ' + d.toFixed(4) + '.';
    resetAnswer(2);
}

// ============ ЗАДАЧА 3 ============
function generateTask3() {
    var A, B, C, AB, AC, nrm;
    do {
        A = [rnd(-4, 4), rnd(-4, 4), rnd(-4, 4)];
        B = [rnd(-4, 4), rnd(-4, 4), rnd(-4, 4)];
        C = [rnd(-4, 4), rnd(-4, 4), rnd(-4, 4)];
        AB = [B[0] - A[0], B[1] - A[1], B[2] - A[2]];
        AC = [C[0] - A[0], C[1] - A[1], C[2] - A[2]];
        nrm = [
            AB[1] * AC[2] - AB[2] * AC[1],
            AB[2] * AC[0] - AB[0] * AC[2],
            AB[0] * AC[1] - AB[1] * AC[0]
        ];
    } while (nrm[0] === 0 && nrm[1] === 0 && nrm[2] === 0);

    document.getElementById('task3').innerHTML =
        'Составьте общее уравнение плоскости через три точки:<br>' +
        'A(' + A[0] + '; ' + A[1] + '; ' + A[2] + '), ' +
        'B(' + B[0] + '; ' + B[1] + '; ' + B[2] + '), ' +
        'C(' + C[0] + '; ' + C[1] + '; ' + C[2] + ').';

    var g = gcd(gcd(Math.abs(nrm[0]), Math.abs(nrm[1])), Math.abs(nrm[2]));
    var nn = [nrm[0] / g, nrm[1] / g, nrm[2] / g];
    var D = -(nn[0] * A[0] + nn[1] * A[1] + nn[2] * A[2]);

    answers[3] =
        '<b>Решение:</b><br>' +
        '1) AB = {' + AB[0] + '; ' + AB[1] + '; ' + AB[2] + '}, ' +
        'AC = {' + AC[0] + '; ' + AC[1] + '; ' + AC[2] + '}.<br>' +
        '2) n = AB × AC = {' + nrm[0] + '; ' + nrm[1] + '; ' + nrm[2] + '}, ' +
        'после сокращения: {' + nn[0] + '; ' + nn[1] + '; ' + nn[2] + '}.<br>' +
        '3) D = ' + D + '.<br>' +
        '<b>Ответ:</b> ' + nn[0] + 'x ' + fmt(nn[1]) + 'y ' + fmt(nn[2]) + 'z ' + fmt(D) + ' = 0.';
    resetAnswer(3);
}

// ============ ЗАДАЧА 4 ============
function generateTask4() {
    var x0 = rnd(-4, 4), y0 = rnd(-4, 4), z0 = rnd(-4, 4);
    var A = nz(-4, 4), B = nz(-4, 4), C = nz(-4, 4), D = rnd(-10, 10);

    document.getElementById('task4').innerHTML =
        'Найдите расстояние от точки M(' + x0 + '; ' + y0 + '; ' + z0 + ') ' +
        'до плоскости:<br>' + A + 'x ' + fmt(B) + 'y ' + fmt(C) + 'z ' + fmt(D) + ' = 0.';

    var num = Math.abs(A * x0 + B * y0 + C * z0 + D);
    var denSq = A * A + B * B + C * C;
    var rho = num / Math.sqrt(denSq);

    answers[4] =
        '<b>Решение:</b><br>' +
        '1) n = {' + A + '; ' + B + '; ' + C + '}.<br>' +
        '2) ρ = |' + A + '·(' + x0 + ') + (' + B + ')·(' + y0 + ') + (' + C + ')·(' + z0 + ') + (' + D + ')| / √' + denSq + ' = ' +
        num + ' / √' + denSq + ' ≈ ' + rho.toFixed(4) + '.<br>' +
        '<b>Ответ:</b> ρ ≈ ' + rho.toFixed(4) + '.';
    resetAnswer(4);
}

// ============ ЗАДАЧА 5 ============
function generateTask5() {
    var m1 = [nz(-4, 4), nz(-4, 4), nz(-4, 4)];
    var m2 = [nz(-4, 4), nz(-4, 4), nz(-4, 4)];

    document.getElementById('task5').innerHTML =
        'Найдите угол между прямыми с направляющими векторами:<br>' +
        'm₁ = {' + m1[0] + '; ' + m1[1] + '; ' + m1[2] + '}, ' +
        'm₂ = {' + m2[0] + '; ' + m2[1] + '; ' + m2[2] + '}.';

    var dot = m1[0] * m2[0] + m1[1] * m2[1] + m1[2] * m2[2];
    var l1 = m1[0] * m1[0] + m1[1] * m1[1] + m1[2] * m1[2];
    var l2 = m2[0] * m2[0] + m2[1] * m2[1] + m2[2] * m2[2];
    var cos = Math.abs(dot) / Math.sqrt(l1 * l2);
    var deg = Math.acos(Math.min(1, cos)) * 180 / Math.PI;

    answers[5] =
        '<b>Решение:</b><br>' +
        '1) m₁ · m₂ = ' + dot + '.<br>' +
        '2) |m₁| = √' + l1 + ', |m₂| = √' + l2 + '.<br>' +
        '3) cos α = |' + dot + '| / (√' + l1 + ' · √' + l2 + ') ≈ ' + cos.toFixed(4) + '.<br>' +
        '<b>Ответ:</b> α ≈ ' + deg.toFixed(2) + '°.';
    resetAnswer(5);
}

// ============ ЗАДАЧА 6 ============
function generateTask6() {
    var c = [nz(-4, 4), nz(-4, 4), nz(-4, 4)];
    var n = [nz(-4, 4), nz(-4, 4), nz(-4, 4)];

    document.getElementById('task6').innerHTML =
        'Найдите угол между прямой (направляющий вектор c = {' + c[0] + '; ' + c[1] + '; ' + c[2] + '}) ' +
        'и плоскостью (вектор нормали n = {' + n[0] + '; ' + n[1] + '; ' + n[2] + '}).';

    var dot = c[0] * n[0] + c[1] * n[1] + c[2] * n[2];
    var lc = c[0] * c[0] + c[1] * c[1] + c[2] * c[2];
    var ln = n[0] * n[0] + n[1] * n[1] + n[2] * n[2];
    var sin = Math.abs(dot) / Math.sqrt(lc * ln);
    var deg = Math.asin(Math.min(1, sin)) * 180 / Math.PI;

    answers[6] =
        '<b>Решение:</b><br>' +
        '1) c · n = ' + dot + '.<br>' +
        '2) |c| = √' + lc + ', |n| = √' + ln + '.<br>' +
        '3) sin α = |' + dot + '| / (√' + lc + ' · √' + ln + ') ≈ ' + sin.toFixed(4) + '.<br>' +
        '<b>Ответ:</b> α ≈ ' + deg.toFixed(2) + '°.';
    resetAnswer(6);
}

// ============ ЗАДАЧА 7 ============
function generateTask7() {
    var n1 = [nz(-4, 4), nz(-4, 4), nz(-4, 4)];
    var n2 = [nz(-4, 4), nz(-4, 4), nz(-4, 4)];

    document.getElementById('task7').innerHTML =
        'Найдите угол между плоскостями с векторами нормали:<br>' +
        'n₁ = {' + n1[0] + '; ' + n1[1] + '; ' + n1[2] + '}, ' +
        'n₂ = {' + n2[0] + '; ' + n2[1] + '; ' + n2[2] + '}.';

    var dot = n1[0] * n2[0] + n1[1] * n2[1] + n1[2] * n2[2];
    var l1 = n1[0] * n1[0] + n1[1] * n1[1] + n1[2] * n1[2];
    var l2 = n2[0] * n2[0] + n2[1] * n2[1] + n2[2] * n2[2];
    var cos = Math.abs(dot) / Math.sqrt(l1 * l2);
    var deg = Math.acos(Math.min(1, cos)) * 180 / Math.PI;

    answers[7] =
        '<b>Решение:</b><br>' +
        '1) n₁ · n₂ = ' + dot + '.<br>' +
        '2) |n₁| = √' + l1 + ', |n₂| = √' + l2 + '.<br>' +
        '3) cos α = |' + dot + '| / (√' + l1 + ' · √' + l2 + ') ≈ ' + cos.toFixed(4) + '.<br>' +
        '<b>Ответ:</b> α ≈ ' + deg.toFixed(2) + '°.';
    resetAnswer(7);
}

// ============ СТАРТ ============
document.addEventListener('DOMContentLoaded', function() {
    generateTask1();
    generateTask2();
    generateTask3();
    generateTask4();
    generateTask5();
    generateTask6();
    generateTask7();
});