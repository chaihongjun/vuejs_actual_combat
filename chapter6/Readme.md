# 表单和v-model
## 基本用法

```
<div id="app">
    <input type="text" v-model="message" placeholder="输入...">
    <p>输入的内容是：{{message}}</p>
</div>

<script>
    var app=new Vue({
        el:'#app',
        data:{
            message:''
        }
    })
</script>
```
###单选按钮
只有一个单选按钮的时候，只需要`v-bind`绑定一个布尔值即可
```
<div id="app">
    <input type="radio" :checked="picked">
    <label>单选按钮</label>
    input
</div>

<script>
    var app=new Vue({
        el:'#app',
        data:{
            picked:true
        }
    })
</script>
```

但如果是多个单选按钮组合使用,就需要`v-model`配合`value`:

```
<div id="app">
    <input type="radio" v-model="picked" value="html" id="html">
<!--<input @input="picked = $event.target.value" value="html" id="html">-->
    <label for="html">HTML</label>
    <br>
     <input type="radio" v-model="picked" value="js" id="js">
    <label for="html">JavaScript</label>
    <br>
     <input type="radio" v-model="picked" value="css" id="css">
    <label for="html">CSS</label>
    <br>
    <p>选择的项目是：{{picked}}</p>
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            picked:'js'
        }
    })
</script>

```
### 复选框

单个复选框
```
<div id="app">
    <input type="checkbox" v-model="checked" id="checked">
    <label for="checked">选择状态{{checked}}</label>
</div>

<script>
    var app=new Vue({
        el:'#app',
        data:{
            checked:false
        }
    })
</script>

```
多个复选框

```
<div id="app">
    <input type="checkbox" v-model="checked" value="html" id="html">
    <label for="html">HTML</label>
    <br>
        <input type="checkbox" v-model="checked" value="js" id="js">
    <label for="js">JavaScript</label>
    <br>
        <input type="checkbox" v-model="checked" value="css" id="css">
    <label for="css">CSS</label>
    <br>
   <p>选择的是：{{checked}}</p> 
</div>

<script>
    var app=new Vue({
        el:'#app',
        data:{
            checked:js
        }
    })
</script>
```

### 选择列表

单选下拉选择器

```
<div id="app">
    <select v-model="selected">
        <option>HTML</option>
        <option value="js">JavaScript</option>
         <option>CSS</option>
    </select>
 <p>选择的是:{{selected}}</p>   
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            selected:'html'
        }
    })
</script>
```

多选下拉选择器
```
<div id="app">
    <select v-model="selected" multiple>
        <option>HTML</option>
        <option value="js">JavaScript</option>
         <option>CSS</option>
    </select>
 <p>选择的是:{{selected}}</p>   
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            selected:'html'
        }
    })
</script>
```

## 绑定值
绑定动态数据按钮（使用`v-bind`）
单选按钮

```
<div id="app">
    <input type="raido" v-model="picked" :value="value">
    <label>单选</label>
  <p>{{picked}}</p>
  <p>{{value}}</p>
</div>
<script>
    var app=new Vue({
        el:'#app',
        data:{
            picked:false,
            value:123
        }
    })
</script>
```

复选框

```
<div id="app">
    <input type="checkbox" v-model="toggle" :true-value="value1" :false-value="value2">
 <label>复选框</label>
<p>{{toggle}}</p>
<p>{{value1}}</p>
<p>{{value2}}</p>     
</div>

<script>
    var app=new Vue({
        el:'#app',
        data:{
            toggle:false,
            value1:'a',
            value2:b
        }
        })
</script>
```


## 修饰符
`.lazy` 发生在change事件:

```
<div id="app">
    <input type="text" v-model.lazy="message">
    <p>{{message}}</p>
</div>

<script>
    var app=new Vue({
            el:'#app',
            data:{
                message:''
            }    
        })
</script>
```
当表单失去焦点或者输入回车之后message才更新

`.number`  将输入转换成Number类型. 一般情况如果输入的是数字，实际是String类型。这个修饰符可以保证类型是Number：

```
<div id="app">
    <input type="number" v-model.number="message">
    <p>{{typeof message}}</p>
</div>

<script>
    var app=new Vue({
        el:'#app',
        data:{
            message:123
        }
        })
</script>
```

`.trim`自动过滤输入的首位空格
**当失去焦点或者输入回车之后过滤，输入内容中的空格不会被过滤:**

```
<div id="app">
    <input type="text" v-model.trim="message">
    <p>{{typeof message}}</p>
</div>

<script>
    var app=new Vue({
        el:'#app',
        data:{
            message:''
        }
        })
</script>
```



