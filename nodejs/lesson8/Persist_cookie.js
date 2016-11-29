/*关于 cookie 持久化

有两种思路
*/
//    1.在 supertest 中，可以通过 var agent = supertest.agent(app) 获取一个 agent 对象，这个对象的 API 跟直接在 superagent 上调用各种方法是一样的。agent 对象在被多次调用 get 和 post 之后，可以一路把 cookie 都保存下来。

    var supertest = require('supertest');
    var app = express();
    var agent = supertest.agent(app);

    agent.post('login').end(...);
    // then ..
    agent.post('create_topic').end(...); // 此时的 agent 中有用户登陆后的 cookie

//    2.在发起请求时，调用 .set('Cookie', 'a cookie string') 这样的方式。

    var supertest = require('supertest');
    var userCookie;
    supertest.post('login').end(function (err, res) {
        userCookie = res.headers['set-cookie']
      });
    // then ..

    supertest.post('create_topic')
      .set('cookie', userCookie)
      .end(...)

//这里有个相关讨论：https://github.com/tj/supertest/issues/46