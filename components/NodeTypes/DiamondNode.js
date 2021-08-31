import { memo } from 'react';
import { Handle } from 'react-flow-renderer';

export default memo(function DiamondNode({ data }) {
    return (
        <>
            <Handle
                type="target"
                position="top"
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
                    fontSize: 10,
                    width: data.width,
                    height: data.height,
                    transform: 'rotate(45deg)',
                }}
            >
                <div
                    style={{
                        transform: 'rotate(-45deg)',
                    }}
                >
                    image
                </div>
                <div
                    style={{
                        transform: 'rotate(-45deg)',
                    }}
                >
                    {data.label}
                </div>
            </div>
            <Handle
                type="source"
                position="bottom"
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
                            position: 'absolute',
                            top: '123%',
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
