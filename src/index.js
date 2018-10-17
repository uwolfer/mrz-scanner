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

import * as EXIF from "exif-js";
import Croppie from "croppie";
import { parse } from "mrz";

const TESSERACT_CONFIG = {
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
  langPath: "https://exteris.github.io/tesseract-mrz/lang/"
});

const progress = document.getElementById("progress");
const displayArea = document.getElementById("document");
const contentArea = document.getElementById("document-content");
const checkArea = document.getElementById("document-check");

// warm up tessearact
window.Tesseract.recognize(
  document.createElement("canvas"),
  TESSERACT_CONFIG
).progress(message => {
  console.log(message);
  progress.innerText = `${Math.round(message.progress * 100)}%`;
});

const croppie = new Croppie(displayArea, {
  url:
    "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", // transparent 1px
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

const handleFile = event => {
  const input = event.target;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = e => croppie.bind(e.target.result);
  reader.readAsDataURL(file);
};

const rotate = () => croppie.rotate(90);

const detect = () => {
  contentArea.value = "";
  croppie.result().then(r => {
    window.Tesseract.recognize(r, TESSERACT_CONFIG)
      .progress(message => {
        console.log(message);
        progress.innerText = `${Math.round(message.progress * 100)}%`;
      })
      .then(result => {
        console.log(result);
        const lines = result.lines
          .map(line => line.text)
          .map(text => text.replace(/ |\r\n|\r|\n/g, ""))
          .filter(text => text.includes("<<"))
          .filter(text => text.length < 48)
          .filter(text => text.length > 28);
        console.log(lines);
        contentArea.value = lines.join("\r\n");
        check();
      })
      .catch(err => console.error(err));
  });
};

const check = () => {
  const lines = contentArea.value.split("\n");
  console.log(lines);
  try {
    const result = lines ? parse(lines) : { valid: false };
    console.log(result);
    checkArea.value = JSON.stringify(result, null, 2);
    contentArea.className = result.valid ? "valid" : "invalid";
  } catch (e) {
    checkArea.value = e;
    contentArea.className = "invalid";
  }
};

const copyToClipboard = e => {
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
  navigator.serviceWorker
    .register("../service-worker.js")
    .then(() => console.log("Service-Worker-Registered"));
}
