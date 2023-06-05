#ifndef WithAPI
#define WithAPI

#include <Arduino.h>
#include <ArduinoJson.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

WiFiClient wifiClient;
HTTPClient http;

class PlayWithAPI {
private:
    const char* _API_URL;
    const char* _API_TOKEN;

public:

    PlayWithAPI(const char* API_URL, const char* API_TOKEN) {
        size_t length = strlen(API_URL);
        char* tempURL = new char[length + 1]; 
        strcpy(tempURL, API_URL); 
        if (length > 0 && tempURL[length - 1] == '/') {
            tempURL[length - 1] = '\0';
        }
        _API_URL = tempURL;
        _API_TOKEN = API_TOKEN;
    }

    bool isConnected() {
        String EndPoint = String(_API_URL) + "/api/v1";
        http.begin(wifiClient, EndPoint);
        http.addHeader("Content-Type", "text/plain");
        http.addHeader("TOKEN", _API_TOKEN);
        int httpCode = http.GET();
        if (httpCode > 0) {
            String payload = http.getString();
            StaticJsonDocument<128> doc;
            DeserializationError error = deserializeJson(doc, payload);

            if (error) {
                Serial.print(F("deserializeJson() failed: "));
                Serial.println(error.f_str());
                return false;
            }
            bool status = doc["status"];
            const char* message = doc["message"]; 
            return status;
        } else {
            Serial.println("http begin failed");
            http.end();
            return false;
        }
    }

    int getTotalChannels(){

    }
};



#endif