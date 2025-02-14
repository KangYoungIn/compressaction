# CompressAction

![GitHub Action](https://img.shields.io/badge/GitHub%20Action-Compression-blue?style=flat-square)

**CompressAction**은 파일 및 폴더를 `zip`, `tar`, `tar.gz` 형식으로 압축 및 해제할 수 있는 GitHub Action 플러그인입니다.

---

## **기능**
 - `zip`, `tar`, `tar.gz` 포맷 지원  
 - 다중 파일 및 폴더 압축 가능  
 - GitHub Actions에서 직접 실행 가능  

---

## **사용법**

### **입력값 (`with` options)**

| 옵션          | 필수 여부 | 설명 |
|--------------|---------|--------------------------------|
| `action`     | ✅      | `"compress"` 또는 `"decompress"` |
| `format`     | ✅      | `"zip"`, `"tar"`, `"tar.gz"` 중 선택 |
| `source`     | ✅      | 압축할 파일/폴더 (쉼표로 구분 가능) |
| `destination`| ✅      | 압축된 파일 또는 압축 해제할 폴더 경로 |

```yaml
- name: Compress multiple files
  uses: ./
  with:
    action: "compress"
    format: "zip"
    source: "file1.txt,file2.txt,folder"
    destination: "archive.zip"
```
---

## **오픈소스 라이브러리**
이 프로젝트는 다음 오픈소스를 사용합니다.

| 라이브러리  | 버전 | 라이선스 | 용도 |
|------------|------|--------|------|
| [archiver](https://www.npmjs.com/package/archiver) | `^7.0.1` | MIT | ZIP 압축 |
| [unzipper](https://www.npmjs.com/package/unzipper) | `^0.12.3` | MIT | ZIP 압축 해제 |
| [tar-stream](https://www.npmjs.com/package/tar-stream) | `^3.1.3` | MIT | TAR 압축 및 해제 |
| [@actions/core](https://www.npmjs.com/package/@actions/core) | `^1.11.1` | MIT | GitHub Actions 지원 |
