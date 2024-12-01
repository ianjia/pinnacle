import React from "react";
import { Dropdown, Option } from "@fluentui/react-components";
import { DropDownCustomTypes } from "./drop-down-custom.types";
import { useStyles} from "./drop-down-custom.styles";

export const DropdownCustom: React.FC<DropDownCustomTypes> = ({
    options,
    onOptionSelect,
    value,
    placeHolder,
}) => {
    const styles = useStyles();

    const showPlaceHolder: boolean = value === "" || value === undefined;
    const placeHolderStr: string = placeHolder !== undefined ? String(placeHolder) : "";

    // Filter out reverse mappings in numeric enums
    const renderedOptions = Object.values(options)
        .filter((val) => typeof val === "number") // Only include numeric values
        .map((val) => (
            <Option key={String(val)} text={String(val)}>
                {val}
            </Option>
        ));

    return (
        <Dropdown
            className={styles.root}
            placeholder={showPlaceHolder ? placeHolderStr : undefined}
            onOptionSelect={onOptionSelect}
            defaultSelectedOptions={!showPlaceHolder ? [String(value)] : undefined}
            defaultValue={!showPlaceHolder ? String(value) : undefined}
        >
            {renderedOptions}
        </Dropdown>
    );
};

