const axios = require("axios");
const fs = require("fs-extra");
const elevenLabsAPIV1 = "https://api.elevenlabs.io/v1";
const elevenLabsAPIV2 = "https://api.elevenlabs.io/v2";


/**
Creates an instance of ElevenLabs.
@param {Object} - An object containing the API Key and API Version [default: ElevenLabs V1].
*/
function ElevenLabs(options = {
        apiKey: "",
        apiVersion: ""
    }) {

    this.apiKey = options.apiKey ? options.apiKey : "";

    switch(options.apiVersion) {
      case "V1":
        this.apiVersion = elevenLabsAPIV1;
        break;
      case "V2":
        this.apiVersion = elevenLabsAPIV2;
        break;
      case "":
        this.apiVersion = elevenLabsAPIV1;
        break;
      default:
        console.log("Invalid Version");
        break;
    }
  }


/**

Function that converts text to speech and saves the audio file to the specified file name.

@param {string} voiceID - The ID of the voice to use for the text-to-speech conversion.

@param {string} fileName - The name of the file to save the audio data to.

@param {string} textInput - The text to convert to speech.

@param {number} stability - The stability setting for the voice.

@param {number} similarityBoost - The similarity boost setting for the voice.

@param {string} modelId - The model to use for the text-to-speech conversion. If null, it will use elevenlab's default model.

@returns {Object} - An object containing the status of the operation.
*/
ElevenLabs.prototype.textToSpeech = async function (
  voiceID,
  fileName,
  textInput,
  stability,
  similarityBoost,
  modelId
) {
  try {
    if (!voiceID || !fileName || !textInput) {
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${this.apiVersion}/text-to-speech/${voiceID}`;
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
        "xi-api-key": this.apiKey,
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

@param {string} voiceID - The ID of the voice to use for the text-to-speech conversion.

@param {string} textInput - The text to convert to speech.

@param {number} stability - The stability setting for the voice.

@param {number} similarityBoost - The similarity boost setting for the voice.

@param {string} modelId - The model to use for the text-to-speech conversion. If null, it will use elevenlab's default model.

@param {string} responseType - The response type for the text-to-speech function (arrayBuffer, stream, etc). If null, it will use 'stream' by default.

@returns {Object} - A readable stream of the audio data.
*/
ElevenLabs.prototype.textToSpeechStream = async function (
  voiceID,
  textInput,
  stability,
  similarityBoost,
  modelId,
  responseType
) {
  try {
    if (!voiceID || !textInput) {
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${this.apiVersion}/text-to-speech/${voiceID}/stream`;
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
        "xi-api-key": this.apiKey,
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

@returns {Object} - An object containing the list of voices and their details.
*/
ElevenLabs.prototype.getVoices = async function () {
  try {
    const voiceURL = `${this.apiVersion}/voices`;

    const response = await axios({
      method: "GET",
      url: voiceURL,
      headers: {
        "xi-api-key": this.apiKey,
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
ElevenLabs.prototype.getDefaultVoiceSettings = async function () {
  try {
    const voiceURL = `${this.apiVersion}/voices/settings/default`;

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

@param {string} voiceID - The ID of the voice to use for the text-to-speech conversion.

@returns {Object} - An object containing the settings of the specified voice.
*/
ElevenLabs.prototype.getVoiceSettings = async function (voiceID) {
  try {
    if (!voiceID) {
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${this.apiVersion}/voices/${voiceID}/settings`;

    const response = await axios({
      method: "GET",
      url: voiceURL,
      headers: {
        "xi-api-key": this.apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**

Function that returns an object containing the details of the specified voice.

@param {string} voiceID - The ID of the voice to use for the text-to-speech conversion.

@returns {Object} - An object containing the details of the specified voice.
*/
ElevenLabs.prototype.getVoice = async function (voiceID) {
  try {
    if (!voiceID) {
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${this.apiVersion}/voices/${voiceID}`;

    const response = await axios({
      method: "GET",
      url: voiceURL,
      headers: {
        "xi-api-key": this.apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**

Function that returns an object containing the status of the delete operation.

@param {string} voiceID - The ID of the voice to use for the text-to-speech conversion.

@returns {Object} - An object containing the status of the delete operation.
*/
ElevenLabs.prototype.deleteVoice = async function (voiceID) {
  try {
    if (!voiceID) {
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${this.apiVersion}/voices/${voiceID}`;

    const response = await axios({
      method: "DELETE",
      url: voiceURL,
      headers: {
        "xi-api-key": this.apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**

Function that returns an object containing the status of the edit operation.

@param {string} voiceID - The ID of the voice to use for the text-to-speech conversion.

@param {number} stability - The stability setting for the voice.

@param {number} similarityBoost - The similarity boost setting for the voice.

@returns {Object} - An object containing the status of the edit operation.
*/
ElevenLabs.prototype.editVoiceSettings = async function (
  voiceID,
  stability,
  similarityBoost
) {
  try {
    if (!voiceID) {
      console.log("ERR: Missing parameter");
    }

    const voiceURL = `${this.apiVersion}/voices/${voiceID}/settings/edit`;
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
        "xi-api-key": this.apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**

Function that returns an object containing the list of voice models.

@returns {Object} - An object containing the list of voice models and their details.
*/
ElevenLabs.prototype.getModels = async function () {
  try {
    const voiceURL = `${this.apiVersion}/models`;

    const response = await axios({
      method: "GET",
      url: voiceURL,
      headers: {
        "xi-api-key": this.apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**

Function that returns the user details.

@returns {Object} - An object containing the user details.
*/
ElevenLabs.prototype.getUserInfo = async function () {
  try {
    const voiceURL = `${this.apiVersion}/user`;

    const response = await axios({
      method: "GET",
      url: voiceURL,
      headers: {
        "xi-api-key": this.apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**

Function that returns the user subscription details.

@returns {Object} - An object containing the user subscription details.
*/
ElevenLabs.prototype.getUserSubscription = async function () {
  try {
    const voiceURL = `${this.apiVersion}/user/subscription`;

    const response = await axios({
      method: "GET",
      url: voiceURL,
      headers: {
        "xi-api-key": this.apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = ElevenLabs;
