import React, { useState } from "react";

const CheckboxToggle = ({ checked, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleToggle = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className="checkbox-toggle" onClick={handleToggle}>
            {isChecked ? (
                <span role="img" aria-label="Checked">&#10003;</span>
            ) : (
                <span role="img" aria-label="Unchecked">&#10007;</span>
            )}
        </div>
    );
};

export default CheckboxToggle;
