class SMS {
    constructor() {
        this.car_uid = 0;
    }
  
    send() {
        var smtp = _smtp.init()

        smtp.to = _app.settings.getString("mail_to");
    
        smtp.subject = "A sua matricula foi registada.";
        smtp.text = "A matrícula " + plate + " foi registada na CartaLog.";
        
        smtp.html = "<div>"
        smtp.html += "<img src=\"cid:logo\" width=\"200\" />"
        smtp.html += "<p>A matrícula " + plate + " foi registada na CartaLog.</p>"
        smtp.html += "</div>"
        
        smtp.attachment(
            "logo.png",
            "image/png",
            _storage.filesystem("server", "samples/mail", "logo.png").file(),
            "logo"
        )
        
        smtp.attachment(
            "doc.text",
            "text/plain",
            _storage.filesystem("server", "samples/mail", "doc.txt").file()
        )
        
        if (smtp.enabled) {
            smtp.send()
            _out.println("<h2>Mail sent...</h2>")
        } else {
            _out.println("<h2>The SMTP configuration is disabled!</h2>")
            _out.println("<p>Please define your configurations and enable it.</p>")
        }

        _out.json(true);
    }
  }
  