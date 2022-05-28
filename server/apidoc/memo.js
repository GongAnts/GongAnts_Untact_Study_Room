/**
 * @api {get} /memo 메모 리스트 로드
 *
 * @apiVersion 1.0.0
 * @apiName 메모 리스트 로드
 * @apiGroup Memo
 * @apiDescription 현재 사용자가 작성한 메모들을 로드합니다.(로그인 상태에서만 가능합니다.)
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {Int} memo_id 메모 아이디
 * @apiSuccess {String} memo_title 메모 제목
 * @apiSuccess {String} memo_content 메모 내용
 * @apiSuccess {Datetime} user_date 최종 수정 일자
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "user_id": "utest",
 *             "memo_id": 6,
 *             "memo_title": "메모 제목 테스트",
 *             "memo_content": "메모 내용 테스트",
 *             "memo_date": "2022-05-04T07:50:40.000Z"
 *         },
 *         {
 *             "user_id": "utest",
 *             "memo_id": 7,
 *             "memo_title": "메모 제목 테스트2",
 *             "memo_content": "메모 내용 테스트2",
 *             "memo_date": "2022-05-04T08:01:03.000Z"
 *         }
 *     ]
 */

/**
 * @api {get} /memo/detail 메모 상세 정보 로드
 *
 * @apiVersion 1.0.0
 * @apiName 단일 메모 로드
 * @apiGroup Memo
 * @apiDescription 메모 하나에 대한 정보를 로드합니다.(로그인 상태에서만 가능합니다.)
 * @apiParam {Int} memo_id 메모 아이디
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {Int} memo_id 메모 아이디
 * @apiSuccess {String} memo_title 메모 제목
 * @apiSuccess {String} memo_content 메모 내용
 * @apiSuccess {Datetime} user_date 최종 수정 일자
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "user_id": "utest",
 *         "memo_id": 6,
 *         "memo_title": "메모 제목 테스트",
 *         "memo_content": "메모 내용 테스트",
 *         "memo_date": "2022-05-04T07:50:40.000Z"
 *     }
 */

/**
 * @api {post} /memo 메모 추가
 * @apiVersion 1.0.0
 * @apiName 메모 추가
 * @apiGroup Memo
 * @apiDescription 새로운 메모를 추가합니다. (로그인 상태에서만 가능합니다.)
 * @apiBody {String} memo_title 메모 제목
 * @apiBody {String} memo_content 메모 내용
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {String} memo_title 메모 제목
 * @apiSuccess {String} memo_content 메모 내용
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": "utest",
 *       "memo_title": "메모 제목 테스트",
 *       "memo_content": "메모 내용 테스트"
 *     }
 */

/**
 * @api {put} /memo 메모 수정
 * @apiVersion 1.0.0
 * @apiName 메모 수정
 * @apiGroup Memo
 * @apiDescription 메모를 수정합니다.
 * @apiBody {String} memo_id 메모 아이디(*)
 * @apiBody {String} memo_title 메모 제목
 * @apiBody {String} memo_content 메모 내용
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": 1,
 *       "memo_title": "메모 수정 테스트",
 *       "memo_content": "메모 수정 테스트"
 *     }
 */

/**
 * @api {delete} /memo 메모 삭제
 *
 * @apiVersion 1.0.0
 * @apiName 메모 삭제
 * @apiGroup Memo
 * @apiDescription 메모를 삭제합니다.
 * @apiParam {Int} id 메모 아이디
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "memo_id": "1"
 *     }
 */
