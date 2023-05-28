const nodeMailer = require('nodemailer');
const process = require('process');

class MailSender {
    constructor() {
        this._transporter = nodeMailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }
    sendEmail(targetEmail, content){
        const message = {
            from: 'Open Music Apps',
            to: targetEmail,
            subject: 'Ekspor Playlists',
            text: 'Terlampir hasil dari ekspor playlists',
            attachments: [
              {
                filename: 'playlists.json',
                content,
              },
            ],
          };
          return this._transporter.sendMail(message);
    }
}
module.exports = MailSender;