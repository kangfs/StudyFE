# Go内建容器

## Array
### 1. Array的定义

数组的定义有下面这么几种方式:
```go
	var array1 [3]int                      // [0 0 0]
	array2 := [3]int{1, 2, 3}              // [1 2 3]
	array3 := [...]int{1, 2, 3, 4, 5}      // [1 2 3 4 5]
	var grid [4][5]int                     // [[0 0 0 0 0] [0 0 0 0 0] [0 0 0 0 0] [0 0 0 0 0]]
```
定义数组也比较简单，只是我们要记住这样几个注意点：
+ <font color=#1E90FF>定义数组要明确长度，并且长度数量要写在类型之前</font>
+ <font color=#1E90FF>使用:=的简写方式就必须要给数组设置初始值</font>
+ <font color=#1E90FF>可以使用[...]动态的方式让go语言自动识别数组定义时的长度</font>

### 2. Array的遍历
数组的遍历除了通常的`for`方法，还有其他很多的方法，如下所示
```go
// 方式一
for i := 0; i < len(array3); i++ {
	fmt.Println(array3[i])
}

// 方式二
for index, value:= range array3 {
	fmt.Println(index, value)
}
```
可以很清楚的看到，<font color=#1E90FF>使用了range关键字能同时获得数组的元素下标和元素数值，而且如果你不需要index或者value其中一个，还可以使用我们之前的方法，使用下划线_来省略变量</font>。

### 3. Array是值类型
由于数组是值类型，而且`go`语言是只有值传递，所以无论怎么样：
+ <font color=#DD1144>数组在作为参数进行调用的时候都要进行拷贝的步骤</font>
+ <font color=#DD1144>[10]int 和 [20]int是不同的类型</font>
+ <font color=#DD1144>数组也可以和指针进行结合使用，实现对原本数组的修改</font>
```go
// 可以接收一个指向数组的指针作为参数
func printArray(arr *[5]int) {
	for index, value := range arr {
		fmt.Println(index, value)
	}
}

func main() {
	array3 := [...]int{1, 2, 3, 4, 5}
	printArray(&array3)
}
```
通过上面你会发现一个很大的问题，数组其实这样规定长度的设计是很麻烦，也不好用，<font color=#1E90FF>实际上，在go的真正使用中都不会直接使用数组，使用的都是<font color=#DD1144>切片</font>，像指针和数组结合的使用方式基本不会用到，因为太麻烦了</font>，所以我们接下来的切片才是我们学习的重点。

## Slice
### 1. Slice的概念
<font color=#1E90FF>**① Slice的概念**</font>

切片的英文是<font color=#DD1144>Slice</font>,它最简单的使用如下,可以看到：<font color=#1E90FF>切片的作用和它的名字是一样的，从数组的下标开始切割</font>，如下所以`arr[2:6]`就是从`arr`数组的下标为2开始切割到下标为6。
```go
arr :=[...]int{1,2,3,4,5,6,7}
s := arr[2:6] // 3 4 5 6
```
切片的写法灵活性很高，比如下面这些写法：
```go
func main() {
	arr := [...]int{0, 1, 2, 3, 4, 5, 6, 7}
	fmt.Println("arr[2:6] =", arr[2:6]) // [2 3 4 5]
	fmt.Println("arr[:6] =", arr[:6])   // [0 1 2 3 4 5]
	fmt.Println("arr[2:] =", arr[2:])   // [2 3 4 5 6 7]
	fmt.Println("arr[:] =", arr[:])     // [0 1 2 3 4 5 6 7]
}
```
+ <font color=#1E90FF>所以上述这种数组后面加上方括号，里面是一个区间的这种写法都是切片</font>
+ <font color=#DD1144>go语言的切片是半开半闭的，arr[2:6]表示的下标2的这个元素在切割结果中，但是下标6的元素是切割的末尾，但它不包含在内</font>
+ <font color=#DD1144>go语言中所有类型都是值类型，但是对于slice肚子里面是有个数据结构的，官网文档中介绍slice本身是没有数据的，是对底层array的一个view（视图）</font>

<font color=#1E90FF>**② Reslice的概念**</font>

`Reslice`是在现有的`Slice`进一步切片，简单的说对数组或者对切片都可以进行切割，获得的都是`view`,比如说下面的这些都是`Reslice`:
```go
arr:= [...]int{1,2,3,4,5,6,7}
s:= arr[:] // 1 2 3 4 5 6 7
s = s[:3]  // 1 2 3
s = s[1:]  // 2 3
s = arr[:] // 1 2 3 4 5 6 7
```

<font color=#1E90FF>**③ Reslice的范围超出**</font>

