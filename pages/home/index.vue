<template>
  <div>
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <!-- <a href="/">Your Feed</a> -->
                  <nuxt-link
                    class="nav-link"
                    exact
                    :class="{ active: tab === 'your_feed' }"
                    :to="{ name: 'home', query: { tab: 'your_feed' } }"
                  >Your Feed</nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    :class="{ active: tab === 'global_feed' }"
                    :to="{ name: 'home' }"
                    exact
                  >Global Feed</nuxt-link>
                </li>
                <li class="nav-item" v-if="tab === 'tag'">
                  <nuxt-link
                    class="nav-link"
                    :class="{ active: tab === 'tag' }"
                    exact
                    to="/"
                  ># {{ tag }}</nuxt-link>
                </li>
              </ul>
            </div>

            <div class="article-preview" v-for="article in articles" :key="article.slug">
              <div class="article-meta">
                <nuxt-link :to="{ path: `profile/${article.author.username}` }">
                  <img :src="article.author.image" />
                </nuxt-link>
                <div class="info">
                  <nuxt-link
                    :to="{ path: `profile/${article.author.username}` }"
                    class="author"
                  >{{ article.author.username }}</nuxt-link>
                  <span class="date">{{ article.createdAt | data }}</span>
                </div>
                <button
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :disabled="article.addFavoriteStatus"
                  :class="{ active: article.favorited }"
                  @click="favoriteClick(article)"
                >
                  <i class="ion-heart"></i>
                  {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link :to="{ path: `article/${article.slug}` }" class="preview-link">
                <h1>{{ article.description }}</h1>
                <p>{{ article.body }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
            <nav>
              <ul class="pagination">
                <li
                  class="page-item ng-scope"
                  :class="{ active: page === num }"
                  v-for="num in totolPages"
                  :key="num"
                >
                  <nuxt-link
                    class="page-link ng-binding"
                    :to="{ name: 'home', query: { page: num, tag } }"
                  >{{ num }}</nuxt-link>
                </li>
              </ul>
            </nav>
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
                <nuxt-link
                  v-for="tag in tags"
                  :key="tag"
                  :to="{
                    name: 'home',
                    query: { tag: tag, page: page, tab: 'tag' },
                  }"
                  class="tag-pill tag-default"
                >{{ tag }}</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getTags,
  getArticlesFeed,
  addFavorite,
  deleteFavorite
} from "@/api/article.js";
export default {
  name: "homeIndex",
  async asyncData({ query }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const tag = query.tag || "";
    const tab = query.tab || "global_feed";
    const offset = (page - 1) * limit;
    try {
      const loadArticle = tab === "your_feed" ? getArticlesFeed : getArticles;
      const [articleRes, tagsRes] = await Promise.all([
        loadArticle({ limit, offset, tag }),
        getTags()
      ]);
      const { articles, articlesCount } = articleRes.data;
      const { tags } = tagsRes.data;
      articles.forEach(element => {
        element.addFavoriteStatus = false;
      });

      return { articles, articlesCount, tags, limit, page, tag, tab };
    } catch (e) {
      console.log("服务器报错了");
    }
  },
  computed: {
    totolPages() {
      return Math.ceil(this.articlesCount / this.limit);
    }
  },
  watchQuery: ["page", "tag", "tag_tab", "tab"],
  methods: {
    // 点赞
    async favoriteClick(article) {
      try {
        article.addFavoriteStatus = true;
        if (article.favorited) {
          await deleteFavorite(article.slug);
          article.addFavoriteStatus = false;
          article.favorited = false;
          article.favoritesCount--;
        } else {
          await addFavorite(article.slug);
          article.addFavoriteStatus = false;
          article.favorited = true;
          article.favoritesCount++;
        }
      } catch (e) {
        console.log("点赞失败了");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
