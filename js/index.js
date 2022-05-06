let blockContainer = document.querySelector('.blocks-container')
let blockRight = document.querySelector('.block-right')
let rightbtns = blockRight.querySelectorAll(".radio_input")
let blockLeft = document.querySelector('.block-left')
let leftbtns = blockLeft.querySelectorAll(".radio_input");
let valueLeft = blockLeft.querySelector("[checked]");
valueLeft = valueLeft.value;
let valueRight = blockRight.querySelector("[checked]");
valueRight = valueRight.value
let leftcalcvalue = blockLeft.querySelector('.calc-value');
let rightcalcvalue = blockRight.querySelector('.calc-value');
let calcvalues = blockContainer.querySelectorAll('.calc-value')

let leftdetail = blockLeft.querySelectorAll('span');
let [leftfrom, leftrate, leftto] = leftdetail;
let rightdetail = blockRight.querySelectorAll('span');
let [rightfrom, rightrate, rightto] = rightdetail;
const info = async () => {
  var todayDate = new Date().toISOString().slice(0, 10);
  await fetch(`https://api.exchangerate.host/convert?from=${valueLeft}&to=${valueRight}&date=${todayDate}`)
    .then((response) => {
      return response.json()
    })
    .then((leftdata) => {
      leftfrom.innerText = valueLeft;
      leftto.innerText = valueRight;
      console.log(leftdata)
      console.log(leftdata.info.rate)
      leftrate.innerText = leftdata.info.rate;
      rightfrom.innerText = valueRight;
      rightto.innerText = valueLeft;
      fetch(`https://api.exchangerate.host/convert?from=${valueRight}&to=${valueLeft}&date=${todayDate}`)
        .then((response) => {
          return response.json();
        })
        .then((rightdata) => {
          rightrate.innerText = rightdata.info.rate
        })
    });
}

info()

const leftCalculator = async () => {
  let calcvalue = leftcalcvalue.value.split(" ");
  calcvalue = calcvalue.join("");
  calcvalue = Number(calcvalue);
  try {
    await fetch(`https://api.exchangerate.host/convert?from=${valueLeft}&to=${valueRight}&amount=${calcvalue}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        rightcalcvalue.value = data.result;
        var numberMask = IMask(rightcalcvalue, {
          mask: Number,
          signed: false,
          thousandsSeparator: ' ',
          padFractionalZeros: false,
          radix: '.',
          mapToRadix: [','],
          scale: 2
        });
      });
  }
  catch (error) {
    throw alert(`OOPS SMTG WENT WRONG`);
  }
}
const rightCalculator = async () => {
  let calcvalue = rightcalcvalue.value.split(" ");
  calcvalue = calcvalue.join("");
  calcvalue = Number(calcvalue);
  try {
    await fetch(`https://api.exchangerate.host/convert?from=${valueRight}&to=${valueLeft}&amount=${calcvalue}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        leftcalcvalue.value = data.result;
        var numberMask = IMask(leftcalcvalue, {
          mask: Number,
          signed: false,
          thousandsSeparator: ' ',
          padFractionalZeros: false,
          radix: '.',
          mapToRadix: [','],
          scale: 2
        });
      })
  }
  catch (error) {
    throw alert(`OOPS SMTG WENT WRONG`);
  }
}

leftcalcvalue.addEventListener("keyup", () => {
  leftCalculator();
})
rightcalcvalue.addEventListener("keyup", () => {
  rightCalculator();
})
// imask

calcvalues.forEach((item) => {
  var numberMask = IMask(item, {
    mask: Number,
    signed: false,
    thousandsSeparator: ' ',
    padFractionalZeros: false,
    radix: '.',
    mapToRadix: [','],
  });
})

let leftradios = blockLeft.querySelectorAll('input[type=radio][name="myRadio"]');
let rightradios = blockRight.querySelectorAll('input[type=radio][name="myRadio1"]');

leftradios.forEach(radio => {
  radio.addEventListener('change', () => {
    valueLeft = radio.value;
    leftCalculator();
  })
});

rightradios.forEach(radio => {
  radio.addEventListener('change', () => {
    valueRight = radio.value;
    rightCalculator();
  })
});

const changeinfo = () => {
  info();
}

leftradios.forEach((item) => {
  item.addEventListener("change", changeinfo);
})
rightradios.forEach((item) => {
  item.addEventListener("change", changeinfo);
})
