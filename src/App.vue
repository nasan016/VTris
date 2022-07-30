<script setup lang="ts">
</script>

<template>
<div>
  <div class="navbar d-flex justify-end">
    <router-link to="/"  class="title justify-start" style="text-decoration: none; color: inherit;">
      <div class="title justify-start">
        VTris.
      </div>
    </router-link>
    <router-link to="/play"  style="text-decoration: none; color: inherit;">
      <div v-ripple class="views">
        Play
      </div>
    </router-link>
      <v-divider class="divider" vertical/>
    <div v-ripple class="views">Scores</div>
      <v-divider class="divider" vertical/>
    <div v-ripple class="views">Settings</div>
      <v-divider class="divider" vertical/>
    <router-link to="/about"  style="text-decoration: none; color: inherit;">
    <div v-ripple class="views">
      About
    </div>
  </router-link>
  </div>
  <div class="d-flex justify-center appColor">
    <div class="d-flex align-center justify-center routerContainer">
      <router-view v-slot="{Component}">
      <transition name="slide-fade" mode="out-in">
        <component :is="Component"/>
      </transition>
      </router-view>
    </div>

  </div>
</div>
</template>

<style>
@import './assets/base.css';
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap');

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.routerContainer{
  width: 80%;
  height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  background-color: #FFF;
}

.navbar{
  background-color: #FFF;
  opacity: 100%;
  position: absolute;
  width: 100vw;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.title{
  color: #0000;
  justify-self: start;
  margin-right: auto;
  height: 35px;
  width: 150px;
  font-size: 32px;
  line-height: 35px;
  text-align: center;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  user-select: none;
  text-shadow: 
    0 0 #42b883, 
    0 1.2em #3178C6;
  overflow: hidden;
  transition: .3s;
}

.title:hover{
  text-shadow: 
    0 -1.2em #42b883, 
    0 0 #3178C6;
}
.divider{
  margin-top: 5px;
  margin-bottom: 5px;
}

.views{
  height: 35px;
  width: 90px;
  font-size: 14px;
  line-height: 35px;
  text-align: center;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 400;
  transition: 0.3s;
  cursor: pointer;
  user-select: none;
}

.views:hover{
  background-color: #EEEEEE;
}

.appColor{
  background-color: #ebedea;
  transition: 0.3s;
}
</style>