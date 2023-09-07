const script = require('../index.js');

const apiKey = process.env.ELEVENLABS_API_KEY;
const voiceID = process.env.ELEVENLABS_VOICE_ID;
const fileName = 'audio.mp3';
const textInput = 'mozzy is cool';
const stability = '0.5';
const similarityBoost = '0.5';
const modelId = 'eleven_multilingual_v1';
const responseType = 'stream';

describe("Eleven Labs Node Unit Test", () => {

    // textToSpeech test
	test("Test textToSpeech", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.textToSpeech(apiKey, voiceID, fileName, textInput, stability, similarityBoost, modelId);

		// Response check
		expect(response.status).toEqual('ok');
	});

        // textToSpeechStream test
	test("Test textToSpeechStream", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.textToSpeechStream(apiKey, voiceID, textInput, stability, similarityBoost, modelId, responseType);

		// Response check
		expect(!response).toBeFalsy();
	});

        // getVoices test
	test("Test getVoices", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.getVoices(apiKey);

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
		const response = await script.getVoiceSettings(apiKey, voiceID);

		// Response check
		expect(response.stability).toBeTruthy();
        expect(response.similarity_boost).toBeTruthy();
	});

        // getVoice test
	test("Test getVoice", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.getVoice(apiKey, voiceID);

		// Response check
		expect(response.voice_id).toBeTruthy();
	});

        // editVoiceSettings test
	test("Test editVoiceSettings", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.editVoiceSettings(apiKey, voiceID, stability, similarityBoost);

		// Response check
		expect(response.status).toEqual('ok');
	});

        // getModels test
	test("Test getModels", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.getModels(apiKey);

		// Response check
		expect(response).toBeTruthy();
	});

        // getUserInfo test
	test("Test getUserInfo", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.getUserInfo(apiKey);

		// Response check
		expect(response.xi_api_key).toEqual(apiKey);
	});

        // getUserSubscription test
	test("Test getUserSubscription", async () => {
		// Execute test
		await process.nextTick(() => {});
		const response = await script.getUserSubscription(apiKey);

		// Response check
		expect(response.status).toBeTruthy();
	});

    // deleteVoice test
    // TODO: Add create voice test first
	// test("Test deleteVoice", async () => {
	// 	// Execute test
	// 	const response = await script.deleteVoice(apiKey, voiceID);

	// 	// Response check
	// 	expect(response.status).toEqual('ok');
	// });
});