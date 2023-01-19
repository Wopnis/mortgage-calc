import * as Model from './model.js';
import programs from './view/radioPrograms.js';
import updateResultsView from './view/updateResultsView.js';

import priceInput from './view/priceInput.js';
import costRange from './view/costRange.js';

window.onload = function (params) {
    const getData = Model.getData();
    programs(getData);
    priceInput(getData);
    costRange(getData);

    document.addEventListener('updateForm', event => {
        Model.setData(event.detail);
        const data = Model.getData();
        const results = Model.getResults();

        updateResultsView(results);
    });
};
