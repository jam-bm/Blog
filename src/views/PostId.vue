<template >
    <div class="container shadow mt-5 p-3" style="background-color: cornsilk;">
        <div class="row">
            <div class="col-9">
                <div  :style="{'background': `url(${$store.state.posts[$route.params.id].imgUrl}) no-repeat`, 'height': '500px'}">
                </div>
                <p class="text-right">Author: <span class="author">{{$store.state.posts[$route.params.id].user}}</span></p>
                <div>
                    <h3 v-html="$store.state.posts[$route.params.id].title" style="margin: 20px"></h3>
                    <p style="margin: 20px">{{$store.state.posts[$route.params.id].description}}</p>
                </div>
                <h3 style="margin: 20px">Comments</h3>
                <div class=" shadow p-3" style="    background-color: white; margin: 20px">
                    <div v-for="comment in filteredComments" :key="comment.id" class="comments">
                        <div class="shadow">
                           <h6>{{comment.username}}</h6>
                            <div class="reply-comment" v-if="comment.parent_id !== null">
                                <h6>{{$store.state.comments[comment.parent_id].username}}</h6>
                                <p>{{$store.state.comments[comment.parent_id].content}}</p>
                            </div>
                            <p>{{comment.content}}</p> 
                        </div>
                    </div>
                    <div class="d-flex">
                        <input type="text" class="input-message">
                        <button style="width: 100px;" type="btn" class="btn btn-info">send</button>
                    </div>
                </div>
            </div>
            <div class="col">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    mounted() {
        console.log(this.$route.params.id)
        console.log(this.$store.state.posts[this.$route.params.id].imgUrl)
    },
    computed: {
        filteredComments () {
            return this.$store.state.comments.filter( item => item.post_id == this.$route.params.id)
        },
        featuredPosts () {
            return this.$store.getters.featuredPosts
        },
    },
}
</script>

<style scoped>
    p {
        margin: 0;
    }
    div.chat {
        width: 100%;
        height: 500px;
    }
    .input-comment{
        position: absolute;
        bottom: 0;
    }
    .reply-comment {
        font-size: 14px;
        background-color: aquamarine;
    }
    .comments {
        margin: 10px 0;
        width: 100%;
    }
    .comments h6 {
        font-weight: 700;
        color: rebeccapurple;
    }
    .comments div {
        border-radius: 20px;
        display: inline-block;
        padding: 0 20px;
    }
    .reply-comment h6, .reply-comment p  {
        font-size: 13px;
    }
    .input-message:focus {
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        transition-duration: 200ms;
    }
</style>