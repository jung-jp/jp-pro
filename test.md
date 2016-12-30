# UTF8 변경을 위한 코딩 가이드

## 1. 개요

### 1.1 배경

UTF-8 파일인코딩 전환을 위한 사전작업의 일환으로 소스 코드변경을 위한 가이드 마련.

### 1.2 가이드 목적

가이드를 통해 코드분석 및 변경 시간을 단축하고 원할한 변경작업을 진행 할 수 있도록 해결 방법을 제공 한다.

## 2. 구성
* *html*
    * meta
    * form
    * script
    * css
* *css*
    * charset
* *javascript*
    * ajax
* *php*
    - 내장함수
        * iconv
        * iconv_set_encoding - 대상없음
        * iconv_strlen - 대상없음
        * iconv_strpos - 대상없음
        * iconv_strrpos - 대상없음
        * iconv_substr - 대상없음
        * mb_convert_encoding
        * mb_convert_variables
        * mb_substr
        * mb_strpos
        * mb_strimwidth
        * mb_strlen
        * mb_strcut
        * htmlspecialchars
        * html_entity_decode
        * --- 미완료 구분선        
        * header
        * define
        * print
        * mysql_query
        * iconv_set_encoding
        * mb_encode_numericentity - 예정
        * array_walk_recursive - 예정
        * mb_internal_encoding - 대상없음
        * mb_detect_encoding - 대상없음
        * mb_convert_case - 대상없음
        * mb_check_encoding - 대상없음
        * utf8_decode - 삭제예정
        * utf8_encode - 삭제예정
        * json_encode - 삭제예정
        * json_decode - 삭제예정
        * strcmp - 삭제예정
        * strcasecmp - 삭제예정
        * htmlentities - 삭제예정
        * proc_open - 삭제예정

    - 사용자 함수

        * CutString
        * cutText
        * convertData
        * MailSend
        * Cmm_Mail
        * Docruzer::setCharset
        * $crzClient->SubmitQuery
        * encodeJson
        * decodeJson
        * setEncoding
        * setDecoding    
        * headMeta()->setCharset

* *기타*

    * SQL
        * CONVERT
    * 검색엔진(DOCRUZER)
    * 결제모듈  
    * xml
    * excel
    * csv
    * config
        * mall.conf
        * production.php (local, dev, stg ...)

---

## 3. 변경 방법

- 찾아 바꾸기
    - 특정 키워드로 검색 후 해당 부분을 변경한다.
    - 정규식을 활용한다.

- 아이체킹
    - 인코딩과 관련된 키워드로 검색후 해당 부분의 수정이 필요하다고 판단시 변경한다.
    -  euckr|utf8|cp949 을 찾는 정규식 활용  
        ```
        _?(euc[\-_]?kr|_?utf[\-_]?[0-9]+|cp949)
        ```
- 함수 수정
    - cutString2 등 공용으로 사용하는 함수의 경우 내부로직을 수정하여 처리.
    - 로직 변경으로 인해 출력결과가 기존과 달라지는 경우가 발생될 수 있음.
    - 확인 후 수정필요.
- 오류/실수 최소화
    - 대상이 많을 경우 한번에 찾아서 모두 바꾸지 말고 나누어서 여러번 변경한다.
    - 정규식으로 한번에 찾기보다 공백, 대소문자등 케이스별로 검색어를 분리하여 반복 수행
    - 폴더별 변경
    - 확장자별 변경

---

> ### *html*

**meta**  
meta 태그 charset 설정값 변경

* 변경방법 : 찾아 바꾸기
    > 찾기 : text/html;\s*?charset=euc-?kr  
    > 바꾸기 : text/html; charset=utf-8

    > 찾기 : application/x-www-form-urlencoded;\s?charset=(euc-?kr|utf-?8)
    > 바꾸기 : application/x-www-form-urlencoded; charset=utf-8

* 코드 예)
    ```html
    <!-- 변경전  -->
    <meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
    <!-- 변경후 -->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    ```

**form**  
form 전송을 위한 속성