我们首先来看一下下面这个例子，我们定义了`s1`,里面只有4个值，但是`s2`是对`s1`的切片，包含了`s1[3]`和`s1[4]`，可是`s1[4]`并不存在于`s1`当中，但是`s2`也会拿的到，这里我们就是详细的来探讨一下这个问题了：
```go
	arr := [...]int{0, 1, 2, 3, 4, 5, 6, 7}
	s1 := arr[2:6]      // 2 3 4 5
	s2 := s1[3:5]       // s1[3],s1[4]
	fmt.Println(s1, s2) // [2 3 4 5] [5 6]
	fmt.Println(s1[4])  // 报错
```
我们下面就来用图示解释一下这个问题：
<img :src="$withBase('/go_one_slice.png')" alt="">

+ <font color=#1E90FF>从图中就能看得出，切片是对数组的一个view，s1虽然表面是只有4个元素，但是实际上有6个元素，所以通过切片的方式你可以拿到，但是直接通过s1[4]就拿不到</font>

<font color=#1E90FF>**④ Slice的实现**</font>

<img :src="$withBase('/go_one_slice_struct.png')" alt="底层结构">

对于`Reslice`问题的理解，我们还是应该从最底层的`Slice`的实现去彻底搞懂，或者说搞清楚`Slice`的底层结构：
+ <font color=#1E90FF>Slice底层是array，同时它包含ptr这样的一个属性，指向的是Slice开头的元素</font>
+ <font color=#1E90FF>Slice同时还有个len属性，表示Slice的长度，当使用方括号取值的时候，大于等于这个len都会报错</font>
+ <font color=#DD1144>最关键的一个值叫做cap，它是代表了从ptr到底层array末尾的这样一个长度，只要在整个范围内，Reslice扩展的时候就能扩展的到</font>
+ <font color=#DD1144>所以Slice内部有了这cap这样的属性，Reslice的操作就可以在cap长度的范围内向后扩展，但是不可以向前扩展</font>

当然了如果在更多时候你需要知道`Slice`的`len`和`cap`才知道怎么去扩展，你就可以通过`len`和`cap`方法去直接获取，如下所示：
```go
arr := [...]int{0, 1, 2, 3, 4, 5, 6, 7}
s1 := arr[2:6]
s2 := s1[3:5]
fmt.Println(s1, len(s1), cap(s1)) // [2 3 4 5] 4 6
fmt.Println(s2, len(s2), cap(s2)) // [5 6] 2 3
```

### 2. Slice的操作
<font color=#1E90FF>**① 创建Slice**</font>

```go
// 无初始值的创建方法
func printSlice(s []int) {
	fmt.Printf("len = %d,cap=%d\n", len(s), cap(s))
	// len = 0, cap=0
	// len = 1, cap=1
	// len = 2, cap=2
	// len = 3,4, cap=4 
	// len = 5...8,cap=8
	// len = 9..16,cap=16
	// len = 17...32,cap=32 
	// len = 33...64,cap=64
 	// len = 65...128,cap=128
}
func main() {
	var s []int // Zero value for slice is nil

	for i := 0; i < 100; i++ {
		printSlice(s)
		s = append(s, 2*i+1)
	}
	fmt.Println(s)
}

// 有初始值的创建方法
s1 := []int{2, 4, 6, 8}   // [2 4 6 8] len=4 cap=4
s2 := make([]int, 16)     // [0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0] 16 16
s3 := make([]int, 10, 32) // [0 0 0 0 0 0 0 0 0 0 0] len=10 cap=32
```
+ <font color=#1E90FF>Slice的创建实际并不需要以array为基础，而且初始值为nil</font>
+ <font color=#DD1144>没有array为基础的Slice的cap和len都是0，每当cap不够的时候，len都会扩充为当前的两倍，或者可以理解为cap以 0 1 2 4 8 16 32 64 128 这样的2次方递增</font>
+ <font color=#1E90FF>有初始值的Slice可以直接用和创建数组的类似方式创建，但是Slice和Array都用字面的方式创建的区别就在于方括号中有无数值</font>
+ <font color=#1E90FF>内建函数make可以创建一个len和cap都确定，但是里面元素暂无的Slice</font>

<font color=#1E90FF>**② 添加元素**</font>

