---
description: 'ESP32 coding guidelines for Arduino core version 3.x with beginner-friendly patterns'
applyTo: '**/*.ino,**/*.cpp,**/*.h,**/*.md'
---

# ESP32 Coding Instructions

## Overview

These instructions apply to ESP32 Arduino core **version 3.x** and above, with a focus on writing clear, beginner-friendly code for students aged 13-17. The guidelines cover PWM API changes and general coding patterns that prioritise educational clarity.

## Beginner-Friendly Coding Patterns

### Use Explicit Operations Over Shortcuts

For educational code targeting students, prioritise clarity over brevity.

**DO use explicit assignment:**
```cpp
// Clear and beginner-friendly
total = total + value;
count = count + 1;
average = total / count;
```

**DON'T use compound operators in educational code:**
```cpp
// Harder for beginners to understand
total += value;   // Avoid for students
count++;          // Avoid for students
average /= count; // Avoid for students
```

**Rationale:** Explicit operations `x = x + y` make it crystal clear that we're taking the old value and modifying it. Students learning programming benefit from seeing the full pattern that matches their mathematics education.

### Accumulator Pattern (Summing Values)

When accumulating sensor readings or other values, use the explicit pattern:

```cpp
// Reading multiple sensor values to calculate average
int readingCount = 0;
float totalReading = 0.0;
unsigned long startTime = millis();

do {
  // Add each sensor reading to the total
  totalReading = totalReading + analogRead(SENSOR_PIN);
  readingCount = readingCount + 1;
}
while (millis() < startTime + SAMPLE_TIME);

// Calculate average: total divided by number of readings
float averageReading = totalReading / readingCount;
```

**Key points:**
- Use descriptive variable names like `totalReading` instead of just `sum`
- Add comments explaining "add to total" and "calculate average"
- Make the division step explicit and separate from the loop

### Array Operations

Use explicit indexing and clear loop patterns:

```cpp
// Shifting array values left (removing oldest, making room for newest)
for (int i = 0; i < ARRAY_SIZE - 1; i++) {
  readings[i] = readings[i + 1];  // Explicit: copy next value to current position
}
readings[ARRAY_SIZE - 1] = newValue;  // Add new value at the end

// Calculating average from array (direct method - preferred for students)
float total = 0;
for (int i = 0; i < ARRAY_SIZE; i++) {
  total = total + readings[i];
}
float average = total / ARRAY_SIZE;
```

**Avoid circular buffers with modulo for beginners:**

```cpp
// DON'T: Complex circular buffer pattern (harder to visualise)
int ptr = 0;
readings[ptr] = newValue;
ptr = ptr + 1;
ptr = ptr % ARRAY_SIZE;  // Modulo wrapping is confusing

// DO: Simple array shifting (students can visualise values "sliding left")
for (int i = 0; i < ARRAY_SIZE - 1; i++) {
  readings[i] = readings[i + 1];
}
readings[ARRAY_SIZE - 1] = newValue;
```

**Avoid cumulative sum optimisation for beginners:**

```cpp
// DON'T: Efficient but complex cumulative sum
float sum = 0;
sum = sum - readings[ptr];      // Remove old value
readings[ptr] = newValue;
sum = sum + readings[ptr];      // Add new value
float average = sum / ARRAY_SIZE;

// DO: Clear and direct averaging (negligible performance difference for small arrays)
for (int i = 0; i < ARRAY_SIZE - 1; i++) {
  readings[i] = readings[i + 1];
}
readings[ARRAY_SIZE - 1] = newValue;

// Calculate average from all values
float total = 0;
for (int i = 0; i < ARRAY_SIZE; i++) {
  total = total + readings[i];
}
float average = total / ARRAY_SIZE;
```

**Rationale:** Array shifting is O(n) vs O(1) for circular buffers, but for small arrays (4-10 elements), the readability gain far outweighs the negligible performance cost (<1 microsecond on ESP32). Students can trace the shifting pattern on paper.

### Counter Increment Patterns

For educational clarity, use explicit increment:

```cpp
// Clear for beginners
counter = counter + 1;

// Advanced shorthand (avoid in educational code)
counter++;  // Use only in non-educational contexts
```

### Variable Naming for Educational Code

Choose descriptive names that make code self-documenting:

**Good Educational Names:**
- `periodIndex` instead of `ptrMM` or `ptr`
- `readingCount` instead of `n`
- `currentReading` instead of `reader`
- `startTime` instead of `start`
- `averageIR` / `averageRED` instead of `lastIR` / `lastRED`
- `previousIR` instead of `beforeIR`
- `R_values` instead of `measuresR`
- `heartbeat_intervals` instead of `measuresPeriods`
- `stable_count` instead of `c`

