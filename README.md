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
| `textToSpeech`                          | (apiKey, voiceID, fileName, textInput, stability, similarityBoost, modelId) | `/v1/text-to-speech/{voice_id}`        |
| `textToSpeechStream`                    | (apiKey, voiceID, textInput, stability, similarityBoost, modelId)           | `/v1/text-to-speech/{voice_id}/stream` |
| `getVoices`                             | (apiKey)                                                                    | `/v1/voices`                           |
| `getDefaultVoiceSettings`               | N/A                                                                         | `/v1/voices/settings/default`          |
| `getVoiceSettings`                      | (apiKey, voiceID)                                                           | `/v1/voices/{voice_id}/settings`       |
| `getVoice`                              | (apiKey, voiceID)                                                           | `/v1/voices/{voice_id}`                |
| `deleteVoice`                           | (apiKey, voiceID)                                                           | `/v1/voices/{voice_id}`                |
| `editVoiceSettings`                     | (apiKey, voiceID, stability, similarityBoost)                               | `/v1/voices/{voice_id}/settings/edit`  |
| `getModels`                             | (apiKey)                                                                    | `/v1/models`                           |
| `getUserInfo`                             | (apiKey)                                                                    | `/v1/user`                           |
| `getUserSubscription`                             | (apiKey)                                                                    | `/v1/user/subscription`                           |

## Requirements

- [NodeJS](https://nodejs.org/en/download/)

## Get Started

To install the Elevenlabs package, run the following command:

```shell
npm install elevenlabs-node
```

## Usage

Getting voice details.

```javascript
const voice = require("elevenlabs-node");

const apiKey = "0e2c037kl8561005671b1de345s8765c"; // Your API key from Elevenlabs
const voiceID = "pNInz6obpgDQGcFmaJgB"; // The ID of the voice you want to get

const voiceResponse = voice.getVoice(apiKey, voiceID).then((res) => {
  console.log(res);
});
```

Generating an audio file from text

```javascript
const voice = require("elevenlabs-node");
const fs = require("fs-extra");

const apiKey = "0e2c037kl8561005671b1de345s8765c"; // Your API key from Elevenlabs
const voiceID = "pNInz6obpgDQGcFmaJgB"; // The ID of the voice you want to get
const fileName = "audio.mp3"; // The name of your audio file
const textInput = "mozzy is cool"; // The text you wish to convert to speech

voice.textToSpeech(apiKey, voiceID, fileName, textInput).then((res) => {
  console.log(res);
});
```

Generating an audio stream from text

```javascript
const voice = require("elevenlabs-node");
const fs = require("fs-extra");

const apiKey = "0e2c037kl8561005671b1de345s8765c"; // Your API key from Elevenlabs
const voiceID = "pNInz6obpgDQGcFmaJgB"; // The ID of the voice you want to get
const fileName = "audio.mp3"; // The name of your audio file
const textInput = "mozzy is cool"; // The text you wish to convert to speech

voice.textToSpeechStream(apiKey, voiceID, textInput).then((res) => {
  res.pipe(fs.createWriteStream(fileName));
});
```

## Contributing

Contributions are welcome :)

Read our [CONTRIBUTING.md](https://github.com/FelixWaweru/elevenlabs-node/blob/main/docs/CONTRIBUTING.md) to learn more.
