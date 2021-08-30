const Group = ({ cell }) => {
    return (
        <g
            type={cell.type}
            transform={`translate(${cell.position.x},${cell.position.y})`}
        >
            <text>{cell.name.value}</text>
            <rect
                fill={'none'}
                width={cell.size.width}
                height={cell.size.height}
                stroke={cell.attrs['.body'].stroke}
                strokeDasharray={cell.attrs['.body']['stroke-dasharray']}
                strokeWidth={cell.attrs['.body']['stroke-width']}
                rx={cell.attrs['.body'].rx}
                ry={cell.attrs['.body'].ry}
                pointerEvents={cell.attrs['.body']['pointer-events']}
            ></rect>
        </g>
    );
};

export default Group;
