import md5 from 'crypto-js/md5';

const fetchImage = async (email) => {
  const hash = md5(email).toString();
  const response = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  // response = await response.json();
  return response.url;
};

export default fetchImage;
