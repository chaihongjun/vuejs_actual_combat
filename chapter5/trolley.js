/*
 * @Author: chj
 * @FileName:trolley.js
 * @Date:   2018-07-09 12:06:38
 * @Last Modified by:   chj
 * @Last Modified time: 2018-07-10 17:23:11
 */
var app = new Vue({
    el: '#app',
    data: {
        //商品数据
        goods: [
            { id: 1, name: 'iphone 7', price: 6188, count: 1, isChecked: false },
            { id: 2, name: 'ipad Pro', price: 5888, count: 1, isChecked: false },
            { id: 3, name: 'MacBook Pro', price: 21488, count: 1, isChecked: false },
            { id: 4, name: 'iPod', price: 588, count: 1, isChecked: false }
        ],
    },
    computed: {
        totalPrice: function() {
            var total = 0;
            //遍历相加
            this.goods.forEach(function(item, index) {
                total += item.price * item.count;
            })
            return total;
        },
        //是否全选
        isCheckedAll: function() {
            var flag = true;
            //遍历数组选项
            this.goods.forEach(function(item, index) {
                //数组项没有选中
                if (!item.isChecked) {
                    flag = false;
                }
            })
            return flag;
        },
        //选中的产品价格
        checkedPrice: function() {
            var total = 0;
            this.goods.forEach(function(item, index) {
                if (item.isChecked) {
                    total += item.price * item.count;
                }
            })
            return total;
        }
    },
    methods: {
        reduce: function(index) {
            //再次判断 reduce 减法的可靠性
            if (this.goods[index].count === 1) return;
            this.goods[index].count--;
        },
        add: function(index) {
            this.goods[index].count++;
        },
        remove: function(index) {
            //删除一条数组数据
            this.goods.splice(index, 1);
        },
        //全部选择
        checkAll: function() {
            //遍历数组 将checked 设置 true
            this.goods.forEach(function(item, index) {
                item.isChecked = !item.isChecked;
                //console.log(item.isChecked);
            })
        },
        check: function(index, event) {
            this.goods[index].isChecked = !this.goods[index].isChecked;
        }
    },
})
