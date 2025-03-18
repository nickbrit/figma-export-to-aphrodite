export function convertCSSToAphrodite(css: string): string[] {
    return css
        .split(";")
        .filter(Boolean)
        .map((rule) => {
            const [property, value] = rule
                .split(":")
                .map((part) => part.trim());
            if (!property || !value) return "";
            const camelProperty = property.replace(/-([a-z])/g, (_, g) =>
                g.toUpperCase()
            );
            return `  ${camelProperty}: '${value}'`;
        })
        .filter(Boolean);
}
