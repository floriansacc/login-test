export function formatDate(date: Date | null): string {
  if (!date) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function validateEmail(value: string | null): boolean {
  if (!value) {
    return false;
  }

  // Regular expression for basic email validation
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!emailRegex.test(value)) {
    return false;
  }

  return true;
}