**Guidelines:**
- Avoid single-letter variables except for loop counters (`i`, `j`)
- Use full words instead of abbreviations
- Name variables after their purpose, not their type
- Make boolean variables read like questions: `finger_status`, `rising`, `isCalibrated`

## ESP32 PWM API Guidelines (Version 3.x)

### Configuration and Attachment

Use `ledcAttach()` to configure and attach a PWM pin in a single call:

```cpp
// Automatic channel allocation
bool ledcAttach(uint8_t pin, uint32_t freq, uint8_t resolution);

// Example: Configure GPIO 2 for 5 kHz, 8-bit PWM
ledcAttach(2, 5000, 8);
```

**Parameters:**
- `pin`: GPIO pin number (use pin numbers, not channel numbers)
- `freq`: PWM frequency in Hz (can range from <1 Hz to 40 MHz)
- `resolution`: Duty cycle resolution in bits (1-14 bits for most ESP32s, 1-20 bits for ESP32 classic)

**Returns:** `true` on success, `false` on error.

For explicit channel control (advanced use only):

```cpp
bool ledcAttachChannel(uint8_t pin, uint32_t freq, uint8_t resolution, int8_t channel);

// Example: Attach GPIO 2 to channel 0
ledcAttachChannel(2, 5000, 8, 0);
```

### Writing PWM Duty Cycle

Use `ledcWrite()` with the **pin number** (not channel):

```cpp
bool ledcWrite(uint8_t pin, uint32_t duty);

// Example: Set 50% duty cycle at 8-bit resolution (128 out of 255)
ledcWrite(2, 128);
```

**Key Point:** In version 3.x, `ledcWrite()` takes a **pin** as the first parameter, not a channel.

### Reading PWM State

```cpp
// Read current duty cycle
uint32_t ledcRead(uint8_t pin);

// Read configured frequency
uint32_t ledcReadFreq(uint8_t pin);
```

### Detaching PWM

```cpp
bool ledcDetach(uint8_t pin);
```

## PWM Configuration Guidelines

### Frequency and Resolution Relationship

Higher frequencies reduce available resolution due to clock constraints. Common configurations:

- **LED control:** 5 kHz, 8-bit (0-255) or 10-bit (0-1023)
- **Motor control:** 5-25 kHz, 8-bit (0-255)
- **Servo control:** 50 Hz, 16-bit (use specialised servo libraries)
- **Audio tones:** Variable frequency, 8-bit, 50% duty cycle

### Standard Pin and PWM Configurations

For this project's standard configurations:

```cpp
// LED control (standard)
const int LED_PIN = 2;
const int PWM_FREQ = 5000;     // 5 kHz
const int PWM_RESOLUTION = 8;  // 0-255

void setup() {
  ledcAttach(LED_PIN, PWM_FREQ, PWM_RESOLUTION);
}

void loop() {
  ledcWrite(LED_PIN, 128);  // 50% brightness
}
```

```cpp
// Motor control (standard)
const int MOTOR_PIN = 4;
const int PWM_FREQ = 5000;     // 5 kHz
const int PWM_RESOLUTION = 8;  // 0-255

void setup() {
  ledcAttach(MOTOR_PIN, PWM_FREQ, PWM_RESOLUTION);
}

void setMotorSpeed(int speed) {
  // speed: 0-255
  ledcWrite(MOTOR_PIN, speed);
}
```

## Advanced PWM Features

### Hardware-Based Fading

Version 3.x introduces hardware-based fade functions:

```cpp
// Simple fade
bool ledcFade(uint8_t pin, uint32_t start_duty, uint32_t target_duty, int max_fade_time_ms);

// Example: Fade LED from off to full brightness over 2 seconds
ledcFade(2, 0, 255, 2000);

// Fade with interrupt callback
bool ledcFadeWithInterrupt(uint8_t pin, uint32_t start_duty, uint32_t target_duty, 
                           int max_fade_time_ms, void (*userFunc)(void));

// Fade with callback and argument
bool ledcFadeWithInterruptArg(uint8_t pin, uint32_t start_duty, uint32_t target_duty, 
                              int max_fade_time_ms, void (*userFunc)(void*), void* arg);
```

### Tone Generation

```cpp
// Generate a tone at specified frequency (50% duty cycle)
uint32_t ledcWriteTone(uint8_t pin, uint32_t freq);

// Generate musical notes
uint32_t ledcWriteNote(uint8_t pin, note_t note, uint8_t octave);

// Available notes: NOTE_C, NOTE_Cs, NOTE_D, NOTE_Eb, NOTE_E, NOTE_F,
//                  NOTE_Fs, NOTE_G, NOTE_Gs, NOTE_A, NOTE_Bb, NOTE_B
```

