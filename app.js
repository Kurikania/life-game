
let numTableN
let numTableM
let arr
let gamefield = document.getElementById('gamefield');
let numInput = document.getElementById('numInput');
let reset = document.getElementById('reset')
var timer
let file
let results

const uploadForm = document.querySelector('.upload')

var fileInput = $("#files");
var uploadButton = $("#upload");

uploadForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    arr = []
    var input = fileInput.get(0);

    var reader = new FileReader();
    if (input.files.length) {
        var textFile = input.files[0];
        reader.readAsText(textFile);
        $(reader).on('load', processFile);
    } else {
        alert('Please upload a file before continuing')
    } 
});

function processFile(e) {
    file = e.target.result;
      
    if (file && file.length) {
        results = JSON.parse(file)
        console.log(typeof(results))
        let m = results.arr.length;
        let n = results.arr[0].length;
        arr = results.arr
        buildTable(arr, m, n);
        timer = setInterval( function() { buildTable(getEight(arr), m, n) }, 1000)
    }
  }
  

reset.addEventListener('click', () => {
    clearInterval(timer)
})

numInput.addEventListener('submit', (e)=> {
    e.preventDefault();
    numTableM = parseInt(numInput.elements[0].value);
    numTableN = parseInt(numInput.elements[1].value);
    arr = placeLife(numTableM, numTableN)
    buildTable(arr, numTableM, numTableN);
    timer = setInterval( function() { buildTable(getEight(arr), numTableM, numTableN) }, 1000)
});



function buildTable(arr, m , n) {
    gamefield.innerHTML = "";
    let table = `<table class="table" >
                            <tbody> `
    const tableEnd =  ` </tbody>
                         </table>`
    for ( let i = 0 ; i < m ; i++) {
        table += `<tr>`;
        for ( let j = 0 ; j < n ; j++) {
            if (arr[i][j] === 1) {
                table += `<td class = "live" style = "width: ${m/100}%;  " ></td>`
            } else {
                table += `<td class = "dead"  style = "width: ${m/100}%; "></td>`
            }
        }
        table += `</tr>`
    }
table += tableEnd
gamefield.insertAdjacentHTML('afterbegin', table)
}



function placeLife (m, n) { 
    let a = new Array(m);
    for (var i = 0; i < m; i++) {
        a[i] = new Array(n);
        for (var j = 0; j < n; j++) {
            a[i][j] = 0
        }
    }
        for (let i = 0 ; i < m ; i++) { 
            for (let j = 0 ; j < n ; j++) { 
                rm = Math.floor( Math.random() * m) ;
                rn = Math.floor(Math.random() * n) ;
        if (a[rm][rn] != 1) { 
            a[rm][rn] = 1;
                    }
                }
            }
        console.log(a)  
        return a
    } 




    function getEight(a) {
        let b = new Array(a.length);
            for (var i = 0; i < a.length; i++) {
                 b[i] = new Array(a[i].length);
                    for (var j = 0; j < a[i].length; j++) {
                        b[i][j] = 0
                }
            }
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[i].length; j++) {
                let neighbours 
                if (i !== 0 && j !==0 && j < a[i].length - 1 && i < a.length - 1) {
                    neighbours = a[i+1][j+1] + a[i+1][j]+ a[i][j+1] + a[i][j-1]
                             + a[i][j+1]+ a[i-1][j] + a[i+1][j-1] + a[i-1][j-1] 
                } 
                if (i === 0 && j === 0) {
                    neighbours = a[i+1][j+1] + a[i+1][j] + a[i][j+1]
                }
                 if (i === 0 && j === a[i].length -1) {
                    neighbours = a[i+1][j-1] + a[i][j-1] + a[i + 1 ][j]
                }
                if (i === a.length -1 && j === a[i].length -1) {
                    neighbours = a[i-1][j-1] + a[i-1][j] + a[i][j-1]
                }
                if (i === a.length -1 && j === 0 ) {
                    neighbours = a[i-1][j] + a[i-1][j+1] + a[i][j+1]
                }

                if (i === a.length -1 && j !== 0 && j !== a[i].length -1) {
                    neighbours = a[i-1][j] + a[i-1][j-1] + a[i-1][j+1]
                    + a[i][j+1] + a[i][j-1]
                }
                if (i !== a.length -1 && i !== 0 && j === 0 ) {
                    neighbours = a[i-1][j] + a[i+1][j] + a[i-1][j+1] 
                    + a[i+1][j+1] + a[i][j+1]
                }
                if (i === 0 && j !== a[i].length -1 && j !== 0 ) {
                    neighbours = a[i+1][j] + a[i+1][j-1] + a[i+1][j+1] 
                    + a[i][j+1] + a[i][j+1]
                }
                if (i !==  0 && i !== a.length -1  && j === 0 && j !== a[i].length -1 ) {
                    neighbours = a[i-1][j] + a[i+1][j+1] + a[i-1][j+1]
                     + a[i+1][j] + a[i][j+1]
                }

                if (neighbours < 2) {
                    b[i][j] = 0
                } else if ( neighbours > 3) {
                    a[i][j] === 1 ? b[i][j] = 0 : b[i][j] = 0  
                } else if ( neighbours === 2 ) {
                    a[i][j] === 1 ? b[i][j] = 1 : b[i][j] = 0  
                } else if ( neighbours === 3 ) {
                     b[i][j] = 1  
                }
            }
        }
        arr = b
        return b
    }


    console.log("Вы можете загрузить json файл с вашим полем вручную через input или ввести размер поля для его генерации")
   


    // Дана доска размером M × N клеток. Клетка может находиться в одном из двух состояний: 1 — живая, 0 — мёртвая. 
    // Каждая клетка взаимодействует с восемью соседями. Правила таковы:
    
    // Живая клетка, у которой меньше двух живых соседей, погибает.
    
    // Живая клетка, у которой два или три живых соседа, выживает.
    
    // Живая клетка, у которой больше трёх живых соседей, погибает.
    
    // Мёртвая клетка, у которой три живых соседа, возрождается.
    
    // Напишите программу, которая будет:
    // — случайным образом генерить стартовое состояние;
    // — уметь получать его из файла (способ выбирается через параметры запуска в консоли);
    // — каждую секунду выводить в консоль новое состояние доски 