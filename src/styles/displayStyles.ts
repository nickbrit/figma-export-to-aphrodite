export function getFlexboxStyles(node: SceneNode): {
    display?: string;
    flexDirection?: string;
    gap?: string;
} {
    const styles: {
        display?: string;
        flexDirection?: string;
        gap?: string;
        alignItems?: string;
        justifyContent?: string;
        flexWrap?: string;
    } = {};

    if ("layoutMode" in node && node.layoutMode !== "NONE") {
        styles.display = "flex";
        styles.flexDirection =
            node.layoutMode === "HORIZONTAL" ? "row" : "column";

        if (
            "itemSpacing" in node &&
            node.itemSpacing !== undefined &&
            node.itemSpacing !== 0
        ) {
            styles.gap = `${node.itemSpacing}px`;
        }

        if ("layoutWrap" in node && node.layoutWrap === "WRAP") {
            styles.flexWrap = "wrap";
        }

        if ("layoutAlign" in node) {
            if (node.layoutAlign === "MIN" || node.layoutAlign === "INHERIT") {
                styles.alignItems = "flex-start";
            } else if (node.layoutAlign === "CENTER") {
                styles.alignItems = "center";
            } else if (node.layoutAlign === "MAX") {
                styles.alignItems = "flex-end";
            }
        }

        if ("primaryAxisAlignItems" in node) {
            if (node.primaryAxisAlignItems === "MIN") {
                styles.justifyContent = "flex-start";
            } else if (node.primaryAxisAlignItems === "CENTER") {
                styles.justifyContent = "center";
            } else if (node.primaryAxisAlignItems === "MAX") {
                styles.justifyContent = "flex-end";
            } else if (node.primaryAxisAlignItems === "SPACE_BETWEEN") {
                styles.justifyContent = "space-between";
            }
        }
    }

    return styles;
}
