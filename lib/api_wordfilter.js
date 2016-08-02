var extend = require('util')._extend;

// 敏感词服务
// 设置敏感词后，App 中用户不会收到含有敏感词的消息内容。

// 添加敏感词
// 方法名：/wordfilter/add
// 签名方法：请参考 通用 API 接口签名规则
// URL：https://api.cn.ronghub.com/wordfilter/add.[format]
// [format] 表示返回格式，可以为 json 或 xml，注意不要带 [ ]。
// HTTP 方法：POST
// ---------------表单参数-------------
// 名称		类型			说明
// word		String		敏感词，最长不超过 32 个字符。（必传）

exports.wordfilterAdd = function* (word) {
    var url = this.genURL('/wordfilter/add');
    var post_data = {
        word: word
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 移除敏感词
// 说明：从敏感词列表中，移除某一敏感词。
// 方法名：/wordfilter/delete
// 签名方法：请参考 通用 API 接口签名规则
// URL：https://api.cn.ronghub.com/wordfilter/delete.[format]
// [format] 表示返回格式，可以为 json 或 xml，注意不要带 [ ]。
// HTTP 方法：POST
// ---------------表单参数-------------
// 名称		类型			说明
// word		String		敏感词，最长不超过 32 个字符。（必传）

exports.wordfilterDelete = function* (word) {
    var url = this.genURL('/wordfilter/delete');
    var post_data = {
        word: word
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 查询敏感词列表
// 方法名：/wordfilter/list
// 签名方法：请参考 通用 API 接口签名规则
// URL：https://api.cn.ronghub.com/wordfilter/list.[format]
// [format] 表示返回格式，可以为 json 或 xml，注意不要带 [ ]。
// HTTP 方法：POST

exports.wordfilterList = function* (userId) {
    var url = this.genURL('/wordfilter/list');
    var post_data = {
        userId: userId
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return ret_data.words;
    } else {
        return null;
    };
};
