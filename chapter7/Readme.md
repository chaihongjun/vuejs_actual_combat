# 组件
## 组件与复用

###为什么使用组件
提高代码的重用性（控件，JavaScript能力的复用）

一个聊天界面的组件:

```
<Card style="width:350px;">
        <p slot="title">与XXX聊天中</p>
        <a href="#" slot="extra">
            <Icon type="android-close" size="18"></Icon>
        </a>
    <div style="height:100px;"></div>  
    
    <div>
        <Row :gutter="16">
            <i-col span="17">
                <i-input v-model="value" placeholder="请输入..."></i-input>
            </i-col>
            <i-col span="4">
                <i-button type="primary" icon="paper-airplane">发送</i-button>     
            </i-col>
        </Row>
</div>  
</Card>

```

### 组件用法

组件和Vue实例一样需要注册后使用，可以是全局注册也可以说局部注册，全局注册之后，任何Vue实例都可以使用它：

全局注册
```
Vue.component('my-component',{
    //组件选项
})
```
`my-component` 就是注册的自定义标签名称，要在Vue实例创建之前注册。组件的内容通过`<template>`选项渲染出来：
```
<div id="app">
    <my-component></my-component>
</div>
<script> 
Vue.component('my-component',{
    template:`<div>这个是组件的内容</div>`
})
var app=new Vue({
    el:'#app'
})
</script>
```    
局部注册：
通过vue实例的`components`选项可以进行局部组件注册，只在对应实例的作用域内有效。在`components`选项里面还可以再进行组件注册，完成组件嵌套：

```
<div id="app">
    <my-component></my-component>
</div>
<script> 
var Child ={
    template:`<div>这个是局部注册的组件内容</div>`
}
var app=new Vue({
    el:'#app',
    components:{
        'my-component':Child
    }
})
</script>
```
Vue组件模板由于受到HTML限制，一些标签内不允许出现其他的标签。比如,`<table>`里面只能是`<tr>`,`<td>`,`<th>`这些，直接使用组件是无效的:

```
<table>
    <my-component></my-component>   <!-- 这样是无效的 -->
</table>
```    
必须使用特殊的`is`属性来挂载：

```
<table>
    <tr is="my-component"></tr>   <!-- 这样是有效的 tr会被渲染为组件内容 -->
</table>

```
组件内的`data`选项必须是函数，而且最后要把数据**return**出去：

```
<div id="app">
    <my-component></my-component>    
</div>

<script>
    Vue.component('my-component',{
        template:`<div>{{message}}</div>`,
        data:function(){
            return {
                message:'组件内容'
            }
        }
    })

    var app=new Vue({
        el:'#app'
    })
</script>
```
JavaScript对象是引用关系，所以如果return对象是外部的一个对象，那么这个对象是共享的，任何一方修改都会同步:

```
<div id="app">
    <my-component></my-component>
    <my-component></my-component>
    <my-component></my-component>    
</div>

<script>
    //三个组件公用一个外部数据
    var data={
        count:0
    }

    Vue.component('my-component',{
        template:`<button @click="count++">{{count}}</button>`,
        data:function(){
            return data
        }
    })

    var app=new Vue({
        el:'#app'
    })
</script>
```
三个按钮不管点击哪个，数据都是同步更新的。如果想不受影响，就应该在组件内返回新的data：

```
<div id="app">
    <my-component></my-component>
    <my-component></my-component>
    <my-component></my-component>    
</div>

<script>
    //三个组件公用一个外部数据
    var data={
        count:0
    }

    Vue.component('my-component',{
        template:`<button @click="count++">{{count}}</button>`,
        data:function(){
            return {
                count:0
            }
        }
    })

    var app=new Vue({
        el:'#app'
    })
</script>
```






## 使用props传递数据

### 基本用法
组件之间通信，父组件向子组件传递数据或者参数，子组件接收之后根据参数的不同来渲染不同的内容或执行不同的操作。

父组件向子组件传递数据过程通过`props`实现。
在组件里，使用`props`声明需要从父级接收的数据，值的类型可以是字符串数组和对象。

字符串对象:

```
<div id="app">
    <my-component message="来自父组件的数据"></my-component>
</div>
<script>
    Vue.component('my-component',{
        props:['message'],
        template:`<div>{{message}}</div>`
    })
    var app=new Vue({
        el:'#app'
    })
</script>
```

`props`中声明的数据来自父级，而`data`函数里面的数据是组件自己的，作用域在组件内。
这两种数据都可以在`template`，`computed`和`methods`中使用。

由于HTML不区分大小写，所以使用DOM模板的时候，props属性名在DOM模板中要改成短横分割命名:

```
<div id="app">
    <my-component waring-text="提示信息"></my-component>
</div>
<script>
    Vue.component('my-component',{
        props:['waringText'],
        template:`<div>{{waringText}}</div>`
    })
    var app=new Vue({
        el:'#app'
    })
</script>
```

父组件的动态数据可以通过`v-bind`绑定`props`的值。当父组件数据变化时，也会传递给子组件：

```
<div id="app">
    <input type="text" v-model="parentMessage">
    <my-component :message="parentMessage"></my-component>
</div>
<script>
    Vue.component('my-component',{
        props:['message'],
        template:`<div>{{message}}</div>`
    })
    var app=new Vue({
        el:'#app',
        data:{
            parentMessage:'123'
        }
    })
</script>
```

