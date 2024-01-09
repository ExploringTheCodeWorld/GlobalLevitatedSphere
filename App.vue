<script setup>
import GlobalLevitatedSphere from '@/utils/globalLevitatedSphere.js';
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
onLaunch(() => {
	new GlobalLevitatedSphere(options);
});
const options = {
	width: 100,
	height: 100,
	url: '/static/11.png',
	radius: 100,
	moveSpeed: 5,
	id: 'circleWrap',
	item: [
		{
			url: '/static/22.png',
			id: 'item1',
			width: 50,
			height: 50,
			click: () => {
				uni.showToast({
					title: 'item1'
				});
			}
		},
		{
			url: '/static/33.png',
			id: 'item2',
			width: 50,
			height: 50,
			click: () => {
				uni.showToast({
					title: 'item2'
				});
			}
		},
		{
			url: '/static/44.png',
			id: 'item3',
			width: 50,
			height: 50,
			click: () => {
				uni.showToast({
					title: 'item3'
				});
			}
		},
		{
			url: '/static/55.png',
			id: 'item4',
			width: 50,
			height: 50,
			click: () => {
				uni.showToast({
					title: 'item4'
				});
			}
		}
	]
};
</script>

<style>
/*每个页面公共css */
</style>
