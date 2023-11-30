let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// *** read in the data from the website and print it out
d3.json(url).then(function(data){
    console.log(data);  
// ***
    
// *** running the functions created below for the 1st item, running them inside the he call to the website as to only do it once
    nameOptions(data);
    barChart(data, data.names[0]);
    bubbleChart(data, data.names[0]);
    metaData(data, data.names[0]);
// ***
// *** updating the charts for when an new item is selected from the dropdown
    d3.selectAll("#selDataset").on("change", function() {
        let selectedValue = d3.select(this).property("value");
        barChart(data, selectedValue); 
        bubbleChart(data, selectedValue); 
        metaData(data, selectedValue); 
    });
// ***

});

// *** this takes the data from the website and adds it to the dropdown menu to be avaiable for selection
function nameOptions(data) {
let dropdownMenu = d3.select("#selDataset");
// Assign the value of the dropdown menu option to a variable
let names = data.names;
dropdownMenu.html("");
names.forEach(name => {
    dropdownMenu
    .append("option")
    .text(name)
    .attr("value", name);
});
}    
// ***

// *** plotting the values from the website - we need to use slice to get the 10 items and reverse to view the chart horizontally- didnt need to sort
function barChart(data, Identifier) {
     let sampleData = data.samples.find(sample => sample.id === Identifier);
     //console.log(sampleData);

     let trace = {
        x: sampleData.sample_values.slice(0,10).reverse(),
        y: sampleData.otu_ids.slice(0,10).reverse().map(id => `OTU ${id}`),
        type: "bar",
        orientation: "h"
     };

     let plotData = [trace];
     Plotly.newPlot('bar', plotData);

    };
// ***
// *** creating a bubble chart for the values from the website
    function bubbleChart(data, Identifier) {
        let sampleData = data.samples.find(sample => sample.id === Identifier);
        //console.log(sampleData);
   
        let trace = {
           x: sampleData.otu_ids,
           y: sampleData.sample_values,
           mode: "markers",
           marker: {
           size: sampleData.sample_values, // Use sample_values for bubble size
            color: sampleData.otu_ids, // Use otu_ids for bubble color
            colorscale: 'Earth'
           }
        };   
        let layout = {
            xaxis: { title: 'OTU ID' }
        };
   
        let plotData = [trace];
        Plotly.newPlot('bubble', plotData, layout);
    };
// ***
// *** the "sample-metadata' is the id in the html code - so that is how we know what we're updating - append("p") is so it doesnt mush together
    function metaData(data, Identifier) {
        let info = data.metadata.find(sample => `${sample.id}` === Identifier);
        let metadataPanel = d3.select("#sample-metadata");
        metadataPanel.html("");
        //console.log(info);

        Object.entries(info).forEach(([key, value]) => {
            metadataPanel.append("p").text(`${key}: ${value}`);
          });
};