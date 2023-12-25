const applicationForm = document.getElementById('application-form');
const sendFormButton = document.querySelector('.modal-application__button');
const agreeCheckbox = applicationForm.querySelector('#agree-personal-data');
const fields = applicationForm.querySelectorAll('input[name="name"], input[name="phone"]');
const blockErrors = applicationForm.querySelector('.modal-application__error-message');
agreeCheckbox.addEventListener('input', enableSendButton);
const products = JSON.parse(localStorage.getItem('products'));

let formIsValid = false;

sendFormButton.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData(applicationForm);
    //   for (let item of formData) {
    //     console.log(item);
    //   }
    let resultProductsString = '';
    products.forEach((item, i) => {
        resultProductsString += '\n' + `${i + 1})` + item.name + ' - ' + item.price + '₽';
    });
    formData.append('products', resultProductsString);
    sendData(formData);
});

async function sendData(data) {
    try {
        const response = await fetch('../send-message-to-telegram.php', {
            method: 'POST',
            body: data,
        });
        console.log(response);
        if (response.ok) {
            window.closeModal();
            window.openModal('modal-success');
        }
    } catch (e) {
        console.error(e);
    }
}

function enableSendButton() {
    if (agreeCheckbox.checked && formIsValid) {
        sendFormButton.classList.remove('disabled');
    } else {
        sendFormButton.classList.add('disabled');
    }
}

function createCheckValues() {
    let errors = [];

    return function () {
        let currentObj;
        setTimeout(() => {
            switch (this.name) {
                case 'name':
                    currentObj = { fieldName: 'name', errors: [] };
                    errors = errors.filter((el) => el.fieldName !== currentObj.fieldName);
                    if (!this.value) {
                        currentObj.errors.push('Поле "Имя" не может быть пустым');
                        errors.push(currentObj);
                        this.closest('.input-custom').classList.add('invalid');
                    } else if (this.value.length < 3) {
                        currentObj.errors.push('Поле "Имя" не должно быть короче 3-х символов');
                        errors.push(currentObj);
                        this.closest('.input-custom').classList.add('invalid');
                    } else {
                        this.closest('.input-custom').classList.remove('invalid');
                        errors = errors.filter((el) => el.fieldName !== currentObj.fieldName);
                    }

                    break;
                case 'phone':
                    currentObj = { fieldName: 'phone', errors: [] };
                    errors = errors.filter((el) => el.fieldName !== currentObj.fieldName);
                    if (!this.value) {
                        currentObj.errors.push('Поле "Телефон" не может быть пустым');
                        errors.push(currentObj);
                        this.closest('.input-custom').classList.add('invalid');
                    } else if (this.value.length < 17) {
                        currentObj.errors.push('Номер телефона слишком короткий');
                        errors.push(currentObj);
                        this.closest('.input-custom').classList.add('invalid');
                    } else {
                        this.closest('.input-custom').classList.remove('invalid');
                        errors = errors.filter((el) => el.fieldName !== currentObj.fieldName);
                    }
                    break;
            }

            if (errors.length) {
                blockErrors.classList.add('is-active');
                blockErrors.innerHTML = '';
                errors.forEach((obj) => {
                    obj.errors.forEach((err) => blockErrors.insertAdjacentHTML('beforeend', `${err}<br>`));
                });
                sendFormButton.classList.add('disabled');
            } else {
                blockErrors.classList.remove('is-active');
                blockErrors.innerHTML = '';
                const emtptyTrap = [...fields].map((el) => {
                    if (el.value) {
                        return true;
                    } else {
                        return false;
                    }
                });
                if (emtptyTrap.indexOf(false) === -1) {
                    formIsValid = true;
                    enableSendButton();
                }
            }
        }, 0);
    };
}

const checkValues = createCheckValues();

fields.forEach((input) => {
    input.addEventListener('input', checkValues);
    input.addEventListener('blur', checkValues);
});
