const axios = require("axios");
const fs = require("fs-extra");
const elevenLabsAPIV1 = "https://api.elevenlabs.io/v1";


/**

Function initializes ElevenLabs API.

@param {Object} - An object containing the API Key and API Version [default: ElevenLabs V1].
*/
function ElevenLabs(options = {
    apiKey: "",
    voiceId: ""
}) {

    this.apiKey = options.apiKey ? options.apiKey : "";
    this.voiceId = options.voiceId ? options.voiceId : "pNInz6obpgDQGcFmaJgB"; // Default voice 'Adam'

    if(this.apiKey === ""){
        console.log("ERR: Missing API key");
        return;
    }
}


/**

Function that converts text to speech and saves the audio file to the specified file name.

@param {string} voiceId - A different ID for the voice to use with the text-to-speech conversion.

@param {string} fileName - The name of the file to save the audio data to.

@param {string} textInput - The text to convert to speech.

@param {number} stability - The stability setting for the voice.

@param {number} similarityBoost - The similarity boost setting for the voice.

@param {string} modelId - The model to use for the text-to-speech conversion. If null, it will use elevenlab's default model.

@param {boolean} speakerBoost - The speaker boost setting for the voice.

@returns {Object} - An object containing the status of the operation.
*/
ElevenLabs.prototype.textToSpeech = async function({
    voiceId,
    fileName,
    textInput,
    stability,
    similarityBoost,
    modelId,
    style,
    speakerBoost
}) {
    try {
        if (!fileName) {
            console.log("ERR: Missing parameter {fileName}");
            return;
        } else if (!textInput) {
            console.log("ERR: Missing parameter {textInput}");
            return;
        }

        const voiceIdValue = voiceId ? voiceId : this.voiceId;
        const voiceURL = `${elevenLabsAPIV1}/text-to-speech/${voiceIdValue}`;
        const stabilityValue = stability ? stability : 0;
        const similarityBoostValue = similarityBoost ? similarityBoost : 0;
        const styleValue = style ? style : 0;

        const response = await axios({
            method: "POST",
            url: voiceURL,
            data: {
                text: textInput,
                voice_settings: {
                    stability: stabilityValue,
                    similarity_boost: similarityBoostValue,
                    style: styleValue,
                    use_speaker_boost: speakerBoost,
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
            const responseJson = {
                status: "ok",
                fileName: fileName
            };
            writeStream.on('finish', () => resolve(responseJson));

            writeStream.on('error', reject);
        });
    } catch (error) {
        console.log(error);
    }
};

/**

Function that converts text to speech and returns a readable stream of the audio data.

@param {string} voiceId - A different ID for the voice to use with the text-to-speech conversion.

@param {string} textInput - The text to convert to speech.

@param {number} stability - The stability setting for the voice.

@param {number} similarityBoost - The similarity boost setting for the voice.

@param {string} modelId - The model to use for the text-to-speech conversion. If null, it will use elevenlab's default model.

@param {string} responseType - The response type for the text-to-speech function (arrayBuffer, stream, etc). If null, it will use 'stream' by default.

@param {boolean} speakerBoost - The speaker boost setting for the voice.

@returns {Object} - A readable stream of the audio data.
*/
ElevenLabs.prototype.textToSpeechStream = async function({
    voiceId,
    textInput,
    stability,
    similarityBoost,
    modelId,
    responseType,
    style,
    speakerBoost
}) {
    try {
        if (!textInput) {
            console.log("ERR: Missing parameter {textInput}");
            return;
        }

        const voiceIdValue = voiceId ? voiceId : this.voiceId;
        const voiceURL = `${elevenLabsAPIV1}/text-to-speech/${voiceIdValue}/stream`;
        const stabilityValue = stability ? stability : 0;
        const similarityBoostValue = similarityBoost ? similarityBoost : 0;
        const styleValue = style ? style : 0;

        const response = await axios({
            method: "POST",
            url: voiceURL,
            data: {
                text: textInput,
                voice_settings: {
                    stability: stabilityValue,
                    similarity_boost: similarityBoostValue,
                    style: styleValue,
                    use_speaker_boost: speakerBoost,
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
ElevenLabs.prototype.getVoices = async function() {
    try {
        const voiceURL = `${elevenLabsAPIV1}/voices`;

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
ElevenLabs.prototype.getDefaultVoiceSettings = async function() {
    try {
        const voiceURL = `${elevenLabsAPIV1}/voices/settings/default`;

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

@param {string} voiceId - The ID of the voice to use for the text-to-speech conversion.

@returns {Object} - An object containing the settings of the specified voice.
*/
ElevenLabs.prototype.getVoiceSettings = async function({voiceId}) {
    try {
        if (!voiceId) {
            console.log("ERR: Missing parameter {voiceId}");
            return;
        }

        const voiceURL = `${elevenLabsAPIV1}/voices/${voiceId}/settings`;

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

@param {string} voiceId - The ID of the voice to use for the text-to-speech conversion.

@returns {Object} - An object containing the details of the specified voice.
*/
ElevenLabs.prototype.getVoice = async function({voiceId}) {
    try {
        if (!voiceId) {
            console.log("ERR: Missing parameter {voiceId}");
            return;
        }

        const voiceURL = `${elevenLabsAPIV1}/voices/${voiceId}`;

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

@param {string} voiceId - The ID of the voice to use for the text-to-speech conversion.

@returns {Object} - An object containing the status of the delete operation.
*/
ElevenLabs.prototype.deleteVoice = async function({voiceId}) {
    try {
        if (!voiceId) {
            console.log("ERR: Missing parameter {voiceId}");
            return;
        }

        const voiceURL = `${elevenLabsAPIV1}/voices/${voiceId}`;

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

@param {string} voiceId - The ID of the voice to use for the text-to-speech conversion.

@param {number} stability - The stability setting for the voice.

@param {number} similarityBoost - The similarity boost setting for the voice.

@returns {Object} - An object containing the status of the edit operation.
*/
ElevenLabs.prototype.editVoiceSettings = async function({
    voiceId,
    stability,
    similarityBoost
}) {
    try {
        if (!voiceId) {
            console.log("ERR: Missing parameter {voiceId}");
            return;
        }

        const voiceURL = `${elevenLabsAPIV1}/voices/${voiceId}/settings/edit`;
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
ElevenLabs.prototype.getModels = async function() {
    try {
        const voiceURL = `${elevenLabsAPIV1}/models`;

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
ElevenLabs.prototype.getUserInfo = async function() {
    try {
        const voiceURL = `${elevenLabsAPIV1}/user`;

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
ElevenLabs.prototype.getUserSubscription = async function() {
    try {
        const voiceURL = `${elevenLabsAPIV1}/user/subscription`;

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