### Runtime Frequency Changes

```cpp
uint32_t ledcChangeFrequency(uint8_t pin, uint32_t freq, uint8_t resolution);
```

### Signal Inversion

```cpp
bool ledcOutputInvert(uint8_t pin, bool out_invert);
```

## Deprecated Functions (DO NOT USE)

The following functions from version 2.x are **removed** in version 3.x:

- ❌ `ledcSetup(channel, freq, resolution)` → Use `ledcAttach(pin, freq, resolution)`
- ❌ `ledcAttachPin(pin, channel)` → Integrated into `ledcAttach()`
- ❌ `ledcDetachPin(pin)` → Use `ledcDetach(pin)`

## Migration from Version 2.x to 3.x

### Before (Version 2.x):

```cpp
const int LED_PIN = 2;
const int LED_CHANNEL = 0;
const int PWM_FREQ = 5000;
const int PWM_RESOLUTION = 8;

void setup() {
  ledcSetup(LED_CHANNEL, PWM_FREQ, PWM_RESOLUTION);
  ledcAttachPin(LED_PIN, LED_CHANNEL);
}

void loop() {
  ledcWrite(LED_CHANNEL, 128);  // Write to channel
}
```

### After (Version 3.x):

```cpp
const int LED_PIN = 2;
const int PWM_FREQ = 5000;
const int PWM_RESOLUTION = 8;

void setup() {
  ledcAttach(LED_PIN, PWM_FREQ, PWM_RESOLUTION);
}

void loop() {
  ledcWrite(LED_PIN, 128);  // Write to pin
}
```

**Key Changes:**
1. Remove channel variable declarations
2. Replace `ledcSetup()` + `ledcAttachPin()` with single `ledcAttach()` call
3. Change `ledcWrite()` parameter from channel to pin
4. Rename `ledcDetachPin()` to `ledcDetach()`

## Using analogWrite() as Alternative

For simple PWM control, `analogWrite()` provides Arduino-compatible syntax:

```cpp
// Simple approach with defaults (1 kHz, 8-bit)
void setup() {
  pinMode(2, OUTPUT);
}

void loop() {
  analogWrite(2, 128);  // 0-255 range
}

// With custom frequency and resolution
void setup() {
  analogWriteFrequency(2, 5000);    // Set to 5 kHz
  analogWriteResolution(2, 10);     // Set to 10-bit (0-1023)
}

void loop() {
  analogWrite(2, 512);  // 50% at 10-bit resolution
}
```

**Note:** Do not mix `analogWrite()` and `ledcAttach()` on the same pin. Choose one approach per pin.

## Error Handling

Always check return values from PWM configuration functions:

```cpp
if (!ledcAttach(LED_PIN, PWM_FREQ, PWM_RESOLUTION)) {
  Serial.println("Failed to configure PWM on pin");
  // Handle error
}
```

Common failure reasons:
- Invalid pin number
- Frequency-resolution combination exceeds hardware limits
- All available channels exhausted (16 on ESP32, 8 on ESP32-S2/S3, 6 on ESP32-C3/C6/H2)

## Best Practices

1. **Use pin-based API consistently:** Always reference PWM outputs by pin number, not channel.

2. **Let automatic channel allocation work:** Unless you have specific synchronisation needs, use `ledcAttach()` without explicit channel specification.

3. **Check configuration success:** Verify `ledcAttach()` returns `true` before proceeding.

4. **Document frequency requirements:** Add comments explaining why specific frequencies are chosen (e.g., "5 kHz for silent motor operation").

5. **Calculate max duty cycle:** For non-8-bit resolutions, calculate the maximum:
   ```cpp
   const int MAX_DUTY = (1 << PWM_RESOLUTION) - 1;  // 2^resolution - 1
   ```

6. **Reuse frequencies:** Pins sharing the same frequency will automatically share the same underlying timer/channel, conserving resources.

7. **Prefer hardware fading:** Use `ledcFade()` functions instead of manual brightness loops for smooth transitions.

8. **Use explicit operations in educational code:** For student-facing code, use `x = x + y` instead of `x += y` to improve clarity and learning.

9. **Add descriptive comments:** Explain the "why" behind calculations, especially for averaging, accumulation, and filtering operations.

10. **Use descriptive variable names:** Prefer `totalReading` over `sum`, `readingCount` over `n`, and `averageValue` over `avg`.

## Common Patterns

### Multiple PWM Outputs at Same Frequency

