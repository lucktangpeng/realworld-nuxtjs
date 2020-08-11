<template>
  <div>
    <form @submit.prevent="addEvent" class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          v-model="commentValue"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="article.author.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>
    <template v-if="comments">
      <div class="card" v-for="comment in comments" :key="comment.id">
        <div class="card-block">
          <p class="card-text">
            {{ comment.body }}
          </p>
        </div>
        <div class="card-footer">
          <a href class="comment-author">
            <img :src="comment.author.image" class="comment-author-img" />
          </a>
          &nbsp;
          <a href class="comment-author">{{ comment.author.username }}</a>
          <span class="date-posted">{{ comment.createdAt | data }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { getComments, addComments } from "@/api/article.js";
export default {
  name: "articleComment",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      commentValue: "",
    };
  },
  mounted() {
    this.getValue();
  },
  methods: {
    async addEvent() {
      const data = { comment: { body: this.commentValue } };
      try {
        const addCommentRes = await addComments(this.article.slug, data);
        console.log(addComments);
        this.getValue();
      } catch (e) {
        console.log("评论添加失败");
      }
    },
    async getValue() {
      const commentRes = await getComments(this.article.slug);
      const { comments } = commentRes.data;
      this.comments = comments;
    },
  },
};
</script>

<style lang="scss" scoped></style>
