import React, { useState, useEffect } from "react";
import axios from "axios";

const countryCodeList = [
  "ae",
  "ar",
  "at",
  "au",
  "be",
  "bg",
  "br",
  "ca",
  "ch",
  "cn",
  "co",
  "cu",
  "cz",
  "de",
  "eg",
  "fr",
  "gb",
  "gr",
  "hk",
  "hu",
  "id",
  "ie",
  "il",
  "in",
  "it",
  "jp",
  "kr",
  "lt",
  "lv",
  "ma",
  "mx",
  "my",
  "ng",
  "nl",
  "no",
  "nz",
  "ph",
  "pl",
  "pt",
  "ro",
  "rs",
  "ru",
  "sa",
  "se",
  "sg",
  "si",
  "sk",
  "th",
  "tr",
  "tw",
  "ua",
  "us",
  "ve",
  "za",
];

async function IPGeolocation() {
  const [countryCode, setCountryCode] = useState(null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIPData = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        let detectedCountryCode = response.data.country_code.toLowerCase();

        // Check if the detected country code is in the list, otherwise set to 'us'
        if (!countryCodeList.includes(detectedCountryCode)) {
          detectedCountryCode = "us";
        }

        setCountryCode(detectedCountryCode);
      } catch (err) {
        // setError("Failed to fetch IP geolocation data");
        console.error(err);
      }
    };

    fetchIPData();
  }, []);

  return countryCode;
}

export default IPGeolocation;
