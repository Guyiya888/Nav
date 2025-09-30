<div align="center">
<a href="https://nav.jianzhugo.cn"><img height="100px" alt="logo" src="https://nav.jianzhugo.cn/img/logo.png"></a>
  <p style="color:blue;font-size:20px;">Simple NAV</p>
  <p><em>自用简约的网址导航站，完全用AI采用vue框架开发。导航数据通过维基云表格编辑，无需数据库，无需后端，简单且方便。</em></p>
</div>

---

## 功能特点

- [x] 智能本地搜索功能
- [x] 响应式侧边栏布局
- [x] 黑暗模式自动适配（bug已修复）
- [x] 多分类资源管理
- [x] 从维基云表格获取数据，无需数据库
- [x] 自定义背景颜色/图片/卡片数
- [x] 自定义分类图标

## 演示站

<https://nav.jianzhugo.cn>

![演示站](https://nav.jianzhugo.cn/img/demo1.png)

## 维基云表格

[表格链接](https://vika.cn/share/shrxaWuBbbn6cKWBwvXgV/dstfGaY66aN2wyLlmX/viwullRf3ubdS)

![表格](https://nav.jianzhugo.cn/img/demo2.png)

## 安装布署

（给和我一样的小白）

#### 一、布署

我自己是使用的腾讯 EdgeOne Pages 布署的，免费快速。

1、Fork项目（https://github.com/jianzhugo/Simple-Nav）

2、打开下方 EdgeOne Pages 地址

[Pages地址](https://console.cloud.tencent.com/edgeone/pages)

3、点击创建项目，选择“导入Git仓库”,选择刚才Fork的仓库

4、在构建部署配置中按下图填写，然后点完成就可以了。

![配置](https://nav.jianzhugo.cn/img/demo3.png)

#### 二、改数据

1、在维基云注册账号，新建表格。表格格式如下

![格式](https://nav.jianzhugo.cn/img/demo4.png)

2、获取表格的APIkey、datasheetId、viewId

![获取](https://nav.jianzhugo.cn/img/demo7.png)

替换掉src\api\fetchData.js文件中的对应项目。

![api](https://nav.jianzhugo.cn/img/demo5.png)

3、自定义分类图标

按表格中的分类名，修改src\components\Sidebar.vue对应的图标映射

![图标映射](https://nav.jianzhugo.cn/img/demo6.png)

## 其它

根据自己需要修改关于页面及其它界面代码。