```cpp
const int LED_R = 18;
const int LED_G = 19;
const int LED_B = 21;
const int PWM_FREQ = 5000;
const int PWM_RESOLUTION = 8;

void setup() {
  // All three will automatically share the same channel/timer
  ledcAttach(LED_R, PWM_FREQ, PWM_RESOLUTION);
  ledcAttach(LED_G, PWM_FREQ, PWM_RESOLUTION);
  ledcAttach(LED_B, PWM_FREQ, PWM_RESOLUTION);
}

void setRGB(int r, int g, int b) {
  ledcWrite(LED_R, r);
  ledcWrite(LED_G, g);
  ledcWrite(LED_B, b);
}
```

### PWM with Analogue Input Feedback (Beginner-Friendly Version)

```cpp
const int POT_PIN = 34;      // Analogue input
const int MOTOR_PIN = 4;     // PWM output
const int PWM_FREQ = 5000;
const int PWM_RESOLUTION = 8;

void setup() {
  analogReadResolution(10);  // 0-1023
  ledcAttach(MOTOR_PIN, PWM_FREQ, PWM_RESOLUTION);
}

void loop() {
  int potValue = analogRead(POT_PIN);           // 0-1023
  int motorSpeed = map(potValue, 0, 1023, 0, 255);  // Convert to 0-255
  ledcWrite(MOTOR_PIN, motorSpeed);
  delay(10);
}
```

### Smooth LED Breathing Effect

```cpp
const int LED_PIN = 2;
const int PWM_FREQ = 5000;
const int PWM_RESOLUTION = 8;
const int FADE_TIME = 1000;  // 1 second

void setup() {
  ledcAttach(LED_PIN, PWM_FREQ, PWM_RESOLUTION);
}

void loop() {
  // Fade up
  ledcFade(LED_PIN, 0, 255, FADE_TIME);
  delay(FADE_TIME);
  
  // Fade down
  ledcFade(LED_PIN, 255, 0, FADE_TIME);
  delay(FADE_TIME);
}
```

### Sensor Averaging Pattern (Educational)

```cpp
const int SENSOR_PIN = 34;
const int NUM_READINGS = 10;

float getSensorAverage() {
  float total = 0.0;
  int count = 0;
  
  // Collect multiple readings
  for (int i = 0; i < NUM_READINGS; i = i + 1) {
    // Add each reading to the total
    total = total + analogRead(SENSOR_PIN);
    count = count + 1;
    delay(10);  // Small delay between readings
  }
  
  // Calculate average: total divided by number of readings
  float average = total / count;
  return average;
}
```

### Rolling Window Average (Educational)

```cpp
const int WINDOW_SIZE = 4;
float readings[WINDOW_SIZE];

void initReadings() {
  // Initialise all readings to zero
  for (int i = 0; i < WINDOW_SIZE; i++) {
    readings[i] = 0;
  }
}

float addReadingAndGetAverage(float newReading) {
  // Shift old readings left to make room for new one
  for (int i = 0; i < WINDOW_SIZE - 1; i++) {
    readings[i] = readings[i + 1];
  }
  
  // Add new reading at the end
  readings[WINDOW_SIZE - 1] = newReading;
  
  // Calculate average of all readings
  float total = 0;
  for (int i = 0; i < WINDOW_SIZE; i++) {
    total = total + readings[i];
  }
  float average = total / WINDOW_SIZE;
  
  return average;
}
```

### Multiple Array Recording Pattern (Educational)

```cpp
const int NUM_SAMPLES = 10;
float temperatures[NUM_SAMPLES];
int timestamps[NUM_SAMPLES];

void recordNewSample(float temp, int time) {
  // Shift both arrays left together
  for (int i = 0; i < NUM_SAMPLES - 1; i++) {
    temperatures[i] = temperatures[i + 1];
    timestamps[i] = timestamps[i + 1];
  }
  
  // Add new values at the end of both arrays
  temperatures[NUM_SAMPLES - 1] = temp;
  timestamps[NUM_SAMPLES - 1] = time;
}
```

## Debugging PWM Issues

### Check Current PWM State

```cpp
void printPWMState(int pin) {
  uint32_t duty = ledcRead(pin);
  uint32_t freq = ledcReadFreq(pin);
  Serial.printf("Pin %d - Duty: %u, Frequency: %u Hz\n", pin, duty, freq);
}
```

### Verify Frequency-Resolution Compatibility

The maximum frequency for a given resolution is approximately:
```
max_frequency = clock_source_frequency / (2^resolution)
```

For ESP32 with 80 MHz APB clock:
- 8-bit: ~312 kHz max
- 10-bit: ~78 kHz max
- 12-bit: ~19.5 kHz max
- 16-bit: ~1.2 kHz max

## Educational Code Guidelines Summary

When writing code for students aged 13-17:

