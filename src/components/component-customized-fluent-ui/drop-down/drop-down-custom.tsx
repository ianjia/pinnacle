import React from "react";
import { Dropdown, Option } from "@fluentui/react-components";
import { DropDownCustomTypes } from "./drop-down-custom.types";
import { useStyles } from "./drop-down-custom.styles";

export const DropdownCustom: React.FC<DropDownCustomTypes> = ({
    options,
    onOptionSelect,
    value,
    placeHolder,
}) => {
    const styles = useStyles();

    const showPlaceHolder: boolean = value === "" || value === undefined;
    const placeHolderStr: string = placeHolder === undefined ? "" : placeHolder;

    // Render options directly from the enum
    const renderedOptions = Object.values(options).map((option) => (
        <Option key={option} text={String(option)}>
            {option}
        </Option>
    ));

    return (
        <Dropdown
            className = {styles.root}
            placeholder={showPlaceHolder ? placeHolderStr : undefined}
            onOptionSelect={onOptionSelect}
            defaultSelectedOptions={!showPlaceHolder ? [value as string] : undefined}
            defaultValue={!showPlaceHolder ? value as string : undefined}
        >
            {renderedOptions}
        </Dropdown>
    );
};
