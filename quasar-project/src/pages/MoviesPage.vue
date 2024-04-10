<template>

  <q-page padding>
    <div class="text-center mb-4">
      <h2 class="fs-1">Movies List : </h2>
      <p>Click to see details and update</p>
    </div>

    <div class="q-pa-md">
      <q-table
        class="my-sticky-header-table"
        :rows="movies"
        :columns="columns"
        row-key="name"
      >

      <template v-slot:top>
        <q-tabs shrink>
            <q-route-tab to="/form" >
              <q-btn color="secondary" :disable="loading" label="Add movie" />
            </q-route-tab>
              <q-btn v-if="movies.length !== 0" class="q-ml-sm" color="secondary" :disable="loading" label="Remove movie" />
        </q-tabs>
      </template>

      </q-table>

    </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
import { QTableColumn } from 'quasar'
import { Movie } from 'src/interfaces/movies'
import { Director } from 'src/interfaces/directors'
export default defineComponent({
  name: 'MoviesPage',

  setup () {
    const loading = ref(false)
    const filter = ref('')
    const rowCount = ref(10)

    const columns: QTableColumn[] = [
      {
        name: 'name',
        required: true,
        label: 'Name',
        align: 'left',
        field: 'movie_name',
        sortable: true
      },
      {
        name: 'language',
        align: 'center',
        label: 'Language',
        field: 'movie_lang',
        sortable: true
      },
      {
        name: 'director',
        label: 'Director',
        field: 'director_full_name',
        sortable: true
      }
    ]

    const movies = ref<Movie[]>([])
    const directors = ref<Director[]>([])

    const fetchData = async () => {
      try {
        const moviesResponse = await axios.get<Movie[]>('http://localhost:3000/movies')
        movies.value = moviesResponse.data

        const directorsResponse = await axios.get<Director[]>('http://localhost:3000/directors')
        directors.value = directorsResponse.data

        // Associer les réalisateurs aux films
        const directorMap = new Map()
        directors.value.forEach(director => {
          directorMap.set(director.director_id, director)
        })

        movies.value.forEach(movie => {
          const director = directorMap.get(movie.director_id)
          if (director) {
            movie.director_full_name = `${director.first_name} ${director.last_name}`
          }
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    onMounted(fetchData)

    return {
      columns,
      movies,
      loading,
      filter,
      rowCount
    }
  }
})
</script>

<style lang="scss">
.my-sticky-header-table {
  height: 1000px;

  .q-table__top,
 thead tr:first-child th {
    background-color: white;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }
  thead tr:first-child th {
    top: 0;
  }

  &.q-table--loading {
    thead tr:last-child th {
      top: 48px;
    }
  }

  tbody {
    scroll-margin-top: 48px;
  }
}

</style>
