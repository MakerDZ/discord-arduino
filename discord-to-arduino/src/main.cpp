#include <Arduino.h>
#include <config.h>
#include <ConnectWifi.h>
#include <GPIOsetup.h>
#include <WithAPI.h>
// #include <ESP8266HTTPClient.h>
// #include <WiFiClient.h>

// WiFiClient wifiClient;
const char* SSID = ssid;
const char* PASS = password;
const char* URL = api;
const char* TOKEN = token;

bool isConnected = false;
bool apiConnection = false;
PlayWithAPI playAPI(URL , TOKEN);

void setup(){
  Serial.begin(9600);
  isConnected = makeConnection(SSID,PASS);
  set_pinMode(8);
}

void loop(){
  if (!isConnected) {
    Serial.println("WiFi connection failed.");
    return;
  }
  
  bool apiConnection = playAPI.isConnected();
  if (apiConnection) {
    Serial.println("_______________________");
    Serial.println("API Connection Success!");
    Serial.println("_______________________");
  } else {
    Serial.println("_______________________");
    Serial.println("API Connection Failed!");
    Serial.println("_______________________");
  }
}




// for(int i = 0 ; i <= 7 ; i++){
  //   digitalWrite(gpio_pins[i],HIGH);
  //   delay(1000);
  // }
  // for(int i = 7 ; i >= 0  ; i--){
  //   digitalWrite(gpio_pins[i],LOW);
  //   delay(1000);
  // }

// void setup() {
//   Serial.begin(9600);
//   isConnected = makeConnection(SSID,PASS);
//   pinMode(BUILTIN_LED,OUTPUT);
// }

// void loop() {
//   if(isConnected){
//     digitalWrite(BUILTIN_LED,HIGH);
//     delay(1000);
//     digitalWrite(BUILTIN_LED,LOW);
//     delay(1000);
//     HTTPClient http;
//     http.addHeader("Content-Type", "text/plain");
//     http.begin(wifiClient, URL);
//     int httpCode = http.GET();
//     if (httpCode > 0) {
//       String payload = http.getString();
//       Serial.println(payload); 
//     }else{ 
//       Serial.println("http begin failed");
//     }
//     http.end();
//   }
//   else{
//     Serial.println("Wifi connection failed.");
//   }
// }