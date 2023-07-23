# Biodiversity_Challenge

Belly Button Biodiversity Dashboard

Build an interactive dashboard that allows users to explore the Belly Button Biodiversity dataset. This dataset catalogs the microbes found in human navels and reveals interesting insights, such as a small number of microbial species being present in over 70% of people, while others are relatively rare.

In this project, we'll use HTML, CSS, and JavaScript along with the Plotly.js library to create interactive charts. The dashboard will feature a dropdown to select different subject IDs, and upon selection, it will display a bar chart and a bubble chart showcasing the microbial data for the chosen subject. Additionally, the dashboard will show metadata for each selected subject, providing valuable information about the microbes' prevalence.

Once completed, you can deploy the interactive dashboard on GitHub Pages to make it easily accessible and shareable.



Challenge logistics:

Fetched JSON data from the provided URL using the d3.json() method.

Populated the dropdown menu with subject IDs from the fetched data using the populateDropdown() function.

Set up an event listener on the dropdown to trigger the getData() function when the selected value changes.

Retrieved the necessary data based on the selected subject ID from the fetched JSON data.

Generated a horizontal bar chart using Plotly, displaying the top 10 operational taxonomic units (OTUs) found for the selected subject ID.


Created a bubble chart using Plotly, showing the distribution of OTUs and their sample values for the selected subject ID.

Implemented a basic gauge chart with a color gradient, indicating the frequency of belly button scrubs per week for the selected subject ID. The color gradient should range from light to dark, representing different scrub frequencies.



Tools & Methods: JavaScript, HTML, CSS, JSON, Plotly.js, D3 Library


Sources: 

https://www.geeksforgeeks.org/different-ways-to-access-html-elements-using-javascript/

https://www.javascripttutorial.net/javascript-dom/javascript-select-box/

https://plotly.com/python/bubble-charts/


