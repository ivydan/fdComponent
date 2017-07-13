"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./FontLight.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FontLight = function (_React$Component) {
	_inherits(FontLight, _React$Component);

	function FontLight(props) {
		_classCallCheck(this, FontLight);

		return _possibleConstructorReturn(this, _React$Component.call(this, props));
	}

	FontLight.prototype.render = function render() {
		var className = this.props.className ? "fd-font-light " + this.props.className : "fd-font-light";
		var test = this.props.test;
		var color = this.props.color;
		return _react2.default.createElement(
			"div",
			{ className: className },
			_react2.default.createElement(
				"span",
				{ className: "lignt-txt", "data-text": test },
				test
			),
			_react2.default.createElement("div", { className: "lignt-bgc", style: color ? { background: "linear-gradient(45deg, " + color[0] + ", " + color[1] + ")" } : {} }),
			_react2.default.createElement("div", { className: "lignt-ani" })
		);
	};

	return FontLight;
}(_react2.default.Component);

exports.default = FontLight;