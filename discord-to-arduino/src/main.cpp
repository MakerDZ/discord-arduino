#include <Arduino.h>
#include <ConnectWifi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <config.h>

WiFiClient wifiClient;
char* SSID = ssid;
char* PASS = password;
String URL = api;

bool isConnected = false;

void setup() {
  Serial.begin(9600);
  isConnected = makeConnection(SSID,PASS);
  pinMode(BUILTIN_LED,OUTPUT);
}

void loop() {
  if(isConnected){
    digitalWrite(BUILTIN_LED,HIGH);
    delay(1000);
    digitalWrite(BUILTIN_LED,LOW);
    delay(1000);
    HTTPClient http;
    http.addHeader("Content-Type", "text/plain");
    http.begin(wifiClient, URL);
    int httpCode = http.GET();
    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println(payload); 
    }else{ 
      Serial.println("http begin failed");
    }
    http.end();
  }
  else{
    Serial.println("Wifi connection failed.");
  }
}