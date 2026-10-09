export default {
  name: 'reservationEnquiry',
  title: 'Reservation Enquiries & Bookings',
  type: 'document',
  fields: [
    {
      name: 'reference',
      title: 'Reference Number (e.g. KB-88349102)',
      type: 'string',
      readOnly: true
    },
    {
      name: 'name',
      title: 'Guest / Patron Name',
      type: 'string',
      readOnly: true
    },
    {
      name: 'email',
      title: 'Guest Email Address',
      type: 'string',
      readOnly: true
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      readOnly: true
    },
    {
      name: 'preferredDate',
      title: 'Requested Reservation Date',
      type: 'date',
      readOnly: true
    },
    {
      name: 'eventType',
      title: 'Event / Package Type',
      type: 'string',
      readOnly: true
    },
    {
      name: 'guests',
      title: 'Estimated Guests',
      type: 'string',
      readOnly: true
    },
    {
      name: 'message',
      title: 'Guest Message & Specific Requirements',
      type: 'text',
      rows: 4,
      readOnly: true
    },
    {
      name: 'status',
      title: 'Reservation Status & Calendar Allocation',
      type: 'string',
      options: {
        list: [
          { title: '⏳ Pending Review', value: 'pending' },
          { title: '✅ Approved & Booked (Date Blocked on Live Calendar)', value: 'approved' },
          { title: '❌ Rejected (Polite notification sent)', value: 'rejected' },
          { title: '🔄 Cancelled & Reallocated (Date Freed on Calendar)', value: 'cancelled' }
        ],
        layout: 'radio'
      },
      initialValue: 'pending'
    },
    {
      name: 'notes',
      title: 'Admin Concierge Notes',
      type: 'text',
      rows: 2
    },
    {
      name: 'receivedAt',
      title: 'Submission Timestamp',
      type: 'datetime',
      readOnly: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'preferredDate',
      status: 'status',
      reference: 'reference'
    },
    prepare({ title, subtitle, status, reference }) {
      const icon = status === 'approved' ? '✅' : status === 'rejected' ? '❌' : status === 'cancelled' ? '🔄' : '⏳';
      return {
        title: `${icon} ${title || 'Guest'} [${reference || 'REF'}]`,
        subtitle: `${subtitle ? `Date: ${subtitle}` : 'No date'} — Status: ${status || 'pending'}`
      };
    }
  }
};
