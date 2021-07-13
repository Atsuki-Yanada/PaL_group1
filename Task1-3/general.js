
const $ = (e) => {
    const c = e[0];
    const len = e.split(' ').length;
    if (c === '#' && len === 1) {
        return document.getElementById(e.slice(1));
    } else {
        return document.querySelector(e);
    }
}