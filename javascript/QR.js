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
  var QR = function(str) {
    var v = 1;
    var sz = v * 4 + 17;
    var dots = _dots(sz);
    _static(dots, sz);
    return dots;
  };
  function _static(d, sz) {
    var i, j;
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
  }
  function _dots(sz) {
    var i, d = [];
    for (i = 0; i < sz; i++) d.push(Array(sz).fill(0));
    return d;
  }
  return QR;
});
