let data = {
    selectedProgram: 0.1,
    cost: 12000000,
    minPrice: 375000,
    maxPrice: 100000000,
    minPaymentPercents: 0.15,
    maxPaymentPercents: 0.9,
    paymentPercents: 0.5,
    payment: 6000000,
    getMinPayment: function () {
        return this.cost * this.minPaymentPercents;
    },
    getMaxPayment: function () {
        return this.cost * this.maxPaymentPercents;
    },
    programs: {
        base: 0.1,
        it: 0.047,
        gov: 0.067,
        zero: 0.12,
    },
};

let results = {
    rate: data.selectedProgram,
};

function getData() {
    return { ...data };
}

function getResults(params) {
    return { ...results };
}

function setData(newData) {
    console.log('New Data', data);
    if (newData.onUpdate === 'radioProgram') {
        if (newData.id === 'zero-value') {
            data.minPaymentPercents = 0;
        } else {
            data.minPaymentPercents = 0.15;
        }
    }

    if (newData.onUpdate === 'inputCost' || newData.onUpdate === 'costSlider') {
        if (newData.cost < data.minPrice) newData.cost = data.minPrice;
        if (newData.cost > data.maxPrice) newData.cost = data.maxPrice;

        if (data.payment > data.getMaxPayment()) {
            data.payment = data.getMaxPayment();
        }
        if (data.payment < data.getMinPayment()) {
            data.payment = data.getMinPayment();
        }
    }

    if (newData.onUpdate === 'paymentSlider') {
        newData.paymentPercents = newData.paymentPercents / 100;
        data.payment = data.cost * newData.paymentPercents;
    }

    data = {
        ...data,
        ...newData,
    };
    results = {
        rate: data.selectedProgram,
    };

    console.log('Updated Data', data);
    console.log('New results', results);
}
export { getData, setData, getResults };
