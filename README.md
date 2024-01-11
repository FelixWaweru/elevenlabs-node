<p align="center">
 <img width="100px" src="https://i.imgur.com/w06EN2l.jpg" align="center" alt="Eleven Labs Logo" />
 <h2 align="center">Eleven Labs Node</h2>
 <p align="center">Eleven Labs NodeJS package for converting text to speech!</p>
</p>
  <p align="center">
    <a href="https://github.com/FelixWaweru/elevenlabs-node/graphs/contributors">
      <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/FelixWaweru/elevenlabs-node" />
    </a>
    <a href="https://github.com/FelixWaweru/elevenlabs-node/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/FelixWaweru/elevenlabs-node?color=0088ff" />
    </a>
    <a href="https://github.com/FelixWaweru/elevenlabs-node/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/FelixWaweru/elevenlabs-node?color=0088ff" />
    </a>
    <br />
    <br />
    <a href="https://github.com/FelixWaweru/elevenlabs-node/actions/workflows/npm-publish.yml">
      <img alt="NPM Package Build" src="https://github.com/FelixWaweru/elevenlabs-node/actions/workflows/npm-publish.yml/badge.svg" />
    </a>
    <br />
    <br />
    <a>
      <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
    </a>
    <a>
      <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
    </a>
  </p>

  <p align="center">
    <a href="https://github.com/FelixWaweru/elevenlabs-node/issues/new/choose">Report Bug</a>
    ·
    <a href="https://github.com/FelixWaweru/elevenlabs-node/issues/new/choose">Request Feature</a>
  </p>
</p>

<p align="center">Drop us a ⭐ on GitHub to <a href="https://ko-fi.com/whyweru">help</a> the project improve!</p>
<p align="center">
  <a href="https://github.com/FelixWaweru/elevenlabs-node/stargazers">
    <img alt="Stars" src="https://img.shields.io/github/stars/FelixWaweru/elevenlabs-node.svg" />
  </a>
</p>

# About

