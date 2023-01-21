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
    output = _.sortBy(filteredData, 'vulnerability')
 
    for (var i = 0; i < filteredData.length; i++) {
      // console.log(output[i]['original_title'])
      // console.log(output[i]['avg_vote'])
      // d3.select("tbody>tr>td").text(output[i]['original_title']);
	var sevValue = (output[i]['severity']).toLowerCase().trim();
	    var myString = (output[i]['cvss']);
	    myString = myString.replace(/^\(+|\)+$/g, '');	
      d3.select("tbody").insert("tr").attr("class","accordion-item").html("<td>"+"<strong>"+[i+1]+"</strong>"+"</td>"
									  +"<td>"
									  +"<div class=\"d-flex justify-content-between flex-wrap\">"
									  +"<button class=\"btn btn-primary\" type=\"button\" data-bs-toggle=\"modal\" data-bs-target=\"#ModalFullscreen"
									  +[i+1]+"\">"+(output[i]['vulnerability'])
									  +"</button>"
									  +"</div>"
									  +"</td>"
									  +"<td>"+"<strong>" +(output[i]['category'])+"</strong>"+"</td>"
									  +"<td data-status=\""+sevValue+"\" class=\"sevstatus\">"+"<strong>" +(output[i]['severity'])+"</strong>"+"</td>"
									  +"<td>"+"<strong>" +(output[i]['database'])+"</strong>"+"</td>"
									  +"<td>"+"<strong>" +(output[i]['source'])+"</strong>"+"</td>"
									  +"<div id=\"ModalFullscreen"+[i+1]+"\" class=\"modal fade\" aria-labelledby=\"ModalFullscreenLabel"
									  +[i+1]+"\" aria-hidden=\"true\">"
									  +"<div class=\"modal-dialog modal-dialog-centered modal-dialog-scrollable\">"
									  +"<div class=\"modal-content\">"
									  +"<div class=\"modal-header\">"
									  +"<h5 class=\"modal-title h4 sevstatus\" data-status=\"txt"+sevValue+"\" id=\"ModalFullscreenLabel"+[i+1]+"\">"+(output[i]['vulnerability'])
									  +"</h5>"
									  +"</div>"
									  +"<div class=\"modal-body\">"
									  +"<p><em><u><strong>Description:</strong></u></em>"+"<br>"+(output[i]['description'])+"</p>"
	      +"<p><em><u><strong>Impact:</strong></u></em>"+"<br>"+(output[i]['impact'])+"</p>"
	      +"<p><em><u><strong>Likelihood:</strong></u></em>"+"<br>"+(output[i]['likelihood'])+"</p>"
	      +"<p><em><u><strong>Remediation:</strong></u></em>"+"<br>"+(output[i]['remediation'])+"</p>"
	      +"<p><em><u><strong>Reference:</strong></u></em>"+"<br>"+(output[i]['reference'])+"</p>"
	      +"<p><em><u><strong>Severity:</strong></u></em>"+"<br>"+"<p data-status=\""+sevValue+"\" class=\"sevstatus\">"+"<strong>"+(output[i]['severity'])+"</strong>"+"</p>"+"</p>"
	      +"<p><em><u><strong>Rating:</strong></u></em>"+"<br>"+(output[i]['rating'])+"</p>"
	      +"<p><em><u><strong>CVSS:</strong></u></em>"+"<br>"+"<a href=\"https://www.first.org/cvss/calculator/3.1#"+myString+"\">"+myString+"</a>"+"</p>"
	      +"<p><em><u><strong>Database:</strong></u></em>"+"<br>"+(output[i]['database'])+"</p>"
	      +"<p><em><u><strong>Source:</strong></u></em>"+"<br>"+(output[i]['source'])+"</p>"+"<br>"
									  +"<input autocomplete='off' type='text' class='form-control' id='cve-input"+[i+1]+"' placeholder='Enter vulnerability for finding CVE' value='"+(output[i]['vulnerability'])+"'>"
									  +"<button class='btn btn-primary' id='loadjson"+[i+1]+"' onclick='loadCVE"+[i+1]+"(this)'>Load CVE</button>"+"<br>"+"<br>"
									  +"<div id='popupmodaltable"+[i+1]+"'>"
									  +"</div>"
									  
	      +"</div>"
	      +"<div class=\"modal-footer\">"
	      +"<button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>"
	      +"</div>"
	      +"</div>"
	      +"</div>"
	      +"</div>"									  
	    );
	    d3.select("body").append("script").attr("type", "text/javascript").html("function loadCVE"+[i+1]+"() {"
									  +"console.log(this);"
									  +"var label = document.getElementById('cve-input"+[i+1]+"').value;"
+"var jsonData = new XMLHttpRequest();"
+"jsonData.open(\"GET\", \"https://api.cvesearch.com/search?q=\"+label, false);"
+"jsonData.send(null);"
+"  var jdata = JSON.parse(jsonData.responseText);"
										    +"var count = Object.keys(jdata).length;"
										    +"if (jdata.length < 135){"
										    +"jdata = \"timed out\";"
										    +"    var jtrout = `<table id=\"TableWithRules\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><thead><tr><th style=\"padding:3px\" valign=\"top\">Name</th><th style=\"padding:3px\" valign=\"top\">Description</th></tr></thead><tbody>"
+"<tr><td valign=\"top\" nowrap=\"nowrap\">CVE search timed out. Please try again.</td></tr></tbody></table>`;"
+"    document.querySelector('#popupmodaltable"+[i+1]+"').innerHTML = jtrout;"
    +"}"
    +"if (jdata[\"meta\"][\"count\"] === 0 && jdata !== \"timed out\"){"
      +"    var jtrno = `<table id=\"TableWithRules\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><thead><tr><th style=\"padding:3px\" valign=\"top\">Name</th><th style=\"padding:3px\" valign=\"top\">Description</th></tr></thead><tbody>"
+"<tr><td valign=\"top\" nowrap=\"nowrap\">No result found. Please try again.</td></tr></tbody></table>`;"
+"    document.querySelector('#popupmodaltable"+[i+1]+"').innerHTML = jtrno;"
    +"}"
+"  for (key in jdata.response) {"
+"	var jtr = key;"
+"	var jzr = `${jtr}`;"
+"    var jtr = `<table id=\"TableWithRules\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><thead><tr><th style=\"padding:3px\" valign=\"top\">Name</th><th style=\"padding:3px\" valign=\"top\">Description</th></tr></thead><tbody>"
+"<tr><td valign=\"top\" nowrap=\"nowrap\"><a href=\"https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-${jtr}\">${jtr}</a></td><td valign=\"top\">${jdata[\"response\"][jzr][\"basic\"][\"description\"]}</td></tr></tbody></table>`;"
+"    document.querySelector('#popupmodaltable"+[i+1]+"').innerHTML = jtr;"
+"}}")
	    
  }  };
	 
  window.resizeTo(screen.width,screen.height)

});


