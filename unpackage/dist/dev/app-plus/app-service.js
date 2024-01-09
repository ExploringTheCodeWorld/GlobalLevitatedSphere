if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$3 = {
    __name: "index",
    setup(__props) {
      const go = () => {
        uni.navigateTo({
          url: "/pages/index2/index2"
        });
      };
      const click = () => {
        uni.navigateTo({
          url: "/pages/index3/index3"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
          vue.createElementVNode("image", {
            class: "logo",
            src: "/static/logo.png"
          }),
          vue.createElementVNode("button", { onClick: go }, "前往页面1"),
          vue.createElementVNode("button", { onClick: click }, "前往页面2")
        ]);
      };
    }
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "E:/app code/GlobalLevitatedSphere/pages/index/index.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesIndex2Index2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "E:/app code/GlobalLevitatedSphere/pages/index2/index2.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesIndex3Index3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "E:/app code/GlobalLevitatedSphere/pages/index3/index3.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/index2/index2", PagesIndex2Index2);
  __definePage("pages/index3/index3", PagesIndex3Index3);
  const systemInfo = uni.getSystemInfoSync();
  class GlobalLevitatedSphere {
    constructor(options = {}) {
      const defaultOptions = {
        width: 100,
        height: 100,
        url: "/static/logo.png",
        radius: 60,
        moveSpeed: 5,
        id: "levitated-sphere",
        firstTop: 200,
        degree: 40,
        startDegree: 60,
        item: []
      };
      this.options = { ...defaultOptions, ...options };
      this.pictrue = null;
      this.view = null;
      this.clickLoading = false;
      this.onlyShowMain = false;
      this.clientX = 0;
      this.clientY = this.options.firstTop;
      this.center = this.options.firstTop;
      this.init();
    }
    init() {
      this.loadImage().then(() => {
        let webview = null;
        webview = new plus.nativeObj.View(this.options.id, this.getMainViewStyle());
        this.drawContents(webview);
        this.drawMainContents(webview);
        webview.interceptTouchEvent(true);
        webview.addEventListener("click", (res) => {
          if (this.clickLoading)
            return;
          this.onlyShowMain = !this.onlyShowMain;
          const y = !this.onlyShowMain ? this.center : this.center + (this.height - this.options.height) / 2;
          webview.setStyle(this.getMainViewStyle(this.clientX, y));
          this.drawContents(webview);
          this.drawMainContents(webview);
        });
        webview.addEventListener("touchstart", (res) => {
          this.clickLoading = false;
          this.axle = {
            xAxle: res.pageX,
            yAxle: res.pageY,
            clientX: res.clientX,
            clientY: res.clientY
          };
        });
        webview.addEventListener("touchmove", (res) => {
          this.clickLoading = false;
          const {
            screenX,
            screenY,
            pageX,
            pageY
          } = res;
          if (Math.abs(this.axle.xAxle - pageX) > 10 || Math.abs(this.axle.yAxle - pageY) > 10) {
            let x = pageX - this.axle.clientX;
            let y = pageY - this.axle.clientY;
            if (x >= systemInfo.screenWidth - this.options.width) {
              x = systemInfo.screenWidth - this.options.width;
            }
            if (y >= systemInfo.screenHeight - this.options.height) {
              y = systemInfo.screenHeight - this.options.height;
            }
            webview.setStyle({
              top: y,
              left: x
            });
            this.clientX = x;
            this.clientY = y;
            if (this.onlyShowMain) {
              this.center = this.clientY - (this.boxHeight - this.options.height) / 2;
            } else {
              this.center = this.clientY;
            }
            this.drawContents(webview);
            this.clickLoading = true;
          }
        });
        webview.addEventListener("touchend", (res) => {
          if (!this.clickLoading)
            return;
          this.keepToTheSideAnimation(res.pageX, systemInfo.screenWidth);
        }, false);
        this.view = webview;
        this.view.show();
      });
    }
    loadImage() {
      this.pictrue = new plus.nativeObj.Bitmap(`pictrue`);
      return new Promise((resolve, reject) => {
        this.pictrue.load(
          `_www${this.options.url}`,
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      });
    }
    getMainViewStyle(x = 0, y = this.options.firstTop) {
      this.boxHeight = this.options.height + this.options.radius + this.options.item[0].height;
      this.boxWidth = this.options.width + this.options.radius;
      this.width = this.onlyShowMain ? this.options.width : this.boxWidth;
      this.height = this.onlyShowMain ? this.options.width : this.boxHeight;
      return {
        backgroundColor: "rgba(0,0,0,0)",
        top: `${y}px`,
        left: `${x}px`,
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    }
    drawMainContents(webview) {
      webview.drawBitmap(
        this.pictrue,
        {},
        {
          width: this.options.width + "px",
          height: this.options.height + "px",
          left: "0px",
          top: (this.height - this.options.height) / 2 + "px"
        },
        `runbackground`
      );
    }
    keepToTheSideAnimation(x, width) {
      const _that = this;
      let index = x;
      let timer = setInterval(() => {
        index--;
        this.view.setStyle({
          left: index
        });
        if (index <= 0) {
          clearInterval(timer);
        }
        this.clientX = index;
        this.drawContents(this.view);
        this.drawMainContents(this.view);
      }, _that.options.moveSpeed);
    }
    drawContents(webview) {
      const tmpList = [];
      const tmpTotal = [...this.options.item];
      tmpTotal.forEach((imgInfo, i) => {
        if (this.onlyShowMain) {
          tmpList.push({
            tag: "richtext",
            id: imgInfo.id,
            position: {
              top: 0,
              left: 0,
              width: 0,
              height: 0
            },
            text: ""
          });
        } else {
          let cD = this.options.startDegree - this.options.degree * i;
          let x, y;
          const radian = cD * Math.PI / 180;
          const imgRadius = imgInfo.width / 2;
          x = 35 + this.options.radius * Math.cos(radian) - imgRadius;
          y = this.height / 2 - 5 - this.options.radius * Math.sin(radian) - imgRadius;
          const drawInfo = {
            tag: "richtext",
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
                imgInfo.click();
              }
            }
          };
          tmpList.push(drawInfo);
        }
      });
      webview.draw(tmpList);
    }
    show() {
      this.view.show();
    }
    hide() {
      this.view.hide();
    }
  }
  const ON_LAUNCH = "onLaunch";
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
  const _sfc_main = {
    __name: "App",
    setup(__props) {
      onLaunch(() => {
        new GlobalLevitatedSphere(options);
      });
      const options = {
        width: 100,
        height: 100,
        url: "/static/11.png",
        radius: 100,
        moveSpeed: 5,
        id: "circleWrap",
        item: [
          {
            url: "/static/22.png",
            id: "item1",
            width: 50,
            height: 50,
            click: () => {
              uni.showToast({
                title: "item1"
              });
            }
          },
          {
            url: "/static/33.png",
            id: "item2",
            width: 50,
            height: 50,
            click: () => {
              uni.showToast({
                title: "item2"
              });
            }
          },
          {
            url: "/static/44.png",
            id: "item3",
            width: 50,
            height: 50,
            click: () => {
              uni.showToast({
                title: "item3"
              });
            }
          },
          {
            url: "/static/55.png",
            id: "item4",
            width: 50,
            height: 50,
            click: () => {
              uni.showToast({
                title: "item4"
              });
            }
          }
        ]
      };
      return () => {
      };
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/app code/GlobalLevitatedSphere/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
