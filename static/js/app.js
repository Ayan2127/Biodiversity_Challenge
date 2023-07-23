let url =
      "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    // Fetch/read drop down element to set event listener
    /// without event listener, data won't refresh 
    ////source: https://www.geeksforgeeks.org/different-ways-to-access-html-elements-using-javascript/
    let dropdown = document.getElementById("selDataset");
    dropdown.addEventListener("change", getData);

    // Define the data variable to hold fetched data
    let data = []; 
   
    // Fetch JSON data
    d3.json(url).then(function (jsonData) {
      console.log(jsonData);

      // Assign the fetched data to 'data'
      data = jsonData;

      // Populate the dropdown menu with names from the fetched data
      populateDropdown(data.names);
    });
      // Append ids as dropdown list using option element
      //source: https://www.javascripttutorial.net/javascript-dom/javascript-select-box/
    function populateDropdown(names) {
      names.forEach((name) => {
        let subjectId = document.createElement("option");
        subjectId.text = name; //  Set the visible text of the option
        subjectId.value = name; // Set value associated with option
        dropdown.append(subjectId); //append to drowpdown
      });
    }
    //Function getData references event listener in line 7
    function getData() {
      let selectName = dropdown.value;

      // Retrieve the necessary data based on the selected name
      let allData = data.samples.find(
        (sample) => sample.id.toString() === selectName
      );
      let otu_ids = allData.otu_ids;
      let otu_labels = allData.otu_labels;
      let sample_values = allData.sample_values;

      // Create trace for horizontal bar chart & slice and reverse the data
      let trace1 = {
        x: sample_values.slice(0, 10).reverse(), // Slicing and reversing here
        y: otu_ids.slice(0, 10).map((id) => `OTU ${id}`).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        name: "otu_ids",
        type: "bar",
        orientation: "h",
      };

      // Create the layout for the horizontal bar chart
      let layout = {
        title: `Top 10 OTUs Found for Subject ID ${selectName}`,
        margin: {
          t: 30, // top margin
          r: 100, // right margin
          b: 30, // bottom margin
          l: 100, // left margin
        },
        height: 500, // Adjust the height of the chart
        width: 500, // Adjust the width of the chart
      };

      // Generate the horizontal bar chart by referencing relative div
      Plotly.newPlot("bar", [trace1], layout);

      // Create the trace for the bubble chart
      //source: https://plotly.com/python/bubble-charts/
      let trace2 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: 'Rainbow', 
        },
      };

      // Create the layout for bubble chart
      let bubbleLayout = {
        title: `Bubble Chart for Subject ID ${selectName}`,
        xaxis: { title: 'OTU IDs' },
        yaxis: { title: 'Sample Values' },
      };

      // Generate the bubble chart by referencing relative div
      Plotly.newPlot("bubble", [trace2], bubbleLayout);

      // Update the metadata section
      updateMetadata(selectName);

  }
    

    function updateMetadata(selectName) {
      // Retrieve metadata for every selected subject id in dropdown list
      let metadata = data.metadata.find(
        (subjectsData) => subjectsData.id.toString() === selectName
      ); 

      // Create an array of strings representing the metadata
      // Use '<strong>' to bold key values  
      let sampleMetaData = Object.entries(metadata).map(
        ([key, value]) => `<strong>${key}:</strong> ${value}`
      );

      // Join array elements into a single string with line breaks
      let parsedData = sampleMetaData.join(" <br>");

      // Get sample data to reference relevant div element  
      let sampleMetadataDiv = document.getElementById("sample-metadata");

      // Update div with the parsed data
      sampleMetadataDiv.innerHTML = parsedData;

      // Console log to confirm data matches
      console.log("Metadata for selected name:", metadata);


    generateGaugeChart(metadata.wfreq);
    // Function to generate the Gauge Chart
    function generateGaugeChart(wfreq) {
    // Create the trace for the gauge chart
    let traceGauge = {
        type: "indicator",
        mode: "gauge+number",
        value: wfreq,
        title: { text: "Belly Button Washing Frequency<br><sub>Scrubs per Week</sub>" },
        gauge: {
          axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "black" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 1], color: "rgba(255, 255, 255, 0.8)", label: "0 - 1" },
            { range: [1, 2], color: "rgba(200, 230, 200, 0.8)", label: "1 - 2" },
            { range: [2, 3], color: "rgba(150, 210, 150, 0.8)", label: "2 - 3" },
            { range: [3, 4], color: "rgba(100, 190, 100, 0.8)", label: "3 - 4" },
            { range: [4, 5], color: "rgba(50, 170, 50, 0.8)", label: "4 - 5" },
            { range: [5, 6], color: "rgba(0, 150, 0, 0.8)", label: "5 - 6" },
            { range: [6, 7], color: "rgba(0, 130, 0, 0.8)", label: "6 - 7" },
            { range: [7, 8], color: "rgba(0, 110, 0, 0.8)", label: "7 - 8" },
            { range: [8, 9], color: "rgba(0, 90, 0, 0.8)", label: "8 - 9" },
         ], // source: https://www.htmlgoodies.com/css/color-manipulation-javascript/
    
        },
      };
    

      // Generate the gauge chart
      let gaugeData = [traceGauge];
      let gaugeLayout = { width: 500, height: 400};
      Plotly.newPlot("gauge", gaugeData, gaugeLayout);
      console.log(gaugeData);
    }

}
