//copied from https://github.com/developit/unfetch/blob/master/src/index.d.ts
export default interface IUnfetchResponse {
	ok: boolean;
	statusText: string;
	status: number;
	url: string;
	text: () => Promise<string>;
	json: () => Promise<any>;
	blob: () => Promise<Blob>;
	clone: () => IUnfetchResponse;
	headers: {
		keys: () => string[],
		entries: () => Array<[string, string]>,
		get: (key: string) => string | undefined,
		has: (key: string) => boolean,
	};
}