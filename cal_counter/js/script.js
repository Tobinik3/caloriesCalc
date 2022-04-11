let submitButton = document.querySelector('.form__submit-button');
let deleteButton = document.querySelector('.form__reset-button');


let ageInput = document.querySelector('#age');
let heightInput = document.querySelector('#height');
let weightInput = document.querySelector('#weight');

let inputs = document.querySelectorAll('.input');

for (let input of inputs) {
    input.addEventListener('input', () => {
        if (!!ageInput.value && !!heightInput.value && !!weightInput.value) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
        if (!!ageInput.value || !!heightInput.value || !!weightInput.value) {
            deleteButton.disabled = false;
        } else {
            deleteButton.disabled = true;
        }
    })
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    submit();
})

deleteButton.addEventListener('click', () => {
    document.querySelector('#gender-male').checked = true;
    ageInput.value = null;
    heightInput.value = null;
    weightInput.value = null;
    document.querySelector('#activity-minimal').checked = true;
    submitButton.disabled = true;
    deleteButton.disabled = true;

    if (!document.querySelector('.counter__result--hidden')) {
        document.querySelector('.counter__result').classList.add('counter__result--hidden');
    }
})

const submit = () => {
    if (!!document.querySelector('.counter__result--hidden')) {
        document.querySelector('.counter__result').classList.remove('counter__result--hidden');
        count();
    } else {
        count();
    }
}



const count = () => {
    let coef = 1.2;
    if (document.querySelector('#activity-low').checked) {
        coef = 1.375;
    } else if (document.querySelector('#activity-medium').checked) {
        coef = 1.55;
    } else if (document.querySelector('#activity-high').checked) {
        coef = 1.725;
    } else if (document.querySelector('#activity-maximal').checked) {
        coef = 1.9;
    }

    function divideNumberByPieces(x, delimiter) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || " ");
    }


    let calNorm;


    if (document.querySelector('#gender-male').checked) {
        calNorm = ((10 * weightInput.value) + (6.25 * heightInput.value) - (5 * ageInput.value) + 5) * coef;
    } else {
        calNorm = ((10 * weightInput.value) + (6.25 * heightInput.value) - (5 * ageInput.value) - 161) * coef;
    }

    calNorm = Math.round(calNorm);
    let calMin = Math.round((calNorm - calNorm / 100 * 15));
    let calMax = Math.round((calNorm + calNorm / 100 * 15));

    document.querySelector('#calories-norm').textContent =     divideNumberByPieces(calNorm);
    document.querySelector('#calories-minimal').textContent = divideNumberByPieces(calMin);
    document.querySelector('#calories-maximal').textContent = divideNumberByPieces(calMax);
}







