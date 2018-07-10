# 内置指令
`v-cloak` 在编译完Vue实例的时候会从DOM上移除，经常与`display:none`配合使用
```
<style>
    [v-cloak]{
        display:none;
    }
</style>
<div id="app" v-cloak>
    {{message}}
</div>
<script>
    var app=new Vue({
            el:'#app',
            data:{
                message:"这是一段文本"
            }
        })
</script>
```
`v-once` 只渲染一次元素或者组件和所有子节点，不需要表达式。
```
<div id="app">
    <span v-once>{{message}}</span>
        <div v-once>
            <span>{{message}}</span>
        </div>
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            message:"这是一段文本"
        }
        })
</script>
```
## 条件渲染
### v-if v-else-if v-else
```
<div id="app">
    <p v-if="status ===1 ">当status为1时显示该行</p>
    <p v--else-if="status === 2">当status为2时显示该行</p>
    <p v-else>否则显示该行</p>
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            status:1
        }
     })
</script>
```
如果要判断很多元素可以使用`<template>`包裹:(`<template>` 不会被渲染)
```
<div id="app">
    <template v-if="status === 1">
        <p>这是一段文本</p>
        <p>这是一段文本</p>
        <p>这是一段文本</p>
    </template>
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            status:1
        }    
        })
</script>
```
Vue在渲染元素是，为了效率，尽可能的服用已经有的元素，而非重新渲染:
**下面输入框的内容输入之后点击切换没有变化，说明<input>被复用**
```
<!-- 这里的input 元素被复用了 -->
<div id="app">
    <template v-if="type === 'name'">
        <label>用户名</label>
        <input placeholder="请输入用户名">
    </template>
    <template v-else>
        <label>邮箱:</label>
        <input placeholder="请输入邮箱">
    </template>
    <button @click="handleToggleClick">切换输入类型</button>
</div>
<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            type:'name'
        },
        methods:{
            handleToggleClick:function(){
                    this.type = this.type === 'name'? 'mail':'name';
            }
        }
        })
</script>
```
如果不想元素被复用，可以使用`key`属性
```
<!-- 这里的input 元素被复用了 -->
<div id="app">
    <template v-if="type === 'name'">
        <label>用户名</label>
        <input placeholder="请输入用户名" key="name-input">
    </template>
    <template v-else>
        <label>邮箱:</label>
        <input placeholder="请输入邮箱" key="name-mail">
    </template>
    <button @click="handleToggleClick">切换输入类型</button>
</div>
<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            type:'name'
        },
        methods:{
            handleToggleClick:function(){
                    this.type = this.type === 'name'? 'mail':'name';
            }
        }
        })
</script>
```
### v-show
改变的是元素的CSS属性display
```
<div id="app">
    <p v-show="status === 1">当status为1时显示该行</p>
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            status:2
        }
        })
</script>
```
### v-if 与 v-show 的选择
`v-if`根据条件销毁或者重建元素及绑定的事件或者组件，初始化的时候如果值是`false` 则一开始元素不会渲染，只有当条件第一次为`true`的时候才开始编译
`v-show`只是针对CSS样式的修改，无论真否都会编译
## 列表渲染指令v-for
### 基本用法
需要结合`in`使用，类似`item in items`形式:
```
<div id="app">
    <ul>
        <li v-for="book in books">{{book.name}}</li>
    </ul>
</div>
<script>
    var app=new Vue({
            el:'#app',
            data:{
                books:[
                    {name:'《Vue.js实战》'},
                    {name:'《JavaScript权威指南》'},
                    {name:'《JavaScript高级程序设计》'}
                ]
            }
        })
</script>
```
books是数据，book是数组元素的别名(books[x]),如果需要同时渲染多个数据，也可以放置到`<template>`上：
```
<div id="app">
    <ul>
        <template v-for="book in books">
           <li>书名:{{book.name}}</li>
           <li>作者:{{book.author}}</li>
        </template>
    </ul>
</div>
<srcipt>
    var app=new Vue({
            el:'#app',
            data:{
                books:[
                    {name:'《Vue.js实战》',
                     author:'梁某'   
                      },
                    {name:'《JavaScript权威指南》',
                      author:'某某'   
                      },
                    {name:'《《JavaScript高级程序设计》',
                      author:'Nicholas C.Zakas'   
                      },
                ]
            }
        })
</srcipt>
```
除了数组，对象的属性也可以遍历:
```
<div id="app">
    <span v-for="value in users">{{value}}</span>
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            user:{
                name:'Chj',
                gender:'男'，
                age:30
            }
        }
        })
</script>
```
遍历对象的时候有两个可选参数 键名`key` 和 索引`index`：
```
<div id="app">
    <ul>
        <li v-for="(value,key,index) in user">
            {{index}}-{{key}}:{{value}}
        </li>
    </ul>
</div>
<script>
    var app=new Vue({
            el:'#app',
            data:{
                user:{
                name:'Chj',
                gender:'男',
                age:30
              }
            }
        })
</script>
```
`v-for`还可以迭代整数：
```
<div id="app">
    <span v-for="n in 10">{{n}}</span>
</div>
<srcipt>
    var app=new Vue({
            el:'#app',           
        })
</srcipt>
```
### 数组更新
Vue的核心是数据和视图的双向绑定，数据改变时，渲染的视图也会变化。
以下数组方法 **会改变** 原数组:
>push()
 pop()
 shift()
 unshift()
 splice()
 sort()
 reverse()
