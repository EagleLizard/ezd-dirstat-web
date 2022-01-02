
const EZD_DIRSTAT_API_BASE_URI = 'http://localhost:4569';

export interface HttpPostOpts {
  resource: string;
  data: Record<string, unknown>;
  baseUri?: string;
}

export class HttpService {
  static async get() {
    const fetchRes = await fetch('http://localhost:4569/health');
    console.log(await fetchRes.json());
    console.log(fetchRes);
  }

  static async post(opts: HttpPostOpts) {
    let baseUri: string, fetchUri: string;
    baseUri = opts?.baseUri ?? EZD_DIRSTAT_API_BASE_URI;
    fetchUri = `${baseUri}/${opts.resource}`;
    const fetchResp = await fetch(fetchUri, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(opts.data),
    });
    return fetchResp;
  }
}
