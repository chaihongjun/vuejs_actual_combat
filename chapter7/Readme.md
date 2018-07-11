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


