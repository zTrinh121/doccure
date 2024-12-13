export const queryKeysConstants = {
  appointment: (id) => ['appointment', id],

  appointmentsInfinite: ({ statusSelect, startDate, endDate }) => [
    'appointments',
    statusSelect,
    '_',
    '_',
    startDate,
    endDate,
  ],

  appointmentsPaginated: ({ status, offset, limit, startDate, endDate }) => [
    'appointments',
    status,
    offset,
    limit,
    startDate,
    endDate,
  ],

  doctor: (id) => ['doctor', id],

  ratings: (doctorId) => ['ratings', doctorId],

  slots: ({ startDate, endDate, doctorId }) => [
    'slots',
    startDate,
    endDate,
    doctorId,
  ],

  doctorsRating: ['doctors'],

  invoice: (id) => ['invoice', id],

  invoices: ({ offset, limit }) => ['invoices', offset, limit],

  profile: ['profile'],

  search: ({ input, spec }) => ['search', input, spec],

  slot: (id) => ['slot', id],

  allSpecializations: ['specializations'],
};
