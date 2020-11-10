import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from './sample.json';

var [width, height, adj, padding] = [500, 500, 20, 15];

function Sample() {
    const node = useRef(null);
    useEffect(() => {
        if (node.current) {
            data.forEach(d => ({ ...d, val: +d.val }))

            const board = d3.select(node.current).attr('class', 'svg-content').attr('margin', 5)
            board.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr("x", function (d, i) {
                    for (i > 0; i < data.length; i++) {
                        return i * 21;
                    }
                })
                .attr("y", function (d) {
                    return height - (d.val * 10);
                })
                .attr("width", 20)
                .attr("height", function (d) {
                    return d.val * 10;
                });
        }

    }, [node])
    return (
        <div className="Container2">
            <h3>Sample</h3>
            <svg ref={node} width={width} height={height} style={{ padding }}></svg>
        </div>
    );
}

export default Sample;