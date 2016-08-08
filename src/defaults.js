const METHODS = ['log', 'warn', 'error'];
const COLORS = {
  log: 'blue',
  warn: 'yellow',
  error: 'red'
};
const ICONS = {
  log: 'i',
  warn: '‼',
  error: '×'
};
const TIMESTAMP_FORMAT = 'H:mm:ss';
const LOG_FORMAT = ':icon :label » :timestamp - :message';

export default {
  METHODS,
  COLORS,
  ICONS,
  TIMESTAMP_FORMAT,
  LOG_FORMAT
}