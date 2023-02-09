import updateModel from './../utils/updateModel.js';

function init(getData) {
    const input = document.querySelector('#input-downpayment');

    const settings = {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: ' ',
    };
    const cleaveInput = new Cleave(input, settings);
    cleaveInput.setRawValue(getData.payment);

    input.addEventListener('input', function () {
        const value = +cleaveInput.getRawValue();

        if (value < getData.getMinPayment() || value > getData.getMaxPayment()) {
            input.closest('.param__details').classList.add('param__details--error');
        } else if (value >= getData.getMinPayment() || value <= getData.getMaxPayment()) {
            input.closest('.param__details').classList.remove('param__details--error');
        }

        updateModel(input, {
            payment: value,
            onUpdate: 'inputPayment',
        });
    });

    input.addEventListener('change', function (params) {
        let value = +cleaveInput.getRawValue();

        if (value > getData.getMaxPayment()) {
            input.closest('.param__details').classList.remove('param__details--error');
            cleaveInput.setRawValue(getData.getMaxPayment());
        }

        if (value < getData.getMinPayment()) {
            input.closest('.param__details').classList.remove('param__details--error');
            cleaveInput.setRawValue(getData.getMinPayment());
        }

        updateModel(input, {
            payment: value,
            onUpdate: 'inputPayment',
        });
    });
    // input.addEventListener('focus', () => {
    //     input.value = '';
    // });
    // input.addEventListener('blur', () => {
    //     let value = +cleaveInput.getRawValue();
    //     cleaveInput.setRawValue(value);
    // });
    return cleaveInput;
}

export default init;
