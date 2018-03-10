<template>
    <button class="waves-effect" :class="{'btn raised_btn': type=='raised', 'waves-light': type=='raised'||type=='flat', 'btn-flat': type=='flat'}" v-on:click="click">
        <slot/>
    </button>
</template>

<script>
export default {
  name: 'Button',
  props:{      
    type: {      
      default: 'raised'
    },

  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    click(){
      this.$emit('click');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
