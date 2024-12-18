# Bookdam-Client

## 12-17

- 태그 필터링 기능 [O]
- 검색 기능 [O]
- 정렬 기능 [O]
- 모든 UI 완성 (Tour) 기능 빼고
- 엑셀 다운로드 기능
- 모달 삭제 텍스트 빨강 변경
- 로그인 API에 따른 Access Token 연장 기능
- Error 처리 기능
- 스토리북 UI 정리 시작
- 암호화 빌드 문제 정리
- Git Commit Message 정리

## 12-18

- 낙관적 업데이트
- Cypress 테스트 코드 작성

## 12-20

- 이미지 최적화
- Aria Label SEO 최적화

## 12-21

- 배포 및 뒷작업 완료

## Folder Structure

- providers: Provider & HOC
- views (pages): Page Components
- templates: Layout & Page Components Template (DI)
  - Domain: Component Imports And Packaging
  - \*.index.tsx: UI
  - \*.test.tsx: Integration Test
- components: Role Components
  - Role : Comopnents
    - hooks: Hooks
    - actions: Non-Hooks Function
    - types: Types
    - \*.index.tsx: UI
    - \*.stories.tsx: StoryBook
    - \*.test.tsx: Unit Test
- entities:
  - apis: API
  - query: React Query
  - types: Interface Types
- shared: Global
  - ui: Global Components
  - types: Global Types
  - utils: Global Utils
  - libs: Global Library Instance
  - hooks: Global Hooks

## Git Commit Message

feat : 새로운 기능 추가
fix : 버그 수정
docs : 문서 수정
style : CSS 수정 및 UI 개선
refactor : 코드 리펙토링
test : 테스트 코드, 리펙토링 테스트 코드 추가
chore : 빌드 업무 수정, 패키지 매니저 수정
