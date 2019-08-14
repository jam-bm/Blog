<template>
    <div>
        <header class="masthead text-white text-center">
            <div class="overlay"></div>
            <div class="container">
            <div class="row">
                <div class="col-xl-9 mx-auto">
                <h1 class="mb-5">Dashboard</h1>
                </div>
            </div>
            </div>
        </header>
        <div class="row m-5">
            <div class="col-3">
                <div style="width: 100%; height: 200px; background-color: aquamarine;">
                    <button class="avatar-btn">change avatar</button>
                </div>
            </div>
            <div class="col-7">
                <ul>
                    <li>
                        <label for="username">Username</label>
                        <input type="text" v-model="username">
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" v-model="email">
                    </li>
                </ul>
            </div>
            <div class="col-2"></div>
        </div>
        <h3 class="text-center ">Your Posts</h3>
        <div class="showcase">
            <div class="container p-0">
            <router-link v-for="(item, index) in $store.state.posts" :key="index" :to="{name: 'PostId', params: {id: index}}" class="row no-gutters no-gutters1 m-5 shadow-lg">
                <div :class="['col-lg-6', {'order-lg-2': index%2==1 ? false : true}, 'text-white', 'showcase-img','text-center','align-middle']" :style="{'background-image': `url(${item.imgUrl})`}">
                    Edit
                </div>
                <div class="col-lg-6 order-lg-1 my-auto showcase-text" :class="['col-lg-6', {'order-lg-1': index%2==1 ? true : false}, 'my-auto', 'showcase-text', 'p-4']">
                    <h2 v-html="item.title"></h2>
                    <p class="lead mb-0" v-html="item.description"></p>
                    <p class="text-right mt-5">Author: {{item.user}}</p>
                </div>
            </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
        }
    },
}
</script>

<style lang="css" scoped>
    li {
        list-style: none;
    }
    input {
        height: 40px;
    }
    .avatar-btn {
        position: absolute;
        bottom: 0; 
        border: none; 
        width: 267px; 
        opacity: 0;
    }
    .avatar-btn:hover {
        opacity: 1;
    }
    
  .no-gutters1{
    text-decoration: none;
    color: black;
    background-color: white;
}
.no-gutters1:hover {

}
</style>