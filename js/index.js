const calculator = async (x, y) => {
  try {
    fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&date=${todayDate}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let result = data.result;
        if (result === null) {
          result = 0;
        }
        x == 1 ? rightcalcvalue.value = result : leftcalcvalue.value = result
        if (leftcalcvalue.value == "" && rightcalcvalue.value == 0) {
          rightcalcvalue.value = "";
        }
        else if (leftcalcvalue.value == 0 && rightcalcvalue.value == "") {
          leftcalcvalue.value = "";
        }

        if (leftcalcvalue.value == "" || rightcalcvalue.value == "") {
          rightcalcvalue.value = "";
          leftcalcvalue.value = "";
        }
      });
  }
  catch (error) {
    throw alert(`OOPS SMTG WENT WRONG`);
  }
};
// Declaration
let blockContainer = document.querySelector('.blocks-container')
let blockRight = document.querySelector('.block-right')
let rightbtns = blockRight.querySelectorAll(".radio_input")
let blockLeft = document.querySelector('.block-left')
let leftbtns = blockLeft.querySelectorAll(".radio_input");
let valueLeft = blockLeft.querySelector("[checked]");
let valueRight = blockRight.querySelector("[checked]");
let leftcalcvalue = blockLeft.querySelector('.calc-value');
let rightcalcvalue = blockRight.querySelector('.calc-value');
let calcvalues = blockContainer.querySelectorAll('.calc-value')
valueLeft = valueLeft.value;
valueRight = valueRight.value;
let leftdetail = blockLeft.querySelectorAll('span');
let [leftfrom, leftrate, leftto] = leftdetail;
let rightdetail = blockRight.querySelectorAll('span');
let [rightfrom, rightrate, rightto] = rightdetail;
let todayDate = new Date().toISOString().slice(0, 10);
// Function for e.g 1 USD= 1 USD
const info = async () => {
  await fetch(`https://api.exchangerate.host/convert?from=${valueLeft}&to=${valueRight}&date=${todayDate}`)
    .then((response) => {
      return response.json()
    })
    .then((leftdata) => {
      leftfrom.innerText = valueLeft;
      leftto.innerText = valueRight;
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

let amount, from, to;

leftcalcvalue.addEventListener("input", () => {
  from = valueLeft;
  to = valueRight;
  if (leftcalcvalue.value[0] == "0" && leftcalcvalue.value.length == 2) {
    leftcalcvalue.value = leftcalcvalue.value[1];
  }
  amount = leftcalcvalue.value.replaceAll(" ","");
  amount=Number(amount.slice(0,8));
  calculator(1, 0);
})

rightcalcvalue.addEventListener("input", () => {
  from = valueRight;
  to = valueLeft;
  if (rightcalcvalue.value[0] == "0" && rightcalcvalue.value.length == 2) {
    rightcalcvalue.value = rightcalcvalue.value[1];
  }
  amount = rightcalcvalue.value.replaceAll(" ","");
  amount=Number(amount.slice(0,8));
  calculator(0, 1);
})

let leftradios = blockLeft.querySelectorAll('input[type=radio][name="myRadio"]');
let rightradios = blockRight.querySelectorAll('input[type=radio][name="myRadio1"]');

leftradios.forEach(radio => {
  radio.addEventListener('change', () => {
    valueLeft = radio.value;
    amount = rightcalcvalue.value;
    from = valueRight;
    to = valueLeft;
    calculator(0, 1)
  })
});
rightradios.forEach(radio => {
  radio.addEventListener('change', () => {
    valueRight = radio.value;
    amount = leftcalcvalue.value;
    from = valueLeft;
    to = valueRight;
    calculator(1, 0);
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

// ! IMASK
var numberMask = IMask(leftcalcvalue, {
  mask: Number, 
  scale: 6, 
  signed: false, 
  thousandsSeparator: " ", 
  padFractionalZeros: false, 
  normalizeZeros: true, 
  radix: ".", 
  mapToRadix: [","], 
});

var numberMask = IMask(rightcalcvalue, {
  mask: Number, 
  scale: 6, 
  signed: false, 
  thousandsSeparator: " ", 
  padFractionalZeros: false, 
  normalizeZeros: true, 
  radix: ".", 
  mapToRadix: [","], 
});
