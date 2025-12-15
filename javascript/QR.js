(function(global, factory) {
  /* istanbul ignore next */
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  }
  else if (typeof define === 'function' && define.amd) {
    define('QR', [], factory);
  }
  else {
    if (!global) global = window;
    if (global.QR && global.QR.MIDI) return;
    global.QR = factory();
  }
})(this, function() {
  var _crn = [
    [1, 1, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 0, 1, 0], [1, 0, 1, 1, 1, 0, 1, 0], [1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 0, 1, 0], [1, 0, 0, 0, 0, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]
  ];
  var _eye = [[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1]];
  var QR = function(n) {
    // s = new TextEncoder().encode(s);
    var v = n;
    var dots = _dots(v);
    _static(dots, v);
    return dots;
  };
  function _eyes(v) {
    var e = [];
    if (v < 2) return e;
    e.push(6);
    var n = Math.floor(v / 7) + 2;
    var m = v * 4 + 10;
    var t = Math.floor((v * 8 + n * 3 + 5) / (n * 4 - 4)) * 2;
    for (var i = 0; i < n - 1; i++) {
      e.splice(1, 0, m);
      m -= t;
    }
    return e;
  }
  function _static(d, v) {
    var i, j, k, m, sz = v * 4 + 17, e = _eyes(v);
    for (i = 0; i < 8; i++) for (j = 0; j < 8; j++) {
      d[i][j] = _crn[i][j];
      d[i][sz - j - 1] = _crn[i][j];
      d[sz - i - 1][j] = _crn[i][j];
    }
    j = 1;
    for (i = 8; i < sz - 8; i++) {
      d[i][6] = j;
      d[6][i] = j;
      j = 1 - j;
    }
    for (k = 0; k < e.length; k++) for (m = 0; m < e.length; m++) {
      if (!k && !m) continue;
      if (!k && m == e.length - 1) continue;
      if (!m && k == e.length - 1) continue;
      for (i = 0; i < 5; i++) for (j = 0; j < 5; j++) {
        d[e[k] + i - 2][e[m] + j - 2] = _eye[i][j];
      }
    }
  }
  function _dots(v) {
    var i, d = [], sz = v * 4 + 17;
    for (i = 0; i < sz; i++) d.push(Array(sz).fill(0));
    return d;
  }
  return QR;
});
