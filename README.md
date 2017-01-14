# 微信小程序练习手册

> 知乎日报
> 
> 小程序不支持绑定html数据，猝？

## 数据接口

详情请点击查看(ZhihuDailyPurify - 知乎日报 API 分析)[https://github.com/izzyleung/ZhihuDailyPurify/wiki/知乎日报-API-分析]

## 疑惑

### 组件

`text` 组件中

``` css
	
	.index-time{
		padding: 20px 40px; /*只有左右padding*/
		padding-top: 40px; /*无效*/
		padding-bottom: 40px; /*无效*/
	}

```

`image` 组件中

``` html

	<view class="index-ul-item">
      <text class="title">标题来一个呀标题来一个呀标题来一个呀标题来一个呀标题来一个呀标题来一个呀</text>
      <image class="img" mode="center" src="http://ac-dpeFsmm4.clouddn.com/dcc1dedffa8d73e6f5c2.jpg"></image>
    </view>

```

``` css
	
.index-ul-item{
	padding: 10px 20px;
	background-color: #fff;
	display: flex;
	algin-items: stretch;
}

.index-ul-item .img{
    height: 100px;
    width: 100px;
    flex-basis: 100px;
}

.index-ul-item .title{
    flex-basis: 100%;
}

```

如果直接这样子，`image`的大小终究不会是css里面那样，如果仅仅对`image`设置大小，大小的数值不会有问题。

所以需要对`image`包一层`view`，不知道浏览器中是不是如此。

### 事件绑定

``` html

<view class="index-ul-item" wx:for="{{list}}" data-id="{{item.id}}" bindtap="goToNews">
    <text class="title">{{item.title}}</text>
    <view class="img-box">
      <image class="img" mode="center" src="https://ac-dpeFsmm4.clouddn.com/dcc1dedffa8d73e6f5c2.jpg"></image>
    </view>
</view>
  
```

假若这样写，`goToNews`事件中通过参数的方式，拿不到data-id的值，`event.target.dataset.id`是`undefined`，其他数据貌似正常。

需要把相关绑定放到`text`上


### 请求数据

`wx.request`发起的是 HTTPS 请求，但是，请求借口需要在管理中心配置白名单。

`image`发起的数据请求似乎也需要是白名单里的地址，似乎也有公共白名单。例如：`ac-dpeFsmm4.clouddn.com/`，`http`、`https`都可以拿到图片。