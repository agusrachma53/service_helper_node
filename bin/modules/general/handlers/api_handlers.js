
const wrapper = require('../../../helpers/utils/wrapper');
const queryHandler = require('../repositories/queries/query_handler');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const exportDataMongoDBToExcel = async (req, res) => {
  const getData = async () => queryHandler.exportDataMongoDBToExcel(req.body);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, '', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, '', http.OK);
  };
  sendResponse(await getData());
};

module.exports = {
  exportDataMongoDBToExcel
};
