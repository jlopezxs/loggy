const Loggy = require('../lib/index').default;

const a = 'b';
const cls = new Loggy({
  label: {
    log: 'info'
  },
  //logFormat: ':timestamp :icon :message',
  show: {
    log: (a === 'b'),
    warn: (a === 'b'),
    error: (a === 'b')
  }
});

cls.log([1, 2, 3, 4]);
cls.warn('test', 1, 2, 3, 4);
cls.error('ERROR', {a:[1, 2, 4]});