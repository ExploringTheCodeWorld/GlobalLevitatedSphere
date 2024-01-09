const systemInfo = uni.getSystemInfoSync();
/**
 * 
 * @param {Object} options 配置项
 * @param {Number} options.width  大图宽度   默认值70
 * @param {Number} options.height  大图高度  默认值70
 * @param {String} options.url  大图地址  默认值'/static/logo.png'
 * @param {Number} options.radius  小图距离大图间距  默认值60
 * @param {Number} options.moveSpeed  贴边速度  默认值5
 * @param {Number} options.firstTop  首次进来所在位置高度  默认值200
 * @param {Number} options.degree  角度  默认值40
 * @param {Number} options.startDegree  首个图片角度  默认值60
 * 
 * 
 * @param {Array} options.item  小图配置项  
 * @param {String} options.item[].url   小图图片地址
 * @param {String} options.item[].id   小图id  必须是唯一
 * @param {Number} options.item[].width   小图宽度
 * @param {Number} options.item[].height   小图高度
 * @param {Function} options.item[].click   小图点击事件
 * 
 * 
 * 
 * 
 * 
 * 
 *  秦江平 --- 2024.1.9 
 */



class GlobalLevitatedSphere {

	constructor(options = {}) {
		const defaultOptions = {
			width:100,
			height:100,
			url:'/static/logo.png',
			radius:60,
			moveSpeed:5,
			id:'levitated-sphere',
			firstTop:200,
			degree:40,
			startDegree:60,
			item:[]
		}
		this.options = {...defaultOptions,...options}
		this.pictrue = null
		this.view = null
		this.clickLoading = false
		this.onlyShowMain = false
		this.clientX = 0
		this.clientY = this.options.firstTop
		this.center = this.options.firstTop
		this.init()
	}

	init() {
		this.loadImage().then(() => {
			let webview = null;
			webview = new plus.nativeObj.View(this.options.id, this.getMainViewStyle());
			this.drawContents(webview)
			this.drawMainContents(webview)
			webview.interceptTouchEvent(true);
			webview.addEventListener("click", (res) => {
				if (this.clickLoading) return
				this.onlyShowMain = !this.onlyShowMain
				const y =   !this.onlyShowMain ? this.center: this.center + ((this.height - this.options.height) / 2)
				webview.setStyle(this.getMainViewStyle(this.clientX,y  ))
				this.drawContents(webview)
				this.drawMainContents(webview)
			});
			webview.addEventListener("touchstart", (res) => {
				this.clickLoading = false
				this.axle = {
					xAxle: res.pageX,
					yAxle: res.pageY,
					clientX: res.clientX,
					clientY: res.clientY
				}
			});
			webview.addEventListener("touchmove", res => {
				this.clickLoading = false
				const {
					screenX,
					screenY,
					pageX,
					pageY
				} = res;
				if (Math.abs(this.axle.xAxle - pageX) > 10 || Math.abs(this.axle.yAxle -
						pageY) > 10) {
					let x = pageX - this.axle.clientX
					let y = pageY - this.axle.clientY
					if (x >= systemInfo.screenWidth - this.options.width) {
						x = systemInfo.screenWidth - this.options.width
					}
					if (y >= systemInfo.screenHeight - this.options.height) {
						y = systemInfo.screenHeight - this.options.height
					}
					webview.setStyle({
						top: y,
						left: x
					})
					this.clientX = x
					this.clientY = y
						if(this.onlyShowMain){
							this.center = this.clientY - ((this.boxHeight - this.options.height) / 2)
						}else {
							this.center = this.clientY
						}
					this.drawContents(webview)
					this.clickLoading = true
				}
			});
			webview.addEventListener('touchend', res => {
				if (!this.clickLoading) return
				this.keepToTheSideAnimation(res.pageX, systemInfo.screenWidth)
			}, false)
			this.view = webview
			this.view.show();
		})
	}
	loadImage() {
		this.pictrue = new plus.nativeObj.Bitmap(`pictrue`)
		return new Promise((resolve, reject) => {
			this.pictrue.load(
				`_www${this.options.url}`,
				() => {
					resolve();
				},
				error => {
					reject(error);
				}
			);
		});
	}
	getMainViewStyle(x = 0, y = this.options.firstTop) {
		this.boxHeight = this.options.height + this.options.radius + this.options.item[0].height
		this.boxWidth = this.options.width + this.options.radius
		this.width = this.onlyShowMain ? this.options.width : this.boxWidth
		this.height = this.onlyShowMain ? this.options.width : this.boxHeight
		return {
			backgroundColor: 'rgba(0,0,0,0)',
			top: `${y}px`,
			left: `${x}px`,
			width: `${this.width}px`,
			height: `${this.height}px`
		}
	}
	drawMainContents(webview) {
		webview.drawBitmap(
			this.pictrue, {}, {
				width: this.options.width + 'px',
				height: this.options.height + 'px',
				left: 0 + 'px',
				top: (this.height - this.options.height) / 2 + 'px'
			},
			`runbackground`
		);
	}
	keepToTheSideAnimation(x, width) {
		const _that = this
		let index = x
		let timer = setInterval(() => {
			index--
			this.view.setStyle({
				left: index
			})
			if (index <= 0) {
				clearInterval(timer)
			}
			this.clientX = index
			this.drawContents(this.view)
			this.drawMainContents(this.view)
		}, _that.options.moveSpeed)
	}
	drawContents(webview) {
		const tmpList = []
		const tmpTotal = [...this.options.item]
		tmpTotal.forEach((imgInfo, i) => {
			if (this.onlyShowMain) {
				tmpList.push({
					tag: 'richtext',
					id: imgInfo.id,
					position: {
						top: 0,
						left: 0,
						width: 0,
						height: 0
					},
					text: '',
				})

			} else {
				let cD = this.options.startDegree - this.options.degree * i
				let x, y;
				const radian = cD * Math.PI / 180
				const imgRadius = imgInfo.width / 2
				x = 35 + this.options.radius * Math.cos(radian) - imgRadius
				y = (this.height / 2 - 5) - this.options.radius * Math.sin(radian) - imgRadius
				const drawInfo = {
					tag: 'richtext',
					id: imgInfo.id,
					position: {
						top: y,
						left: x,
						width: imgInfo.width,
						height: imgInfo.height
					},
					text: `<img src="${imgInfo.url}" width="${imgInfo.width}px" height="${imgInfo.height}px"></img>`,
					richTextStyles: {
						onClick: () => {
							imgInfo.click()
						}
					},
				}
				tmpList.push(drawInfo)
			}
		})
		webview.draw(tmpList)
	}
	show(){
		this.view.show()
	}
	hide(){
		this.view.hide()
	}
}
export default GlobalLevitatedSphere