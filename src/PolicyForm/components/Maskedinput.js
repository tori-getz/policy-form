
import React from "react";
import InputMask from "react-input-mask";
import { control } from "react-validation";

const MaskedInput = ({ error, isChanged, isUsed, ...props }) => (
    <div>
        <InputMask maskPlaceholder=" " {...props} />
        {isChanged && isUsed && error}
    </div>
)

export default control(MaskedInput)