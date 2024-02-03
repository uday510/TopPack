const util = require('../utils/util');
const Search = require('../models/search.model.js');

exports.searchRepositories = async (req, res) => {
  try {
    const keywordExists = await Search.findOne({ keyword: req.query.keyword });

    if (keywordExists) {

      const createdTimeStamp = keywordExists.searchedAt;
      const diffInSeconds = util.getDiff(createdTimeStamp);

      if (diffInSeconds < 60) {
        return res.status(200).send("Not allowed to make multiple requests for same keyword within 1 minute, please try after 1 minute.");
      } else {
        await Search.updateOne({ keyword: req.query.keyword, searchedAt: new Date() });
      }
    } else {
      await Search.create({ keyword: req.query.keyword, searchedAt: new Date() });
    }
    const response = await util.getRepos(req.query.keyword);

    return res.status(200).send(util.formatData(response.data.items));
  } catch (err) {
    console.log(err);

    return res.status(400).send("Some Internal Error")
  }
}

exports.top10Repositories = async (req, res) => {

  try {
    const response = await util.getRepos(req.query.keyword);

    let data = util.formatData(response.data.items);

    data = data.slice(0, 10);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Some Internal Error");
  }
}

exports.top3Repositories = async (req, res) => {
  try {
    const response = await util.getRepos(req.query.keyword);
    // console.log("RESPONSE ", response);

    let data = util.formatData(response.data.items);
    // console.log("DATA ", data);

    let sortedData = data.sort((o1, o2) => o2.stars_count - o1.stars_count);

    // console.log(sortedData);

    // console.log("DATA ", data);

    sortedData = sortedData.slice(0, 3);
    return res.status(200).send(sortedData);
  } catch (err) {
  }
}