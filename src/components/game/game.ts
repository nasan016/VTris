import { computed } from "@vue/reactivity";
import {ref} from "vue";

type Tetromino = "I" | "J" | "L" | "O" | "S" | "T" | "Z" | "."

type Shape = Array<Array<Tetromino>>

interface TetrominoShape {
    type: Tetromino,
    rotations: Array<Shape>
}

interface CurrentShape {
    shape: TetrominoShape,
    x: number,
    y: number,
    currentRotation: number,
}

const shapes: Array<TetrominoShape> = [
    {
        type: "I",
        rotations: [
            [
                [".", ".", ".", ".",],
                [".", ".", ".", ".",],
                ["I", "I", "I", "I",],
                [".", ".", ".", ".",],
            ],
            [
                [".", ".", "I", ".",],
                [".", ".", "I", ".",],
                [".", ".", "I", ".",],
                [".", ".", "I", ".",],
            ],
        ]
    },
    {
        type: "J",
        rotations: [
            [
                [".", ".", "."],
                ["J", "J", "J"],
                [".", ".", "J"],
            ],
            [
                [".", "J", "."],
                [".", "J", "."],
                ["J", "J", "."],
            ],
            [
                ["J", ".", "."],
                ["J", "J", "J"],
                [".", ".", "."],
            ],
            [
                [".", "J", "J"],
                [".", "J", "."],
                [".", "J", "."],
            ],
        ]
    },
    {
        type: "L",
        rotations: [
            [
                [".", ".", "."],
                ["L", "L", "L"],
                ["L", ".", "."],
            ],
            [
                ["L", "L", "."],
                [".", "L", "."],
                [".", "L", "."],
            ],
            [
                [".", ".", "L"],
                ["L", "L", "L"],
                [".", ".", "."],
            ],
            [
                [".", "L", "."],
                [".", "L", "."],
                [".", "L", "L"],
            ]
        ]
    },
    {
        type: "O",
        rotations: [
            [
                ["O", "O"],
                ["O", "O"]
            ]
        ]
    },
    {
        type: "S",
        rotations: [
            [
                [".", ".", "."],
                [".", "S", "S"],
                ["S", "S", "."],
            ],
            [
                [".", "S", "."],
                [".", "S", "S"],
                [".", ".", "S"],
            ]
        ]
    },
    {
        type: "T",
        rotations: [
            [
                [".", ".", "."],
                ["T", "T", "T"],
                [".", "T", "."],
            ],
            [
                [".", "T", "."],
                ["T", "T", "."],
                [".", "T", "."],
            ],
            [
                [".", "T", "."],
                ["T", "T", "T"],
                [".", ".", "."],
            ],
            [
                [".", "T", "."],
                [".", "T", "T"],
                [".", "T", "."],
            ],
        ]
    },
    {
        type: "Z",
        rotations: [
            [
                [".", ".", "."],
                ["Z", "Z", "."],
                [".", "Z", "Z"],
            ],
            [
                [".", ".", "Z"],
                [".", "Z", "Z"],
                [".", "Z", "."],
            ]
        ]
    },
    {
        type: ".",
        rotations: [
            [
                ["."]
            ]
        ]
    },
]

const currentShape = ref<CurrentShape>(initShape())

function initShape() {
    const shape = getRandomTetromino()
    return {
        shape: shape,
        x: 4,
        y: 3,
        currentRotation: Math.floor(Math.random() * shape.rotations.length),
    } as CurrentShape
}


function getRandomTetromino(): TetrominoShape {
    const rng = Math.floor(Math.random() * shapes.length)
    return shapes[rng]
}

function clearBoard() {
    board.value = emptyBoard
}

const emptyBoard: Array<Array<Tetromino>> = [
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
]

const board = ref(emptyBoard)

const renderedBoard = computed(() => {
    const shape = currentShape.value
    const rot = shape.currentRotation

    return board.value.map((row, y) => {
        if (y >= shape.y && y < shape.y + shape.shape.rotations[rot]?.length) {
            return row.map((col, x) => {
                const yIdx = y - shape.y
                const xIdx = x - shape.x

                if (x >= shape.x && x < shape.x + shape.shape.rotations[rot][yIdx]?.length) {
                    const tetromino = shape.shape.rotations[rot][yIdx][xIdx]
                    if (tetromino != '.' && col == '.') { 
                        return shape.shape.rotations[rot][yIdx][xIdx]
                    }
                    else { 
                        return col
                    }
                } else {
                    return col
                }
            })
        } else {
            return row
        }
    })
})

const tetrominoColorMap = {
    "I": "tetrominoI",
    "O": "tetrominoO",
    "J": "tetrominoJ",
    "L": "tetrominoL",
    "S": "tetrominoS",
    "Z": "tetrominoZ",
    "T": "tetrominoT",
    ".": "emptyCell",
}

function getTetrominoColor(item : Tetromino): string {
    return tetrominoColorMap[item] ?? ""
}

export {
    board,
    renderedBoard,
    getTetrominoColor,
    getRandomTetromino,
    clearBoard,
    shapes,
    currentShape,
    initShape,
};
export type {
    Shape,
    Tetromino,
    TetrominoShape,
    CurrentShape
};
