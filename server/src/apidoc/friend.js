/////////////////////////////////////////// Version 1.0.0
/**
 * @api {get} /friend/search 친구 검색
 *
 * @apiVersion 1.0.0
 * @apiName 친구 검색
 * @apiGroup Friend
 * @apiDescription 이메일로 친구를 찾습니다.
 * @apiParam {String} email 친구 이메일
 * @apiSuccess {String} user_id 아이디
 * @apiSuccess {String} user_type 유저 타입(로컬/소셜)
 * @apiSuccess {String} user_name 닉네임
 * @apiSuccess {String} user_email 이메일
 * @apiSuccess {String} user_hash 비밀번호 해시값
 * @apiSuccess {String} user_password 비밀번호 (배포시 삭제 예정)
 * @apiSuccess {Datetime} user_date 회원가입 일자
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "user_id": "utest",
 *      "user_type": "local",
 *      "user_name": "테스트",
 *      "user_email": "test@test.com",
 *      "user_hash": "$2b$10$7Ozh2zcG1T8N2uHBa4LnmOkM61POeABZb78oHm57QDkGYhQsgGzeG",
 *      "user_password": "test",
 *      "user_date": "2022-04-09T00:12:09.000Z"
 *     }
 */

/**
 * @api {get} /friend/list 친구 리스트 로드
 *
 * @apiVersion 1.0.0
 * @apiName 친구 리스트 로드
 * @apiGroup Friend
 * @apiDescription 친구 리스트를 조회합니다.
 * @apiSuccess {String} user_email 친구 이메일
 * @apiSuccess {String} user_name 친구 닉네임
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      [
 *          {
 *              "user_email": "test@test.com",
 *              "user_name": "test2"
 *          },
 *          {
 *              "user_email": "test@test.com",
 *              "user_name": "test3"
 *          }
 *      ]
 */

/////////////////////////////////////////// Version 1.0.0
/**
 * @api {get} /friend/search 친구 검색
 *
 * @apiVersion 2.0.0
 * @apiName 친구 검색
 * @apiGroup Friend
 * @apiDescription 이메일로 친구를 검색합니다.
 * @apiParam {String} email 친구 이메일(*)
 * @apiSuccess {String} user_id 아이디
 * @apiSuccess {String} user_name 닉네임
 * @apiSuccess {String} user_email 이메일
 * @apiSuccess {Int} state 친구 상태(-1: 아무 상태 아님, 0: 친구 요청 보낸 상태, 1: 친구 상태)
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "user_id": "utest2",
 *         "user_name": "test2",
 *         "user_email": "test2@test.com",
 *         "state": -1
 *     }
 */

/**
 * @api {get} /friend/list 친구 리스트 로드
 *
 * @apiVersion 2.0.0
 * @apiName 친구 리스트 로드
 * @apiGroup Friend
 * @apiDescription 친구 리스트를 로드합니다.
 * @apiSuccess {String} user_id 아이디
 * @apiSuccess {String} user_name 닉네임
 * @apiSuccess {String} user_email 이메일
 * @apiSuccess {Int} state 친구 상태(-1: 아무 상태 아님, 0: 친구 요청 보낸 상태, 1: 친구 상태)
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      [
 *  *          {
 *             "user_id": "utest2",
 *             "user_name": "test2",
 *             "user_email": "test2@test.com",
 *             "state": 1
 *          },
 *          {
 *             "user_id": "utest3",
 *             "user_name": "test3",
 *             "user_email": "test3@test.com",
 *             "state": 1
 *          }
 *      ]
 */

/**
 * @api {get} /friend/request 친구 요청 리스트 로드
 *
 * @apiVersion 2.0.0
 * @apiName 친구 요청 리스트 로드
 * @apiGroup Friend
 * @apiDescription 새로온 친구 요청들을 로드합니다.
 * @apiSuccess {String} user_id 아이디
 * @apiSuccess {String} user_name 닉네임
 * @apiSuccess {String} user_email 이메일
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      [
 *  *          {
 *             "user_id": "utest2",
 *             "user_name": "test2",
 *             "user_email": "test2@test.com",
 *          },
 *          {
 *             "user_id": "utest3",
 *             "user_name": "test3",
 *             "user_email": "test3@test.com",
 *          }
 *      ]
 */

/**
 * @api {post} /friend/request 친구 요청 보내기
 *
 * @apiVersion 2.0.0
 * @apiName 친구 요청 보내기
 * @apiGroup Friend
 * @apiDescription 다른 사용자에게 친구 요청을 보냅니다.
 * @apiParam {String} email 친구 이메일(*)
 * @apiError err required parameter 미입력 시
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *          Bad Request
 *     }
 */

/**
 * @api {put} /friend/request 친구 요청 처리
 *
 * @apiVersion 2.0.0
 * @apiName 친구 요청 처리
 * @apiGroup Friend
 * @apiDescription 받은 친구 요청을 처리합니다.
 * @apiParam {String} email 친구 이메일(*)
 * @apiParam {Int} state 처리 상태(*) (친구 수락: 1, 친구 거절: 2)
 * @apiError err required parameter 미입력 시
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *          Bad Request
 *     }
 */

/**
 * @api {delete} /friend 친구 삭제
 *
 * @apiVersion 2.0.0
 * @apiName 친구 삭제
 * @apiGroup Friend
 * @apiDescription 친구를 삭제합니다.
 * @apiParam {String} email 친구 이메일(*)
 * @apiError err required parameter 미입력 시
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *          Bad Request
 *     }
 */
