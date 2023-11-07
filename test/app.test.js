const ElevenLabs = require('../index.js');
require('dotenv').config()

const apiKey = process.env.ELEVENLABS_API_KEY;
const voiceId = process.env.ELEVENLABS_VOICE_ID;
const fileName = 'audio.mp3';
const textInput = 'mozzy is cool';
const stability = '0.5';
const similarityBoost = '0.5';
const modelId = 'eleven_multilingual_v1';
const responseType = 'stream';
const style = 0;
const speakerBoost = true;

const script = new ElevenLabs(
    {
        apiKey: apiKey,
		voiceId: voiceId
    }
);

describe("Eleven Labs Node Unit Test", () => {

    // textToSpeech test
	test("Test textToSpeech", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.textToSpeech({voiceId, fileName, textInput, stability, similarityBoost, modelId, style, speakerBoost});

		// Response check
		expect(response.status).toEqual('ok');
	});

        // textToSpeechStream test
	test("Test textToSpeechStream", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.textToSpeechStream({voiceId, textInput, stability, similarityBoost, modelId, responseType, style, speakerBoost});

		// Response check
		expect(!response).toBeFalsy();
	});

        // getVoices test
	test("Test getVoices", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.getVoices();

		// Response check
		expect(response.voices).toBeTruthy();
	});

        // getDefaultVoiceSettings test
	test("Test getDefaultVoiceSettings", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.getDefaultVoiceSettings();

		// Response check
		expect(response.stability).toBeTruthy();
        expect(response.similarity_boost).toBeTruthy();
	});

        // getVoiceSettings test
	test("Test getVoiceSettings", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.getVoiceSettings({voiceId});

		// Response check
		expect(response.stability).toBeTruthy();
        expect(response.similarity_boost).toBeTruthy();
	});

        // getVoice test
	test("Test getVoice", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.getVoice({voiceId});

		// Response check
		expect(response.voice_id).toBeTruthy();
	});

        // editVoiceSettings test
	test("Test editVoiceSettings", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.editVoiceSettings({voiceId, stability, similarityBoost});

		// Response check
		expect(response.status).toEqual('ok');
	});

        // getModels test
	test("Test getModels", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.getModels();

		// Response check
		expect(response).toBeTruthy();
	});

        // getUserInfo test
	test("Test getUserInfo", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.getUserInfo();

		// Response check
		expect(response.xi_api_key).toEqual(apiKey);
	});

        // getUserSubscription test
	test("Test getUserSubscription", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.getUserSubscription();

		// Response check
		expect(response.status).toBeTruthy();
	});
});

describe("Required Variables Test", () => {

    // textToSpeech test
	test("Test textToSpeech", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.textToSpeech({fileName, textInput});

		// Response check
		expect(response.status).toEqual('ok');
	});

        // textToSpeechStream test
	test("Test textToSpeechStream", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.textToSpeechStream({textInput});

		// Response check
		expect(!response).toBeFalsy();
	});
});