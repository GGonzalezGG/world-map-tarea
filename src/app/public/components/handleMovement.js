// handleMovement.js

export const handleWheel = (event, svgRef, setTransform) => {
    event.preventDefault();
    const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
    const rect = svgRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    setTransform(prev => {
      const newScale = prev.scale * scaleFactor;
      if (newScale < 1 || newScale > 5) return prev; // Limit zoom between 1 and 5
  
      const dx = x - (x - prev.x) * scaleFactor;
      const dy = y - (y - prev.y) * scaleFactor;
  
      return {
        x: dx,
        y: dy,
        scale: newScale
      };
    });
  };
  
  export const handleMouseDown = (event, setIsDragging, setDragStart, transform) => {
    if (event.button !== 0) return; // Only handle left mouse button
    setIsDragging(true);
    setDragStart({
      x: event.clientX - transform.x,
      y: event.clientY - transform.y
    });
  };
  
  export const handleMouseMove = (event, isDragging, dragStart, svgRef, setTransform) => {
    if (!isDragging) return;
    
    const svgRect = svgRef.current.getBoundingClientRect();
    const svgWidth = svgRect.width;
    const svgHeight = svgRect.height;
  
    setTransform(prev => {
      const newX = event.clientX - dragStart.x;
      const newY = event.clientY - dragStart.y;
  
      const contentWidth = svgWidth * prev.scale;
      const contentHeight = svgHeight * prev.scale;
  
      const maxX = 0;
      const minX = svgWidth - contentWidth;
      const maxY = 0;
      const minY = svgHeight - contentHeight;
  
      const clampedX = Math.min(maxX, Math.max(minX, newX));
      const clampedY = Math.min(maxY, Math.max(minY, newY));
  
      return {
        ...prev,
        x: clampedX,
        y: clampedY
      };
    });
  };