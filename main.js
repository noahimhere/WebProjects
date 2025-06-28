const inputElement = document.getElementById("input");
let answer = "apple".toUpperCase();

function gameStart(){
    document.getElementById("container").innerHTML = "";
    answer = words[Math.floor(Math.random() * words.length)];
    answer = answer.toUpperCase();
    console.log(answer);
}


function enterkeypress(event) {
    if (event.keyCode !== 13){
        return
    }
    console.log(event.keyCode);

    const value = inputElement.value.toUpperCase();
    if (value.length !== 5){
        alert("Not 5 characters")
        return;
    }


    const result = ["0", "0", "0", "0", "0"];

    for(let i = 0; i < 5; i++){
        if(value[i] == answer[i]){
            result[i] = "correct"
        } 
        else if(answer.includes(value[i])){
            result[i] = "misplaced"
        }
        else{
            result[i] = "wrong"
        }
    }
    console.log(result)
    const container = document.getElementById("container");

    const resultHtml = `<div class="results">
    <div class="box ${result[0]}">${value[0]}</div>
    <div class="box ${result[1]}">${value[1]}</div>
    <div class="box ${result[2]}">${value[2]}</div>
    <div class="box ${result[3]}">${value[3]}</div>
    <div class="box ${result[4]}">${value[4]}</div>
    </div>`;

    container.innerHTML += resultHtml;
    inputElement.value = "";
}

inputElement.addEventListener('keyup', enterkeypress)
gameStart();