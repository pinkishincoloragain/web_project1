// 총 카드 갯수는 4*13 = 52

var player1 = new Array();
var player2 = new Array();
var player3 = new Array();
var player4 = new Array();
var catchPhrase = new Array();
var result = new Array();
var sortedPlayer = new Array();

var allCards = new Array();
for (i = 0; i < 52; i++) {
    allCards[i] = i;
}

function openNav() {
    document.getElementById("mysidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mysidenav").style.width = "0";
}

function getCard(id, card) {
    if (id == "player1") {
        player1.push(card);
    } else if (id == "player2") {
        player2.push(card);
    } else if (id == "player3") {
        player3.push(card);
    } else if (id == "player4") {
        player4.push(card);
    } else {
        alert("wrong put");
    }
}

function showCard(id, name) {
    var img = document.createElement("img");
    img.src = "files/cards/" + name + ".png";
    img.style.width = 50 + "px";
    if (id != "player1") img.setAttribute("class", "card");
    else img.setAttribute("class", "mycard");
    img.setAttribute("id", name);
    document.getElementById("playerholder" + id.substr(6, 1)).appendChild(img);
}

function getName(num) {
    var alpha;
    var number;
    var i;

    alpha = num % 4;
    number = parseInt(num / 4) + 1;

    if (alpha == 0) {
        return number + "C";
    }
    if (alpha == 1) {
        return number + "D";
    }
    if (alpha == 2) {
        return number + "H";
    }
    if (alpha == 3) {
        return number + "S";
    }
}

function newCard(id) {
    randNum = Math.floor(Math.random() * allCards.length);

    num = allCards.splice(randNum, 1);
    cardName = getName(num);
    // alert("Card is " + cardName);
    getCard(id, cardName);
    showCard(id, cardName);
    // alert(id);
    if (id != "player1") flipCard();
}

function flipCard() {
    var cards = document.getElementsByClassName("card");
    // alert(cards.length);
    for (var i = 0; i < cards.length; i++) {
        var each = cards.item(i);
        each.src = "files/cards/red_back.png";
        each.style.width = 50 + "px";
    }
}

function revealCard() {
    bgm_player();
    var cards = document.getElementsByClassName("card");
    // alert(cards.length);
    for (var i = 0; i < cards.length; i++) {
        var each = cards.item(i);
        cardID = each.getAttribute("id");
        // alert(cardID);
        each.src = "files/cards/" + cardID + ".png";
        each.style.width = 50 + "px";
    }
    setTimeout(() => {
        flipCard();
    }, 2000);
}

var temp = null;

function setCard() {
    if (allCards.length == 0) {
        alert("패를 다 써서 아귀가 " + user + "를 죽여버립니다.");
        for (var i = 0; i <= 4320; i++) {
            setTimeout("rotateit(" + i + ")", i);
        }
        setTimeout(() => {
            location.reload();
        }, 2000);
    }

    newCard("player1");
    newCard("player2");
    newCard("player3");
    newCard("player4");
    flipCard();
}

function roll() {
    alert("판을 엎고, " + user + "이(가) 도박장을 떠납니다.");
    for (var i = 0; i <= 4320; i++) {
        setTimeout("rotateit(" + i + ")", i);
    }

    newGame();
}

function rotateit(x) {
    x = parseInt(x);
    document.body.setAttribute(
        "style",
        " -moz-transform: rotate(" +
        x +
        "deg); -moz-transform-origin: 50% 50%; -webkit-transform: rotate(" +
        x +
        "deg); -webkit-transform-origin: 50% 50%; -o-transform: rotate(" +
        x +
        "deg); -o-transform-origin:50% 50%; -ms-transform: rotate(" +
        x +
        "deg); -ms-transform-origin: 50% 50%; transform: rotate(" +
        x +
        "deg); transform-origin: 50% 50%;"
    );
}

