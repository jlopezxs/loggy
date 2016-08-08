var emoji = require('node-emoji');
const Loggy = require('../lib/index').default;

const a = 'b';
const cls = new Loggy({
  label: {
    log: 'info'
  },
  logFormat: ':icon :timestamp · :label · :message',
  timestampFormat: 'H:mm:ss',
  show: {
    log: (a === 'b'),
    warn: (a === 'b'),
    error: (a === 'b')
  },
  colors: {
    log: 'magenta',
    warn: 'cyan',
    error: 'green'
  },
  icons: {
    log: 'i',
    warn: ':warning:',
    error: ':fire:'
  }
});

cls.log([1, 2, 3, 4]);
cls.warn('test', 1, 2, 3, 4);
cls.error('ERROR', {a:[1, 2, 4]});