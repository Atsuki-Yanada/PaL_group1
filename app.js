// Return the appropriate verb and the difference between those prices.
const getSentence = (subject, season1, price1str, season2, price2str) => {
    const price1 = Number(price1str.substr(0, price1str.indexOf(' yen')));
    const price2 = Number(price2str.substr(0, price2str.indexOf(' yen')));

    let adverb
    // If it is less than 10% of the input value, it is 'slightly', if it is different, 'substantially'
    if (Math.abs(price1 - price2) < price1 / 10) {
        adverb = 'slightly'
    } else {
        adverb = 'substantially'
    }

    let sentence;
    if (price1 - price2 < 0) {
        sentence = subject + ' increased ' + adverb + ' by ' + Math.abs(price1 - price2) + ' yen' + ' from ' +
            price1str + ' in ' + season1 + ' to ' + price2str + ' in ' + season2 + '.';
    } else if (price1 - price2 > 0) {
        sentence = subject + ' decreased ' + adverb + ' by ' + Math.abs(price1 - price2) + ' yen' + ' from ' +
            price1str + ' in ' + season1 + ' to ' + price2str + ' in ' + season2 + '.';
    } else {
        sentence = subject + ' remained stable at ' + price1str + '.';
    }

    console.log(sentence);
    return sentence;
}

// Generate a sentence from the given "value1-5".
const getSentences = (subject, season1, price1, season2, price2) => {
    if (getInputError(subject, season1, price1, season2, price2)) {
        return 'Please enter all of the items.';
    }

    let sentence;
    console.log(sentence);
    return getSentence(subject, season1, price1, season2, price2);
}

// Check that all values have been inputed.
const getInputError = (subject, season1, price1, season2, price2) => {
    if (subject === '' || season1 === '' || price1 === '' || season2 === '' || price2 === '') {
        return true;
    } else {
        return false;
    }
}

// Listen if a button on the page is pressed and embeds the sentences from the given "value1-5" into the HTML.
$('#task1-submit-btn').addEventListener('click', () => {
    const task1Form = document.forms['task1Form'];
    const subject = task1Form.elements['subject'].value;
    const season1 = task1Form.elements['season1'].value;
    const price1 = task1Form.elements['price1'].value;
    const season2 = task1Form.elements['season2'].value;
    const price2 = task1Form.elements['price2'].value;
    $('#task1-result').innerHTML = getSentences(subject, season1, price1, season2, price2);
});

