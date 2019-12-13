class SMS {
  constructor(car_uid) {
    this.car = _db.get("carro", car_uid);
}

  send() {
    var sendSMS = _remote.init();

    sendSMS.setAuthorization("Bearer " + _app.settings.getString("sms_token"));

    var sms = _val
      .init()
      .set("From", "Netuno.org")
      .set("To", _app.settings.getString("sms_to"))
      .set("Text", "A matrícula " + this.car.getString('placa') + " foi registada!");

    sendSMS.post("https://api.mailjet.com/v4/sms-send", sms)
  }
}
