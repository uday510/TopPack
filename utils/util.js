const axios = require('axios');

exports.getRepos = async (keyword) => {
  // https://api.github.com/search/repositories?q=:node
  // const response = await axios.get("https://api.github.com/search/repositories?q=octokit+language:csharp");
  try {
    const url = `https://api.github.com/search/repositories?q=:${keyword}`

    const response = await axios.get(url);

    return response;

  } catch (error) {
    console.error(err);
  }
}


exports.formatData = (items) => {
  const formattedData = [];

  for (const item of items) {
    const formattedItem = {};
    formattedItem.url = item.html_url;
    formattedItem.forks_count = item.forks_count;
    formattedItem.stars_count = item.stargazers_count;
    formattedData.push(formattedItem);
  }
  return formattedData;
}

exports.getDiff = (createdTimeStamp) => {
  const currTimeStamp = new Date().getTime();
  createdTimeStamp = new Date(createdTimeStamp).getTime();
  
  const diffInSeconds = Math.abs(currTimeStamp - createdTimeStamp) / 1000;

  return diffInSeconds;
}