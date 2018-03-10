<template>
    <ul class="collapsible" data-collapsible="expandable" >
        <slot/>
    </ul>
</template>

<script>
export default {
    name: 'Button',
    props:[
        'collapsible'

    ],
    methods:{
      
    },
    mounted(){
        $(this.$el).collapsible();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
