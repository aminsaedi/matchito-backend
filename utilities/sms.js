const Kavenegar = require("kavenegar");
const config = require("config");

const sms = Kavenegar.KavenegarApi({ apikey: config.get("smsToken") });

module.exports.sendOtp = (mobile) => {
  const min = Math.ceil(1000);
  const max = Math.floor(9999);
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(`OTP of ${mobile} is : ${otp}`);
  // sms.Send({
  //   message: "به شاپیتو خوش آمدید  \n کد ورود: " + otp,
  //   sender: "1000596446",
  //   receptor: mobile,
  // });
  sms.VerifyLookup(
    { receptor: mobile, token: otp, template: config.get("otpSchema") },
    function (response, status) {
      //   console.log(response);
      //   console.log(status);
    }
  );
  return otp;
};

module.exports.sendSms = (mobile, message) => {
  sms.Send({
    message: message.toString(),
    sender: "1000596446",
    receptor: mobile,
  });
};
