/*
 * @Author: chj
 * @FileName:input-number.js
 * @Date:   2018-07-25 14:32:55
 * @Last Modified by:   chj
 * @Last Modified time: 2018-07-25 15:21:18
 */
// 输入框组件
Vue.component('input-number', {
    template: ` <div class="input-number">
<input type="text" :value="currentValue"  @change="handleChange"/>
<button @click="handleDown" :disabled="currentValue<=min">-</button>
<button @click="handleUp" :disabled="currentValue>=max">+</button>
    </div>`,
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            defaulit: -Infinity
        },
        value: {
            type: Number,
            default: 3
        }
    },
    data: function() {
        return {
             //默认引用父组件传递过来的值
            currentValue: this.value
        }
    },
    methods: {
        handleDown: function() {
            if (this.currentValue <= this.min)
                return;
            this.currentValue -= 1;
        },
        handleUp: function() {
            if (this.currentValue >= this.max)
                return;
            this.currentValue += 1;
        },
        handleChange: function(event) {
            var val = event.target.value.trim();
            var max = this.max;
            var min = this.min;
            if (isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;
                if (val > max) {
                    this.currentValue = max;
                } else if (val < min) {
                    this.currentValue = min;
                }
            } else {
                event.target.value = this.currentValue;
            }
        }
    }
})
