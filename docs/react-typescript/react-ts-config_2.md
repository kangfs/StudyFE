# React基础回顾

## 历史发展
+ 初期的网站只有简单的`html`、`css`、`js`文件组成，且不能和网站进行互动。

+ `AJAX`技术的出现允许`JS`可以操作元素和动态请求数据，最著名的就是06年的`jquery`,封装原生`JS`的同时，简化我们对适配不同奇葩浏览器的操作，但是随着需求多样化和项目的增大，`jquery`代码太过于复杂，维护成本也太高。

+ 对高级的设计模式的需求下，第一代`Angular`带着`MVC`的理念横空出世，但是天生的缺陷<font color=#9400D3>双向绑定</font>使得网站运行速度缓慢，而且`MVC`架构使得页面状态管理混乱。

+ 但是`Angular`带来的组件化思想让人叹为观止，它把网页拆成若干个独立的模块，这些都可以被轻易复制和管理，于是诞生了`React`以及`flex`、`redux`等等状态管理工具。

## React的特点
三个`React`最重要的特点我们应该深深记忆：<font color=#9400D3>单向数据流	</font>、<font color=#9400D3>虚拟dom</font>、<font color=#9400D3>组件化</font>

### 1. 单向数据流
数据和界面绑定可以大大减轻前端工程师的压力，但是<font color=#1E90FF>双向绑定</font>在简化的同时会带来灾难性的影响，页面越来越臃肿，数据越来越不可控，<font color=#DD1144>所以React在有了Angular的前车之鉴后就使用了单向数据流以及单向渲染，整体设计更像JS本身，像一个纯函数同样的输入有着同样的输出</font>

### 2. 虚拟dom
虚拟`DOM`是实现单向数据流的关键技术，在`JS`和`DOM`之间增加了一层UI抽象层，如果真实的`DOM`需要更新，那么`React`会对比两者，以最小的代价差量更新元素

### 3. 组件化
组件化的思想就是<font color=#DD1144>独立，完整，自由组合任意的组件</font>，通过简易的局部功能来完成复杂的产品功能

## 