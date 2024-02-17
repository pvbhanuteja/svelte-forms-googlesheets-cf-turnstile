import { CF_TURNSTILE_PRIVATE_KEY, PRIVATE_GOOGLE_SHEETS_URL } from '$env/static/private'
import { PUBLIC_EMAIL } from '$env/static/public'

/**
 * @typedef {Object} TokenValidateResponse
 * @property {string[]} error-codes - Array of error codes.
 * @property {boolean} success - Indicates if the validation was successful.
 * @property {string} action - The action performed.
 * @property {string} cdata - Additional data provided in the response.
 */

/**
 * Validates the given token using the secret.
 * 
 * @param {string} token - The token to validate.
 * @param {string} secret - The secret key for validation.
 * @returns {Promise<{success: boolean, error: string | null}>} The validation result.
 */
async function validateToken(token, secret) {
    const response = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                response: token,
                secret: secret,
            }),
        },
    );

    /** @type {TokenValidateResponse} */
    const data = await response.json();

    return {
        // Return the status
        success: data.success,

        // Return the first error if it exists
        error: data['error-codes']?.length ? data['error-codes'][0] : null,
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const tokenValue = data.get('cf-turnstile-response');
        const token = typeof tokenValue === 'string' ? tokenValue : '';

        // If token is null or empty return an error
        if (!token)
            return {
                error: 'Invalid CAPTCHA',
            };

        const SECRET_KEY = CF_TURNSTILE_PRIVATE_KEY // you should use $env module for secrets

        const { success, error } = await validateToken(token, SECRET_KEY);

        if (!success)
            return {
                error: error || 'Invalid CAPTCHA',
            };

        const formObject = Object.fromEntries(data);
        const response = await fetch(PRIVATE_GOOGLE_SHEETS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        });

        const result = await response.json();
        if (result.result !== 'success') {
            return {
                error: `Failed to submit please email: ${PUBLIC_EMAIL}`,
            };
        }

        // Return success message or redirect
        return {
            success: true,
            message: 'Offer submitted successfully!',
        };
    }
}