```go
arr := [...]int{0, 1, 2, 3, 4, 5, 6, 7}
s1 := arr[2:6] // 2 3 4 5
s2 := s1[3:5]  // 5 6
fmt.Println(s1, len(s1), cap(s1)) // [2 3 4 5] 4 6
fmt.Println(s2, len(s2), cap(s2)) // [5 6] 2 3
s3 := append(s2, 10)
s4 := append(s3, 11)
s5 := append(s4, 12)
fmt.Println(s3)  // [5 6 10]
fmt.Println(s3, len(s3), cap(s3)) // [5 6 10] 3 3
fmt.Println(s4)  // [5 6 10 11]
fmt.Println(s5)  // [5 6 10 11 12]
fmt.Println(arr) // [0 1 2 3 4 5 6 10]
```
+ <font color=#3eaf7c>s3</font>:对于`s3`来说，它是在`s2`的基础上进行添加的，`s2`的`len`是2，`cap`是3，所以`s3`在向`s2`添加一个，此时`len`为3，`cap`为3，<font color=#DD1144>len没有超过cap，所以当前s3依旧是arr的一个view</font>
+ <font color=#3eaf7c>s4和s5</font>：对于`s4`来说，它是在`s3`的基础上添加元素的，此时`s3`的`len`和`cap`都是3，再添加一个`len`就变成了4，就超过了`cap`, <font color=#DD1144>此时len超过了cap，系统就分配了另外一个更长的数组，此时s4
也就不再是arr的view，而是系统分配的这个更长得数组的view</font>，`s5`也是同理。

<font color=#1E90FF>总结</font>：
+ <font color=#DD1144>添加元素时如果超越cap，系统会重新分配更大的底层数组，同时拷贝之前的元素</font>
+ <font color=#DD1144>系统重新分配了更大的底层数组，原来的那个数组如果没有人用了就会被垃圾回收</font>
+ <font color=#DD1144>由于值传递的关系，必须接收append的返回值：s=append(s,val)</font>

<font color=#1E90FF>**③ 拷贝和删除**</font>

```go
// 拷贝
s1 := []int{2, 4, 6, 8, 10, 12, 14}
s2 := make([]int, 5)
copy(s2, s1)
fmt.Println(s2, len(s2), cap(s2)) // [2 4 6 8 10] 5 5
```
+ <font color=#1E90FF>内建函数copy可以帮助我们将s1拷贝到s2里面</font>
+ <font color=#DD1144>Slice的拷贝很傻瓜式，也就是能拷贝几个就拷贝多少</font>

```go
// 删除
s2 = append(s2[:3], s2[4:]...)    // 删除第三个元素 [2 4 6 10] 4 5
s2 = s2[1:]                       // 删除头部       [4 6 10] 3 4
s2 = s2[:len(s2)-1]               // 删除尾部       [4 6] 2 4
```
+ <font color=#DD1144>Slice的删除比较特殊，因为本身就不是数组，所以也没有像js当中的什么array.pop或者array.shift这种内置方式，go需要通过直接切割的方式和append的奇怪的方式来实现Slice的删除</font>

## Map
### 1. Map的概念
`Map`是键值对的一种数据结构的集合，在`go`语言中我们来说明一下对于`key`和`value`都有哪些注意点：
+ <font color=#3eaf7c>map使用哈希表，key必须可以比较相等</font>
+ <font color=#1E90FF>除了slice，map，function的内建类型都可以作为key，因为这三个没法判断相等</font>
+ <font color=#DD1144>Struct类型不包含slice，map，funciton也可以作为key</font>  

<font color=#1E90FF>**① 定义Map**</font>

我们来看一下在`go`语言中最简单的`Map`,<font color=#DD1144>基本上方括号中就是key键的类型，方括号外面是value值</font>
```go
// 定义包含初始值的map
m :=map[string] string {
	"name": "taopoppy",
	"age":"23",
	"school": "first high school"
}

// 定义空值map
m2 := make(map[string] int)   // map[]
var m3 map[string] int        // nil
```
+ <font color=#1E90FF>常见的map的定义方式有map[key]value 或者map[key1]map[key2]value</font>,后者属于一种复合的`map`,也就是`map`中每个`key`对应的又是一个`map`
+ <font color=#DD1144>定义空值Map的两种方法如上所示，只不过通过make方法定义出来的是空值map[]，通过var关键字定义出来的是nil</font>
+ <font color=#1E90FF>go语言中的nil和别的语言不一样，可以参与运算，所以nil在map[]基本在运算的时候可以混用</font>

<font color=#1E90FF>**② Map的遍历**</font>

```go
for key, value := range m {
	fmt.Printf("key: %s; value: %s\n", key, value)
}
```
关于`Map`的遍历没有什么好说的，`range`关键字我们之前也都用的不爱用了，但是这里要注意一个特别的点：<font color=#DD1144>map这里是哈希map，每次遍历出来的顺序都是无序的</font>

<font color=#1E90FF>**③ 获取Map值**</font>

