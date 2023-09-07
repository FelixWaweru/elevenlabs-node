const axios = require("axios");
const fs = require("fs-extra");
const elevenLabsAPI = "https://api.elevenlabs.io/v1";

/**

Function that converts text to speech and saves the audio file to the specified file name.

@param {string} apiKey - The API key to authenticate the request.

@param {string} voiceID - The ID of the voice to use for the text-to-speech conversion.

@param {string} fileName - The name of the file to save the audio data to.

@param {string} textInput - The text to convert to speech.

@param {number} stability - The stability setting for the voice.

@param {number} similarityBoost - The similarity boost setting for the voice.

@param {string} modelId - The model to use for the text-to-speech conversion. If null, it will use elevenlab's default model.

@returns {Object} - An object containing the status of the operation.
*/
const textToSpeech = async (
  apiKey,
  voiceID,
  fileName,
  textInput,
  stability,
  similarityBoost,
  modelId
) => {
  try {
    if (!apiKey || !voiceID || !fileName || !textInput) {
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${elevenLabsAPI}/text-to-speech/${voiceID}`;
    const stabilityValue = stability ? stability : 0;
    const similarityBoostValue = similarityBoost ? similarityBoost : 0;

    const response = await axios({
      method: "POST",
      url: voiceURL,
      data: {
        text: textInput,
        voice_settings: {
          stability: stabilityValue,
          similarity_boost: similarityBoostValue,
        },
        model_id: modelId ? modelId : undefined,
      },
      headers: {
        Accept: "audio/mpeg",
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      responseType: "stream",
    });

    response.data.pipe(fs.createWriteStream(fileName));

    const writeStream = fs.createWriteStream(fileName);
    response.data.pipe(writeStream);

    return new Promise((resolve, reject) => {
      const responseJson = { status: "ok", fileName: fileName };
      writeStream.on('finish', () => resolve(responseJson));
    
      writeStream.on('error', reject);
    });
  } catch (error) {
    console.log(error);
  }
};

/**

Function that converts text to speech and returns a readable stream of the audio data.

@param {string} apiKey - The API key to authenticate the request.

@param {string} voiceID - The ID of the voice to use for the text-to-speech conversion.

@param {string} textInput - The text to convert to speech.

@param {number} stability - The stability setting for the voice.

@param {number} similarityBoost - The similarity boost setting for the voice.

@param {string} modelId - The model to use for the text-to-speech conversion. If null, it will use elevenlab's default model.

@param {string} responseType - The response type for the text-to-speech function (arrayBuffer, stream, etc). If null, it will use 'stream' by default.

@returns {Object} - A readable stream of the audio data.
*/
const textToSpeechStream = async (
  apiKey,
  voiceID,
  textInput,
  stability,
  similarityBoost,
  modelId,
  responseType
) => {
  try {
    if (!apiKey || !voiceID || !textInput) {
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${elevenLabsAPI}/text-to-speech/${voiceID}/stream`;
    const stabilityValue = stability ? stability : 0;
    const similarityBoostValue = similarityBoost ? similarityBoost : 0;

    const response = await axios({
      method: "POST",
      url: voiceURL,
      data: {
        text: textInput,
        voice_settings: {
          stability: stabilityValue,
          similarity_boost: similarityBoostValue,
        },
        model_id: modelId ? modelId : undefined,
      },
      headers: {
        Accept: "audio/mpeg",
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      responseType: responseType ? responseType : "stream"
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**

Function that returns an object containing the details for all the voices.

@param {string} apiKey - The API key to authenticate the request.

@returns {Object} - An object containing the list of voices and their details.
*/
const getVoices = async (apiKey) => {
  try {
    if (!apiKey) {
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${elevenLabsAPI}/voices`;

    const response = await axios({
      method: "GET",
      url: voiceURL,
      headers: {
        "xi-api-key": apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**

Function that returns an object containing the default settings for the voices.

@returns {Object} - An object containing the default settings for the voices.
*/
const getDefaultVoiceSettings = async () => {
  try {
    const voiceURL = `${elevenLabsAPI}/voices/settings/default`;

    const response = await axios({
      method: "GET",
      url: voiceURL,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**

Function that returns an object containing the settings of the specified voice.

@param {string} apiKey - The API key to authenticate the request.

@param {string} voiceID - The ID of the voice to use for the text-to-speech conversion.

@returns {Object} - An object containing the settings of the specified voice.
*/
const getVoiceSettings = async (apiKey, voiceID) => {
  try {
    if (!apiKey || !voiceID) {
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${elevenLabsAPI}/voices/${voiceID}/settings`;

    const response = await axios({
      method: "GET",
      url: voiceURL,
      headers: {
        "xi-api-key": apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**

Function that returns an object containing the details of the specified voice.

@param {string} apiKey - The API key to authenticate the request.

@param {string} voiceID - The ID of the voice to use for the text-to-speech conversion.

@returns {Object} - An object containing the details of the specified voice.
*/
const getVoice = async (apiKey, voiceID) => {
  try {
    if (!apiKey || !voiceID) {
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${elevenLabsAPI}/voices/${voiceID}`;

    const response = await axios({
      method: "GET",
      url: voiceURL,
      headers: {
        "xi-api-key": apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**

Function that returns an object containing the status of the delete operation.

@param {string} apiKey - The API key to authenticate the request.

@param {string} voiceID - The ID of the voice to use for the text-to-speech conversion.

@returns {Object} - An object containing the status of the delete operation.
*/
const deleteVoice = async (apiKey, voiceID) => {
  try {
    if (!apiKey || !voiceID) {
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${elevenLabsAPI}/voices/${voiceID}`;

    const response = await axios({
      method: "DELETE",
      url: voiceURL,
      headers: {
        "xi-api-key": apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**

Function that returns an object containing the status of the edit operation.

@param {string} apiKey - The API key to authenticate the request.

@param {string} voiceID - The ID of the voice to use for the text-to-speech conversion.

@param {number} stability - The stability setting for the voice.

@param {number} similarityBoost - The similarity boost setting for the voice.

@returns {Object} - An object containing the status of the edit operation.
*/
const editVoiceSettings = async (
  apiKey,
  voiceID,
  stability,
  similarityBoost
) => {
  try {
    if (!apiKey || !voiceID) {
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${elevenLabsAPI}/voices/${voiceID}/settings/edit`;
    const stabilityValue = stability ? stability : 0;
    const similarityBoostValue = similarityBoost ? similarityBoost : 0;

    const response = await axios({
      method: "POST",
      url: voiceURL,
      data: {
        stability: stabilityValue,
        similarity_boost: similarityBoostValue,
      },
      headers: {
        "xi-api-key": apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**

Function that returns an object containing the list of voice models.

@param {string} apiKey - The API key to authenticate the request.

@returns {Object} - An object containing the list of voice models and their details.
*/
const getModels = async (apiKey) => {
  try {
    if (!apiKey) {
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${elevenLabsAPI}/models`;

    const response = await axios({
      method: "GET",
      url: voiceURL,
      headers: {
        "xi-api-key": apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**

Function that returns the user details.

@param {string} apiKey - The API key to authenticate the request.

@returns {Object} - An object containing the user details.
*/
const getUserInfo = async (apiKey) => {
  try {
    if (!apiKey) {
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${elevenLabsAPI}/user`;

    const response = await axios({
      method: "GET",
      url: voiceURL,
      headers: {
        "xi-api-key": apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**

Function that returns the user subscription details.

@param {string} apiKey - The API key to authenticate the request.

@returns {Object} - An object containing the user subscription details.
*/
const getUserSubscription = async (apiKey) => {
  try {
    if (!apiKey) {
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${elevenLabsAPI}/user/subscription`;

    const response = await axios({
      method: "GET",
      url: voiceURL,
      headers: {
        "xi-api-key": apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
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
  editVoiceSettings: editVoiceSettings,
  getModels: getModels,
  getUserInfo: getUserInfo,
  getUserSubscription: getUserSubscription,
};
