# 需求分析

接下来的章节，我们会使用 TypeScript 来重构 axios，重构之前，我们需要简单地做一些需求分析，看一下我们这次重构需要支持哪些 feature。

## Features

- 在浏览器端使用 XMLHttpRequest 对象通讯
- 支持 Promise API
- 支持请求和响应的拦截器
- 支持请求数据和响应数据的转换
- 支持请求的取消
- JSON 数据的自动转换
- 客户端防止 XSRF

此外，我们还会支持一些 axios 库支持的一些其它的 feature。这里要注意的，我们这次重构不包括 axios 在 Node 中的实现，因为这部分我们在平时项目中应用的很少，还涉及到很多 Node.js 的知识，将来可能会在我node学习更好的情况下去补充

