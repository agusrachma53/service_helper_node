
class Query {

  constructor(db) {
    this.db = db;
  }

  async findManyData(parameter) {
    this.db.setCollection('partner');
    const recordset = await this.db.findMany(parameter);
    return recordset;
  }

}

module.exports = Query;
