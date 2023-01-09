d3.csv("vuldb.csv").then(function (data) {
  // console.log(data);

  var vuldb = data;

  var button = d3.select("#button");

  var form = d3.select("#form");

  button.on("click", runEnter);
  form.on("submit", runEnter);

  function runEnter() {
    d3.select("tbody").html("")
    d3.selectAll("p").classed('noresults', true).html("")
    d3.event.preventDefault();
    var inputElement = d3.select("#user-input");
    var inputValue = inputElement.property("value").toLowerCase().trim();

    // console.log(inputValue.length);
    // console.log(vuldb);
    if (inputValue.length < 6){
      d3.select("p").classed('noresults2', true).html("<center><strong>Please try using more than 5 characters to avoid too many results!</strong>")
      inputValue = "Something to give no results"
    }
    var filteredData = vuldb.filter(vuldb => vuldb.vulnerability.toLowerCase().trim().includes(inputValue));
    // console.log(filteredData.length)
    if (filteredData.length === 0 && inputValue !== "Something to give no results"){
      d3.select("p").classed('noresults', true).html("<center><strong>No results. Please check your spelling!</strong>")
    }
    output = _.sortBy(filteredData, 'avg_vote').reverse()

    for (var i = 0; i < filteredData.length; i++) {
      // console.log(output[i]['original_title'])
      // console.log(output[i]['avg_vote'])
      // d3.select("tbody>tr>td").text(output[i]['original_title']);
      d3.select("tbody").insert("tr").html("<td>"+[i+1]+"</td>"+"<td>"+(output[i]['vulnerability'])
      + "</td>" +"<td>" +(output[i]['description'])+"</td>" +"<td>" +(output[i]['impact'])+"</td>"  +"<td>" +(output[i]['likelihood'])+"</td>"+"<td>" +(output[i]['remediation'])+"</td>"+"<td>" +(output[i]['reference'])+"</td>"+"<td>" +(output[i]['severity'])+"</td>"+"<td>" +(output[i]['category'])+"</td>"+"<td>" +(output[i]['rating'])+"</td>"+"<td>" +(output[i]['cvss'])+"</td>"+"<td>" +(output[i]['database'])+"</td>"+"<td>" +(output[i]['source'])+"</td>").on("click", function(d) {
      "<b>"+[i+1]+"</b>"+"<br>"+"<b>"+(output[i]['vulnerability'])
      + "</b>" +"<br>"+"<b>"+"Description"+"</b>"+"<br>"+"<i>" +(output[i]['description'])+"</i>" +"<br>"+"<br>"+"<b>"+"Impact"+"</b>"+"<br>"+
        "<i>" +(output[i]['impact'])+"</i>"  +"<br>"+"<br>"+"<b>"+"Likelihood"+"</b>"+"<br>"+"<i>" +(output[i]['likelihood'])+"<i>"+"<br>"+"<br>"+"<b>"
        +"Remediation"+"</b>"+"<br>"+"<i>" +(output[i]['remediation'])+"</i>"+"<br>"+"<br>"+"<b>"+"Reference"+"</b>"+"<br>"+
        "<i>" +(output[i]['reference'])+"</i>"+"<br>"+"<br>"+"<b>"+"Severity"+"</b>"+"<br>"+"<i>" +(output[i]['severity'])+"</i>"+
        "<br>"+"<br>"+"<b>"+"Category"+"</b>"+"<br>"+"<i>" +(output[i]['category'])+"</i>"+"<br>"+"<br>"+"<b>"+"Rating"+"</b>"+"<br>"+
        "<i>" +(output[i]['rating'])+"</i>"+"<br>"+"<br>"+"<b>"+"CVSS"+"</b>"+"<br>"+"<i>" +(output[i]['cvss'])+"</i>"+
        "<br>"+"<br>"+"<b>"+"Database"+"</b>"+"<br>"+"<i>" +(output[i]['database'])+"</i>"+"<br>"+"<br>"+"<b>"+"Source"+"</b>"+"<br>"+
        "<i>" +(output[i]['source'])+"</i>")
      }
  };
  window.resizeTo(screen.width,screen.height)


});
