#ifndef ConnectWifi
#define ConnectWifi

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>

bool makeConnection(const char* ssid, const char* password) {
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    return 1;
}

#endif
