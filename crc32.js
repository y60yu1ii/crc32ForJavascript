function crc32(data) {
  var crcTable = crc32_tab_gen();
  var crc = 0xffffffff >>> 0;

  for (var i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ data[i]) & 0xff];
    crc = crc >>> 0;
  }

  return crc >>> 0;
}

function crc32_tab_gen() {
  //Most correct CRC32 table in JS
  var res = [];
  var value = 0 >>> 0;
  for (var ii = 0; ii < 256; ii++) {
    value = ii >>> 0;
    for (var j = 0; j < 8; j++) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    res = [...res, ...[value >>> 0]];
  }
  return res;
}