```go
m :=map[string] string {
	"name": "taopoppy",
	"age":"23",
	"school": "first high school"
}
name, ok := m["name"] // "taopoppy", true
sex, ok :=m["sex"] // 空的字符串 ,false
```
可以很清楚的看到：
+ <font color=#DD1144>对于map中没有的key值也能取出值来，并不会直接报错，只不过取出来的值是默认value类型的空值，对于string就是空的字符串，对于int就是0</font>
+ <font color=#1E90FF>那既然任何key都能取到值，怎么判断key到底在没在map中呢，可以去获取第二个返回值来判断</font>，如下代码：
```go
if name, ok := m["name"]; ok {
	fmt.Println(name)
} else {
	fmt.Println("key值不存在")
}
```

<font color=#1E90FF>**④ 删除Map值**</font>

```go
m :=map[string] string {
	"name": "taopoppy",
	"age":"23",
	"school": "first high school"
}
fmt.Println(len(m)) // 3
delete(m, "name")   // 删除map中的name这个key
fmt.Println(len(m)) // 2
```
通过`delete`函数来对某个`map`进行某个键的删除。然后呢通过`len`函数来获取`map`中键值对的数量。

### 2. 最长无重复的字串
```go
func lengthOfNonRepeatingSubStr(s string) int {
	lastOccurred := make(map[rune] int)
	start := 0
	maxLength := 0
	for i, ch := range []rune(s) {
		if lastI, ok := lastOccurred[ch]; ok && lastI >= start {
			start = lastI + 1
		}
		if i-start+1 > maxLength {
			maxLength = i - start + 1
		}
		lastOccurred[ch] = i
	}
	return maxLength
}
func main() {
	fmt.Println(lengthOfNonRepeatingSubStr("sersdscdrs")) // 4
}
```

### 3. 字符和字符串处理
通过上面这个最长无重复的字串，我们发现还是不能很好的适应中文，那么对于`go`语言来讲，适应国际化最重要的一个点就是<font color=#DD1144>rune</font>,<font color=#1E90FF>rune实际上就是一个4字节的整数</font>，我们来看一个例子：
```go
func main() {
	s := "Yes我爱慕课网!"    // UTF-8
	fmt.Println(len(s))      // 19字节（4个英文字母（4*1） + 5个中文字母（5*3））

	for _, b := range []byte(s) { // 转换为byte
		fmt.Printf("%X ", b)
		// 59 65 73 E6 88 91 E7 88 B1 E6 85 95 E8 AF BE E7 BD 91 21
	}

	fmt.Println()
	for i, ch := range s { // ch is a rune[int32]
		fmt.Printf("(%d %X) ", i, ch)
		// (0 59) (1 65) (2 73) (3 6211) (6 7231) (9 6155) (12 8BFE) (15 7F51) (18 21)
	}

	fmt.Println()
	for i, ch := range []rune(s) {
		fmt.Printf("(%d %c) ", i, ch)
		// (0 Y) (1 e) (2 s) (3 我) (4 爱) (5 慕) (6 课) (7 网) (8 !)
	}
}
```
我们很清楚的看到，对字符串`s`进行`range`后，返回值`i`实际上是每个字符在编码的起始位置，<font color=#1E90FF>而ch就是个rune类型，每个字符都是先经过utf8编码保存在内存中，range字符串拿到的utf-8的编码先经过utg-8解码，再转化成为unicode，最后放在rune这个4字节的类型当中</font>

实际上关于`utf-8`我们还有一些库可以使用：
```go
	s := "Yes我爱慕课网!"    // UTF-8
	fmt.Println("Rune count: ", utf8.RuneCountInString(s)) // 9

	bytes := []byte(s)  // 转化为byte结构的（十进制的）
	fmt.Println(bytes)  // [89 101 115 230 136 145 231 136 177 230 133 149 232 175 190 231 189 145 33]
	for len(bytes) > 0 {
		ch, size := utf8.DecodeRune(bytes)
		bytes = bytes[size:]
		fmt.Printf("%c ", ch) // Y e s 我 爱 慕 课 网 !
	}
```
+ <font color=#3eaf7c>utf8.RuneCountInString</font>:帮助我们看字符串中有几个字符（英文字母和中文汉字都算一个字符）
+ <font color=#3eaf7c>utf8.DecodeRune</font>：解码成为`rune`结构

<font color=#DD1144>总结</font>：
<img :src="$withBase('/go_one_utf8_unicode.png')" alt="">

+ <font color=#1E90FF>使用range比遍历pos，rune对</font>
+ <font color=#1E90FF>使用utf8.RuneCountInString获得字符数量</font>
+ <font color=#1E90FF>使用len获得字节长度</font>
+ <font color=#1E90FF>使用[]byte获得字节</font>