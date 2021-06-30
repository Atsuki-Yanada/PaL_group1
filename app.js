// Return the appropriate verb and the difference between those prices.
const getVerb = (price1str, price2str) => {
    const price1 = Number(price1str.substr(0, price1str.indexOf(' yen')));
    const price2 = Number(price2str.substr(0, price2str.indexOf(' yen')));

    let verb;
    if (price1 - price2 < 0) {
        verb = 'increased by ' + Math.abs(price1 - price2) + ' yen';
    } else if (price1 - price2 > 0) {
        verb = 'decreased by ' + Math.abs(price1 - price2) + ' yen';
    } else {
        verb = 'remain';
    }
    console.log(verb);
    return verb;
}

// Generate a sentence from the given "value1-5".
const getSentence = (subject, season1, price1, season2, price2) => {
    if(getInputError(subject, season1, price1, season2, price2)){
        return 'Please enter all of the items.';
    }

    let sentence;
    const verb = getVerb(price1, price2);
    sentence = subject + ' ' + verb + ' from ' +
        price1 + ' in ' + season1 + ' to ' + price2 + ' in ' + season2 + '.';
    console.log(sentence);
    return sentence;
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

    $('#task1-result').innerHTML = getSentence(subject, season1, price1, season2, price2);
});

