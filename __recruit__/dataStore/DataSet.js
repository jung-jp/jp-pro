/**
 * Created by PhpStorm.
 * User: jp
 * Date: 2016-09-08
 */
function DataSet(data) {
    this.data = {
        'Career': ['1', '2'],
        'JobCategory': [
            {
                "keyword": '12',
                "keywordName": '기업 영업',
                'codeName': '영업·고객상담',
                'code': '123'
            },
            {
                "keyword": '1234',
                "keywordName": '기술 영업 화이팅',
                'codeName': '영업·고객상담',
                'code': '123'
            },
            {
                "keyword": '654',
                "keywordName": 'FE111',
                'codeName': 'SI 업체',
                'code': '456'
            },
            {
                "keyword": '04563',
                "keywordName": '풀스택노가다',
                'codeName': '"SI 업체',
                'code': '456'
            }
        ],

    };
    this.historySize = 10;
    this.history = [];
    data && this.setData(data);
}

DataSet.prototype.setData = function (data, key) {
    if (!data) {
        return;
    }
    if (!!key) {
        this.data[key] = data;
    } else {
        this.data = data;
    }
    this.writeHistory(Object.assign({}, this.data));
};

DataSet.prototype.getData = function (key) {
    if (!!key) {
        return this.data[key] || {};
    } else {
        return this.data || {};
    }
};

/**
 * 데이터가 변경된 히스토리를 보관한다.
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
DataSet.prototype.writeHistory = function (data) {
    var history = this.history.slice(-(this.historySize - 1));
    history.push(data);
    this.history = history;
};

DataSet.prototype.stringify = function () {
    return JSON.stringify(this.data);
};

define && define(function () {
    return DataSet;
});
