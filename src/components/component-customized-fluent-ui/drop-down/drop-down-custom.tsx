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

    // Render options directly from the enum
    const renderedOptions = Object.entries(options).map(([key, val]) => (
        <Option key={key} text={String(val)}>
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

