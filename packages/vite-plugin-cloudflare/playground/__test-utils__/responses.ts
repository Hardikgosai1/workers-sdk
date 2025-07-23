import { page, viteTestUrl } from "./index";

export async function getTextResponse(path = "/"): Promise<string> {
	const response = await getResponse(path);
	return response.text();
}

export async function getJsonResponse(
	path = "/"
): Promise<null | Record<string, unknown>> {
	const response = await getResponse(path);
	const text = await response.text();
	try {
		return JSON.parse(text);
	} catch (e) {
		console.error("Failed to parse JSON response:", response.status, text);
		throw new Error("Invalid JSON response:\n" + text);
	}
}

export async function getResponse(path = "/") {
	const url = `${viteTestUrl}${path}`;

	const response = page.waitForResponse(url).catch((error) => {
		console.error("Failed to get response for URL:", url, error);
		throw error;
	});
	await page.goto(url);
	return response;
}
