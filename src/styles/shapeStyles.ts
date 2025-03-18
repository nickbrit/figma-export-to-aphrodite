import { rgbToHex } from "../utils/color";

export function getShapeStyles(node: SceneNode): Record<string, string> {
    const styles: Record<string, string> = {};

    if ("fills" in node && Array.isArray(node.fills)) {
        const fills = node.fills as Paint[];
        if (fills.length > 0 && fills[0].type === "SOLID") {
            styles.background = rgbToHex(fills[0].color);
        }
    }

    if ("strokes" in node && Array.isArray(node.strokes)) {
        const strokes = node.strokes as Paint[];
        if (strokes.length > 0 && strokes[0].type === "SOLID") {
            styles.border = `1px solid ${rgbToHex(strokes[0].color)}`;
        }
    }

    if ("cornerRadius" in node && typeof node.cornerRadius === "number") {
        styles.borderRadius = `${node.cornerRadius}px`;
    }

    if ("effects" in node && Array.isArray(node.effects)) {
        const shadowEffects = node.effects.filter(
            (effect) =>
                effect.type === "DROP_SHADOW" || effect.type === "INNER_SHADOW"
        ) as (DropShadowEffect | InnerShadowEffect)[];

        if (shadowEffects.length > 0) {
            const boxShadowValues: string[] = shadowEffects.map((effect) => {
                const { color, offset, radius, spread } = effect;
                const { x, y } = offset;

                const roundedAlpha = parseFloat(color.a.toFixed(2));

                const rgbaColor = `rgba(${Math.round(
                    color.r * 255
                )}, ${Math.round(color.g * 255)}, ${Math.round(
                    color.b * 255
                )}, ${roundedAlpha})`;

                return `${
                    effect.type === "INNER_SHADOW" ? "inset " : ""
                }${x}px ${y}px ${radius}px ${
                    spread ? spread + "px" : "0px"
                } ${rgbaColor}`;
            });

            styles.boxShadow = boxShadowValues.join(", ");
        }
    }

    return styles;
}
