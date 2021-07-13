

// Generate a sentence from the given input.
const getSentences = (subject, period, value) => {
    console.log(subject)
    for(let i=0; i < task1Form.period.length; ++i){
        console.log(period[i] + ': ' + value[i])
    }
}

// Listen if a button on the page is pressed and embeds the sentences from the given input into the HTML.
$('#task1-submit-btn').addEventListener('click', () => {
    const task1Form = document.forms['task1Form'];
    const subject = task1Form.subject.value;
    const period = []
    const value = []

    for(let i=0; i < task1Form.period.length; ++i){
        period.push(task1Form.period[i].value)
        value.push(task1Form.value[i].value)
    }
    
    $('#task1-result').innerHTML = getSentences(subject, period, value);
});

///////////////
// 文章の流れ //
///////////////
/*
    
*/