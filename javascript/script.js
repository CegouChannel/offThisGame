let canv = document.querySelector("canvas");
let ctx = canv.getContext("2d");

canv.width = 540;
canv.height = 540;


let lampOn = new Image();
lampOn.src = './assets/light_on.png'

let lampOff = new Image();
lampOff.src = './assets/light_off.png'

lampOff.onload = () => {

    let lvls = [
        [
            [1, 0, 0, 1, 1],
            [0, 0, 1, 0, 1],
            [0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1],
            [1, 1, 0, 0, 1],
        ],
        [
            [1, 0, 1, 0, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 0, 1, 0, 1],
        ],
        [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ],
        [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
        ],
        [
            [1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1],
        ],
        [
            [0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 1, 0],
            [0, 0, 1, 1, 1],
            [0, 1, 0, 1, 0],
            [1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0],
        ],
        [
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 1, 0, 1, 1],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1],
        ],
        [
            [0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0],
        ],
    ]
    let lvl = lvls[0];

    let x = 0;
    let y = 0;
    let arrLamps = [];

    let arrowsLvl = document.querySelectorAll("img[class='lvlChange']")
    arrowsLvl.forEach((arrow) => {
        arrow.addEventListener('click', () => {
            activatePanelControl(arrow.getAttribute('name'))
        });
    })

    let resetLvlButton = document.querySelector("img[class='again']");
    resetLvlButton.addEventListener('click', () => {
        resetLvl();
    })

    function createObjLamps() {
        for (let i = 0; i < lvl.length; i++) {
            let test = lvl[i];
            for (let j = 0; j < test.length; j++) {
                let image = (test[j] == 0 ? lampOff : lampOn)
                let lamp = {
                    line: i,
                    position: j,
                    image: image,
                    x: x,
                    y: y,
                    rangeClickX: x + 110,
                    rangeClickY: y + 110,
                }
                arrLamps.push(lamp);
                x += 110;
            }
            y += 110;
            x = 0;
            draw();
            console.log(arrLamps)
        }
    }

    function draw() {
        for (let i = 0; i < arrLamps.length; i++) {
            ctx.clearRect(arrLamps[i].x, arrLamps[i].y, 100, 100)
            ctx.drawImage(arrLamps[i].image, arrLamps[i].x, arrLamps[i].y, 100, 100)
        }
    }

    function activatePanelControl(operation) {
        let getValLvl = document.querySelector("input[class='changed_lvl']")
        if (operation == 'left') {
            if (getValLvl.getAttribute('value') == '1') {
                getValLvl.setAttribute('value', String(arrLamps.length))
            } else {
                getValLvl.setAttribute('value', String(Number(getValLvl.getAttribute('value')) - 1))
            }
        } else {
            if (getValLvl.getAttribute('value') == String(arrLamps.length)) {
                getValLvl.setAttribute('value', '1');
            } else {
                getValLvl.setAttribute('value', String(Number(getValLvl.getAttribute('value')) + 1))
            }
        }

        if (arrLamps.length != 0) {
            arrLamps.length = 0
            x = 0;
            y = 0;
        };
        lvl = lvls[Number(getValLvl.getAttribute('value')) - 1];
        createObjLamps()
    }

    function resetLvl() {
        let getValLvl = document.querySelector("input[class='changed_lvl']")
        if (arrLamps.length != 0) {
            arrLamps.length = 0
            x = 0;
            y = 0;
        };
        lvl = lvls[Number(getValLvl.getAttribute('value')) - 1];
        createObjLamps()
    }

    canv.addEventListener('click', (event) => {
        let clickX = event.offsetX;
        let clickY = event.offsetY;
        successClick(clickX, clickY)
    })

    function successClick(clickX, clickY) {
        for (let i = 0; i < arrLamps.length; i++) {
            if (arrLamps[i].x <= clickX && clickX <= arrLamps[i].rangeClickX && arrLamps[i].y <= clickY && clickY <= arrLamps[i].rangeClickY) {
                arrLamps[i].image = (arrLamps[i].image == lampOn ? lampOff : lampOn);
                switchCloseLamps(arrLamps[i].line - 1, arrLamps[i].position);
                switchCloseLamps(arrLamps[i].line, arrLamps[i].position - 1);
                switchCloseLamps(arrLamps[i].line + 1, arrLamps[i].position);
                switchCloseLamps(arrLamps[i].line, arrLamps[i].position + 1);
                draw();
                return false;
            }
        }
    }

    function switchCloseLamps(line, position) {
        for (let i = 0; i < arrLamps.length; i++) {
            if (arrLamps[i].line == line && arrLamps[i].position == position) {
                arrLamps[i].image = (arrLamps[i].image == lampOn ? lampOff : lampOn);
            }
        }

        setTimeout(() => {
            let obj = arrLamps.find(elem => elem.image === lampOn);
            if (obj === undefined) {
                alert('Игра завершена');
                return false;
            }
        }, 300);
    }
    createObjLamps();
}
