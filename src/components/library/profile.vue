<template>
    
</template>

<script>
export default {
  name: 'MyProfile',
  props:{      
    

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
