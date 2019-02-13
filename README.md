## 功能介绍
这个 repo 是跟随课程更新而逐步加入代码的。
目前 userCenter 这个 branch 包含了 Home、Detail 和 Me 页面。 因为我们的课程内容制定还没有涉及到 Cart 和 Order 页面，因为这两个部分还没有添加任何功能。

## 重要的代码改动
在我们完善课程的过程由于发现以下需求，因此我们对代码做了一些调整。希望大佬可以帮忙审阅以下：

### 删除首页中将商品直接加入购物车的功能。
- 根据观察，除了生鲜以及外卖等特定领域的电商平台有在首页中直接将商品添加到购物车的功能，一般的电商很少有这样的功能。实际情况中，用户也很难通过首页的预览图直接将商品放入购物车。
- 根据上一版学员的反馈，第一学期与第二学期的难度跨度比较大。由于购物车是整个商城小程序业务逻辑最复杂的一章（应该有 4、5 个逻辑在这一章出现），为了能够减轻学员的负担，平缓学员的学习曲线，我们在首页中去掉了加入购物车的功能。

### 修改文件名、变量名

  参考国外 Amazon，ebay 等知名电商，我们将源代码中涉及海外人士习惯用法的文件名，变量名进行修改：
- trolley -> cart
- user -> me
- unlogin -> login

### 小程序接口更新

  删除用户设置页面授权的步骤。
- 在我们几名开发人员在不同环境的实际开发中 `wx.opensetting` 无法打开用户设置页面，程序无法进行下去。（可能是由于最近开发者工具频繁更新导致的兼容性问题，猜测。这样的问题出现在学员的概率也很大。）
- 从用户角度出发，登陆小程序，首先提示授权的 prompt，然后跳转到设置页面，然后手动退回来。步骤冗长，不利于体验。所以我们决定暂时删除跳转到设置页面这一步（删除 `util.js` 中部分关于 `wx.opensetting` 的内容）。直接利用源代码中的 `<button>` 组件最新的获取用户信息开放能力，给用户提示一次是否授权的 prompt 为佳。

### 商城小程序登陆页代码在多个页面均有展示，比如在 `.wxml` 中出现的：

```
<view class="login-card">
  <view class="login-head"></view>
  <view class="login-info">
    <view class="login-text">Not Login</view>
    <view class="login-tips">Click "Login" with WeChat account to shop</view>
  </view>
</view>
<button class="login-btn" open-type="getUserInfo" bindgetuserinfo="onTapLogin">Login</button>
```
以及对应的样式代码，我们抽成了自定义 component（请参见 `components/login`）。


