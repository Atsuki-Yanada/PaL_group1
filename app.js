// Generate paragraph from the given input.
const getParagraph = () => {

    return firstSentence() + secondSentence() + thirdSentece() + FourthSentence();
}

// Generate summary sentence
const firstSentence = () => {
    const ot = getOverallTrend();
    return `Overall, ${subject} ${ot.verb} during the six-mounth period. `;
}

// Generate average and median sentence
const secondSentence = () => {
    const aam = getAverageAndMedian();
    return `The average price is ${aam.average} yen and the median is ${aam.median} yen. `;
}

// Generate sentences using adverbs and change verbs
const thirdSentece = () => {
    const ot = getOverallTrend();
    let sentence = ``

    const verb = [
        ['rose', 'fell', 'remain steady'],
        ['climbed', 'dropped', 'does not change'],
        ['increased', 'decreased', 'remain stable']
    ]

    const getVerb = (i) => {
        let p1 = ot.period1[i];
        let p2 = ot.period2[i];
        let res = `${ot.adverb[p1][p2-p1-1]} `
        if (ot.percentage[p1][p2-p1-1] > 0) {
            res += `${verb[i%3][0]} ${ot.percentage[p1][p2-p1-1]}% `;
        } else if (ot.percentage[p1][p2-p1-1] < 0) {
            res += `${verb[i%3][1]} ${Math.abs(ot.percentage[p1][p2-p1-1])}% `;
        } else {
            res += `${verb[i%3][2]} `;
        }
        return res;
    }

    for (let i = 0; i < ot.period1.length; ++i) {
        let index = i % 3;
        if (index === 0) {
            sentence += `The price ${getVerb(i)} from ${period[ot.period1[i]]} to ${period[ot.period2[i]]}. `
        } else if (index === 1) {
            sentence += `From ${period[ot.period1[i]]} to ${period[ot.period2[i]]}, its price ${getVerb(i)}. `
        } else {
            sentence += `It ${getVerb(i)} between ${period[ot.period1[i]]} to ${period[ot.period2[i]]}. `
        }
    }
    return sentence;
}

const FourthSentence = () => {
    sentence = ``;
    const maxP = getMaxPeakPeriod()[0];
    const minP = getMinPeakPeriod()[0];
    return `The price peaked at ${value[maxP]} yen in ${period[maxP]}, it bottomed out at ${value[minP]} in ${period[minP]}. `
}

// Listen if a button on the page is pressed and embeds the sentences from the given input into the HTML.
$('#submit-btn').addEventListener('click', () => {
    const form = document.forms['Form'];
    subject = form.subject.value;
    period = [];
    value = [];
    let valueStr, num
    for (let i = 0; i < form.period.length; ++i) {
        period.push(form.period[i].value);
        valueStr = form.value[i].value
        num = Number(valueStr.substr(0, valueStr.indexOf(' yen')));
        value.push(num);
    }
    $('#result').innerHTML = getParagraph();

    /*
    console.log('◆◆◆◆◆◆◆◆◆◆◆FUNCTION TEST◆◆◆◆◆◆◆◆◆◆◆◆')
    getOverallTrend();
    getMostChangedPeriod();
    getMaxPeakPeriod();
    getMinPeakPeriod();
    getAverageAndMedian();
    */
});