"use strict";
export default class Card{ //类

	constructor(obj) {
		if(typeof(obj) != 'object') {
			throw new Error("must be object");
		}

		//外部参数
		this.state = obj ? obj : {};

		//内部参数
		this.props = {
			container: 'string.isReq',
			resultText: 'string.isReq',
			textBgColor: 'string.notReq',
			defaultColor: 'string.notReq',
			rubberSize: 'number.notReq',
			width: 'number.isReq',
			height: 'number.isReq'
		};

		this.rubberLock = false;

		this.cardStyle = `#${this.container}{
        position:relative;
    }`;
		this.resultStyle = `.card-result{
        width:${this.state.width}px;
        height:${this.state.height}px;
        color:${this.state.color};
        font-size:40px;
        font-family:'myfont';
        line-height:${this.state.height}px;
        text-align:center;
        background:${this.state.textBgColor};
        curser:url(./img/heart.png);

    }`;
		this.maskStyle = `.mask{
        position:absolute;
        top:0;
        left:0;
    }`;

		this._$ = (seletor) => document.querySelector(seletor);
		this._createEle = (elem) => document.createElement(elem);
		this._setCons = (elem, text) => {
			elem.innerText = text;
		};
		this._appendChild = (parents, child) => parents.appendChild(child);
		this._init(); //初始化
	}

	_init() {
		this._validate();
		this._addStyle();
		this._addResult();
		this._addMask();
	}
	//检验参数
	_validate() {
		let propTypes = this.props;
		Object.getOwnPropertyNames(propTypes).forEach((val, index, array) => {
			let stateType = typeof this.state[val] //所有外部参数的类型
			let propsType = propTypes[val].split('.')[0]; //类型
			let req = propTypes[val].split('.')[1]; //必要性

			let isReq = req === 'isReq' ? true : false;
			let isPropType = propsType === stateType ? true : false;

			if(isReq && !this.state[val]) {
				throw new Error("shot of props");
			}
			if(!isPropType && this.state[val]) {
				throw new Error("typeError");
			}
		})
	}
	//添加样式到head标签
	_addStyle() {
		let $ = this._$;
		let style = this._createEle('style');
		let styleCon = `${this.cardStyle}${this.resultStyle}${this.maskStyle}`.replace(/\s/g, '');
		this._setCons(style, styleCon);
		this._appendChild($('head'), style);
	}
	_addResult() {
		let $ = this._$;
		let resultEle = this._createEle('div');
		resultEle.setAttribute('class', 'card-result');
		this._setCons(resultEle, this.state.resultText);
		this._appendChild($(`#${this.state.container}`), resultEle);

	}
	_addMask() {
		let $ = this._$;
		let parentEle = $(`#${this.state.container}`);
		let canvasEle = this._createEle('canvas');
		canvasEle.setAttribute('class', 'mask');
		this._appendChild(parentEle, canvasEle);

		let canvasH = parentEle.offsetHeight;
		let canvasW = parentEle.offsetWidth;

		canvasEle.setAttribute('width', canvasW);
		canvasEle.setAttribute('height', canvasH);

		let context = canvasEle.getContext('2d');
		context.fillStyle = this.state.defaultColor ? this.state.defaultColor : '#999999';
		context.fillRect(0, 0, canvasW, canvasH);

		//mousedown
		canvasEle.addEventListener('mousedown', (e) => {
			//开启橡皮差
			e.preventDefault();
			this._start(e, canvasEle);
		})

		//mousemove
		canvasEle.addEventListener('mousemove', (e) => {
			//擦除
			this._clear(e, canvasEle, context, canvasW, canvasH);
		})

		//mouseup
		canvasEle.addEventListener('mouseup', (e) => {
			//关闭橡皮差
			this._close(e, canvasEle);
		})
	}
	_start(e, canvasEle) {
		this.rubberLock = true;
	}
	_clear(e, canvasEle, context, canvasW, canvasH) {
		if(!this.rubberLock) {
			return
		};

		//获取画布相对于窗口基点的位置
		let boundT = canvasEle.getBoundingClientRect().top;
		let boundL = canvasEle.getBoundingClientRect().left;

		//获取鼠标的位置到画布基点的位置
		let mouseX = e.clientX - boundL;
		let mouseY = e.clientY - boundT;

		//起用橡皮擦除刮层
		let rubberSize = this.state.rubberSize ? this.state.rubberSize : 10;
		context.clearRect(mouseX, mouseY, rubberSize, rubberSize);

		let num = 0;
		let datas = context.getImageData(0, 0, canvasW, canvasH);
		for(let i = 0; i < datas.data.length; i++) {
			if(datas.data[i] == 0) {
				num++;
			};
		};
		if(num >= datas.data.length * 0.7) {
			context.clearRect(0, 0, canvasW, canvasH);
		};
	}
	_close(e, canvasEle) {
		this.rubberLock = false;
	}
}