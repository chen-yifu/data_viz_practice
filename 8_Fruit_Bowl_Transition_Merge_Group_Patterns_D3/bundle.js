(function (d3) {
  'use strict';

  const colorScale = d3.scaleOrdinal()
  	.domain(['apple','orange'])
  	.range(['#c11d1d', 'orange']);

  const sizeScale = d3.scaleOrdinal()
  	.domain(['apple','orange'])
  	.range([50, 40]);

  const fruitBowl = (selection, props) => {
    const {fruits, height} = props;
    const groups = selection.selectAll('g')
    	.data(fruits, d=>d.id);
    
  const bowl = selection.selectAll('rect')
      .data([null])
      .enter().append('rect')
        .attr('y', 110)
        .attr('width', 920)
        .attr('height', 300)
        .attr('rx', 300 / 2)
  			.attr('fill', '#bafff1'); 
    
    const groupsEnter =	groups.enter().append('g');
    groupsEnter
      .merge(groups)
        .attr('transform', (d,i) => 
            `translate(${i * 120 + 60}, ${height/2})`);



   	const circles = groups.select('circle'); 
    
  	groupsEnter.append('circle')
    		.attr('r',0)
    	.merge(groups.select('circle'))
      	.transition().duration(1000)
        	.attr('fill', d => colorScale(d.type)) // put changing attr after merge() call
        	.attr('r', d => sizeScale(d.type));

  	const text = selection.selectAll('text')
    	.data(fruits);
    
  	groupsEnter.append('text')
    	.merge(text)
      	.text(d=>d.type);

   
    groups.exit().remove();
  };

  const svg = d3.select('svg');
  svg.style('background-color', '#fdffe3');


  const render = () => {
  	fruitBowl(svg, {
      fruits,
      height:+svg.attr('height')
    });
  };

  const makeFruit = type => ({ 
    type,
  	id: Math.random()});

  let fruits = d3.range(5).map(() => makeFruit('apple'));

  render();


  // eats an apple
  setTimeout(() => {
    fruits.pop();
    render();
  }, 1000);


  // replaces an apple with orange
  setTimeout(() => {
    fruits[2].type = 'orange';
    render();
  }, 2000);


  // eats an apple
  setTimeout(() => {
    fruits = fruits.filter((d,i) => i !== 1); // leave out apple at index 1
    render();
  }, 3000);

}(d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImZydWl0Qm93bC5qcyIsImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7c2NhbGVPcmRpbmFsIH0gZnJvbSAnZDMnO1xuXG5cbiAgXG5jb25zdCBjb2xvclNjYWxlID0gc2NhbGVPcmRpbmFsKClcblx0LmRvbWFpbihbJ2FwcGxlJywnb3JhbmdlJ10pXG5cdC5yYW5nZShbJyNjMTFkMWQnLCAnb3JhbmdlJ10pO1xuXG5jb25zdCBzaXplU2NhbGUgPSBzY2FsZU9yZGluYWwoKVxuXHQuZG9tYWluKFsnYXBwbGUnLCdvcmFuZ2UnXSlcblx0LnJhbmdlKFs1MCwgNDBdKTtcbiAgXG5cbmNvbnN0IHhQb3NpdGlvbiA9IChkLCBpKSA9PiBpICogMTIwICsgNjA7XG5cbmV4cG9ydCBjb25zdCBmcnVpdEJvd2wgPSAoc2VsZWN0aW9uLCBwcm9wcykgPT4ge1xuICBjb25zdCB7ZnJ1aXRzLCBoZWlnaHR9ID0gcHJvcHM7XG4gIGNvbnN0IGdyb3VwcyA9IHNlbGVjdGlvbi5zZWxlY3RBbGwoJ2cnKVxuICBcdC5kYXRhKGZydWl0cywgZD0+ZC5pZCk7XG4gIFxuY29uc3QgYm93bCA9IHNlbGVjdGlvbi5zZWxlY3RBbGwoJ3JlY3QnKVxuICAgIC5kYXRhKFtudWxsXSlcbiAgICAuZW50ZXIoKS5hcHBlbmQoJ3JlY3QnKVxuICAgICAgLmF0dHIoJ3knLCAxMTApXG4gICAgICAuYXR0cignd2lkdGgnLCA5MjApXG4gICAgICAuYXR0cignaGVpZ2h0JywgMzAwKVxuICAgICAgLmF0dHIoJ3J4JywgMzAwIC8gMilcblx0XHRcdC5hdHRyKCdmaWxsJywgJyNiYWZmZjEnKTsgXG4gIFxuICBjb25zdCBncm91cHNFbnRlciA9XHRncm91cHMuZW50ZXIoKS5hcHBlbmQoJ2cnKTtcbiAgZ3JvdXBzRW50ZXJcbiAgICAubWVyZ2UoZ3JvdXBzKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIChkLGkpID0+IFxuICAgICAgICAgIGB0cmFuc2xhdGUoJHtpICogMTIwICsgNjB9LCAke2hlaWdodC8yfSlgKTtcblxuXG5cbiBcdGNvbnN0IGNpcmNsZXMgPSBncm91cHMuc2VsZWN0KCdjaXJjbGUnKTsgXG4gIFxuXHRncm91cHNFbnRlci5hcHBlbmQoJ2NpcmNsZScpXG4gIFx0XHQuYXR0cigncicsMClcbiAgXHQubWVyZ2UoZ3JvdXBzLnNlbGVjdCgnY2lyY2xlJykpXG4gICAgXHQudHJhbnNpdGlvbigpLmR1cmF0aW9uKDEwMDApXG4gICAgICBcdC5hdHRyKCdmaWxsJywgZCA9PiBjb2xvclNjYWxlKGQudHlwZSkpIC8vIHB1dCBjaGFuZ2luZyBhdHRyIGFmdGVyIG1lcmdlKCkgY2FsbFxuICAgICAgXHQuYXR0cigncicsIGQgPT4gc2l6ZVNjYWxlKGQudHlwZSkpO1xuXG5cdGNvbnN0IHRleHQgPSBzZWxlY3Rpb24uc2VsZWN0QWxsKCd0ZXh0JylcbiAgXHQuZGF0YShmcnVpdHMpO1xuICBcblx0Z3JvdXBzRW50ZXIuYXBwZW5kKCd0ZXh0JylcbiAgXHQubWVyZ2UodGV4dClcbiAgICBcdC50ZXh0KGQ9PmQudHlwZSlcblxuIFxuICBncm91cHMuZXhpdCgpLnJlbW92ZSgpO1xufTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiIsImltcG9ydCB7IHNlbGVjdCwgcmFuZ2UsIHNjYWxlT3JkaW5hbCB9IGZyb20gJ2QzJztcbmltcG9ydCB7IGZydWl0Qm93bCB9IGZyb20gJy4vZnJ1aXRCb3dsJztcblxuY29uc3Qgc3ZnID0gc2VsZWN0KCdzdmcnKTtcbnN2Zy5zdHlsZSgnYmFja2dyb3VuZC1jb2xvcicsICcjZmRmZmUzJyk7XG5cblxuY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuXHRmcnVpdEJvd2woc3ZnLCB7XG4gICAgZnJ1aXRzLFxuICAgIGhlaWdodDorc3ZnLmF0dHIoJ2hlaWdodCcpXG4gIH0pXG59O1xuXG5jb25zdCBtYWtlRnJ1aXQgPSB0eXBlID0+ICh7IFxuICB0eXBlLFxuXHRpZDogTWF0aC5yYW5kb20oKX0pO1xuXG5sZXQgZnJ1aXRzID0gcmFuZ2UoNSkubWFwKCgpID0+IG1ha2VGcnVpdCgnYXBwbGUnKSk7XG5cbnJlbmRlcigpO1xuXG5cbi8vIGVhdHMgYW4gYXBwbGVcbnNldFRpbWVvdXQoKCkgPT4ge1xuICBmcnVpdHMucG9wKCk7XG4gIHJlbmRlcigpO1xufSwgMTAwMCk7XG5cblxuLy8gcmVwbGFjZXMgYW4gYXBwbGUgd2l0aCBvcmFuZ2VcbnNldFRpbWVvdXQoKCkgPT4ge1xuICBmcnVpdHNbMl0udHlwZSA9ICdvcmFuZ2UnO1xuICByZW5kZXIoKTtcbn0sIDIwMDApO1xuXG5cbi8vIGVhdHMgYW4gYXBwbGVcbnNldFRpbWVvdXQoKCkgPT4ge1xuICBmcnVpdHMgPSBmcnVpdHMuZmlsdGVyKChkLGkpID0+IGkgIT09IDEpOyAvLyBsZWF2ZSBvdXQgYXBwbGUgYXQgaW5kZXggMVxuICByZW5kZXIoKTtcbn0sIDMwMDApO1xuXG5cblxuXG4iXSwibmFtZXMiOlsic2NhbGVPcmRpbmFsIiwic2VsZWN0IiwicmFuZ2UiXSwibWFwcGluZ3MiOiI7OztFQUlBLE1BQU0sVUFBVSxHQUFHQSxlQUFZLEVBQUU7SUFDL0IsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFCLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDOztFQUUvQixNQUFNLFNBQVMsR0FBR0EsZUFBWSxFQUFFO0lBQzlCLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQixLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFLbEIsRUFBTyxNQUFNLFNBQVMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLEtBQUs7SUFDN0MsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDL0IsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7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