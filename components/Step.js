const Step = ({ cell }) => {
  return (
    <g
      type={cell.type}
      transform={`translate(${cell.position.x},${cell.position.y})`}
    >
      <text>{cell.name.value}</text>
      <rect
        fill={'#fff'}
        width={cell.size.width}
        height={cell.size.height}
        rx={1}
        ry={1}
        stroke={'#000'}
        strokeWidth="1.5"
      ></rect>
    </g>
  );
};

export default Step;
