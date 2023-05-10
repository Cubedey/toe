movesmade = Math.floor(Math.random() * 2);
boardrequired = 0
freespace = true



function start(x) {
    resetgame()

    document.getElementById("startingpage").style.display = "none"
    if (x == 1) {
        document.getElementById("game2").style.display = "none"

        document.getElementById("game1").style.display = "flex"
        for (z = 1; z < 10; z++) {
            let dd = document.createElement("button")
            dd.style = "width:33.33%;height:33.33%;vertical-align:top;margin:0px;font-size:335%;color:white;background-color: rgb(20, 20, 20);"
            dd.id = z
            dd.setAttribute("onclick", "board1click(" + z.toString() + ")")
            document.getElementById("board1").appendChild(dd)
        }


    } else if (x == 2) {
        document.getElementById("game2").style.display = "flex"
        document.getElementById("game1").style.display = "none"

        for (y = 1; y < 10; y++) {
            let d = document.createElement("div")
            d.style = "width:33.33%;height:33.33%;vertical-align:top;margin:0px; display:flex;flex-wrap:wrap"
            d.id = y.toString()
            d.classList.add("bigsq")

            document.getElementById("board2").appendChild(d);
            for (z = 1; z < 10; z++) {
                let dd = document.createElement("button")
                dd.style = "width:33.33%;vertical-align:top;height:33.33%;margin:0px;font-size:135%;color:white;background-color: rgb(20, 20, 20);"
                dd.id = y.toString() + z.toString()
                dd.setAttribute('onclick', "board2click(" + dd.id.toString() + ")")
                document.getElementById(y.toString()).appendChild(dd)
            }
        }



        /*
        for (y=0; y<9;y++) {
            let d =document.createElement("div")
            d.style="width:100%;height:11.11%;margin:0px;justify-content:left;"
            d.id=y
            document.getElementById("board2").appendChild(d);
            for (z=0; z<9;z++) {
                let dd =document.createElement("button")
            dd.style="width:11.11%;height:100%;margin:0px;border:solid rgb(172, 172, 172);color:transparent;background-color: rgb(20, 20, 20);"
            dd.id=y.toString()+z
            dd.onclick="board2click("+y.toString()+z+")"
                document.getElementById(y).appendChild(dd)
            }
        }*/
    }

}

function board1click(x) {
    let d = document.getElementById(x)
    if (d.innerText != "X" && d.innerText != "O") {
        d.innerText = getWhosTurn()
        d.classList.add("done")

        movesmade++
        seeifwinner1()
    }
}
function board2click(x) {
    let d = document.getElementById(x)
    let currentboard = Math.floor(x / 10)
    if ((currentboard == boardrequired) || (freespace == true)) {
        if (d.innerText != "X" && d.innerText != "O") {
            freespace = false
            d.innerText = getWhosTurn()
            if (document.getElementById(boardrequired.toString()) != null) {
                document.getElementById(boardrequired.toString()).style.border = "none"
                document.getElementById(boardrequired.toString()).style.margin = "0px"
                document.getElementById(boardrequired.toString()).style.zIndex = "1"

            }
            if ((whowin(getcurrentBoard(currentboard)) != "none")) {
                let dd = document.getElementById(currentboard.toString())
                dd.classList.add("done")
                dd.style.fontSize = "750%"
                dd.style.justifyContent = "center"
                dd.style.alignContent = "center"

                dd.innerHTML = whowin(getcurrentBoard(currentboard))

                boardrequired = currentboard
            } else {
                boardrequired = x % 10
            }
            if (document.getElementById(boardrequired.toString()).classList.contains("done")) {
                freespace = true
            }
            if (boardrequired != 0) {
                let dd = document.getElementById(boardrequired.toString())
                dd.style.border = "10px solid white"
                dd.style.margin = "-10px"
                dd.style.zIndex = "10"
            }
            seeifwinner2()

            movesmade++

        }
    }
}
function getWhosTurn() {
    if (movesmade % 2 == 0) {
        return "X"
    }

    return "O"

}
function getcurrentBoard(i = -1) {
    arr = new Array(3)
    for (var l = 0; l < arr.length; l++) {
        arr[l] = new Array(3);
    }
    for (x = 1; x < 4; x++) {
        for (z = 1; z < 4; z++) {
            if (i == -1) {
                if (!document.getElementById(((3 * (x - 1) + z).toString())).classList.contains("done")) {
                    arr[x - 1][z - 1] = ""
                } else {
                    arr[x - 1][z - 1] = document.getElementById(((3 * (x - 1) + z).toString())).innerText

                }
            } else {
                arr[x - 1][z - 1] = document.getElementById(i.toString() + (3 * (x - 1) + z).toString()).innerText
            }
        }
    }
    return arr
}
function seeifwinner1() {
    if (whowin(getcurrentBoard()) != "none") {
        // document.getElementById("game1").style.display = "none"
        document.getElementById("startingpage").style.display = "flex"
        if (!whowin(getcurrentBoard()) != "-") {
            document.getElementById("starttextheader").textContent = whowin(getcurrentBoard()) + " has won a Squared Game! Play Again?"
        } else {
            document.getElementById("starttextheader").textContent = "Draw! No one has won a Squared Game! Play Again?"

        }
    }
}
function seeifwinner2() {
    if (whowin(getcurrentBoard()) != "none") {
        //  document.getElementById("game2").style.display = "none"
        document.getElementById("startingpage").style.display = "flex"
        if (!whowin(getcurrentBoard()) != "-") {
            document.getElementById("starttextheader").textContent = whowin(getcurrentBoard()) + " has won a Squared Game! Play Again?"
        } else {
            document.getElementById("starttextheader").textContent = "Draw! No one has won a Squared Game! Play Again?"

        }
    }
}
function whowin(arr) {
    for (x = 0; x < arr.length; x++) {
        if ((arr[x][0] == arr[x][1] && arr[x][1] == arr[x][2]) && (arr[x][0] != "") && (arr[x][0] != "-")) {
            return arr[x][0]
        }
    }
    for (x = 0; x < arr.length; x++) {
        if ((arr[0][x] == arr[1][x] && arr[1][x] == arr[2][x]) && (arr[0][x] != "") && (arr[x][0] != "-")) {

            return arr[0][x]
        }
    }
    for (x = 0; x < arr.length; x += 2) {
        if ((arr[x][0] == arr[1][1] && arr[1][1] == arr[2 - x][2]) && (arr[x][0] != "") && (arr[x][0] != "-")) {

            return arr[x][0]
        }
    }
    for (x = 0; x < arr.length; x++) {
        for (z = 0; z < arr.length; z++) {
            if (arr[x][z] == "" || arr[x][z] == "-") {
                return "none"
            }

        }
    }
    return "-"
}
function resetgame() {
    movesmade = 0
    document.getElementById("board1").innerHTML = ""
    document.getElementById("board2").innerHTML = ""

}