// Function to get the CSRF token from the cookie
export const getCsrfToken = (): string | null => {
    if (typeof document === 'undefined') {
        return null;
    }
    if (!document.cookie || document.cookie === '') {
        return null;
    }

    const name = 'csrftoken';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}