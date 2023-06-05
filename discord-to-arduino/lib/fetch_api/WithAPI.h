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
            Serial.println("http begin failed at api connection test endpoint.");
            http.end();
            return false;
        }
    }

    int getTotalChannels(){
        String EndPoint = String(_API_URL) + "/api/v1/lightcount";
        http.begin(wifiClient, EndPoint);
        http.addHeader("Content-Type", "text/plain");
        http.addHeader("TOKEN", _API_TOKEN);
        int httpCode = http.GET();
        if (httpCode > 0) {
            String payload = http.getString();
            StaticJsonDocument<32> doc;
            DeserializationError error = deserializeJson(doc, payload);

            if (error) {
            Serial.print(F("deserializeJson() failed: "));
            Serial.println(error.f_str());
            return 0;
            }

            int count = doc["count"]; 
            return count;
        }
        else {
            Serial.println("http begin failed at light count endpoint.");
            http.end();
            return 0;
        }
    }

    bool lightStatus(int light_index){
        String EndPoint = String(_API_URL) + "/api/v1/getlight/" + String(light_index);
        http.begin(wifiClient, EndPoint);
        http.addHeader("Content-Type", "text/plain");
        http.addHeader("TOKEN", _API_TOKEN);
        int httpCode = http.GET();
        if (httpCode > 0) {
            String payload = http.getString();
            StaticJsonDocument<192> doc;
            DeserializationError error = deserializeJson(doc, payload);

            if (error) {
            Serial.print(F("deserializeJson() failed: "));
            Serial.println(error.f_str());
            return 0;
            }

            const char* id = doc["_id"]; 
            int index = doc["index"]; 
            const char* name = doc["name"]; 
            bool status = doc["status"]; 
            Serial.println(status);
            return status;
        }
        else {
            Serial.println("http begin failed at light count endpoint.");
            http.end();
            return 0;
        }
    }
};



#endif