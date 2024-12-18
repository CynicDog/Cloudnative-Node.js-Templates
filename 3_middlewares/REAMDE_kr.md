# Node.js 미들웨어 CRUD 구현

| **기준**               | [Express.js](https://github.com/expressjs/express)         | [Koa.js](https://github.com/koajs/koa)                     | [Nest.js](https://github.com/nestjs/nest) | [Fastify](https://github.com/fastify/fastify) |
|------------------------|------------------------------------------------------------|------------------------------------------------------------|------------------------------------------|-----------------------------------------------|
| **사용 용이성**          | 초보자에게 매우 친숙하며, 최소한의 구성으로 시작 가능. Callback-based middleware. | 더 많은 설정이 필요하며, 최신 JavaScript 사용. Promise-based middleware. | 학습 곡선이 가파르며, 구조화된 모듈형 프레임워크              | 간단하고 개발자 친화적이며, 학습 곡선 존재                      |
| **아키텍처**            | 최소한의 구조, 유연한 설계                                            | 모듈화, 비의존적 구조                                               | Opinionated. 모듈화, TypeScript 초점          | Opinionated. 구조화된 설계, 플러그인 지원의 모듈형 구조         |
| **확장성**             | 많은 플러그인으로 높은 확장성                                           | 유연하지만 기본 제공 기능이 적음                                         | 내장 도구를 활용한 높은 확장성                        | 내장 플러그인으로 높은 확장성                              |
| **커뮤니티**           | 가장 큰 커뮤니티, 광범위한 생태계                                        | 작은 커뮤니티, 제3자 패키지가 비교적 적음                                   | TypeScript 및 엔터프라이즈 분야에서 성장 중            | 빠르게 성장 중이며, 최신 사용 사례에 대한 강력한 지원               |
| **인기도 (GitHub Stars)** | 65.9k ⭐⭐⭐⭐                                                 | 35.3k ⭐⭐⭐                                                  | 68.4k ⭐⭐⭐⭐⭐                              | 32.6k ⭐⭐⭐                                     |

### 로컬 환경에서 애플리케이션 실행

**Koa.js**:
```bash
$ 1_koa_js> node src/main.js
```

**Nest.js**:
```bash
$ 2_nest_js> npm run start
```

**Express.js**:
```bash
$ 3_express_js> node src/main.js
```

**Fastify**:
```bash
$ 4_fastify> npm run dev 
```

### 컨테이너에서 애플리케이션 실행

**Koa.js**:
```bash
$ 1_koa_js> docker run -p 3000:3000 ghcr.io/cynicdog/cloudnative-node.js-templates/middleware_koa_js:latest
```

**Nest.js**:
```bash
$ 2_nest_js> docker run -p 3000:3000 ghcr.io/cynicdog/cloudnative-node.js-templates/middleware_nest_js:latest
```

**Express.js**:
```bash
$ 3_express_js> docker run -p 3000:3000 ghcr.io/cynicdog/cloudnative-node.js-templates/middleware_express_js:latest
```

**Fastify**:
```bash
$ 4_fastify> docker run -p 3000:3000 ghcr.io/cynicdog/cloudnative-node.js-templates/middleware_fastify:latest
```

### 서버 기능 테스트

1. **Create an Item**
   ```bash
   $ > http POST :3000/items name="Item1" description="This is Item1"
   ```

2. **Get All Items**
   ```bash
   $ > http :3000/items
   ```

3. **Update an Item**
   ```bash
   $ > http PUT :3000/items/1 name="Item1 - Updated"
   ```

4. **Delete an Item**
   ```bash
   $ > http DELETE :3000/items/1
   ```
