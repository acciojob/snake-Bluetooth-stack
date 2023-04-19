//your code here
const snake = document.querySelector('#pixel');
const container = document.querySelector('#gameContainer');
const score = document.querySelector("#scoreBoard");

let row = 1, column = 1;

let foodList = [
    // {
    //     left:40,
    //     top:60,
    //     id: foodItemId
    // }
];

function eatFood(){
    let snakeTop = (row-1)*10;
    let snakeLeft = (column-1)*10;
    let itemId;
    for(let i = 0; i<foodList.length; i++){
        if(foodList[i].left == snakeLeft && foodList[i].top == snakeTop){
            score.innerText = parseInt(score.innerText) + 10;
            itemId =  foodList[i].id;
        }
    }
    if(!itemId){
        return;
    }

    foodList = foodList.filter((food)=>{
        return food.id != itemId;
    });
    const captureFood = document.getElementById(itemId);
    container.removeChild(captureFood);
}


function moveRight(){
    eatFood();
    let curLeftOffset = (column-1)*10;
    snake.style.left = `${curLeftOffset+10}px`;
    column++;
    if(column===41){
        column = 1;
        snake.style.left = `0px`;
    }
}

function moveLeft(){
    eatFood();
    let curLeftOffset = (column-1)*10;
    snake.style.left = `${curLeftOffset-10}px`;
    column--;
    if(column===0){
        column = 40;
        snake.style.left = `390px`;
    }
}

function moveTop(){
    eatFood();
    let curTopOffset = (row-1)*10;
    snake.style.top = `${curTopOffset-10}px`;
    row--;
    if(row===0){
        row = 40;
        snake.style.top = `390px`;
    }
}

function moveBottom(){
    eatFood();
    let curTopOffset = (row-1)*10;
    snake.style.top = `${curTopOffset+10}px`;
    row++;
    if(row===41){
        row = 1;
        snake.style.top = `0px`;
    }
}


//set interval returns a unique id of itself that can be used later on 
//clearInterval() function to unregister the setInterval() function
let intervalId = setInterval(moveRight, 100);

//clearInterval() is used to stop or clear the setInterval() calls
// clearInterval(intervalId);

document.body.addEventListener("keyup", (e)=>{
    // console.log(e);
    if(['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)){
        clearInterval(intervalId);
    }
    if(e.key==='ArrowRight'){
        intervalId = setInterval(moveRight, 100);
    }
    else if(e.key==='ArrowLeft'){
        intervalId = setInterval(moveLeft, 100);
    }
    else if(e.key==='ArrowUp'){
        intervalId = setInterval(moveTop, 100);
    }
    else if(e.key==='ArrowDown'){
        intervalId = setInterval(moveBottom, 100);
    }
})

function generateOffset(){
    let number = parseInt(Math.random()*100);
    if(number > 40){
        return parseInt(number/10)*10;
    }
    return number*10;
}

function generateFood(){
    for(let i = 1; i<=5; i++){
        const foodItem = document.createElement('div');
        foodItem.className = "food";
        let id = "pixel"+(i+1);
        foodItem.id = id;
        let left = generateOffset();
        let top = generateOffset();
        // console.log("left: ",left, "top: ",top);
        let foodObject = {
            left:left,
            top: top,
            id: id
        };
        foodList.push(foodObject);
        foodItem.style.left = `${left}px`;
        foodItem.style.top = `${top}px`;
        container.appendChild(foodItem);
    }
}

window.addEventListener('load', generateFood);