import nodemailer from 'nodemailer';

function MailSender(email, url){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pratiktele123@gmail.com',
          pass: 'gjxzlltvmnobjcjj'
        }
      });
      
      var mailOptions = {
        from: 'pratiktele123@gmail.com',
        to: email,
        subject: 'Reset Password',
        text: url
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return error;
        }
      });
}

export default MailSender;