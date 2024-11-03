# 性能测量工具

## WebPageTest
### 1. 测试选项
我们可以登录[webpagetest.org](webpagetest.org)来测试我们想要测试的网站，我们来看网页

<img :src="$withBase('/font_end_optimization_4.png')" alt="">

其中重要的地方已经标注出来：
+ <font color=#1E90FF>输入框</font>：输入测试地址
+ <font color=#1E90FF>Browser</font>：测试用的浏览器
+ <font color=#1E90FF>Advanced Settings</font>：高级设置
	+ <font color=#1E90FF>Connection</font>：网络种类设置
	+ <font color=#1E90FF>Number of Tests to Run</font>：测试次数
	+ <font color=#1E90FF>Repeat View</font>：第一次访问和第二次访问，用来测试缓存工作
	+	<font color=#1E90FF>Capture Video</font>：结果视频

### 2. 测试结果
然后我们选择好之后，我们可以点击测试，然后过一会会出现这样的结果，这里安利一个`Chrome`浏览器截图全网页的方法，[百度知道](https://jingyan.baidu.com/article/1974b289342468f4b1f77428.html)：

<img :src="$withBase('/font_end_optimization_5.png')" alt="">

通过观察上面图可以看出，我们进行了3轮测试，每轮测试都会有结果，<font color=#1E90FF>然后最主要的要看Performance Results，就是测试结果</font>，有两行，第一行就是`First View`就是首次访问的情况，第二行就是`Repeat View`就是第二次访问的情况。然后我们来看指标；
+ <font color=#1E90FF>First Byte</font>：第一个请求发出去得到响应的时间，反应的服务器处理的能力和网络的回路情况
+ <font color=#1E90FF>Start Render</font>；首屏渲染
+ <font color=#1E90FF>First ContentFul Paint</font>：第一个有绘制的东西出现的时间
+ <font color=#1E90FF>Speed index</font>：速度指数，要在4秒以内

然后中间的`Web Vitals`是谷歌浏览器独有的，其中有个指数比较重要：
+ <font color=#1E90FF>Totol Block Time</font>：页面阻塞导致用户无法交互的累积时长，绿色代表优秀，黄色代表一般，红色代表卡死

### 3. 具体结果
然后我们可以点击某一轮的具体的瀑布图，我们可以观察到更加仔细的瀑布图，这个图是要比`Chrome DevTools`更加详细的。

<img :src="$withBase('/font_end_optimization_6.png')" alt="">

你会看到在上图中有很多图片都是<font color=#DD1144>并行加载</font>的，它们开始加载的时间都是相同的，这一点也可以看出来淘宝网站的优化是做的不错的，这也是提示我们对于网站的很多资源也是可以并行加载的。

我们再来看一个图：

<img :src="$withBase('/font_end_optimization_7.png')" alt="">

可以在图中看到使用黄色高亮标注的部分，可以看到这些请求的结果是302，也就是重定向，说明这个请求的地址当前已经无效了，为了进一步优化，我们可以把这些重定向的请求挑出来直接修改成重定向的地址，这样就可以节省重定向的过程。

### 4. 本地部署WebPageTest
之前说的都是在线网站的性能分析，我们知道优化实际上是个没有结果的事情，也就是说开发时期要进行优化，上线之后也要进行优化，在开发时期我们可以借助本地`WebPageTest`工具进行性能分析。


这里来说明一下`Windows`平台下的安装，前提是电脑上有[docker](https://hub.docker.com/editions/community/docker-ce-desktop-windows/)
```javascript
// 拉取镜像
docker pull webpagetest/server
docker pull webpagetest/agent

// 运行server的实例
docker run -d -p 4000:80 webpagetest/server
// 运行agent的实例
docker run -d -p 4001:80 --network="host" -e "SERVER_URL=http://localhost:4000/work/" -e "LOCATION=Test" webpagetest/agent
```
现在就可以直接到浏览器，打开`localhost:4000`就可以用了

## LightHouse
### 1. 工具使用
<font color=#1E90FF>**① 第三方包**</font>

`LightHouse`不仅能给我们生成一个完成的报告，还会针对性的给我们提出建议。最开始的时候`LightHouse`是以`npm`包的形式出现的，需要全局下载：
```javascript
npm install -g lighthouse
```
当前最新的版本是`lighthouse@6.0.0`，使用方法也很简单，直接使用`lighthouse`加网址即可：
```javascript
lighthouse http://www.bilibili.com
```
默认会自动打开一个`Chrome`浏览器窗口对移动版的网址进行测试，然后会以`html`的文件形式进行输出，在浏览器打开即可
```javascript
  Printer html output written to C:\Users\Administrator\Desktop\m.bilibili.com
020-11-23_16-13-46.report.html +98ms
```
<img :src="$withBase('/optimization_lighthouse_screen.png')" alt="lighthouse">

<font color=#1E90FF>**② 浏览器内置Dev**</font>

打开浏览器开发工具，在`Audits`当中内置了`LightHouse`，其有很多参数可以选择，比较方便

<font color=#1E90FF>**③ 浏览器插件**</font>

在`Chrome Store`当中可以搜索到`lighthouse`插件，不过需要翻墙，使用方法和上述两种基本一致。

### 2. Metrics指标

在`Metrics`当中最关心的几个指标
+ <font color=#1E90FF>First Contentful Paint</font>:第一个有绘制的东西出现的时间
+ <font color=#1E90FF>Speed index</font>：速度指数，小于4秒为优，这个只是个指导性的指标，像电商网站无论怎么做都不会比百度这些官网优秀，因为内容不一样，复杂度会更高
+ <font color=#1E90FF>Largest Contentful Paint</font>：绘制最大的内容所花费的时间
+ <font color=#1E90FF>Time to Interactive</font>：什么时候用户可以和网站开始交互了
+ <font color=#1E90FF>Total Blocking Time</font>：阻塞的总时间

### 3. Opportunities指路
接着往下就是`Opportunities`，这个部分是告诉你可以优化哪些部分，并且通过优化之后可以达到的一个结果：
+ <font color=#1E90FF>Remove unused JavaScript</font>：移除一些没有用的`JS`代码，可能将后面页面用到的`JS`在首屏就加载了出来。
+ <font color=#1E90FF>Eliminate render-blocking resources</font>：消除阻塞阻塞加载

还有很多项目，我们就不一一解释了，可以到具体的官网去查，另外在后面我们还会去实践。

## Chrome DevTools


## 性能测量API