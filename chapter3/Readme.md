
# 计算属性


```
<div id="app">
    {{reversedText}}
</div>
<script>
var app = new Vue({
    el: '#app',
    data: {
        text: '123,456'
    },
    computed: {
        reversedText: function() {
            //this 指向 Vue实例app
            return this.text.split(',').reverse().join(',');
        }
    }
})
</script>
```

## 计算属性缓存
