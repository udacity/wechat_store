## 功能介绍
这个repo是跟随课程更新而逐步加入代码的。
目前userCenter 这个branch包含了 Home Detail 和Me 页面。 因为我们的课程内容制定还没有涉及到Cart 和Order页面，因为这两个部分还没有添加任何功能。

## 代码改动
在我们完善课程的过程由于发现以下需求，因此我们对代码做了一些调整。希望大佬可以帮忙审阅以下：

1. 小程序接口更新

    在实际运行中wx.opensetting无法打开用户设置页面，因此我们舍弃了这个方法。

2. 登陆页代码重复累赘，我们抽成了component (请参见components/login)。

3. 变量名，文件名不太符合老外的语言习惯。
    购物车trolley 改成了cart
    个人中心user改成了me
    unlogin 改成了login
