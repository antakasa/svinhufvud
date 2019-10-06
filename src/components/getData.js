import axios from 'axios';
const appUrl = 'http://svinhufvudinmuistosäätiö.fi/wp-json/wp/v2/';

const getPosts = `${appUrl}posts`;

const timelineData = `http://www.svinhufvudinmuistosaatio.fi/wp-json/acf/v3/pages`;

const fetchData = async (url, setData) => {
  const result = await axios(url);
  if (setData) setData(result.data);
  return result.data;
};

export {appUrl, getPosts, fetchData};