以下方法 **不会改变** 原数组,而是返回一个新的数组:
>filter()
 concat()
 slice()__   
通过 **赋值** 方式改变数组，Vue将不会响应，不触发视图的更新:
```
   //无效的方法
   app.book[3]={}
   app.books.length=1 
```
可以通过`set`方法改变数组：
```
this.$set(app.books,3,{
        name:'《css秘密花园》',
        author:'佚名'
    })
```
###　过滤和排序
不想改变原数组，可以通过原数组的副本通过计算属性过滤或者排序：
```
<div id="app">
    <ul>
        <template v-for="book in books">
          <li>书名:{{book.name}}</li>
          <li>作者:{{book.author}}</li>
        </template>
    </ul>
</div>
 <script>
    var app = new Vue({
        el: '#app',
        data: {
          books:[
                    {name:'《Vue.js实战》',
                     author:'梁某'
                      },
                    {name:'《JavaScript权威指南》',
                      author:'某某'
                      },
                    {name:'《《JavaScript高级程序设计》',
                      author:'Nicholas C.Zakas'
                      },
                ]
        },
        computed:{
            filterBooks:function(){
                return this.books.filter(function(book){
                    return book.name.match(/JavaScript/);
                    });
            },
             sortedBooks:function(){
                    return this.books.sort(function(a,b){
                            return a.name.length<b.name.length;
                    })
             }   
        }
    })
    </script>
```

## 方法和事件

### 基本用法
通过`v-on`绑定事件监听

```
<div id="app">
    点击次数:{{counter}}
    <button @click="handleAdd()">+1</button>
     <button @click="handleAdd(10)">+10</button>
</div>
<script>
   var app = new Vue({
        el:'#app',
        data:{
            counter:0
        },
        methods:{
            handleAdd:function(count){            
               count=count || 1;          
               this.counter+=count;                 
            }
          }
        })
</script>
```

方法名称后面可以不跟括号`()`，如果方法有参数，默认会将原生事件对象`event`传入。如果不需要传入参数可以不写括号

Vue提供一个特殊变量`$event`,用于访问原生DOM事件:

```
<div id="app">
        <a href="http://www.apple.com" @click="handleClick('禁止打开',$event)">打开链接</a>
</div>
<script>
    var app=new Vue({
        el:'#app',
        methods:{
            handleClick:function(message,event){
                    event.preventDefault();
                    window.alert(message);
            }   
        }
        })
</script>
```


### 修饰符
>.stop     阻止冒泡
 .prevent  阻止默认行为
 .capture  使用事件捕获
 .self     在当前元素本身触发
 .once     只触发一次


```
<!-- 阻止单击事件冒泡 -->
<a @click.stop="handle"></a>

<!-- 提交事件不再重载页面 -->
<form @submit.prevent="handle"></form>

<!-- 修饰符可以串联 -->
<a @click.stop.prevent="handle"></a>

<!-- 只有修饰符 -->
<form @submit.prevent></form>

<!-- 添加事件侦听器时使用事件捕获模式 -->
<div @click.capture="handle"></div>

<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div @click.self="handle"> </div> 
```

监听键盘事件时，可以使用按键修饰符:
```
<!-- 当keyCode是13时，调用vm.submit() -->
<input @keyup.13="submit">
```
也可以自定义配置:
```
Vue.config.keyCodes.f1=112;
```
其他的快捷键别名:
>.enter
 .tab
 .delete (捕获"删除"和"退格"键)
 .esc
 .space
 .up
 .down
 .left
 .right 

这些修饰符键可以组合使用:
>.ctrl
 .alt
 .shift
 .meta(Mac下是Command键，Windows下手窗口键)

例如:
```
<!-- shift + S -->
<input @keyup.shift.83="handleSave">
<!-- Ctrl +click -->
<div @click.ctrl="doSomething">doSomething</div>
```

## 购物车

chapter5.demo4.html
