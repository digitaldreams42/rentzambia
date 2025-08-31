// Email templates for RentZambia

export const emailTemplates = {
  // Welcome email for new users
  welcome: {
    subject: "Welcome to RentZambia!",
    template: (data: { name: string; role: string }) => `
      <h1>Welcome to RentZambia, ${data.name}!</h1>
      <p>Thank you for joining RentZambia as a ${data.role}.</p>
      <p>We're excited to help you ${data.role === 'tenant' ? 'find your perfect rental property' : 'connect with tenants and manage your properties'}.</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Get Started</a></p>
    `
  },

  // Property inquiry notification
  propertyInquiry: {
    subject: "New Property Inquiry",
    template: (data: { propertyName: string; userName: string; message: string }) => `
      <h1>New Inquiry for ${data.propertyName}</h1>
      <p>You have received a new inquiry from ${data.userName}:</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/landlord/inquiries" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Inquiry</a></p>
    `
  },

  // Booking confirmation
  bookingConfirmation: {
    subject: "Booking Confirmed",
    template: (data: { propertyName: string; startDate: string; endDate: string; totalPrice: number }) => `
      <h1>Booking Confirmed!</h1>
      <p>Your booking for ${data.propertyName} has been confirmed.</p>
      <p><strong>Booking Details:</strong></p>
      <ul>
        <li>Dates: ${data.startDate} to ${data.endDate}</li>
        <li>Total Amount: K${data.totalPrice.toLocaleString()}</li>
      </ul>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/tenant/bookings" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Booking</a></p>
    `
  },

  // Payment receipt
  paymentReceipt: {
    subject: "Payment Receipt",
    template: (data: { propertyName: string; amount: number; receiptNumber: string; date: string }) => `
      <h1>Payment Receipt</h1>
      <p>Thank you for your payment.</p>
      <p><strong>Receipt Details:</strong></p>
      <ul>
        <li>Property: ${data.propertyName}</li>
        <li>Amount: K${data.amount.toLocaleString()}</li>
        <li>Receipt Number: ${data.receiptNumber}</li>
        <li>Date: ${data.date}</li>
      </ul>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/tenant/receipts/${data.receiptNumber}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Receipt</a></p>
    `
  },

  // Password reset
  passwordReset: {
    subject: "Password Reset Request",
    template: (data: { name: string; resetLink: string }) => `
      <h1>Password Reset Request</h1>
      <p>Hello ${data.name},</p>
      <p>You have requested to reset your password. Click the button below to reset your password:</p>
      <p><a href="${data.resetLink}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
      <p>If you did not request this, please ignore this email.</p>
    `
  },

  // Account verification
  accountVerification: {
    subject: "Verify Your Account",
    template: (data: { name: string; verificationLink: string }) => `
      <h1>Verify Your Account</h1>
      <p>Hello ${data.name},</p>
      <p>Please verify your email address by clicking the button below:</p>
      <p><a href="${data.verificationLink}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
    `
  }
};