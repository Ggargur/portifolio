<template>
  <div>
    <BubbleBackground :bubbleCount="30" :radiusMin="8" :radiusMax="50" :speedMin="0.3" :speedMax="1" />
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="./assets/logo.png" alt="Logo" height="50" />
        </a>
        <!-- Botão Hamburguer (mobile) -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menu que colapsa no mobile -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="#projects">Projects</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#experiences">Experiences</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#skills">Skills</a>
            </li>
            <li class="nav-item">
              <button class="btn btn-outline-secondary ms-lg-2 mt-2 mt-lg-0" @click="toggleDark"
                :aria-label="isDark ? 'Ativar Light Mode' : 'Ativar Dark Mode'">
                <i :class="isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill'"></i>
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>

    <main class="container py-4 flex-grow-1">
      <section class="text-center mb-5">
        <h1>Gabriel Gargur</h1>
        <p class="lead">Code. Curiosity. Creativity.</p>
      </section>

      <section class="mb-5" id="projects">
        <h2 class="mb-3">Projects</h2>
        <div class="project-scroll d-flex gap-3 overflow-auto"
          style="scroll-snap-type: x mandatory; scroll-behavior: smooth;">
          <ProjectCard v-for="(p, i) in projects" :key="i" :project="p" />
        </div>
        <div class="scroll-progress">
          <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>
        </div>
      </section>

      <!-- Experiências -->
      <section class="mb-5" id="experiences">
        <h2 class="mb-3">Previous Experiences</h2>
        <ul class="list-group">
          <li v-for="(exp, i) in experiences" :key="i" class="list-group-item">
            <strong>{{ exp.role }}</strong> - {{ exp.company }} ({{ exp.period }})<br />
            <small>{{ exp.description }}</small>
          </li>
        </ul>
      </section>

      <!-- Habilidades -->
      <section>
        <h2 class="mb-3" id="skills">Skills</h2>
        <div class="d-flex flex-wrap gap-2">
          <span v-for="(skill, i) in skills" :key="i" class="badge text-bg-primary">
            {{ skill }}
          </span>
        </div>
      </section>
      <GithubRepos />
    </main>

    <footer class="bg-body-tertiary text-center py-3 mt-auto">
      <div class="container">
        <div class="mb-2">
          <a href="https://github.com/Ggargur" target="_blank" class="text-decoration-none mx-2 text-body">
            <i class="bi bi-github" style="font-size: 1.5rem;"></i>
          </a>
          <a href="https://gitlab.com/Ggargur" target="_blank" class="text-decoration-none mx-2 text-body">
            <i class="bi bi-gitlab" style="font-size: 1.5rem;"></i>
          </a>
          <a href="https://linkedin.com/in/tavares-gargur" target="_blank" class="text-decoration-none mx-2 text-body">
            <i class="bi bi-linkedin" style="font-size: 1.5rem;"></i>
          </a>
          <a href="mailto:tavares.gargur@gmail.com" class="text-decoration-none mx-2 text-body">
            <i class="bi bi-envelope-fill" style="font-size: 1.5rem;"></i>
          </a>
        </div>
        <small>© 2025 Gabriel Gargur. All rights reserved.</small>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, watchEffect } from "vue";
import ProjectCard from "./components/ProjectCard.vue";
import GithubRepos from "./components/GithubRepos.vue";
import BubbleBackground from "./components/BubbleBackground.vue";

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export default defineComponent({
  name: "PortfolioApp",
  components: {
    ProjectCard,
    GithubRepos,
    BubbleBackground
  },
  setup() {
    const scrollProgress = ref(0);
    const isDark = ref(true);
    const container = ref<HTMLElement | null>(null);


    function toggleDark() {
      isDark.value = !isDark.value;
    }

    watchEffect(() => {
      const html = document.documentElement;
      html.setAttribute('data-bs-theme', isDark.value ? 'dark' : 'light');
    });

    const updateScroll = () => {
      if (container.value) {
        const scrollLeft = container.value.scrollLeft;
        const maxScroll = container.value.scrollWidth - container.value.clientWidth;
        scrollProgress.value = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      }
    };

    onMounted(() => {
      container.value = document.querySelector(".project-scroll");
      container.value?.addEventListener("scroll", updateScroll);
      updateScroll();
    });

    onBeforeUnmount(() => {
      container.value?.removeEventListener("scroll", updateScroll);
    });

    return { isDark, toggleDark, scrollProgress };
  },
  data() {
    return {
      projects: [
        {
          title: "Kitty Rhythm",
          description: "A musical tower Defense game!",
          image: new URL('./assets/krtd.jpg', import.meta.url).href,
          link: "https://store.steampowered.com/app/3213680/Kitty_Rhythm_TD/"
        },
        {
          title: "Property Collector",
          description: "A card game about IPs.",
          image: new URL('./assets/pc.png', import.meta.url).href,
          link: "https://pepeco.itch.io/property-collector"
        },
        {
          title: "Tiny Sports",
          description: "A sports-themed WarioWare style game.",
          image: new URL('./assets/ts.png', import.meta.url).href,
          link: "https://pepeco.itch.io/tiny-sports"
        }
      ] as Project[],
      experiences: [
        {
          role: 'Frontend Developer',
          company: 'Mindsim',
          period: '08/2023 - 06/2024',
          description: 'Worked on a data-oriented dashboard on Java Swing and PostgreSql.'
        },
        {
          role: 'Unity VR Developer',
          company: 'Casa da Descoberta',
          period: '03/2021 - 12/2023',
          description: 'Making science related VR experiences.'
        },
        {
          role: 'Unity Developer',
          company: 'Play Our Games',
          period: '05/2022 - 01/2023',
          description: 'Developing mobile hypercasual games.'
        },
        {
          role: 'Founder',
          company: 'Far Beyond Studios',
          period: '04/2023 - ',
          description: 'Curretly making Kitty Rhythm TD.'
        },
      ] as Experience[],
      skills: [
        'Unity',
        'C#',
        'C',
        'Java',
        'JavaScript',
        'Vue.js',
        'TypeScript',
        'Bootstrap 5',
        'HTML5',
        'CSS3',
        'Git',
      ],
    };
  }
});
</script>