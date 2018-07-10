/*
 * @Author: chj
 * @FileName:trolley.js
 * @Date:   2018-07-09 12:06:38
 * @Last Modified by:   chj
 * @Last Modified time: 2018-07-09 18:08:50
 */
var app = new Vue({
    el: '#app',
    data: {
        //商品数据
        goods: [
            { id: 1, name: 'iphone 7', price: 6188, count: 1 },
            { id: 2, name: 'ipad Pro', price: 5888, count: 1 },
            { id: 3, name: 'MacBook Pro', price: 21488, count: 1 }
        ],
        selectPrice: 0
    },
    computed: {
        totalPrice: function() {
            var total = 0;
            for (var i = 0; i < this.goods.length; i++) {
                total += this.goods[i].price * this.goods[i].count;
            }
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
        remove: function(index) {},
        selectAll: function() {},
    },
});
