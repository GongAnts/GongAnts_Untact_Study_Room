---

### 👋🏻 api-doc 200% 활용하기

<br>

- `POST`, `PUT`, `DELETE` 메서드는 성공 시, 응답 데이터를 보내지 않습니다.
  - _`200` code와 함께 아무 응답 데이터가 뜨지 않는다면 서버가 정상적으로 요청을 처리한 것 입니다!😃_

<br>

- `*` (asterisk) 표시는 요청 시, 필수 입력 데이터를 뜻합니다.

<br>

- 우측 `x.x.x` 의 버전 버튼을 통해 이전 API 버전과 변경 사항에 대한 비교가 가능합니다!

<br>

- api 테스트 관련 (Send a Sameple Request)

  - 요청 데이터 형식이 'Body'일 경우에는 Content-Type을 `json`으로 하고 데이터를 보내주세요!
  - _기본으로 설정된 버튼이 `json` 일거에요!_

<br>

- 그밖에 api-doc이 작동하지 않는다거나 궁금한 점이 생겼다거나 더 추가해줬으면 하는 게 있다면 언제든 말해주세요~! 🙋

<br>
<br>

<details>

<summary> <u> ▶ ➕ Gongant's API Design Convention </u> </summary>

<br>

- 네이밍

  - Snake Case
  - No Abbreviation

<br>

- 요청 방식

  - Query String
    - `GET`, `DELETE` Method
  - Request Body
    - `PUT`, `POST`

<br>

- 응답 방식

  - 응답 코드
    - `200` : 성공
    - `400` : 잘못된 요청
      - `401` : 권한 없음
    - `500` : 서버 에러

<br>

- API Guide
  - Required Parameter 의 경우 (\*) 로 표현합니다.
  - 정렬 기준은 `GET` → `POST` → `PUT` → `DELETE` 로 합니다.

</details>

<br>
