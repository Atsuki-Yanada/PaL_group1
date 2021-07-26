// Initialize the contents of the form.
let subject = '';
let period = [];
let value = [];

// Generate changes during each period.
const getOverallTrend = () => {
    const res = {
        trend: [],
        period1: [],
        period2: [],
        percentage: [],
        adverb: [],
        verb: ''
    }
    for (let i = 0; i < value.length - 1; ++i) {
        let deff = value[i + 1] - value[i];
        if (deff > 0) {
            res.trend.push('increased');
        } else if (deff < 0) {
            res.trend.push('decreased');
        } else {
            res.trend.push('remain stable');
        }

        res.period1.push(i);
        res.period2.push(i + 1);
    }

    let trendCount = 0;
    for (let i = 0; i < res.trend.length; ++i) {
        if (res.trend[i] === 'increased') trendCount++;
        else if (res.trend[i] === 'decreased') trendCount--;
    }
    if (trendCount > 0) res.verb = 'increased'
    else if (trendCount < 0) res.verb = 'decreased'
    else res.verb = 'stable'

    const deleteContinuousTrends = (i) => {
        if (res.trend[i] === res.trend[i + 1]) {
            res.trend.splice(i + 1, 1);
            res.period1.splice(i + 1, 1);
            res.period2.splice(i, 1);
            deleteContinuousTrends(i);
        }
    }
    for (let i = 0; i < res.trend.length; ++i) deleteContinuousTrends(i);

    let tmp = [];
    const percentage = [];
    for (let i = 0; i < value.length - 1; ++i) {
        for (let j = i + 1; j < value.length; ++j) {
            let num = ((value[j] - value[i]) / value[i] * 100);
            // Calculate to the second decimal place
            tmp.push(Math.floor(num * Math.pow(10, 2)) / Math.pow(10, 2))
        }
        res.percentage.push(tmp);
        tmp = [];
    }

    let adverb;
    for (let i = 0; i < res.percentage.length; ++i) {
        for (let j = 0; j < res.percentage[i].length; ++j) {
            let per = Math.abs(res.percentage[i][j])
            if (per > 100) {
                adverb = 'dramatically'
            } else if (per > 50) {
                adverb = 'significantly'
            } else if (per > 20) {
                adverb = 'steadily'
            } else if (per > 5) {
                adverb = 'moderately'
            } else {
                adverb = ''
            }
            tmp.push(adverb);
        }
        res.adverb.push(tmp);
        tmp = [];
    }

    console.log(res);
    return res;
}

const getMaxPeakPeriod = () => {
    const max = Math.max(...value);
    let res = [];
    for (let i = 0; i < period.length; ++i) {
        if (value[i] == max) {
            res.push(i);
        }
    }
    console.log('Max Peak Period is: ' + res);
    return res;
}

const getMinPeakPeriod = () => {
    const min = Math.min(...value);
    let res = [];
    for (let i = 0; i < period.length; ++i) {
        if (value[i] == min) {
            res.push(i);
        }
    }
    console.log('Min Peak Period is: ' + res);
    return res;
}


const getMostChangedPeriod = () => {
    let max = 0
    let deff
    const res = {
        period1: [],
        period2: [],
        change: [],
        deff: []
    }
    const addItem = (i) => {
        res.period1.push(i)
        res.period2.push(i + 1)
        if (deff > 0) res.change.push('increases')
        else if (deff < 0) res.change.push('decreases')
        else res.change.push('stable')
        res.deff.push(Math.abs(deff))
    }

    for (let i = 0; i < period.length - 1; ++i) {
        deff = value[i + 1] - value[i]
        if (Math.abs(deff) === max) addItem(i)
        if (Math.abs(deff) > max) {
            max = Math.abs(deff)
            res.period1 = []
            res.period2 = []
            res.change = []
            res.deff = []
            addItem(i)
        }
    }
    console.log(res)
    return res;
}

const getAverageAndMedian = () => {
    const res = {
        average: 0,
        median: 0
    }
    const array = []
    for (let i = 0; i < value.length; ++i) array.push(parseInt(value[i]));
    array.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    let total = array.reduce((sum, element) => sum + element, 0);
    res.average = Math.round(total / value.length);
    res.median = Math.round((array[2] + array[3]) / 2);
    console.log(res);
    return res;
}