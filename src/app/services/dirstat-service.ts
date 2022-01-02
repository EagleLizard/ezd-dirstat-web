
import { HttpPostOpts, HttpService } from './http-service';

export class DirstatService {

  static async getDirs(basePath?: string) {
    let opts: HttpPostOpts, postData: Record<string, unknown>;
    postData = {};
    if(basePath) {
      postData['path'] = basePath;
    }
    opts = {
      resource: 'dirs',
      data: postData,
    };
    const resp = await HttpService.post(opts);
    const data = await resp.json();
    if(!Array.isArray(data?.dirs)) {
      throw new Error('/dirs responded with unexpected data');
    }
    return data.dirs;
  }

}
