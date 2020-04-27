$(document).ready(function() {

  function fetchData() {
    return $.ajax({
      url: "https://spreadsheets.google.com/feeds/cells/1yWktNoK3GUUx6hs7U50brxCt5gSMLkWRhFdRRBPaDE8/1/public/full?min-row=3&min-col=9&max-col=11&alt=json"
    })
  }


  function parseGoogleSheetData (rsp) {
    return rsp.feed.entry.map(function (entry) {
      return entry.content.$t
    });
  }

  fetchData().then(function(resp) {
    resp = parseGoogleSheetData(resp);
    setValue("meals_sent", resp[0]);
    setValue("money_balance", resp[2] - resp[1]);
    setValue("money_raised", resp[2]);
  })

  function setValue(elementId, value) {
    value && $(`#${elementId}`).text(value);
  }
});