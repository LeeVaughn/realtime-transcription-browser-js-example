const express = require('express');
const axios = require('axios');
const cors = require('cors');
const asyncHandler = require('express-async-handler');
const { response } = require('express');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', asyncHandler(async (req, res, next) => {
  try {
    const response = await axios.post('https://api.assemblyai.com/v2/realtime/token', // use account token to get a temp user token
      { expires_in: 3600 }, // can set a TTL timer in seconds.
      { headers: { authorization: 'YOUR-AAI-API-KEY' } }); // AssemblyAI API Key goes here
    const { data } = response;
    res.json(data);
  } catch (error) {
    const {response: {status, data}} = error;
    res.status(status).json(data);
  }
}));

app.set('port', 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${server.address().port}`);
});