1. **Use explicit assignment:** `x = x + 1` not `x++`
2. **Use explicit operations:** `total = total + value` not `total += value`
3. **Add explanatory comments:** Explain what AND why
4. **Use descriptive names:** `totalReading` not `sum`, `readingCount` not `n`
5. **Break complex operations into steps:** Show the accumulation, then the calculation
6. **Make maths operations explicit:** Show division as a separate step from loops
7. **Comment the pattern:** "Add to total", "Calculate average", "Find maximum"
8. **Avoid advanced shortcuts:** No ternary operators, no comma operators, minimal pointer arithmetic
9. **Use array shifting instead of circular buffers:** More intuitive than modulo arithmetic
10. **Use direct averaging instead of cumulative sums:** Clarity over micro-optimisation
11. **Avoid modulo (%) for array wrapping:** Students find shifting easier to visualise

### When Complexity Is Acceptable

Some complexity is intentional for teaching important concepts:

**Keep complex algorithms when they teach:**
- **State machines:** Rising/falling edge detection with boolean flags
- **Signal processing:** Peak detection, noise filtering, data validation
- **Physics calculations:** R-ratio formula that shows real-world science
- **Data validation:** Range checking, outlier filtering (within 10% checks)

**Example of intentional complexity (state machine for peak detection):**
```cpp
// Check for rising curve (indicates heartbeat)
if (averageIR > previousIR) {
  rise_count = rise_count + 1;  // Count consecutive rising samples
  
  // If we have enough consecutive rises, it's a heartbeat peak
  if (!rising && rise_count > RISE_THRESHOLD) {
    rising = true;
    // Record heartbeat...
  }
}
else {
  // Curve is falling (between heartbeats)
  rising = false;
  rise_count = 0;
}
```

**Why keep this complexity:** Teaches state machines, debouncing, and signal processing. These are core embedded systems concepts worth the added complexity.

### Performance vs Readability Trade-offs

For small data structures (arrays with 4-10 elements):
- **Prioritise readability:** Use O(n) array shifting instead of O(1) circular buffers
- **Negligible cost:** Extra 10-20 operations per cycle add <1 microsecond on 240MHz ESP32
- **Educational value:** Students can trace array operations on paper

For large data structures (>100 elements) or tight timing requirements:
- **Optimise after teaching:** Introduce efficient patterns after students understand the concept
- **Document the optimisation:** Explain why the more complex version is necessary

The code should read like a recipe, with each step clearly stated and the purpose explained.

## ESP32 Pin Configuration Guidelines

Understanding ESP32 GPIO pin capabilities and restrictions is critical for successful hardware design and debugging. This section provides comprehensive guidance for selecting appropriate pins.

### Pin Categories Overview

ESP32 pins fall into several functional categories with specific restrictions:

1. **Safe general-purpose GPIO** (recommended for most uses)
2. **Input-only pins** (no output capability, no internal pull resistors)
3. **Strapping pins** (control boot behaviour, require care)
4. **Flash-connected pins** (reserved for internal flash memory)
5. **Pins with boot-time behaviour** (output signals during boot)
6. **Special-purpose pins** (UART, JTAG, USB)

### Input-Only Pins (GPIO34-39)

These pins **cannot be used as outputs** and **lack internal pull-up/pull-down resistors**:

- **GPIO34** (ADC1_CH6, RTC_GPIO4)
- **GPIO35** (ADC1_CH7, RTC_GPIO5)
- **GPIO36** (VP, ADC1_CH0, RTC_GPIO0)
- **GPIO39** (VN, ADC1_CH3, RTC_GPIO3)

**Use cases:**
- Analogue sensor inputs (ADC readings)
- Digital inputs with **external** pull-up/pull-down resistors
- RTC (Real-Time Clock) functions during deep sleep

**Restrictions:**
- Cannot use `pinMode(pin, INPUT_PULLUP)` or `pinMode(pin, INPUT_PULLDOWN)` — these will have no effect
- Must add external 10kΩ pull-up or pull-down resistors if needed for stable digital input
- Cannot drive LEDs, relays, or any outputs

**Example (correct usage):**
```cpp
// Reading a button with external pull-up resistor on GPIO34
const int BUTTON_PIN = 34;  // Has external 10kΩ pull-up to 3.3V

void setup() {
  pinMode(BUTTON_PIN, INPUT);  // Note: No PULLUP option
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);
  // Button pressed = LOW (connected to GND)
  // Button released = HIGH (pulled up by external resistor)
}
```

### Strapping Pins (Boot Configuration)

Strapping pins determine ESP32 boot mode by sampling their voltage levels during power-on reset. These pins **can be used after boot** but require careful consideration during the reset phase.

#### ESP32 Classic Strapping Pins:

