export default function decode(str) {
  return str.replace(/&quot;|&#039;|&amp;|&deg;/g, '');
}

// Entendi como usar o replace com regex, neste link:
// https://stackoverflow.com/questions/16576983/replace-multiple-characters-in-one-replace-call
