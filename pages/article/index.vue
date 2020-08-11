<template>
  <div>
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{{ article.title }}</h1>
          <user-message :article="article"></user-message>
        </div>
      </div>

      <div class="container page">
        <div class="row article-content">
          <div class="col-md-12" v-html="article.body"></div>
        </div>

        <hr />

        <div class="article-actions">
          <user-message :article="article"></user-message>
        </div>

        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <comment :article="article"></comment>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from "@/api/article.js";
import UserMessage from "./component/userMessage";
import Comment from "./component/articleComment";
import Markdown from "markdown-it";
export default {
  name: "articleIndex",
  async asyncData({ params }) {
    const articleRes = await getArticle(params.slug);
    const mk = new Markdown();
    const { article } = articleRes.data;
    article.body = mk.render(article.body);
    return { article };
  },
  components: {
    UserMessage,
    Comment,
  },
};
</script>

<style lang="scss" scoped></style>
