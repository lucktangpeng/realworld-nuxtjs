<template>
  <div>
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <form @submit.prevent="submitEvent">
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    v-model="formData.title"
                    class="form-control form-control-lg"
                    placeholder="Article Title"
                    required
                    :disabled="status"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    v-model="formData.description"
                    class="form-control"
                    placeholder="What's this article about?"
                    required
                    :disabled="status"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    v-model="formData.body"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    required
                    :disabled="status"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    v-model="tagValue"
                    class="form-control"
                    placeholder="Enter tags"
                    @keyup.enter="enterAddTag"
                    :disabled="status"
                  />
                  <div class="tag-list" v-if="formData.tagList">
                    <span
                      class="tag-default tag-pill"
                      v-for="(tag, index) in formData.tagList"
                      :key="index"
                    >
                      <i class="ion-close-round" @click="removeTag(index)"></i>
                      {{ tag }}
                    </span>
                  </div>
                </fieldset>
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  @click="submitEvent"
                  :disabled="status"
                >Publish Article</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addArticle, getArticle, updateArticle } from "@/api/article";
export default {
  name: "editorIndex",
  middleware: "auth",
  data() {
    return {
      formData: {
        title: "",
        description: "",
        body: "",
        tagList: []
      },
      tagValue: "",
      status: false
    };
  },
  async mounted() {
    if (this.isUpdate) {
      const articleRes = await getArticle(this.routerSlug);
      const old_article = articleRes.data.article;
      for (let key in this.formData) {
        this.formData[key] = old_article[key];
      }
    }
  },
  methods: {
    async submitEvent() {
      try {
        this.status = true;
        const articleData = { article: this.formData };
        const addRes = this.isUpdate
          ? await updateArticle(this.routerSlug, articleData)
          : await addArticle(articleData);
        this.status = false;
        const { article } = addRes.data;
        this.$router.push({ path: `/article/${article.slug}` });
      } catch (e) {
        console.log("信息创建失败");
      }
    },
    enterAddTag() {
      this.formData.tagList.push(this.tagValue);
      this.tagValue = "";
    },
    removeTag(index) {
      this.formData.tagList.splice(index, 1);
    }
  },
  computed: {
    isUpdate() {
      return this.$route.name === "update";
    },
    routerSlug() {
      return this.$route.query.slug;
    }
  }
};
</script>

<style lang="scss" scoped></style>
