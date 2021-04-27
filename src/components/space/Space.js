import React, { useRef, useEffect } from 'react'

const Space = props => {

  const canvasRef = useRef(null)
  
  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   const context = canvas.getContext('2d')
  //   //Our first draw
  //   context.fillStyle = '#000000'
  //   context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  // }, [])

  useEffect(() => {
    console.log('useEffect')
    draw()
  });

  const draw = () => {
    console.log('draw')
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.fillStyle = 'white'
    context.fillRect(0, 0, 30, 30)
    window.requestAnimationFrame(draw);
  }

  return (<canvas ref={canvasRef} width='500' height='300'/>)
}

export default Space;