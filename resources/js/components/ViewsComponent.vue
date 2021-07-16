<template>
    <span class="badge bg-danger">
        {{viewsNumber}} <i class="far fa-eye"></i>
    </span>

</template>

<script>
export default {
    name: "ViewsComponent",
    computed: {
        viewsNumber(){
            return this.$store.getters['article/articleViews'];
        }
    }
}
</script>

<style scoped>

</style>
