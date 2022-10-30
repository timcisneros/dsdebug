import { memo } from 'react';

export default memo(function GroupNode({ data }) {
    return (
        <>
            <div
                className="nodrag"
                style={{
                    border: '3px dashed #8c8c8c',
                    borderRadius: 2,
                    fontSize: 10,
                    width: data.width,
                    height: data.height,
                }}
            >
                <div style={{ padding: 5 }}>{data.label}</div>
            </div>
        </>
    );
});
