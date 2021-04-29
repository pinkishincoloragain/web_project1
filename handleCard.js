// 총 카드 갯수는 4*13 = 52

var player1 = new Array();
var player2 = new Array();
var player3 = new Array();
var player4 = new Array();

var allCards = new Array();
for (i = 0; i < 52; i++) {
  allCards[i] = i;
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
  var img = document.createElement("img"); // 이미지 객체 생성
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
  var res;
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
  var cards = document.getElementsByClassName("card");
  // alert(cards.length);
  for (var i = 0; i < cards.length; i++) {
    var each = cards.item(i);
    cardID = each.getAttribute("id");
    // alert(cardID);
    each.src = "files/cards/" + cardID + ".png";
    each.style.width = 50 + "px";
  }

  setTimeout(function () {
    flipCard();
  }, 1000);
}

var temp = null;

function setCard() {
  newCard("player1");
  newCard("player2");
  newCard("player3");
  newCard("player4");
  flipCard();
}

function roll() {
  alert("판을 엎습니다.");
  for (var i = 0; i <= 2160; i++) {
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
}

function calRank() {
  var res;
  res = calculate(player1);
  alert(res);

  calculate(player2);
  calculate(player3);
  calculate(player4);
}

function calculate(arr) {
  len = arr.length;

  var num = new Array(len);
  var alpha = new Array(len);
  var notsorted_alpha = new Array(len);
  var notsorted_num = new Array(len);

  var temp = new Array(len);
  var nu;
  var al;

  // S > D > H > C
  symbols = ["S", "D", "H", "C"];
  real_symbols = ["Spade", "Diamond", "Heart", "Clover"];

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

  num.sort(function (a, b) {
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

  for (i = 0; i < len; i++) {
    alert(num[i]);
    alert(alpha[i]);
  }

  // for (i = 0; i < len; i++) {
  //     alert(i + "card is num :");
  //     alert(num[i]);
  //     alert(" and alpha is ");
  //     alert(alpha[i]);
  // }

  // Royal Flush
  var cnt = 0;

  function RoyalFlush() {
    for (i = 0; i < 4; i++) {
      for (j = 0; j < len; j++) {
        if (symbols[i] == alpha[j]) {
          temp[cnt] = i;
          cnt++;
        }
      }
      if (cnt > 5) {
        if (
          alpha[0] == 1 &&
          alpha[1] == 10 &&
          alpha[2] == 11 &&
          alpha[3] == 12 &&
          alpha[4] == 13
        ) {
          return alpha[0] + " Royal flush";
        }
      }
    }

    return 0;
  }

  var res = RoyalFlush();
  if (res != -1) return res;

  // Straight Flush
  function StraightFlush() {
    sf1 = num[0];
    for (i = 0; i < len; i++) {}
  }

  // Four of a Kind

  // full House

  // Flush

  // Straight

  // Three of a Kind

  // Two Pair
  function TwoPair() {
    var pairIdx1 = -1;
    var pairIdx2 = -1;
    for (i = 0; i < len - 1; i++) {
      if (num[i] == num[i + 1]) {
        pairIdx1 = i;
      }
      break;
    }
    for (i = pairIdx1; i < len - 1; i++) {
      if (num[i] == num[i + 1]) {
        pairIdx2 = i;
      }
      break;
    }
    alert(pairIdx1);
    alert(pairIdx);

    if (pairIdx != -1) {
      var real = 0;
      for (real = 0; real < 4; real++) {
        if (symbols[real] == alpha[pairIdx]) {
          return (
            real_symbols[real] +
            " " +
            num[pairIdx] +
            " " +
            real_symbols[real] +
            " " +
            num[pairIdx + 1] +
            " Two Pair"
          );
        }
      }
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
      }
    }
    alert(pairIdx);

    if (pairIdx != -1) {
      var real = 0;
      for (real = 0; real < 4; real++) {
        if (symbols[real] == alpha[pairIdx]) {
          return (
            real_symbols[real] +
            " " +
            num[pairIdx] +
            " " +
            real_symbols[real] +
            " " +
            num[pairIdx + 1] +
            " Two Pair"
          );
        }
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

  return real_symbols[real] + " " + num[maxIdx] + " High Card";
}
