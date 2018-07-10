# v-bind 及class 与style 绑定
`v-bind` 动态更新HTML元素
##　v-bind 绑定class的几种方式
### 对象语法
`:class="{}"`
```
<div id="app">
    <div :class="{'active':isActive,'error':isError}"></div>
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            isActive:true,
            isError:false
        }
    })
</script>
```
如果 `:class` 表达式过长或逻辑复杂，可以绑定一个computed属性：
```
<div id="app">
    <div :class="classes"></div>
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            isActive:true,
            isError:false
        },
        computed:{
            classes:function(){
                    return {
                        active:this.isActive && !this.error 
                    }
            }
        }
    })
</script>
```
### 数组语法
当需要多个`class`的时候，可以使用数组语法。v-bind绑定一组数组
`:class="[]"`
```
<div id="app">
    <div :class="[activeCls,errorCls]"></div>
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            activeCls:'active',
            errorCls:'error'
        }
    })
</script>
```
也可以使用三元运算表达式切换class
```
<div id="app">
    <div :class="[isActive?activeCls:'',errorCls]"></div>
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            isActive:'true',
            errorCls:'error'
        }
    })
</script>
```
当class条件多时，可以使用对象语法:
```
<div id="app">
    <div :class="[{'active':isActive},errorCls]"></div>
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            isActive:'true',
            errorCls:'error'
        }
    })
</script>
```
也可以使用data,computed,methods方法：
```
<div id="app">
    <button  :class="classes"></button >
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            size:'large',
            disbaled:true
        },
        computed:{
            classes:function(){
                    return [
                        'btn',{
                            ['btn-'+this.size]:this.size !=='',
                            ['btn-disabled']:this.disabled
                        }
                    ]
            }
        }
    })
</script>
```
最终渲染:
`<button class="btn btn-large btn-disabled"></button >`

## 绑定内联样式
```
<div id="app">
    <div :style="{'color':color,'fontSize':fontSize+'px'}">文本</div>
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            color:'red',
            fontSize:14
        }
    })
</script>
```
也可以写在data 或者 computed里面:
```
<div id="app">
    <div :style="styles">文本</div>
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            styles:{
                color:'red',
                fontSize:14+'px'
            }
        }
    })
</script>
```