| Pin | Internal Resistor | Boot Requirement | Notes |
|-----|-------------------|------------------|-------|
| **GPIO0** | Pull-up | HIGH = normal boot, LOW = flash mode | Most critical strapping pin |
| **GPIO2** | Pull-down | Must be floating or LOW | Connected to on-board LED on many dev boards |
| **GPIO5** | Pull-up | Must be HIGH during boot | Outputs PWM signal at boot |
| **GPIO12** (MTDI) | Pull-down | Must be LOW during boot | Controls VDD_SDIO voltage; boot fails if HIGH |
| **GPIO15** (MTDO) | Pull-up | Must be HIGH during boot | Outputs PWM signal at boot |

**Common Boot Modes:**

```
Normal Boot (run firmware):
  GPIO0 = HIGH (pull-up or unconnected)
  GPIO2 = FLOATING or LOW
  GPIO5 = HIGH
  GPIO12 = LOW
  GPIO15 = HIGH

Flash Mode (upload firmware):
  GPIO0 = LOW (pressed BOOT button)
  GPIO2 = FLOATING or LOW
  GPIO5 = HIGH
  GPIO12 = LOW
  GPIO15 = HIGH
```

**Design Guidelines:**

1. **Avoid connecting strapping pins to circuits that pull them to incorrect states during power-on**
2. **Add isolation if necessary:** Use transistors, tri-state buffers, or jumpers to disconnect external circuits during boot
3. **Test boot behaviour:** Verify the ESP32 boots correctly with all peripherals connected
4. **Add test points:** Include test points on strapping pins for troubleshooting boot issues

**Example Problem and Solution:**

```cpp
// PROBLEM: GPIO12 connected to device that pulls it HIGH during boot
// This will cause boot failure!

// SOLUTION 1: Use a different pin
const int MOTOR_PIN = 4;  // Not a strapping pin

// SOLUTION 2: Add external pull-down (if you must use GPIO12)
// Add 10kΩ pull-down resistor on GPIO12 to ensure LOW during boot
// External device should be open-drain or tri-state during boot
```

### Flash-Connected Pins (GPIO6-11) — DO NOT USE

These pins are connected to the internal SPI flash memory and **must not be used for any other purpose**:

- **GPIO6** (SCK/CLK)
- **GPIO7** (SDO/SD0)
- **GPIO8** (SDI/SD1)
- **GPIO9** (SHD/SD2)
- **GPIO10** (SWP/SD3)
- **GPIO11** (CSC/CMD)

**Why avoid:** Using these pins will interfere with flash memory communication, causing the ESP32 to crash or fail to boot.

**Note:** Many ESP32 development boards do not expose these pins to prevent accidental misuse.

### Pins with Boot-Time Signal Output

The following pins output signals or change state during boot/reset. **Avoid connecting critical outputs** (relays, motors, high-current devices) to these pins to prevent unexpected behaviour during startup.

| Pin | Boot Behaviour |
|-----|----------------|
| **GPIO1** | TX pin — outputs debug/boot messages via UART |
| **GPIO3** | RX pin — HIGH at boot |
| **GPIO5** | Outputs PWM signal at boot |
| **GPIO14** | Outputs PWM signal at boot |
| **GPIO15** | Outputs PWM signal at boot |

**Safe use cases:**
- LEDs (brief flicker during boot is acceptable)
- Non-critical indicators
- Devices that tolerate brief signal changes

**Avoid:**
- Relay control (may trigger relay during boot)
- Motor control (may cause brief motor activation)
- Safety-critical outputs

### Safe General-Purpose GPIO Pins (Recommended)

These pins are **safe for most applications** with minimal restrictions:

**Best choices for general I/O:**
- **GPIO4** — Safe, no special restrictions
- **GPIO13** — Safe (JTAG MTCK, but safe if JTAG not used)
- **GPIO16** — Safe (may be used for PSRAM on some modules)
- **GPIO17** — Safe
- **GPIO18** — Safe (default SPI CLK)
- **GPIO19** — Safe (default SPI MISO)
- **GPIO21** — Safe (default I2C SDA)
- **GPIO22** — Safe (default I2C SCL)
- **GPIO23** — Safe (default SPI MOSI)
- **GPIO25** — Safe (DAC1, ADC2_CH8)
- **GPIO26** — Safe (DAC2, ADC2_CH9)
- **GPIO27** — Safe (ADC2_CH7)
- **GPIO32** — Safe (ADC1_CH4, RTC_GPIO9)
- **GPIO33** — Safe (ADC1_CH5, RTC_GPIO8)

**Standard project pin assignments (from this repository):**
```cpp
// Recommended pin configuration for educational projects
const int LED_PIN = 2;           // On-board LED (note: strapping pin, but widely used)
const int MOTOR_PIN = 4;         // Motor control (safe GPIO)
const int TEMP_SENSOR_PIN = 35;  // Temperature sensor (input-only ADC pin)
const int LDR_PIN = 34;          // Light sensor (input-only ADC pin)
```

