export function toShort(str: string, size = 45): string {
    return str.length > size ? `${str.slice(0, size)}...` : str;
}
