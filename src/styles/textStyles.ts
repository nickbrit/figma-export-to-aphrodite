import { rgbToHex } from "../utils/color";

export function getTextStyles(node: SceneNode): Record<string, string> {
    const styles: Record<string, string> = {};

    if (node.type !== "TEXT") return styles;

    if (
        "fills" in node &&
        Array.isArray(node.fills) &&
        node.fills.length > 0 &&
        node.fills[0].type === "SOLID"
    ) {
        styles.color = rgbToHex(node.fills[0].color);
    }
    if (
        "fontName" in node &&
        typeof node.fontName === "object" &&
        "family" in node.fontName
    ) {
        styles.fontFamily = node.fontName.family;
    }
    if ("fontSize" in node && typeof node.fontSize === "number")
        styles.fontSize = `${node.fontSize}px`;
    if ("fontWeight" in node) styles.fontWeight = String(node.fontWeight);
    if (
        "fontName" in node &&
        typeof node.fontName === "object" &&
        "style" in node.fontName
    ) {
        styles.fontStyle = node.fontName.style.toLowerCase().includes("italic")
            ? "italic"
            : "normal";
    }
    if (
        "lineHeight" in node &&
        typeof node.lineHeight === "object" &&
        "value" in node.lineHeight
    ) {
        styles.lineHeight = `${node.lineHeight.value}px`;
    }

    return styles;
}
