class SMS {
  constructor() {
      this.car_uid = 0;
  }

  send() {
    var sendSMS = _remote.init();

    sendSMS.setAuthorization("Bearer " + _app.settings.getString("sms_token"));

    var sms = _val
      .init()
      .set("From", "Netuno.org")
      .set("To", _app.settings.getString("sms_to"))
      .set("Text", "A matrícula " + plate + " foi registada!");

    _out.json(sendSMS.post("https://api.mailjet.com/v4/sms-send", sms));
  }
}
