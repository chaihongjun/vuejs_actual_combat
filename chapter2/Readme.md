
# 数据绑定和第一个Vue应用


## 实例与数据
```
    <div id="app">
        <input type="text" v-model="name" placeholder="你的名字">
        <h1 v-cloak>你好，{{name}}</h1>
    </div>
    <script src="https://unpkg.com/vue/dist/vue.min.js"></script>
    <script>
    var app = new Vue({
        el: '#app',
        data: {
            name: ''
        }
    })
    </script>
```

Vue实例本身`app`也代理了`data`对象里面的所有属性,可以这样访问
```
app.name
```

除了显示的生命数据外，也可以指向一个已有的变量。
```
var myData={
    a:1
}
var app=new Vue({
    el:'#app',
    data:myData
    })
```
修改任意一方数据，另外一方数据也会改变(双向绑定)


## 生命周期

常用的周期钩子(hook)
`created` Vue实例创建完之后调用，这个阶段完成了数据观测等，但未挂载，`$el`不可用，常用于初始化数据
`mounted` 实例挂载后调用
`beforeDestroy` 实例销毁之前调用，主要解绑`addEventListener`等监听事件
 **钩子的`this`指向的是Vue实例**   

```
var app = new Vue({
el:'#app',
data: {
    a: 2
}, 

created:function () {
 console.log(this.a); 
},
mounted:function () {
console.log (this.$el); 
     }
})
```
##　插值和表达式
```
 <div id="app">
    当前时间:{{date}}
 </div>
<script>
var app=new Vue({
    
        el:'#app',
        data:{

            date:new Date()
        }
        


    })


</script>


```


