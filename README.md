# Bookdam-Client

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
