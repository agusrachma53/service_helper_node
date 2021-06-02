const { ConflictError } = require('restify-errors');
const wrapper = require('../../../../helpers/utils/wrapper');
const Query = require('./query');
const xl = require('excel4node');

class General {

  constructor(db){
    this.query = new Query(db);
  }

  async ExportDataToExcel(payload){

    const record = await this.query.findManyData();
    if(record.err){
      return wrapper.error(new ConflictError(record.err));
    }
    const { data } = record;

    // Preparation
    const wb = new xl.Workbook();
    let options = {
      margins: {
        left: 1.5,
        right: 1.5
      }
    };
    // Add Worksheets to the workbook
    let ws = wb.addWorksheet('Sheet 1', options);
    // Create a reusable style
    let styleHead = wb.createStyle({
      alignment :{
        wrapText: true,
        horizontal: 'centerContinuous',
        indent:2,
        shrinkToFit:true
      },
      font: {
        color: '#FF0800',
        size: 14,
        bold:true,
        vertAlign: 'subscript',
      },
      fill:{
        type: 'pattern',
        patternType: 'solid',
        bgColor: '#10ac84',
        fgColor: '#10ac84',
      }
      // numberFormat: '$#,##0.00; ($#,##0.00); -',
    });
    let style = wb.createStyle({
      font: {
        color: '#FF0800',
        size: 12,
      },
      numberFormat: '$#,##0.00; ($#,##0.00); -',
    });

    ws.cell(1,1).string('NPWP').style(styleHead);
    ws.cell(1,2).string('Division').style(styleHead);
    ws.cell(1,3).string('Name').style(styleHead);
    ws.cell(1,4).string('Business Entity').style(styleHead);
    ws.cell(1,5).string('Director Name').style(styleHead);
    ws.cell(1,6).string('Main Office Address').style(styleHead);
    ws.cell(1,7).string('Province').style(styleHead);
    ws.cell(1,8).string('District').style(styleHead);
    ws.cell(1,9).string('Region').style(styleHead);
    ws.cell(1,10).string('Postal Code').style(styleHead);
    ws.cell(1,11).string('Website URL').style(styleHead);
    ws.cell(1,12).string('Main Office Phone').style(styleHead);
    ws.cell(1,13).string('Main Office Fax').style(styleHead);
    ws.cell(1,14).string('Partner Category').style(styleHead);
    ws.cell(1,15).string('Sub Category').style(styleHead);
    ws.cell(1,16).string('Status').style(styleHead);
    ws.cell(1,17).string('Photo').style(styleHead);
    let x = 2;
    for(let j = 0; j <= data.length - 1; j++){
      let v = data[j];
      let div = [];
      if(typeof v.division === 'object'){
        v.division.map(c => { div.push(c + ' | ');});
      }else{
        div = v.division;
      }
      ws.cell(x, 1).string(v.npwp).style(style);
      ws.cell(x, 2).string(div).style(style);
      ws.cell(x, 3).string(v.partnerName).style(style);
      ws.cell(x, 4).string(v.businessEntity).style(style);
      ws.cell(x, 5).string(v.directorName).style(style);
      ws.cell(x, 6).string(v.mainOfficeAddress).style(style);
      ws.cell(x, 7).string(v.province).style(style);
      ws.cell(x, 8).string(v.district).style(style);
      ws.cell(x, 9).string(v.region).style(style);
      ws.cell(x, 10).string(v.postalCode).style(style);
      ws.cell(x, 11).string(v.websiteUrl).style(style);
      ws.cell(x, 12).string(v.mainOfficePhone).style(style);
      ws.cell(x, 13).string(v.mainOfficeFax).style(style);
      ws.cell(x, 14).string(v.partnerCategory).style(style);
      ws.cell(x, 15).string(v.subCategory).style(style);
      ws.cell(x, 16).string(v.status).style(style);
      ws.cell(x, 17).string(v.photo).style(style);
      let a = x + 1;
      x = a;
    }

    wb.write('Excel.xlsx');

    return wrapper.data('data','success',200);
  }

}

module.exports = General;
