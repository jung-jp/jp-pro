# UTF8 변경을 위한 코딩 가이드

## 1. 개요

### 1.1 배경

### 1.2 가이드 목적 및 구성

## 2. 구분
* html
    * meta
    * form
    * script
    * css
* css
    * charset
* javascript
    * ajax
* php
    * 내장함수
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

    * 사용자 정의 함수

    * 기타
* 기타
    * xml
    * excel

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
 - 오류/실수 최소화
    - 대상이 많을 경우 한번에 찾아서 모두 바꾸지 말고 나누어서 여러번 변경한다.
    - 정규식으로 한번에 찾기보다 공백, 대소문자등 케이스별로 검색어를 분리하여 반복 수행
    - 폴더별 변경
    - 확장자별 변경


### html

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

### css

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

### javascript

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

### php

#### 내장함수

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
        수정하지 않아도 무방하나 개발자의 판단에 따라 삭제한다.

* 코드 예)
    ```php
    <?
    /* 변경전 */
    html_entity_decode(strip_tags($value1), ENT_COMPAT, 'ISO-8859-1')
    /* 변경후 */
    html_entity_decode(strip_tags($value1), ENT_COMPAT)

    ```
utf-8 변경 코딩 가이드(작성중)
