import * as Model from './model.js';
import programs from './view/radioPrograms.js';
import updateResultsView from './view/updateResultsView.js';
import updateMinPercents from './view/utils.js';

import priceInput from './view/priceInput.js';
import costRange from './view/costRange.js';

import paymentInput from './view/paymentInput.js';
import paymentRange from './view/paymentRange.js';

// eslint-disable-next-line no-unused-vars
window.onload = function (params) {
    const getData = Model.getData();

    programs(getData);

    const cleaveCost = priceInput(getData);
    const sliderCost = costRange(getData);

    const cleavePayment = paymentInput(getData);
    const sliderPayment = paymentRange(getData);

    document.addEventListener('updateForm', event => {
        Model.setData(event.detail);
        const data = Model.getData();
        const results = Model.getResults();

        updateFormAndSliders(data);

        updateResultsView(results);
    });

    function updateFormAndSliders(data) {
        //update radio buttons
        if (data.onUpdate === 'radioProgram') {
            updateMinPercents(data);
            //Update payment sliders
            sliderPayment.noUiSlider.updateOptions({
                range: {
                    min: data.minPaymentPercents * 100,
                    max: data.maxPaymentPercents * 100,
                },
            });
        }
        //costInput
        if (data.onUpdate !== 'inputCost') {
            console.log('update inputCost');
            cleaveCost.setRawValue(data.cost);
        }
        //costSlider
        if (data.onUpdate !== 'costSlider') {
            console.log('update cost slider');
            sliderCost.noUiSlider.set(data.cost);
        }

        //paymentInput
        if (data.onUpdate !== 'inputPayment') {
            cleavePayment.setRawValue(data.payment);
        }
    }
};
