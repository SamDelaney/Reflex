export function getErrorMessage(e: any): string {
    return JSON.stringify('message' in e ? e.message : e)
}