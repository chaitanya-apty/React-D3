import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from './sample.json';
import { format, max, tickFormat } from 'd3';

var [width, height, adj, padding, margin] = [960, 500, 15, 15, 25];

function Advanced2() {
    const node = useRef(null);
    useEffect(() => {
        if (node.current) {
            data.forEach(d => ({ ...d, population: +d.population * 100 }))
            const board = d3.select(node.current)
                .attr('class', 'svg-content').attr('margin', margin)
                .attr("viewBox", "-" + adj + " -" + adj + " " + (width + adj - 4*margin) + " " + (height + adj * 2 ))
            
            const xScale = d3.scaleLinear()
                .domain([0, max(data, (d) => d.population)])
                .rangeRound([0, width])

            const yScale = d3.scaleBand()
                .domain(data.map(d => d.country))
                .rangeRound([height, 0])
                .paddingInner(0.05);


            const tickFormated = n => format('.2s')(n).replace('G', 'B')

            board.append("g")
                .attr("class", "y-axis")
                .call(d3.axisLeft(yScale))
                .selectAll('.domain, .tick line').remove();

            const xAxisG = board.append("g")
            .attr("class", "x-axis")
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale).tickFormat(tickFormated).tickSize(-height - margin));

            xAxisG.selectAll('.domain').remove();
            xAxisG.append('text')
                    .attr('y', 30)
                    .attr('fill', 'black')
                    .text('Population (In Millions)')
                    .attr('x', width /2 )

            board.append('text').text('Top Populous Countries...').attr('x', width / 3)

            board.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('width', (d) => xScale(d.population))
                .attr('height', yScale.bandwidth())
                .attr('y', (d) => yScale(d.country))
        }

    }, [node])
    return (
        <div className="Container2">
            <h3>Advanced2</h3>
            <svg ref={node} width={width} height={height} style={{ padding }}></svg>
        </div>
    );
}

export default Advanced2;