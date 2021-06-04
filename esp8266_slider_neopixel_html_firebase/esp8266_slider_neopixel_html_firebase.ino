//https://github.com/mobizt/Firebase-ESP8266/blob/master/README.md
//https://www.youtube.com/watch?v=9DNS_3Cu7NU   Exception 9 stack error
//https://www.youtube.com/watch?v=5FMQF5fGYrs

#include <Adafruit_NeoPixel.h>
#include <FirebaseESP8266.h>
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif


//#include <FirebaseESP32.h> //esp32 lib

#define WIFI_SSID "Lavish"
#define WIFI_PASSWORD "12345678"

#define LedPin 16         // pin d0 as toggle pin
#define NUM_PIXELS 8      //number of rgb led
#define PIN_PIXELS 14     //pin d5 
#define FIREBASE_HOST "slider-edf63-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "zpxNTBc1T6QZ3ssV7WspCoU6KBJICHPCnp0ypQg9"
FirebaseData firebaseData;
String laygiatriRed;
String laygiatriGreen;
String laygiatriBlue;

Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUM_PIXELS, PIN_PIXELS, NEO_GRB + NEO_KHZ800);
void setup ()
{
  pinMode(LedPin, OUTPUT);
  pixels.begin();
  Serial.begin(9600);
  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ") ;
  Serial.println(WiFi.localIP());
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);     
}
void loop ()
{
  if(Firebase.getString(firebaseData, "/redValue"))
  {
    laygiatriRed = firebaseData.stringData();
    Serial.print("red:");
    Serial.print(laygiatriRed);
  }else{
    Serial.print("Error in getInt, ");
    Serial.println(firebaseData.errorReason());
  }

  if(Firebase.getString(firebaseData, "/greenValue"))
  {
    laygiatriGreen = firebaseData.stringData();
    Serial.print("\tgreen:");
    Serial.print(laygiatriGreen);
  }else{
    Serial.print("Error in getInt, ");
    Serial.println(firebaseData.errorReason());
  }
  if(Firebase.getString(firebaseData, "/blueValue"))
  {
    laygiatriBlue = firebaseData.stringData();
    Serial.print("\tblue:");
    Serial.println(laygiatriBlue);
  }else{
    Serial.print("Error in getInt, ");
    Serial.println(firebaseData.errorReason());
  }
for(int i =0; i<8; i++){
  pixels.setPixelColor(i, pixels.Color(laygiatriRed.toInt(), laygiatriGreen.toInt(), laygiatriBlue.toInt()));
}
  pixels.show(); 
}
