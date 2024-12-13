export const homePrefix = '/';

export const userPrefix = '/user';

export const paymentPrefix = '/pay';

export const doctorPrefix = '/doctor';

export const loginPath = '/login';

export const registerPath = '/register';

export const searchPath = '/search';

export const googleCalendarSuccessfulPath = '/googleCalendarAuthSuccessful';

export const forgotPasswordPath = '/forgotPassword';

export const otpPath = '/otp';

export const resetPassword = '/resetPassword';

export const profilePath = 'profile';

export const changePasswordPath = 'changePassword';

export const appointmentPath = 'appointment';

export const individualAppointmentPath = `${appointmentPath}/:appointmentId`;

export const invoicePath = 'invoice';

export const individualInvoicePath = `${invoicePath}/:invoiceId`;

export const slotPath = '/slot';

export const individualSlotPath = ':slotId';

export const paymentSuccessPath = 'success';

export const paymentCancelPath = 'cancel';

export const paymentErrorPath = 'error';

export const individualDoctorPath = ':doctorId';

export const bookingPath = `${individualDoctorPath}/booking`;