* 변경방법 : 찾아 바꾸기
    > 찾기 : accept-charset="euc-kr"  
    > 바꾸기 : accept-charset="utf-8"

* 코드 예)
    ```html
    <!-- 변경전  -->
    <form accept-charset="euc-kr" ...>
    <!-- 변경후 -->
    <form accept-charset="utf-8" ...>
    ```

**script**  
파일 include 시에 charset 설정

* 변경방법 : 찾아 바꾸기
    > 찾기 : <script(.*?)charset=\"euc-kr\"(.*?)>\s*?<\/script>  
    > 바꾸기 : <script$1charset=\"utf-8\"$2></script>


* 코드 예)
    ```html
    <!-- 변경전  -->
    <script src="..." type="text/javascript" charset="euc-kr"></script>
    <!-- 변경후 -->
    <script src="..." type="text/javascript" charset="utf-8"></script>
    ```

---

> ### *css*

**charset**  
css 파일 상단 charset 선언

* 변경방법 : 찾아 바꾸기
    > 찾기 : ^@charset\s?\"?euc-kr\"?;?  
    > 바꾸기 : @charset "utf-8";


* 코드 예)
    ```css
    /* 변경전  */
    @charset "euc-kr";
    /* 변경후 */
    @charset "utf-8";
    ```

---

> ### *javascript*

**ajax**  
ajax 요청시 config 설정

* 변경방법 : 찾아 바꾸기
    > 찾기 :
        encoding\s*?:\s*?[\'|\"](euc-?kr|utf-?8)'  
    > 바꾸기 : 삭제  

    > 찾기 :
        application/x-www-form-urlencoded;\s?charset=(euc-?kr|utf-?8)  
    > 바꾸기 :
        application/x-www-form-urlencoded; charset=utf-8


* 코드 예)
    ```js
    /* 변경전  */
    contentType: "application/x-www-form-urlencoded; charset=euc-kr"
    /* 변경후 */
    contentType: "application/x-www-form-urlencoded; charset=utf-8"

    ```

---

> ### *php*

#### ***내장함수***
#

**iconv**

iconv 인코딩 관련 부분 삭제

