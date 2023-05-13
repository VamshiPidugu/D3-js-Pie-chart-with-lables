import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-piecharline',
  templateUrl: './piecharline.component.html',
  styleUrls: ['./piecharline.component.css'],
})
export class PiecharlineComponent implements OnInit {
  @ViewChild('parent') parent?: ElementRef;
  constructor(private container: ElementRef) {}
  private pieArc;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createPieChart();
    }, 200);
  }
  ngOnInit(): void {}
  createPieChart() {
    var data = [
      {
        name: 'AAAAAAAAAAAAAAAAAAA',
        value: 0.4624205380678177,
        percentage: 10.6414643242543933,
      },
      {
        name: 'BBBBBBBBBBBBBB',
        value: 0.09248410724103451,
        percentage: 0.12829286433411077,
      },
      {
        name: 'CCCCCCCCCCCCCCCCCCCCCCC',
        value: 0.4624205380678177,
        percentage: 0.6414643242543933,
      },
      {
        name: 'DDDDDDDDDDDDDDDDDDD',
        value: 70.51604080200195,
        percentage: 97.8190212985686,
      },
      {
        name: 'EEEEEEEEEEEEEEEEEEEEEEE',
        value: 0.4624205380678177,
        percentage: 0.6414643242543933,
      },
      {
        name: 'F',
        value: 0.09248410724103451,
        percentage: 0.12829286433411077,
      },
      {
        name: 'G',
        value: 70.51604080200195,
        percentage: 97.8190212985686,
      },
      {
        name: 'H',
        value: 0.4624205380678177,
        percentage: 0.6414643242543933,
      },
      {
        name: 'I',
        value: 0.09248410724103451,
        percentage: 0.12829286433411077,
      },
      {
        name: 'BSS0886512405',
        value: 0.7038064002990723,
        percentage: 4.694733783281939,
      },
      {
        name: 'NUT-NON-MTL ZND',
        value: 0.3789726793766022,
        percentage: 2.5279335909053597,
      },
      {
        name: 'lyt rh',
        value: 1.2668514251708984,
        percentage: 8.45052017375996,
      },
      {
        name: 'lyt lh',
        value: 1.0015705823898315,
        percentage: 6.6809668788019225,
      },
      {
        name: 'gt lh ',
        value: 3.111050605773926,
        percentage: 20.752232963809615,
      },
      {
        name: 'BEARING FLANGE ',
        value: 6.417730808258057,
        percentage: 42.809411259595386,
      },
      {
        name: 'WASHER  CST ZND',
        value: 2.111419200897217,
        percentage: 14.084201349845818,
      },
    ];

    // data.sort(function (a, b) {
    //   return b.value - a.value;
    // });

    var opacity = 0.8;
    var opacityHover = 1;
    var otherOpacityOnHover = 0.8;

    // var chart = d3
    //   .select(this.container.nativeElement)
    //   .select('.pie-chart-container');
    // var svg = chart.select('svg'),
    //   canvas = chart.select('.canvas'),
    //   art = chart.select('.art'),
    //   labels = chart.select('.labels');
    var chart = d3
      .select(this.container.nativeElement)
      .select('.pie-chart-container');
    var svg = chart.append('svg');
    var canvas = svg.append('g').attr('class', 'canvas');
    var art = canvas.append('g').attr('class', 'art');
    var labels = canvas.append('g').attr('class', 'labels');

    var d3Pie = d3.pie();
    d3Pie.value(function (d) {
      return d.value;
    });

    // store our chart dimensions
    var cDim = {
      height: 500,
      width: 450,
      innerRadius: 50,
      outerRadius: 130,
      labelRadius: 145,
    };

    svg.attr('height', cDim.height).attr('width', cDim.width);

    canvas.attr(
      'transform',
      'translate(' + cDim.width / 2 + ', ' + cDim.height / 2 + ')'
    );

    var pieData = d3Pie(data);

    this.pieArc = d3.arc().innerRadius(0).outerRadius(cDim.outerRadius);
    var colors = d3.scaleOrdinal(d3.schemeCategory10);

    var enteringArcs = art.selectAll('.wedge').data(pieData).enter();

    enteringArcs
      .append('path')
      .attr('class', 'wedge')
      .attr('d', this.pieArc)
      .style('fill', function (d, i) {
        return colors(i);
      })
      .style('opacity', opacity)
      .style('stroke', 'white')
      .style('stroke-width', 2)
      .on('mouseover', function (d) {
        let g = d3
          .select('svg')
          .style('cursor', 'pointer')
          .append('g')
          .attr('class', 'tooltip')
          .style('opacity', 0);
        d3.selectAll('path').style('opacity', otherOpacityOnHover);
        d3.select(this).style('opacity', opacityHover);
      })
      .on('mouseout', function (d) {
        d3.select('svg').style('cursor', 'none').select('.tooltip').remove();
        d3.selectAll('path').style('opacity', opacity);
      })
      .on('mousemove', function (d) {})
      .append('title')
      .text(function (d) {
        return d.data['name'] + ' : ' + d.data.value.toFixed(2) + ' kg Co2 e';
      });

    var enteringLabels = labels.selectAll('.label').data(pieData).enter();
    var labelGroups = enteringLabels.append('g').attr('class', 'label');

    var piearc = this.pieArc;
    var lines = labelGroups
      .append('line')
      .attr('x1', function (d, i) {
        return piearc.centroid(d)[0] * 1.3;
      })
      .attr('y1', function (d) {
        return piearc.centroid(d)[1];
      })
      .attr('x2', function (d) {
        var centroid = piearc.centroid(d),
          midAngle = Math.atan2(centroid[1], centroid[0]);
        return Math.cos(midAngle) * cDim.labelRadius;
      })
      .attr('y2', function (d) {
        var centroid = piearc.centroid(d),
          midAngle = Math.atan2(centroid[1], centroid[0]);
        return Math.sin(midAngle) * cDim.labelRadius;
      })
      .attr('class', 'label-line')
      .attr('stroke', function (d, i) {
        return colors(i);
      });

    var textLabels = labelGroups
      .append('text')
      .attr('x', function (d, i) {
        var centroid = piearc.centroid(d),
          midAngle = Math.atan2(centroid[1], centroid[0]),
          x = Math.cos(midAngle) * cDim.labelRadius,
          sign = x > 0 ? 1 : -1;
        return x + sign * 5; // Return the x coordinate adjusted by 10 pixels to the left if x is negative, or to the right if x is positive.
      })
      .attr('y', function (d, i) {
        var centroid = piearc.centroid(d),
          midAngle = Math.atan2(centroid[1], centroid[0]),
          y = Math.sin(midAngle) * cDim.labelRadius;

        return y;
      })
      .style('fill', function (d, i) {
        return colors(i);
      })
      .style('stroke', 1)
      //.style('font-weight', 'bold')
      .text(function (d, i) {
        console.log(d);
        return d.data.percentage.toFixed(2) + '%';
      })
      .attr('text-anchor', function (d, i) {
        var centroid = piearc.centroid(d),
          midAngle = Math.atan2(centroid[1], centroid[0]);

        if (midAngle < -Math.PI / 2 || midAngle > Math.PI / 2) {
          return 'end';
        } else {
          return 'start';
        }
      });

    var alpha = 0.5,
      spacing = 15;

    function relax() {
      var again = false;
      textLabels.each(function (d, i) {
        var a = this,
          da = d3.select(a),
          y1 = da.attr('y');
        textLabels.each(function (d, j) {
          var b = this;
          if (a === b) {
            return;
          }

          var db = d3.select(b);
          if (da.attr('text-anchor') !== db.attr('text-anchor')) {
            return;
          }

          var y2 = db.attr('y');
          var deltaY = y1 - y2;

          if (Math.abs(deltaY) > spacing) {
            return;
          }

          again = true;
          var sign = deltaY > 0 ? 1 : -1;
          var adjust = sign * alpha;
          da.attr('y', +y1 + adjust);
          db.attr('y', +y2 - adjust);
        });
      });

      if (again) {
        var labelElements = textLabels.nodes();
        lines.attr('y2', function (d, i) {
          var labelForLine = d3.select(labelElements[i]);
          return labelForLine.attr('y');
        });
        setTimeout(relax, 20);
      }
    }

    relax();

    let legend = d3
      .select('.pie-chart-container')
      .append('div')
      .attr('class', 'legend')
      .style('font', 'normal normal bold 12px/16px Montserrat')
      .style('margin-left', '700px')
      .style('margin-top', '-500px');

    let keys = legend
      .selectAll('.key')
      .data(data)
      .enter()
      .append('div')
      .attr('class', 'key')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('margin-right', '20px');
    keys
      .append('div')
      .attr('class', 'symbol')
      .style('height', '10px')
      .style('width', '10px')
      .style('margin', '5px 15px')
      .style('background-color', (d: any, i: any) => colors(i));

    keys
      .append('div')
      .attr('class', 'name')
      .style('font', 'normal normal bold 12px/16px Montserrat')
      .style('text-transform', 'capitalize')
      .text((d) => `${d['name']}`);

    keys.exit().remove();
  }
}
