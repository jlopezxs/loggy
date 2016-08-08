const METHODS = ['log', 'warn', 'error'];
const COLORS = {
  log: 33,
  warn: 208,
  error: 160
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