# File Compression & Extraction

![GitHub Action](https://img.shields.io/badge/GitHub%20Action-Compression-blue?style=flat-square)

**File Compression & Extraction**은 파일 및 폴더를 `zip`, `tar`, `tar.gz` 형식으로 압축 및 해제할 수 있는 GitHub Action 플러그인입니다.

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
  uses: KangYoungIn/compressaction@v1
  with:
    action: "compress"
    format: "zip"
    source: "file1.txt,file2.txt,folder"
    destination: "archive.zip"
```
---

### **압축 (Compression)**
**단일 폴더 압축 (`ZIP`)**
```yaml
- name: Compress a single folder (ZIP)
  uses: KangYoungIn/compressaction@v1
  with:
    action: "compress"
    format: "zip"
    source: "test-data"
    destination: "test-data.zip"
```

**다중 폴더 압축 (`ZIP`)**
```yaml
- name: Compress multiple folders (ZIP)
  uses: KangYoungIn/compressaction@v1
  with:
    action: "compress"
    format: "zip"
    source: "folder1,folder2"
    destination: "multi-folder.zip"
```

**단일 파일 압축 (`ZIP`)**
```yaml
- name: Compress a single file (ZIP)
  uses: KangYoungIn/compressaction@v1
  with:
    action: "compress"
    format: "zip"
    source: "test.txt"
    destination: "test.zip"
```

**다중 파일 압축 (`ZIP`)**
```yaml
- name: Compress multiple files (ZIP)
  uses: KangYoungIn/compressaction@v1
  with:
    action: "compress"
    format: "zip"
    source: "file1.txt,file2.txt"
    destination: "multi-files.zip"
```

**단일 폴더 압축 (`TAR.GZ`)**
```yaml
- name: Compress a single folder (TAR.GZ)
  uses: KangYoungIn/compressaction@v1
  with:
    action: "compress"
    format: "tar.gz"
    source: "test-data"
    destination: "test-data.tar.gz"
```

**다중 폴더 압축 (`TAR.GZ`)**
```yaml
- name: Compress multiple folders (TAR.GZ)
  uses: KangYoungIn/compressaction@v1
  with:
    action: "compress"
    format: "tar.gz"
    source: "folder1,folder2"
    destination: "multi-folder.tar.gz"
```

**단일 파일 압축 (`TAR.GZ`)**
```yaml
- name: Compress a single file (TAR.GZ)
  uses: KangYoungIn/compressaction@v1
  with:
    action: "compress"
    format: "tar.gz"
    source: "test.txt"
    destination: "test.tar.gz"
```

**다중 파일 압축 (`TAR.GZ`)**
```yaml
- name: Compress multiple files (TAR.GZ)
  uses: KangYoungIn/compressaction@v1
  with:
    action: "compress"
    format: "tar.gz"
    source: "file1.txt,file2.txt"
    destination: "multi-files.tar.gz"
```

---

###**압축 해제 (Decompression)**
**ZIP 파일 압축 해제**
```yaml
- name: Decompress ZIP
  uses: KangYoungIn/compressaction@v1
  with:
    action: "decompress"
    format: "zip"
    source: "test-data.zip"
    destination: "test-output-zip"
```

**TAR 파일 압축 해제**
```yaml
- name: Decompress TAR
  uses: KangYoungIn/compressaction@v1
  with:
    action: "decompress"
    format: "tar"
    source: "test-data.tar"
    destination: "test-output-tar"
```

**TAR.GZ 파일 압축 해제**
```yaml
- name: Decompress TAR.GZ
  uses: KangYoungIn/compressaction@v1
  with:
    action: "decompress"
    format: "tar.gz"
    source: "test-data.tar.gz"
    destination: "test-output-tar-gz"
```

---

### **최종 정리**
| **사용 예시** | **설정 방법** |
|--------------|--------------|
| **단일 폴더 압축 (ZIP)** | `source: "test-data", destination: "test-data.zip"` |
| **다중 폴더 압축 (ZIP)** | `source: "folder1,folder2", destination: "multi-folder.zip"` |
| **단일 파일 압축 (ZIP)** | `source: "test.txt", destination: "test.zip"` |
| **다중 파일 압축 (ZIP)** | `source: "file1.txt,file2.txt", destination: "multi-files.zip"` |
| **단일 폴더 압축 (TAR.GZ)** | `source: "test-data", destination: "test-data.tar.gz"` |
| **다중 폴더 압축 (TAR.GZ)** | `source: "folder1,folder2", destination: "multi-folder.tar.gz"` |
| **단일 파일 압축 (TAR.GZ)** | `source: "test.txt", destination: "test.tar.gz"` |
| **다중 파일 압축 (TAR.GZ)** | `source: "file1.txt,file2.txt", destination: "multi-files.tar.gz"` |
| **ZIP 압축 해제** | `source: "test-data.zip", destination: "test-output-zip"` |
| **TAR 압축 해제** | `source: "test-data.tar", destination: "test-output-tar"` |
| **TAR.GZ 압축 해제** | `source: "test-data.tar.gz", destination: "test-output-tar-gz"` |

---

## **오픈소스 라이브러리**
이 프로젝트는 다음 오픈소스를 사용합니다.

| 라이브러리  | 버전 | 라이선스 | 용도 |
|------------|------|--------|------|
| [archiver](https://www.npmjs.com/package/archiver) | `^7.0.1` | MIT | ZIP 압축 |
| [unzipper](https://www.npmjs.com/package/unzipper) | `^0.12.3` | MIT | ZIP 압축 해제 |
| [tar-stream](https://www.npmjs.com/package/tar-stream) | `^3.1.3` | MIT | TAR 압축 및 해제 |
| [@actions/core](https://www.npmjs.com/package/@actions/core) | `^1.11.1` | MIT | GitHub Actions 지원 |
