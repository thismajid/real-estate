const nodemailer = require("nodemailer");
const moment = require("moment-jalaali");

const settingsServices = require("../services/settingsService");

module.exports = class mailerService {
  static async userResetPasswordSendMail(subject, email, url) {
    try {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: process.env.MAILER_SERVER,
        port: process.env.MAILER_PORT,
        secure: true, // true for 465, false for other ports
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: process.env.MAILER_USER, // generated ethereal user
          pass: process.env.MAILER_PASS, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Manager 👻" <admin@majidev.ir>', // sender address
        to: email, // list of receivers
        subject, // Subject line
        html: `<!DOCTYPE html>
        <html
          lang="en"
          xmlns="http://www.w3.org/1999/xhtml"
          xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office"
        >
          <head>
            <title>${subject}</title>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
              href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
              rel="stylesheet"
            />
            <style type="text/css">
              #outlook a {
                padding: 0;
              }
              .ReadMsgBody {
                width: 100%;
              }
              .ExternalClass {
                width: 100%;
              }
              .ExternalClass * {
                line-height: 100%;
              }
              body {
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
              }
              table,
              td {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
              }
              img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
              }
              p {
                display: block;
                margin: 13px 0;
              }
            </style>
            <style type="text/css">
              @media only screen and (max-width: 480px) {
                @-ms-viewport {
                  width: 320px;
                }
                @viewport {
                  width: 320px;
                }
              }
            </style>
            <style type="text/css">
              @media only screen and (min-width: 480px) {
                .dys-column-per-100 {
                  width: 100% !important;
                  max-width: 100%;
                }
              }
              @media only screen and (min-width: 480px) {
                .dys-column-per-100 {
                  width: 100% !important;
                  max-width: 100%;
                }
              }
              @media only screen and (min-width: 480px) {
                .dys-column-per-90 {
                  width: 90% !important;
                  max-width: 90%;
                }
              }
              @media only screen and (min-width: 480px) {
                .dys-column-per-100 {
                  width: 100% !important;
                  max-width: 100%;
                }
              }
            </style>
          </head>
          <body>
            <div>
              <table
                align="center"
                background="https://s3.amazonaws.com/swu-filepicker/4E687TRe69Ld95IDWyEg_bg_top_02.jpg"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="
                  background: url(https://s3.amazonaws.com/swu-filepicker/4E687TRe69Ld95IDWyEg_bg_top_02.jpg)
                    top center / auto repeat;
                  width: 100%;
                "
              >
                <tbody>
                  <tr>
                    <td>
                      <div style="margin: 0px auto; max-width: 600px">
                        <div style="font-size: 0; line-height: 0">
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="width: 100%"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    direction: ltr;
                                    font-size: 0px;
                                    padding: 20px 0px 30px 0px;
                                    text-align: center;
                                    vertical-align: top;
                                  "
                                >
                                  <div
                                    class="dys-column-per-100 outlook-group-fix"
                                    style="
                                      direction: ltr;
                                      display: inline-block;
                                      font-size: 13px;
                                      text-align: left;
                                      vertical-align: top;
                                      width: 100%;
                                    "
                                  >
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      width="100%"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="
                                              padding: 0px 20px;
                                              vertical-align: top;
                                            "
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style=""
                                              width="100%"
                                            >
                                              <tr>
                                                <td
                                                  align="left"
                                                  style="
                                                    font-size: 0px;
                                                    padding: 0px;
                                                    word-break: break-word;
                                                  "
                                                >
                                                  <table
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    style="
                                                      cellpadding: 0;
                                                      cellspacing: 0;
                                                      color: #000000;
                                                      font-family: Tahoma, Arial,
                                                        sans-serif;
                                                      font-size: 13px;
                                                      line-height: 22px;
                                                      table-layout: auto;
                                                      width: 100%;
                                                    "
                                                    width="100%"
                                                  >
                                                    <tr>
                                                      <td align="left">
                                                        <a
                                                          href="#"
                                                          style="
                                                            text-decoration: none;
                                                            font-size: 25px;
                                                            color: inherit;
                                                            font-family: Tahoma, Arial,
                                                            sans-serif;
                                                          "
                                                        >
                                                        ${subject}
                                                        </a>
                                                      </td>
                                                      <td
                                                        align="right"
                                                        style="vertical-align: bottom"
                                                        width="34px"
                                                      >
                                                        <a href="#">
                                                          <img
                                                            alt="Twitter"
                                                            height="22"
                                                            src="https://s3.amazonaws.com/swu-cs-assets/OSET/social/Twitter_grey.png"
                                                            width="22"
                                                          />
                                                        </a>
                                                      </td>
                                                      <td
                                                        align="right"
                                                        style="vertical-align: bottom"
                                                        width="34px"
                                                      >
                                                        <a href="#">
                                                          <img
                                                            alt="Facebook"
                                                            height="22"
                                                            src="https://swu-cs-assets.s3.amazonaws.com/OSET/social/f_grey.png"
                                                            width="22"
                                                          />
                                                        </a>
                                                      </td>
                                                      <td
                                                        align="right"
                                                        style="vertical-align: bottom"
                                                        width="34px"
                                                      >
                                                        <a href="#">
                                                          <img
                                                            alt="Instagram"
                                                            height="22"
                                                            src="https://swu-cs-assets.s3.amazonaws.com/OSET/social/instagrey.png"
                                                            width="22"
                                                          />
                                                        </a>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="background: #f7f7f7; background-color: #f7f7f7; width: 100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <div style="margin: 0px auto; max-width: 600px">
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="width: 100%"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  direction: ltr;
                                  font-size: 0px;
                                  padding: 20px 0;
                                  text-align: center;
                                  vertical-align: top;
                                "
                              >
                                <div
                                  class="dys-column-per-100 outlook-group-fix"
                                  style="
                                    direction: ltr;
                                    display: inline-block;
                                    font-size: 13px;
                                    text-align: left;
                                    vertical-align: top;
                                    width: 100%;
                                  "
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    style="vertical-align: top"
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          font-size: 0px;
                                          padding: 10px 25px;
                                          word-break: break-word;
                                        "
                                      >
                                        <div
                                          style="
                                            color: #4d4d4d;
                                            font-family: Tahoma, Helvetica neue,
                                              sans-serif;
                                            font-size: 32px;
                                            font-weight: 700;
                                            line-height: 37px;
                                            text-align: center;
                                          "
                                        >
                                        ${subject}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          font-size: 0px;
                                          padding: 10px 25px;
                                          word-break: break-word;
                                        "
                                      >
                                        <div
                                          style="
                                            color: #777777;
                                            font-family: Tahoma, Helvetica neue,
                                              sans-serif;
                                            font-size: 14px;
                                            line-height: 21px;
                                            text-align: center;
                                          "
                                        >
                                          لینک درخواست بازیابی کلمه عبور برای شما ارسال
                                          شده است <br /><br />
                                          اگر شما چنین درخواستی نداده اید این ایمیل را
                                          نادیده بگیرید
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="background: #f7f7f7; background-color: #f7f7f7; width: 100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <div style="margin: 0px auto; max-width: 600px">
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="width: 100%"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  direction: ltr;
                                  font-size: 0px;
                                  padding: 20px;
                                  text-align: center;
                                  vertical-align: top;
                                "
                              >
                                <div
                                  class="dys-column-per-90 outlook-group-fix"
                                  style="
                                    direction: ltr;
                                    display: inline-block;
                                    font-size: 13px;
                                    text-align: left;
                                    vertical-align: top;
                                    width: 100%;
                                  "
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    width="100%"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style="
                                            background-color: #ffffff;
                                            border: 1px solid #ccc;
                                            padding: 50px 15px;
                                            vertical-align: top;
                                          "
                                        >
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style=""
                                            width="100%"
                                          >
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  font-size: 0px;
                                                  padding: 10px 25px;
                                                  word-break: break-word;
                                                "
                                              >
                                                <div
                                                  style="
                                                    color: #777777;
                                                    font-family: Oxygen, Helvetica neue,
                                                      sans-serif;
                                                    font-size: 14px;
                                                    line-height: 21px;
                                                    text-align: center;
                                                  "
                                                >
                                                  <span
                                                    style="
                                                      font-weight: 700;
                                                      color: #ff6f6f;
                                                      font-size: 18px;
                                                      font-family: Tahoma;
                                                    "
                                                  >
                                                    &#128071; لینک بازیابی کلمه عبور
                                                    مخصوص شما
                                                  </span>
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  font-size: 0px;
                                                  padding: 10px 25px;
                                                  word-break: break-word;
                                                "
                                              >
                                                <div
                                                  style="
                                                    color: #777777;
                                                    font-family: Lato, Helvetica neue,
                                                      sans-serif;
                                                    font-size: 14px;
                                                    line-height: 21px;
                                                    text-align: center;
                                                  "
                                                >
                                                  <p
                                                    style="
                                                      padding: 10px 0;
                                                      border: 1px solid #cccccc;
                                                      color: #4d4d4d;
                                                      font-weight: bold;
                                                      font-size: 18px;
                                                      text-align: center;
                                                    "
                                                  >
                                                    ${url}
                                                  </p>
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  font-size: 0px;
                                                  padding: 10px 25px;
                                                  word-break: break-word;
                                                "
                                                vertical-align="middle"
                                              >
                                                <table
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation"
                                                  style="
                                                    border-collapse: separate;
                                                    line-height: 100%;
                                                  "
                                                >
                                                  <tr>
                                                    <td
                                                      align="center"
                                                      bgcolor="#ff6f6f"
                                                      role="presentation"
                                                      style="
                                                        background-color: #ff6f6f;
                                                        border: none;
                                                        border-radius: 5px;
                                                        cursor: auto;
                                                        padding: 10px 25px;
                                                      "
                                                      valign="middle"
                                                    >
                                                      <a
                                                        href="${url}"
                                                        style="
                                                          background: #ff6f6f;
                                                          color: #ffffff;
                                                          font-family: Tahoma,
                                                            Helvetica neue, sans-serif;
                                                          font-size: 14px;
                                                          font-weight: 400;
                                                          line-height: 21px;
                                                          margin: 0;
                                                          text-decoration: none;
                                                          text-transform: none;
                                                        "
                                                        target="_blank"
                                                      >
                                                        بازیابی کلمه عبور
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="background: #f7f7f7; background-color: #f7f7f7; width: 100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <div style="margin: 0px auto; max-width: 600px">
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="width: 100%"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  direction: ltr;
                                  font-size: 0px;
                                  padding: 20px 0;
                                  text-align: center;
                                  vertical-align: top;
                                "
                              >
                                <div
                                  class="dys-column-per-100 outlook-group-fix"
                                  style="
                                    direction: ltr;
                                    display: inline-block;
                                    font-size: 13px;
                                    text-align: left;
                                    vertical-align: top;
                                    width: 100%;
                                  "
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    style="vertical-align: top"
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          font-size: 0px;
                                          padding: 5px 25px;
                                          word-break: break-word;
                                        "
                                      >
                                        <div
                                          style="
                                            color: #777777;
                                            font-family: Lato, Helvetica neue,
                                              sans-serif;
                                            font-size: 14px;
                                            font-style: bold;
                                            font-weight: 700;
                                            line-height: 21px;
                                            text-align: center;
                                          "
                                        >
                                          Majidev
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </body>
        </html>`, // html body
      });
      console.log("Message sent: %s", info.messageId);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async replyMessage(message, reply) {
    try {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: process.env.MAILER_SERVER,
        port: process.env.MAILER_PORT,
        secure: true, // true for 465, false for other ports
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: process.env.MAILER_USER, // generated ethereal user
          pass: process.env.MAILER_PASS, // generated ethereal password
        },
      });

      const date = moment().format("jYYYY/jM/jD - HH:mm");
      const messageDate = moment(message.createdAt).format(
        "jYYYY/jM/jD - HH:mm"
      );
      const settings = await settingsServices.getAllSettings();

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Manager 👻" <admin@majidev.ir>', // sender address
        to: message.email, // list of receivers
        subject: "پاسخ به پیام شما", // Subject line
        html: `<!DOCTYPE html>
        <html lang="en-US">
          <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>پاسخ پیام</title>
            <meta name="description" content="New Account Email Template." />
            <style type="text/css">
              * {
                font-family: Tahoma;
              }
              a:hover {
                text-decoration: underline !important;
              }
      
              .paragraph--type--card-row {
                display: flex;
                justify-content: center;
                flex-flow: row wrap;
              }
              .card:nth-child(2) {
                margin: 0 40px 0 40px;
              }
        
              .card-image {
                background-color: #eee;
                padding: 0;
                margin: 0;
              }
        
              .card h3 {
                margin: 0;
                padding: 10px 0;
                text-align: center;
                line-height: 1.2;
                width: 100%;
                display: inline-block;
                vertical-align: middle;
                cursor: pointer;
                background-color: #eee;
              }
        
              .card-footer {
                border: 1px solid #eee;
                border-bottom: none;
                padding-bottom: 5px;
                background: #eee;
              }
        
              .card p {
                padding: 0 10px;
                margin-bottom: 0;
              }
        
              .card .card-content {
                border: 1px solid #eee;
                border-top: none;
                padding-bottom: 20px;
              }
            </style>
          </head>
        
          <body
            marginheight="0"
            topmargin="0"
            marginwidth="0"
            style="margin: 0px; background-color: #f2f3f8"
            leftmargin="0"
          >
            <!-- 100% body table -->
            <table
              cellspacing="0"
              border="0"
              cellpadding="0"
              width="100%"
              bgcolor="#f2f3f8"
            >
              <tr>
                <td>
                  <table
                    style="background-color: #f2f3f8; max-width: 800px; margin: 0 auto"
                    width="100%"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                  >
                    <tr>
                      <td style="height: 80px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="text-align: center">
                        <a
                          href="${process.env.HOST}"
                          title="logo"
                          target="_blank"
                          style="text-decoration: none; font-size: 24px"
                          >${settings[0].title}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="height: 20px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td>
                        <table
                          width="95%"
                          border="0"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          style="
                            max-width: 670px;
                            background: #fff;
                            border-radius: 3px;
                            text-align: center;
                            -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                            -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                            box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                          "
                        >
                          <tr>
                            <td style="height: 40px">&nbsp;</td>
                          </tr>
                          <tr>
                            <td>
                              <p>سلام ${message.name} عزیز</p>
                              <p>به پیام شما پاسخ دادیم</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="height: 40px">&nbsp;</td>
                          </tr>
                          <tr>
                          <td style="padding: 0 35px">
                            <div class="paragraph--type--card-row">
                              <div class="card" style="width: 600px">
                                <div class="card-content">
                                  <h3>پیام شما</h3>
                                  <p>${message.message}</p>
                                </div>
                                <div class="card-footer">${messageDate}</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                          <tr>
                            <td style="height: 40px">&nbsp;</td>
                          </tr>
                          <tr>
                          <td style="padding: 0 20px">
                            <div class="paragraph--type--card-row">
                              <div class="card" style="width: 600px">
                                <div class="card-content">
                                  <h3>پاسخ</h3>
                                  <p>${reply}</p>
                                </div>
                                <div class="card-footer">${date}</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                          <tr>
                            <td style="height: 40px">&nbsp;</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="height: 20px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="text-align: center">
                        <p
                          style="
                            font-size: 14px;
                            color: rgba(69, 80, 86, 0.7411764705882353);
                            line-height: 18px;
                            margin: 0 0 0;
                          "
                        >
                          &copy;
                          <strong><a href="http://majidev.ir">MAJIDEV</a></strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="height: 80px">&nbsp;</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <!--/100% body table-->
          </body>
        </html>
        `, // html body
      });
      console.log("Message sent: %s", info.messageId);
    } catch (err) {
      throw err;
    }
  }
};
