var temp = new Array();
var depth = 0;
// 총 카트 갯수는 4*13 = 52


function getName(num) {
    var alpha;
    var number;
    var res;

    alpha = num % 4;
    number = parseInt(num / 4) + 1;

    if (alpha == 0) {
        return (number + "C");
    }
    if (alpha == 1) {
        return (number + "D");
    }
    if (alpha == 2) {
        return (number + "H");
    }
    if (alpha == 3) {
        return (number + "S");
    }
}

for (i = 0; i < length(1000); i++) {
    temp[i] = Math.random(0, 52);
}

function getdepth() {
    depth++;
    return depth;
}