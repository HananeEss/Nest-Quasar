<template>
  <q-page padding>

    <h2 class="text-center mb-4">Add Movie</h2>

    <div class="row justify-center q-pa-md" style="width: 800px; margin: 0 auto">
      <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="col q-gutter-md"
      >
        <q-input  v-model="movieName" label="Movie name" />
        <q-input  v-model=movieLength label="Movie length" />
        <q-input  v-model="movieLanguage" label="Movie language" />
        <q-input  v-model="ageCertificate" label="Age certificate" />
        <q-input  v-model="releaseDate" type="date" label="Release date" />

        <p class="text-h6" style="margin-top: 60px">Director</p>
        <q-input  v-model="directorFirstName" label="First name" />
        <q-input  v-model="directorLastName" label="Last name" />
        <q-input  v-model="directorNationality" label="Nationality" />
        <q-input  v-model="dateOfBirth" type="date" label="Date of birth" />

        <div>
        <q-btn label="Submit" type="submit" color="secondary" />
        <q-btn label="Reset" type="reset" color="secondary" flat class="q-ml-sm" />
        </div>

      </q-form>

    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
export default defineComponent({
  name: 'AddMovieFormPage',

  setup () {
    const movieId = ref(0)
    const movieName = ref('')
    const movieLength = ref(0)
    const movieLanguage = ref('')
    const ageCertificate = ref('')
    const releaseDate = ref('')
    const directorFirstName = ref('')
    const directorLastName = ref('')
    const directorNationality = ref('')
    const dateOfBirth = ref('')
    const directorId = ref(0)

    const onReset = () => {
      movieName.value = ''
      movieLength.value = 0
      movieLanguage.value = ''
      ageCertificate.value = ''
      releaseDate.value = ''
      directorFirstName.value = ''
      directorLastName.value = ''
      directorNationality.value = ''
      dateOfBirth.value = ''
    }

    const onSubmit = async () => {
      try {
        const directorResponse = await axios.post('http://localhost:3000/directors', {
          director_id: directorId.value,
          first_name: directorFirstName.value,
          last_name: directorLastName.value,
          nationality: directorNationality.value,
          date_of_birth: dateOfBirth.value
        })

        const directorNewId = directorResponse.data.director_id
        console.log('Id du nouveau directeur:', directorNewId)

        const movieResponse = await axios.post('http://localhost:3000/movies', {
          movie_id: movieId.value,
          movie_name: movieName.value,
          movie_length: Number(movieLength.value),
          movie_lang: movieLanguage.value,
          age_certificate: ageCertificate.value,
          release_date: releaseDate.value,
          director_id: directorNewId

        })
        console.log('Film ajouté avec succès:', movieResponse.data)

        // Redirigez l'utilisateur vers la page principale
        // Vous devez avoir correctement configuré les routes dans votre application pour utiliser $router
        // Assurez-vous que le composant est utilisé dans une route qui a accès à $router
        // this.$router.push('/movies')
      } catch (error) {
        console.error('Erreur lors de l\'ajout du film:', error)
      }
    }
    return {
      movieName, movieLength, movieLanguage, ageCertificate, releaseDate, directorFirstName, directorLastName, directorNationality, dateOfBirth, directorId, onSubmit, onReset
    }
  }

})
</script>
