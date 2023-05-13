import { Component, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
export interface MyData {
  name: string;
  value: number;
}
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.createPieChart();
  }

  createPieChart() {
    var data: MyData[] = [
      { name: 'A', value: 900 },
      { name: 'B', value: 20 },
      { name: 'C', value: 30 },
      { name: 'D', value: 15 },
      { name: 'E', value: 10 },
      { name: 'F', value: 20 },
    ];

    function format(x) {
      return parseFloat(x.toFixed(4));
    }
    const total = data.map((item) => item.value).reduce((a, b) => a + b, 0);
    console.log(total);
    var text = '';

    var width = 500;
    var height = 300;
    var thickness = 40;
    var duration = 750;
    var padding = 10;
    var opacity = 0.8;
    var opacityHover = 1;
    var otherOpacityOnHover = 0.8;
    var tooltipMargin = 13;
    var angle = (2 * Math.PI) / data.length;
    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3
      .select('.pie-chart-container')
      .append('svg')
      .attr('class', 'pie')
      .attr('width', width)
      .attr('height', height);

    var g = svg
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    var arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius - 10);

    var labelArc = d3
      .arc()
      .outerRadius(radius * 0.9)
      .innerRadius(radius * 0.9);

    var pie = d3
      .pie()
      .value(function (d: any) {
        return d.value;
      })
      .sort(null);
    //console.log(pie(data))

    var path = g
      .selectAll('path')
      .data(pie(<any>data))
      .enter()
      .append('g')
      .append('path')
      .attr('d', function (d: any) {
        return arc(d);
      })
      .attr('fill', (d: any, i: any) => color(i))
      .style('opacity', opacity)
      .style('stroke', 'white')
      .style('stroke-width', 2)
      .on('mouseover', function (d) {
        d3.selectAll('path').style('opacity', otherOpacityOnHover);
        d3.select(this).style('opacity', opacityHover);

        let g = d3
          .select('svg')
          .style('cursor', 'pointer')
          .append('g')
          .attr('class', 'tooltip')
          .style('opacity', 0);

        // g.append('text')
        //   .attr('class', 'name-text')
        //   .text('Product')
        //   .attr('text-anchor', 'start');

        // let text = g.select('text');
        // let bbox = (text.node() as SVGSVGElement).getBBox();
        // let padding = 2;
        // g.insert('rect', 'text')
        //   .attr('x', bbox.x - padding)
        //   .attr('y', bbox.y - padding)
        //   .attr('width', bbox.width + padding * 2)
        //   .attr('height', bbox.height + padding * 2)
        //   .style('fill', 'white')
        //   .style('opacity', 0.75);
      })
      .on('mousemove', function (d) {
        // let mousePosition = d3.mouse(this);
        // let x = mousePosition[0] + width / 2;
        // let y = mousePosition[1] + height / 2 - tooltipMargin;
        // let text = d3.select('.tooltip text');
        // let bbox = (text.node() as SVGSVGElement).getBBox();
        // if (x - bbox.width / 2 < 0) {
        //   x = bbox.width / 2;
        // } else if (width - x - bbox.width / 2 < 0) {
        //   x = width - bbox.width / 2;
        // }
        // if (y - bbox.height / 2 < 0) {
        //   y = bbox.height + tooltipMargin * 2;
        // } else if (height - y - bbox.height / 2 < 0) {
        //   y = height - bbox.height / 2;
        // }
        // d3.select('.tooltip')
        //   .style('opacity', 1)
        //   .attr('transform', `translate(${x}, ${y})`);
      })
      .on('mouseout', function (d) {
        d3.select('svg').style('cursor', 'none').select('.tooltip').remove();
        d3.selectAll('path').style('opacity', opacity);
      });
    // .on('touchstart', function (d) {
    //   d3.select('svg').style('cursor', 'none');
    // });

    path.append('title').text(function (d: any) {
      return d.data.name + ' :  ' + d.data.value;
    });

    var getAngle = function (d) {
      return ((180 / Math.PI) * (d.startAngle + d.endAngle)) / 2 - 90;
    };

    function midAngle(d) {
      return arc.startAngle()(d) + arc.endAngle()(d) - arc.startAngle()(d) / 2;
    }

    var text = g
      .selectAll('text')
      .data(pie(<any>data))
      .enter()
      .append('text')
      .attr('transform', function (d) {
        var pos = labelArc.centroid(d);
        pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
      })
      .text(function (d) {
        console.log(d.data.name);
        return 'k';
      })
      .style('text-anchor', function (d) {
        return midAngle(d) < Math.PI ? 'start' : 'end';
      })
      .attr('stroke', function (d, i) {
        return color(i);
      })
      .attr('class', 'name-text')
      .attr('transform', (d) => {
        const [x, y] = labelArc.centroid(d);
        return `translate(${x - 30}, ${y})`;
      })
      .text((d) => d.data.value);

    // var polyline = g
    //   .selectAll('polyline')
    //   .data(pie(<any>data))
    //   .enter()
    //   .append('polyline')
    //   //.attr('dx','2.5em')
    //   .attr('points', function (d) {
    //     var pos = labelArc.centroid(d);
    //     console.log(pos + '   ' + d.data.name);
    //     pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
    //     return [arc.centroid(d), labelArc.centroid(d), pos];
    //   })

    //   .style('opacity', opacity)
    //   .style('stroke', 'black')
    //   //.style('stroke', (d: any, i: any) => color(i))
    //   .style('stroke-width', 1)

    //   .style('fill', 'none');

    var polyline = g
      .selectAll('polyline')
      .data(pie(<any>data))
      .enter()
      .append('polyline')
      .attr('points', function (d) {
        var pos = labelArc.centroid(d);
        pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
        return [arc.centroid(d), labelArc.centroid(d), pos];
      })
      .style('opacity', opacity)
      .attr('stroke', function (d, i) {
        return color(i);
      })
      .style('stroke-width', 1.5)
      .style('fill', 'none')
      .attr('stroke-linecap', 'round');
  }
}
