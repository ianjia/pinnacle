import type { SelectionEvents,  OptionOnSelectData} from "@fluentui/react-components";

type EnumOptions = Record<string, string | number>;

export type DropDownCustomTypes = {
    options: EnumOptions; // Now can accept enums directly
    onOptionSelect: (event: SelectionEvents, data: OptionOnSelectData) => void;
    value: string | undefined;
    placeHolder?: string;
};
