# mrz-scanner

mrz-scanner is a PWA (progressive web app) for recognizing MRZ lines
used on ID cards and passports. All processing is done offline - no
data for scanning will ever leave your computer.

[Try it!](https://uwolfer.github.io/mrz-scanner/)


## Dependencies

* [Tesseract.js](https://github.com/naptha/tesseract.js) (for text recognition / OCR)
* [Croppie](https://github.com/Foliotek/Croppie) (for zooming and range selection)
* [mrz](https://github.com/cheminfo-js/mrz) (for parsing and validating MRZ lines)
* [exif-js](https://github.com/exif-js/exif-js) (Croppie uses it for proper initial image orientation)

The icon has been taken from [Font Awesome](https://github.com/FortAwesome/Font-Awesome).


## Development

You can run this app with parcel:
```bash
parcel index.html
```

The deployment build can be created with:
```bash
parcel build index.html --public-url ./
```

## Ideas for improvements (Pull Requests are welcome!)

* Wrap as reusable component (which can be used in other apps)
* Embed Tesseract.js (not that easy because of the worker setup)
* Better support for smaller displays
* Improved display of MRZ results


## Versioning

This library uses [SemVer](http://semver.org/) for versioning.


## Authors

* **Urs Wolfer** - *Maintainer*


## License

This project is licensed under the GNU GPL v3.0 - see the [LICENSE.md](LICENSE.md) file for details.
