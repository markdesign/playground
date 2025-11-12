Cheat sheet



## flip y scale

```jsx
const dimensions = {
    width: 800,
    height: 400,
};
const dummyData: [number, number][] = [
  [0, 10],
  [5, 50],
  ...
];
const yData = dummyData.map((d) => d[1]);
const yMinMax = d3.extent(yData) as [number, number];
const yScale = d3.scaleLinear().domain(yMinMax).range([dimensions.height, 0]); // flip the rage
```

## call()
call() method is sued to apply a function to a selection 
example:
svg.select<SVGGElement>(".y-axis").call(yAxis);
- svg.select(".y-axis") returns a D3 selection containing the <g class="y-axis"> element.

## SVG stuff

### <svg> tag

The width and heigth is the pixel size of the svg
The viewBox is the coordinate dimension

- width
- height
- viewBox

### <g> tag
- className
- fill
- stroke
- strokeWidth
- strokeDasharray
- opacity
- transform
  - translate()
  - rotate()
  - scale()
  - skew()

  ### <text>

  - baseline:
    - ```<text alignmentBaseline="middle" />```
  - center text:
    - ```<text textAnchor="middle" />```
  


### <text> 
- x
- y
- fill
- fontFamily
- fontSize
- textAnchor 
  - start
  - middle
  - end
- 

### <path>

https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/d#path_commands

- d
  M : move to
  L : line to
  c : cubic curve
  q : quadratic bezier curve
  a : eliptical arc curve
  z : close path
