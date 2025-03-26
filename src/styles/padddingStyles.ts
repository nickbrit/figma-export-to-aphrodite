export function getPadddingStyles(node: SceneNode): Record<string, string> {
    const styles: Record<string, string> = {};

    if (
        "paddingLeft" in node &&
        "paddingRight" in node &&
        "paddingTop" in node &&
        "paddingBottom" in node
    ) {
        const { paddingLeft, paddingRight, paddingTop, paddingBottom } = node;
        styles.padding = `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;
    }

    return styles;
}
