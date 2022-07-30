import {ref} from "vue";

const shapes = ["I", "J", "L", "O", "S", "T", "Z"]

function getRandomTetromino(){
    const rng : number = Math.floor(Math.random() * shapes.length)
    return shapes[rng]
}

const board : any = ref([
// X: 0    1    2    3    4    5    6    7    8    9      Y:
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //0 [Spawn Region]
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //1 [Spawn Region]
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //2 [Spawn Region]
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //3 [Spawn Region]
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //4
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //5
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //6
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //7
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //8
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //9
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //10
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //11
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //12
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //13
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //14
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //15
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //16
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //17
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //18
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //19
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //20
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //21
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //22
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], //23
])


function getTetrominoColor(item : any){
    switch (item.toString()) {
        case "I":
            return "tetrominoI"
            break;
        case "O":
            return "tetrominoO"
            break;
        case "J":
            return "tetrominoJ"
            break;
        case "L":
            return "tetrominoL"
            break;
        case "S":
            return "tetrominoS"
            break;
        case "Z":
            return "tetrominoZ"
            break;
        case "T":
            return "tetrominoT"
            break;
        case "sI":
            break
        case "sO":
            break
        case "sJ":
            break
        case "sL":
            break
        case "sS":
            break
        case "sZ":
            break
        case "sT":
            break
        case ".":
            return "emptyCell"
            break;
    }
}

function isString(x : any) { 
    return Object.prototype.toString.call(x) === "[object String]" 
  } 

export {
    board,
    getTetrominoColor,
    isString,
    getRandomTetromino
}