const General = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const general = new General(db);

const exportDataMongoDBToExcel = async (payload) => {
  const getData = async () => {
    const result = await general.ExportDataToExcel(payload);
    return result;
  };
  const result = await getData();
  return result;
};

module.exports = {
  exportDataMongoDBToExcel
};
