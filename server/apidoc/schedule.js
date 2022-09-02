/**
 * @api {get} /schedule/all 전체 일정 로드
 *
 * @apiVersion 1.0.0
 * @apiName 전체 일정 로드
 * @apiGroup Schedule
 * @apiDescription 사용자가 작성한 모든 일정들을 로드합니다.(로그인 상태에서만 가능합니다.)
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {Int} schedule_id 일정 아이디
 * @apiSuccess {String} schedule_title 일정 제목
 * @apiSuccess {String} schedule_description 일정 내용
 * @apiSuccess {Datetime} schedule_date 일정 날짜
 * @apiSuccess {String} check 일정 완료 여부
 * @apiSuccess {String} priority 일정 중요도
 * @apiSuccess {Datetime} create_date 일정 생성 날짜
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *               "user_id": "utest",
 *               "schedule_id": 1,
 *               "schedule_title": "일정 제목1",
 *               "schedule_description": "일정 설명1",
 *               "schedule_date": "2022-04-14T17:16:00.000Z",
 *               "schedule_check": 0,
 *               "schedule_priority": null,
 *               "create_date": "2022-04-10T08:25:26.000Z"
 *         },
 *  *       {
 *               "user_id": "utest",
 *               "schedule_id": 2,
 *               "schedule_title": "일정 제목2",
 *               "schedule_description": "일정 설명2",
 *               "schedule_date": "2022-05-16T17:16:00.000Z",
 *               "schedule_check": 0,
 *               "schedule_priority": null,
 *               "create_date": "2022-05-16T08:25:26.000Z"
 *         }
 *     ]
 */

/**
 * @api {get} /schedule/monthly 월별 일정 로드
 *
 * @apiVersion 1.0.0
 * @apiName 선택된 월별 일정 로드
 * @apiGroup Schedule
 * @apiDescription 선택된 월에 대한 일정들을 로드합니다.(로그인 상태에서만 가능합니다.)
 * @apiParam {String} year 년
 * @apiParam {String} month 월
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {Int} schedule_id 일정 아이디
 * @apiSuccess {String} schedule_title 일정 제목
 * @apiSuccess {String} schedule_description 일정 내용
 * @apiSuccess {Datetime} schedule_date 일정 날짜
 * @apiSuccess {String} check 일정 완료 여부
 * @apiSuccess {String} priority 일정 중요도
 * @apiSuccess {Datetime} create_date 일정 생성 날짜
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      [
 *          {
 *                "user_id": "utest",
 *                "schedule_id": 1,
 *                "schedule_title": "일정 제목1",
 *                "schedule_description": "일정 설명1",
 *                "schedule_date": "2022-04-14T17:16:00.000Z",
 *                "schedule_check": 0,
 *                "schedule_priority": null,
 *                "create_date": "2022-04-10T08:25:26.000Z"
 *          }
 *      ]
 */

/**
 * @api {get} /schedule/today 오늘 일정 로드
 *
 * @apiVersion 1.0.0
 * @apiName 오늘 일정 로드
 * @apiGroup Schedule
 * @apiDescription 오늘 일정들을 로드합니다.(로그인 상태에서만 가능합니다.)
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {Int} schedule_id 일정 아이디
 * @apiSuccess {String} schedule_title 일정 제목
 * @apiSuccess {String} schedule_description 일정 내용
 * @apiSuccess {Datetime} schedule_date 일정 날짜
 * @apiSuccess {String} check 일정 완료 여부
 * @apiSuccess {String} priority 일정 중요도
 * @apiSuccess {Datetime} create_date 일정 생성 날짜
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      [
 *          {
 *               "user_id": "utest",
 *               "schedule_id": 1,
 *               "schedule_title": "일정 제목1",
 *               "schedule_description": "일정 설명1",
 *               "schedule_date": "2022-04-14T17:16:00.000Z",
 *               "schedule_check": 0,
 *               "schedule_priority": 상,
 *               "create_date": "2022-04-10T08:25:26.000Z"
 *          }
 *      ]
 */

/**
 * @api {post} /schedule 일정 추가
 * @apiVersion 1.0.0
 * @apiName 일정 추가
 * @apiGroup Schedule
 * @apiDescription 새로운 일정을 추가합니다. (로그인 상태에서만 가능합니다. | check 완료 -> 1, 미완료 -> 0)
 * @apiBody {String} date 일정 년월일(*)(ex. "20220505")
 * @apiBody {String} time 일정 시분(*)(ex. "0216")
 * @apiBody {String} title 일정 제목(*)
 * @apiBody {String} description 일정 설명
 * @apiBody {String} check 일정 완료 여부
 * @apiBody {String} priority 일정 중요도
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {String} schedule_title 일정 제목
 * @apiSuccess {String} schedule_description 일정 내용
 * @apiSuccess {Datetime} schedule_date 일정 날짜
 * @apiSuccess {String} check 일정 완료 여부
 * @apiSuccess {String} priority 일정 중요도
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "user_id": "utest",
 *          "schedule_title": "일정 제목1",
 *          "schedule_description": "일정 설명1",
 *          "schedule_date": "2022-04-14T17:16:00.000Z",
 *          "schedule_check": 0,
 *          "schedule_priority": 상,
 *     }
 */

/**
 * @api {put} /schedule 일정 수정
 * @apiVersion 1.0.0
 * @apiName 일정 수정
 * @apiGroup Schedule
 * @apiDescription 기존 일정을 수정합니다. (로그인 상태에서만 가능합니다. | check 완료 -> 1, 미완료 -> 0)
 * @apiBody {String} id 일정 아이디
 * @apiBody {String} date 일정 년월일(*)(ex. "20220505")
 * @apiBody {String} time 일정 시분(*)(ex. "0216")
 * @apiBody {String} title 일정 제목(*)
 * @apiBody {String} description 일정 설명
 * @apiBody {String} check 일정 완료 여부(*)
 * @apiBody {String} priority 일정 중요도
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {String} schedule_title 일정 제목
 * @apiSuccess {String} schedule_description 일정 내용
 * @apiSuccess {Datetime} schedule_date 일정 날짜
 * @apiSuccess {String} check 일정 완료 여부
 * @apiSuccess {String} priority 일정 중요도

 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "schedule_title": "일정 제목1",
 *          "schedule_description": "일정 설명1",
 *          "schedule_date": "2022-04-14T17:16:00.000Z",
 *          "schedule_check": 0,
 *          "schedule_priority": 상,
 *     }
 */

/**
 * @api {delete} /schedule 일정 삭제
 * @apiVersion 1.0.0
 * @apiName 일정 삭제
 * @apiGroup Schedule
 * @apiDescription 기존 일정을 삭제합니다. (로그인 상태에서만 가능합니다.)
 * @apiParam {String} id 일정 아이디
 * @apiSuccess {String} schedule_id 일정 아이디
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "schedule_id": "1"
 *     }
 */
