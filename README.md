# Bookdam-Client

## Task 1

- 스토리북 UI 정리 시작
- Cypress 테스트 코드 작성

## Task 2

- 낙관적 업데이트
- 이미지 최적화
- Aria Label SEO 최적화

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
