# GlobalLevitatedSphere

> Una palla galleggiante globale sviluppata sulla base di Uniapp, che può essere introdotta direttamente in app Vue e può essere Visualizzata su tutte le pagine Senza la necessità di introdurla pagina per pagina
>
> 

# options

| 参数        | 说明                      | 类型   | 默认值           |
| ----------- | ------------------------- | ------ | ---------------- |
| id          | 唯一id                    | String | levitated-sphere |
| width       | 主图宽度                  | Number | 70               |
| height      | 主图高度                  | Number | 70               |
| url         | 主图地址                  | String | /static/logo.png |
| radius      | 小图距离大图间距          | Number | 60               |
| moveSpeed   | 贴边速度                  | Number | 5                |
| firstTop    | 首次进来主图所在位置高度  | Number | 200              |
| degree      | 角度间距                  | Number | 40               |
| startDegree | 首个小图所在位置角度      | Number | 60               |
| item        | 小图配置项,具体看下方item | Array  | -                |

# item 

| 参数   | 说明         | 类型     | 默认值 |
| ------ | ------------ | -------- | ------ |
| id     | 唯一         | String   | -      |
| url    | 小图图片地址 | String   | -      |
| width  | 小图宽度     | Number   | -      |
| height | 小图高度     | Number   | -      |
| click  | 小图点击事件 | Function | -      |

# event

| 参数 | 说明       | 返回值 |
| ---- | ---------- | ------ |
| show | 打开悬浮球 | -      |
| hide | 关闭悬浮球 | -      |

# Uso

Configura in app.vue Se configurato su altre pagine, potrebbe causare la registrazione di un nuovo levitated sphere ogni volta che si entra in quella pagina



## 1. Universal Global

If you don't need to hide individual pages, you can directly use the following method.

### 1.1 vue2



```vue
<script>
// app.vue
    import GlobalLevitatedSphere from '@/uni_modules/qjp-GlobalLevitatedSphere/js_sdk/qjp-GlobalLevitatedSphere.js';
    const options ={
			width:100,
			height:100,
			url:'/static/11.png',
			radius:100,
			moveSpeed:5,
			id:'circleWrap',
			item:[
				{
					url:'/static/22.png',
					id:'item1',
					width:50,
					height:50,
					click:()=>{
						uni.showToast({
							title: 'item1'
						})
					}
				},
				{
					url:'/static/33.png',
					id:'item2',
					width:50,
					height:50,
					click:()=>{
						uni.showToast({
							title: 'item2'
						})
					}
				},
				{
					url:'/static/44.png',
					id:'item3',
					width:50,
					height:50,
					click:()=>{
						uni.showToast({
							title: 'item3'
						})
					}
				},
				{
					url:'/static/55.png',
					id:'item4',
					width:50,
					height:50,
					click:()=>{
						uni.showToast({
							title: 'item4'
						})
					}
				}
			]
		}
    export default {
        onLaunch:function(){
			new GlobalLevitatedSphere(options)
        },
        created() {
           
        },
        methods: {
            
        }
    }

</script>
```

### 1.2 vue3

```vue
<script setup>
// app.vue
    import GlobalLevitatedSphere from '@/uni_modules/qjp-GlobalLevitatedSphere/js_sdk/qjp-GlobalLevitatedSphere.js';
    import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
    onLaunch(() => {
     new GlobalLevitatedSphere(options)
    });
         const options ={
			width:100,
			height:100,
			url:'/static/11.png',
			radius:100,
			moveSpeed:5,
			id:'circleWrap',
			item:[
				{
					url:'/static/22.png',
					id:'item1',
					width:50,
					height:50,
					click:()=>{
						uni.showToast({
							title: 'item1'
						})
					}
				},
				{
					url:'/static/33.png',
					id:'item2',
					width:50,
					height:50,
					click:()=>{
						uni.showToast({
							title: 'item2'
						})
					}
				},
				{
					url:'/static/44.png',
					id:'item3',
					width:50,
					height:50,
					click:()=>{
						uni.showToast({
							title: 'item3'
						})
					}
				},
				{
					url:'/static/55.png',
					id:'item4',
					width:50,
					height:50,
					click:()=>{
						uni.showToast({
							title: 'item4'
						})
					}
				}
			]
};
</script>
```

## 2. Hide individual pages

