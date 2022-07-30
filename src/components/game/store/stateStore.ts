import { defineStore } from 'pinia'

const statStore = defineStore('gameStats', {
    state: () => {
        return {
            score: 0,
            linesCleared: 0,
            level: 0,
        }
    }
},
)
