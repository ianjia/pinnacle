import { makeStyles } from "@fluentui/react-components";

export const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center", // Ensures vertical centering within the dropdown itself
        justifyContent: "center", // Centers content horizontally (optional)
        height: "36px", // Matches the parent container's height
        padding: "0px", // Removes unnecessary padding
        margin: "0px", // Removes unnecessary margins
        lineHeight: "1", // Ensures no extra space inside text
    },
});