### 2.1 vue2

#### 2.1.1  Vuex



```js
// globalLevitatedSphereStore.js
  import GlobalLevitatedSphere from '@/uni_modules/qjp-GlobalLevitatedSphere/js_sdk/qjp-GlobalLevitatedSphere.js';
const globalLevitatedSphereStore = {
	state: {
		levitatedSphereCtx: null,
	},
	getters: {
		levitatedSphereCcontext(state) {
			return state.levitatedSphereCtx
		}
	},
	mutations: {
		INIT_LEVITATED_SPHERE_CTX(state) {
			const options = {} // Configuration items, you can view the global universal example configuration items above.
			state.levitatedSphereCtx = new GlobalLevitatedSphere(options)
		}
	},
	actions: {
		init_levitated_sphere({
			commit
		}) {
			commit('INIT_LEVITATED_SPHERE_CTX')
		},

	}
}
export default globalLevitatedSphereStore

```



#### 2.1.2 app.vue



```vue
<script>
// app.vue
import { mapActions, mapGetters,mapState,mapMutations } from 'vuex';
    export default {
        onLaunch:function(){
			this.init_levitated_sphere()
        },
        created() {
           
        },
        methods: {
            ...mapActions([
				'init_levitated_sphere'
			])
        }
    }

</script>

```



#### 2.1.3 Route interception



```js
// uni.promisify.adaptor.js
import store from '@/store/modules/globalLevitatedSphereStore.js'
const white = ['/pages/login/login','/pages/register/register' ]
uni.addInterceptor("navigateTo", {
	invoke(e) {
		if (white.includes(e.url)) {
			store.state.levitatedSphereCtx.hide()
		} else {
			store.state.levitatedSphereCtx.show()
		}
	},
	success(e) {
		 console.log(e)
	},
});
uni.addInterceptor("switchTab", {
	invoke(e) {
		if (white.includes(e.url)) {
			store.state.levitatedSphereCtx.hide()
		} else {
			store.state.levitatedSphereCtx.show()
		}
	},
	success(e) {
		 console.log(e)
	},
});
```

### 2.2 vue3

#### 2.2.1 pinia



```js
// globalLevitatedSphereStore.js
import { defineStore } from 'pinia'
  import GlobalLevitatedSphere from '@/uni_modules/qjp-GlobalLevitatedSphere/js_sdk/qjp-GlobalLevitatedSphere.js';
 const useGlobalLevitatedSphereStoreStore = defineStore('globalLevitatedSphere', {
	state: () =>{
		return {
			levitatedSphereCtx:null
		}
	},
	getters:{
		levitatedSphereCcontext(state) {
			return state.levitatedSphereCtx
		}
	},
	actions: {
		init_levitated_sphere() {
			const options = {}  // Configuration items, you can view the global universal example configuration items above.
            this.levitatedSphereCtx =  new GlobalLevitatedSphere(options)
		}
	}
})
export default useGlobalLevitatedSphereStoreStore
```



#### 2.2.2 app.vue



```vue
<script setup>
// app.vue
    import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
    import useGlobalLevitatedSphereStoreStore from '@/store/modules/globalLevitatedSphereStore.js'
    onLaunch(() => {
        useGlobalLevitatedSphereStoreStore().init_levitated_sphere()
    });
};
</script>
```

#### 2.2.3 Route interception

```js
// uni.promisify.adaptor.js
import useGlobalLevitatedSphereStoreStore from '@/store/modules/globalLevitatedSphereStore.js'
import { storeToRefs } from 'pinia';
const globalLevitatedSphere = useGlobalLevitatedSphereStoreStore()
const { levitatedSphereCcontext } = storeToRefs(globalLevitatedSphere);
const white = ['/pages/login/login','/pages/register/register' ]
uni.addInterceptor("navigateTo", {
	invoke(e) {
		if (white.includes(e.url)) {
			levitatedSphereCcontext.value.hide()
		} else {
			levitatedSphereCcontext.value.show()
		}
	},
	success(e) {
		 console.log(e)
	},
});
uni.addInterceptor("switchTab", {
	invoke(e) {
		if (white.includes(e.url)) {
			levitatedSphereCcontext.value.hide()
		} else {
			levitatedSphereCcontext.value.show()
		}
	},
	success(e) {
		 console.log(e)
	},
});
```



