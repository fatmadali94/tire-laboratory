import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/newEntries`;

export const fetchNewEntries = createAsyncThunk(
  "newEntries/fetchNewEntries",
  async () => {
    const res = await axios.get(BASE_URL);
    return res.data.sort((a, b) => b.entry_code - a.entry_code).slice(0, 20);
  }
);

export const searchNewEntries = createAsyncThunk(
  "newEntries/searchNewEntries",
  async (searchQuery) => {
    if (!searchQuery.trim()) {
      // If empty search, return all entries (or you could return empty array)
      const res = await axios.get(BASE_URL);
      return res.data.sort((a, b) => b.entry_code - a.entry_code).slice(0, 20);
    }

    const res = await axios.get(
      `${BASE_URL}/search?q=${encodeURIComponent(searchQuery)}`
    );
    return res.data;
  }
);

export const addNewEntry = createAsyncThunk(
  "newEntries/addNewEntry",
  async (newEntry) => {
    const res = await axios.post(BASE_URL, newEntry);
    return res.data;
  }
);

export const updateNewEntry = createAsyncThunk(
  "newEntries/updateNewEntry",
  async ({ entry_code, newEntry }) => {
    await axios.put(`${BASE_URL}/${entry_code}`, newEntry);
  }
);

export const deleteNewEntry = createAsyncThunk(
  "newEntries/deleteNewEntry",
  async (entry_code) => {
    await axios.delete(`${BASE_URL}/${entry_code}`);
  }
);
