var fetch = require('node-fetch');
var config = require('./config');
var FB = require('./facebook.action');

const endpoint = "https://graph.facebook.com/v2.6/";
const params = "/thread_settings?access_token=";

var postcontent = generatePostContent();

const finalurl = endpoint + config.FB_PAGE_ID + params + config.FB_PAGE_TOKEN;

fetch(finalurl, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(postcontent)
    }
).then(function (res) {
    return res.json();
}).then(function (json) {
    if (json.result)
        console.log("\n" + json.result);
    if (json.error)
        console.error(json);
});

function generatePostContent() {

    return {
        "setting_type": "call_to_actions",
        "thread_state": "new_thread",
        "call_to_actions": [
            {
                "message": {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "generic",
                            "elements": [
                                FB.generatePayloadElement(
                                    "🤖  Hola, te saluda la asistente virtual de INGO, proyecto desarrollado para el Mastermind Hackathon 2021 y su Reto de Búsqueda Fonética.

                                        🔍 Digite directamente su búsqueda de un producto similarmente fonético a:
                                        -Tenis Nike 
                                        -Licuadora Kitchenair
                                        -Bicicleta Forever
                                        -Avengers 
                                        -Dragon Ball Funka Pop.",
                                    null,
                                    null,
                                    null,
                                    FB.generateActionButton("Fui entrenada en", "Búsquedas")
                                )
                            ]
                        }
                    }
                }
            }
        ]
    }
}
