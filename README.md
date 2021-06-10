# crc32ForJavascript

> 記錄一下我搶救別人專案兒消失的好幾天

- 唯一一個在 embeded C, python, flutter 上結果會一樣的 Javascript CRC32 方式
- 關鍵在於 Javascript 的 Number 預設是 64bit sigened, 所以必須通通 >>> 0 移到 uint32
- 另外就是 shift 一定要用 unsigned 版本的 >>>
- C 應該是是用內建的 toolbox
- flutter 版本如下（未簡化）

```flutter
List<int> crc32_tab_gen() {
  List<int> res = [];
  int value = 0;
  for (var i = 0; i < 256; i++) {
    value = i;
    for (var j = 0; j < 8; j++) {
      if (value & 1 == 1) {
        value = (value >> 1) ^ 0xedb88320;
      } else {
        value = value >> 1;
      }
    }
    res += [value];
  }
  return res;
}

int crc32(tab, data){
  var crc = 0xffffffff;
  for(var d in data){
    crc = tab[(crc ^ d) & 0xff] ^ (crc >> 8);
  }
  return crc;
}
```

```JavaScript
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
```
