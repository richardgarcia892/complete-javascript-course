'use  strict';

function decodeUplink(input) {
  const decoded = Decoder(input.bytes);
  let values = {};
  transform.soilTemperature(values, decoded['chn1'], 'soilTemperature1');
  transform.soilMoisture(values, decoded['chn2'], 'soilMoisture1');
  transform.soilEC(values, decoded['chn3'], 'soilEC1');
  transform.soilTemperature(values, decoded['chn4'], 'soilTemperature2');
  transform.soilMoisture(values, decoded['chn5'], 'soilMoisture2');
  transform.soilEC(values, decoded['chn6'], 'soilEC2');
  transform.soilTemperature(values, decoded['chn7'], 'soilTemperature3');
  transform.soilMoisture(values, decoded['chn8'], 'soilMoisture3');
  transform.soilEC(values, decoded['chn9'], 'soilEC3');
  decoded.output = values;
  return {
    data: decoded,
    warnings: [],
    errors: [],
  };
}

const transform = {
  soilTemperature(values, value, label) {
    // Temperatura de tierra
    values[label] = value / 10;
  },
  soilMoisture(values, value, label) {
    // Humedad de tierra
    values[label] = value / 10;
  },
  soilEC(values, value, label) {
    // de tierra
    values[label] = value / 1000;
  },
  envTemperature(values, value, label) {
    // Temperaturaa ambiental
    values[label] = value;
  },
  envHumidity(values, value, label) {
    // Humedad ambiental
    values[label] = value;
  },
  envPressure(values, value, label) {
    // Presion atmosferica
    values[label] = value;
  },
  windSpeed(values, value, label) {
    // Velocidad del viento
    values[label] = value;
  },
  windDirection(values, value, label) {
    // direccion de viento
    values[label] = value;
  },
  rainfall(values, value, label) {
    // Volumen de lluvia
    values[label] = value;
  },
  lightUV(values, value, label) {
    // Luz UV
    values[label] = value;
  },
};

/**
 * Payload Decoder for The Things Network
 *
 * Copyright 2020 Milesight IoT
 *
 * @product UC500 series
 */
function Decoder(bytes, port) {
  var decoded = {};

  for (i = 0; i < bytes.length; ) {
    var channel_id = bytes[i++];
    var channel_type = bytes[i++];

    // BATTERY
    if (channel_id === 0x01 && channel_type === 0x75) {
      decoded.battery = bytes[i];
      i += 1;
    }
    // GPIO1
    else if (channel_id === 0x03 && channel_type !== 0xc8) {
      decoded.gpio1 = bytes[i] === 0 ? 'off' : 'on';
      i += 1;
    }
    // GPIO2
    else if (channel_id === 0x04 && channel_type !== 0xc8) {
      decoded.gpio2 = bytes[i] === 0 ? 'off' : 'on';
      i += 1;
    }
    // PULSE COUNTER 1
    else if (channel_id === 0x03 && channel_type === 0xc8) {
      decoded.counter1 = readUInt32LE(bytes.slice(i, i + 4));
      i += 4;
    }
    // PULSE COUNTER 2
    else if (channel_id === 0x04 && channel_type === 0xc8) {
      decoded.counter2 = readUInt32LE(bytes.slice(i, i + 4));
      i += 4;
    }
    // ADC 1
    else if (channel_id === 0x05) {
      decoded.adc1 = {};
      decoded.adc1.cur = readInt16LE(bytes.slice(i, i + 2)) / 100;
      decoded.adc1.min = readInt16LE(bytes.slice(i + 2, i + 4)) / 100;
      decoded.adc1.max = readInt16LE(bytes.slice(i + 4, i + 6)) / 100;
      decoded.adc1.avg = readInt16LE(bytes.slice(i + 6, i + 8)) / 100;
      i += 8;
      continue;
    }
    // ADC 2
    else if (channel_id === 0x06) {
      decoded.adc2 = {};
      decoded.adc2.cur = readInt16LE(bytes.slice(i, i + 2)) / 100;
      decoded.adc2.min = readInt16LE(bytes.slice(i + 2, i + 4)) / 100;
      decoded.adc2.max = readInt16LE(bytes.slice(i + 4, i + 6)) / 100;
      decoded.adc2.avg = readInt16LE(bytes.slice(i + 6, i + 8)) / 100;
      i += 8;
      continue;
    }
    // MODBUS
    else if (channel_id === 0xff && channel_type === 0x0e) {
      var modbus_chn_id = bytes[i++] - 6;
      var package_type = bytes[i++];
      var data_type = package_type & 7;
      var date_length = package_type >> 3;
      var chn = 'chn' + modbus_chn_id;
      switch (data_type) {
        case 0:
          decoded[chn] = bytes[i] ? 'on' : 'off';
          i += 1;
          break;
        case 1:
          decoded[chn] = bytes[i];
          i += 1;
          break;
        case 2:
        case 3:
          decoded[chn] = readUInt16LE(bytes.slice(i, i + 2));
          i += 2;
          break;
        case 4:
        case 6:
          decoded[chn] = readUInt32LE(bytes.slice(i, i + 4));
          i += 4;
          break;
        case 5:
        case 7:
          decoded[chn] = readFloatLE(bytes.slice(i, i + 4));
          i += 4;
          break;
      }
    }
  }

  return decoded;
}

/* ******************************************
 * bytes to number
 ********************************************/
function readUInt8LE(bytes) {
  return bytes & 0xff;
}

function readInt8LE(bytes) {
  var ref = readUInt8LE(bytes);
  return ref > 0x7f ? ref - 0x100 : ref;
}

function readUInt16LE(bytes) {
  var value = (bytes[1] << 8) + bytes[0];
  return value & 0xffff;
}

function readInt16LE(bytes) {
  var ref = readUInt16LE(bytes);
  return ref > 0x7fff ? ref - 0x10000 : ref;
}

function readUInt32LE(bytes) {
  var value = (bytes[3] << 24) + (bytes[2] << 16) + (bytes[1] << 8) + bytes[0];
  return value & 0xffffffff;
}

function readInt32LE(bytes) {
  var ref = readUInt32LE(bytes);
  return ref > 0x7fffffff ? ref - 0x100000000 : ref;
}

function readFloatLE(bytes) {
  // JavaScript bitwise operators yield a 32 bits integer, not a float.
  // Assume LSB (least significant byte first).
  var bits = (bytes[3] << 24) | (bytes[2] << 16) | (bytes[1] << 8) | bytes[0];
  var sign = bits >>> 31 === 0 ? 1.0 : -1.0;
  var e = (bits >>> 23) & 0xff;
  var m = e === 0 ? (bits & 0x7fffff) << 1 : (bits & 0x7fffff) | 0x800000;
  var f = sign * m * Math.pow(2, e - 150);
  return f;
}
