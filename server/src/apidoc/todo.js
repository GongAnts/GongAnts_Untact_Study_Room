/////////////////////////////////////////// Version 1.0.0
/**
 * @api {get} /todo/all 전체 할일 로드
 *
 * @apiVersion 1.0.0
 * @apiName 전체 할일 로드
 * @apiGroup Todo
 * @apiDescription 사용자가 작성한 모든 할일들을 로드합니다.(로그인 상태에서만 가능합니다.)
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {Int} todo_id 할일 아이디
 * @apiSuccess {String} todo_title 할일 내용
 * @apiSuccess {Boolean} todo_check 완료 여부
 * @apiSuccess {Datetime} create_date 생성 날짜
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "user_id": "utest",
 *             "todo_id": 1,
 *             "todo_title": "할일 이름",
 *             "todo_check": 0,
 *             "create_date": "2022-04-20T05:46:36.000Z"
 *         },
 *         {
 *             "user_id": "utest",
 *             "todo_id": 2,
 *             "todo_title": "할일 테스트",
 *             "todo_check": 0,
 *             "create_date": "2022-05-20T06:39:14.000Z"
 *         }
 *     ]
 */

/**
 * @api {get} /todo/monthly 월별 할일 로드
 *
 * @apiVersion 1.0.0
 * @apiName 선택된 월별 할일 로드
 * @apiGroup Todo
 * @apiDescription 선택된 월에 대한 할일들을 로드합니다.(로그인 상태에서만 가능합니다.)
 * @apiParam {String} year 년
 * @apiParam {String} month 월
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {Int} todo_id 할일 아이디
 * @apiSuccess {String} todo_title 할일 내용
 * @apiSuccess {Boolean} todo_check 완료 여부
 * @apiSuccess {Datetime} create_date 생성 날짜
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "user_id": "utest",
 *             "todo_id": 1,
 *             "todo_title": "할일 테스트1",
 *             "todo_check": 0,
 *             "create_date": "2022-05-18T05:46:36.000Z"
 *         },
 *         {
 *             "user_id": "utest",
 *             "todo_id": 2,
 *             "todo_title": "할일 테스트2",
 *             "todo_check": 0,
 *             "create_date": "2022-05-20T06:39:14.000Z"
 *         }
 *     ]
 */

/**
 * @api {get} /todo/today 오늘 할일 로드
 *
 * @apiVersion 1.0.0
 * @apiName 오늘 할일 로드
 * @apiGroup Todo
 * @apiDescription 오늘 할일들을 로드합니다.(로그인 상태에서만 가능합니다.)
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {Int} todo_id 할일 아이디
 * @apiSuccess {String} todo_title 할일 내용
 * @apiSuccess {Boolean} todo_check 완료 여부
 * @apiSuccess {Datetime} create_date 생성 날짜
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "user_id": "utest",
 *             "todo_id": 1,
 *             "todo_title": "할일 테스트",
 *             "todo_check": 0,
 *             "create_date": "2022-05-18T05:46:36.000Z"
 *         }
 *     ]
 */

/**
 * @api {get} /todo/detail 할일 상세 정보 로드
 *
 * @apiVersion 1.0.0
 * @apiName 할일 상세 정보 로드
 * @apiGroup Todo
 * @apiDescription 할일 하나에 대한 정보를 로드합니다.(로그인 상태에서만 가능합니다.)
 * @apiParam {String} id 할일 아이디
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {Int} todo_id 할일 아이디
 * @apiSuccess {String} todo_title 할일 내용
 * @apiSuccess {Boolean} todo_check 완료 여부
 * @apiSuccess {Datetime} create_date 생성 날짜
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "user_id": "utest",
 *             "todo_id": 1,
 *             "todo_title": "할일 테스트",
 *             "todo_check": 0,
 *             "create_date": "2022-05-18T05:46:36.000Z"
 *         }
 *     ]
 */

/**
 * @api {post} /todo 할일 추가
 * @apiVersion 1.0.0
 * @apiName 할일 추가
 * @apiGroup Todo
 * @apiDescription 새로운 할일을 추가합니다. (로그인 상태에서만 가능합니다.)
 * @apiBody {String} todo_title 할일 내용
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {Int} todo_id 할일 아이디
 * @apiSuccess {String} todo_title 할일 내용
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "user_id": "utest",
 *         "todo_title": "할일 추가 테스트"
 *     }
 */

/**
 * @api {put} /todo 할일 내용 수정
 * @apiVersion 1.0.0
 * @apiName 일정 수정
 * @apiGroup Todo
 * @apiDescription 할일 내용을 수정합니다. (로그인 상태에서만 가능합니다.)
 * @apiBody {String} todo_id 할일 아이디
 * @apiBody {String} todo_title 수정할 할일 내용
 * @apiSuccess {Int} todo_id 할일 아이디
 * @apiSuccess {String} todo_title 할일 내용
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "todo_id": 1,
 *         "todo_title": "할일 수정 테스트"
 *     }
 */

/**
 * @api {put} /todo/check 할일 상태 수정
 * @apiVersion 1.0.0
 * @apiName 할일 상태 수정
 * @apiGroup Todo
 * @apiDescription 할일의 완료 여부를 수정합니다. - {"todo_check" : 0} -> 미완료 된 할일 / {"todo_check" : 1} -> 완료 된 할일
 * @apiParam {String} id 할일 아이디
 * @apiSuccess {Int} todo_id 할일 아이디
 * @apiSuccess {String} todo_title 할일 내용
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "todo_id": "1"
 *     }
 */

/**
 * @api {delete} /todo 할일 삭제
 * @apiVersion 1.0.0
 * @apiName 할일 삭제
 * @apiGroup Todo
 * @apiDescription 기존 할일을 삭제합니다.
 * @apiParam {String} id 할일 아이디
 * @apiSuccess {Int} todo_id 할일 아이디
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "todo_id": "1"
 *     }
 */

