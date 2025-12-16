const QR = require('.');
const txt = process.argv[2];
if (txt == undefined) {
    console.log('Usage: ' + process.argv[1].split(/\/|\\/).slice(-1)[0] + ' <text-to-encode>');
    process.exit(0);
}
const qr = QR(txt);
var i, j, s = '';
for (i = 0; i < qr.length; i += 2) {
    for (j = 0; j < qr.length; j++) s += i + 1 < qr.length && qr[i + 1][j] ? qr[i][j] ? '█' : '▄' : qr[i][j] ? '▀' : ' ';
    s += '\n';
}
console.log(s);