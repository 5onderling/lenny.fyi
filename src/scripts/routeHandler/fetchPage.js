const domParser = new DOMParser();
export const fetchPage = async url =>
  domParser.parseFromString(await (await fetch(url)).text(), 'text/html');
