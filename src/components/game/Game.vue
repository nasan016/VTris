<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import NextDisplay from './stat-display/NextDisplay.vue'
import StatDisplay from './stat-display/StatDisplay.vue'
import {
    board,
    getTetrominoColor,
    getRandomTetromino,
    clearBoard,
    currentShape,
    shapes,
    renderedBoard,
    initShape,
} from "@/components/game/game";

import type {
    Shape,
    CurrentShape,
    TetrominoShape
} from "@/components/game/game"

const hardDropTime = ref(8)
const time = ref(1000)
const rotationTracker = ref(0)

const left = ref('ArrowLeft')
const right = ref('ArrowRight')
const hardDropKey = ref('ArrowUp')
const softDropKey = ref('ArrowDown')
const rotateLeft = ref('z')
const rotateRight = ref('x')

//KEYPRESSES START
function keyboardListener(e: KeyboardEvent) {
    const key = e.key

    switch(key) {
        case left.value:
        case right.value:
            movePieceX(key)
            break;
        case hardDropKey.value:
            hardDrop()
            break;
        case softDropKey.value:
            softDrop()
            break;
        case rotateLeft.value:
        case rotateRight.value:
            rotation(key)
            break;
    }
}

const softDrop = () => {
    gravity()
}

const hardDrop = () => {
    clearInterval(playerGravity)
    playerGravity = setInterval(gravity, hardDropTime.value)
}

//todo: one day lol
function kickback(shape: CurrentShape) {

}

function canPieceFit(x: number, y: number, shape: Shape): boolean {
    const y_size = shape.length
    const x_size = shape[0].length
    
    //bounds check (left, top)
    if (x < 0 || y < 0) {
        for (let i = 0; i < y_size; i++) {
            for (let j = 0; j < x_size; j++) {
                if ((shape[i][j] !== '.' && y+i < 0) || (shape[i][j] !== '.' && x+j < 0)) {
                    return false
                }
            }
        }
    }

    //bounds check (right, bottom)
    if (x + x_size >= board.value[0].length || y + y_size >= board.value.length) {
        for (let i = 0; i < y_size; i++) {
            for (let j = 0; j < x_size; j++) {
                if ((shape[i][j] !== '.' && y+i >= board.value.length) || (shape[i][j] !== '.' && x+j >= board.value[0].length)) {
                    return false
                }
            }
        }
    }

    //check to make sure the shape doenst intersect with anything
    for (let i = 0; i < y_size; i++) {
        for (let j = 0; j < x_size; j++) {
            //intersection check
            if (
                board.value[y + i] &&
                board.value[y + i][x + j] &&
                board.value[y + i][x + j] !== '.' &&
                shape[i][j] !== '.'
            ) {
                return false
            }
        }
    }

    return true
}

function movePieceX(key : string){
    const shape = currentShape.value
    if (
        key === left.value && 
        canPieceFit(shape.x-1, shape.y, shape.shape.rotations[shape.currentRotation])
    ) {
        //left press
        shape.x -= 1
        
    } else if (
        key === right.value &&
        canPieceFit(shape.x+1, shape.y, shape.shape.rotations[shape.currentRotation])
    ) {
        //right press
        shape.x += 1
    }
}

function rotation(key : string) {
    const shape = currentShape.value
    if (key === rotateLeft.value) {
        const newRotation = (shape.currentRotation + 1) % shape.shape.rotations.length

        //left rotation
        if (canPieceFit(shape.x, shape.y, shape.shape.rotations[newRotation])) {
            shape.currentRotation = newRotation
        }
    } else if (key === rotateRight.value) {
        let newRotation = (shape.currentRotation - 1) % shape.shape.rotations.length
        if (newRotation < 0) {
            newRotation = shape.shape.rotations.length - 1
        }

        //right rotation
        if (canPieceFit(shape.x, shape.y, shape.shape.rotations[newRotation])) {
            shape.currentRotation = newRotation
        }
    }
}
//KEY PRESSES END

