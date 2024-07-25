const twilio = require('twilio');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSmsOtp = (mobile, otp) => {
    client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: mobile,
    })
    .then(messages => console.log(messages.sid))
    .catch(err => console.log(err));
};

module.exports = sendSmsOtp;