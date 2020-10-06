var fill_pdf = require('fill-pdf-utf8');
 
fill_pdf.generatePdf({fields:{Name:'ปุณยวีร์ โพธิ์ศรี',Pre:'นาย'}},'TestForm4New.pdf',{fontSize: 8.0},'result.pdf',function (error, stdout, stderr) {
    if(error){
        throw error;
    }
    console.log(stdout);
})
 