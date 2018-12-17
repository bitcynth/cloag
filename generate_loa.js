const PDFDocument = require('pdfkit');
const fs = require('fs');
const config = require('./config.json');

function getDate() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var day = d.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    var res = year + '-' + month + '-' + day;
    return res;
}

if(process.argv.length < 4) {
    process.exit(-1);
}

const loaData = JSON.parse(fs.readFileSync(process.argv[2]));

var announcingASN = loaData.asn;
var announcingEntity = loaData.entity;
var resources = loaData.resources;

var doc = new PDFDocument();

doc.pipe(fs.createWriteStream(process.argv[3]));

doc.lineWidth(1.5);

doc.fontSize(20);
doc.text(config.name);
doc.fontSize(14);
doc.moveDown();
doc.text('Letter of Authorization (LOA)');
doc.moveDown();
var date = getDate();
doc.text(date);
doc.moveDown();
doc.text('To whom it may concern,');
doc.text('This letter serves as authorization for ' + announcingEntity + ' with ' + announcingASN + ' to advertise the following IP address blocks:');
doc.moveDown();
doc.lineCap('square').moveTo(doc.x, doc.y).lineTo(500, doc.y).stroke();
doc.moveDown();
resources.forEach((val) => {
    doc.text(val);
});
doc.moveDown();
doc.lineCap('square').moveTo(doc.x, doc.y).lineTo(500, doc.y).stroke();
doc.moveDown();
doc.text('As a representative of the company ' + config.name + ' that is the owner of the subnet and/or ASN, I hereby declare that I am authorized to represent ' + config.name + ' and sign for this LOA.');
doc.moveDown();
doc.text('Should you have any questions please email at ' + config.email + ', or call: ' + config.phone_number + ' (' + config.phone_time + ')');
doc.moveDown();
doc.text('Regards,');
doc.text(config.contact_name);
doc.text(config.name);
doc.text(config.contact_title);
doc.text(config.phone_number);
doc.text(config.email);
doc.moveDown();
doc.moveDown();
doc.image('signature.png', doc.x, doc.y, { width: 300 });
doc.end();