function newGame() {
    var cards = document.getElementsByClassName("card");
    while (cards.length != 0) {
        var each = cards.item(0);
        each.parentNode.removeChild(each);
        cards = document.getElementsByClassName("card");
    }

    var mycards = document.getElementsByClassName("mycard");
    while (mycards.length != 0) {
        var each = mycards.item(0);
        each.parentNode.removeChild(each);
        mycards = document.getElementsByClassName("mycard");
    }

    for (i = 0; i < 52; i++) {
        allCards[i] = i;
    }

    player1 = new Array();
    player2 = new Array();
    player3 = new Array();
    player4 = new Array();
    catchPhrase = new Array();

    setTimeout(() => {
        location.reload();
    }, 2000);
}

function calRank() {
    var i = 0;
    result[0] = calculate(player1);
    // alert("player1: " + result[0]);

    result[1] = calculate(player2);
    // alert("player2: " + result[1]);

    result[2] = calculate(player3);
    // alert("player3: " + result[2]);

    result[3] = calculate(player4);
    // alert("player4: " + result[3]);

    for (i = 0; i < 4; i++) {
        if (result[i] == -1) {
            alert("모든 플레이어의 패가 적어도 한 장씩은 있어야 합니다.");
            return;
        }
    }

    document.getElementById("cuser").innerHTML = catchPhrase[0];
    for (i = 2; i <= 4; i++) {
        document.getElementById("c" + i).innerHTML = catchPhrase[i - 1];
    }

    // alert(user + "(이)의 패는 " + catchPhrase[0] + " 입니다")
    // alert("고니의 패는 " + catchPhrase[1] + " 입니다");
    // alert("아귀의 패는 " + catchPhrase[2] + " 입니다");
    // alert("정마담의 패는 " + catchPhrase[3] + " 입니다");

    var cards = document.getElementsByClassName("card");
    // alert(cards.length);
    for (var i = 0; i < cards.length; i++) {
        var each = cards.item(i);
        cardID = each.getAttribute("id");
        // alert(cardID);
        each.src = "files/cards/" + cardID + ".png";
        each.style.width = 50 + "px";
    }

    var maxScore = 0;
    var j = 0;
    var sameValue = new Array();
    for (i = 0; i < 4; i++) {
        if (maxScore < result[i]) {
            maxScore = result[i];
            sortedPlayer.unshift(i);
        } else {
            sortedPlayer.push(i);
        }
    }

    winPlayer = sortedPlayer[0] + 1;
    var Fullname = [user, "고니", "아귀", "정마담"];

    // alert(sortedPlayer[0]);
    var winner = document.getElementById("winner_" + winPlayer);
    winner.style = "border-width: thick;";
    winner.style = "border-color: green;";
    winner.style = "border-style: groove;";
    var text = document.createTextNode("WINNER !!");
    text.style = "font-size: 50px";
    text.style = "margin-top: 0px;";
    text.style = "text-align: center";

    winner.appendChild(text);

    // winner.style = "border-width:10px";

    // var maxScore_idx;
    // for (j = 0; j < 4; j++) {
    //     if (result[i] == maxScore) {
    //         maxScore_idx = j;
    //         break;
    //     }
    // }
    // document.getElementById("playerholder" + maxScore_idx);

    // if (maxScore_idx == 0) {
    //     // alert(user + "(이)가 최종 승자입니다!!");
    // } else if (maxScore_idx == 1) {
    //     // alert("고니" + "가 최종 승자입니다!!");
    // } else if (maxScore_idx == 2) {
    //     // alert("아귀" + "가 최종 승자입니다!!");
    // } else {
    //     // alert("정마담" + "이 최종 승자입니다!!");
    // }
    // window.name = "winnerpage";
    // window.open("winnerpage.html",
    //     "childForm", "width=1000, height=2000, resizable = no, scrollbars = no");
}

