<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		
		<button @click="go">前往页面1</button>
		<button @click="click">前往页面2</button>
	</view>
</template>

<script setup>
	
	const go = ()=>{
		uni.navigateTo({
			url:'/pages/index2/index2'
		})
	}
	
	const click = ()=>{
		uni.navigateTo({
			url:'/pages/index3/index3'
		})
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
