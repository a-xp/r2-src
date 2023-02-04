export function getGameId() {
    return window.location.search ? window.location.search.slice(1) : '';
}


export function copyStringToClipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

export function ucase(str) {
    return `${str[0].toUpperCase()}${str.slice(1)}`
}