### ADC (Analogue Input) Pin Restrictions

The ESP32 has two ADC units with different restrictions:

#### ADC1 Pins (Safe with Wi-Fi):
- GPIO32, GPIO33, GPIO34, GPIO35, GPIO36, GPIO39

#### ADC2 Pins (Cannot Use with Wi-Fi):
- GPIO4, GPIO0, GPIO2, GPIO15, GPIO13, GPIO12, GPIO14, GPIO27, GPIO25, GPIO26

**Critical Rule:** When Wi-Fi is enabled, **ADC2 pins cannot be used for analogue readings**. The Wi-Fi driver uses ADC2 internally.

**Example:**
```cpp
// PROBLEM: Using ADC2 pin with Wi-Fi
#include <WiFi.h>

const int SENSOR_PIN = 4;  // ADC2_CH0 — will NOT work with Wi-Fi!

void setup() {
  WiFi.begin(ssid, password);
  analogReadResolution(10);
}

void loop() {
  int sensorValue = analogRead(SENSOR_PIN);  // Returns 0 or garbage!
}

// SOLUTION: Use ADC1 pin instead
const int SENSOR_PIN = 34;  // ADC1_CH6 — works with Wi-Fi
```

### DAC (Digital-to-Analogue Converter) Pins

Two 8-bit DAC channels for generating analogue voltages:

- **GPIO25** (DAC1)
- **GPIO26** (DAC2)

**Resolution:** 8-bit (0-255) → 0V to 3.3V output

### UART Pin Recommendations

ESP32 has three UART interfaces. **UART0 is used for programming/debugging:**

| UART | TX Pin | RX Pin | Use Case |
|------|--------|--------|----------|
| UART0 | GPIO1 | GPIO3 | **Reserved for USB programming** |
| UART1 | GPIO10 | GPIO9 | **Avoid:** Connected to flash |
| UART2 | GPIO17 | GPIO16 | **Safe for external serial devices** |

**Best practice:**
- Use **UART2 (GPIO16/17)** for external serial communication
- Avoid using UART0 (GPIO1/3) unless you disconnect the USB programmer

### I2C and SPI Pin Flexibility

**I2C (Wire library):**
- Default: SDA = GPIO21, SCL = GPIO22
- **Can use any GPIO pins** by calling `Wire.begin(SDA_PIN, SCL_PIN)`

**SPI (SPI library):**
- Default: MOSI = GPIO23, MISO = GPIO19, CLK = GPIO18, SS = GPIO5
- **Can use any GPIO pins** by calling `SPI.begin(CLK, MISO, MOSI, SS)`

**Flexibility advantage:** Unlike Arduino Uno, ESP32 allows you to route I2C and SPI to almost any pin via the GPIO matrix.

### Enable (EN) Pin

- **Function:** 3.3V regulator enable pin (active HIGH)
- **Default state:** Pulled HIGH (ESP32 is enabled)
- **Use case:** Connect to a pushbutton to ground for hardware reset

### Current Limits

**Maximum current per GPIO:** 40 mA (absolute maximum)

**Recommended safe current:** 12 mA per pin for long-term reliability

**Driving high-current loads:**
- Use transistors (e.g., 2N2222, 2N7000) for loads >12 mA
- Use MOSFETs for motors, relays, high-power LEDs
- Never drive motors or relays directly from GPIO pins

### Pin Selection Decision Tree

```
Need analogue input?
├─ Wi-Fi enabled?
│  ├─ YES → Use ADC1 pins (32, 33, 34, 35, 36, 39)
│  └─ NO  → Use any ADC pin
└─ Digital I/O?
   ├─ Need pull-up/pull-down?
   │  ├─ YES → Avoid GPIO34-39 (or add external resistors)
   │  └─ NO  → Any GPIO is OK
   ├─ Critical output (relay/motor)?
   │  └─ Avoid GPIO1, 3, 5, 14, 15 (boot-time signals)
   └─ Safe choice?
      └─ Use GPIO4, 13, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33
```

### Quick Reference Table

