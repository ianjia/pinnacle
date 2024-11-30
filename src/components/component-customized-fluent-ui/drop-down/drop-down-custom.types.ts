import type { SelectionEvents, OptionOnSelectData } from "@fluentui/react-components";

type EnumOptions = Record<string, string | number>;

export type DropDownCustomTypes = {
    options: EnumOptions; // Accepts enums directly
    onOptionSelect: (event: SelectionEvents, data: OptionOnSelectData) => void;
    value: string | number | undefined; // Updated to include `number`
    placeHolder?: string | number; // Updated to include `number`
};
