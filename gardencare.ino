#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <ArduinoJson.h>

#define DHTPIN 4
#define LDR_PIN 34
#define DHTTYPE DHT11
#define LDR_LIMIAR 2000

const char* ssid = "Gustavo";
const char* password = "123456789";

const char* urlSensores = "https://gardencare-facul-default-rtdb.firebaseio.com/sensores.json";
const char* urlComandos = "https://gardencare-facul-default-rtdb.firebaseio.com/comandos.json";
const char* urlResetCmd = "https://gardencare-facul-default-rtdb.firebaseio.com/comandos/solicitarLeitura.json";

DHT dht(DHTPIN, DHT11);

void enviarSensores(float temperatura, float umidadeAr, int luminosidade) {
  HTTPClient http;
  http.begin(urlSensores);
  http.addHeader("Content-Type", "application/json");

  StaticJsonDocument<200> doc;
  doc["temperatura"] = temperatura;
  doc["umidadeAr"] = umidadeAr;
  doc["luminosidade"] = luminosidade;
  doc["online"] = true;

  String json;
  serializeJson(doc, json);

  int codigo = http.PUT(json);
  Serial.println(codigo > 0 ? "Sensores enviados!" : "Erro ao enviar sensores.");
  http.end();
}

bool lerSolicitacaoDoApp() {
  HTTPClient http;
  http.begin(urlComandos);
  int codigo = http.GET();
  bool solicitou = false;
  if (codigo == 200) {
    StaticJsonDocument<200> doc;
    deserializeJson(doc, http.getString());
    solicitou = doc["solicitarLeitura"] | false;
  }
  http.end();
  return solicitou;
}

void confirmarRecebimento() {
  HTTPClient http;
  http.begin(urlResetCmd);
  http.addHeader("Content-Type", "application/json");
  http.PUT("false");
  http.end();
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(ssid, password);
  Serial.print("Conectando ao WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado!");
  Serial.println(WiFi.localIP());
}

void loop() {
  float temperatura = dht.readTemperature();
  float umidadeAr = dht.readHumidity();
  int ldrBruto = analogRead(LDR_PIN);

  Serial.print("LDR bruto: ");
  Serial.println(ldrBruto);

  int luminosidade = (ldrBruto < LDR_LIMIAR) ? 1 : 0;

  if (isnan(temperatura) || isnan(umidadeAr)) {
    Serial.println("Erro ao ler DHT11!");
    delay(2000);
    return;
  }

  Serial.printf("Temperatura:  %.1f C\n", temperatura);
  Serial.printf("Umidade Ar:   %.1f %%\n", umidadeAr);
  Serial.printf("Luminosidade: %s\n", luminosidade ? "Claro" : "Escuro");

  if (WiFi.status() == WL_CONNECTED) {
    if (lerSolicitacaoDoApp()) {
      Serial.println("App solicitou leitura!");
      confirmarRecebimento();
    }
    enviarSensores(temperatura, umidadeAr, luminosidade);
  } else {
    Serial.println("WiFi desconectado. Reconectando...");
    WiFi.begin(ssid, password);
  }

  delay(5000);
}
