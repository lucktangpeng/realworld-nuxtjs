<template>
  <div>
    <div class="article-meta">
      <a href>
        <img :src="article.author.image" />
      </a>
      <div class="info">
        <a href class="author">{{ article.author.username }}</a>
        <span class="date">{{ article.createdAt | data }}</span>
      </div>
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following }"
        @click="followClick(article)"
        :disabled="article.followStatus"
        v-if="!isMyself"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        {{
        article.author.following
        ? `Follow ${article.author.username}`
        : `Unfollow ${article.author.username}`
        }}
        <!-- <span class="counter">(10)</span> -->
      </button>
      <nuxt-link
        v-else
        class="btn btn-outline-secondary btn-sm"
        :to="{ name: 'update', query: { slug: article.slug } }"
      >
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>&nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary" v-if="!isMyself">
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
      <button
        v-else
        class="btn btn-outline-danger btn-sm"
        @click="deleteAeticleEvent(article.slug)"
        :disabled="deleteStatus"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </div>
  </div>
</template>

<script>
import { addFollow, deleteFollow } from "@/api/profile.js";
import { deleteArticle } from "@/api/article.js";
import { mapState } from "vuex";
export default {
  name: "userMessage",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      deleteStatus: false
    };
  },
  methods: {
    async followClick(article) {
      article.followStatus = true;
      try {
        if (article.author.following) {
          await deleteFollow(article.author.username);
          article.author.following = false;
          article.followStatus = false;
        } else {
          await addFollow(article.author.username);
          article.author.following = true;
          article.followStatus = false;
        }
      } catch (e) {
        console.log("关注失败");
      }
    },
    async deleteAeticleEvent(slug) {
      try {
        this.deleteStatus = true;
        await deleteArticle(slug);
        this.deleteStatus = false;
        this.$router.push({ name: "home" });
      } catch (e) {
        console.log("删除失败");
      }
    }
  },
  computed: {
    ...mapState(["user"]),
    isMyself() {
      return this.user.username === this.article.author.username;
    }
  }
};
</script>

<style lang="scss" scoped></style>
