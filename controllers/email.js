const nodemailer = require("nodemailer");

const sendEmail = async (req, res, next) => {
  const { email, subject, html, attachments } = req.body;
  if (!email || !subject || !html ) {
    return next(Error("Please enter all the fields"));
  }
  let transporter = nodemailer.createTransport({
    host: process.env.MAILHOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAILID,
      pass: process.env.MAILPASS,
    },
  });

  const msg = {
    from: '"Shivang Mail" <shivangyadav@amceducation.in>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
    attachments: attachments,
  };

  let info = await transporter.sendMail(msg);

  if (info.rejected.length <=0) {
    return res.json({
      message: `Email send to ${email} successfully`,
      details: info,
    });
  }
  else {
    return next(
      Error("Not able to send Email at the moment, please try again later")
    ); 
  }

  
};

module.exports = { sendEmail };
