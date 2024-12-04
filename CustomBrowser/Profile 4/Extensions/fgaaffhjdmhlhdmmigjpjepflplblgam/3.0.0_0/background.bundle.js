/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(3);

	__webpack_require__(4);

	var _runtimeEventsTypes = __webpack_require__(5);

	var runtimeEventsTypes = _interopRequireWildcard(_runtimeEventsTypes);

	var _runnableTypes = __webpack_require__(6);

	var runnableTypes = _interopRequireWildcard(_runnableTypes);

	var _runningItem = __webpack_require__(7);

	var runningItemRepository = _interopRequireWildcard(_runningItem);

	var _runningItemInfos = __webpack_require__(8);

	var _runningItemInfos2 = _interopRequireDefault(_runningItemInfos);

	var _presentDuration = __webpack_require__(10);

	var _migrator = __webpack_require__(11);

	var _migrator2 = _interopRequireDefault(_migrator);

	var _taskTitle = __webpack_require__(12);

	var _taskTitle2 = _interopRequireDefault(_taskTitle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	(0, _migrator2.default)();

	function renderMinutesBadge(leftTimeInSeconds, late) {
	  var color = late ? '#ED3E3E' : '#0044A9';

	  chrome.action.setBadgeBackgroundColor({
	    color: color
	  });

	  chrome.action.setBadgeText({
	    text: (0, _presentDuration.presentMinutesDuration)(leftTimeInSeconds)
	  });
	}

	function notifyFinish(item) {
	  var isPomodoro = item.type === runnableTypes.POMODORO;

	  window.chrome.notifications.create(null, {
	    type: 'basic',
	    title: 'Pomodoro Timer - Finished ' + (isPomodoro ? 'Pomodoro' : 'Pause'),
	    message: '"' + (0, _taskTitle2.default)(item.description) + '" finished.',
	    iconUrl: 'pomotodo-notification.png'
	  });

	  var audio = new window.Audio('ring.ogg');

	  audio.play();
	}

	var checkTick = void 0;
	var lastNotifiedItem = void 0;

	function clearBadge() {
	  chrome.action.setBadgeText({ text: '' });
	}

	function checkRunningItem(notify) {
	  var item = runningItemRepository.get();
	  var infos = (0, _runningItemInfos2.default)(item.startedAt, item.type);

	  if (infos.late && lastNotifiedItem !== item.id) {
	    notifyFinish(item);
	    lastNotifiedItem = item.id;
	  }

	  renderMinutesBadge(infos.leftTimeInSeconds, infos.late);
	}

	function stopCheckRunningItem() {
	  clearBadge();
	  clearInterval(checkTick);
	}

	function startCheckRunningItem() {
	  stopCheckRunningItem();

	  var item = runningItemRepository.get();

	  if (item.late) {
	    lastNotifiedItem = item.id;
	  }

	  checkRunningItem();

	  checkTick = setInterval(checkRunningItem, 500);
	}

	if (runningItemRepository.get()) {
	  startCheckRunningItem();
	}

	window.chrome.runtime.onMessage.addListener(function (request) {
	  if (request.type === runtimeEventsTypes.STOP_COUNTER) {
	    stopCheckRunningItem();
	  }

	  if (request.type === runtimeEventsTypes.START_COUNTER) {
	    startCheckRunningItem();
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ring.ogg";

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "pomotodo-128.png";

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "browser-action-icon.png";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "pomotodo-notification.png";

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var START_COUNTER = exports.START_COUNTER = 'START_COUNTER';
	var STOP_COUNTER = exports.STOP_COUNTER = 'STOP_COUNTER';

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var POMODORO = exports.POMODORO = 'POMODORO';
	var SHORT_PAUSE = exports.SHORT_PAUSE = 'SHORT_PAUSE';
	var LONG_PAUSE = exports.LONG_PAUSE = 'LONG_PAUSE';

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.get = get;
	exports.persist = persist;
	function get() {
	  var item = JSON.parse(window.localStorage.getItem('running-item'));

	  if (item) {
	    item = _extends({}, item, {
	      startedAt: new Date(item.startedAt)
	    });
	  }

	  return item;
	}

	function persist(data) {
	  window.localStorage.setItem('running-item', JSON.stringify(data));
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (startedAt, itemType) {
	  var _runnableTypes$SHORT_;

	  var now = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date();
	  var configs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : configsRepository.get();

	  var timeToFinish = (_runnableTypes$SHORT_ = {}, _defineProperty(_runnableTypes$SHORT_, runnableTypes.SHORT_PAUSE, configs.shortPauseLength * 60), _defineProperty(_runnableTypes$SHORT_, runnableTypes.LONG_PAUSE, configs.longPauseLength * 60), _defineProperty(_runnableTypes$SHORT_, runnableTypes.POMODORO, configs.pomodoroLength * 60), _runnableTypes$SHORT_)[itemType];

	  var elapsedTimeInSeconds = (now.getTime() - startedAt.getTime()) / 1000;

	  return {
	    late: elapsedTimeInSeconds > timeToFinish,
	    leftTimeInSeconds: timeToFinish - elapsedTimeInSeconds,
	    elapsedTime: elapsedTimeInSeconds
	  };
	};

	var _runnableTypes = __webpack_require__(6);

	var runnableTypes = _interopRequireWildcard(_runnableTypes);

	var _configs = __webpack_require__(9);

	var configsRepository = _interopRequireWildcard(_configs);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.get = get;
	exports.persist = persist;
	function get() {
	  var infos = JSON.parse(window.localStorage.getItem('configs'));

	  return _extends({
	    pomodoroLength: 20,
	    shortPauseLength: 15,
	    longPauseLength: 5
	  }, infos);
	}

	function persist(configs) {
	  window.localStorage.setItem('configs', JSON.stringify({
	    pomodoroLength: configs.pomodoroLength,
	    shortPauseLength: configs.shortPauseLength,
	    longPauseLength: configs.longPauseLength
	  }));
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.presentFullDuration = presentFullDuration;
	exports.presentMinutesDuration = presentMinutesDuration;
	function presentFullDuration(duration) {
	  if (!duration) {
	    return '00:00';
	  }

	  duration = Math.abs(parseInt(duration, 10));

	  var hours = Math.floor(duration / 3600);
	  var minutes = parseInt(duration / 60, 10);
	  var seconds = (duration - hours * 3600) % 60;

	  if (minutes < 10) {
	    minutes = '0' + minutes;
	  }
	  if (seconds < 10) {
	    seconds = '0' + seconds;
	  }

	  return minutes + ':' + seconds;
	}

	function presentMinutesDuration(duration) {
	  return Math.abs(parseInt(duration / 60, 10)).toString();
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  window.localStorage.setItem('current-version', window.chrome.runtime.getManifest().version);
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (description) {
	  description = description.split('\n')[0];

	  return description.length > 65 ? description.substring(0, 65) + '\u2026' : description;
	};

/***/ }
/******/ ]);