| Pin | Input | Output | Internal Pull | ADC | Notes |
|-----|-------|--------|---------------|-----|-------|
| GPIO0 | ✓ | ✓ | Pull-up | ADC2_CH1 | Strapping: boot mode |
| GPIO1 | ✓ | ✓ | — | — | UART0 TX, debug output at boot |
| GPIO2 | ✓ | ✓ | Pull-down | ADC2_CH2 | Strapping, on-board LED |
| GPIO3 | ✓ | ✓ | — | — | UART0 RX, HIGH at boot |
| GPIO4 | ✓ | ✓ | Pull-down | ADC2_CH0 | **Safe GPIO** |
| GPIO5 | ✓ | ✓ | Pull-up | — | Strapping, PWM at boot |
| GPIO6-11 | ❌ | ❌ | — | — | **Flash pins — DO NOT USE** |
| GPIO12 | ✓ | ✓ | Pull-down | ADC2_CH5 | Strapping: must be LOW at boot |
| GPIO13 | ✓ | ✓ | — | ADC2_CH4 | **Safe GPIO** |
| GPIO14 | ✓ | ✓ | — | ADC2_CH6 | PWM at boot |
| GPIO15 | ✓ | ✓ | Pull-up | ADC2_CH3 | Strapping, PWM at boot |
| GPIO16 | ✓ | ✓ | — | — | **Safe GPIO**, UART2 RX |
| GPIO17 | ✓ | ✓ | — | — | **Safe GPIO**, UART2 TX |
| GPIO18 | ✓ | ✓ | — | — | **Safe GPIO**, SPI CLK |
| GPIO19 | ✓ | ✓ | — | — | **Safe GPIO**, SPI MISO |
| GPIO21 | ✓ | ✓ | — | — | **Safe GPIO**, I2C SDA |
| GPIO22 | ✓ | ✓ | — | — | **Safe GPIO**, I2C SCL |
| GPIO23 | ✓ | ✓ | — | — | **Safe GPIO**, SPI MOSI |
| GPIO25 | ✓ | ✓ | — | ADC2_CH8, DAC1 | **Safe GPIO** |
| GPIO26 | ✓ | ✓ | — | ADC2_CH9, DAC2 | **Safe GPIO** |
| GPIO27 | ✓ | ✓ | — | ADC2_CH7 | **Safe GPIO** |
| GPIO32 | ✓ | ✓ | — | ADC1_CH4 | **Safe GPIO**, ADC1 (works with Wi-Fi) |
| GPIO33 | ✓ | ✓ | — | ADC1_CH5 | **Safe GPIO**, ADC1 (works with Wi-Fi) |
| GPIO34 | ✓ | ❌ | **None** | ADC1_CH6 | **Input-only**, requires external pull resistors |
| GPIO35 | ✓ | ❌ | **None** | ADC1_CH7 | **Input-only**, requires external pull resistors |
| GPIO36 (VP) | ✓ | ❌ | **None** | ADC1_CH0 | **Input-only**, requires external pull resistors |
| GPIO39 (VN) | ✓ | ❌ | **None** | ADC1_CH3 | **Input-only**, requires external pull resistors |

### Common Troubleshooting Scenarios

**Problem:** ESP32 won't boot or flash after connecting a new peripheral.
- **Cause:** Strapping pin pulled to incorrect state during boot.
- **Solution:** Check GPIO0, 2, 5, 12, 15 connections. Add isolation or change pins.

**Problem:** `analogRead()` returns 0 or garbage when Wi-Fi is enabled.
- **Cause:** Using ADC2 pin with Wi-Fi active.
- **Solution:** Switch to ADC1 pin (GPIO32-39).

**Problem:** `pinMode(34, INPUT_PULLUP)` doesn't work — pin floats.
- **Cause:** GPIO34-39 have no internal pull resistors.
- **Solution:** Add external 10kΩ pull-up resistor.

**Problem:** Relay/motor activates briefly during ESP32 boot.
- **Cause:** GPIO outputs PWM or changes state during boot.
- **Solution:** Use safe GPIO (4, 13, 16-19, 21-23, 25-27, 32-33) or add external latch circuit.

**Problem:** ESP32 crashes or behaves erratically.
- **Cause:** Using GPIO6-11 (flash pins).
- **Solution:** Never use GPIO6-11. Choose different pins.

## References

- Official migration guide: https://docs.espressif.com/projects/arduino-esp32/en/latest/migration_guides/2.x_to_3.0.html
- LEDC API documentation: https://docs.espressif.com/projects/arduino-esp32/en/latest/api/ledc.html
- ESP-IDF LEDC reference: https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-reference/peripherals/ledc.html
- ESP32 GPIO reference: https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-reference/peripherals/gpio.html
- ESP32 Datasheet: https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf
- ESP32 Boot Mode Selection: https://github.com/espressif/esptool/wiki/ESP32-Boot-Mode-Selection

## Version History

- **Version 2.1** (2025-11-15): Added comprehensive pin configuration guidelines and restrictions
- **Version 2.0** (2025-10-29): Added beginner-friendly coding patterns and educational guidelines
- **Version 1.0** (2025-10-24): Initial documentation based on ESP32 Arduino core 3.x API research