function calculate(arr) {
    len = arr.length;

    if (len == 0) {
        return -1;
    }

    var num = new Array(len);
    var alpha = new Array(len);
    var notsorted_alpha = new Array(len);
    var notsorted_num = new Array(len);

    var temp = new Array(len);
    var nu;
    var al;

    // S > D > H > C
    var symbols = ["S", "D", "H", "C"];
    var real_symbols = ["Spade", "Diamond", "Heart", "Clover"];
    var special = ["Ace", "Jack", "Queen", "King"];

    // sort cards
    for (var i = 0; i < len; i++) {
        cur = arr[i];
        if (Number.isInteger(parseInt(cur[1]))) {
            nu = parseInt(cur[0] + cur[1]);
            al = cur[2];
        } else {
            nu = cur[0];
            al = cur[1];
        }

        num[i] = nu;
        notsorted_num[i] = nu;
        alpha[i] = al;
        notsorted_alpha[i] = al;
    }

    num.sort(function(a, b) {
        return a - b;
    });

    for (i = 0; i < len; i++) {
        for (var j = 0; j < len; j++) {
            if (num[i] == notsorted_num[j]) {
                alpha[i] = notsorted_alpha[j];
                notsorted_num.splice(j, 1);
                notsorted_alpha.splice(j, 1);
                break;
            }
        }
    }

    // for (i = 0; i < len; i++) {
    //     alert(num[i]);
    //     alert(alpha[i]);
    // }

    // Royal Flush
    var cnt = 0;

    function RoyalFlush() {
        var pairIdx = -1;
        var cnt = 0;
        for (i = 0; i < len - 1; i++) {
            if (num[i] + 1 == num[i + 1] && alpha[i] == alpha[i + 1]) {
                cnt++;
            } else if (num[i + 1] != num[i] && alpha[i] != alpha[i + 1]) {
                cnt = 0;
            }
            if (cnt == 4) {
                pairIdx = i;
                break;
            }
        }
        if (pairIdx != -1) {
            catchPhrase.push("Royal Flush !!");
            return 300000;
        }
        return -1;
    }

    res = RoyalFlush();
    if (res != -1) return res;

    // Straight Flush
    function StraightFlush() {
        var pairIdx = -1;
        var cnt = 0;
        for (i = 0; i < len - 1; i++) {
            if (num[i] + 1 == num[i + 1] && alpha[i] == alpha[i + 1]) {
                cnt++;
            } else if (num[i + 1] != num[i] && alpha[i] != alpha[i + 1]) {
                cnt = 0;
            }
            if (cnt == 5) {
                pairIdx = i;
                break;
            }
        }

        if (pairIdx != -1) {
            if (num[pairIdx] > 10) {
                var temp2 = num[pairIdx] - 10;
                catchPhrase.push(special[temp2] + " Straight Flush");
                return 100000 + num[pairIdx];
            } else if (num[pairIdx] == 1) {
                catchPhrase.push(special[0] + " Straight Flush");
                return 100000 + num[pairIdx];
            } else {
                catchPhrase.push(num[pairIdx] + " Straight Flush");
                return 100000 + parseInt(num[pairIdx]);
            }
        }
        return -1;
    }

    res = StraightFlush();
    if (res != -1) return res;

    // Four of a Kind
    function FourOfaKind() {
        var pairIdx = -1;
        for (i = 0; i < len - 3; i++) {
            if (
                num[i] == num[i + 1] &&
                num[i] == num[i + 2] &&
                num[i] == num[i + 3]
            ) {
                pairIdx = i;
                break;
            }
        }

        if (pairIdx != -1) {
            if (num[pairIdx] > 10) {
                var temp2 = num[pairIdx] - 10;
                catchPhrase.push(special[temp2] + " four of a Kind");
                return 50000 + num[pairIdx];
            } else if (num[pairIdx] == 1) {
                catchPhrase.push(special[0] + " four of a Kind");
                return 50000 + num[pairIdx];
            } else {
                catchPhrase.push(num[pairIdx] + " four of a Kind");
                return 50000 + parseInt(num[pairIdx]);
            }
        }
        return -1;
    }

    res = FourOfaKind();
    if (res != -1) return res;

    // full House
    function FullHouse() {
        var pairIdx = -1;
        var pairIdx2 = -1;

        for (i = 0; i < len - 1; i++) {
            if (num[i] == num[i + 1]) {
                pairIdx = i;
                break;
            }
        }
        if (pairIdx != -1) {
            for (i = pairIdx; i < len - 2; i++) {
                if (
                    num[i] == num[i + 1] &&
                    num[i] == num[i + 2] &&
                    num[i] != num[pairIdx]
                ) {
                    pairIdx2 = i;
                    break;
                }
            }
            if (pairIdx2 != -1) {
                catchPhrase.push("Full House");
                return 30000 + parseInt(num[pairIdx2]);
            }
        }
        return -1;
    }

    res = FullHouse();
    if (res != -1) return res;

    // Flush
    function Flush() {
        var pairIdx = -1;
        var cnt = 0;
        for (i = 0; i < len; i++) {
            if (alpha[i] == alpha[i + 1]) {
                cnt++;
            }
            if (cnt == 5) {
                pairIdx = i;
                break;
            }
        }

        if (pairIdx != -1) {
            catchPhrase.push(alpha[pairIdx] + " Flush");
            return 10000 + parseInt(num[pairIdx]);
        }
        return -1;
    }

    res = Flush();
    if (res != -1) return res;

    // Straight
    function Straight() {
        var pairIdx = -1;
        var cnt = 0;
        for (i = 0; i < len - 1; i++) {
            if (num[i] == num[i + 1]) {
                continue;
            } else if (num[i] + 1 == num[i + 1]) {
                cnt++;
            } else {
                cnt = 0;
            }
            if (cnt == 5) {
                pairIdx = i;
                break;
            }
        }

        if (pairIdx != -1) {
            if (num[pairIdx] > 10) {
                var temp2 = num[pairIdx] - 10;
                catchPhrase.push(special[temp2] + " Straight");
                return 5000 + num[pairIdx];
            } else if (num[pairIdx] == 1) {
                catchPhrase.push(special[0] + " Straight");
                return 5000 + num[pairIdx];
            } else {
                catchPhrase.push(num[pairIdx] + " Straight");
                return 5000 + parseInt(num[pairIdx]);
            }
        }
        return -1;
    }
    res = Straight();
    if (res != -1) return res;

    // Three of a Kind
    function ThreeOfaKind() {
        var pairIdx = -1;
        for (i = 0; i < len - 2; i++) {
            if (num[i] == num[i + 1] && num[i] == num[i + 2]) {
                pairIdx = i;
                break;
            }
        }

        if (pairIdx != -1) {
            if (num[pairIdx] > 10) {
                var temp2 = num[pairIdx] - 10;
                catchPhrase.push(special[temp2] + " Three of a Kind");
                return 3000 + num[pairIdx];
            } else if (num[pairIdx] == 1) {
                catchPhrase.push(special[0] + " Three of a Kind");
                return 3000 + num[pairIdx];
            } else {
                catchPhrase.push(num[pairIdx] + " Three of a Kind");
                return 3000 + num[pairIdx];
            }
        }
        return -1;
    }

    res = ThreeOfaKind();
    if (res != -1) return res;

    // Two Pair
    function TwoPair() {
        var pairIdx1 = -1;
        var pairIdx2 = -1;
        for (i = 0; i < len - 1; i++) {
            if (num[i] == num[i + 1]) {
                pairIdx1 = i;
                break;
            }
        }
        for (i = pairIdx1 + 1; i < len - 1; i++) {
            if (num[i] == num[i + 1]) {
                pairIdx2 = i;
                break;
            }
        }

        if (pairIdx1 != -1 && pairIdx2 != -1) {
            var ph1;
            var ph2;
            if (num[pairIdx1] > 10) {
                var temp2 = num[pairIdx1] - 10;
                ph1 = special[temp2];
            } else if (num[pairIdx1] == 1) {
                ph1 = special[0];
                return 1000 + num[pairIdx1];
            } else {
                ph1 = num[pairIdx1];
            }

            if (num[pairIdx2] > 10) {
                var temp2 = num[pairIdx2] - 10;
                ph2 = special[temp2];
            } else if (num[pairIdx2] == 1) {
                ph2 = special[0];
                return 1000 + num[pairIdx2];
            } else {
                ph2 = num[pairIdx2];
            }
            catchPhrase.push(ph1 + " " + ph2 + " Two Pair");
            return 2000 + parseInt(num[pairIdx1]) + parseInt(num[pairIdx2]);
        }
        return -1;
    }
    res = TwoPair();
    if (res != -1) return res;

    // One Pair
    function OnePair() {
        var pairIdx = -1;
        for (i = 0; i < len - 1; i++) {
            if (num[i] == num[i + 1]) {
                pairIdx = i;
                break;
            }
        }
        if (pairIdx != -1) {
            if (num[pairIdx] > 10) {
                var temp2 = num[pairIdx] - 10;
                catchPhrase.push(special[temp2] + " One Pair");
                return 1000 + num[pairIdx];
            } else if (num[pairIdx] == 1) {
                catchPhrase.push(special[0] + " One Pair");
                return 1000 + num[pairIdx];
            } else {
                catchPhrase.push(num[pairIdx] + " One Pair");
                return 1000 + parseInt(num[pairIdx]);
            }
        }
        return -1;
    }

    res = OnePair();
    if (res != -1) return res;

    // High Card
    var maxNum = 0;
    var maxIdx = 0;

    for (i = 0; i < len; i++) {
        if (maxNum < num[i]) {
            maxNum = num[i];
            maxIdx = i;
        }
    }

    var real = 0;
    for (real = 0; real < 4; real++) {
        if (symbols[real] == alpha[maxIdx]) break;
    }

    if (num[maxIdx] > 10) {
        var temp2 = num[maxIdx] - 10;
        catchPhrase.push(real_symbols[real] + " " + special[temp2] + " High Card");
        return num[maxIdx] * 10 + real;
    } else if (num[maxIdx] == 1) {
        catchPhrase.push(real_symbols[real] + " " + special[0] + " High Card");
        return num[maxIdx] * 10 + real;
    } else {
        catchPhrase.push(real_symbols[real] + " " + num[maxIdx] + " High Card");
        return num[maxIdx] * 10 + real;
    }
}

