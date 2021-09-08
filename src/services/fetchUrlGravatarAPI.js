import md5 from 'crypto-js/md5';

const fetchUrlGravatarAPI = async (email) => {
  const gravatarEmail = md5(email).toString();
  const gravatarURL = `https://www.gravatar.com/avatar/${gravatarEmail}`;
  const response = await fetch(gravatarURL);
  return response.url;
};

export default fetchUrlGravatarAPI;
