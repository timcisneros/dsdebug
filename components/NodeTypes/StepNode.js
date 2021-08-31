import { memo } from 'react';
import { Handle } from 'react-flow-renderer';

export default memo(function StepNode({ data }) {
    return (
        <>
            <Handle
                type="target"
                position="left"
                style={{ background: '#555' }}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    border: '3px solid #8c8c8c',
                    borderRadius: 2,
                    textAlign: 'center',
                    fontSize: 10,
                    width: data.width,
                    height: data.height,
                }}
            >
                <div>
                    <svg
                        x="38"
                        y="10"
                        width="24px"
                        height="24px"
                        id="v-166"
                        color="#29bdbe"
                        fill="#fff"
                    >
                        <g transform="translate(3.000000, 1.000000)">
                            <polygon
                                fill="currentColor"
                                points="18.9,23 -1,23 -1,-1 18.9,-1 18.9,3.4 16.9,3.4 16.9,1 1,1 1,21 16.9,21 16.9,11.8 18.9,11.8"
                            ></polygon>
                            <polygon
                                fill="currentColor"
                                points="7.8,16.9 3.8,11.2 5.4,10.1 8,13.8 16.1,5.8 17.5,7.2"
                            ></polygon>
                        </g>
                    </svg>
                </div>
                <div>{data.label}</div>
            </div>
            <Handle
                type="source"
                position="right"
                id="a"
                style={{ background: '#555' }}
            />
            {data.description && (
                <div
                    style={{
                        width: data.width,
                        height: 0,
                    }}
                >
                    <div
                        style={{
                            marginTop: 3,
                            outline: '3px solid white',
                            padding: 5,
                            fontSize: 10,
                            backgroundColor: '#000',
                            color: '#fff',
                            borderRadius: 3,
                        }}
                    >
                        {data.description}
                    </div>
                </div>
            )}
        </>
    );
});
