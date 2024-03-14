const { User } = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

class AuthService {
    emailValidator(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async signIn(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect");
        }

        const payload = { id: user.id, email: user.email, role: user.role };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "12h" });

        return { token };
    }

    async signUp({ firstName, lastName, email, phoneNumber, password }) {
        if (!this.emailValidator(email)) {
        throw new Error("Email input is not in a valid email format.");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = { firstName, lastName, password: hashedPassword, role: "user", email, phoneNumber };

        await User.create(user);
        return user;
    }

    async sendEmailForResetPwd(email) {
        let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME || 'esteban.semellier@gmail.com',
            pass: process.env.EMAIL_PASSWORD || 'hzls qqiw huxq abbu'
        }
        });

        const encodedEmail = encodeURIComponent(email);
        const resetUrl = `http://127.0.0.1:8080/auth/resetpassword?email=${encodedEmail}`;
        
        let mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Réinitialisation du mot de passe',
        html: `<p>Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous :</p><a href="${resetUrl}">Réinitialiser le mot de passe</a>`
        };

        await transporter.sendMail(mailOptions);
    }

    async resetPassword(email, newPassword) {
        let user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Utilisateur non trouvé.');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        await user.save();
    }
}

module.exports = new AuthService();
