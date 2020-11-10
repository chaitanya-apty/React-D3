import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from './sample.json';

var [width, height, adj, padding, margin] = [960, 500, 20, 15, 5];

/**Scales Preparation */
var xScale = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.05);
var yScale = d3.scaleLinear()
    .rangeRound([height, 0]);

function Advanced() {
    const node = useRef(null);
    useEffect(() => {
        if (node.current) {
            data.forEach(d => ({ ...d, val: +d.val }))
            const board = d3.select(node.current)
                             .attr('class', 'svg-content').attr('margin', margin)
                             .attr("viewBox", "-" + adj + " -"+ adj + " " + (width + adj) + " " + (height + adj*2))

            /**Setting Domains {Min and Max values} */
            xScale.domain(data.map((d) => d.cat))
            yScale.domain([0, d3.max(data, (d) => d.val)])

            /** Bars */
            board.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('x', (d, i) => xScale(d.cat))
                .attr('y', (d) => yScale(d.val))
                .attr("width", xScale.bandwidth())
                .attr("height", (d) => height - yScale(d.val));

            /** Axis */
            board.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale));
            board.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(yScale));
        
        }

    }, [node])
    return (
        <div className="Container">
            <h3>Advanced</h3>
            <svg ref={node} width={width} height={height} style={{ padding }}></svg>
        </div>
    );
}

export default Advanced;