import updateModel from './../utils/updateModel.js';

function init(getData) {
    const input = document.querySelector('#input-cost');

    const settings = {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: ' ',
    };
    const cleaveInput = new Cleave(input, settings);
    cleaveInput.setRawValue(getData.cost);

    input.addEventListener('input', function () {
        const value = +cleaveInput.getRawValue();
        if (value < getData.minPrice || value > getData.maxPrice) {
            input.closest('.param__details').classList.add('param__details--error');
        } else if (value >= getData.minPrice || value <= getData.maxPrice) {
            input.closest('.param__details').classList.remove('param__details--error');
        }

        updateModel(input, {
            cost: value,
            onUpdate: 'inputCost',
        });
    });

    input.addEventListener('change', function (params) {
        let value = +cleaveInput.getRawValue();
        if (value > getData.maxPrice) {
            input.closest('.param__details').classList.remove('param__details--error');
            cleaveInput.setRawValue(getData.maxPrice);
        }
        if (value < getData.minPrice) {
            input.closest('.param__details').classList.remove('param__details--error');
            cleaveInput.setRawValue(getData.minPrice);
        }

        updateModel(input, {
            cost: +cleaveInput.getRawValue(),
            onUpdate: 'inputCost',
        });
    });
    input.addEventListener('focus', () => {
        input.value = '';
    });
    // input.addEventListener('blur', () => {
    //     cleaveInput.setRawValue(getData.cost);
    // });
}

export default init;
