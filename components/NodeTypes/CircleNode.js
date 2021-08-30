import { memo } from 'react';
import { Handle } from 'react-flow-renderer';

export default memo(function CircleNode({ data }) {
    const stepColor = data.label.includes('Start') ? '#80c904' : '#2a9df4';
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: stepColor,
                    border: `3px solid ${stepColor}`,
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 10,
                    width: 100,
                    height: 100,
                    borderRadius: '100%',
                }}
            >
                <div>image</div>
                <div>{data.label}</div>
            </div>
            <Handle
                type="source"
                position="right"
                id="a"
                style={{ background: '#555' }}
            />
        </>
    );
});
