export function formatResponse(status: number, message: string, body: any) {
  return {
    status,
    message,
    body,
  };
}
