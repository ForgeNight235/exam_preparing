export function truncateText(text) {
    if (text.length > 25) {
        return `${text.slice(0, 70)}...`;
    }
    return text;
}