import { 
  			select, 
        csv, 
        scaleLinear, 
        extent, 
  			scaleTime,
        line,
  			area,
  			curveBasis,
        axisLeft,
  			axisBottom,
  			format
} from 'd3'

const svg = select('svg');


const height = +svg.attr('height');
const width = +svg.attr('width');
const circleRadius = 3;



const render = data => {
  const xValue = d => d.timestamp;
  const xAxisLabel = 'Time'
  const yValue = d => d.temperature;
  const yAxisLabel = 'Temperature (Celsius)'
  const title = 'Time vs. Temperature in San Francisco';
  const margin = {top: 70, right: 50, bottom: 90, left: 90}
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  const xScale = scaleTime()
  	.domain(extent(data,xValue))
  	.range([0, innerWidth]);
  
  const yScale = scaleLinear()
  	.domain(extent(data,yValue))
  	.range([innerHeight,0]) // reversed
  	.nice();
  	

  
	const g = svg.append('g')
  	.attr('transform',`translate(${margin.left},${margin.top})`);

  
const xAxis = axisBottom(xScale)
	.tickSize(-innerHeight)
	.tickPadding(20)
	.ticks(7);

const yAxis = axisLeft(yScale)
  .tickSize(-innerWidth)
	.tickPadding(10);
  
const yAxisG = g.append('g').call(yAxis)
  
yAxisG.selectAll('.domain').remove();
yAxisG.append('text')
  .attr('class','axis-label')
  .attr('y',-50)
  .attr('x',-innerHeight/2)
  .attr('transform',`rotate(-90)`)
  .attr('fill','black')
  .attr('text-anchor','middle')
  .text(yAxisLabel);
  
const xAxisG = g.append('g').call(xAxis)
  .attr('transform',`translate(0,${innerHeight})`)

xAxisG.selectAll('.domain').remove();
xAxisG.append('text')
  	.attr('class','axis-label')
  	.attr('y',70)
  	.attr('x',innerWidth/2)
  	.attr('fill','black')
  	.text(xAxisLabel);
  
  const areaGenerator = area()
  	.x(d => xScale(xValue(d)))
  	.y0(innerHeight)
  	.y1(d => yScale(yValue(d)))
  	.curve(curveBasis);
  
  g.append('path')
  	.attr('stroke','black')
  	.attr('class','line-path')
  	.attr('d', areaGenerator(data));
  
  
	g.selectAll('circle').data(data)
  	.enter().append('circle')
  		.attr('cy', d => yScale(yValue(d)))
  		.attr('cx', d => xScale(xValue(d)))
  		.attr('r', circleRadius)
  
  g.append('text')
  	.attr('class','title')
  	.attr('y',-20)
  	.attr('x',innerWidth/2)
  	.attr('text-anchor','middle')	
  	.text(title);
  	

};

csv('https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv')
  .then(data => {
    data.forEach(d => {
      d.temperature = +d.temperature;
      d.timestamp = new Date(d.timestamp);
    });
    render(data);
	});




