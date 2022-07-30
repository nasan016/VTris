<script setup lang="ts">
</script>

<template>
    <div class="d-flex flex-column align-center justify-center">
        <div>
        <div class="welcome">Welcome to</div>
        <div class="vstris">VTris.</div>
        </div>
    </div> 
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap');

.welcome{
    margin-bottom: auto;
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 80px;
    font-weight: 700;
}

.vstris{
    margin-bottom: auto;
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 250px;
    font-weight: 700;
    line-height: 150px;
    color: #42b883;
    transition: color 0.3s;
}

.vstris:hover{
    color: #1095c1;
}

.container{
    width: inherit;
}
</style>