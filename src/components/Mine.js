import React from "react";

const Mine = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* 💣 */}
            <div
                style={{
                    height: 20,
                    width: 20,
                    borderRadius: 20,
                    background: "rgba(0, 0, 0, 0.4)",
                }}
            ></div>
        </div>
    );
};

export default Mine;
