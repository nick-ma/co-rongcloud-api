var extend = require('util')._extend;
// 消息历史记录服务

// 消息历史记录下载地址获取 方法
// 说明：获取 APP 内指定某天某小时内的所有会话消息记录的下载地址（目前支持二人会话、讨论组、群组、聊天室、客服、系统通知消息历史记录下载）
// 方法名：/message/history
// 签名方法：请参考 通用 API 接口签名规则
// URL：https://api.cn.ronghub.com/message/history.[format]
// [format] 表示返回格式，可以为 json 或 xml，注意不要带 [ ]。
// HTTP 方法：POST

// 名称		类型			说明
// date		String		指定北京时间某天某小时，格式为2014010101,表示：2014年1月1日凌晨1点。（必传）
/**
 * 消息历史记录下载地址获取
 * http://www.rongcloud.cn/docs/server.html#消息历史记录下载地址获取_方法
 * 举例:
 * ```
 * // 消息历史记录下载地址获取
 * var date='2014010101';
 * var chat_data = yield api.historyFetch(date);
 * if (chat_data){
 *   // 操作成功
 *   chat_data.url
 * } else {
 *   // 操作失败
 * }
 * ```
 * @param {String} date 指定北京时间某天某小时，格式为2014010101,表示：2014年1月1日凌晨1点。（必填）
 * 
 */
exports.historyFetch = function* (date) {
    var url = this.genURL('/message/history');
    var post_data = {
        date: date
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return {
            url: ret_data.url,
            date: ret_data.date,
        };
    } else {
        return false;
    };
};

// 消息历史记录删除。 参数同上。
/**
 * 消息历史记录删除
 * http://www.rongcloud.cn/docs/server.html#消息历史记录删除_方法
 * 举例:
 * ```
 * // 消息历史记录删除
 * var date='2014010101';
 * var flag = yield api.historyDelete(date);
 * if (flag){
 *   // 操作成功
 * } else {
 *   // 操作失败
 * }
 * ```
 * @param {String} date 指定北京时间某天某小时，格式为2014010101,表示：2014年1月1日凌晨1点。（必填）
 * 
 */
exports.historyDelete = function* (date) {
    var url = this.genURL('/message/history/delete');
    var post_data = {
        date: date
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

