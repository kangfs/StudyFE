# JSX简介
## 为什么使用JSX
<font color=#1E90FF>JSX，是一个 JavaScript 的语法扩展。我们建议在 React 中配合使用 JSX，JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式</font>

在`JavaScript`代码中将`JSX`和`UI`放在一起时，会在视觉上有辅助作用。它还可以使`React`显示更多有用的错误和警告消息。

## 在JSX中嵌入表达式
<font color=#9400D3>在 JSX 语法中，你可以在大括号内放置任何有效的 JavaScript 表达式</font>，这个的有效，我们之前也说过，就是存在有标准返回结果的`JavaScript`代码而已，无论是个判断式还是函数都是可以的。

```javascript
const name = 'Taopoppy'
const element = <h1>hello, { name }</h1>

ReactDOM.render(element, document.getElementById('root'))
```

## JSX也是一个表达式
<img :src="$withBase('/react_redux_jsx.png')" alt="JSX的本质">

+ <font color=#9400D3>JSX表达式会被转为普通JavaScript函数调用，并且对其取值后得到JavaScript对象</font>，既然`JSX`最终转换成`JavaScript`对象，`JSX`就能赋值给变量，作为参数传入，甚至作为函数的返回值返回。
+ <font color=#9400D3>JSX本质就是一种语法糖，Babel会把JSX 转译成一个名为React.createElement()函数调用</font>，所以下面两种代码完全等效：
	```javascript
	const element = (
		<h1 className="greeting">
			Hello, world!
		</h1>
	);
	```
	```javascript
	const element = React.createElement(
		'h1',
		{className: 'greeting'},
		'Hello, world!'
	);
	```
	`React.createElement()`会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的`javascript`对象：
	```javascript
	// 注意：这是简化过的结构
	const element = {
		type: 'h1',
		props: {
			className: 'greeting',
			children: 'Hello, world!'
		}
	};
	```
	<font color=#DD1144>这些对象被称为“React元素”。它们描述了你希望在屏幕上看到的内容。React通过读取这些对象，然后使用它们来构建DOM以及保持随时更新</font>。
+ <font color=#9400D3>至于虚拟DOM(js对象)怎么最终被转化成浏览器中的DOM节点，就是ReactDOM.render()函数做的事情了</font>

## JSX 特定属性
<font color=#9400D3>你可以通过使用引号，来将属性值指定为字符串字面量;也可以使用大括号，来在属性值中插入一个JavaScript表达式。但是对于同一属性不能同时使用这两种符号</font>

```javascript
const element = <div tabIndex="0"/>
const element = <img src={user.avatarUrl}/>
```
<font color=#1E90FF>因为JSX语法上更接近JavaScript而不是HTML，所以React DOM使用camelCase（小驼峰命名）来定义属性的名称，而不使用HTML属性名称的命名约定。例如，JSX 里的样式属性class变成了 className，而tabindex则变为tabIndex，label标签中的for属性变成了htmlFor</font>。

## JSX防止注入攻击
<font color=#DD1144>你可以安全地在 JSX 当中插入用户输入内容,React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。</font>

## 注释和转义
在`JSX`当中做注释，需要使用下面这样方式：
```javascript
<div>
  {/* 下面是个按钮 */}
  <button>提交</button>
</div>
```
然后如果在一些输入框中我们不需要自动的被转义，我们需要使用<font color=#9400D3>dangerouslySetInnerHTML</font>属性来设置：
```javascript
// 自动被转义
<li>{item}</li>

// 不自动转义
<li dangerouslySetInnerHTML={{__html:item}}/>
```