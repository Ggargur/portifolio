<template>
    <section id="repositorios" class="container my-5">
      <h2 class="mb-4">Repositórios Recentes</h2>
      <div class="row">
        <div v-for="repo in repos" :key="repo.id" class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">{{ repo.name }}</h5>
              <p class="card-text">
                {{ repo.description || 'Sem descrição.' }}
              </p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
              <small class="text-muted">Atualizado em {{ formatDate(repo.updated_at) }}</small>
              <a :href="repo.html_url" target="_blank" class="btn btn-sm btn-primary">Ver</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  
  interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    updated_at: string;
  }
  
  export default defineComponent({
    name: 'GithubRepos',
    setup() {
      const repos = ref<Repo[]>([]);
  
      const fetchRepos = async () => {
        try {
          const response = await fetch('https://api.github.com/users/Ggargur/repos?sort=updated&per_page=6');
          const data = await response.json();
          repos.value = data;
        } catch (error) {
          console.error('Erro ao buscar repositórios:', error);
        }
      };
  
      const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('pt-BR');
      };
  
      onMounted(fetchRepos);
  
      return { repos, formatDate };
    }
  });
  </script>
  