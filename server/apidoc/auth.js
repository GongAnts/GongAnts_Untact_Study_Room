/**
 * @api {get} /auth 로그인 여부
 *
 * @apiVersion 1.0.0
 * @apiName 로그인 정보
 * @apiGroup Auth
 * @apiDescription 로그인 여부 및 사용자 정보를 확인합니다. (* 표시는 로컬 로그인, 구글 로그인 모두 해당되는 항목입니다.)
 * @apiSuccess {Number} user_id 사용자 아이디(*)
 * @apiSuccess {String} user_name 이름(*)
 * @apiSuccess {String} user_email 이메일(*)
 * @apiSuccess {String} user_hash 비밀번호 해시값
 * @apiSuccess {String} user_password 비밀번호 (배포시 삭제 예정)
 * @apiSuccess {Datetime} user_date 회원가입 일자
 * @apiSuccess {Boolean} user_google 구글 로그인 여부(*)
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": 8,
 *       "user_name": "test",
 *       "user_email": "test@test.com",
 *       "user_hash": "$2b$10$7Ozh2zcG1T8N2uHBa4LnmOkM61POeABZb78oHm57QDkGYhQsgGzeG",
 *       "user_password": "test",
 *       "user_date": "2022-04-08T15:12:09.000Z",
 *       "user_google": false
 *     }
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": "12345678901234567890",
 *       "user_name": "홍길동",
 *       "user_email": "test@gmail.com",
 *       "user_google": true
 *     }
 * 
 * 
 * @apiError {String} msg 로그아웃 메시지
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "msg": "logout"
 *     }
 */


 /** 
 * @api {post} /auth/signin 로컬 로그인
 * @apiVersion 1.0.0
 * @apiName 로컬 로그인
 * @apiGroup Auth
 * @apiDescription 로컬 로그인을 시도합니다.
 * @apiParam {String} user_name 이름
 * @apiParam {String} user_password 비밀번호
 * @apiSuccess {Number} user_id 사용자 아이디
 * @apiSuccess {String} user_name 이름
 * @apiSuccess {String} user_email 이메일
 * @apiSuccess {String} user_hash 비밀번호 해시값
 * @apiSuccess {String} user_password 비밀번호 (배포시 삭제 예정)
 * @apiSuccess {Datetime} user_date 회원가입 일자
 * @apiSuccess {Boolean} user_google 구글 로그인 여부
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": 8,
 *       "user_name": "test",
 *       "user_email": "test@test.com",
 *       "user_hash": "$2b$10$7Ozh2zcG1T8N2uHBa4LnmOkM61POeABZb78oHm57QDkGYhQsgGzeG",
 *       "user_password": "test",
 *       "user_date": "2022-04-08T15:12:09.000Z",
 *       "user_google": false
 *     }
 * 
 * @apiError {String} name 미존재, password 불일치 시
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       Unauthorized
 *     }
*/

 /** 
 * @api {get} /auth/google 구글 로그인
 * @apiVersion 1.0.0
 * @apiName 구글 로그인 
 * @apiGroup Auth
 * @apiDescription 구글 로그인을 시도합니다. (직접 페이지 로드 해야합니다.)
 * @apiSuccess {Number} user_id 사용자 아이디
 * @apiSuccess {String} user_name 이름
 * @apiSuccess {String} user_email 이메일
 * @apiSuccess {Boolean} user_google 구글 로그인 여부
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": "12345678901234567890",
 *       "user_name": "홍길동",
 *       "user_email": "test@gmail.com",
 *       "user_google": true
 *     }
 * 
*/


/**
 * @api {get} /auth/signout 로그아웃
 *
 * @apiVersion 1.0.0
 * @apiName 로그아웃
 * @apiGroup Auth
 * @apiDescription 현재 로그인되어 있는 사용자를 로그아웃합니다.
 * @apiSuccess {String} msg 로그아웃 메시지
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "msg": "logout"
 *     }
 */
