# 搜索页面开发

## 页面分析和组件划分(重要)
<img :src="$withBase('/react_redux_jiagou_searchui.png')" alt="搜索页面UI">

可以看到，我们的搜索页面大概分为三个组件，分别是`SearchBox`、`PopularSearch`和`SearchHistory`

分析一下状态：
+ <font color=#1E90FF>SearchBox</font>：搜索框中的输入内容肯定是`State`，其他输入完毕后根据输入内容得到的相关内容列表数据也是`State`
+ <font color=#1E90FF>PopularSearch</font>: 热门搜索中的数据肯定是`State`
+ <font color=#1E90FF>SearchHistory</font>：搜索记录当中的数据肯定也是`State`

接着我们来创建整个关于搜索页面的文件：`src/containers/Search/index.js`和`src/containers/Search/components/`，前者内容如下：
```javascript
import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Search;
```

最后我们将新创建的`Search`组件添加到路由当中：
```javascript
import Search from "../Search"; // 1. 引入

class App extends Component {
  render() {
    const {
      error,
      appActions: { clearError }
    } = this.props;
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/detail/:id" component={ProductDetail} />
            <Route path="/search" component={Search} /> {/* 2. 使用*/}
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}
```

## 组件UI开发
### 1. 搜索框组件(SearchBox)
创建团购基本信息组件：`src\containers\Search\components\SearchBox\index.js`，然后按照惯例，我们需要先书写静态的页面：
```javascript
// src\containers\Search\components\SearchBox\index.js
import React, { Component } from 'react';
import './style.css'

const data = [
  { id: 1, keyword: "火锅", quantity: 8710 },
  { id: 2, keyword: "火锅自助", quantity: 541 },
  { id: 3, keyword: "火锅 三里屯", quantity: 65 },
  { id: 4, keyword: "火锅 望京", quantity: 133 },
  { id: 5, keyword: "火锅家常菜", quantity: 179 }
];

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    }
  }

  render() {
    return (
      <div className="searchBox">
        <div className="searchBox__container">
          <input className="searchBox__text" value={this.state.inputText} onChange={this.handleChange}/>
          <span className="searchBox__clear" onClick={this.handleClear}></span>
          <span className="searchBox__cancel" onClick={this.handleCancel}>取消</span>
        </div>
        {this.state.inputText.length > 0 ? this.renderSuggestList() : null}
      </div>
    );
  }

  renderSuggestList() {
    return (
      <ul className="searchBox__list">
        {
          data.map(item => {
            return (
              <li className="searchBox__item">
                <span className="searchBox__itemKeyworkd">{item.keyword}</span>
                <span className="searchBox__itemQuantity">约{item.quantity}个结果</span>
              </li>
            )
          })
        }
      </ul>
    )
  }

  handleChange = (e) => {
    this.setState({
      inputText: e.target.value
    })
  }

  handleClear = () => {
    this.setState({
      inputText: ''
    })
  }

  handleCancel = () => {

  }
}

export default SearchBox;
```
然后相关的`css`内容请在[github](https://github.com/taopoppy/fontdemo/tree/master/dianping-react/src/containers/Search/components/SearchBox/style.css)上自行查看。

最后将搜索框组件`SearchBox`添加到搜索页面当中：
```javascript
// src/containers/Search/index.js
import React, { Component } from 'react';
import SearchBox from './components/SearchBox' // 1. 引入

class Search extends Component {
  render() {
    return (
      <div>
        <SearchBox/> {/* 2. 使用*/}
      </div>
    );
  }
}

export default Search;
```

### 2. 热门搜索词组件(PopularSearch)
创建热门搜索词组件：`src\containers\Search\components\PopularSearch\index.js`，然后按照惯例，我们需要先书写静态的页面：
```javascript
// src\containers\Search\components\PopularSearch\index.js
import React, { Component } from 'react';
import "./style.css"

const data = ['三里屯','朝阳大悦城','西单','海底捞','星巴克','局气','火锅','温泉','烤鸭']

class PopularSearch extends Component {
  render() {
    return (
      <div className="popularSearch">
        {
          data.map((item,index) => {
            return (
              <span key={index} className="popularSearch__item">{item}</span>
            )
          })
        }
      </div>
    );
  }
}

export default PopularSearch;
```
然后相关的`css`内容请在[github](https://github.com/taopoppy/fontdemo/tree/master/dianping-react/src/containers/Search/components/PopularSearch/style.css)上自行查看。

最后将热门搜索词组件`PopularSearch`添加到搜索页面当中：
```javascript
// src/containers/Search/index.js
import PopularSearch from './components/PopularSearch' // 1. 引入

class Search extends Component {
  render() {
    return (
      <div>
        <SearchBox/>
        <PopularSearch/> {/* 2. 使用*/}
      </div>
    );
  }
}

export default Search;
```

### 3. 搜索历史组件(SearchHistory)
创建搜索历史组件：`src\containers\Search\components\SearchHistory\index.js`，然后按照惯例，我们需要先书写静态的页面：
```javascript
// src\containers\Search\components\SearchHistory\index.js
import React, { Component } from 'react';
import "./style.css"

class SearchHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: ["烤鸭", "火锅", "面条"]
    }
  }

  render() {
    return (
      <div className="searchHistory">
        <div className="searchHistory__header">搜索记录</div>
        <ul className="searchHistory__list">
          {
            this.state.data.map((item, index) =>{
              return <li key={index} onClick={this.handleClick}className="searchHistory__item">
                {item}
              </li>
            })
          }
        </ul>
        <div className="searchHistory__clear" onClick={this.handleClear}>清除搜索记录</div>
      </div>
    );
  }

  handleClick = () => {

  }

  handleClear = () => {
    this.setState({
      data: []
    })
  }

}

export default SearchHistory;
```
然后相关的`css`内容请在[github](https://github.com/taopoppy/fontdemo/tree/master/dianping-react/src/containers/Search/components/SearchHistory/style.css)上自行查看。

最后将搜索历史组件`SearchHistory`添加到搜索页面当中：
```javascript
// src/containers/Search/index.js
import SearchHistory from './components/SearchHistory' // 1. 引入

class Search extends Component {
  render() {
    return (
      <div>
        <SearchBox/>
        <PopularSearch/>
        <SearchHistory/> {/* 2.使用*/}
      </div>
    );
  }
}

export default Search;
```

## 设计State
<img :src="$withBase('/react_redux_jiagou_searchui.png')" alt="搜索页面UI">

首先我们来仔细分析一下这个搜索框的关键词，实际上这里的关键词有两种不同的含义:
+ <font color=#1E90FF>第一种含义</font>：指的是用户的输入，这种输入毫无顺序和规则
+ <font color=#DD1144>第二种含义</font>：指的是后端存储的关键字，因为一个关键字会在后端对应很多的搜索结果，比如火锅这个关键字就对应很多的结果，如海底捞，火锅餐厅，火锅常见菜等等，所以这种就属于<font color=#9400D3>关键词实体领域了</font>

所以我们先来创建`src/redux/modules/entities/keywords.js`,内容如下：
```javascript
// src/redux/modules/entities/keywords.js
import createReducer from "../../../utils/createReducer";

export const schema = {
  name: "keywords",
  id: "id"
};

const reducer = createReducer(schema.name);

export default reducer;

// selectors
export const getKeywordById = (state, id) => {
  return state.entities.keywords[id]
}
```
我们将和火锅相关的这个关键词的`mock`数据都放在`public/mock/keywords/related.json`当中，内容可以在[github](https://github.com/taopoppy/fontdemo/blob/master/dianping-react/public/mock/keywords/related.json)中查看。

另外在`PopularSearch`组件当中展示的这些数据实际上也属于关键词实体领域的数据，相关的`mock`数据都放在`public/mock/keywords/popular.json`,内容可以在[github](https://github.com/taopoppy/fontdemo/blob/master/dianping-react/public/mock/keywords/popular.json)中查看。

而整个页面的四个状态，我们在上一节就已经说过了，只不过其中输入框下拉的列表数据，和`PopularSearch`组件中的数据是属于关键词实体领域的。根据这四个状态，我们来定义搜索页面的`State`：
```javascript
// src/redux/modules/search.js
const initialState = {
  inputText: '',
  popularKeywords: {
    isFetching: false,
    ids: []
  },
  /**
   * relatedKeywords对象结构：
   * {
   *   '火锅': {
   *       isFetching: false,
   *       ids: []
   *    }
   * }
   */
  relatedKeywords: {

  },
  historyKeywords: []  //保存关键词id
}
```

由于新添加了新的领域实体，我们需要在`src/redux/modules/entities/index.js`中添加`keywords`领域实体的`reducer`，并且在`src/redux/modules/index.js`中添加`search`这个页面模块的`reducer`，代码这里就不展示了，太简单了。

## 定义Actions
根据页面分析，整个页面需要的`action`有这么6大块：根据输入获取相关关键字，获取热门关键字，修改输入状态，清除输入，历史查询记录，清楚历史记录

```javascript
// src/redux/modules/search.js
import url from "../../utils/url"
import { FETCH_DATA } from "../middleware/api"
import { schema as keywordSchema } from "./entities/keywords"

export const types = {
  //根据输入的文本获取相关关键词
  FETCH_RELATED_KEYWORDS_REQUEST: 'SEARCH/FETCH_RELATED_KEYWORDS_REQUEST',
  FETCH_RELATED_KEYWORDS_SUCCESS: 'SEARCH/FETCH_RELATED_KEYWORDS_SUCCESS',
  FETCH_RELATED_KEYWORDS_FAILURE: 'SEARCH/FETCH_RELATED_KEYWORDS_FAILURE',
  //获取热门关键词
  FETCH_POPULAR_KEYWORDS_REQUEST: 'SEARCH/FETCH_POPULAR_KEYWORDS_REQUEST',
  FETCH_POPULAR_KEYWORDS_SUCCESS: 'SEARCH/FETCH_POPULAR_KEYWORDS_SUCCESS',
  FETCH_POPULAR_KEYWORDS_FAILURE: 'SEARCH/FETCH_POPULAR_KEYWORDS_FAILURE',
  // 设置当前输入
  SET_INPUT_TEXT: "SEARCH/SET_INPUT_TEXT",
	// 清除当前输入
  CLEAR_INPUT_TEXT: "SEARCH/CLEAR_INPUT_TEXT",
  // 历史查询记录
  ADD_HISTORY_KEYWORD: "SEARCH/ADD_HISTORY_KEYWORD",
	// 删除历史记录
  CLEAR_HISTORY_KEYWORDS: "SEARCH/CLEAR_HISTORY_KEYWORDS",
}

export const actions = {
  // 根据输入获取相关关键词
  loadRelatedKeywords: (text) => {
    return (dispatch, getState) => {
			// 简单的判断当前是否有缓存
      const { relatedKeywords } = getState.search;
      if(relatedKeywords[text]){
        return null
      }
			// 没有缓存就重新请求
      const endpoint = url.getRelatedKeywords(text)
      return dispatch(fetchRelatedKeywords(text, endpoint))
    }
  },
  //获取热门关键词
  loadPopularKeywords: () => {
    return (dispatch, getState) => {
			// 简单的判断当前是否有缓存
      const { ids } = getState().search.popularKeywords;
      if(ids.length > 0) {
        return null;
      }
			// 没有缓存就重新请求
      const endpoint = url.getPopularKeywords();
      return dispatch(fetchPopularKeywords(endpoint));
    }
  },
  //搜索框输入文本相关action
  setInputText: text => ({
    type: types.SET_INPUT_TEXT,
    text
  }),
  clearInputText: () => ({
    type: types.CLEAR_INPUT_TEXT
  }),
  //历史查询记录相关action
  addHistoryKeyword: keywordId => ({
    type: types.ADD_HISTORY_KEYWORD,
    text: keywordId
  }),
  clearHistoryKeywords: () => ({
    type: types.CLEAR_HISTORY_KEYWORDS
  })
}

const fetchPopularKeywords = endpoint => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_POPULAR_KEYWORDS_REQUEST,
      types.FETCH_POPULAR_KEYWORDS_SUCCESS,
      types.FETCH_POPULAR_KEYWORDS_FAILURE,
    ],
    endpoint,
    schema: keywordSchema
  }
})

const fetchRelatedKeywords = (text, endpoint) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_RELATED_KEYWORDS_REQUEST,
      types.FETCH_RELATED_KEYWORDS_SUCCESS,
      types.FETCH_RELATED_KEYWORDS_FAILURE,
    ],
    endpoint,
    schema: keywordSchema
  },
  text
})
```

## 定义Reducers
```javascript
// src/redux/modules/search.js
// 热门关键字的reducers
const popularKeywords = (state = initialState.popularKeywords, action) => {
  switch (action.type) {
    case types.FETCH_POPULAR_KEYWORDS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_POPULAR_KEYWORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids) // 使用concat是为了保证返回新的数组
      };
    case types.FETCH_POPULAR_KEYWORDS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

// 根据输入查找相关的关键字
const relatedKeywords = (state = initialState.relatedKeywords, action) => {
  switch (action.type) {
    case types.FETCH_RELATED_KEYWORDS_REQUEST:
    case types.FETCH_RELATED_KEYWORDS_SUCCESS:
    case types.FETCH_RELATED_KEYWORDS_FAILURE:
      return {
        ...state,
        [action.text]: relatedKeywordsByText(state[action.text], action)
      };
    default:
      return state;
  }
};

const relatedKeywordsByText = (
  state = { isFetching: false, ids: [] },
  action
) => {
  switch (action.type) {
    case types.FETCH_RELATED_KEYWORDS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_RELATED_KEYWORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids)
      };
    case types.FETCH_RELATED_KEYWORDS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

// 输入框相关的reducer
const inputText = (state = initialState.inputText, action) =>{
  switch(action.type) {
    case types.SET_INPUT_TEXT:
      return action.text
    case types.CLEAR_INPUT_TEXT:
      return ""
    default:
      return state
  }
}

// 历史记录相关的reducer
const historyKeywords = (state = initialState.historyKeywords, action) => {
  switch(action.type) {
    case types.ADD_HISTORY_KEYWORD:
      const data = state.filter(item => {
        if(item !== action.text) {
          return true;
        }
				return false
      })
      return [action.text, ...data];
    case types.CLEAR_HISTORY_KEYWORDS:
      return [];
    default:
      return state;
  }
};

const reducer = combineReducers({
  popularKeywords,
  relatedKeywords,
  inputText,
  historyKeywords
})

export default reducer;
```

## 连接Redux和使用
我们首先来编写`Selector`函数：
```javascript
// src/redux/modules/search.js
// selectors
export const getPopularKeywords = state => {
  return state.search.popularKeywords.ids.map(id => {
    return getKeywordById(state, id)
  })
}

export const getRelatedKeywords = state => {
  const text = state.search.inputText;
  if(!text || text.trim().length === 0) {
    return [];
  }
  const relatedKeywords = state.search.relatedKeywords[text];
  if(!relatedKeywords) {
    return []
  }
  return relatedKeywords.ids.map(id => {
    return getKeywordById(state, id)
  })
}

export const getInputText = state => {
  return state.search.inputText
}

export const getHistoryKeywords = state => {
  return state.search.historyKeywords.map(id => {
    return getKeywordById(state, id)
  })
}
```

最后我们就来在搜索页面当中来连接`redux`：
```javascript
// src/containers/Search/index.js
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SearchBox from "./components/SearchBox";
import PopularSearch from "./components/PopularSearch";
import SearchHistory from "./components/SearchHistory";
import {
  actions as searchActions,
  getRelatedKeywords,
  getPopularKeywords,
  getInputText,
  getHistoryKeywords
} from "../../redux/modules/search"; // 1. 引入

class Search extends Component {
  render() {
    const {
      inputText,
      relatedKeywords,
      popularKeywords,
      historyKeywords
    } = this.props;
    return (
      <div>
        <SearchBox inputText={inputText} relatedKeywords={relatedKeywords}
        onChange={this.handleChangeInput}
        onClear={this.handleClearInput}
        onCancel={this.handleCancel}
        onClickItem={this.handleClickItem}
        />
        <PopularSearch 
          data = {popularKeywords}
          onClickItem={this.handleClickItem}
        />
        <SearchHistory 
          data = {historyKeywords}
          onClickItem = {this.handleClickItem}
          onClear = {this.handleClearHistory}
        />
      </div>
    );
  }

  componentDidMount() {
    const { loadPopularKeywords } = this.props.searchActions
    loadPopularKeywords()
  }
  
  // 搜索框文本发生变化
  handleChangeInput = text => {
    const { setInputText, loadRelatedKeywords } = this.props.searchActions
    setInputText(text)
    loadRelatedKeywords(text)
  }

  // 清除搜索框文本
  handleClearInput = () => {
    const { clearInputText } = this.props.searchActions
    clearInputText()
  }

  // 取消搜索
  handleCancel = () => {
    this.handleClearInput();
    this.props.history.goBack();
  }

  // 处理点击关键词的逻辑
  handleClickItem = item => {
    const { setInputText, addHistoryKeyword } = this.props.searchActions
    setInputText(item.keyword)
    addHistoryKeyword(item.id)
    // 跳转搜索结果页逻辑 todo
  }

  // 清除历史记录
  handleClearHistory = () => {
    const { clearHistoryKeywords } = this.props.searchActions;
    clearHistoryKeywords();
  }

  componentWillUnmount() {
    const { clearInputText } = this.props.searchActions;
    clearInputText();
  }
}

const mapStateToProps = (state, props) => {
  return {
    relatedKeywords: getRelatedKeywords(state),
    inputText: getInputText(state),
    popularKeywords: getPopularKeywords(state),
    historyKeywords: getHistoryKeywords(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchActions: bindActionCreators(searchActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
```
最后我们到各个子组件当中，将之前的`mock`数据全部换成父组件传递过来的`props`即可，代码可以在[github](https://github.com/taopoppy/fontdemo/tree/master/dianping-react/src/containers/Search/components)上自行查到。

## Redux DevTools
我们下面要将首页的请求的真实数据和最终数据保存在`redux`的形式展示给大家，首先是我们在首页请求的`Mock`的格式：
+ [popular.json](https://github.com/taopoppy/fontdemo/blob/master/dianping-react/public/mock/keywords/popular.json)
+ [related.json](https://github.com/taopoppy/fontdemo/blob/master/dianping-react/public/mock/keywords/related.json)

最后我们用合成的一张图来展示每次请求派发的`action`和对应`redux`中数据相应的变化：

<img :src="$withBase('/react_redux_search_reduxdev.png')" alt="">