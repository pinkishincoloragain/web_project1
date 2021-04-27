// credit to https://codepen.io/jackcranston/pen/GdvYwd for random pantone color generator snippet

const target = document.querySelector(".container");
var colorCount = 100; // change this to choose number of colors
$(document).ready(function() {
    $(".container").hide(0).delay(500).fadeIn(500);
});
fetch(
        "https://raw.githubusercontent.com/Margaret2/pantone-colors/master/pantone-colors.json"
    )
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        for (i = 0; i < colorCount; i++) {
            var randNum = Math.ceil(Math.random() * data.names.length);
            createColor(data, randNum);
            scatterCards();
        }
        show(0);
    })
    .catch((err) => {
        console.log(err);
    });

function createColor(colors, randNum) {
    target.innerHTML += `<details>
  <summary style="background:${colors.values[randNum]}" class="color">
  <div class="color-title">
  <h1>${colors.names[randNum]}</h1>
</div>
</summary>
<div class="color-codes"><h1>${colors.values[randNum]}</h1>
</div>
</details>`;
}

function show(i) {
    var boxes = document.querySelectorAll("details");
    if (i < colorCount) {
        setTimeout(function() {
            boxes[i].classList.add("active");
            i++;
            show(i);
        }, 100);
    }
}

function scatterCards() {
    $("details")
        .each(function() {
            var rNum = Math.random() * 50 - 2;
            rNum *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
            var x = Math.random() * 50 - 5;
            var y = Math.random() * 50 - 5;
            x *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
            y *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

            $(this).css({
                "-webkit-transform": "rotate(" + rNum + "2deg)",
                "-moz-transform": "rotate(" + rNum + "2deg)",
                top: x,
                left: y
            });
        })
        .draggable({ stack: "details" });
}