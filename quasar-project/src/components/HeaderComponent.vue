<template>
    <q-header class="bg-grey-9 text-white" elevated>
        <q-toolbar>

          <q-toolbar-title to="/">Home Page</q-toolbar-title>

        </q-toolbar>

        <q-tabs shrink>
            <q-route-tab to="/movies" label="Movies" />

            <q-route-tab to="/actors" label="Actors" />

        </q-tabs>
    </q-header>
</template>
