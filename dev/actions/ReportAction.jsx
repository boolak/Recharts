/*pdf左边table内容begin*/
export const REPORT_REQUEST_SUCCESS='REPORT_REQUEST_SUCCESS'
export const REPORT_REQUEST_FAIL='REPORT_REQUEST_FAIL'


function reportRequestSuccess(result) {
  return {
    type: REPORT_REQUEST_SUCCESS,
    result:result
  }
}
 function reportRequestFail(result) {
  return {
    type: REPORT_REQUEST_FAIL,
    result:result
  }
}


export function getReportRequest(json) {
  return (dispatch)=> {
     $.ajax({
          url: HOST_PATH+"/api/pdf.do", // /pdf.do //"./data/report/pdfTable.json"
          dataType:"json", 
          data: json,
          type: "GET",
          success: function(result) {
               return dispatch(reportRequestSuccess(result))
          },
          error: function(result) {
              return  dispatch(reportRequestFail(result))
          }
      });
  }
}
/*pdf左边table内容end*/