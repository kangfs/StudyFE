# React设计哲学
`React`最棒的部分之一是引导我们思考如何构建一个应用。在这篇文档中，我们将会通过 `React`构建一个可搜索的产品数据表格来更深刻地领会`React`哲学。

## 设计步骤
<font color=#DD1144>关于设计步骤是我们正规的使用React所要了解的，也是让我们可以培养React思维必须要了解的东西</font>，我们在[React思维实战](taopoppy.cn/react-redux/jiagou_sign_one.html#react思维实战)当中讲到东西基本就是从这里学到的。而且更建议去读，因为本章讲的都是理论，那里有真实的案例。
::: tip
建议读者精读这部分，因为这篇文档能够帮助你建立起构建React组件和应用的一般概念。尽管你可能需要编写更多的代码，但是别忘了：比起写，代码更多地是给人看的。我们一起构建的这个模块化示例应用的代码就很易于阅读。当你开始构建更大的组件库时，你会意识到这种代码模块化和清晰度的重要性。并且随着代码重用程度的加深，你的代码行数也会显著地减少。
:::

### 1. 将设计好的 UI 划分为组件层级
首先，你需要在设计稿上用方框圈出每一个组件（包括它们的子组件），并且以合适的名称命名。如果你是和设计师一起完成此任务，那么他们可能已经做过类似的工作，所以请和他们进行交流！他们的`Photoshop`的图层名称可能最终就是你编写的`React`组件的名称！

但你如何确定应该将哪些部分划分到一个组件中呢？你可以将组件当作一种函数或者是对象来考虑，<font color=#9400D3>根据<font color=#DD1144>单一功能原则</font>来判定组件的范围</font>。也就是说，一个组件原则上只能负责一个功能。如果它需要负责更多的功能，这时候就应该考虑将它拆分成更小的组件。

在实践中，因为你经常是在向用户展示`JSON`数据模型，所以如果你的模型设计得恰当，<font color=#1E90FF>UI（或者说组件结构）便会与数据模型一一对应，这是因为 UI 和数据模型都会倾向于遵守相同的信息结构。将 UI 分离为组件，其中每个组件需与数据模型的某部分匹配。</font>

### 2. 用React创建一个静态版本
现在我们已经确定了组件层级，可以编写对应的应用了。<font color=#DD1144>最容易的方式，是先用已有的数据模型渲染一个不包含交互功能的UI。最好将渲染 UI 和添加交互这两个过程分开</font>。这是因为，编写一个应用的静态版本时，往往要编写大量代码，而不需要考虑太多交互细节；添加交互功能时则要考虑大量细节，而不需要编写太多代码。所以，将这两个过程分开进行更为合适。我们会在接下来的代码中体会到其中的区别。

在构建应用的静态版本时，我们需要创建一些会重用其他组件的组件，然后通过`props`传入所需的数据。`props`是父组件向子组件传递数据的方式。即使你已经熟悉了`state`的概念，也完全不应该使用`state`构建静态版本。`state`代表了随时间会产生变化的数据，应当仅在实现交互时使用。所以构建应用的静态版本时，你不会用到它。

你可以自上而下或者自下而上构建应用：自上而下意味着首先编写层级较高的组件，自下而上意味着从最基本的组件开始编写。当你的应用比较简单时，使用自上而下的方式更方便；对于较为大型的项目来说，自下而上地构建，并同时为低层组件编写测试是更加简单的方式。

到此为止，你应该已经有了一个可重用的组件库来渲染你的数据模型。由于我们构建的是静态版本，所以这些组件目前只需提供`render()`方法用于渲染。数据模型变化、调用`render()`方法、`UI`相应变化，这个过程并不复杂，因此很容易看清楚`UI`是如何被更新的，以及是在哪里被更新的。<font color=#DD1144>React 单向数据流（也叫单向绑定）的思想使得组件模块化，易于快速开发</font>。

### 3. 确定UI state 的最小(且完整)表示
想要使你的`UI`具备交互功能，需要有触发基础数据模型改变的能力。`React`通过实现`state` 来完成这个任务。

为了正确地构建应用，<font color=#DD1144>你首先需要找出应用所需的state的最小表示，并根据需要计算出其他所有数据。其中的关键正是DRY: Don’t Repeat Yourself。只保留应用所需的可变state的最小集合，其他数据均由它们计算产生</font>。比如，你要编写一个任务清单应用，你只需要保存一个包含所有事项的数组，而无需额外保存一个单独的`state`变量（用于存储任务个数）。当你需要展示任务个数时，只需要利用该数组的`length`属性即可。


通过问自己以下三个问题，你可以逐个检查相应数据是否属于`state`：

+ <font color=#1E90FF>该数据是否是由父组件通过props传递而来的？如果是，那它应该不是 state。</font>
+ <font color=#1E90FF>该数据是否随时间的推移而保持不变？如果是，那它应该也不是state。</font>
+ <font color=#1E90FF>你能否根据其他state或props计算出该数据的值？如果是，那它也不是state。</font>

### 4. 确定state放置的位置
我们已经确定了应用所需的`state`的最小集合。接下来，我们需要确定哪个组件能够改变这些`state`，或者说拥有这些`state`。

注意：React中的数据流是单向的，并顺着组件层级从上往下传递。哪个组件应该拥有某个state这件事，对初学者来说往往是最难理解的部分。尽管这可能在一开始不是那么清晰，但你可以尝试通过以下步骤来判断：

对于应用中的每一个`state`：

+ <font color=#1E90FF>找到根据这个state进行渲染的所有组件。</font>
+ <font color=#1E90FF>找到他们的共同所有者（common owner）组件（在组件层级上高于所有需要该 state 的组件）。</font>
+ <font color=#1E90FF>该共同所有者组件或者比它层级更高的组件应该拥有该state。</font>
+ <font color=#1E90FF>如果你找不到一个合适的位置来存放该state，就可以直接创建一个新的组件来存放该state，并将这一新组件置于高于共同所有者组件层级的位置。</font>

### 5. 添加反向数据流
这里其实更好的说法是：<font color=#9400D3>添加交互行为</font>，因为之前我们书写了静态的`UI`部分，现在我们需要通过添加交互行为，也就是动态的部分。这部分实际就是事件处理，这个之前在[事件处理](taopoppy.cn/react-redux/react_base_guanwang3.html#事件处理)我们已经讲的很明白了。

## 状态提升
<font color=#9400D3>通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。这也是我们经常用来确定state放置的位置的一个最佳实践</font>

同时，这种做法也是符合应用所需的`state`最小表示的标准的。

在`React`应用中，任何可变数据应当只有一个相对应的唯一“数据源”。通常，`state`都是首先添加到需要渲染数据的组件中去。然后，如果其他组件也需要这个`state`，那么你可以将它提升至这些组件的最近共同父组件中。你应当依靠<font color=#9400D3>自上而下的数据流</font>，而不是尝试在不同组件间同步`state`。<font color=#1E90FF>因为state除了设置并拥有它的组件，其他组件都无法访问</font>，正是因为`state`的这种特性，所以在多个组件之间共享状态是困难且繁琐的。

总结：<font color=#DD1144>state的局部性和封装性致使我们需要状态提升来解决多个组件共享状态</font>

::: tip
这里的<font color=#9400D3>共享状态</font>和<font color=#9400D3>共享状态逻辑</font>是两个不同的概念，后者和`render props`、`HOC`和自定义的`hook`有紧密的联系。
:::