import { convertCSSToAphrodite } from "./utils/css";
import { getTextStyles } from "./styles/textStyles";
import { getShapeStyles } from "./styles/shapeStyles";
import { getFlexboxStyles } from "./styles/displayStyles";

if (figma.editorType === "dev" && figma.mode === "codegen") {
    figma.codegen.on("generate", ({ node }: { node: SceneNode }) => {
        let cssString = "";

        if (["FRAME", "COMPONENT"].includes(node.type)) {
            const displayStyles = getFlexboxStyles(node);
            Object.entries(displayStyles).forEach(([property, value]) => {
                cssString += `${property}: ${value}; `;
            });
        }

        if (node.type === "TEXT") {
            const textStyles = getTextStyles(node);
            Object.entries(textStyles).forEach(([property, value]) => {
                cssString += `${property}: ${value}; `;
            });
        }

        if (["RECTANGLE", "ELLIPSE", "POLYGON", "STAR"].includes(node.type)) {
            const shapeStyles = getShapeStyles(node);
            Object.entries(shapeStyles).forEach(([property, value]) => {
                cssString += `${property}: ${value}; `;
            });
        }

        const aphroditeStyles = convertCSSToAphrodite(cssString);
        const aphroditeCode = aphroditeStyles.join(",\n");

        return [
            {
                title: "Aphrodite CSS",
                language: "TYPESCRIPT",
                code: aphroditeCode,
            },
        ];
    });
}
