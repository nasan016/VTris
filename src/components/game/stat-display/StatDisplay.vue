<script setup lang="ts">
import { ref } from 'vue';


const score = ref(0)
const linesCleared = ref(0)
const level = ref(0)

</script>

<template>
    <div class="setFont">
        <div id="score">
                <div class="displayTitle">SCORE</div>
                <div class="stats">{{ score }}</div>
            </div>
                <v-divider/>
            <div id="linesCleared"> 
            <div class="displayTitle">LINES CLEARED </div>
                <div class="stats">{{ linesCleared }}</div>
            </div>
                <v-divider/>
            <div id="level"> 
                <div class="displayTitle">LEVEL </div>
                <div class="stats">{{ level }}</div>
            </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap');

.setFont{
    font-family: 'Roboto Condensed', sans-serif;
    width: 180px;
}

.displayTitle{
    font-size: 22px;
    color: #999999
}

.stats{
    font-size: 25px;
}
</style>