This is an open source Eleven Labs NodeJS package for converting text to speech using the [Eleven Labs API](https://api.elevenlabs.io/docs#/).

## Features

| <div style="width:290px">Function</div> | Parameters                                                                  | Endpoint                               |
| --------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------- |
| `textToSpeech`                          | ({voiceId, fileName, textInput, stability, similarityBoost, modelId, style, speakerBoost})                                | `/v1/text-to-speech/{voice_id}`        |
| `textToSpeechStream`                    | ({voiceId, textInput, stability, similarityBoost, modelId, responseType, style, speakerBoost})                                | `/v1/text-to-speech/{voice_id}/stream` |
| `editVoiceSettings`                     | ({voiceId, stability, similarityBoost})                                      | `/v1/voices/{voice_id}/settings/edit`  |
| `getVoiceSettings`                      | ({voiceId})                                                                  | `/v1/voices/{voice_id}/settings`       |
| `deleteVoice`                           | ({voiceId})                                                                  | `/v1/voices/{voice_id}`                |
| `getVoice`                              | ({voiceId})                                                                  | `/v1/voices/{voice_id}`                |
| `getVoices`                             | N/A                                                                          | `/v1/voices`                    |
| `getModels`                             | N/A                                                                          | `/v1/models`                    |
| `getUserInfo`                           | N/A                                                                          | `/v1/user`                      |
| `getUserSubscription`                   | N/A                                                                          | `/v1/user/subscription`              |
| `getDefaultVoiceSettings`               | N/A                                                                          | `/v1/voices/settings/default`          |

## Parameters
| <div style="width:290px">Variable</div> | Description                                                                 | Type                                   |
| --------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------- |
| `fileName`                              | Name and file path for your audio file e.g (`./gen/hello`)                                    | `String`                                 |
| `textInput`                             | Text to be converted into audio e.g (`Hello`)                                      | `String`                                 |
| `stability`                             | Stability for Text to Speech default (`0`)                                            | `Float`                                  |
| `similarityBoost`                       | Similarity Boost for Text to Speech default (`0`)                                            | `Float`                                  |
| `voiceId`                               | ElevenLabs Voice ID e.g (`pNInz6obpgDQGcFmaJgB`)                       | `String`                                 |
| `modelId`                               | ElevenLabs Model ID e.g (`eleven_multilingual_v2`)                     | `String`                                 |
| `responseType`                          | Streaming response type e.g (`stream`)                                 | `String`                                 |
| `speakerBoost`                          | Speaker Boost for Text to Speech e.g (`true`)                          | `Boolean`                                |
| `style`                       | Style Exaggeration for Text to Speech (0-100) default (`0`)                                            | `Integer`                              |


## Requirements

- [NodeJS](https://nodejs.org/en/download/)

## Get Started

To install the Elevenlabs package, run the following command:

```shell
npm install elevenlabs-node
```

## Setup

Setup the ElevenLabs configurations for your project.

| <div style="width:290px">Variable</div> | Description                                                                 | Default                                |
| --------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------- |
| `apiKey`                                | (`Required`) Your API key from Elevenlabs                                     | N/A                                    |
| `voiceId`                               | (`Optional`) A Voice ID from Elevenlabs                                     | Adam (`pNInz6obpgDQGcFmaJgB`)          |

```javascript
const ElevenLabs = require("elevenlabs-node");

const voice = new ElevenLabs(
    {
        apiKey:  "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
        voiceId: "pNInz6obpgDQGcFmaJgB",             // A Voice ID from Elevenlabs
    }
);
```

## Usage

### Text To Speech

Generating an audio file from text.

```javascript
const ElevenLabs = require("elevenlabs-node");

const voice = new ElevenLabs(
    {
        apiKey:  "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
        voiceId: "pNInz6obpgDQGcFmaJgB",             // A Voice ID from Elevenlabs
    }
);

voice.textToSpeech({
    // Required Parameters
    fileName:        "audio.mp3",                    // The name of your audio file
    textInput:       "mozzy is cool",                // The text you wish to convert to speech

    // Optional Parameters
    voiceId:         "21m00Tcm4TlvDq8ikWAM",         // A different Voice ID from the default
    stability:       0.5,                            // The stability for the converted speech
    similarityBoost: 0.5,                            // The similarity boost for the converted speech
    modelId:         "eleven_multilingual_v2",       // The ElevenLabs Model ID
    style:           1,                              // The style exaggeration for the converted speech
    speakerBoost:    true                            // The speaker boost for the converted speech
  }).then((res) => {
    console.log(res);
});
```

### Text To Speech Stream

Generating an audio stream from text.

```javascript
const ElevenLabs = require("elevenlabs-node");
const fs = require("fs-extra");

const voice = new ElevenLabs(
    {
        apiKey:  "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
        voiceId: "pNInz6obpgDQGcFmaJgB",             // A Voice ID from Elevenlabs
    }
);

const voiceResponse = voice.textToSpeechStream({
    // Required Parameters
    textInput:       "mozzy is cool",                // The text you wish to convert to speech

    // Optional Parameters
    voiceId:         "21m00Tcm4TlvDq8ikWAM",         // A different Voice ID from the default
    stability:       0.5,                            // The stability for the converted speech
    similarityBoost: 0.5,                            // The similarity boost for the converted speech
    modelId:         "eleven_multilingual_v2",       // The ElevenLabs Model ID
    style:           1,                              // The style exaggeration for the converted speech
    responseType:    "stream",                       // The streaming type (arraybuffer, stream, json)
    speakerBoost:    true                            // The speaker boost for the converted speech
  }).then((res) => {
    res.pipe(fs.createWriteStream(fileName));
});
```

### Edit Voice Settings

Editing voice settings.

```javascript
const ElevenLabs = require("elevenlabs-node");

const voice = new ElevenLabs(
    {
        apiKey:  "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
    }
);

const voiceResponse = voice.editVoiceSettings({
    // Required Parameters
    voiceId:         "pNInz6obpgDQGcFmaJgB",         // The ID of the voice you want to edit
    stabilityBoost:  0.5,                            // The Stability Boost for the voice
    similarityBoost: 0.5,                            // The Similarity Boost for the voice
  }).then((res) => {
    console.log(res);
});
```

### Get Voice Settings

Getting voice settings.

```javascript
const ElevenLabs = require("elevenlabs-node");

const voice = new ElevenLabs(
    {
        apiKey:  "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
    }
);

const voiceResponse = voice.getVoiceSettings({
    // Required Parameters
    voiceId:         "pNInz6obpgDQGcFmaJgB"          // The ID of the voice you want to get
  }).then((res) => {
    console.log(res);
});
```

### Delete Voice

Delete voice.

```javascript
const ElevenLabs = require("elevenlabs-node");

const voice = new ElevenLabs(
    {
        apiKey:  "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
    }
);

const voiceResponse = voice.deleteVoice({
    // Required Parameters
    voiceId:         "pNInz6obpgDQGcFmaJgB"          // The ID of the voice you want to delete
  }).then((res) => {
    console.log(res);
});
```

### Get Voice

Getting voice details.

```javascript
const ElevenLabs = require("elevenlabs-node");

const voice = new ElevenLabs(
    {
        apiKey:  "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
    }
);

const voiceResponse = voice.getVoice({
    // Required Parameters
    voiceId:         "pNInz6obpgDQGcFmaJgB"          // The ID of the voice you want to get
  }).then((res) => {
    console.log(res);
});
```

### Get Voices

Getting all voice details.

```javascript
const ElevenLabs = require("elevenlabs-node");

const voice = new ElevenLabs(
    {
        apiKey:  "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
    }
);

const voiceResponse = voice.getVoices().then((res) => {
  console.log(res);
});
```

### Get Models

Getting all model details.

```javascript
const ElevenLabs = require("elevenlabs-node");

const voice = new ElevenLabs(
    {
        apiKey:  "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
    }
);

const voiceResponse = voice.getModels().then((res) => {
  console.log(res);
});
```

### Get User Info

Getting user info associated with the API Key.

```javascript
const ElevenLabs = require("elevenlabs-node");

const voice = new ElevenLabs(
    {
        apiKey:  "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
    }
);

const voiceResponse = voice.getUserInfo().then((res) => {
  console.log(res);
});
```

### Get User Subscription

Getting user subscription info associated with the API Key.

```javascript
const ElevenLabs = require("elevenlabs-node");

const voice = new ElevenLabs(
    {
        apiKey:  "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
    }
);

const voiceResponse = voice.getUserSubscription().then((res) => {
  console.log(res);
});
```

### Get Default Voice Settings

Getting default voice settings.

```javascript
const ElevenLabs = require("elevenlabs-node");

const voice = new ElevenLabs(
    {
        apiKey:  "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
    }
);

const voiceResponse = voice.getDefaultVoiceSettings().then((res) => {
    console.log(res);
});
```

## Contributing

Contributions are welcome :)

Read our [CONTRIBUTING.md](https://github.com/FelixWaweru/elevenlabs-node/blob/main/docs/CONTRIBUTING.md) to learn more.
