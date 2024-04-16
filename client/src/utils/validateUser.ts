export function validateUsername(value: string): string {
    return value.length >= 3 ? '' : 'Username must be longer than 3 characters.';
}

export function validateEmail(value: string): string {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? '' : 'Enter a valid email.';
}

export function validatePassword(value: string): string {
    return value.length >= 8 ? '' : 'Password must be at least 8 characters.';
}

export function validateConfirmPassword(password: string, verify: string) {
    return password === verify ? '' : 'Passwords should match.';
}