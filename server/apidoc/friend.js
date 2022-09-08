/**
 * @api {get} /friend/search 친구 찾기
 *
 * @apiVersion 1.0.0
 * @apiName 친구 찾기
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
        "user_id": "utest",
        "user_type": "local",
        "user_name": "테스트",
        "user_email": "test@test.com",
        "user_hash": "$2b$10$7Ozh2zcG1T8N2uHBa4LnmOkM61POeABZb78oHm57QDkGYhQsgGzeG",
        "user_password": "test",
        "user_date": "2022-04-09T00:12:09.000Z"
 *     }
 */

/**
 * @api {get} /friend/list 친구 리스트 조회
 *
 * @apiVersion 1.0.0
 * @apiName 친구 리스트 조회
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
