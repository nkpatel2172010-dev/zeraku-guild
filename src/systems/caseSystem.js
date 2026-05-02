const System = require("../models/System");

async function getCase() {
  let data = await System.findOne();

  if (!data) {
    data = await System.create({});
  }

  data.caseCount += 1;
  await data.save();

  return data.caseCount;
}

module.exports = { getCase };
