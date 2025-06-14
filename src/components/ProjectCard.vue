<template>
  <div class="card h-100 shadow-sm">
    <img :src="project.image" class="card-img-top" :alt="project.title" />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ project.title }}</h5>
      <p class="card-text">{{ project.description }}</p>
      <a :href="project.link" target="_blank" class="btn btn-primary mt-auto">View Project</a>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default defineComponent({
  name: "ProjectCard",
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true
    }
  }
});
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
  height: 200px;
}
</style>