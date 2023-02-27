const axios = require('axios');
const fs = require('fs');
const elevenLabsAPI = 'https://api.elevenlabs.io/v1';

// text-to-speech functions
const textToSpeech = async (apiKey, voiceID, fileName, textInput, stability, similarityBoost) => {
    try {

      if (!apiKey || !voiceID || !fileName || !textInput){
        console.log("ERR: Missing parameter");
      }

      const voiceURL = `${elevenLabsAPI}/text-to-speech/${voiceID}`;
      const stabilityValue = stability ? stability : 0;
      const similarityBoostValue = similarityBoost ? similarityBoost : 0;

      const response = await axios({
        method: 'POST',
        url: voiceURL,
        data: { 
            text: textInput,
            voice_settings: {
                stability: stabilityValue,
                similarity_boost: similarityBoostValue
              }
        },
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        responseType: 'stream'
      });

      response.data.pipe(fs.createWriteStream(fileName));

      return {status: 'OK'};

    } catch (error) {
      console.error(error);
    }
  };

const textToSpeechStream = async (apiKey, voiceID, textInput, stability, similarityBoost) => {
  try {

    if (!apiKey || !voiceID || !textInput){
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${elevenLabsAPI}/text-to-speech/${voiceID}/stream`;
    const stabilityValue = stability ? stability : 0;
    const similarityBoostValue = similarityBoost ? similarityBoost : 0;

    const response = await axios({
      method: 'POST',
      url: voiceURL,
      data: { 
          text: textInput,
          voice_settings: {
              stability: stabilityValue,
              similarity_boost: similarityBoostValue
            }
      },
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      responseType: 'stream'
    });

    return response.data;

  } catch (error) {
    console.error(error);
  }
};

// voices functions
const getVoices = async (apiKey) => {
  try {

    if (!apiKey){
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${elevenLabsAPI}/voices`;

    const response = await axios({
      method: 'GET',
      url: voiceURL,
      headers: {
        'xi-api-key': apiKey
      }
    });

    return response.data;

  } catch (error) {
    console.error(error);
  }
};

const getDefaultVoiceSettings = async () => {
  try {

    const voiceURL = `${elevenLabsAPI}/voices/settings/default`;

    const response = await axios({
      method: 'GET',
      url: voiceURL
    });

    return response.data;

  } catch (error) {
    console.error(error);
  }
};

const getVoiceSettings = async (apiKey, voiceID) => {
  try {

    if (!apiKey || !voiceID){
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${elevenLabsAPI}/voices/${voiceID}/settings`;

    const response = await axios({
      method: 'GET',
      url: voiceURL,
      headers: {
        'xi-api-key': apiKey
      }
    });

    return response.data;

  } catch (error) {
    console.error(error);
  }
};

const getVoice = async (apiKey, voiceID) => {
  try {

    if (!apiKey || !voiceID){
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${elevenLabsAPI}/voices/${voiceID}`;

    const response = await axios({
      method: 'GET',
      url: voiceURL,
      headers: {
        'xi-api-key': apiKey
      }
    });

    return response.data;

  } catch (error) {
    console.error(error);
  }
};

const deleteVoice = async (apiKey, voiceID) => {
  try {

    if (!apiKey || !voiceID){
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${elevenLabsAPI}/voices/${voiceID}`;

    const response = await axios({
      method: 'DELETE',
      url: voiceURL,
      headers: {
        'xi-api-key': apiKey
      }
    });

    return response.data;

  } catch (error) {
    console.error(error);
  }
};

const editVoiceSettings = async (apiKey, voiceID, stability, similarityBoost) => {
  try {

    if (!apiKey || !voiceID){
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${elevenLabsAPI}/voices/${voiceID}/settings/edit`;
    const stabilityValue = stability ? stability : 0;
    const similarityBoostValue = similarityBoost ? similarityBoost : 0;

    const response = await axios({
      method: 'POST',
      url: voiceURL,
      data: {
        stability: stabilityValue,
        similarity_boost: similarityBoostValue
      },
      headers: {
        'xi-api-key': apiKey
      }
    });

    return response.data;

  } catch (error) {
    console.error(error);
  }
};

module.exports = {
    textToSpeech: textToSpeech,
    textToSpeechStream: textToSpeechStream,
    getVoices: getVoices,
    getDefaultVoiceSettings: getDefaultVoiceSettings,
    getVoiceSettings: getVoiceSettings,
    getVoice: getVoice,
    deleteVoice: deleteVoice,
    editVoiceSettings: editVoiceSettings
};