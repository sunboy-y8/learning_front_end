/*���� cookie �־û�

������˼·
*/
//    1.�� supertest �У�����ͨ�� var agent = supertest.agent(app) ��ȡһ�� agent ������������ API ��ֱ���� superagent �ϵ��ø��ַ�����һ���ġ�agent �����ڱ���ε��� get �� post ֮�󣬿���һ·�� cookie ������������

    var supertest = require('supertest');
    var app = express();
    var agent = supertest.agent(app);

    agent.post('login').end(...);
    // then ..
    agent.post('create_topic').end(...); // ��ʱ�� agent �����û���½��� cookie

//    2.�ڷ�������ʱ������ .set('Cookie', 'a cookie string') �����ķ�ʽ��

    var supertest = require('supertest');
    var userCookie;
    supertest.post('login').end(function (err, res) {
        userCookie = res.headers['set-cookie']
      });
    // then ..

    supertest.post('create_topic')
      .set('cookie', userCookie)
      .end(...)

//�����и�������ۣ�https://github.com/tj/supertest/issues/46