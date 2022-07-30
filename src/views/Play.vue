<script setup lang="ts">
import { ref } from 'vue';

import Game from '../components/game/Game.vue'
import GameLobby from '../components/game/GameLobby.vue'

const gameStart = ref(false)

</script>

<template>
    <div class="d-flex">
        <Game/>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap');

.startButton{
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 700;
}
</style>