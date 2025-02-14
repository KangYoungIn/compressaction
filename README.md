## **File Compression & Extraction**  

**File Compression & Extraction**은 GitHub Actions에서 파일과 폴더를 `zip`, `tar`, `tar.gz` 형식으로 압축 및 해제할 수 있도록 도와주는 플러그인입니다.  
이 플러그인은 **빌드 에이전트 환경에 `tar`, `zip` 등의 툴이 설치되어 있지 않아도** 내장된 라이브러리를 사용하여 압축 및 해제 작업을 수행합니다.  

---

## **기능**
- `zip`, `tar`, `tar.gz` 포맷 지원  
- 단일/다중 파일 및 폴더 압축 가능  
- GitHub Actions에서 직접 실행 가능  
- 압축 해제 후 원본 디렉토리 구조 유지  

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
  uses: KangYoungIn/file-compression-extraction@v1
  with:
    action: "compress"
    format: "zip"
    source: "file1.txt,file2.txt,folder"
    destination: "archive.zip"
```

---

### **압축 (Compression)**  
#### **단일 폴더 압축 (`ZIP`)**
```yaml
- name: Compress a single folder (ZIP)
  uses: KangYoungIn/file-compression-extraction@v1
  with:
    action: "compress"
    format: "zip"
    source: "test-data"
    destination: "test-data.zip"
```

#### **다중 폴더 압축 (`ZIP`)**
```yaml
- name: Compress multiple folders (ZIP)
  uses: KangYoungIn/file-compression-extraction@v1
  with:
    action: "compress"
    format: "zip"
    source: "folder1,folder2"
    destination: "multi-folder.zip"
```

#### **단일 파일 압축 (`ZIP`)**
```yaml
- name: Compress a single file (ZIP)
  uses: KangYoungIn/file-compression-extraction@v1
  with:
    action: "compress"
    format: "zip"
    source: "test.txt"
    destination: "test.zip"
```

#### **다중 파일 압축 (`ZIP`)**
```yaml
- name: Compress multiple files (ZIP)
  uses: KangYoungIn/file-compression-extraction@v1
  with:
    action: "compress"
    format: "zip"
    source: "file1.txt,file2.txt"
    destination: "multi-files.zip"
```

#### **단일 폴더 압축 (`TAR.GZ`)**
```yaml
- name: Compress a single folder (TAR.GZ)
  uses: KangYoungIn/file-compression-extraction@v1
  with:
    action: "compress"
    format: "tar.gz"
    source: "test-data"
    destination: "test-data.tar.gz"
```

#### **다중 폴더 압축 (`TAR.GZ`)**
```yaml
- name: Compress multiple folders (TAR.GZ)
  uses: KangYoungIn/file-compression-extraction@v1
  with:
    action: "compress"
    format: "tar.gz"
    source: "folder1,folder2"
    destination: "multi-folder.tar.gz"
```

---

### **압축 해제 (Decompression)**  
#### **ZIP 파일 압축 해제**
```yaml
- name: Decompress ZIP
  uses: KangYoungIn/file-compression-extraction@v1
  with:
    action: "decompress"
    format: "zip"
    source: "test-data.zip"
    destination: "test-output-zip"
```

#### **TAR.GZ 파일 압축 해제**
```yaml
- name: Decompress TAR.GZ
  uses: KangYoungIn/file-compression-extraction@v1
  with:
    action: "decompress"
    format: "tar.gz"
    source: "test-data.tar.gz"
    destination: "test-output-tar-gz"
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

---

# **File Compression & Extraction**  

**File Compression & Extraction** is a GitHub Actions plugin that allows you to compress and extract files and folders in `zip`, `tar`, and `tar.gz` formats.
Unlike other solutions, this action **does not require tools like `tar` or `zip` to be installed on the build agent**. Instead, it utilizes built-in Node.js libraries to handle compression and extraction.

---

## **Features**
- Supports `zip`, `tar`, and `tar.gz` formats  
- Compresses single/multiple files & folders  
- Runs directly within GitHub Actions  
- Preserves original directory structure after extraction  

---

## **Usage**

### **Input Parameters**
| Option       | Required | Description |
|-------------|----------|--------------------------------|
| `action`     | ✅       | `"compress"` or `"decompress"` |
| `format`     | ✅       | Choose `"zip"`, `"tar"`, or `"tar.gz"` |
| `source`     | ✅       | Files/folders to compress (comma-separated) |
| `destination`| ✅       | Destination file or directory |

```yaml
- name: Compress multiple files
  uses: KangYoungIn/file-compression-extraction@v1
  with:
    action: "compress"
    format: "zip"
    source: "file1.txt,file2.txt,folder"
    destination: "archive.zip"
```

---

### **Compression**  
#### **Compress a Single Folder (`ZIP`)**
```yaml
- name: Compress a single folder (ZIP)
  uses: KangYoungIn/file-compression-extraction@v1
  with:
    action: "compress"
    format: "zip"
    source: "test-data"
    destination: "test-data.zip"
```

#### **Compress Multiple Folders (`ZIP`)**
```yaml
- name: Compress multiple folders (ZIP)
  uses: KangYoungIn/file-compression-extraction@v1
  with:
    action: "compress"
    format: "zip"
    source: "folder1,folder2"
    destination: "multi-folder.zip"
```

#### **Compress a Single File (`ZIP`)**
```yaml
- name: Compress a single file (ZIP)
  uses: KangYoungIn/file-compression-extraction@v1
  with:
    action: "compress"
    format: "zip"
    source: "test.txt"
    destination: "test.zip"
```

---

### **Decompression**  
#### **Extract ZIP File**
```yaml
- name: Decompress ZIP
  uses: KangYoungIn/file-compression-extraction@v1
  with:
    action: "decompress"
    format: "zip"
    source: "test-data.zip"
    destination: "test-output-zip"
```

#### **Extract TAR.GZ File**
```yaml
- name: Decompress TAR.GZ
  uses: KangYoungIn/file-compression-extraction@v1
  with:
    action: "decompress"
    format: "tar.gz"
    source: "test-data.tar.gz"
    destination: "test-output-tar-gz"
```

---

## **Open Source Libraries**
This project uses the following open-source libraries.

| Library | Version | License | Purpose |
|---------|--------|--------|---------|
| [archiver](https://www.npmjs.com/package/archiver) | `^7.0.1` | MIT | ZIP Compression |
| [unzipper](https://www.npmjs.com/package/unzipper) | `^0.12.3` | MIT | ZIP Extraction |
| [tar-stream](https://www.npmjs.com/package/tar-stream) | `^3.1.3` | MIT | TAR Compression & Extraction |
| [@actions/core](https://www.npmjs.com/package/@actions/core) | `^1.11.1` | MIT | GitHub Actions Integration |