const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const User = require('../models/User');
const sendEmailOtp = require('../services/emailService');
const sendSmsOtp = require('../services/smsService');


exports.signup = async (req, res) => {
    const { name, email, password, mobile, dateOfBirth } = req.body;
    try{
        let user = await User.findone({ email });
        if(user){
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({ name, email, password, mobile, dateOfBirth });
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)

        const emailOtp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
        const mobileOtp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

        user.emailOtp = emailOtp;
        user.mobileOtp = mobileOtp;

        await user.save();

        sendEmailOtp(email, emailOtp);
        sendSmsOtp(mobile, mobileOtp);

        res.status(200).json({ msg: 'User registered. OTPs sent to email and mobile.' });
    }catch(e){
        console.error(e.message);
        res.status(500).send('Server error');
    }
};


exports.verifyOtp = async (req, res) => {
    const { email, emailOtp, mobileOtp } = req.body;
    
    try{
        let user = await User.findone({ email })
        if(!user){
            return res.status(400).json({ msg: 'User not found' });
        }

        if (user.emailOtp === emailOtp && user.mobileOtp === mobileOtp){
            user.emailVerified = true;
            user.mobileVerified = true;
            user.emailOtp = null;
            user.mobileOtp = null;

            await user.save();
            res.status(200).json({ msg: 'OTP verified successfully' });

        }else{
            res.status(400).json({ msg: 'Invalid OTP' });
        }
    }catch(e){
        console.error(e.message);
        res.status(500).send('Server error');
    }
};



exports.signin = async (req, res) =>{
    const { email, password } = req.body;

    try{
        let user = await User.findone({ email });
        if(!user){
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        if(!user.emailVerified || !user.mobileVerified){
            return res.status(400).json({ msg: 'Email or mobile number not verified' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    }catch (e){
        console.error(e.message);
        res.status(500).send('Server error');
    }
};


exports.signout = (req, res) =>{
    res.json({ msg: 'User signed out' });
}