// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/exif-js/exif.js":[function(require,module,exports) {
var define;
(function() {

    var debug = false;

    var root = this;

    var EXIF = function(obj) {
        if (obj instanceof EXIF) return obj;
        if (!(this instanceof EXIF)) return new EXIF(obj);
        this.EXIFwrapped = obj;
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = EXIF;
        }
        exports.EXIF = EXIF;
    } else {
        root.EXIF = EXIF;
    }

    var ExifTags = EXIF.Tags = {

        // version tags
        0x9000 : "ExifVersion",             // EXIF version
        0xA000 : "FlashpixVersion",         // Flashpix format version

        // colorspace tags
        0xA001 : "ColorSpace",              // Color space information tag

        // image configuration
        0xA002 : "PixelXDimension",         // Valid width of meaningful image
        0xA003 : "PixelYDimension",         // Valid height of meaningful image
        0x9101 : "ComponentsConfiguration", // Information about channels
        0x9102 : "CompressedBitsPerPixel",  // Compressed bits per pixel

        // user information
        0x927C : "MakerNote",               // Any desired information written by the manufacturer
        0x9286 : "UserComment",             // Comments by user

        // related file
        0xA004 : "RelatedSoundFile",        // Name of related sound file

        // date and time
        0x9003 : "DateTimeOriginal",        // Date and time when the original image was generated
        0x9004 : "DateTimeDigitized",       // Date and time when the image was stored digitally
        0x9290 : "SubsecTime",              // Fractions of seconds for DateTime
        0x9291 : "SubsecTimeOriginal",      // Fractions of seconds for DateTimeOriginal
        0x9292 : "SubsecTimeDigitized",     // Fractions of seconds for DateTimeDigitized

        // picture-taking conditions
        0x829A : "ExposureTime",            // Exposure time (in seconds)
        0x829D : "FNumber",                 // F number
        0x8822 : "ExposureProgram",         // Exposure program
        0x8824 : "SpectralSensitivity",     // Spectral sensitivity
        0x8827 : "ISOSpeedRatings",         // ISO speed rating
        0x8828 : "OECF",                    // Optoelectric conversion factor
        0x9201 : "ShutterSpeedValue",       // Shutter speed
        0x9202 : "ApertureValue",           // Lens aperture
        0x9203 : "BrightnessValue",         // Value of brightness
        0x9204 : "ExposureBias",            // Exposure bias
        0x9205 : "MaxApertureValue",        // Smallest F number of lens
        0x9206 : "SubjectDistance",         // Distance to subject in meters
        0x9207 : "MeteringMode",            // Metering mode
        0x9208 : "LightSource",             // Kind of light source
        0x9209 : "Flash",                   // Flash status
        0x9214 : "SubjectArea",             // Location and area of main subject
        0x920A : "FocalLength",             // Focal length of the lens in mm
        0xA20B : "FlashEnergy",             // Strobe energy in BCPS
        0xA20C : "SpatialFrequencyResponse",    //
        0xA20E : "FocalPlaneXResolution",   // Number of pixels in width direction per FocalPlaneResolutionUnit
        0xA20F : "FocalPlaneYResolution",   // Number of pixels in height direction per FocalPlaneResolutionUnit
        0xA210 : "FocalPlaneResolutionUnit",    // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
        0xA214 : "SubjectLocation",         // Location of subject in image
        0xA215 : "ExposureIndex",           // Exposure index selected on camera
        0xA217 : "SensingMethod",           // Image sensor type
        0xA300 : "FileSource",              // Image source (3 == DSC)
        0xA301 : "SceneType",               // Scene type (1 == directly photographed)
        0xA302 : "CFAPattern",              // Color filter array geometric pattern
        0xA401 : "CustomRendered",          // Special processing
        0xA402 : "ExposureMode",            // Exposure mode
        0xA403 : "WhiteBalance",            // 1 = auto white balance, 2 = manual
        0xA404 : "DigitalZoomRation",       // Digital zoom ratio
        0xA405 : "FocalLengthIn35mmFilm",   // Equivalent foacl length assuming 35mm film camera (in mm)
        0xA406 : "SceneCaptureType",        // Type of scene
        0xA407 : "GainControl",             // Degree of overall image gain adjustment
        0xA408 : "Contrast",                // Direction of contrast processing applied by camera
        0xA409 : "Saturation",              // Direction of saturation processing applied by camera
        0xA40A : "Sharpness",               // Direction of sharpness processing applied by camera
        0xA40B : "DeviceSettingDescription",    //
        0xA40C : "SubjectDistanceRange",    // Distance to subject

        // other tags
        0xA005 : "InteroperabilityIFDPointer",
        0xA420 : "ImageUniqueID"            // Identifier assigned uniquely to each image
    };

    var TiffTags = EXIF.TiffTags = {
        0x0100 : "ImageWidth",
        0x0101 : "ImageHeight",
        0x8769 : "ExifIFDPointer",
        0x8825 : "GPSInfoIFDPointer",
        0xA005 : "InteroperabilityIFDPointer",
        0x0102 : "BitsPerSample",
        0x0103 : "Compression",
        0x0106 : "PhotometricInterpretation",
        0x0112 : "Orientation",
        0x0115 : "SamplesPerPixel",
        0x011C : "PlanarConfiguration",
        0x0212 : "YCbCrSubSampling",
        0x0213 : "YCbCrPositioning",
        0x011A : "XResolution",
        0x011B : "YResolution",
        0x0128 : "ResolutionUnit",
        0x0111 : "StripOffsets",
        0x0116 : "RowsPerStrip",
        0x0117 : "StripByteCounts",
        0x0201 : "JPEGInterchangeFormat",
        0x0202 : "JPEGInterchangeFormatLength",
        0x012D : "TransferFunction",
        0x013E : "WhitePoint",
        0x013F : "PrimaryChromaticities",
        0x0211 : "YCbCrCoefficients",
        0x0214 : "ReferenceBlackWhite",
        0x0132 : "DateTime",
        0x010E : "ImageDescription",
        0x010F : "Make",
        0x0110 : "Model",
        0x0131 : "Software",
        0x013B : "Artist",
        0x8298 : "Copyright"
    };

    var GPSTags = EXIF.GPSTags = {
        0x0000 : "GPSVersionID",
        0x0001 : "GPSLatitudeRef",
        0x0002 : "GPSLatitude",
        0x0003 : "GPSLongitudeRef",
        0x0004 : "GPSLongitude",
        0x0005 : "GPSAltitudeRef",
        0x0006 : "GPSAltitude",
        0x0007 : "GPSTimeStamp",
        0x0008 : "GPSSatellites",
        0x0009 : "GPSStatus",
        0x000A : "GPSMeasureMode",
        0x000B : "GPSDOP",
        0x000C : "GPSSpeedRef",
        0x000D : "GPSSpeed",
        0x000E : "GPSTrackRef",
        0x000F : "GPSTrack",
        0x0010 : "GPSImgDirectionRef",
        0x0011 : "GPSImgDirection",
        0x0012 : "GPSMapDatum",
        0x0013 : "GPSDestLatitudeRef",
        0x0014 : "GPSDestLatitude",
        0x0015 : "GPSDestLongitudeRef",
        0x0016 : "GPSDestLongitude",
        0x0017 : "GPSDestBearingRef",
        0x0018 : "GPSDestBearing",
        0x0019 : "GPSDestDistanceRef",
        0x001A : "GPSDestDistance",
        0x001B : "GPSProcessingMethod",
        0x001C : "GPSAreaInformation",
        0x001D : "GPSDateStamp",
        0x001E : "GPSDifferential"
    };

     // EXIF 2.3 Spec
    var IFD1Tags = EXIF.IFD1Tags = {
        0x0100: "ImageWidth",
        0x0101: "ImageHeight",
        0x0102: "BitsPerSample",
        0x0103: "Compression",
        0x0106: "PhotometricInterpretation",
        0x0111: "StripOffsets",
        0x0112: "Orientation",
        0x0115: "SamplesPerPixel",
        0x0116: "RowsPerStrip",
        0x0117: "StripByteCounts",
        0x011A: "XResolution",
        0x011B: "YResolution",
        0x011C: "PlanarConfiguration",
        0x0128: "ResolutionUnit",
        0x0201: "JpegIFOffset",    // When image format is JPEG, this value show offset to JPEG data stored.(aka "ThumbnailOffset" or "JPEGInterchangeFormat")
        0x0202: "JpegIFByteCount", // When image format is JPEG, this value shows data size of JPEG image (aka "ThumbnailLength" or "JPEGInterchangeFormatLength")
        0x0211: "YCbCrCoefficients",
        0x0212: "YCbCrSubSampling",
        0x0213: "YCbCrPositioning",
        0x0214: "ReferenceBlackWhite"
    };

    var StringValues = EXIF.StringValues = {
        ExposureProgram : {
            0 : "Not defined",
            1 : "Manual",
            2 : "Normal program",
            3 : "Aperture priority",
            4 : "Shutter priority",
            5 : "Creative program",
            6 : "Action program",
            7 : "Portrait mode",
            8 : "Landscape mode"
        },
        MeteringMode : {
            0 : "Unknown",
            1 : "Average",
            2 : "CenterWeightedAverage",
            3 : "Spot",
            4 : "MultiSpot",
            5 : "Pattern",
            6 : "Partial",
            255 : "Other"
        },
        LightSource : {
            0 : "Unknown",
            1 : "Daylight",
            2 : "Fluorescent",
            3 : "Tungsten (incandescent light)",
            4 : "Flash",
            9 : "Fine weather",
            10 : "Cloudy weather",
            11 : "Shade",
            12 : "Daylight fluorescent (D 5700 - 7100K)",
            13 : "Day white fluorescent (N 4600 - 5400K)",
            14 : "Cool white fluorescent (W 3900 - 4500K)",
            15 : "White fluorescent (WW 3200 - 3700K)",
            17 : "Standard light A",
            18 : "Standard light B",
            19 : "Standard light C",
            20 : "D55",
            21 : "D65",
            22 : "D75",
            23 : "D50",
            24 : "ISO studio tungsten",
            255 : "Other"
        },
        Flash : {
            0x0000 : "Flash did not fire",
            0x0001 : "Flash fired",
            0x0005 : "Strobe return light not detected",
            0x0007 : "Strobe return light detected",
            0x0009 : "Flash fired, compulsory flash mode",
            0x000D : "Flash fired, compulsory flash mode, return light not detected",
            0x000F : "Flash fired, compulsory flash mode, return light detected",
            0x0010 : "Flash did not fire, compulsory flash mode",
            0x0018 : "Flash did not fire, auto mode",
            0x0019 : "Flash fired, auto mode",
            0x001D : "Flash fired, auto mode, return light not detected",
            0x001F : "Flash fired, auto mode, return light detected",
            0x0020 : "No flash function",
            0x0041 : "Flash fired, red-eye reduction mode",
            0x0045 : "Flash fired, red-eye reduction mode, return light not detected",
            0x0047 : "Flash fired, red-eye reduction mode, return light detected",
            0x0049 : "Flash fired, compulsory flash mode, red-eye reduction mode",
            0x004D : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            0x004F : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            0x0059 : "Flash fired, auto mode, red-eye reduction mode",
            0x005D : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            0x005F : "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod : {
            1 : "Not defined",
            2 : "One-chip color area sensor",
            3 : "Two-chip color area sensor",
            4 : "Three-chip color area sensor",
            5 : "Color sequential area sensor",
            7 : "Trilinear sensor",
            8 : "Color sequential linear sensor"
        },
        SceneCaptureType : {
            0 : "Standard",
            1 : "Landscape",
            2 : "Portrait",
            3 : "Night scene"
        },
        SceneType : {
            1 : "Directly photographed"
        },
        CustomRendered : {
            0 : "Normal process",
            1 : "Custom process"
        },
        WhiteBalance : {
            0 : "Auto white balance",
            1 : "Manual white balance"
        },
        GainControl : {
            0 : "None",
            1 : "Low gain up",
            2 : "High gain up",
            3 : "Low gain down",
            4 : "High gain down"
        },
        Contrast : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        Saturation : {
            0 : "Normal",
            1 : "Low saturation",
            2 : "High saturation"
        },
        Sharpness : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        SubjectDistanceRange : {
            0 : "Unknown",
            1 : "Macro",
            2 : "Close view",
            3 : "Distant view"
        },
        FileSource : {
            3 : "DSC"
        },

        Components : {
            0 : "",
            1 : "Y",
            2 : "Cb",
            3 : "Cr",
            4 : "R",
            5 : "G",
            6 : "B"
        }
    };

    function addEvent(element, event, handler) {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, handler);
        }
    }

    function imageHasData(img) {
        return !!(img.exifdata);
    }


    function base64ToArrayBuffer(base64, contentType) {
        contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        var binary = atob(base64);
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        return buffer;
    }

    function objectURLToBlob(url, callback) {
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.responseType = "blob";
        http.onload = function(e) {
            if (this.status == 200 || this.status === 0) {
                callback(this.response);
            }
        };
        http.send();
    }

    function getImageData(img, callback) {
        function handleBinaryFile(binFile) {
            var data = findEXIFinJPEG(binFile);
            img.exifdata = data || {};
            var iptcdata = findIPTCinJPEG(binFile);
            img.iptcdata = iptcdata || {};
            if (EXIF.isXmpEnabled) {
               var xmpdata= findXMPinJPEG(binFile);
               img.xmpdata = xmpdata || {};               
            }
            if (callback) {
                callback.call(img);
            }
        }

        if (img.src) {
            if (/^data\:/i.test(img.src)) { // Data URI
                var arrayBuffer = base64ToArrayBuffer(img.src);
                handleBinaryFile(arrayBuffer);

            } else if (/^blob\:/i.test(img.src)) { // Object URL
                var fileReader = new FileReader();
                fileReader.onload = function(e) {
                    handleBinaryFile(e.target.result);
                };
                objectURLToBlob(img.src, function (blob) {
                    fileReader.readAsArrayBuffer(blob);
                });
            } else {
                var http = new XMLHttpRequest();
                http.onload = function() {
                    if (this.status == 200 || this.status === 0) {
                        handleBinaryFile(http.response);
                    } else {
                        throw "Could not load image";
                    }
                    http = null;
                };
                http.open("GET", img.src, true);
                http.responseType = "arraybuffer";
                http.send(null);
            }
        } else if (self.FileReader && (img instanceof self.Blob || img instanceof self.File)) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                if (debug) console.log("Got file of length " + e.target.result.byteLength);
                handleBinaryFile(e.target.result);
            };

            fileReader.readAsArrayBuffer(img);
        }
    }

    function findEXIFinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            marker;

        while (offset < length) {
            if (dataView.getUint8(offset) != 0xFF) {
                if (debug) console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
                return false; // not a valid marker, something is wrong
            }

            marker = dataView.getUint8(offset + 1);
            if (debug) console.log(marker);

            // we could implement handling for other markers here,
            // but we're only looking for 0xFFE1 for EXIF data

            if (marker == 225) {
                if (debug) console.log("Found 0xFFE1 marker");

                return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);

                // offset += 2 + file.getShortAt(offset+2, true);

            } else {
                offset += 2 + dataView.getUint16(offset+2);
            }

        }

    }

    function findIPTCinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength;


        var isFieldSegmentStart = function(dataView, offset){
            return (
                dataView.getUint8(offset) === 0x38 &&
                dataView.getUint8(offset+1) === 0x42 &&
                dataView.getUint8(offset+2) === 0x49 &&
                dataView.getUint8(offset+3) === 0x4D &&
                dataView.getUint8(offset+4) === 0x04 &&
                dataView.getUint8(offset+5) === 0x04
            );
        };

        while (offset < length) {

            if ( isFieldSegmentStart(dataView, offset )){

                // Get the length of the name header (which is padded to an even number of bytes)
                var nameHeaderLength = dataView.getUint8(offset+7);
                if(nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
                // Check for pre photoshop 6 format
                if(nameHeaderLength === 0) {
                    // Always 4
                    nameHeaderLength = 4;
                }

                var startOffset = offset + 8 + nameHeaderLength;
                var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);

                return readIPTCData(file, startOffset, sectionLength);

                break;

            }


            // Not the marker, continue searching
            offset++;

        }

    }
    var IptcFieldMap = {
        0x78 : 'caption',
        0x6E : 'credit',
        0x19 : 'keywords',
        0x37 : 'dateCreated',
        0x50 : 'byline',
        0x55 : 'bylineTitle',
        0x7A : 'captionWriter',
        0x69 : 'headline',
        0x74 : 'copyright',
        0x0F : 'category'
    };
    function readIPTCData(file, startOffset, sectionLength){
        var dataView = new DataView(file);
        var data = {};
        var fieldValue, fieldName, dataSize, segmentType, segmentSize;
        var segmentStartPos = startOffset;
        while(segmentStartPos < startOffset+sectionLength) {
            if(dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos+1) === 0x02){
                segmentType = dataView.getUint8(segmentStartPos+2);
                if(segmentType in IptcFieldMap) {
                    dataSize = dataView.getInt16(segmentStartPos+3);
                    segmentSize = dataSize + 5;
                    fieldName = IptcFieldMap[segmentType];
                    fieldValue = getStringFromDB(dataView, segmentStartPos+5, dataSize);
                    // Check if we already stored a value with this name
                    if(data.hasOwnProperty(fieldName)) {
                        // Value already stored with this name, create multivalue field
                        if(data[fieldName] instanceof Array) {
                            data[fieldName].push(fieldValue);
                        }
                        else {
                            data[fieldName] = [data[fieldName], fieldValue];
                        }
                    }
                    else {
                        data[fieldName] = fieldValue;
                    }
                }

            }
            segmentStartPos++;
        }
        return data;
    }



    function readTags(file, tiffStart, dirStart, strings, bigEnd) {
        var entries = file.getUint16(dirStart, !bigEnd),
            tags = {},
            entryOffset, tag,
            i;

        for (i=0;i<entries;i++) {
            entryOffset = dirStart + i*12 + 2;
            tag = strings[file.getUint16(entryOffset, !bigEnd)];
            if (!tag && debug) console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
            tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
        }
        return tags;
    }


    function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
        var type = file.getUint16(entryOffset+2, !bigEnd),
            numValues = file.getUint32(entryOffset+4, !bigEnd),
            valueOffset = file.getUint32(entryOffset+8, !bigEnd) + tiffStart,
            offset,
            vals, val, n,
            numerator, denominator;

        switch (type) {
            case 1: // byte, 8-bit unsigned int
            case 7: // undefined, 8-bit byte, value depending on field
                if (numValues == 1) {
                    return file.getUint8(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint8(offset + n);
                    }
                    return vals;
                }

            case 2: // ascii, 8-bit byte
                offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                return getStringFromDB(file, offset, numValues-1);

            case 3: // short, 16 bit int
                if (numValues == 1) {
                    return file.getUint16(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 2 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint16(offset + 2*n, !bigEnd);
                    }
                    return vals;
                }

            case 4: // long, 32 bit int
                if (numValues == 1) {
                    return file.getUint32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 5:    // rational = two long values, first is numerator, second is denominator
                if (numValues == 1) {
                    numerator = file.getUint32(valueOffset, !bigEnd);
                    denominator = file.getUint32(valueOffset+4, !bigEnd);
                    val = new Number(numerator / denominator);
                    val.numerator = numerator;
                    val.denominator = denominator;
                    return val;
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        numerator = file.getUint32(valueOffset + 8*n, !bigEnd);
                        denominator = file.getUint32(valueOffset+4 + 8*n, !bigEnd);
                        vals[n] = new Number(numerator / denominator);
                        vals[n].numerator = numerator;
                        vals[n].denominator = denominator;
                    }
                    return vals;
                }

            case 9: // slong, 32 bit signed int
                if (numValues == 1) {
                    return file.getInt32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 10: // signed rational, two slongs, first is numerator, second is denominator
                if (numValues == 1) {
                    return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset+4, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 8*n, !bigEnd) / file.getInt32(valueOffset+4 + 8*n, !bigEnd);
                    }
                    return vals;
                }
        }
    }

    /**
    * Given an IFD (Image File Directory) start offset
    * returns an offset to next IFD or 0 if it's the last IFD.
    */
    function getNextIFDOffset(dataView, dirStart, bigEnd){
        //the first 2bytes means the number of directory entries contains in this IFD
        var entries = dataView.getUint16(dirStart, !bigEnd);

        // After last directory entry, there is a 4bytes of data,
        // it means an offset to next IFD.
        // If its value is '0x00000000', it means this is the last IFD and there is no linked IFD.

        return dataView.getUint32(dirStart + 2 + entries * 12, !bigEnd); // each entry is 12 bytes long
    }

    function readThumbnailImage(dataView, tiffStart, firstIFDOffset, bigEnd){
        // get the IFD1 offset
        var IFD1OffsetPointer = getNextIFDOffset(dataView, tiffStart+firstIFDOffset, bigEnd);

        if (!IFD1OffsetPointer) {
            // console.log('******** IFD1Offset is empty, image thumb not found ********');
            return {};
        }
        else if (IFD1OffsetPointer > dataView.byteLength) { // this should not happen
            // console.log('******** IFD1Offset is outside the bounds of the DataView ********');
            return {};
        }
        // console.log('*******  thumbnail IFD offset (IFD1) is: %s', IFD1OffsetPointer);

        var thumbTags = readTags(dataView, tiffStart, tiffStart + IFD1OffsetPointer, IFD1Tags, bigEnd)

        // EXIF 2.3 specification for JPEG format thumbnail

        // If the value of Compression(0x0103) Tag in IFD1 is '6', thumbnail image format is JPEG.
        // Most of Exif image uses JPEG format for thumbnail. In that case, you can get offset of thumbnail
        // by JpegIFOffset(0x0201) Tag in IFD1, size of thumbnail by JpegIFByteCount(0x0202) Tag.
        // Data format is ordinary JPEG format, starts from 0xFFD8 and ends by 0xFFD9. It seems that
        // JPEG format and 160x120pixels of size are recommended thumbnail format for Exif2.1 or later.

        if (thumbTags['Compression']) {
            // console.log('Thumbnail image found!');

            switch (thumbTags['Compression']) {
                case 6:
                    // console.log('Thumbnail image format is JPEG');
                    if (thumbTags.JpegIFOffset && thumbTags.JpegIFByteCount) {
                    // extract the thumbnail
                        var tOffset = tiffStart + thumbTags.JpegIFOffset;
                        var tLength = thumbTags.JpegIFByteCount;
                        thumbTags['blob'] = new Blob([new Uint8Array(dataView.buffer, tOffset, tLength)], {
                            type: 'image/jpeg'
                        });
                    }
                break;

            case 1:
                console.log("Thumbnail image format is TIFF, which is not implemented.");
                break;
            default:
                console.log("Unknown thumbnail image format '%s'", thumbTags['Compression']);
            }
        }
        else if (thumbTags['PhotometricInterpretation'] == 2) {
            console.log("Thumbnail image format is RGB, which is not implemented.");
        }
        return thumbTags;
    }

    function getStringFromDB(buffer, start, length) {
        var outstr = "";
        for (n = start; n < start+length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
        }
        return outstr;
    }

    function readEXIFData(file, start) {
        if (getStringFromDB(file, start, 4) != "Exif") {
            if (debug) console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
            return false;
        }

        var bigEnd,
            tags, tag,
            exifData, gpsData,
            tiffOffset = start + 6;

        // test for TIFF validity and endianness
        if (file.getUint16(tiffOffset) == 0x4949) {
            bigEnd = false;
        } else if (file.getUint16(tiffOffset) == 0x4D4D) {
            bigEnd = true;
        } else {
            if (debug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
            return false;
        }

        if (file.getUint16(tiffOffset+2, !bigEnd) != 0x002A) {
            if (debug) console.log("Not valid TIFF data! (no 0x002A)");
            return false;
        }

        var firstIFDOffset = file.getUint32(tiffOffset+4, !bigEnd);

        if (firstIFDOffset < 0x00000008) {
            if (debug) console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset+4, !bigEnd));
            return false;
        }

        tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);

        if (tags.ExifIFDPointer) {
            exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
            for (tag in exifData) {
                switch (tag) {
                    case "LightSource" :
                    case "Flash" :
                    case "MeteringMode" :
                    case "ExposureProgram" :
                    case "SensingMethod" :
                    case "SceneCaptureType" :
                    case "SceneType" :
                    case "CustomRendered" :
                    case "WhiteBalance" :
                    case "GainControl" :
                    case "Contrast" :
                    case "Saturation" :
                    case "Sharpness" :
                    case "SubjectDistanceRange" :
                    case "FileSource" :
                        exifData[tag] = StringValues[tag][exifData[tag]];
                        break;

                    case "ExifVersion" :
                    case "FlashpixVersion" :
                        exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
                        break;

                    case "ComponentsConfiguration" :
                        exifData[tag] =
                            StringValues.Components[exifData[tag][0]] +
                            StringValues.Components[exifData[tag][1]] +
                            StringValues.Components[exifData[tag][2]] +
                            StringValues.Components[exifData[tag][3]];
                        break;
                }
                tags[tag] = exifData[tag];
            }
        }

        if (tags.GPSInfoIFDPointer) {
            gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
            for (tag in gpsData) {
                switch (tag) {
                    case "GPSVersionID" :
                        gpsData[tag] = gpsData[tag][0] +
                            "." + gpsData[tag][1] +
                            "." + gpsData[tag][2] +
                            "." + gpsData[tag][3];
                        break;
                }
                tags[tag] = gpsData[tag];
            }
        }

        // extract thumbnail
        tags['thumbnail'] = readThumbnailImage(file, tiffOffset, firstIFDOffset, bigEnd);

        return tags;
    }

   function findXMPinJPEG(file) {

        if (!('DOMParser' in self)) {
            // console.warn('XML parsing not supported without DOMParser');
            return;
        }
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
           if (debug) console.log("Not a valid JPEG");
           return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            dom = new DOMParser();

        while (offset < (length-4)) {
            if (getStringFromDB(dataView, offset, 4) == "http") {
                var startOffset = offset - 1;
                var sectionLength = dataView.getUint16(offset - 2) - 1;
                var xmpString = getStringFromDB(dataView, startOffset, sectionLength)
                var xmpEndIndex = xmpString.indexOf('xmpmeta>') + 8;
                xmpString = xmpString.substring( xmpString.indexOf( '<x:xmpmeta' ), xmpEndIndex );

                var indexOfXmp = xmpString.indexOf('x:xmpmeta') + 10
                //Many custom written programs embed xmp/xml without any namespace. Following are some of them.
                //Without these namespaces, XML is thought to be invalid by parsers
                xmpString = xmpString.slice(0, indexOfXmp)
                            + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" '
                            + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
                            + 'xmlns:tiff="http://ns.adobe.com/tiff/1.0/" '
                            + 'xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" '
                            + 'xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" '
                            + 'xmlns:exif="http://ns.adobe.com/exif/1.0/" '
                            + 'xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" '
                            + 'xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" '
                            + 'xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" '
                            + 'xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" '
                            + 'xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" '
                            + xmpString.slice(indexOfXmp)

                var domDocument = dom.parseFromString( xmpString, 'text/xml' );
                return xml2Object(domDocument);
            } else{
             offset++;
            }
        }
    }

    function xml2json(xml) {
        var json = {};
      
        if (xml.nodeType == 1) { // element node
          if (xml.attributes.length > 0) {
            json['@attributes'] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
              var attribute = xml.attributes.item(j);
              json['@attributes'][attribute.nodeName] = attribute.nodeValue;
            }
          }
        } else if (xml.nodeType == 3) { // text node
          return xml.nodeValue;
        }
      
        // deal with children
        if (xml.hasChildNodes()) {
          for(var i = 0; i < xml.childNodes.length; i++) {
            var child = xml.childNodes.item(i);
            var nodeName = child.nodeName;
            if (json[nodeName] == null) {
              json[nodeName] = xml2json(child);
            } else {
              if (json[nodeName].push == null) {
                var old = json[nodeName];
                json[nodeName] = [];
                json[nodeName].push(old);
              }
              json[nodeName].push(xml2json(child));
            }
          }
        }
        
        return json;
    }

    function xml2Object(xml) {
        try {
            var obj = {};
            if (xml.children.length > 0) {
              for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children.item(i);
                var attributes = item.attributes;
                for(var idx in attributes) {
                    var itemAtt = attributes[idx];
                    var dataKey = itemAtt.nodeName;
                    var dataValue = itemAtt.nodeValue;

                    if(dataKey !== undefined) {
                        obj[dataKey] = dataValue;
                    }
                }
                var nodeName = item.nodeName;

                if (typeof (obj[nodeName]) == "undefined") {
                  obj[nodeName] = xml2json(item);
                } else {
                  if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];

                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                  }
                  obj[nodeName].push(xml2json(item));
                }
              }
            } else {
              obj = xml.textContent;
            }
            return obj;
          } catch (e) {
              console.log(e.message);
          }
    }

    EXIF.enableXmp = function() {
        EXIF.isXmpEnabled = true;
    }

    EXIF.disableXmp = function() {
        EXIF.isXmpEnabled = false;
    }

    EXIF.getData = function(img, callback) {
        if (((self.Image && img instanceof self.Image)
            || (self.HTMLImageElement && img instanceof self.HTMLImageElement))
            && !img.complete)
            return false;

        if (!imageHasData(img)) {
            getImageData(img, callback);
        } else {
            if (callback) {
                callback.call(img);
            }
        }
        return true;
    }

    EXIF.getTag = function(img, tag) {
        if (!imageHasData(img)) return;
        return img.exifdata[tag];
    }
    
    EXIF.getIptcTag = function(img, tag) {
        if (!imageHasData(img)) return;
        return img.iptcdata[tag];
    }

    EXIF.getAllTags = function(img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.exifdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }
    
    EXIF.getAllIptcTags = function(img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.iptcdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }

    EXIF.pretty = function(img) {
        if (!imageHasData(img)) return "";
        var a,
            data = img.exifdata,
            strPretty = "";
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                if (typeof data[a] == "object") {
                    if (data[a] instanceof Number) {
                        strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
                    } else {
                        strPretty += a + " : [" + data[a].length + " values]\r\n";
                    }
                } else {
                    strPretty += a + " : " + data[a] + "\r\n";
                }
            }
        }
        return strPretty;
    }

    EXIF.readFromBinaryFile = function(file) {
        return findEXIFinJPEG(file);
    }

    if (typeof define === 'function' && define.amd) {
        define('exif-js', [], function() {
            return EXIF;
        });
    }
}.call(this));


},{}],"node_modules/croppie/croppie.js":[function(require,module,exports) {
var define;
/*************************
 * Croppie
 * Copyright 2019
 * Foliotek
 * Version: 2.6.5
 *************************/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        module.exports = factory();
    } else {
        // Browser globals
        root.Croppie = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    /* Polyfills */
    if (typeof Promise !== 'function') {
        /*! promise-polyfill 3.1.0 */
        !function(a){function b(a,b){return function(){a.apply(b,arguments)}}function c(a){if("object"!==typeof this)throw new TypeError("Promises must be constructed via new");if("function"!==typeof a)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],i(a,b(e,this),b(f,this))}function d(a){var b=this;return null===this._state?void this._deferreds.push(a):void k(function(){var c=b._state?a.onFulfilled:a.onRejected;if(null===c)return void(b._state?a.resolve:a.reject)(b._value);var d;try{d=c(b._value)}catch(e){return void a.reject(e)}a.resolve(d)})}function e(a){try{if(a===this)throw new TypeError("A promise cannot be resolved with itself.");if(a&&("object"===typeof a||"function"===typeof a)){var c=a.then;if("function"===typeof c)return void i(b(c,a),b(e,this),b(f,this))}this._state=!0,this._value=a,g.call(this)}catch(d){f.call(this,d)}}function f(a){this._state=!1,this._value=a,g.call(this)}function g(){for(var a=0,b=this._deferreds.length;b>a;a++)d.call(this,this._deferreds[a]);this._deferreds=null}function h(a,b,c,d){this.onFulfilled="function"===typeof a?a:null,this.onRejected="function"===typeof b?b:null,this.resolve=c,this.reject=d}function i(a,b,c){var d=!1;try{a(function(a){d||(d=!0,b(a))},function(a){d||(d=!0,c(a))})}catch(e){if(d)return;d=!0,c(e)}}var j=setTimeout,k="function"===typeof setImmediate&&setImmediate||function(a){j(a,1)},l=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)};c.prototype["catch"]=function(a){return this.then(null,a)},c.prototype.then=function(a,b){var e=this;return new c(function(c,f){d.call(e,new h(a,b,c,f))})},c.all=function(){var a=Array.prototype.slice.call(1===arguments.length&&l(arguments[0])?arguments[0]:arguments);return new c(function(b,c){function d(f,g){try{if(g&&("object"===typeof g||"function"===typeof g)){var h=g.then;if("function"===typeof h)return void h.call(g,function(a){d(f,a)},c)}a[f]=g,0===--e&&b(a)}catch(i){c(i)}}if(0===a.length)return b([]);for(var e=a.length,f=0;f<a.length;f++)d(f,a[f])})},c.resolve=function(a){return a&&"object"===typeof a&&a.constructor===c?a:new c(function(b){b(a)})},c.reject=function(a){return new c(function(b,c){c(a)})},c.race=function(a){return new c(function(b,c){for(var d=0,e=a.length;e>d;d++)a[d].then(b,c)})},c._setImmediateFn=function(a){k=a},"undefined"!==typeof module&&module.exports?module.exports=c:a.Promise||(a.Promise=c)}(this);
    }

    if (typeof window !== 'undefined' && typeof window.CustomEvent !== "function") {
        (function(){
            function CustomEvent ( event, params ) {
                params = params || { bubbles: false, cancelable: false, detail: undefined };
                var evt = document.createEvent( 'CustomEvent' );
                evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
                return evt;
            }
            CustomEvent.prototype = window.Event.prototype;
            window.CustomEvent = CustomEvent;
        }());
    }

    if (typeof HTMLCanvasElement !== 'undefined' && !HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function (callback, type, quality) {
                var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
                len = binStr.length,
                arr = new Uint8Array(len);

                for (var i=0; i<len; i++ ) {
                    arr[i] = binStr.charCodeAt(i);
                }

                callback( new Blob( [arr], {type: type || 'image/png'} ) );
            }
        });
    }
    /* End Polyfills */

    var cssPrefixes = ['Webkit', 'Moz', 'ms'],
        emptyStyles = typeof document !== 'undefined' ? document.createElement('div').style : {},
        EXIF_NORM = [1,8,3,6],
        EXIF_FLIP = [2,7,4,5],
        CSS_TRANS_ORG,
        CSS_TRANSFORM,
        CSS_USERSELECT;

    function vendorPrefix(prop) {
        if (prop in emptyStyles) {
            return prop;
        }

        var capProp = prop[0].toUpperCase() + prop.slice(1),
            i = cssPrefixes.length;

        while (i--) {
            prop = cssPrefixes[i] + capProp;
            if (prop in emptyStyles) {
                return prop;
            }
        }
    }

    CSS_TRANSFORM = vendorPrefix('transform');
    CSS_TRANS_ORG = vendorPrefix('transformOrigin');
    CSS_USERSELECT = vendorPrefix('userSelect');

    function getExifOffset(ornt, rotate) {
        var arr = EXIF_NORM.indexOf(ornt) > -1 ? EXIF_NORM : EXIF_FLIP,
            index = arr.indexOf(ornt),
            offset = (rotate / 90) % arr.length;// 180 = 2%4 = 2 shift exif by 2 indexes

        return arr[(arr.length + index + (offset % arr.length)) % arr.length];
    }

    // Credits to : Andrew Dupont - http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
    function deepExtend(destination, source) {
        destination = destination || {};
        for (var property in source) {
            if (source[property] && source[property].constructor && source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                deepExtend(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    }

    function clone(object) {
        return deepExtend({}, object);
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function dispatchChange(element) {
        if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            element.dispatchEvent(evt);
        }
        else {
            element.fireEvent("onchange");
        }
    }

    //http://jsperf.com/vanilla-css
    function css(el, styles, val) {
        if (typeof (styles) === 'string') {
            var tmp = styles;
            styles = {};
            styles[tmp] = val;
        }

        for (var prop in styles) {
            el.style[prop] = styles[prop];
        }
    }

    function addClass(el, c) {
        if (el.classList) {
            el.classList.add(c);
        }
        else {
            el.className += ' ' + c;
        }
    }

    function removeClass(el, c) {
        if (el.classList) {
            el.classList.remove(c);
        }
        else {
            el.className = el.className.replace(c, '');
        }
    }

    function setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    function num(v) {
        return parseInt(v, 10);
    }

    /* Utilities */
    function loadImage(src, doExif) {
        if (!src) { throw 'Source image missing'; }
        
        var img = new Image();
        img.style.opacity = '0';
        return new Promise(function (resolve, reject) {
            function _resolve() {
                img.style.opacity = '1';
                setTimeout(function () {
                    resolve(img);
                }, 1);
            }

            img.removeAttribute('crossOrigin');
            if (src.match(/^https?:\/\/|^\/\//)) {
                img.setAttribute('crossOrigin', 'anonymous');
            }

            img.onload = function () {
                if (doExif) {
                    EXIF.getData(img, function () {
                        _resolve();
                    });
                }
                else {
                    _resolve();
                }
            };
            img.onerror = function (ev) {
                img.style.opacity = 1;
                setTimeout(function () {
                    reject(ev);
                }, 1);
            };
            img.src = src;
        });
    }

    function naturalImageDimensions(img, ornt) {
        var w = img.naturalWidth;
        var h = img.naturalHeight;
        var orient = ornt || getExifOrientation(img);
        if (orient && orient >= 5) {
            var x= w;
            w = h;
            h = x;
        }
        return { width: w, height: h };
    }

    /* CSS Transform Prototype */
    var TRANSLATE_OPTS = {
        'translate3d': {
            suffix: ', 0px'
        },
        'translate': {
            suffix: ''
        }
    };
    var Transform = function (x, y, scale) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.scale = parseFloat(scale);
    };

    Transform.parse = function (v) {
        if (v.style) {
            return Transform.parse(v.style[CSS_TRANSFORM]);
        }
        else if (v.indexOf('matrix') > -1 || v.indexOf('none') > -1) {
            return Transform.fromMatrix(v);
        }
        else {
            return Transform.fromString(v);
        }
    };

    Transform.fromMatrix = function (v) {
        var vals = v.substring(7).split(',');
        if (!vals.length || v === 'none') {
            vals = [1, 0, 0, 1, 0, 0];
        }

        return new Transform(num(vals[4]), num(vals[5]), parseFloat(vals[0]));
    };

    Transform.fromString = function (v) {
        var values = v.split(') '),
            translate = values[0].substring(Croppie.globals.translate.length + 1).split(','),
            scale = values.length > 1 ? values[1].substring(6) : 1,
            x = translate.length > 1 ? translate[0] : 0,
            y = translate.length > 1 ? translate[1] : 0;

        return new Transform(x, y, scale);
    };

    Transform.prototype.toString = function () {
        var suffix = TRANSLATE_OPTS[Croppie.globals.translate].suffix || '';
        return Croppie.globals.translate + '(' + this.x + 'px, ' + this.y + 'px' + suffix + ') scale(' + this.scale + ')';
    };

    var TransformOrigin = function (el) {
        if (!el || !el.style[CSS_TRANS_ORG]) {
            this.x = 0;
            this.y = 0;
            return;
        }
        var css = el.style[CSS_TRANS_ORG].split(' ');
        this.x = parseFloat(css[0]);
        this.y = parseFloat(css[1]);
    };

    TransformOrigin.prototype.toString = function () {
        return this.x + 'px ' + this.y + 'px';
    };

    function getExifOrientation (img) {
        return img.exifdata && img.exifdata.Orientation ? num(img.exifdata.Orientation) : 1;
    }

    function drawCanvas(canvas, img, orientation) {
        var width = img.width,
            height = img.height,
            ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.save();
        switch (orientation) {
          case 2:
             ctx.translate(width, 0);
             ctx.scale(-1, 1);
             break;

          case 3:
              ctx.translate(width, height);
              ctx.rotate(180*Math.PI/180);
              break;

          case 4:
              ctx.translate(0, height);
              ctx.scale(1, -1);
              break;

          case 5:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(90*Math.PI/180);
              ctx.scale(1, -1);
              break;

          case 6:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(90*Math.PI/180);
              ctx.translate(0, -height);
              break;

          case 7:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(-90*Math.PI/180);
              ctx.translate(-width, height);
              ctx.scale(1, -1);
              break;

          case 8:
              canvas.width = height;
              canvas.height = width;
              ctx.translate(0, width);
              ctx.rotate(-90*Math.PI/180);
              break;
        }
        ctx.drawImage(img, 0,0, width, height);
        ctx.restore();
    }

    /* Private Methods */
    function _create() {
        var self = this,
            contClass = 'croppie-container',
            customViewportClass = self.options.viewport.type ? 'cr-vp-' + self.options.viewport.type : null,
            boundary, img, viewport, overlay, bw, bh;

        self.options.useCanvas = self.options.enableOrientation || _hasExif.call(self);
        // Properties on class
        self.data = {};
        self.elements = {};

        boundary = self.elements.boundary = document.createElement('div');
        viewport = self.elements.viewport = document.createElement('div');
        img = self.elements.img = document.createElement('img');
        overlay = self.elements.overlay = document.createElement('div');

        if (self.options.useCanvas) {
            self.elements.canvas = document.createElement('canvas');
            self.elements.preview = self.elements.canvas;
        }
        else {
            self.elements.preview = img;
        }

        addClass(boundary, 'cr-boundary');
        boundary.setAttribute('aria-dropeffect', 'none');
        bw = self.options.boundary.width;
        bh = self.options.boundary.height;
        css(boundary, {
            width: (bw + (isNaN(bw) ? '' : 'px')),
            height: (bh + (isNaN(bh) ? '' : 'px'))
        });

        addClass(viewport, 'cr-viewport');
        if (customViewportClass) {
            addClass(viewport, customViewportClass);
        }
        css(viewport, {
            width: self.options.viewport.width + 'px',
            height: self.options.viewport.height + 'px'
        });
        viewport.setAttribute('tabindex', 0);

        addClass(self.elements.preview, 'cr-image');
        setAttributes(self.elements.preview, { 'alt': 'preview', 'aria-grabbed': 'false' });
        addClass(overlay, 'cr-overlay');

        self.element.appendChild(boundary);
        boundary.appendChild(self.elements.preview);
        boundary.appendChild(viewport);
        boundary.appendChild(overlay);

        addClass(self.element, contClass);
        if (self.options.customClass) {
            addClass(self.element, self.options.customClass);
        }

        _initDraggable.call(this);

        if (self.options.enableZoom) {
            _initializeZoom.call(self);
        }

        // if (self.options.enableOrientation) {
        //     _initRotationControls.call(self);
        // }

        if (self.options.enableResize) {
            _initializeResize.call(self);
        }
    }

    // function _initRotationControls () {
    //     var self = this,
    //         wrap, btnLeft, btnRight, iLeft, iRight;

    //     wrap = document.createElement('div');
    //     self.elements.orientationBtnLeft = btnLeft = document.createElement('button');
    //     self.elements.orientationBtnRight = btnRight = document.createElement('button');

    //     wrap.appendChild(btnLeft);
    //     wrap.appendChild(btnRight);

    //     iLeft = document.createElement('i');
    //     iRight = document.createElement('i');
    //     btnLeft.appendChild(iLeft);
    //     btnRight.appendChild(iRight);

    //     addClass(wrap, 'cr-rotate-controls');
    //     addClass(btnLeft, 'cr-rotate-l');
    //     addClass(btnRight, 'cr-rotate-r');

    //     self.elements.boundary.appendChild(wrap);

    //     btnLeft.addEventListener('click', function () {
    //         self.rotate(-90);
    //     });
    //     btnRight.addEventListener('click', function () {
    //         self.rotate(90);
    //     });
    // }

    function _hasExif() {
        return this.options.enableExif && window.EXIF;
    }

    function _initializeResize () {
        var self = this;
        var wrap = document.createElement('div');
        var isDragging = false;
        var direction;
        var originalX;
        var originalY;
        var minSize = 50;
        var maxWidth;
        var maxHeight;
        var vr;
        var hr;

        addClass(wrap, 'cr-resizer');
        css(wrap, {
            width: this.options.viewport.width + 'px',
            height: this.options.viewport.height + 'px'
        });

        if (this.options.resizeControls.height) {
            vr = document.createElement('div');
            addClass(vr, 'cr-resizer-vertical');
            wrap.appendChild(vr);
        }

        if (this.options.resizeControls.width) {
            hr = document.createElement('div');
            addClass(hr, 'cr-resizer-horisontal');
            wrap.appendChild(hr);
        }

        function mouseDown(ev) {
            if (ev.button !== undefined && ev.button !== 0) return;

            ev.preventDefault();
            if (isDragging) {
                return;
            }

            var overlayRect = self.elements.overlay.getBoundingClientRect();

            isDragging = true;
            originalX = ev.pageX;
            originalY = ev.pageY;
            direction = ev.currentTarget.className.indexOf('vertical') !== -1 ? 'v' : 'h';
            maxWidth = overlayRect.width;
            maxHeight = overlayRect.height;

            if (ev.touches) {
                var touches = ev.touches[0];
                originalX = touches.pageX;
                originalY = touches.pageY;
            }

            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('touchmove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
            window.addEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = 'none';
        }

        function mouseMove(ev) {
            var pageX = ev.pageX;
            var pageY = ev.pageY;

            ev.preventDefault();

            if (ev.touches) {
                var touches = ev.touches[0];
                pageX = touches.pageX;
                pageY = touches.pageY;
            }

            var deltaX = pageX - originalX;
            var deltaY = pageY - originalY;
            var newHeight = self.options.viewport.height + deltaY;
            var newWidth = self.options.viewport.width + deltaX;

            if (direction === 'v' && newHeight >= minSize && newHeight <= maxHeight) {
                css(wrap, {
                    height: newHeight + 'px'
                });

                self.options.boundary.height += deltaY;
                css(self.elements.boundary, {
                    height: self.options.boundary.height + 'px'
                });

                self.options.viewport.height += deltaY;
                css(self.elements.viewport, {
                    height: self.options.viewport.height + 'px'
                });
            }
            else if (direction === 'h' && newWidth >= minSize && newWidth <= maxWidth) {
                css(wrap, {
                    width: newWidth + 'px'
                });

                self.options.boundary.width += deltaX;
                css(self.elements.boundary, {
                    width: self.options.boundary.width + 'px'
                });

                self.options.viewport.width += deltaX;
                css(self.elements.viewport, {
                    width: self.options.viewport.width + 'px'
                });
            }

            _updateOverlay.call(self);
            _updateZoomLimits.call(self);
            _updateCenterPoint.call(self);
            _triggerUpdate.call(self);
            originalY = pageY;
            originalX = pageX;
        }

        function mouseUp() {
            isDragging = false;
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('touchmove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
            window.removeEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = '';
        }

        if (vr) {
            vr.addEventListener('mousedown', mouseDown);
            vr.addEventListener('touchstart', mouseDown);
        }

        if (hr) {
            hr.addEventListener('mousedown', mouseDown);
            hr.addEventListener('touchstart', mouseDown);
        }

        this.elements.boundary.appendChild(wrap);
    }

    function _setZoomerVal(v) {
        if (this.options.enableZoom) {
            var z = this.elements.zoomer,
                val = fix(v, 4);

            z.value = Math.max(parseFloat(z.min), Math.min(parseFloat(z.max), val)).toString();
        }
    }

    function _initializeZoom() {
        var self = this,
            wrap = self.elements.zoomerWrap = document.createElement('div'),
            zoomer = self.elements.zoomer = document.createElement('input');

        addClass(wrap, 'cr-slider-wrap');
        addClass(zoomer, 'cr-slider');
        zoomer.type = 'range';
        zoomer.step = '0.0001';
        zoomer.value = '1';
        zoomer.style.display = self.options.showZoomer ? '' : 'none';
        zoomer.setAttribute('aria-label', 'zoom');

        self.element.appendChild(wrap);
        wrap.appendChild(zoomer);

        self._currentZoom = 1;

        function change() {
            _onZoom.call(self, {
                value: parseFloat(zoomer.value),
                origin: new TransformOrigin(self.elements.preview),
                viewportRect: self.elements.viewport.getBoundingClientRect(),
                transform: Transform.parse(self.elements.preview)
            });
        }

        function scroll(ev) {
            var delta, targetZoom;

            if(self.options.mouseWheelZoom === 'ctrl' && ev.ctrlKey !== true){
              return 0;
            } else if (ev.wheelDelta) {
                delta = ev.wheelDelta / 1200; //wheelDelta min: -120 max: 120 // max x 10 x 2
            } else if (ev.deltaY) {
                delta = ev.deltaY / 1060; //deltaY min: -53 max: 53 // max x 10 x 2
            } else if (ev.detail) {
                delta = ev.detail / -60; //delta min: -3 max: 3 // max x 10 x 2
            } else {
                delta = 0;
            }

            targetZoom = self._currentZoom + (delta * self._currentZoom);

            ev.preventDefault();
            _setZoomerVal.call(self, targetZoom);
            change.call(self);
        }

        self.elements.zoomer.addEventListener('input', change);// this is being fired twice on keypress
        self.elements.zoomer.addEventListener('change', change);

        if (self.options.mouseWheelZoom) {
            self.elements.boundary.addEventListener('mousewheel', scroll);
            self.elements.boundary.addEventListener('DOMMouseScroll', scroll);
        }
    }

    function _onZoom(ui) {
        var self = this,
            transform = ui ? ui.transform : Transform.parse(self.elements.preview),
            vpRect = ui ? ui.viewportRect : self.elements.viewport.getBoundingClientRect(),
            origin = ui ? ui.origin : new TransformOrigin(self.elements.preview);

        function applyCss() {
            var transCss = {};
            transCss[CSS_TRANSFORM] = transform.toString();
            transCss[CSS_TRANS_ORG] = origin.toString();
            css(self.elements.preview, transCss);
        }

        self._currentZoom = ui ? ui.value : self._currentZoom;
        transform.scale = self._currentZoom;
        self.elements.zoomer.setAttribute('aria-valuenow', self._currentZoom);
        applyCss();

        if (self.options.enforceBoundary) {
            var boundaries = _getVirtualBoundaries.call(self, vpRect),
                transBoundaries = boundaries.translate,
                oBoundaries = boundaries.origin;

            if (transform.x >= transBoundaries.maxX) {
                origin.x = oBoundaries.minX;
                transform.x = transBoundaries.maxX;
            }

            if (transform.x <= transBoundaries.minX) {
                origin.x = oBoundaries.maxX;
                transform.x = transBoundaries.minX;
            }

            if (transform.y >= transBoundaries.maxY) {
                origin.y = oBoundaries.minY;
                transform.y = transBoundaries.maxY;
            }

            if (transform.y <= transBoundaries.minY) {
                origin.y = oBoundaries.maxY;
                transform.y = transBoundaries.minY;
            }
        }
        applyCss();
        _debouncedOverlay.call(self);
        _triggerUpdate.call(self);
    }

    function _getVirtualBoundaries(viewport) {
        var self = this,
            scale = self._currentZoom,
            vpWidth = viewport.width,
            vpHeight = viewport.height,
            centerFromBoundaryX = self.elements.boundary.clientWidth / 2,
            centerFromBoundaryY = self.elements.boundary.clientHeight / 2,
            imgRect = self.elements.preview.getBoundingClientRect(),
            curImgWidth = imgRect.width,
            curImgHeight = imgRect.height,
            halfWidth = vpWidth / 2,
            halfHeight = vpHeight / 2;

        var maxX = ((halfWidth / scale) - centerFromBoundaryX) * -1;
        var minX = maxX - ((curImgWidth * (1 / scale)) - (vpWidth * (1 / scale)));

        var maxY = ((halfHeight / scale) - centerFromBoundaryY) * -1;
        var minY = maxY - ((curImgHeight * (1 / scale)) - (vpHeight * (1 / scale)));

        var originMinX = (1 / scale) * halfWidth;
        var originMaxX = (curImgWidth * (1 / scale)) - originMinX;

        var originMinY = (1 / scale) * halfHeight;
        var originMaxY = (curImgHeight * (1 / scale)) - originMinY;

        return {
            translate: {
                maxX: maxX,
                minX: minX,
                maxY: maxY,
                minY: minY
            },
            origin: {
                maxX: originMaxX,
                minX: originMinX,
                maxY: originMaxY,
                minY: originMinY
            }
        };
    }

    function _updateCenterPoint(rotate) {
        var self = this,
            scale = self._currentZoom,
            data = self.elements.preview.getBoundingClientRect(),
            vpData = self.elements.viewport.getBoundingClientRect(),
            transform = Transform.parse(self.elements.preview.style[CSS_TRANSFORM]),
            pc = new TransformOrigin(self.elements.preview),
            top = (vpData.top - data.top) + (vpData.height / 2),
            left = (vpData.left - data.left) + (vpData.width / 2),
            center = {},
            adj = {};

        if (rotate) {
            var cx = pc.x;
            var cy = pc.y;
            var tx = transform.x;
            var ty = transform.y;

            center.y = cx;
            center.x = cy;
            transform.y = tx;
            transform.x = ty;
        }
        else {
            center.y = top / scale;
            center.x = left / scale;

            adj.y = (center.y - pc.y) * (1 - scale);
            adj.x = (center.x - pc.x) * (1 - scale);

            transform.x -= adj.x;
            transform.y -= adj.y;
        }

        var newCss = {};
        newCss[CSS_TRANS_ORG] = center.x + 'px ' + center.y + 'px';
        newCss[CSS_TRANSFORM] = transform.toString();
        css(self.elements.preview, newCss);
    }

    function _initDraggable() {
        var self = this,
            isDragging = false,
            originalX,
            originalY,
            originalDistance,
            vpRect,
            transform;

        function assignTransformCoordinates(deltaX, deltaY) {
            var imgRect = self.elements.preview.getBoundingClientRect(),
                top = transform.y + deltaY,
                left = transform.x + deltaX;

            if (self.options.enforceBoundary) {
                if (vpRect.top > imgRect.top + deltaY && vpRect.bottom < imgRect.bottom + deltaY) {
                    transform.y = top;
                }

                if (vpRect.left > imgRect.left + deltaX && vpRect.right < imgRect.right + deltaX) {
                    transform.x = left;
                }
            }
            else {
                transform.y = top;
                transform.x = left;
            }
        }

        function toggleGrabState(isDragging) {
          self.elements.preview.setAttribute('aria-grabbed', isDragging);
          self.elements.boundary.setAttribute('aria-dropeffect', isDragging? 'move': 'none');
        }

        function keyDown(ev) {
            var LEFT_ARROW  = 37,
                UP_ARROW    = 38,
                RIGHT_ARROW = 39,
                DOWN_ARROW  = 40;

            if (ev.shiftKey && (ev.keyCode === UP_ARROW || ev.keyCode === DOWN_ARROW)) {
                var zoom;
                if (ev.keyCode === UP_ARROW) {
                    zoom = parseFloat(self.elements.zoomer.value) + parseFloat(self.elements.zoomer.step)
                }
                else {
                    zoom = parseFloat(self.elements.zoomer.value) - parseFloat(self.elements.zoomer.step)
                }
                self.setZoom(zoom);
            }
            else if (self.options.enableKeyMovement && (ev.keyCode >= 37 && ev.keyCode <= 40)) {
                ev.preventDefault();
                var movement = parseKeyDown(ev.keyCode);

                transform = Transform.parse(self.elements.preview);
                document.body.style[CSS_USERSELECT] = 'none';
                vpRect = self.elements.viewport.getBoundingClientRect();
                keyMove(movement);
            }

            function parseKeyDown(key) {
                switch (key) {
                    case LEFT_ARROW:
                        return [1, 0];
                    case UP_ARROW:
                        return [0, 1];
                    case RIGHT_ARROW:
                        return [-1, 0];
                    case DOWN_ARROW:
                        return [0, -1];
                }
            }
        }

        function keyMove(movement) {
            var deltaX = movement[0],
                deltaY = movement[1],
                newCss = {};

            assignTransformCoordinates(deltaX, deltaY);

            newCss[CSS_TRANSFORM] = transform.toString();
            css(self.elements.preview, newCss);
            _updateOverlay.call(self);
            document.body.style[CSS_USERSELECT] = '';
            _updateCenterPoint.call(self);
            _triggerUpdate.call(self);
            originalDistance = 0;
        }

        function mouseDown(ev) {
            if (ev.button !== undefined && ev.button !== 0) return;

            ev.preventDefault();
            if (isDragging) return;
            isDragging = true;
            originalX = ev.pageX;
            originalY = ev.pageY;

            if (ev.touches) {
                var touches = ev.touches[0];
                originalX = touches.pageX;
                originalY = touches.pageY;
            }
            toggleGrabState(isDragging);
            transform = Transform.parse(self.elements.preview);
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('touchmove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
            window.addEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = 'none';
            vpRect = self.elements.viewport.getBoundingClientRect();
        }

        function mouseMove(ev) {
            ev.preventDefault();
            var pageX = ev.pageX,
                pageY = ev.pageY;

            if (ev.touches) {
                var touches = ev.touches[0];
                pageX = touches.pageX;
                pageY = touches.pageY;
            }

            var deltaX = pageX - originalX,
                deltaY = pageY - originalY,
                newCss = {};

            if (ev.type === 'touchmove') {
                if (ev.touches.length > 1) {
                    var touch1 = ev.touches[0];
                    var touch2 = ev.touches[1];
                    var dist = Math.sqrt((touch1.pageX - touch2.pageX) * (touch1.pageX - touch2.pageX) + (touch1.pageY - touch2.pageY) * (touch1.pageY - touch2.pageY));

                    if (!originalDistance) {
                        originalDistance = dist / self._currentZoom;
                    }

                    var scale = dist / originalDistance;

                    _setZoomerVal.call(self, scale);
                    dispatchChange(self.elements.zoomer);
                    return;
                }
            }

            assignTransformCoordinates(deltaX, deltaY);

            newCss[CSS_TRANSFORM] = transform.toString();
            css(self.elements.preview, newCss);
            _updateOverlay.call(self);
            originalY = pageY;
            originalX = pageX;
        }

        function mouseUp() {
            isDragging = false;
            toggleGrabState(isDragging);
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('touchmove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
            window.removeEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = '';
            _updateCenterPoint.call(self);
            _triggerUpdate.call(self);
            originalDistance = 0;
        }

        self.elements.overlay.addEventListener('mousedown', mouseDown);
        self.elements.viewport.addEventListener('keydown', keyDown);
        self.elements.overlay.addEventListener('touchstart', mouseDown);
    }

    function _updateOverlay() {
        if (!this.elements) return; // since this is debounced, it can be fired after destroy
        var self = this,
            boundRect = self.elements.boundary.getBoundingClientRect(),
            imgData = self.elements.preview.getBoundingClientRect();

        css(self.elements.overlay, {
            width: imgData.width + 'px',
            height: imgData.height + 'px',
            top: (imgData.top - boundRect.top) + 'px',
            left: (imgData.left - boundRect.left) + 'px'
        });
    }
    var _debouncedOverlay = debounce(_updateOverlay, 500);

    function _triggerUpdate() {
        var self = this,
            data = self.get();

        if (!_isVisible.call(self)) {
            return;
        }

        self.options.update.call(self, data);
        if (self.$ && typeof Prototype === 'undefined') {
            self.$(self.element).trigger('update.croppie', data);
        }
        else {
            var ev;
            if (window.CustomEvent) {
                ev = new CustomEvent('update', { detail: data });
            } else {
                ev = document.createEvent('CustomEvent');
                ev.initCustomEvent('update', true, true, data);
            }

            self.element.dispatchEvent(ev);
        }
    }

    function _isVisible() {
        return this.elements.preview.offsetHeight > 0 && this.elements.preview.offsetWidth > 0;
    }

    function _updatePropertiesFromImage() {
        var self = this,
            initialZoom = 1,
            cssReset = {},
            img = self.elements.preview,
            imgData,
            transformReset = new Transform(0, 0, initialZoom),
            originReset = new TransformOrigin(),
            isVisible = _isVisible.call(self);

        if (!isVisible || self.data.bound) {// if the croppie isn't visible or it doesn't need binding
            return;
        }

        self.data.bound = true;
        cssReset[CSS_TRANSFORM] = transformReset.toString();
        cssReset[CSS_TRANS_ORG] = originReset.toString();
        cssReset['opacity'] = 1;
        css(img, cssReset);

        imgData = self.elements.preview.getBoundingClientRect();

        self._originalImageWidth = imgData.width;
        self._originalImageHeight = imgData.height;
        self.data.orientation = _hasExif.call(self) ? getExifOrientation(self.elements.img) : self.data.orientation;

        if (self.options.enableZoom) {
            _updateZoomLimits.call(self, true);
        }
        else {
            self._currentZoom = initialZoom;
        }

        transformReset.scale = self._currentZoom;
        cssReset[CSS_TRANSFORM] = transformReset.toString();
        css(img, cssReset);

        if (self.data.points.length) {
            _bindPoints.call(self, self.data.points);
        }
        else {
            _centerImage.call(self);
        }

        _updateCenterPoint.call(self);
        _updateOverlay.call(self);
    }

    function _updateZoomLimits (initial) {
        var self = this,
            minZoom = Math.max(self.options.minZoom, 0) || 0,
            maxZoom = self.options.maxZoom || 1.5,
            initialZoom,
            defaultInitialZoom,
            zoomer = self.elements.zoomer,
            scale = parseFloat(zoomer.value),
            boundaryData = self.elements.boundary.getBoundingClientRect(),
            imgData = naturalImageDimensions(self.elements.img, self.data.orientation),
            vpData = self.elements.viewport.getBoundingClientRect(),
            minW,
            minH;
        if (self.options.enforceBoundary) {
            minW = vpData.width / imgData.width;
            minH = vpData.height / imgData.height;
            minZoom = Math.max(minW, minH);
        }

        if (minZoom >= maxZoom) {
            maxZoom = minZoom + 1;
        }

        zoomer.min = fix(minZoom, 4);
        zoomer.max = fix(maxZoom, 4);

        if (!initial && (scale < zoomer.min || scale > zoomer.max)) {
            _setZoomerVal.call(self, scale < zoomer.min ? zoomer.min : zoomer.max);
        }
        else if (initial) {
            defaultInitialZoom = Math.max((boundaryData.width / imgData.width), (boundaryData.height / imgData.height));
            initialZoom = self.data.boundZoom !== null ? self.data.boundZoom : defaultInitialZoom;
            _setZoomerVal.call(self, initialZoom);
        }

        dispatchChange(zoomer);
    }

    function _bindPoints(points) {
        if (points.length !== 4) {
            throw "Croppie - Invalid number of points supplied: " + points;
        }
        var self = this,
            pointsWidth = points[2] - points[0],
            // pointsHeight = points[3] - points[1],
            vpData = self.elements.viewport.getBoundingClientRect(),
            boundRect = self.elements.boundary.getBoundingClientRect(),
            vpOffset = {
                left: vpData.left - boundRect.left,
                top: vpData.top - boundRect.top
            },
            scale = vpData.width / pointsWidth,
            originTop = points[1],
            originLeft = points[0],
            transformTop = (-1 * points[1]) + vpOffset.top,
            transformLeft = (-1 * points[0]) + vpOffset.left,
            newCss = {};

        newCss[CSS_TRANS_ORG] = originLeft + 'px ' + originTop + 'px';
        newCss[CSS_TRANSFORM] = new Transform(transformLeft, transformTop, scale).toString();
        css(self.elements.preview, newCss);

        _setZoomerVal.call(self, scale);
        self._currentZoom = scale;
    }

    function _centerImage() {
        var self = this,
            imgDim = self.elements.preview.getBoundingClientRect(),
            vpDim = self.elements.viewport.getBoundingClientRect(),
            boundDim = self.elements.boundary.getBoundingClientRect(),
            vpLeft = vpDim.left - boundDim.left,
            vpTop = vpDim.top - boundDim.top,
            w = vpLeft - ((imgDim.width - vpDim.width) / 2),
            h = vpTop - ((imgDim.height - vpDim.height) / 2),
            transform = new Transform(w, h, self._currentZoom);

        css(self.elements.preview, CSS_TRANSFORM, transform.toString());
    }

    function _transferImageToCanvas(customOrientation) {
        var self = this,
            canvas = self.elements.canvas,
            img = self.elements.img,
            ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = img.width;
        canvas.height = img.height;

        var orientation = self.options.enableOrientation && customOrientation || getExifOrientation(img);
        drawCanvas(canvas, img, orientation);
    }

    function _getCanvas(data) {
        var self = this,
            points = data.points,
            left = num(points[0]),
            top = num(points[1]),
            right = num(points[2]),
            bottom = num(points[3]),
            width = right-left,
            height = bottom-top,
            circle = data.circle,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            startX = 0,
            startY = 0,
            canvasWidth = data.outputWidth || width,
            canvasHeight = data.outputHeight || height;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        if (data.backgroundColor) {
            ctx.fillStyle = data.backgroundColor;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        }

        // By default assume we're going to draw the entire
        // source image onto the destination canvas.
        var sx = left,
            sy = top,
            sWidth = width,
            sHeight = height,
            dx = 0,
            dy = 0,
            dWidth = canvasWidth,
            dHeight = canvasHeight;

        //
        // Do not go outside of the original image's bounds along the x-axis.
        // Handle translations when projecting onto the destination canvas.
        //

        // The smallest possible source x-position is 0.
        if (left < 0) {
            sx = 0;
            dx = (Math.abs(left) / width) * canvasWidth;
        }

        // The largest possible source width is the original image's width.
        if (sWidth + sx > self._originalImageWidth) {
            sWidth = self._originalImageWidth - sx;
            dWidth =  (sWidth / width) * canvasWidth;
        }

        //
        // Do not go outside of the original image's bounds along the y-axis.
        //

        // The smallest possible source y-position is 0.
        if (top < 0) {
            sy = 0;
            dy = (Math.abs(top) / height) * canvasHeight;
        }

        // The largest possible source height is the original image's height.
        if (sHeight + sy > self._originalImageHeight) {
            sHeight = self._originalImageHeight - sy;
            dHeight = (sHeight / height) * canvasHeight;
        }

        // console.table({ left, right, top, bottom, canvasWidth, canvasHeight, width, height, startX, startY, circle, sx, sy, dx, dy, sWidth, sHeight, dWidth, dHeight });

        ctx.drawImage(this.elements.preview, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        if (circle) {
            ctx.fillStyle = '#fff';
            ctx.globalCompositeOperation = 'destination-in';
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
        return canvas;
    }

    function _getHtmlResult(data) {
        var points = data.points,
            div = document.createElement('div'),
            img = document.createElement('img'),
            width = points[2] - points[0],
            height = points[3] - points[1];

        addClass(div, 'croppie-result');
        div.appendChild(img);
        css(img, {
            left: (-1 * points[0]) + 'px',
            top: (-1 * points[1]) + 'px'
        });
        img.src = data.url;
        css(div, {
            width: width + 'px',
            height: height + 'px'
        });

        return div;
    }

    function _getBase64Result(data) {
        return _getCanvas.call(this, data).toDataURL(data.format, data.quality);
    }

    function _getBlobResult(data) {
        var self = this;
        return new Promise(function (resolve) {
            _getCanvas.call(self, data).toBlob(function (blob) {
                resolve(blob);
            }, data.format, data.quality);
        });
    }

    function _replaceImage(img) {
        if (this.elements.img.parentNode) {
            Array.prototype.forEach.call(this.elements.img.classList, function(c) { img.classList.add(c); });
            this.elements.img.parentNode.replaceChild(img, this.elements.img);
            this.elements.preview = img; // if the img is attached to the DOM, they're not using the canvas
        }
        this.elements.img = img;
    }

    function _bind(options, cb) {
        var self = this,
            url,
            points = [],
            zoom = null,
            hasExif = _hasExif.call(self);

        if (typeof (options) === 'string') {
            url = options;
            options = {};
        }
        else if (Array.isArray(options)) {
            points = options.slice();
        }
        else if (typeof (options) === 'undefined' && self.data.url) { //refreshing
            _updatePropertiesFromImage.call(self);
            _triggerUpdate.call(self);
            return null;
        }
        else {
            url = options.url;
            points = options.points || [];
            zoom = typeof(options.zoom) === 'undefined' ? null : options.zoom;
        }

        self.data.bound = false;
        self.data.url = url || self.data.url;
        self.data.boundZoom = zoom;

        return loadImage(url, hasExif).then(function (img) {
            _replaceImage.call(self, img);
            if (!points.length) {
                var natDim = naturalImageDimensions(img);
                var rect = self.elements.viewport.getBoundingClientRect();
                var aspectRatio = rect.width / rect.height;
                var imgAspectRatio = natDim.width / natDim.height;
                var width, height;

                if (imgAspectRatio > aspectRatio) {
                    height = natDim.height;
                    width = height * aspectRatio;
                }
                else {
                    width = natDim.width;
                    height = natDim.height / aspectRatio;
                }

                var x0 = (natDim.width - width) / 2;
                var y0 = (natDim.height - height) / 2;
                var x1 = x0 + width;
                var y1 = y0 + height;
                self.data.points = [x0, y0, x1, y1];
            }
            else if (self.options.relative) {
                points = [
                    points[0] * img.naturalWidth / 100,
                    points[1] * img.naturalHeight / 100,
                    points[2] * img.naturalWidth / 100,
                    points[3] * img.naturalHeight / 100
                ];
            }

            self.data.orientation = options.orientation || 1;
            self.data.points = points.map(function (p) {
                return parseFloat(p);
            });
            if (self.options.useCanvas) {
                _transferImageToCanvas.call(self, self.data.orientation);
            }
            _updatePropertiesFromImage.call(self);
            _triggerUpdate.call(self);
            cb && cb();
        });
    }

    function fix(v, decimalPoints) {
        return parseFloat(v).toFixed(decimalPoints || 0);
    }

    function _get() {
        var self = this,
            imgData = self.elements.preview.getBoundingClientRect(),
            vpData = self.elements.viewport.getBoundingClientRect(),
            x1 = vpData.left - imgData.left,
            y1 = vpData.top - imgData.top,
            widthDiff = (vpData.width - self.elements.viewport.offsetWidth) / 2, //border
            heightDiff = (vpData.height - self.elements.viewport.offsetHeight) / 2,
            x2 = x1 + self.elements.viewport.offsetWidth + widthDiff,
            y2 = y1 + self.elements.viewport.offsetHeight + heightDiff,
            scale = self._currentZoom;

        if (scale === Infinity || isNaN(scale)) {
            scale = 1;
        }

        var max = self.options.enforceBoundary ? 0 : Number.NEGATIVE_INFINITY;
        x1 = Math.max(max, x1 / scale);
        y1 = Math.max(max, y1 / scale);
        x2 = Math.max(max, x2 / scale);
        y2 = Math.max(max, y2 / scale);

        return {
            points: [fix(x1), fix(y1), fix(x2), fix(y2)],
            zoom: scale,
            orientation: self.data.orientation
        };
    }

    var RESULT_DEFAULTS = {
            type: 'canvas',
            format: 'png',
            quality: 1
        },
        RESULT_FORMATS = ['jpeg', 'webp', 'png'];

    function _result(options) {
        var self = this,
            data = _get.call(self),
            opts = deepExtend(clone(RESULT_DEFAULTS), clone(options)),
            resultType = (typeof (options) === 'string' ? options : (opts.type || 'base64')),
            size = opts.size || 'viewport',
            format = opts.format,
            quality = opts.quality,
            backgroundColor = opts.backgroundColor,
            circle = typeof opts.circle === 'boolean' ? opts.circle : (self.options.viewport.type === 'circle'),
            vpRect = self.elements.viewport.getBoundingClientRect(),
            ratio = vpRect.width / vpRect.height,
            prom;

        if (size === 'viewport') {
            data.outputWidth = vpRect.width;
            data.outputHeight = vpRect.height;
        } else if (typeof size === 'object') {
            if (size.width && size.height) {
                data.outputWidth = size.width;
                data.outputHeight = size.height;
            } else if (size.width) {
                data.outputWidth = size.width;
                data.outputHeight = size.width / ratio;
            } else if (size.height) {
                data.outputWidth = size.height * ratio;
                data.outputHeight = size.height;
            }
        }

        if (RESULT_FORMATS.indexOf(format) > -1) {
            data.format = 'image/' + format;
            data.quality = quality;
        }

        data.circle = circle;
        data.url = self.data.url;
        data.backgroundColor = backgroundColor;

        prom = new Promise(function (resolve) {
            switch(resultType.toLowerCase())
            {
                case 'rawcanvas':
                    resolve(_getCanvas.call(self, data));
                    break;
                case 'canvas':
                case 'base64':
                    resolve(_getBase64Result.call(self, data));
                    break;
                case 'blob':
                    _getBlobResult.call(self, data).then(resolve);
                    break;
                default:
                    resolve(_getHtmlResult.call(self, data));
                    break;
            }
        });
        return prom;
    }

    function _refresh() {
        _updatePropertiesFromImage.call(this);
    }

    function _rotate(deg) {
        if (!this.options.useCanvas || !this.options.enableOrientation) {
            throw 'Croppie: Cannot rotate without enableOrientation && EXIF.js included';
        }

        var self = this,
            canvas = self.elements.canvas;

        self.data.orientation = getExifOffset(self.data.orientation, deg);
        drawCanvas(canvas, self.elements.img, self.data.orientation);
        _updateCenterPoint.call(self, true);
        _updateZoomLimits.call(self);

        // Reverses image dimensions if the degrees of rotation is not divisible by 180.
        if ((Math.abs(deg) / 90) % 2 === 1) {
            var oldHeight = self._originalImageHeight;
            var oldWidth = self._originalImageWidth;
            self._originalImageWidth = oldHeight;
            self._originalImageHeight = oldWidth;
        }
    }

    function _destroy() {
        var self = this;
        self.element.removeChild(self.elements.boundary);
        removeClass(self.element, 'croppie-container');
        if (self.options.enableZoom) {
            self.element.removeChild(self.elements.zoomerWrap);
        }
        delete self.elements;
    }

    if (typeof window !== 'undefined' && window.jQuery) {
        var $ = window.jQuery;
        $.fn.croppie = function (opts) {
            var ot = typeof opts;

            if (ot === 'string') {
                var args = Array.prototype.slice.call(arguments, 1);
                var singleInst = $(this).data('croppie');

                if (opts === 'get') {
                    return singleInst.get();
                }
                else if (opts === 'result') {
                    return singleInst.result.apply(singleInst, args);
                }
                else if (opts === 'bind') {
                    return singleInst.bind.apply(singleInst, args);
                }

                return this.each(function () {
                    var i = $(this).data('croppie');
                    if (!i) return;

                    var method = i[opts];
                    if ($.isFunction(method)) {
                        method.apply(i, args);
                        if (opts === 'destroy') {
                            $(this).removeData('croppie');
                        }
                    }
                    else {
                        throw 'Croppie ' + opts + ' method not found';
                    }
                });
            }
            else {
                return this.each(function () {
                    var i = new Croppie(this, opts);
                    i.$ = $;
                    $(this).data('croppie', i);
                });
            }
        };
    }

    function Croppie(element, opts) {
        if (element.className.indexOf('croppie-container') > -1) {
            throw new Error("Croppie: Can't initialize croppie more than once");
        }
        this.element = element;
        this.options = deepExtend(clone(Croppie.defaults), opts);

        if (this.element.tagName.toLowerCase() === 'img') {
            var origImage = this.element;
            addClass(origImage, 'cr-original-image');
            setAttributes(origImage, {'aria-hidden' : 'true', 'alt' : '' });
            var replacementDiv = document.createElement('div');
            this.element.parentNode.appendChild(replacementDiv);
            replacementDiv.appendChild(origImage);
            this.element = replacementDiv;
            this.options.url = this.options.url || origImage.src;
        }

        _create.call(this);
        if (this.options.url) {
            var bindOpts = {
                url: this.options.url,
                points: this.options.points
            };
            delete this.options['url'];
            delete this.options['points'];
            _bind.call(this, bindOpts);
        }
    }

    Croppie.defaults = {
        viewport: {
            width: 100,
            height: 100,
            type: 'square'
        },
        boundary: { },
        orientationControls: {
            enabled: true,
            leftClass: '',
            rightClass: ''
        },
        resizeControls: {
            width: true,
            height: true
        },
        customClass: '',
        showZoomer: true,
        enableZoom: true,
        enableResize: false,
        mouseWheelZoom: true,
        enableExif: false,
        enforceBoundary: true,
        enableOrientation: false,
        enableKeyMovement: true,
        update: function () { }
    };

    Croppie.globals = {
        translate: 'translate3d'
    };

    deepExtend(Croppie.prototype, {
        bind: function (options, cb) {
            return _bind.call(this, options, cb);
        },
        get: function () {
            var data = _get.call(this);
            var points = data.points;
            if (this.options.relative) {
                points[0] /= this.elements.img.naturalWidth / 100;
                points[1] /= this.elements.img.naturalHeight / 100;
                points[2] /= this.elements.img.naturalWidth / 100;
                points[3] /= this.elements.img.naturalHeight / 100;
            }
            return data;
        },
        result: function (type) {
            return _result.call(this, type);
        },
        refresh: function () {
            return _refresh.call(this);
        },
        setZoom: function (v) {
            _setZoomerVal.call(this, v);
            dispatchChange(this.elements.zoomer);
        },
        rotate: function (deg) {
            _rotate.call(this, deg);
        },
        destroy: function () {
            return _destroy.call(this);
        }
    });
    return Croppie;
}));

},{}],"node_modules/mrz/src/generated/states.js":[function(require,module,exports) {
'use strict';
const states = {
  "AFG": "Afghanistan",
  "ALA": "Åland Islands",
  "ALB": "Albania",
  "DZA": "Algeria",
  "ASM": "American Samoa",
  "AND": "Andorra",
  "AGO": "Angola",
  "AIA": "Anguilla",
  "ATA": "Antarctica",
  "ATG": "Antigua and Barbuda",
  "ARG": "Argentina",
  "ARM": "Armenia",
  "ABW": "Aruba",
  "AUS": "Australia",
  "AUT": "Austria",
  "AZE": "Azerbaijan",
  "BHS": "Bahamas",
  "BHR": "Bahrain",
  "BGD": "Bangladesh",
  "BRB": "Barbados",
  "BLR": "Belarus",
  "BEL": "Belgium",
  "BLZ": "Belize",
  "BEN": "Benin",
  "BMU": "Bermuda",
  "BTN": "Bhutan",
  "BOL": "Bolivia, Plurinational State of",
  "BES": "Bonaire, Sint Eustatius and Saba",
  "BIH": "Bosnia and Herzegovina",
  "BWA": "Botswana",
  "BVT": "Bouvet Island",
  "BRA": "Brazil",
  "IOT": "British Indian Ocean Territory",
  "BRN": "Brunei Darussalam",
  "BGR": "Bulgaria",
  "BFA": "Burkina Faso",
  "BDI": "Burundi",
  "CPV": "Cabo Verde",
  "KHM": "Cambodia",
  "CMR": "Cameroon",
  "CAN": "Canada",
  "CYM": "Cayman Islands",
  "CAF": "Central African Republic",
  "TCD": "Chad",
  "CHL": "Chile",
  "CHN": "China",
  "CXR": "Christmas Island",
  "CCK": "Cocos (Keeling) Islands",
  "COL": "Colombia",
  "COM": "Comoros",
  "COG": "Congo",
  "COD": "Congo, Democratic Republic of the",
  "COK": "Cook Islands",
  "CRI": "Costa Rica",
  "CIV": "Côte d’Ivoire",
  "HRV": "Croatia",
  "CUB": "Cuba",
  "CUW": "Curaçao",
  "CYP": "Cyprus",
  "CZE": "Czech Republic",
  "DNK": "Denmark",
  "DJI": "Djibouti",
  "DMA": "Dominica",
  "DOM": "Dominican Republic",
  "ECU": "Ecuador",
  "EGY": "Egypt",
  "SLV": "El Salvador",
  "GNQ": "Equatorial Guinea",
  "ERI": "Eritrea",
  "EST": "Estonia",
  "ETH": "Ethiopia",
  "FLK": "Falkland Islands (Malvinas)",
  "FRO": "Faroe Islands",
  "FJI": "Fiji",
  "FIN": "Finland",
  "FRA": "France",
  "GUF": "French Guiana",
  "PYF": "French Polynesia",
  "ATF": "French Southern Territories",
  "GAB": "Gabon",
  "GMB": "Gambia",
  "GEO": "Georgia",
  "D": "Germany",
  "GHA": "Ghana",
  "GIB": "Gibraltar",
  "GRC": "Greece",
  "GRL": "Greenland",
  "GRD": "Grenada",
  "GLP": "Guadeloupe",
  "GUM": "Guam",
  "GTM": "Guatemala",
  "GGY": "Guernsey",
  "GIN": "Guinea",
  "GNB": "Guinea-Bissau",
  "GUY": "Guyana",
  "HTI": "Haiti",
  "HMD": "Heard Island and McDonald Islands",
  "VAT": "Holy See (Vatican City State)",
  "HND": "Honduras",
  "HKG": "Hong Kong Special Administrative Region of China",
  "HUN": "Hungary",
  "ISL": "Iceland",
  "IND": "India",
  "IDN": "Indonesia",
  "IRN": "Iran (Islamic Republic of)",
  "IRQ": "Iraq",
  "IRL": "Ireland",
  "IMN": "Isle of Man",
  "ISR": "Israel",
  "ITA": "Italy",
  "JAM": "Jamaica",
  "JPN": "Japan",
  "JEY": "Jersey",
  "JOR": "Jordan",
  "KAZ": "Kazakhstan",
  "KEN": "Kenya",
  "KIR": "Kiribati",
  "PRK": "Korea, Democratic People’s Republic of",
  "KOR": "Korea, Republic of",
  "KWT": "Kuwait",
  "KGZ": "Kyrgyzstan",
  "LAO": "Lao People’s Democratic Republic",
  "LVA": "Latvia",
  "LBN": "Lebanon",
  "LSO": "Lesotho",
  "LBR": "Liberia",
  "LBY": "Libya",
  "LIE": "Liechtenstein",
  "LTU": "Lithuania",
  "LUX": "Luxembourg",
  "MAC": "Macao Special Administrative Region of China",
  "MKD": "Macedonia, the former Yugoslav Republic of",
  "MDG": "Madagascar",
  "MWI": "Malawi",
  "MYS": "Malaysia",
  "MDV": "Maldives",
  "MLI": "Mali",
  "MLT": "Malta",
  "MHL": "Marshall Islands",
  "MTQ": "Martinique",
  "MRT": "Mauritania",
  "MUS": "Mauritius",
  "MYT": "Mayotte",
  "MEX": "Mexico",
  "FSM": "Micronesia (Federated States of)",
  "MDA": "Moldova, Republic of",
  "MCO": "Monaco",
  "MNG": "Mongolia",
  "MNE": "Montenegro",
  "MSR": "Montserrat",
  "MAR": "Morocco",
  "MOZ": "Mozambique",
  "MMR": "Myanmar",
  "NAM": "Namibia",
  "NRU": "Nauru",
  "NPL": "Nepal",
  "NLD": "Netherlands",
  "ANT": "Netherlands Antilles",
  "NTZ": "Neutral Zone",
  "NCL": "New Caledonia",
  "NZL": "New Zealand",
  "NIC": "Nicaragua",
  "NER": "Niger",
  "NGA": "Nigeria",
  "NIU": "Niue",
  "NFK": "Norfolk Island",
  "MNP": "Northern Mariana Islands",
  "NOR": "Norway",
  "OMN": "Oman",
  "PAK": "Pakistan",
  "PLW": "Palau",
  "PSE": "Palestine, State of",
  "PAN": "Panama",
  "PNG": "Papua New Guinea",
  "PRY": "Paraguay",
  "PER": "Peru",
  "PHL": "Philippines",
  "PCN": "Pitcairn",
  "POL": "Poland",
  "PRT": "Portugal",
  "PRI": "Puerto Rico",
  "QAT": "Qatar",
  "REU": "Réunion",
  "ROU": "Romania",
  "RUS": "Russian Federation",
  "RWA": "Rwanda",
  "BLM": "Saint Barthélemy",
  "SHN": "Saint Helena, Ascension and Tristan da Cunha",
  "KNA": "Saint Kitts and Nevis",
  "LCA": "Saint Lucia",
  "MAF": "Saint Martin (French part)",
  "SPM": "Saint Pierre and Miquelon",
  "VCT": "Saint Vincent and the Grenadines",
  "WSM": "Samoa",
  "SMR": "San Marino",
  "STP": "Sao Tome and Principe",
  "SAU": "Saudi Arabia",
  "SEN": "Senegal",
  "SRB": "Serbia",
  "SYC": "Seychelles",
  "SLE": "Sierra Leone",
  "SGP": "Singapore",
  "SXM": "Sint Maarten (Dutch part)",
  "SVK": "Slovakia",
  "SVN": "Slovenia",
  "SLB": "Solomon Islands",
  "SOM": "Somalia",
  "ZAF": "South Africa",
  "SGS": "South Georgia and the South Sandwich Islands",
  "SSD": "South Sudan",
  "ESP": "Spain",
  "LKA": "Sri Lanka",
  "SDN": "Sudan",
  "SUR": "Suriname",
  "SJM": "Svalbard and Jan Mayen",
  "SWZ": "Swaziland",
  "SWE": "Sweden",
  "CHE": "Switzerland",
  "SYR": "Syrian Arab Republic",
  "TWN": "Taiwan Province of China",
  "TJK": "Tajikistan",
  "TZA": "Tanzania, United Republic of",
  "THA": "Thailand",
  "TLS": "Timor-Leste",
  "TGO": "Togo",
  "TKL": "Tokelau",
  "TON": "Tonga",
  "TTO": "Trinidad and Tobago",
  "TUN": "Tunisia",
  "TUR": "Turkey",
  "TKM": "Turkmenistan",
  "TCA": "Turks and Caicos Islands",
  "TUV": "Tuvalu",
  "UGA": "Uganda",
  "UKR": "Ukraine",
  "ARE": "United Arab Emirates",
  "GBR": "United Kingdom - British Citizen",
  "GBD": "United Kingdom - British Overseas Territories Citizen",
  "GBN": "United Kingdom - British National (Overseas)",
  "GBO": "United Kingdom - British Overseas Citizen",
  "GBP": "United Kingdom - British Protected person",
  "USA": "United States",
  "UMI": "United States Minor Outlying Islands",
  "URY": "Uruguay",
  "UZB": "Uzbekistan",
  "VUT": "Vanuatu",
  "VEN": "Venezuela, Bolivarian Republic of",
  "VNM": "Viet Nam",
  "VGB": "Virgin Islands (British)",
  "VIR": "Virgin Islands (U.S.)",
  "WLF": "Wallis and Futuna",
  "ESH": "Western Sahara",
  "YEM": "Yemen",
  "ZMB": "Zambia",
  "ZWE": "Zimbabwe",
  "EUE": "European Union (EU)",
  "UNO": "United Nations Organization or one of its officials",
  "UNA": "United Nations specialized agency or one of its officials",
  "UNK": "Resident of Kosovo to whom a travel document has been issued by the United Nations Interim Administration Mission in Kosovo (UNMIK)",
  "XBA": "African Development Bank (ADB)",
  "XIM": "African Export-Import Bank (AFREXIM bank)",
  "XCC": "Caribbean Community or one of its emissaries (CARICOM)",
  "XCO": "Common Market for Eastern and Southern Africa (COMESA)",
  "XEC": "Economic Community of West African States (ECOWAS)",
  "XPO": "International Criminal Police Organization (INTERPOL)",
  "XOM": "Sovereign Military Order of Malta or one of its emissaries",
  "XXA": "Stateless person, as defined in Article 1 of the 1954 Convention Relating to the Status of Stateless Persons",
  "XXB": "Refugee, as defined in Article 1 of the 1951 Convention Relating to the Status of Refugees as amended by the 1967 Protocol",
  "XXX": "Refugee, other than as defined under the code XXB above XXC Person of unspecified nationality, for whom issuing State does not consider it necessary to specify any of the codes XXA, XXB or XXC above, whatever that person’s status may be. This category may include a person who is neither stateless nor a refugee but who is of unknown nationality and legally residing in the State of issue."
};
Object.freeze(states);
module.exports = states;

},{}],"node_modules/mrz/src/formats.js":[function(require,module,exports) {
'use strict';

const formats = {
  TD1: 'TD1',
  TD2: 'TD2',
  TD3: 'TD3',
  SWISS_DRIVING_LICENSE: 'SWISS_DRIVING_LICENSE',
  FRENCH_NATIONAL_ID: 'FRENCH_NATIONAL_ID'
};
Object.freeze(formats);

module.exports = formats;

},{}],"node_modules/mrz/src/parse/checkLines.js":[function(require,module,exports) {
'use strict';

function checkLines(lines) {
  if (typeof lines === 'string') {
    lines = lines.split(/[\r\n]+/);
  }
  if (!Array.isArray(lines)) {
    throw new TypeError('input must be an array or string');
  }
  for (const line of lines) {
    if (!line.match(/[A-Z0-9<]+/)) {
      throw new TypeError(
        'lines must be composed of only alphanumerical characters and "<"'
      );
    }
  }
  return lines;
}

module.exports = checkLines;

},{}],"node_modules/mrz/src/parse/getResult.js":[function(require,module,exports) {
'use strict';

function getDetails(lines, fieldParsers) {
  const details = [];
  for (const parser of fieldParsers) {
    details.push(parser(lines));
  }
  return details;
}

function getFields(details) {
  const fields = {};
  let valid = true;
  for (const detail of details) {
    if (!detail.valid) valid = false;
    if (detail.field) {
      fields[detail.field] = detail.value;
    }
  }
  return { fields, valid };
}

function getResult(format, lines, fieldParsers) {
  const details = getDetails(lines, fieldParsers);
  const fields = getFields(details);
  const result = {
    format,
    details,
    fields: fields.fields,
    valid: fields.valid
  };
  return result;
}

module.exports = getResult;

},{}],"node_modules/mrz/src/parsers/parseDocumentCodeId.js":[function(require,module,exports) {
'use strict';

module.exports = function parseDocumentCodeId(source) {
  const first = source.charAt(0);
  if (first !== 'A' && first !== 'C' && first !== 'I') {
    throw new Error(
      `invalid document code: ${source}. First character must be A, C or I`
    );
  }

  const second = source.charAt(1);
  if (second === 'V') {
    throw new Error(
      `invalid document code: ${source}. Second character may not be V`
    );
  }

  if (second === '<') {
    return {
      value: first,
      start: 0,
      end: 1
    };
  } else {
    return source;
  }
};

},{}],"node_modules/mrz/src/parsers/cleanText.js":[function(require,module,exports) {
'use strict';

module.exports = function cleanText(string) {
  return string.replace(/<+$/g, '').replace(/</g, ' ');
};

},{}],"node_modules/mrz/src/parsers/parseText.js":[function(require,module,exports) {
'use strict';

const cleanText = require('./cleanText');

module.exports = function parseText(source, regexp = /^[0-9A-Z<]+$/) {
  if (!source.match(regexp)) {
    throw new Error(
      `invalid text: ${source}. Must match the following regular expression: ${regexp}`
    );
  }
  return cleanText(source);
};

},{"./cleanText":"node_modules/mrz/src/parsers/cleanText.js"}],"node_modules/mrz/src/parsers/parseOptional.js":[function(require,module,exports) {
'use strict';

var parseText = require('./parseText');

module.exports = function parseOptional(source) {
  const value = parseText(source);

  return {
    value,
    start: 0,
    end: 0 + value.length
  };
};

},{"./parseText":"node_modules/mrz/src/parsers/parseText.js"}],"node_modules/mrz/src/parsers/parseDocumentNumberOptional.js":[function(require,module,exports) {
'use strict';

var parseText = require('./parseText');

module.exports = function parseDocumentNumberOptional(
  optional,
  documentNumber,
  checkDigit
) {
  if (checkDigit === '<') {
    const firstFiller = optional.indexOf('<');
    const value = parseText(optional.substring(firstFiller + 1));
    return {
      value,
      start: firstFiller + 1,
      end: firstFiller + 1 + value.length
    };
  } else {
    const value = parseText(optional);
    return {
      value,
      start: 0,
      end: 0 + value.length
    };
  }
};

},{"./parseText":"node_modules/mrz/src/parsers/parseText.js"}],"node_modules/mrz/src/parsers/parseDocumentNumber.js":[function(require,module,exports) {
'use strict';

const cleanText = require('./cleanText');

module.exports = function parseDocumentNumber(source, checkDigit, optional) {
  let end, value;
  if (checkDigit === '<' && optional) {
    const firstFiller = optional.indexOf('<');
    const tail = optional.substring(0, firstFiller - 1);
    value = source + tail;
    end = value.length + 1;
  } else {
    value = cleanText(source);
    end = value.length;
  }
  return {
    value,
    start: 0,
    end
  };
};

},{"./cleanText":"node_modules/mrz/src/parsers/cleanText.js"}],"node_modules/mrz/src/parsers/check.js":[function(require,module,exports) {
'use strict';

module.exports = function check(string, value) {
  var code = 0;
  var factors = [7, 3, 1];
  for (var i = 0; i < string.length; i++) {
    var charCode = string.charCodeAt(i);
    if (charCode === 60) charCode = 0;
    if (charCode >= 65) charCode -= 55;
    if (charCode >= 48) charCode -= 48;
    charCode *= factors[i % 3];
    code += charCode;
  }
  code %= 10;
  if (code !== Number(value)) {
    throw new Error(`invalid check digit: ${value}. Must be ${code}`);
  }
};

},{}],"node_modules/mrz/src/parsers/parseDocumentNumberCheckDigit.js":[function(require,module,exports) {
'use strict';

var check = require('./check');

module.exports = function parseDocumentNumberCheckDigit(
  checkDigit,
  source,
  optional
) {
  if (checkDigit === '<' && optional) {
    const firstFiller = optional.indexOf('<');
    const tail = optional.substring(0, firstFiller - 1);
    source = `${source}<${tail}`;
    checkDigit = optional.charAt(firstFiller - 1);
    check(source, checkDigit);
    return {
      value: checkDigit,
      start: firstFiller,
      end: firstFiller + 1
    };
  } else {
    check(source, checkDigit);
    return checkDigit;
  }
};

},{"./check":"node_modules/mrz/src/parsers/check.js"}],"node_modules/mrz/src/parsers/parseState.js":[function(require,module,exports) {
'use strict';

const STATES = require('../generated/states');
const cleanText = require('./cleanText');

module.exports = function parseState(source) {
  source = cleanText(source);
  var state = STATES[source];
  if (!state) {
    throw new Error(`invalid state code: ${source}`);
  }
  return {
    value: source,
    start: 0,
    end: source.length
  };
};

},{"../generated/states":"node_modules/mrz/src/generated/states.js","./cleanText":"node_modules/mrz/src/parsers/cleanText.js"}],"node_modules/mrz/src/parsers/parseSex.js":[function(require,module,exports) {
'use strict';

module.exports = function parseSex(source) {
  switch (source) {
    case 'M':
      return 'male';
    case 'F':
      return 'female';
    case '<':
      return 'nonspecified';
    default:
      throw new Error(`invalid sex: ${source}. Must be M, F or <.`);
  }
};

},{}],"node_modules/mrz/src/parsers/parseDate.js":[function(require,module,exports) {
'use strict';

module.exports = function parseDate(value) {
  if (!value.match(/^[0-9<]{4,6}$/)) {
    throw new Error(`invalid date: ${value}`);
  }

  const month = value.substring(2, 4);
  if (month !== '<<' && (month < 1 || month > 12)) {
    throw new Error(`invalid date month: ${month}`);
  }

  if (value.length === 6) {
    const day = value.substring(4, 6);
    if (day !== '<<' && (day < 1 || day > 31)) {
      throw new Error(`invalid date day: ${day}`);
    }
  }

  return value;
};

},{}],"node_modules/mrz/src/parsers/parseDateCheckDigit.js":[function(require,module,exports) {
'use strict';

const check = require('./check');

module.exports = function parseCheckDigit(checkDigit, value) {
  if (checkDigit !== false) {
    check(value, checkDigit);
  }
  return checkDigit;
};

},{"./check":"node_modules/mrz/src/parsers/check.js"}],"node_modules/mrz/src/parsers/parseCompositeCheckDigit.js":[function(require,module,exports) {
'use strict';

var check = require('./check');

module.exports = function parseCompositeCheckDigit(checkDigit, ...sources) {
  const source = sources.join('');
  check(source, checkDigit);
  return checkDigit;
};

},{"./check":"node_modules/mrz/src/parsers/check.js"}],"node_modules/mrz/src/parsers/parseFirstName.js":[function(require,module,exports) {
'use strict';

var parseText = require('./parseText');

module.exports = function parseFirstName(source) {
  const withoutStart = source.replace(/.*?<{2}/, '');
  const value = parseText(withoutStart, /^[A-Z<]+<*$/);
  const start = source.length - withoutStart.length;
  return {
    value,
    start,
    end: start + value.length
  };
};

},{"./parseText":"node_modules/mrz/src/parsers/parseText.js"}],"node_modules/mrz/src/parsers/parseLastName.js":[function(require,module,exports) {
'use strict';

var parseText = require('./parseText');

module.exports = function parseLastName(source) {
  const parsed = parseText(source.replace(/<{2}.*/, ''), /^[A-Z<]+<*$/);
  return {
    value: parsed,
    start: 0,
    end: parsed.length
  };
};

},{"./parseText":"node_modules/mrz/src/parsers/parseText.js"}],"node_modules/mrz/src/parse/fieldTemplates.js":[function(require,module,exports) {
'use strict';

const documentNumberTemplate = {
  label: 'Document number',
  field: 'documentNumber',
  parser: require('../parsers/parseDocumentNumber')
};

const documentNumberCheckDigitTemplate = {
  label: 'Document number check digit',
  field: 'documentNumberCheckDigit',
  parser: require('../parsers/parseDocumentNumberCheckDigit')
};

const documentCodeTemplate = {
  label: 'Document code',
  field: 'documentCode'
};

const nationalityTemplate = {
  label: 'Nationality',
  field: 'nationality',
  parser: require('../parsers/parseState')
};

const sexTemplate = {
  label: 'Sex',
  field: 'sex',
  parser: require('../parsers/parseSex')
};

const expirationDateTemplate = {
  label: 'Expiration date',
  field: 'expirationDate',
  parser: require('../parsers/parseDate')
};

const expirationDateCheckDigitTemplate = {
  label: 'Expiration date check digit',
  field: 'expirationDateCheckDigit',
  parser: require('../parsers/parseDateCheckDigit')
};

const compositeCheckDigitTemplate = {
  label: 'Composite check digit',
  field: 'compositeCheckDigit',
  parser: require('../parsers/parseCompositeCheckDigit')
};

const birthDateTemplate = {
  label: 'Birth date',
  field: 'birthDate',
  parser: require('../parsers/parseDate')
};

const birthDateCheckDigitTemplate = {
  label: 'Birth date check digit',
  field: 'birthDateCheckDigit',
  parser: require('../parsers/parseDateCheckDigit')
};

const issueDateTemplate = {
  label: 'Issue date',
  field: 'issueDate',
  parser: require('../parsers/parseDate')
};

const firstNameTemplate = {
  label: 'First name',
  field: 'firstName',
  parser: require('../parsers/parseFirstName')
};

const lastNameTemplate = {
  label: 'Last name',
  field: 'lastName',
  parser: require('../parsers/parseLastName')
};

const issuingStateTemplate = {
  label: 'Issuing state',
  field: 'issuingState',
  parser: require('../parsers/parseState')
};

module.exports = {
  documentNumberTemplate,
  documentNumberCheckDigitTemplate,
  documentCodeTemplate,
  nationalityTemplate,
  sexTemplate,
  expirationDateTemplate,
  expirationDateCheckDigitTemplate,
  birthDateTemplate,
  birthDateCheckDigitTemplate,
  issueDateTemplate,
  compositeCheckDigitTemplate,
  firstNameTemplate,
  lastNameTemplate,
  issuingStateTemplate
};

},{"../parsers/parseDocumentNumber":"node_modules/mrz/src/parsers/parseDocumentNumber.js","../parsers/parseDocumentNumberCheckDigit":"node_modules/mrz/src/parsers/parseDocumentNumberCheckDigit.js","../parsers/parseState":"node_modules/mrz/src/parsers/parseState.js","../parsers/parseSex":"node_modules/mrz/src/parsers/parseSex.js","../parsers/parseDate":"node_modules/mrz/src/parsers/parseDate.js","../parsers/parseDateCheckDigit":"node_modules/mrz/src/parsers/parseDateCheckDigit.js","../parsers/parseCompositeCheckDigit":"node_modules/mrz/src/parsers/parseCompositeCheckDigit.js","../parsers/parseFirstName":"node_modules/mrz/src/parsers/parseFirstName.js","../parsers/parseLastName":"node_modules/mrz/src/parsers/parseLastName.js"}],"node_modules/mrz/src/parse/createFieldParser.js":[function(require,module,exports) {
'use strict';

module.exports = function (fieldOptions) {
  checkType(fieldOptions, 'label', 'string');
  if (fieldOptions.field !== null) {
    checkType(fieldOptions, 'field', 'string');
  }
  checkType(fieldOptions, 'line', 'number');
  checkType(fieldOptions, 'start', 'number');
  checkType(fieldOptions, 'end', 'number');
  checkType(fieldOptions, 'parser', 'function');

  const ranges = [
    {
      line: fieldOptions.line,
      start: fieldOptions.start,
      end: fieldOptions.end
    }
  ];
  if (Array.isArray(fieldOptions.related)) {
    for (const related of fieldOptions.related) {
      checkType(related, 'line', 'number');
      checkType(related, 'start', 'number');
      checkType(related, 'end', 'number');
      ranges.push(related);
    }
  }

  return function parseField(lines) {
    const source = getText(lines, fieldOptions);
    let related = fieldOptions.related || [];
    related = related.map((r) => getText(lines, r));
    const result = {
      label: fieldOptions.label,
      field: fieldOptions.field,
      value: null,
      valid: false,
      ranges: ranges.map((range) => ({
        line: range.line,
        start: range.start,
        end: range.end,
        raw: getText(lines, range)
      }))
    };
    const range = result.ranges[0];
    result.line = range.line;
    result.start = range.start;
    result.end = range.end;
    try {
      let parsed = fieldOptions.parser(source, ...related);
      result.value = typeof parsed === 'object' ? parsed.value : parsed;
      result.valid = true;
      if (typeof parsed === 'object') {
        result.start = range.start + parsed.start;
        result.end = range.start + parsed.end;
      }
    } catch (e) {
      result.error = e.message;
    }
    return result;
  };
};

function getText(lines, options) {
  const line = lines[options.line];
  return line.substring(options.start, options.end);
}

function checkType(options, name, type) {
  if (typeof options[name] !== type) {
    throw new TypeError(`${name} must be a ${type}`);
  }
}

},{}],"node_modules/mrz/src/parse/td1Fields.js":[function(require,module,exports) {
'use strict';

const parseDocumentCode = require('../parsers/parseDocumentCodeId');
const parseOptional = require('../parsers/parseOptional');
const parseDocumentNumberOptional = require('../parsers/parseDocumentNumberOptional');
const {
  documentCodeTemplate,
  issuingStateTemplate,
  documentNumberTemplate,
  documentNumberCheckDigitTemplate,
  birthDateTemplate,
  birthDateCheckDigitTemplate,
  sexTemplate,
  expirationDateTemplate,
  expirationDateCheckDigitTemplate,
  nationalityTemplate,
  compositeCheckDigitTemplate,
  lastNameTemplate,
  firstNameTemplate
} = require('./fieldTemplates');
const createFieldParser = require('./createFieldParser');

module.exports = [
  Object.assign({}, documentCodeTemplate, {
    line: 0,
    start: 0,
    end: 2,
    parser: parseDocumentCode
  }),
  Object.assign({}, issuingStateTemplate, {
    line: 0,
    start: 2,
    end: 5
  }),
  Object.assign({}, documentNumberTemplate, {
    line: 0,
    start: 5,
    end: 14,
    related: [
      {
        line: 0,
        start: 14,
        end: 15
      },
      {
        line: 0,
        start: 15,
        end: 30
      }
    ]
  }),
  Object.assign(documentNumberCheckDigitTemplate, {
    line: 0,
    start: 14,
    end: 15,
    related: [
      {
        line: 0,
        start: 5,
        end: 14
      },
      {
        line: 0,
        start: 15,
        end: 30
      }
    ]
  }),
  {
    label: 'Optional field 1',
    field: 'optional1',
    line: 0,
    start: 15,
    end: 30,
    related: [
      {
        line: 0,
        start: 5,
        end: 14
      },
      {
        line: 0,
        start: 14,
        end: 15
      }
    ],
    parser: parseDocumentNumberOptional
  },
  Object.assign({}, birthDateTemplate, {
    start: 0,
    end: 6,
    line: 1
  }),
  Object.assign({}, birthDateCheckDigitTemplate, {
    line: 1,
    start: 6,
    end: 7,
    related: [
      {
        line: 1,
        start: 0,
        end: 6
      }
    ]
  }),
  Object.assign({}, sexTemplate, {
    line: 1,
    start: 7,
    end: 8
  }),
  Object.assign({}, expirationDateTemplate, {
    line: 1,
    start: 8,
    end: 14
  }),
  Object.assign({}, expirationDateCheckDigitTemplate, {
    line: 1,
    start: 14,
    end: 15,
    related: [
      {
        line: 1,
        start: 8,
        end: 14
      }
    ]
  }),
  Object.assign({}, nationalityTemplate, {
    line: 1,
    start: 15,
    end: 18
  }),
  {
    label: 'Optional field 2',
    field: 'optional2',
    line: 1,
    start: 18,
    end: 29,
    parser: parseOptional
  },
  Object.assign({}, compositeCheckDigitTemplate, {
    line: 1,
    start: 29,
    end: 30,
    related: [
      {
        line: 0,
        start: 5,
        end: 30
      },
      {
        line: 1,
        start: 0,
        end: 7
      },
      {
        line: 1,
        start: 8,
        end: 15
      },
      {
        line: 1,
        start: 18,
        end: 29
      }
    ]
  }),
  Object.assign({}, lastNameTemplate, {
    line: 2,
    start: 0,
    end: 30
  }),
  Object.assign({}, firstNameTemplate, {
    line: 2,
    start: 0,
    end: 30
  })
].map(createFieldParser);

},{"../parsers/parseDocumentCodeId":"node_modules/mrz/src/parsers/parseDocumentCodeId.js","../parsers/parseOptional":"node_modules/mrz/src/parsers/parseOptional.js","../parsers/parseDocumentNumberOptional":"node_modules/mrz/src/parsers/parseDocumentNumberOptional.js","./fieldTemplates":"node_modules/mrz/src/parse/fieldTemplates.js","./createFieldParser":"node_modules/mrz/src/parse/createFieldParser.js"}],"node_modules/mrz/src/parse/td1.js":[function(require,module,exports) {
'use strict';

const checkLines = require('./checkLines');
const getResult = require('./getResult');
const { TD1 } = require('../formats');
const TD1Fields = require('./td1Fields');

module.exports = function parseTD1(lines) {
  lines = checkLines(lines);
  if (lines.length !== 3) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 3 for ${TD1}`
    );
  }
  lines.forEach((line, index) => {
    if (line.length !== 30) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 30 for ${TD1}`
      );
    }
  });
  return getResult(TD1, lines, TD1Fields);
};

},{"./checkLines":"node_modules/mrz/src/parse/checkLines.js","./getResult":"node_modules/mrz/src/parse/getResult.js","../formats":"node_modules/mrz/src/formats.js","./td1Fields":"node_modules/mrz/src/parse/td1Fields.js"}],"node_modules/mrz/src/parse/td2Fields.js":[function(require,module,exports) {
'use strict';

const parseDocumentCode = require('../parsers/parseDocumentCodeId');
const parseOptional = require('../parsers/parseOptional');
const {
  documentCodeTemplate,
  issuingStateTemplate,
  firstNameTemplate,
  lastNameTemplate,
  documentNumberTemplate,
  documentNumberCheckDigitTemplate,
  nationalityTemplate,
  birthDateTemplate,
  birthDateCheckDigitTemplate,
  sexTemplate,
  expirationDateTemplate,
  expirationDateCheckDigitTemplate,
  compositeCheckDigitTemplate
} = require('./fieldTemplates');
const createFieldParser = require('./createFieldParser');

module.exports = [
  Object.assign({}, documentCodeTemplate, {
    line: 0,
    start: 0,
    end: 2,
    parser: parseDocumentCode
  }),
  Object.assign({}, issuingStateTemplate, {
    line: 0,
    start: 2,
    end: 5
  }),
  Object.assign({}, lastNameTemplate, {
    line: 0,
    start: 5,
    end: 36
  }),
  Object.assign({}, firstNameTemplate, {
    line: 0,
    start: 5,
    end: 36
  }),
  Object.assign({}, documentNumberTemplate, {
    line: 1,
    start: 0,
    end: 9,
    related: [
      {
        line: 1,
        start: 9,
        end: 10
      },
      {
        line: 1,
        start: 28,
        end: 35
      }
    ]
  }),
  Object.assign({}, documentNumberCheckDigitTemplate, {
    line: 1,
    start: 9,
    end: 10,
    related: [
      {
        line: 1,
        start: 0,
        end: 9
      },
      {
        line: 1,
        start: 28,
        end: 35
      }
    ]
  }),
  Object.assign({}, nationalityTemplate, {
    line: 1,
    start: 10,
    end: 13
  }),
  Object.assign({}, birthDateTemplate, {
    line: 1,
    start: 13,
    end: 19
  }),
  Object.assign({}, birthDateCheckDigitTemplate, {
    line: 1,
    start: 19,
    end: 20,
    related: [
      {
        line: 1,
        start: 13,
        end: 19
      }
    ]
  }),
  Object.assign({}, sexTemplate, {
    line: 1,
    start: 20,
    end: 21
  }),
  Object.assign({}, expirationDateTemplate, {
    line: 1,
    start: 21,
    end: 27
  }),
  Object.assign({}, expirationDateCheckDigitTemplate, {
    line: 1,
    start: 27,
    end: 28,
    related: [
      {
        line: 1,
        start: 21,
        end: 27
      }
    ]
  }),
  {
    label: 'Optional field',
    field: 'optional',
    line: 1,
    start: 28,
    end: 35,
    parser: parseOptional
  },
  Object.assign({}, compositeCheckDigitTemplate, {
    line: 1,
    start: 35,
    end: 36,
    related: [
      {
        line: 1,
        start: 0,
        end: 10
      },
      {
        line: 1,
        start: 13,
        end: 20
      },
      {
        line: 1,
        start: 21,
        end: 35
      }
    ]
  })
].map(createFieldParser);

},{"../parsers/parseDocumentCodeId":"node_modules/mrz/src/parsers/parseDocumentCodeId.js","../parsers/parseOptional":"node_modules/mrz/src/parsers/parseOptional.js","./fieldTemplates":"node_modules/mrz/src/parse/fieldTemplates.js","./createFieldParser":"node_modules/mrz/src/parse/createFieldParser.js"}],"node_modules/mrz/src/parse/td2.js":[function(require,module,exports) {
'use strict';

const checkLines = require('./checkLines');
const getResult = require('./getResult');
const { TD2 } = require('../formats');
const TD2Fields = require('./td2Fields');

module.exports = function parseTD2(lines) {
  lines = checkLines(lines);
  if (lines.length !== 2) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 2 for ${TD2}`
    );
  }
  lines.forEach((line, index) => {
    if (line.length !== 36) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 36 for TD2`
      );
    }
  });
  return getResult(TD2, lines, TD2Fields);
};

},{"./checkLines":"node_modules/mrz/src/parse/checkLines.js","./getResult":"node_modules/mrz/src/parse/getResult.js","../formats":"node_modules/mrz/src/formats.js","./td2Fields":"node_modules/mrz/src/parse/td2Fields.js"}],"node_modules/mrz/src/parsers/parseDocumentCodePassport.js":[function(require,module,exports) {
'use strict';

module.exports = function parseDocumentCodePassport(source) {
  const first = source.charAt(0);
  if (first !== 'P') {
    throw new Error(
      `invalid document code: ${source}. First character must be P`
    );
  }

  const second = source.charAt(1);
  if (!second.match(/[A-Z<]/)) {
    throw new Error(
      `invalid document code: ${source}. Second character must be a letter or <`
    );
  }
  if (second === '<') {
    return {
      value: first,
      start: 0,
      end: 1
    };
  } else {
    return source;
  }
};

},{}],"node_modules/mrz/src/parsers/parsePersonalNumber.js":[function(require,module,exports) {
'use strict';

var parseText = require('./parseText');

module.exports = function parsePersonalNumber(source) {
  const value = parseText(source, /^[A-Z0-9<]+<*$/);
  return {
    value,
    start: 0,
    end: value.length
  };
};

},{"./parseText":"node_modules/mrz/src/parsers/parseText.js"}],"node_modules/mrz/src/parsers/parsePersonalNumberCheckDigit.js":[function(require,module,exports) {
'use strict';

var check = require('./check');
const cleanText = require('./cleanText');

module.exports = function parsePersonalNumberCheckDigit(
  checkDigit,
  personalNumber
) {
  const cleanNumber = cleanText(personalNumber);
  if (cleanNumber === '') {
    if (checkDigit !== '<' && checkDigit !== '0') {
      throw new Error(`invalid check digit ${checkDigit}: must be 0 or <`);
    } else {
      return checkDigit;
    }
  }
  check(personalNumber, checkDigit);
  return checkDigit;
};

},{"./check":"node_modules/mrz/src/parsers/check.js","./cleanText":"node_modules/mrz/src/parsers/cleanText.js"}],"node_modules/mrz/src/parse/td3Fields.js":[function(require,module,exports) {
'use strict';

const parseDocumentCode = require('../parsers/parseDocumentCodePassport');
const parsePersonalNumber = require('../parsers/parsePersonalNumber');
const parsePersonalNumberCheckDigit = require('../parsers/parsePersonalNumberCheckDigit');
const {
  documentCodeTemplate,
  issuingStateTemplate,
  lastNameTemplate,
  firstNameTemplate,
  documentNumberTemplate,
  documentNumberCheckDigitTemplate,
  nationalityTemplate,
  birthDateTemplate,
  birthDateCheckDigitTemplate,
  sexTemplate,
  expirationDateTemplate,
  expirationDateCheckDigitTemplate,
  compositeCheckDigitTemplate
} = require('./fieldTemplates');
const createFieldParser = require('./createFieldParser');

module.exports = [
  Object.assign({}, documentCodeTemplate, {
    line: 0,
    start: 0,
    end: 2,
    parser: parseDocumentCode
  }),
  Object.assign({}, issuingStateTemplate, {
    line: 0,
    start: 2,
    end: 5
  }),
  Object.assign({}, lastNameTemplate, {
    line: 0,
    start: 5,
    end: 44
  }),
  Object.assign({}, firstNameTemplate, {
    line: 0,
    start: 5,
    end: 44
  }),
  Object.assign({}, documentNumberTemplate, {
    line: 1,
    start: 0,
    end: 9
  }),
  Object.assign({}, documentNumberCheckDigitTemplate, {
    line: 1,
    start: 9,
    end: 10,
    related: [
      {
        line: 1,
        start: 0,
        end: 9
      }
    ]
  }),
  Object.assign({}, nationalityTemplate, {
    line: 1,
    start: 10,
    end: 13
  }),
  Object.assign({}, birthDateTemplate, {
    line: 1,
    start: 13,
    end: 19
  }),
  Object.assign({}, birthDateCheckDigitTemplate, {
    line: 1,
    start: 19,
    end: 20,
    related: [
      {
        line: 1,
        start: 13,
        end: 19
      }
    ]
  }),
  Object.assign({}, sexTemplate, {
    line: 1,
    start: 20,
    end: 21
  }),
  Object.assign({}, expirationDateTemplate, {
    line: 1,
    start: 21,
    end: 27
  }),
  Object.assign({}, expirationDateCheckDigitTemplate, {
    line: 1,
    start: 27,
    end: 28,
    related: [
      {
        line: 1,
        start: 21,
        end: 27
      }
    ]
  }),
  {
    label: 'Personal number',
    field: 'personalNumber',
    line: 1,
    start: 28,
    end: 42,
    parser: parsePersonalNumber
  },
  {
    label: 'Personal number check digit',
    field: 'personalNumberCheckDigit',
    line: 1,
    start: 42,
    end: 43,
    related: [
      {
        line: 1,
        start: 28,
        end: 42
      }
    ],
    parser: parsePersonalNumberCheckDigit
  },
  Object.assign({}, compositeCheckDigitTemplate, {
    line: 1,
    start: 43,
    end: 44,
    related: [
      {
        line: 1,
        start: 0,
        end: 10
      },
      {
        line: 1,
        start: 13,
        end: 20
      },
      {
        line: 1,
        start: 21,
        end: 43
      }
    ]
  })
].map(createFieldParser);

},{"../parsers/parseDocumentCodePassport":"node_modules/mrz/src/parsers/parseDocumentCodePassport.js","../parsers/parsePersonalNumber":"node_modules/mrz/src/parsers/parsePersonalNumber.js","../parsers/parsePersonalNumberCheckDigit":"node_modules/mrz/src/parsers/parsePersonalNumberCheckDigit.js","./fieldTemplates":"node_modules/mrz/src/parse/fieldTemplates.js","./createFieldParser":"node_modules/mrz/src/parse/createFieldParser.js"}],"node_modules/mrz/src/parse/td3.js":[function(require,module,exports) {
'use strict';

const checkLines = require('./checkLines');
const getResult = require('./getResult');
const { TD3 } = require('../formats');
const TD3Fields = require('./td3Fields');

module.exports = function parseTD3(lines) {
  lines = checkLines(lines);
  if (lines.length !== 2) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 2 for ${TD3}`
    );
  }
  lines.forEach((line, index) => {
    if (line.length !== 44) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 44 for TD3`
      );
    }
  });
  return getResult(TD3, lines, TD3Fields);
};

},{"./checkLines":"node_modules/mrz/src/parse/checkLines.js","./getResult":"node_modules/mrz/src/parse/getResult.js","../formats":"node_modules/mrz/src/formats.js","./td3Fields":"node_modules/mrz/src/parse/td3Fields.js"}],"node_modules/mrz/src/parsers/swissDrivingLicense/parseLanguageCode.js":[function(require,module,exports) {
'use strict';

module.exports = function parseLanguageCode(languageCode) {
  switch (languageCode) {
    case 'D':
    case 'F':
    case 'I':
    case 'R':
      return languageCode;
    default:
      throw new Error(
        `invalid languageCode code: ${languageCode}. Must be D, F, I or R`
      );
  }
};

},{}],"node_modules/mrz/src/parsers/swissDrivingLicense/parseDocumentNumber.js":[function(require,module,exports) {
'use strict';

const parseLanguageCode = require('./parseLanguageCode');

module.exports = function parseDocumentNumber(source) {
  // swiss driving license number
  var first = source.substring(0, 3);
  var second = source.substring(3, 6);
  var languageCode = source.charAt(6);
  var end = source.substring(7);

  if (!first.match(/^[A-Z0-9]{3}$/)) {
    throw new Error(
      `invalid document number: ${source}. Must start with three alphanumeric digits`
    );
  }
  if (!second.match(/^[0-9]{3}$/)) {
    throw new Error(
      `invalid document number: ${source}. Must have numeric digits in positions 4, 5 and 6`
    );
  }
  if (end !== '<<') {
    throw new Error(`invalid document number: ${source}. Must end with <<`);
  }

  // calling this method to throw if languageCode invalid
  parseLanguageCode(languageCode);
  return {
    value: source.substring(0, 7),
    start: 0,
    end: 7
  };
};

},{"./parseLanguageCode":"node_modules/mrz/src/parsers/swissDrivingLicense/parseLanguageCode.js"}],"node_modules/mrz/src/parsers/swissDrivingLicense/parseDocumentCode.js":[function(require,module,exports) {
'use strict';

module.exports = function parseDocumentCode(source) {
  if (source !== 'FA') {
    throw new Error(`invalid document code: ${source}. Must be FA`);
  }
  return source;
};

},{}],"node_modules/mrz/src/parsers/swissDrivingLicense/parseIssuingState.js":[function(require,module,exports) {
'use strict';

module.exports = function parseIssuingState(source) {
  if (source !== 'CHE' && source !== 'LIE') {
    throw new Error(`invalid state code: ${source}. Must be CHE or LIE`);
  }
  return source;
};

},{}],"node_modules/mrz/src/parsers/parseNumber.js":[function(require,module,exports) {
'use strict';

module.exports = function parseNumber(source) {
  if (!source.match(/^[0-9]+$/)) {
    throw new Error(`invalid number: ${source}`);
  }

  return source;
};

},{}],"node_modules/mrz/src/parsers/swissDrivingLicense/checkSeparator.js":[function(require,module,exports) {
'use strict';

module.exports = function checkSeparator(source) {
  if (!source.match(/^<*$/)) {
    throw new Error(
      `invalid separator: ${source}. Must be composed only of "<"`
    );
  }
  return source;
};

},{}],"node_modules/mrz/src/parse/swissDrivingLicenseFields.js":[function(require,module,exports) {
'use strict';

const parseDocumentNumber = require('../parsers/swissDrivingLicense/parseDocumentNumber');
const parseLanguageCode = require('../parsers/swissDrivingLicense/parseLanguageCode');
const parseDocumentCode = require('../parsers/swissDrivingLicense/parseDocumentCode');
const parseIssuingState = require('../parsers/swissDrivingLicense/parseIssuingState');
const parseNumber = require('../parsers/parseNumber');
const checkSeparator = require('../parsers/swissDrivingLicense/checkSeparator');
const {
  documentNumberTemplate,
  documentCodeTemplate,
  issuingStateTemplate,
  birthDateTemplate,
  lastNameTemplate,
  firstNameTemplate
} = require('./fieldTemplates');
const createFieldParser = require('./createFieldParser');

module.exports = [
  Object.assign({}, documentNumberTemplate, {
    line: 0,
    start: 0,
    end: 9,
    parser: parseDocumentNumber
  }),
  {
    label: 'Language code',
    field: 'languageCode',
    line: 0,
    start: 6,
    end: 7,
    parser: parseLanguageCode
  },
  Object.assign({}, documentCodeTemplate, {
    line: 1,
    start: 0,
    end: 2,
    parser: parseDocumentCode
  }),
  Object.assign({}, issuingStateTemplate, {
    line: 1,
    start: 2,
    end: 5,
    parser: parseIssuingState
  }),
  {
    label: 'PIN code',
    field: 'pinCode',
    line: 1,
    start: 5,
    end: 14,
    parser: parseNumber
  },
  {
    label: 'Version number',
    field: 'versionNumber',
    line: 1,
    start: 14,
    end: 17,
    parser: parseNumber
  },
  {
    label: 'Separator 1',
    field: null,
    line: 1,
    start: 17,
    end: 19,
    parser: checkSeparator
  },
  Object.assign({}, birthDateTemplate, {
    line: 1,
    start: 19,
    end: 25
  }),
  {
    label: 'Separator 2',
    field: null,
    line: 1,
    start: 25,
    end: 30,
    parser: checkSeparator
  },
  Object.assign({}, lastNameTemplate, {
    line: 2,
    start: 0,
    end: 30
  }),
  Object.assign({}, firstNameTemplate, {
    line: 2,
    start: 0,
    end: 30
  })
].map(createFieldParser);

},{"../parsers/swissDrivingLicense/parseDocumentNumber":"node_modules/mrz/src/parsers/swissDrivingLicense/parseDocumentNumber.js","../parsers/swissDrivingLicense/parseLanguageCode":"node_modules/mrz/src/parsers/swissDrivingLicense/parseLanguageCode.js","../parsers/swissDrivingLicense/parseDocumentCode":"node_modules/mrz/src/parsers/swissDrivingLicense/parseDocumentCode.js","../parsers/swissDrivingLicense/parseIssuingState":"node_modules/mrz/src/parsers/swissDrivingLicense/parseIssuingState.js","../parsers/parseNumber":"node_modules/mrz/src/parsers/parseNumber.js","../parsers/swissDrivingLicense/checkSeparator":"node_modules/mrz/src/parsers/swissDrivingLicense/checkSeparator.js","./fieldTemplates":"node_modules/mrz/src/parse/fieldTemplates.js","./createFieldParser":"node_modules/mrz/src/parse/createFieldParser.js"}],"node_modules/mrz/src/parse/swissDrivingLicense.js":[function(require,module,exports) {
'use strict';

const checkLines = require('./checkLines');
const getResult = require('./getResult');
const { SWISS_DRIVING_LICENSE } = require('../formats');
const swissDrivingLicenseFields = require('./swissDrivingLicenseFields');

module.exports = function parseSwissDrivingLicense(lines) {
  lines = checkLines(lines);
  if (lines.length !== 3) {
    throw new Error(
      `invalid number of lines: ${
        lines.length
      }: Must be 3 for ${SWISS_DRIVING_LICENSE}`
    );
  }
  if (lines[0].length !== 9) {
    throw new Error(
      `invalid number of characters for line 1: ${
        lines[0].length
      }. Must be 9 for ${SWISS_DRIVING_LICENSE}`
    );
  }
  if (lines[1].length !== 30) {
    throw new Error(
      `invalid number of characters for line 2: ${
        lines[1].length
      }. Must be 30 for ${SWISS_DRIVING_LICENSE}`
    );
  }

  if (lines[2].length !== 30) {
    throw new Error(
      `invalid number of characters for line 3: ${
        lines[2].length
      }. Must be 30 for ${SWISS_DRIVING_LICENSE}`
    );
  }
  return getResult(SWISS_DRIVING_LICENSE, lines, swissDrivingLicenseFields);
};

},{"./checkLines":"node_modules/mrz/src/parse/checkLines.js","./getResult":"node_modules/mrz/src/parse/getResult.js","../formats":"node_modules/mrz/src/formats.js","./swissDrivingLicenseFields":"node_modules/mrz/src/parse/swissDrivingLicenseFields.js"}],"node_modules/mrz/src/parsers/parseAlpha.js":[function(require,module,exports) {
'use strict';

const cleanText = require('./cleanText');

module.exports = function parseAlpha(source) {
  if (!source.match(/^[A-Z<]+$/)) {
    throw new Error(
      `invalid text: ${source}. Must be only alphabetical with <`
    );
  }
  return cleanText(source);
};

},{"./cleanText":"node_modules/mrz/src/parsers/cleanText.js"}],"node_modules/mrz/src/parse/frenchNationalIdFields.js":[function(require,module,exports) {
'use strict';

const parseAlpha = require('../parsers/parseAlpha');
const parseDocumentCode = require('../parsers/parseDocumentCodeId');
const parseOptional = require('../parsers/parseOptional');
const {
  documentCodeTemplate,
  issuingStateTemplate,
  lastNameTemplate,
  issueDateTemplate,
  firstNameTemplate,
  documentNumberTemplate,
  documentNumberCheckDigitTemplate,
  birthDateTemplate,
  birthDateCheckDigitTemplate,
  sexTemplate,
  compositeCheckDigitTemplate
} = require('./fieldTemplates');
const createFieldParser = require('./createFieldParser');

module.exports = [
  Object.assign({}, documentCodeTemplate, {
    line: 0,
    start: 0,
    end: 2,
    parser: parseDocumentCode
  }),
  Object.assign({}, issuingStateTemplate, {
    line: 0,
    start: 2,
    end: 5
  }),
  Object.assign({}, lastNameTemplate, {
    line: 0,
    start: 5,
    end: 30,
    parser: parseAlpha
  }),
  {
    label: 'Administrative code',
    field: 'administrativeCode',
    line: 0,
    start: 30,
    end: 36,
    parser: parseOptional
  },
  Object.assign({}, issueDateTemplate, {
    line: 1,
    start: 0,
    end: 4
  }),
  {
    label: 'Administrative code 2',
    field: 'administrativeCode2',
    line: 1,
    start: 4,
    end: 7,
    parser: parseOptional
  },
  Object.assign({}, documentNumberTemplate, {
    line: 1,
    start: 7,
    end: 12
  }),
  Object.assign({}, documentNumberCheckDigitTemplate, {
    line: 1,
    start: 12,
    end: 13,
    related: [
      {
        line: 1,
        start: 0,
        end: 12
      }
    ]
  }),
  Object.assign({}, firstNameTemplate, {
    line: 1,
    start: 13,
    end: 27,
    parser: parseAlpha
  }),
  Object.assign({}, birthDateTemplate, {
    line: 1,
    start: 27,
    end: 33
  }),
  Object.assign({}, birthDateCheckDigitTemplate, {
    line: 1,
    start: 33,
    end: 34,
    related: [
      {
        line: 1,
        start: 27,
        end: 33
      }
    ]
  }),
  Object.assign({}, sexTemplate, {
    line: 1,
    start: 34,
    end: 35
  }),
  Object.assign({}, compositeCheckDigitTemplate, {
    line: 1,
    start: 35,
    end: 36,
    related: [
      {
        line: 0,
        start: 0,
        end: 36
      },
      {
        line: 1,
        start: 0,
        end: 35
      }
    ]
  })
].map(createFieldParser);

},{"../parsers/parseAlpha":"node_modules/mrz/src/parsers/parseAlpha.js","../parsers/parseDocumentCodeId":"node_modules/mrz/src/parsers/parseDocumentCodeId.js","../parsers/parseOptional":"node_modules/mrz/src/parsers/parseOptional.js","./fieldTemplates":"node_modules/mrz/src/parse/fieldTemplates.js","./createFieldParser":"node_modules/mrz/src/parse/createFieldParser.js"}],"node_modules/mrz/src/parse/frenchNationalId.js":[function(require,module,exports) {
'use strict';

const checkLines = require('./checkLines');
const getResult = require('./getResult');
const { FRENCH_NATIONAL_ID } = require('../formats');
const frenchNationalIdFields = require('./frenchNationalIdFields');

module.exports = function parseFrenchNationalId(lines) {
  lines = checkLines(lines);
  if (lines.length !== 2) {
    throw new Error(
      `invalid number of lines: ${
        lines.length
      }: Must be 2 for ${FRENCH_NATIONAL_ID}`
    );
  }
  lines.forEach((line, index) => {
    if (line.length !== 36) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 36 for ${FRENCH_NATIONAL_ID}`
      );
    }
  });
  return getResult(FRENCH_NATIONAL_ID, lines, frenchNationalIdFields);
};

},{"./checkLines":"node_modules/mrz/src/parse/checkLines.js","./getResult":"node_modules/mrz/src/parse/getResult.js","../formats":"node_modules/mrz/src/formats.js","./frenchNationalIdFields":"node_modules/mrz/src/parse/frenchNationalIdFields.js"}],"node_modules/mrz/src/parse/parsers.js":[function(require,module,exports) {
'use strict';

const parseTD1 = require('./td1');
const parseTD2 = require('./td2');
const parseTD3 = require('./td3');
const parseSwissDrivingLicense = require('./swissDrivingLicense');
const parseFrenchNationalId = require('./frenchNationalId');

module.exports = {
  TD1: parseTD1,
  TD2: parseTD2,
  TD3: parseTD3,
  SWISS_DRIVING_LICENSE: parseSwissDrivingLicense,
  FRENCH_NATIONAL_ID: parseFrenchNationalId
};

},{"./td1":"node_modules/mrz/src/parse/td1.js","./td2":"node_modules/mrz/src/parse/td2.js","./td3":"node_modules/mrz/src/parse/td3.js","./swissDrivingLicense":"node_modules/mrz/src/parse/swissDrivingLicense.js","./frenchNationalId":"node_modules/mrz/src/parse/frenchNationalId.js"}],"node_modules/mrz/src/parse/parse.js":[function(require,module,exports) {
'use strict';

const checkLines = require('./checkLines');
const formats = require('../formats');
const parsers = require('./parsers');

function parseMRZ(lines) {
  lines = checkLines(lines);
  switch (lines.length) {
    case 2:
    case 3: {
      switch (lines[0].length) {
        case 30:
          return parsers.TD1(lines);
        case 36: {
          const endLine1 = lines[0].substr(30, 36);
          if (endLine1.match(/[0-9]/)) {
            return parsers.FRENCH_NATIONAL_ID(lines);
          } else {
            return parsers.TD2(lines);
          }
        }
        case 44:
          return parsers.TD3(lines);
        case 9:
          return parsers.SWISS_DRIVING_LICENSE(lines);
        default:
          throw new Error(
            'unrecognized document format. First line of input must have 30 (TD1), 36 (TD2 or French National Id), 44 (TD3) or 9 (Swiss Driving License) characters'
          );
      }
    }
    default:
      throw new Error(
        `unrecognized document format. Input must have two or three lines, found${
          lines.length
        }`
      );
  }
}

for (const format in formats) {
  parseMRZ[format] = parsers[format];
}

module.exports = parseMRZ;

},{"./checkLines":"node_modules/mrz/src/parse/checkLines.js","../formats":"node_modules/mrz/src/formats.js","./parsers":"node_modules/mrz/src/parse/parsers.js"}],"node_modules/mrz/src/index.js":[function(require,module,exports) {
'use strict';

const states = require('./generated/states');
const formats = require('./formats');
const parse = require('./parse/parse');

module.exports = {
  states,
  formats,
  parse
};

},{"./generated/states":"node_modules/mrz/src/generated/states.js","./formats":"node_modules/mrz/src/formats.js","./parse/parse":"node_modules/mrz/src/parse/parse.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var EXIF = _interopRequireWildcard(require("exif-js"));

var _croppie = _interopRequireDefault(require("croppie"));

var _mrz = require("mrz");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * Copyright (C) 2018 Urs Wolfer
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var TESSERACT_CONFIG = {
  lang: "OCRB",
  load_system_dawg: "F",
  load_freq_dawg: "F",
  load_unambig_dawg: "F",
  load_punc_dawg: "F",
  load_number_dawg: "F",
  load_fixed_length_dawgs: "F",
  load_bigram_dawg: "F",
  wordrec_enable_assoc: "F",
  tessedit_pageseg_mode: "6",
  tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<"
};
window.EXIF = EXIF; // requied by croppie

window.Tesseract = Tesseract.create({
  langPath: "https://cdn.jsdelivr.net/gh/uwolfer/tesseract-mrz@master/lang/"
});
var progress = document.getElementById("progress");
var displayArea = document.getElementById("document");
var contentArea = document.getElementById("document-content");
var checkArea = document.getElementById("document-check"); // warm up tessearact

window.Tesseract.recognize(document.createElement("canvas"), TESSERACT_CONFIG).progress(function (message) {
  console.log(message);
  progress.innerText = "".concat(Math.round(message.progress * 100), "%");
});
var croppie = new _croppie.default(displayArea, {
  url: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
  // transparent 1px
  viewport: {
    width: 900,
    height: 220
  },
  enableExif: true,
  showZoomer: false,
  enforceBoundary: false,
  enableResize: true,
  enableOrientation: true
});

var handleFile = function handleFile(event) {
  var input = event.target;
  var file = input.files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
    return croppie.bind(e.target.result);
  };

  reader.readAsDataURL(file);
};

var rotate = function rotate() {
  return croppie.rotate(90);
};

var detect = function detect() {
  contentArea.value = "";
  croppie.result().then(function (r) {
    window.Tesseract.recognize(r, TESSERACT_CONFIG).progress(function (message) {
      console.log(message);
      progress.innerText = "".concat(Math.round(message.progress * 100), "%");
    }).then(function (result) {
      console.log(result);
      var lines = result.lines.map(function (line) {
        return line.text;
      }).map(function (text) {
        return text.replace(/ |\r\n|\r|\n/g, "");
      }).filter(function (text) {
        return text.includes("<<");
      }).filter(function (text) {
        return text.length < 48;
      }).filter(function (text) {
        return text.length > 28;
      });
      console.log(lines);
      contentArea.value = lines.join("\r\n");
      check();
    }).catch(function (err) {
      return console.error(err);
    });
  });
};

var check = function check() {
  var lines = contentArea.value.split("\n");
  console.log(lines);

  try {
    var result = lines ? (0, _mrz.parse)(lines) : {
      valid: false
    };
    console.log(result);
    checkArea.value = JSON.stringify(result, null, 2);
    contentArea.className = result.valid ? "valid" : "invalid";
  } catch (e) {
    checkArea.value = e;
    contentArea.className = "invalid";
  }
};

var copyToClipboard = function copyToClipboard(e) {
  e.target.select();
  document.execCommand("copy");
};

document.getElementById("fileInput").addEventListener("change", handleFile);
document.getElementById("rotate").addEventListener("click", rotate);
document.getElementById("scan").addEventListener("click", detect);
document.getElementById("check").addEventListener("click", check);
contentArea.addEventListener("click", copyToClipboard);
checkArea.addEventListener("click", copyToClipboard);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js").then(function () {
    return console.log("Service-Worker-Registered");
  });
}
},{"exif-js":"node_modules/exif-js/exif.js","croppie":"node_modules/croppie/croppie.js","mrz":"node_modules/mrz/src/index.js","./../service-worker.js":[["service-worker.js","service-worker.js"],"service-worker.js.map","service-worker.js"]}],"../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "35613" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map