** 如果传递数字，布尔值，数组，对象不使用`v-bind`，那么传递的仅仅就是字符串 **:

```
    <div id="app" v-cloak>
        <my-component message="[1,2,3]"></my-component>
        <my-component :message="[1,2,3]"></my-component>
        <my-another-component msg="false"></my-another-component>
        <my-another-component :msg="true"></my-another-component>
    </div>
    <script>
    Vue.component('my-component', {
        props: ['message'],
        template: `<div>{{message.length}}</div>`
    })
     Vue.component('my-another-component', {
        props: ['msg'],
        template: `<div>{{typeof msg}}</div>`
    })

    var app = new Vue({
        el: '#app',

    })
    </script>
```
渲染的结果:

> 7
> 
> 3
> 
> string
> 
> boolean 

### 单向数据流
父组件的数据变化时会传递给子组件化，但反过来不行。如果想修改父组件传递的值，但又不想影响到父组件，可以在子组件内再次声明一个数据,引用子父组件：

```
    <div id="app" v-cloak>
        <my-component :init-count="1"></my-component>
    </div>
    <script>
     Vue.component('my-component', {
        props: ['init-count'],
        template: `<div>{{ count}}</div>`,
        data:function(){
            return {
                //在子组件内再声明一个数据count
                //引用父组件的数据 this.initCount
                count:this.initCount
            }
        }
    })

    var app = new Vue({
        el: '#app',

    })
    </script>
```
这样修改了count数据不会影响父组件的数据initCount。

另外一种props作为需要被转变的原始值传入。

```
    <div id="app" v-cloak>
        <my-component :width="100"></my-component>
    </div>
    <script>
     Vue.component('my-component', {
        props: ['width'],
        template: `<div :style="style">{{width}}</div>`,
        computed:{
            style:function(){
                return {
                    width:this.width+'px'
                }
            }
        }
    })

    var app = new Vue({
        el: '#app',

    })
    </script>
```


###　数据验证

`props`的值可以是数组或对象，当`props`接收的值需要验证的时候就需要对象写法。
组件提供给别人使用的时候，需要先验证数据（比如符合需要的数据类型）

```
Vue.component('my-component',{
    props:{
    //必须是字符串或者数字类型
    propA:Number,
    //必须是字符串或数字类型
    propB:[String,Number],
    //布尔值，如果没定义，默认就是true
    propC:{
        type:Boolean,
        default:true
    },
    //数字，而且是必传
    propD:{
        type:Number,
        required:true
    },
    //如果是数组或对象，默认值必须是一个函数来返回
    propE:{
        type:Array,
        default:function(){
            return [];
        }
    },
    //自定义一个验证函数
    propF:{
        validator:function(value){
            return value > 10;
    }
  }
 }
})
```

## 组件通信
组件通信包含：父子组件通信，兄弟组件通信，跨级通信

### 自定义事件
当子组件向父组件传递数据的时候用到自定义事件。`v-on`除了监听DOM事件，还可以用于组件之间的自定义事件。

** 子组件用`$emit()`触发事件，父组件用`$on()`来监听子组件的事件 **

** 父组件也可以直接在子组件的自定义标签上使用`v-on`来监听子组件触发的自定义事件 **

```
  <div id="app" v-cloak>
    <p>总数：{{total}}</p>
    <my-component @increase="handleGetTotal" @reduce="handleGetTotal"></my-component>
    </div>
    <script>
     Vue.component('my-component', {
        template:`\
        <div>\
            <button @click="handleIncrease">+1</button>\
            <button @click="handleReduce">-1</button>\
         </div>`,
         data:function(){
            return {
                counter:0
            }
         },

         methods:{
            handleIncrease:function(){
                this.counter++;
                this.$emit('increase',this.counter);
            },
            handleReduce:function(){
                this.counter--;
                this.$emit('reduce',this.counter);
            },
         }
    })

    var app = new Vue({
        el: '#app',
        data:{
            total:0
        },
        methods:{
            handleGetTotal:function(total){
                    this.total=total;
            }
        }

    })
    </script>
```

### 非父子组件通信
兄弟组件通信和跨级组件通信



父链

> this.$parent
> this.$children
> 可以分别访问父组件和子组件


```
<div id="app">
    {{message}}
    <component-a></component-a>
</div>
<script>
    Vue.component('component-a',{
        template:`<button @click='handleEvent'>通过父链直接修改数据</button>`,
        methods:{
            handleEvent:function(){
                //访问到父链后，可以做任何操作，比如直接修改数据
                this.$parent.message='来自组件component-a的内容'
            }
        }
    })

    var app=new Vue({
        el:'#app',
        data:{
            message:''
        }
    })
</script>
```

子组件索引

使用`$refs`给子组件指定索引名称：
```
<div id="app">
    <button @click="handleRef">通过$ref获取子组件实例</button>
    <component-a ref="comA"></component-a>
</div>

<script>
    Vue.component('component-a',{
        template:`<div>子组件</div>`,
        data:function(){
            return {
                message:'子组件内容'
            }
        }
    })

    var app=new Vue({
        el:'#app',
        methods:{
           handleRef:function(){
                //通过$refs访问指定的子组件实例
            var msg=this.$refs.comA.message;
            console.log(msg);
           } 
        }
    })
</script>
```




