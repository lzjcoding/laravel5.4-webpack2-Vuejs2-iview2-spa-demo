/**
 * Created by aresn on 16/7/18.
 */
import Env from './env';

let config = {
    env: Env,
    avatar_404: '/images/avatar_404.png',
    cdn: '//blog.cn/',
    img_url: function (path) {
        return this.cdn + path;
    }
};

export default config;