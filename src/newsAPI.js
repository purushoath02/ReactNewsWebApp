import React, { useState, useEffect } from "react";
import axios from "axios";
const apiKey = "";
const apiUrl = `https://newsapi.org/v2/top-headlines`;

export async function GetSearchResult(query) {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: query,
        apiKey: apiKey,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}

export default GetSearchResult;

export async function GetTopResults(countrycode) {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        country: countrycode,
        apiKey: apiKey,
      },
    });
    return response.data.articles;
  } catch (err) {
    console.error(err);
  }
}
