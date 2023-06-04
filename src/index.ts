import express from 'express';
import cors from 'cors';
import http from 'http';
import { TimeSeriesResponse } from './types';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const app = express();
app.use(cors());

const port = 3000;

// Serve logo.png
app.get('/logo.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets/logo.png'), { headers: { 'Content-Type': 'image/png' } });
});

// Serve ai-plugin.json
app.get('/.well-known/ai-plugin.json', (req, res) => {
  res.sendFile(path.join(__dirname, '.well-known', 'ai-plugin.json'), { headers: { 'Content-Type': 'application/json' } });
});

// Serve openapi.yaml
app.get('/openapi.yaml', (req, res) => {
  res.sendFile(path.join(__dirname, 'openapi.yaml'), { headers: { 'Content-Type': 'text/yaml' } });
});

app.get('/timeseries', async (req, res) => {
    const { assetKey, start, end, interval } = req.query;
  
    if (!assetKey || !start || !end || !interval) {
      return res.status(400).send('Missing required query parameters');
    }
  
    console.log(req.query);
    console.log(assetKey);
    console.log(start);
    console.log(end);
    console.log(interval);
  
    try {
      const response = await axios.get(
        `https://data.messari.io/api/v1/assets/${assetKey}/metrics/price/time-series?start=${start}&end=${end}&interval=${interval}`
      );
  
      const json = response.data as TimeSeriesResponse;
      console.log(json.data);
      res.send(json.data);
    } catch (error) {
      console.error('Error fetching data from Messari API:', error);
      res.status(500).send('Error fetching data from Messari API');
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
