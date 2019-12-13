class Mail {
    constructor(car_uid) {
        this.car = _db.get("carro", car_uid);
    }
  
    send() {
        var smtp = _smtp.init()

        smtp.to = _app.settings.getString("mail_to");
    
        smtp.subject = "A sua matricula foi registada.";
        smtp.text = "";
        smtp.text = `
        A matrícula <b>${this.car.getString('placa')}</b> foi registada na CartaLog.
        `;      
        
        smtp.html = `
        <style>
          table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
          }
          th, td, img {
          padding: 5px;
          }
        </style>
        <div style="padding: 50px; background: #001529;">
            <img src="cid:logo" width="300" />
            <div style="padding: 30px;"></div>
            <div style="padding: 40px; background: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
               <h2>${smtp.subject}</h2>
               <p style="font-size: 14px;">${smtp.text}</p>
            </div>
        </div>
        `;      
        
        smtp.attachment(
            "logo.png",
            "image/png",
            _storage.filesystem("server", "logo.png").file(),
            "logo"
        );

        if (smtp.enabled) {
            smtp.send()
        } else {
            _log.warn("The SMTP configuration is disabled!");
        }
    }
  }
  