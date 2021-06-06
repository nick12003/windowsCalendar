import React from "react";
const Pagetion = ({ current, onPre, onNext, changeMode }) => {
    return (
        <div className="changeBox">
            <div
                className="current"
                onClick={() => {
                    changeMode?.();
                }}
            >
                {current}
            </div>
            <div className="pagetion">
                <div
                    className="prev"
                    onClick={() => {
                        onPre?.();
                    }}
                >
                    ∧
          </div>
                <div
                    className="next"
                    onClick={() => {
                        onNext?.();
                    }}
                >
                    ∨
          </div>
            </div>
        </div>
    );
};

export default Pagetion;
