CRN = getURLParameter('CRN');
if (CRN != null) {
    crnArray = CRN.split(',');
}
else {
    crnArray = JSON.parse('{"COLUMNS":["SECTIONID","SEMESTER","YEAR","BANNERCRN"], "DATA":[[192511,3,2013,30611],[192511,3,2013,30611],[192511,3,2013,30611]]}');
}
Semester = getURLParameter('Semester');
Year = getURLParameter('Year');

window.onload = (function () {
    //if the user specifies a year and semester parameter we have to add the semester and year to each crn in the 
    // array.
    if (Semester != null && Year != null) {
        for (var i = 0; i < crnArray.length; i++) {
            crnArray[i] = crnArray[i] + '-' + Semester + '-' + Year;
        }
    }
    crnArray[1]=crnArray[0];
    console.log(crnArray);
    loadCRNData(crnArray);
});