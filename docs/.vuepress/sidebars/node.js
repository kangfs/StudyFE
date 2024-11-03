// WeiXin
export default [
  '/node/',
  {
    title: '本质与机制',
    children: [
     '/node/one_whatNode',
     '/node/one_eventLoop',
     '/node/one_betterNode'
    ]
  },
  {
    title: '模块和核心',
    children: [
      '/node/two_module_commonjs',
      '/node/two_module_introduce',
      '/node/two_module_globalobj',
      '/node/two_module_buffer',
      '/node/two_module_stream',
      '/node/two_module_events',
      '/node/two_module_http',
      '/node/two_module_net',
      '/node/two_module_process',
      '/node/two_module_fs',
      '/node/two_module_vm',
      '/node/two_module_v8'
    ]
  },
  {
    title: '异步和流程',
    children: [
      '/node/three_asyncControl',
      '/node/three_asyncPreliminary',
      '/node/three_asyncDepth_promise1',
      '/node/three_asyncDepth_promise2',
      '/node/three_asyncDepth_await1',
      '/node/three_asyncDepth_await2',
      '/node/three_asyncDepth_await3'
    ]
  },
  {
    title:'测试和工具',
    children: [
      '/node/four_test_one',
      '/node/four_array_module'
    ]
  },
  {
    title: '消息和队列',
    children: [
      // https://juejin.im/post/5dd8cd7ae51d4523501f7331
    ]
  }
]