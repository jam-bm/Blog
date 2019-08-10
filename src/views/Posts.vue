<template>
    <div>
        <header class="masthead text-white text-center">
            <div class="overlay"></div>
            <div class="container">
            <div class="row">
                <div class="col-xl-9 mx-auto">
                <h1 class="mb-5">Posts</h1>
                </div>
            </div>
            </div>
        </header>
        <!-- Image Showcases -->
        <section class="showcase">
            <div class="container-fluid p-0">
            <router-link v-for="(item, index) in $store.state.posts" :key="index" :to="{name: 'PostId', params: {id: index}}" class="row no-gutters no-gutters1">
                <div :class="['col-lg-6', {'order-lg-2': index%2==1 ? false : true}, 'text-white', 'showcase-img']" :style="{'background-image': `url(${item.imgUrl})`}"></div>
                <div class="col-lg-6 order-lg-1 my-auto showcase-text" :class="['col-lg-6', {'order-lg-1': index%2==1 ? true : false}, 'my-auto', 'showcase-text']">
                <h2>{{item.title}}</h2>
                <p class="lead mb-0">{{item.description}}</p>
                </div>
            </router-link>
            </div>
        </section>
    </div>

</template>

<script>
export default {
    data() {
        return {
        }
    },
}
</script>

<style scoped>
    .no-gutters1{
        text-decoration: none;
        color: black
    }
</style>
