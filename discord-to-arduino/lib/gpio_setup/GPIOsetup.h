#ifndef GPIOsetup
#define GPIOsetup

#include <Arduino.h>

int gpio_pins[8] = {16,5,4,0,2,14,12,13};
int set_pinMode(int totoal_channel){
    for(int i = 0 ; i < totoal_channel ; i++){
        pinMode(gpio_pins[i], OUTPUT);
    }
    return 0;
}


#endif