* 변경방법 : 찾아 바꾸기
    > 찾기 :  
        iconv\([\'\"]?(euc[\-_]?kr|_?utf[\-_]?[0-9]+|cp949)[\'\"].*?[\'\"]utf-?8[\'\"],(.*?)\)  
        iconv\([\'\"]?(euc[\-_]?kr|_?utf[\-_]?[0-9]+|cp949)[\'\"]  
        iconv\(  
    > 바꾸기 :  
        $2  

* 코드 예)

    ```php
    <?
    /* 변경전 */
    $file_nm = iconv("euc-kr","utf-8",$this->_getParam('file_nm'));
    /* 변경후 */
    $file_nm = $this->_getParam('file_nm');

    ```

**mb_convert_encoding**

mb_convert_encoding 인코딩 관련 부분 삭제

* 변경방법 : 찾아 바꾸기
    > 찾기 :  
        mb_convert_encoding\((.*?)\'utf8\'(.*?)euckr(.*?)\)  
        mb_convert_encoding\((.*?)\s*?,\s*?\'(utf\-?8|euc\-?kr|cp949)\',(.*[^\)])\){1}  
        mb_convert_encoding\((.*)?\s*?,\s*?\'utf\-?8\'\s*?,\s*?\'(utf\-?8|euc\-?kr).*?\'\);  
        //*
    > 바꾸기 :  
        $1, $1;  

* 코드 예)

    ```php
    <?
    /* 변경전 */
    mb_convert_encoding($contents, 'utf8', 'utf8, euckr')
    /* 변경후 */
    mb_convert_encoding($contents, 'utf8')

    ```   


**mb_convert_variables**

mb_convert_variables 인코딩 관련 부분 삭제

* 변경방법 : 찾아 바꾸기
    > 찾기 :  
        (.*?)mb_convert_variables\(\'utf-8\',\s*?\'(utf-8,)?\s?euc-kr\'(.*?)\);  
        (.*?)mb_convert_variables('utf-8',\s*?\'utf-8,\s?euc-kr\'(.*?)  
        (.*?)mb_convert_variables\(\'utf-8\',\s*?\'\s?euc-kr\'(.*?)\);
        //*
    > 바꾸기 :  
        삭제

* 코드 예)

    ```php
    <?
    /* 변경전 */
    mb_convert_encoding($contents, 'utf8', 'utf8, euckr')
    /* 변경후 */
    mb_convert_encoding($contents, 'utf8')

    ```

**mb_substr**

mb_substr 인코딩 관련 부분 삭제

* 변경방법 : 찾아 바꾸기
    > 찾기 :
        mb_substr\s*?(\(\s*?.*?)(,\s*?[\'|\"]euc\-?kr[\'|\"]\))  
    > 바꾸기 :
        mb_substr($1)

* 코드 예)
    ```php
    <?
    /* 변경전 */
    mb_substr(htmlspecialchars($row['title'], ENT_COMPAT, 'ISO-8859-1'), 0, 18, 'euc-kr') . ".." ;
    /* 변경후 */
    mb_substr(htmlspecialchars($row['title'], ENT_COMPAT, 'ISO-8859-1'), 0, 18) . ".." ;

    ```

**mb_strimwidth**

mb_strimwidth 인코딩 관련 부분 삭제

* 변경방법 : 찾아 바꾸기
    > 찾기 :
        mb_strimwidth\((.*?)[\'|\"]EUC-KR[\'|\"]\)   
        //*
    > 바꾸기 :
        mb_strimwidth\($1\'utf-8\'\)

* 코드 예)
    ```php
    <?
    /* 변경전 */
    mb_strimwidth($this->companyInfo['sub_upjong'], 0, 70, ' . .', 'EUC-KR')
    /* 변경후 */
    mb_strimwidth($this->companyInfo['sub_upjong'], 0, 70, ' . .')

    ```

**mb_strlen**

mb_strlen 인코딩 관련 부분 삭제

* 변경방법 : 찾아 바꾸기
    > 찾기 :
        mb_strlen\((.*?)\s*?,\s*?[\'|\"](euc\-?kr|cp949)[\'|\"]\s*?\)  
    > 바꾸기 :
        mb_strlen($1)

* 코드 예)
    ```php
    <?
    /* 변경전 */
    mb_strlen($titleArr[0], 'euc-kr')
    /* 변경후 */
    mb_strlen($titleArr[0])

    ```

**mb_strcut**

mb_strcut 인코딩 관련 부분 삭제

* 변경방법 : 찾아 바꾸기
    > 찾기 :
        mb_strcut\((.*?)\s*?,\s*?[\'|\"](euc\-?kr|cp949)[\'|\"]\s*?\)  
    > 바꾸기 :
        mb_strcut($1)

* 코드 예)
    ```php
    <?
    /* 변경전 */
    mb_strcut($msg_body, 0, 80, 'euc-kr')
    /* 변경후 */
    mb_strcut($msg_body, 0, 80)

    ```

**htmlspecialchars**

htmlspecialchars 인코딩 관련 부분 삭제

* 변경방법 : 찾아 바꾸기
    > 찾기 :
        htmlspecialchars.*?(utf-?8|iso-8859-?1)  
        //*  
    > 바꾸기 :
        수정하지 않아도 무방하나 개발자의 판단에 따라 삭제한다.

* 코드 예)
    ```php
    <?
    /* 변경전 */
    htmlspecialchars($str, ENT_COMPAT, 'ISO-8859-1')
    /* 변경후 */
    htmlspecialchars($str, ENT_COMPAT)

    ```

**html_entity_decode**

html_entity_decode 인코딩 관련 부분 삭제

* 변경방법 : 찾아 바꾸기
    > 찾기 :
        html_entity_decode.*?(utf-?8|iso-8859-?1)  
        //*
    > 바꾸기 :
        수정하지 않아도 무방하나 삭제하는것을 권장.  
        개발자의 판단에 따라 처리.

* 코드 예)
    ```php
    <?
    /* 변경전 */
    html_entity_decode(strip_tags($value1), ENT_COMPAT, 'ISO-8859-1')
    /* 변경후 */
    html_entity_decode(strip_tags($value1), ENT_COMPAT)

    ```

---

#### ***사용자 함수***  
#

**CutString**

@deprecated Zend_View_Helper_CutString2 | CutString
문자열을 자르고 말줌임을 처리를 하는 함수로 사람인 초기에 만들어짐.
구버전 마크업에 최적화된 코드로 성능이 좋지 않음.  
문자열 자르기는 css를 사용하거나 mb_strimwidth등을 사용하도록 한다.  


* 변경방법 : 함수 수정

    > 메소드 내부 로직을 mb_strimwidth로 변경하여 처리.  
    > 변경후 말줄임처리가 기존과 달라지는 부분이 있어 수정이슈가 있음

* 코드 예)
    ```php  
    <?
    /* 변경전 */
    public function cutString2($str, $len, $tail='..', $encoding = 'euc-kr') {    
        return mb_strimwidth($str, 0, $len, $tail, $encoding);
        ...
    }
    /* 변경후 */
    public function cutString2($str, $len, $tail='..', $encoding = 'utf-8') {    
        return mb_strimwidth($str, 0, $len, $tail, $encoding);
        ...
    }
    ```

**cutText**

@deprecated Zend_View_Helper_CutText | CutText2
문자열을 자르고 말줌임을 처리를 하는 함수  
문자열 자르기는 css를 사용하거나 mb_strimwidth등을 사용하도록 한다.  


* 변경방법 : 함수 수정

    > 기본 $encode 파라미터를 utf-8로 변경하고 내부 로직을 일부 수정함.

* 코드 예)
    ```php  
    <?
    /* 변경전 */
    public function cutText($str, $len, $encode = 'euc-kr') {
    /* 변경후 */
    public function cutText($str, $len, $encode = 'utf-8') {
    ```

**Cmm_Mail**

Cmm_Mail::\__construct
생성자의 기본 $charset=utf-8로 변경


* 변경방법 : 함수 수정

    > 파라미터 기본값 수정
    > 찾기 :
        $charset='euc-kr'  
        //*
    > 바꾸기 :
        $charset='utf-8'  

* 코드 예)
    ```php  
    <?    
    /* 변경전 */
    public function __construct($charset='euc-kr')
    /* 변경후 */
    public function __construct($charset='utf-8')
    ```

**setCharset**

Saramin_Search_Docruzer:setCharset
SearchEngineDAO::SubmitQuery(... , CS_UTF8)

생성자의 기본 $charset = CS_UTF8 (lib에 선언된 상수값) 로 변경


* 변경방법 : 함수 수정

    > 파라미터 기본값 수정

* 코드 예)
    ```php  
    <?
    /* 변경전 */
    public function setCharset($charset = CS_EUCKR) {}
    /* 변경후 */
    public function setCharset($charset = CS_UTF8) {}
    ```

**encodeJson**

@deprecated Saramin_Model::encodeJson  
\_encodeJson  

 JSON 디코드를 utf-8 처리가 필요가 없어지므로 내장 함수 json_encode 사용한다.


* 변경방법 : 찾아 바꾸기

    > 찾기 :
        Saramin_Model::encodeJson($entry, 'euc-kr');  
        //*
    > 바꾸기 :
        euc-kr 파라미터 삭제 하거나
        내장 함수 json_encode로 변경


* 코드 예)
    ```php  
    <?
    /* 변경전 */
    Saramin_Model::encodeJson($entry)
    /* 변경후 */
    json_encode($entry)
    ```

**decodeJson**

@deprecated Saramin_Model::decodeJson  
\_?encodeJson  

 JSON 디코드를 utf-8 처리가 필요가 없어지므로 내장 함수 json_decode 사용한다.


* 변경방법 : 찾아 바꾸기

    > Saramin_Model::decodeJson
    > 찾기 :
        Saramin_Model::decodeJson($entry, 'euc-kr');  
        //*
    > 바꾸기 :
        euc-kr 파라미터 삭제 하거나
        내장 함수 json_decode로 변경.


* 코드 예)
    ```php  
    <?
    /* 변경전 */
    Saramin_Model::decodeJson($entry)
    /* 변경후 */
    json_decode($entry, true)
    ```

**setDecoding, setEncoding**

xxxController::setDecodingStr,  setEncodingStr

불필요한 인코딩 처리 삭제


* 변경방법 : 찾아 바꾸기

    > Saramin_Model::decodeJson
    > 찾기 :
        setDecoding[Str]?\(,
        setEncoding[Str]?\(
        //*
    > 바꾸기 :
        삭제

* 코드 예)
    ```php  
    <?
    /* 변경전 */
    $name = setDecoding($this->_getParam('k'));
    /* 변경후 */
    $name = $this->_getParam('k');

    ```

headMeta()->setCharset('euc-kr');

**setCharset**

Zend_View_Helper_HeadMeta::setCharset

인코딩 설정 변경


* 변경방법 : 찾아 바꾸기

    > 찾기 :
        headMeta()->setCharset('euc-kr');
    > 바꾸기 :
        headMeta()->setCharset('utf-8');

* 코드 예)
    ```php  
    <?
    headMeta()->setCharset('utf-8');

    ```

---

> ### *기타*  

**SQL**

쿼리 구문 수정

* 변경방법 : 찾아 바꾸기
    > 찾기 :  
         CONVERT
    > 바꾸기 :  
        삭제

* 코드 예)

    ```php
    <?
    /* 변경전 */
    CONVERT(SCP.SCP_DEC('ETC', per.address_details) USING euckr)
    /* 변경후 */
    SCP.SCP_DEC('ETC', per.address_details))

    ```

**검색엔진(DOCRUZER)**

검색엔진 설정 utf8로 변경, 색인등 재실행 (검색엔진 담당자)
charset 설정 수정

* 변경방법 : 찾아 바꾸기
    > 찾기 :  
         CS_EUCKR
    > 바꾸기 :  
        CS_UTF8

* 코드 예)
    ```php  
    <?
    /* 변경전 */
    public function setCharset($charset = CS_EUCKR) {}
    /* 변경후 */
    public function setCharset($charset = CS_UTF8) {}
    ```

**결제모듈**

***xpay***

    utf8용 js 라이브러리로 변경

* 변경방법 : 찾아 바꾸기
    > 찾기 :  
        /xpay/js/ (xpay 자바스크립트 파일 include 부분)
    > 바꾸기 :  
        utf8용 파일명으로 path 변경.

* 코드 예)
    ```html  
    <?
    /* 변경전 */
    <script language="javascript" src="... /xpay/js/xpay_ub.js" type="text/javascript"></script>
    /* 변경후 */
    <script language="javascript" src=".../xpay/js/xpay_ub_utf-8.js" type="text/javascript"></script>
    ```

***inicis***

    input charset utf-8로 변경

* 변경방법 : 찾아 바꾸기
    > 찾기 :  
        $this->formHidden('charset', 'EUC-KR');
    > 바꾸기 :  
        $this->formHidden('charset', 'UTF-8');

* 코드 예)
    ```php
    <?
    /* 변경전 */
    echo $this->formHidden('charset', 'EUC-KR');
    /* 변경후 */
    echo $this->formHidden('charset', 'UTF-8');  
    ```  

**config**


***mall.conf***   
> output_UTF8 = 0  
> 변경  => output_UTF8 = 1  

***production.php (local, dev, stg ...)***  
> charset 설정 관련부분을 euc-kr에서 utf-8로 변경한다.


**xml**  

charset 설정값 변경

* 변경방법 : 찾아 바꾸기
    > 찾기 : <?xml version="1.0" encoding="euc-kr"?>  
    > 바꾸기 : <?xml version="1.0" encoding="utf-8"?>

* 코드 예)
    ```xml
    <!-- 변경전  -->
    <?xml version="1.0" encoding="euc-kr"?>
    <!-- 변경후 -->
    <?xml version="1.0" encoding="utf-8"?>
    ```

**excel**  

**csv**  