/////////////////////////////////////////// Version 2.0.0
/**
 * @api {get} /todo/all 전체 할일 로드
 *
 * @apiVersion 2.0.0
 * @apiName 전체 할일 로드
 * @apiGroup Todo
 * @apiDescription 사용자가 작성한 모든 할일들을 로드합니다.(로그인 상태에서만 가능합니다.)
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {Int} todo_id 할일 아이디
 * @apiSuccess {String} todo_title 할일 내용
 * @apiSuccess {Boolean} todo_check 완료 여부
 * @apiSuccess {Datetime} create_date 생성 날짜
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "user_id": "utest",
 *             "todo_id": 1,
 *             "todo_title": "할일 이름1",
 *             "todo_check": 0,
 *             "create_date": "2022-01-01T01:01:01.000Z"
 *         },
 *         {
 *             "user_id": "utest",
 *             "todo_id": 2,
 *             "todo_title": "할일 이름2",
 *             "todo_check": 0,
 *             "create_date": "2022-02-02T02:02:02.000Z"
 *         }
 *     ]
 */

/**
 * @api {get} /todo/monthly 월별 할일 로드
 *
 * @apiVersion 2.0.0
 * @apiName 선택된 월별 할일 로드
 * @apiGroup Todo
 * @apiDescription 선택된 월에 대한 할일들을 로드합니다.(로그인 상태에서만 가능합니다.)
 * @apiParam {String} year 년(*)
 * @apiParam {String} month 월(*)
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {Int} todo_id 할일 아이디
 * @apiSuccess {String} todo_title 할일 내용
 * @apiSuccess {Boolean} todo_check 완료 여부
 * @apiSuccess {Datetime} create_date 생성 날짜
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "user_id": "utest",
 *             "todo_id": 1,
 *             "todo_title": "할일 테스트1",
 *             "todo_check": 0,
 *             "create_date": "2022-05-05T01:00:00.000Z"
 *         },
 *         {
 *             "user_id": "utest",
 *             "todo_id": 2,
 *             "todo_title": "할일 테스트2",
 *             "todo_check": 0,
 *             "create_date": "2022-05-06T02:00:00.000Z"
 *         }
 *     ]
 */

/**
 * @api {get} /todo/today 오늘 할일 로드
 *
 * @apiVersion 2.0.0
 * @apiName 오늘 할일 로드
 * @apiGroup Todo
 * @apiDescription 오늘 할일들을 로드합니다.(로그인 상태에서만 가능합니다.)
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {Int} todo_id 할일 아이디
 * @apiSuccess {String} todo_title 할일 내용
 * @apiSuccess {Boolean} todo_check 완료 여부
 * @apiSuccess {Datetime} create_date 생성 날짜
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "user_id": "utest",
 *             "todo_id": 1,
 *             "todo_title": "할일 테스트",
 *             "todo_check": 0,
 *             "create_date": "2022-01-01T01:01:01.000Z"
 *         }
 *     ]
 */

/**
 * @api {get} /todo/detail 할일 상세 정보 로드
 *
 * @apiVersion 2.0.0
 * @apiName 할일 상세 정보 로드
 * @apiGroup Todo
 * @apiDescription 할일 하나에 대한 정보를 로드합니다.(로그인 상태에서만 가능합니다.)
 * @apiParam {String} id 할일 아이디(*)
 * @apiSuccess {String} user_id 유저 아이디
 * @apiSuccess {Int} todo_id 할일 아이디
 * @apiSuccess {String} todo_title 할일 내용
 * @apiSuccess {Boolean} todo_check 완료 여부
 * @apiSuccess {Datetime} create_date 생성 날짜
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "user_id": "utest",
 *             "todo_id": 1,
 *             "todo_title": "할일 테스트",
 *             "todo_check": 0,
 *             "create_date": "2022-01-01T01:01:01.000Z"
 *         }
 *     ]
 */

/**
 * @api {post} /todo 할일 추가
 * @apiVersion 2.0.0
 * @apiName 할일 추가
 * @apiGroup Todo
 * @apiDescription 오늘 할일을 추가합니다. (로그인 상태에서만 가능합니다.)
 * @apiBody {String} todo_title 할일 내용(*)
 * @apiError err required parameter 미입력 시
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *          Bad Request
 *     }
 */

/**
 * @api {put} /todo 할일 내용 수정
 * @apiVersion 2.0.0
 * @apiName 일정 수정
 * @apiGroup Todo
 * @apiDescription 할일 내용을 수정합니다. (로그인 상태에서만 가능합니다.)
 * @apiBody {String} todo_id 할일 아이디(*)
 * @apiBody {String} todo_title 수정할 할일 내용(*)
 * @apiError err required parameter 미입력 시
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *          Bad Request
 *     }
 */

/**
 * @api {put} /todo/check 할일 상태 수정
 * @apiVersion 2.0.0
 * @apiName 할일 상태 수정
 * @apiGroup Todo
 * @apiDescription 할일의 완료 여부를 수정합니다. - {"todo_check" : 0} -> 미완료 된 할일 / {"todo_check" : 1} -> 완료 된 할일
 * @apiParam {String} id 할일 아이디(*)
 * @apiError err required parameter 미입력 시
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *          Bad Request
 *     }
 */

/**
 * @api {delete} /todo 할일 삭제
 * @apiVersion 2.0.0
 * @apiName 할일 삭제
 * @apiGroup Todo
 * @apiDescription 기존 할일을 삭제합니다.
 * @apiParam {String} id 할일 아이디(*)
 * @apiError err required parameter 미입력 시
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *          Bad Request
 *     }
 */
