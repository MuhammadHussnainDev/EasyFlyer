import { z } from 'zod';

/** Schema for the sign-in (email + password) form. */
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  password: z
    .string()
    .min(1, 'Password is required.')
    .min(6, 'Password must be at least 6 characters.'),
});

export type SignInFormData = z.infer<typeof signInSchema>;

/** Schema for the sign-up and update-postal-code forms. */
export const postalCodeSchema = z.object({
  postalCode: z
    .string()
    .min(1, 'Postal Code is required.')
    .regex(
      /^[A-Za-z0-9]{6}$/,
      'Postal Code must be exactly 6 alphanumeric characters.',
    ),
});

export type PostalCodeFormData = z.infer<typeof postalCodeSchema>;
