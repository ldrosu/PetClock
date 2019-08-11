// Service to use d3 to rotate the hands with transition animation
import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class D3Service {

  constructor() {}
  // rotate element without transition used in initial positioning of the hands
  public rotateElement(element: any, angle: number): void {
    d3.select(element)
      .attr('transform', () => 'rotate(' + angle + ')');
  }
  // rotate element with transition
  public rotateElementWithTransition(element: any, angle: number, duration: number): void {
    d3.select(element)
    .transition().duration(duration)
    .attr('transform', () => 'rotate(' + angle + ')');
  }
  //
  public getPathFromArc(innerRadius: number, outerRadius: number, startAngle: number, endAngle: number): string {
    const arcGenerator = d3.arc();
    const pathData: string = arcGenerator({
      startAngle: startAngle * Math.PI / 180,
      endAngle: endAngle * Math.PI / 180,
      innerRadius: innerRadius,
      outerRadius: outerRadius
    });
    return pathData;
  }
}



