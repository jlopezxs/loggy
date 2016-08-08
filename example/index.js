const Loggy = require('../lib/index').default;

new Loggy({
  label: {
    log: 'info'
  },
  logFormat: ':timestamp :icon :label » :message',
  timestampFormat: 'H:mm:ss',
  colors: {
    success: 'green'
  },
  methods: ['log', 'warn', 'error', 'success'],
  icons: {
    success: '√'
  },
  jsonPretty: false,
  overrideConsole: true
});

console.log('This is only a logger?', '😱');
console.warn('Fire?', '🔥', 1, 2, 3);
console.error('Uncaught ReferenceError: Loggy is not defined');
//TODO Fix custom methods output when override console
console.success('It seems that this is working well', ['success', '√']);