var running = false;
var savechoice = ""
var saveaccomplishments = ""
var endings = ["diewealthywitnofam", "diewealthywitfam", "diehomeless", "fbidie", "marry+die"]
var endingsreached = 0;
function start() {
    running = true;
    $("#startingpage").hide();
}

var g1 = ["left", "middle", "right"]
var g2 = ["leftname", "middlename", "rightname"]
var g3 = ["leftalt", "middlealt", "rightalt"]
var g4 = ["leftreq", "middlereq", "rightreq"]


$(document).ready(function () {

    $(".choicepage").each(function (i, element) {
        for (x in g1) {
            if ($(element).attr(g1[x]) !== undefined) {
                if ($(element).attr(g3[x]) !== undefined) {
                    $(element).append("<button class='choicebutton' linkto='" + $(element).attr(g1[x]) + "' alt='" + $(element).attr(g3[x]) + "' req='" + $(element).attr(g4[x]) + "'>" + $(element).attr(g2[x]) + "</button>");

                } else {
                    $(element).append("<button class='choicebutton' linkto='" + $(element).attr(g1[x]) + "'>" + $(element).attr(g2[x]) + "</button>");

                }
            }
        }

        if ($(element).attr("continue") !== undefined) {
            if ($(element).attr("continuealt") !== undefined) {
                $(element).append("<button class='choicebutton' linkto='" + $(element).attr("continue") + "' alt='" + $(element).attr("continuealt") + "' req='" + $(element).attr("continuereq") + "'>Continue</button>");

            } else {
                $(element).append("<button class='choicebutton' linkto='" + $(element).attr("continue") + "'>Continue</button>");
            }
        }
        $(element).append("<br><br><button id='resetbutton' onclick='reset()'>Reset</button>");

    }

    )

    $(".choicebutton").click(function () {
        failedreq = false
        failedor = true
        ranreqor = false
        saveaccomplishments = saveaccomplishments + $(this).attr("linkto")
        savechoice = savechoice + ($(this).text())
        $(this).parent().hide()
        if ($(this).attr("alt") == undefined) {
            $("div[id='" + $(this).attr("linkto") + "']").show()
        } else {
            if ($(this).attr("req").includes("requires")) {
                req = $(this).attr("req").replace("requires:", '')
                reqarray1 = req.split(",")
                reqarray2 = []

                for (x in reqarray1) {
                    if (reqarray1[x].includes("/")) {
                        reqarray2 = [reqarray2 + reqarray1[x]]
                        reqarray1.splice(x, 1)

                    }

                }
                for (x in reqarray1) {
                    if (!savechoice.includes(reqarray1[x])) {
                        failedreq = true
                    }
                }
                for (x in reqarray2) {
                    ranreqor = true
                    reqor = reqarray2[x].split("/")
                    for (y in reqor) {
                        if (savechoice.includes(reqor[x])) {
                            failedor = false
                        }
                    }

                }
                if (ranreqor == false) {
                    failedor = false
                }
                if (failedreq == false && failedor == false) {
                    $("div[id='" + $(this).attr("linkto") + "']").show()

                } else {
                    $("div[id='" + $(this).attr("alt") + "']").show()

                }
            } else if ($(this).attr("req").includes("takes")) {
                req = $(this).attr("req").replace("takes:", '')
                reqarray1 = req.split(",")
                reqarray2 = []

                for (x in reqarray1) {
                    if (reqarray1[x].includes("/")) {
                        reqarray2 = [reqarray2 + reqarray1[x]]
                        reqarray1.splice(x, 1)

                    }

                }
                for (x in reqarray1) {
                    if (!saveaccomplishments.includes(reqarray1[x])) {
                        failedreq = true
                    }
                }
                for (x in reqarray2) {
                    ranreqor = true
                    reqor = reqarray2[x].split("/")
                    for (y in reqor) {
                        if (saveaccomplishments.includes(reqor[x])) {
                            failedor = false
                        }
                    }

                }
                if (ranreqor == false) {
                    failedor = false
                }
                if (failedreq == false && failedor == false) {
                    $("div[id='" + $(this).attr("linkto") + "']").show()

                } else {

                    $("div[id='" + $(this).attr("alt") + "']").show()

                }
            }
        }
        for (x in endings) {
            z = endings[x]
            if (saveaccomplishments.includes(z)) {
                endings.splice(x, 1)
                engingsreached +=1
                document.getElementById("EndingsUnlocked").innerHTML="Endings Reached: " +endingsreached
            }
        }
    })


}

);
function reset() {
     savechoice = ""
     saveaccomplishments = ""
    $(".choicepage").hide()
    $("#birth").show()


}
// var r = document.getElementsByClassName("choicepage");
// var v = document.createElement("button");
// r[1].append(v);