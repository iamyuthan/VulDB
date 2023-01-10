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
      d3.select("tbody").insert("tr").attr("class","accordion-item").html("<td>"+[i+1]+"</td>"+"<td class=\"accordion-header\" id=\"heading"+[i+1]+"\">"+"<button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapse"+[i+1]+"\" aria-expanded=\"false\" aria-controls=\"collapse"+[i+1]+"\">"+(output[i]['vulnerability'])+"</button>"
      + "</td>" +"<td>" +(output[i]['category'])+"</td>"+"<td>" 
	  
	  +"<div id=\"collapse"+[i+1]+"\" class=\"accordion-collapse collapse\" aria-labelledby=\"heading"+[i+1]+"\" data-bs-parent=\"#accordionExample\"  style=\"text-align:left;\">"
      +"<div class=\"accordion-body\">"
	  +"<strong>Description:</strong>"+"<br>"+"<span>"+
	  +(output[i]['description'])+"</span>"+"<br>"+"<br>"
	  +"<strong>Impact:</strong>"+"<br>"
	  +(output[i]['impact'])+"<br>"+"<br>"
	  +"<strong>Likelihood:</strong>"+"<br>"
	  +(output[i]['likelihood'])+"<br>"+"<br>"
	  +"<strong>Remediation:</strong>"+"<br>"
	  +(output[i]['remediation'])+"<br>"+"<br>"
	  +"<strong>Reference:</strong>"+"<br>"
	  +(output[i]['reference'])+"<br>"+"<br>"
	  +"<strong>Severity:</strong>"+"<br>"
	  +(output[i]['severity'])+"<br>"+"<br>"
	  +"<strong>Rating:</strong>"+"<br>"
	  +(output[i]['rating'])+"<br>"+"<br>"
	  +"<strong>CVSS:</strong>"+"<br>"
	  +(output[i]['cvss'])+"<br>"+"<br>"
	  +"<strong>Database:</strong>"+"<br>"
	  +(output[i]['database'])+"<br>"+"<br>"
	  +"<strong>Source:</strong>"+"<br>"
	  +(output[i]['source'])+"<br>"+"<br>"+"</div>"+"</div>")
    }  };
  window.resizeTo(screen.width,screen.height)


});