//BOARD LOGIC START
function gravity() {
    const shape = currentShape.value
    if (canPieceFit(shape.x, shape.y+1, shape.shape.rotations[shape.currentRotation])) {
        shape.y += 1
    } else {
        clearInterval(playerGravity)
        playerGravity = setInterval(gravity, time.value)
        //place the piece and clear any lines that need to be cleared
        //place the current piece
        const x = currentShape.value.x
        const y = currentShape.value.y
        currentShape.value.shape.rotations[currentShape.value.currentRotation].forEach((row, i) => {
            row.forEach((item, j) => {
                if (board.value[y + i] && board.value[y + i][x + j] && item != ".") {
                    board.value[y + i][x + j] = item
                }
            })
        })
        //choose a new piece
        currentShape.value = initShape()
        //clear the lines
        linesCleared()
    }
}

let playerGravity = setInterval(gravity, time.value)

function linesCleared() {
    let counter = 0
    let totalLinesCleared = 0
    for(let i = 0; i < board.value.length; i++){
        for(let j = 0; j < (board.value)[i].length; j++){
            if((board.value)[i][j] !== '.'){
                counter++
            if(counter === 10){
                board.value.splice(i, 1)
                board.value.splice(0, 0, ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'])
                totalLinesCleared ++
            }
            }
        }
        counter = 0
    }
    totalLinesCleared = 0
}

//BOARD LOGIC END

//Component lifecycle
onMounted(() => {
    window.addEventListener('keydown', keyboardListener)
})

onUnmounted(() => {
    clearBoard()
    window.removeEventListener('keydown', keyboardListener)
})

</script>

<template>
    <div id="game" class="d-flex justify-center">
        <div class="stats d-flex flex-column justify-end">
            <StatDisplay/>
        </div>
        <div id="board" class="board d-flex flex-column"> 
            <div class="d-flex flex-row" v-for="(row, rowIdx) in renderedBoard" :key="rowIdx">
                <div class="cell hide-font" 
                v-for="(item, colIdx) in row" :key="colIdx" 
                :class="rowIdx < 4 ? 'hidden' : getTetrominoColor(item)"
                >
                    {{ item }}
                </div>
            </div>
        </div>
        <span class="nextBlock">
            <NextDisplay/>
        </span>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200&display=swap');

#game{
    width: 50vw;
    padding-top: 50px;
}

.overlayButton{
    position: absolute;
    opacity: 50%;
    color: black;
}
.hidden{
    display: none;
}

.nextBlock{
    justify-self: start;
    margin-top: 20px;
    margin-bottom: auto;
}
.stats{
    margin-bottom: 20px;
    align-self: end;
    text-align: right;
}
.board{
    margin:20px;
    border-radius: 4px;
    border: solid 2px #D5D6D8;
    border-style: none solid solid solid;
    font-family:'Roboto Mono', monospace;
    font-size: 12px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }

.cell{
    height: 30px;
    width: 30px;
    text-align: center;
    user-select: none;
    line-height: 4px;

}

.emptyCell{
    font-size: 40px;
}
.tetrominoI{
    background-image: linear-gradient(#68EFCE, #4DB5FA);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
}

.tetrominoL{
    background-image: linear-gradient(#F0853C, #E1520D);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
}

.tetrominoJ{
    background-image: linear-gradient(#3F83E9, #6B2ED3);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
}

.tetrominoO{
    background-image: linear-gradient(#FFE080, #FFAF78);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
}

.tetrominoS{
    background-image: linear-gradient(#02EA45, #369739);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
}

.tetrominoZ{
    background-image: linear-gradient(#ED354C, #A41E36);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
}

.tetrominoT{
    background-image: linear-gradient(#AE00D5, #7A0BB3);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
}

.tetrominosI{
    background-image: linear-gradient(#68EFCE, #4DB5FA);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
    opacity: 45%;
}

.tetrominosL{
    background-image: linear-gradient(#F0853C, #E1520D);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
    opacity: 45%;
}

.tetrominosJ{
    background-image: linear-gradient(#3F83E9, #6B2ED3);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
    opacity: 45%;
}

.tetrominosO{
    background-image: linear-gradient(#FFE080, #FFAF78);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
    opacity: 45%;
}

.tetrominosS{
    background-image: linear-gradient(#02EA45, #369739);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
    opacity: 45%;
}

.tetrominosZ{
    background-image: linear-gradient(#ED354C, #A41E36);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
    opacity: 45%;
}

.tetrominosT{
    background-image: linear-gradient(#AE00D5, #7A0BB3);
    border: solid 1px white;
    border-radius: 4px;
    color: rgba(255,255,255, 0);
    opacity: 45%;
}
</style>