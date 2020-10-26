$(() => {
    const input = $("#input");
    const link = $("#whats-app-link");
    input.on("keyup" /*"input keydown keyup mousedown mouseup select contextmenu drop"*/, () => {
        let val = input.val().toString().replace(/[^\d:+-\s/]/g,"");
        input.val(val);

        let whatsAppNummer = val.replace(/\s+/g, "").replace("+", "00").replace(/\D*/g,"");

        //Ohne Ländervorwahl
        const ohneLändervorwahl = whatsAppNummer.match(/^0?([1-9]\d*$)/);
        if(!!ohneLändervorwahl){
            whatsAppNummer = "49" + ohneLändervorwahl[1];
        } else {
            whatsAppNummer = whatsAppNummer.replace(/^00(?=[1-9]\d*$)/,"");
        }

        whatsAppNummer = whatsAppNummer
        link.attr("href",  "https://wa.me/" + whatsAppNummer);
        link.text(!whatsAppNummer ? "nicht bereit" : ("+" + whatsAppNummer));
    });
});