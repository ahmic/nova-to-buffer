<template>
    <div class="preview border border-50 px-1 py-1 w-1/4">
        <span class="description inline-block mb-2 mt-1" v-if="description.length > 0" v-text="description"></span>
        <img :src="imageUrl">
        <span class="title mt-1 mb-2 inline-block" v-text="title"></span>
        <span class="url" v-text="url"></span>
    </div>
</template>

<script>
export default {
    props: ['title', 'url', 'imageUrl', 'description'],

    mounted() {

    }
}
</script>

<style scoped>
    .preview {
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);
        border-radius: .5rem
    }
    .title {
        font-size: 1.1em;
    }
    .url {
        font-size: .8em;
    }
</style>
