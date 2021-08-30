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
                    border: '3px solid #8c8c8c',
                    borderRadius: 2,
                    textAlign: 'center',
                    fontSize: 10,
                    width: 100,
                    height: 100,
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
                <div style={{ transform: 'rotate(-45deg)' }}>{data.label}</div>
            </div>
            <Handle
                type="source"
                position="bottom"
                id="a"
                style={{ background: '#555' }}
            />
        </>
    );
});
