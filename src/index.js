import chalk from 'chalk';
import moment from 'moment';
import defaults from './defaults';

const TPL_ENGINE_RE = /:(\w+)?/g;

export default class Loggy {
  constructor({
    label = {},
    logFormat = defaults.LOG_FORMAT,
    colors = defaults.COLORS,
    icons = defaults.ICONS,
    timestampFormat = defaults.TIMESTAMP_FORMAT,
    jsonPretty = false,
    overrideConsole = false,
    show = {},
    methods = defaults.METHODS
  } = {}) {
    this._console = console;
    this._label = label;
    this._logFormat = logFormat;
    this._jsonPretty = jsonPretty;
    this._overrideConsole = overrideConsole;
    this._colors = this._setColorMethod(Object.assign(defaults.COLORS, colors));
    this._icons = Object.assign(defaults.ICONS, icons);
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
      const method = this._console[methodName] ?
        this._console[methodName].bind(this._console) :
        this._console.log.bind(this._console);

      this[methodName] = this._logMethod({ method, methodName });
      if(this._overrideConsole) {
        this._console[methodName] = this._logMethod({ method, methodName }).bind(this);
      }
    });
  }

  _logMethod({ method, methodName }) {
    return function() {
      if (this._show[methodName] === false) {
        return false;
      }
      method.call(this._console, this._format({
        methodName,
        args: arguments
      }));
    };
  }

  _format({ methodName, args }) {
    const colorMethod = this._colors[methodName];
    const label = this._label[methodName] ?
      colorMethod(this._label[methodName]) :
      colorMethod(methodName);
    const icon = colorMethod(this._icons[methodName]);
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
    let match;
    let matchData;
    let renderedTemplate = template;
    while (match = TPL_ENGINE_RE.exec(template)) {
      matchData = data[match[1]];
      if(Array.isArray(matchData)) {
        matchData = matchData.map(this._pretiffyObjOutput.bind(this)).join(' ');
      }
      renderedTemplate = renderedTemplate.replace(match[0], matchData);
    }
    return renderedTemplate;
  }

  _pretiffyObjOutput(value) {
    const indent = this._jsonPretty ? 2 : 0;
    return typeof value === 'object' ?
      JSON.stringify(value, null, indent).replace(/\"([^(\")"]+)\":/g,'$1:') :
      value;
  }
}