var bgm_count = 0;
var audio1_count = 0;
var audio2_count = 0;
var audio3_count = 0;

function bgm_player() {
    var audio = new Audio("/files/bgm.mp3");
    audio.volume = 0.05;
    if (bgm_count == 0) audio.play();
    bgm_count = 1;
}

function p1_player() {
    var audio = new Audio("/files/고니.mp3");
    if (audio1_count == 0) audio.play();
    audio1_count = 1;
}

function p2_player() {
    var audio = new Audio("/files/아귀.mp3");
    if (audio2_count == 0) audio.play();
    audio2_count = 1;
}

function p3_player() {
    var audio = new Audio("/files/정마담.mp3");
    if (audio3_count == 0) audio.play();
    audio3_count = 1;
}

function resultCard() {
    var cards = document.getElementsByClassName("card");
    // alert(cards.length);
    for (var i = 0; i < cards.length; i++) {
        var each = cards.item(i);
        cardID = each.getAttribute("id");
        // alert(cardID);
        each.src = "files/cards/" + cardID + ".png";
        each.style.width = 50 + "px";
    }
}

// function display() {
//     var playerImg = new Array();
//     console.log("pfish");
//     playerImg = ["user.png", "고니.png", "아귀.png", "정마담.jpg"];
//     var temp = 0;
//     for (var i = 0; i < 4; i++) {
//         var img = document.createElement("img");
//         img.src = "files/" + playerImg[i];
//         img.style.width = 200 + "px";
//         document.getElementById("winnerbox" + i).appendChild(img);
//     }

//     alert(player1.length);
//     for (i = 0; i < player1.length; i++) {
//         img = document.createElement("img");
//         img.src = "files/cards/" + player1[i];
//         alert(player1[i]);
//         img.style.width = 200 + "px";
//         document.getElementById("winnerbox" + i).appendChild(img);
//     }
// }