import chalk from 'chalk';
import moment from 'moment';
import emoji from 'node-emoji';
import defaults from './defaults';

export default class Loggy {
  constructor({
    label = {},
    logFormat = defaults.LOG_FORMAT,
    colors = defaults.COLORS,
    icons = defaults.ICONS,
    timestampFormat = defaults.TIMESTAMP_FORMAT,
    show = {},
    methods = defaults.METHODS
  } = {}) {
    this._console = console;
    this._label = label;
    this._logFormat = logFormat;
    this._colors = this._setColorMethod(colors);
    this._icons = icons;
    this._timestampFormat = timestampFormat;
    this._history = [];
    this._show = show;
    this._methods = methods;

    this._init();
  }

  _setColorMethod(colors) {
    const colorsKeys = Object.keys(colors);
    colorsKeys.forEach(colorKey => {
      colors[colorKey] = chalk[colors[colorKey]];
    });
    return colors;
  }

  _init() {
    this._methods.forEach(methodName => {
      const method = this._console[methodName].bind(this._console);
      this[methodName] = function() {
        if(this._show[methodName] === false) {
          return false;
        }
        method.call(this._console, this._format({
          methodName,
          args: arguments
        }));
      }
    });
  }

  _format({ methodName, args }) {
    const colorMethod = this._colors[methodName];
    const label = this._label[methodName] ? colorMethod(this._label[methodName]) : colorMethod(methodName);
    const icon = colorMethod(emoji.emojify(this._icons[methodName]));
    const timestamp = chalk.gray(moment().format(this._timestampFormat));
    const message = Array.prototype.slice.call(args);

    return this._formatEngine({
      template: this._logFormat,
      data: {
        label,
        icon,
        timestamp,
        message
      }
    });
  }

  _formatEngine({ template, data }) {
    const regex = /:(\w+)?/g;
    let match;
    let matchData;
    let finalTemplate = template;
    while (match = regex.exec(template)) {
      matchData = data[match[1]];
      finalTemplate = finalTemplate.replace(match[0], matchData);
    }
    return finalTemplate;
  }
}