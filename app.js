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
    output = _.sortBy(filteredData, 'vulnerability').reverse().reverse()

    for (var i = 0; i < filteredData.length; i++) {
      // console.log(output[i]['original_title'])
      // console.log(output[i]['avg_vote'])
      // d3.select("tbody>tr>td").text(output[i]['original_title']);
      d3.select("tbody").insert("tr").attr("class","accordion-item").html("<td class=\"accordion-header\" id=\"heading"+[i+1]+"\">"+[i+1]+"</td>"+"<td>"+(output[i]['vulnerability'])
      + "</td>" +"<td>" +(output[i]['description'])+"</td>" +"<td>" +(output[i]['impact'])+"</td>"  +"<td>" +(output[i]['likelihood'])+"</td>"+"<td>" +(output[i]['remediation'])+"</td>"+"<td>" +(output[i]['reference'])+"</td>"+"<td>" +(output[i]['severity'])+"</td>"+"<td>" +(output[i]['category'])+"</td>"+"<td>" +(output[i]['rating'])+"</td>"+"<td>" +(output[i]['cvss'])+"</td>"+"<td>" +(output[i]['database'])+"</td>"+"<td>" +(output[i]['source'])+"</td>")
    }  };
  window.resizeTo(screen.width,screen.height)


});
