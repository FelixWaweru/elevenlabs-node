<p align="center">
 <img width="100px" src="https://i.imgur.com/w06EN2l.jpg" align="center" alt="Eleven Labs" />
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
| `textToSpeech`                          | (fileName, textInput, stability, similarityBoost, modelId)                  | `/v1/text-to-speech/{voice_id}`        |
| `textToSpeechStream`                    | (textInput, stability, similarityBoost, modelId)                            | `/v1/text-to-speech/{voice_id}/stream` |
| `editVoiceSettings`                     | (voiceID, stability, similarityBoost)                                       | `/v1/voices/{voice_id}/settings/edit`  |
| `getVoiceSettings`                      | (voiceID)                                                                   | `/v1/voices/{voice_id}/settings`       |
| `deleteVoice`                           | (voiceID)                                                                   | `/v1/voices/{voice_id}`                |
| `getVoice`                              | (voiceID)                                                                   | `/v1/voices/{voice_id}`                |
| `getVoices`                             | N/A                                                                         | `/v1/voices`                           |
| `getModels`                             | N/A                                                                         | `/v1/models`                           |
| `getUserInfo`                             | N/A                                                                       | `/v1/user`                           |
| `getUserSubscription`                             | N/A                                                               | `/v1/user/subscription`                           |
| `getDefaultVoiceSettings`               | N/A                                                                         | `/v1/voices/settings/default`          |

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
        apiKey: "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
        voiceId: "pNInz6obpgDQGcFmaJgB",            // A Voice ID from Elevenlabs
    }
);
```

## Usage

### Text To Speech

Generating an audio file from text.

```javascript
const ElevenLabs = require("elevenlabs-node");
const fs = require("fs-extra");

const fileName = "audio.mp3";                       // The name of your audio file
const textInput = "mozzy is cool";                  // The text you wish to convert to speech

const voice = new ElevenLabs(
    {
        apiKey: "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
        voiceId: "pNInz6obpgDQGcFmaJgB",            // A Voice ID from Elevenlabs
    }
);

voice.textToSpeech(fileName, textInput).then((res) => {
  console.log(res);
});
```

### Text To Speech Stream

Generating an audio stream from text.

```javascript
const ElevenLabs = require("elevenlabs-node");
const fs = require("fs-extra");

const fileName = "audio.mp3";                       // The name of your audio file
const textInput = "mozzy is cool";                  // The text you wish to convert to speech

const voice = new ElevenLabs(
    {
        apiKey: "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
        voiceId: "pNInz6obpgDQGcFmaJgB",            // A Voice ID from Elevenlabs
    }
);

voice.textToSpeechStream(textInput).then((res) => {
  res.pipe(fs.createWriteStream(fileName));
});
```

### Edit Voice Settings

Editing voice settings.

```javascript
const ElevenLabs = require("elevenlabs-node");

const voiceID = "pNInz6obpgDQGcFmaJgB";             // The ID of the voice you want to get
const stabilityBoost = 0.1;                         // The Stability Boost for the voice you want to edit
const similarityBoost = 0.1;                        // The Similarity Boost for the voice you want to edit

const voice = new ElevenLabs(
    {
        apiKey: "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
    }
);

const voiceResponse = voice.editVoiceSettings(voiceID, stabilityBoost, similarityBoost).then((res) => {
  console.log(res);
});
```

### Get Voice Settings

Getting voice settings.

```javascript
const ElevenLabs = require("elevenlabs-node");

const voiceID = "pNInz6obpgDQGcFmaJgB";             // The ID of the voice you want to get

const voice = new ElevenLabs(
    {
        apiKey: "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
    }
);

const voiceResponse = voice.getVoiceSettings(voiceID).then((res) => {
  console.log(res);
});
```

### Delete Voice

Delete voice.

```javascript
const ElevenLabs = require("elevenlabs-node");

const voiceID = "pNInz6obpgDQGcFmaJgB";             // The ID of the voice you want to get

const voice = new ElevenLabs(
    {
        apiKey: "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
    }
);

const voiceResponse = voice.deleteVoice(voiceID).then((res) => {
  console.log(res);
});
```

### Get Voice

Getting voice details.

```javascript
const ElevenLabs = require("elevenlabs-node");

const voiceID = "pNInz6obpgDQGcFmaJgB";             // The ID of the voice you want to get

const voice = new ElevenLabs(
    {
        apiKey: "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
    }
);

const voiceResponse = voice.getVoice(voiceID).then((res) => {
  console.log(res);
});
```

### Get Voices

Getting all voice details.

```javascript
const ElevenLabs = require("elevenlabs-node");

const voice = new ElevenLabs(
    {
        apiKey: "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
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
        apiKey: "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
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
        apiKey: "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
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
        apiKey: "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
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

const voiceID = "pNInz6obpgDQGcFmaJgB";             // The ID of the voice you want to get

const voice = new ElevenLabs(
    {
        apiKey: "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
    }
);

const voiceResponse = voice.getDefaultVoiceSettings(voiceID).then((res) => {
  console.log(res);
});
```

## Contributing

Contributions are welcome :)

Read our [CONTRIBUTING.md](https://github.com/FelixWaweru/elevenlabs-node/blob/main/docs/CONTRIBUTING.md) to learn more.
