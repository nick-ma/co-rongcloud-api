var extend = require('util')._extend;
// 聊天室服务
// 名称                   类型      说明
// chatroom[id]=name    String  id:要创建的聊天室的id；name:要创建的聊天室的name。（必传）
// chatroomData = {
//     'chatroom[0001]': '1号聊天室',
//     'chatroom[0002]': '2号聊天室',
//     'chatroom[0003]': '3号聊天室',
//     'chatroom[0004]': '4号聊天室',
// }
/**
 * 创建聊天室
 * http://www.rongcloud.cn/docs/server.html#创建聊天室_方法
 * 举例:
 * ```
 * // 创建聊天室
 * var chatroomData = {
 *     'chatroom[0001]': '1号聊天室',
 *     'chatroom[0002]': '2号聊天室',
 *     'chatroom[0003]': '3号聊天室',
 *     'chatroom[0004]': '4号聊天室',
 * }
 * var flag = yield api.chatroomCreate(chatroomData);
 * if (flag){
 *   // 操作成功
 * } else {
 *   // 操作失败
 * }
 * ```
 * @param {Array} chatroomData 要创建或者加入的聊天室的数据结构（必填）
 * 
 */
exports.chatroomCreate = function* (chatroomData) {
    var url = this.genURL('/chatroom/create');
    var post_data = chatroomData;
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 加入聊天室
// 将用户加入指定聊天室，用户将可以收到该聊天室的消息。
/**
 * 加入聊天室
 * http://www.rongcloud.cn/docs/server.html#加入聊天室_方法
 * 举例:
 * var chatroomData = {
 *   userId: ['1','2','3','4'], // 最多不超过 50 个 （必传）
 *   chatroomId: '0001'         // 要加入的聊天室 Id。（必传）
 * }
 * var flag = yield api.chatroomJoin(chatroomData);
 * if (flag) {
 *   // 操作成功
 * } else {
 *   // 操作失败
 * }
 *
 * @param {Object} chatroomData 要加入的聊天室的数据结构（必填）
 */
exports.chatroomJoin = function* (chatroomData) {
    var url = this.genURL('/chatroom/join');
    var post_data = chatroomData;
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 销毁聊天室
// 同时销毁多个聊天室： chatroomId=['0001','0002','0003','0004']
/**
 * 销毁聊天室
 * http://www.rongcloud.cn/docs/server.html#销毁聊天室_方法
 * 举例:
 * ```
 * // 销毁聊天室
 * var chatroomId=['0001','0002','0003','0004'];
 * var flag = yield api.chatroomDestroy(chatroomId);
 * if (flag){
 *   // 操作成功
 * } else {
 *   // 操作失败
 * }
 * ```
 * @param {Array} chatroomId 要销毁的聊天室的数据结构（必填）
 * 
 */
exports.chatroomDestroy = function* (chatroomId) {
    var url = this.genURL('/chatroom/destroy');
    var post_data = {
        chatroomId: chatroomId
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 查询聊天室信息
/**
 * 查询聊天室信息
 * http://www.rongcloud.cn/docs/server.html#查询聊天室信息_方法
 * 举例:
 * ```
 * // 查询聊天室信息
 * var chatroomId=['0001','0002'];
 * var chatRooms = yield api.chatroomQuery(chatroomId);
 * if (chatRooms){
 *   // 操作成功
 * } else {
 *   // 操作失败
 * }
 * ```
 * @param {Array} chatroomId 要查询的聊天室（必填）
 * 
 */
exports.chatroomQuery = function* (chatroomId) {
    var url = this.genURL('/chatroom/query');
    var post_data = {
        chatroomId: chatroomId
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return ret_data.chatRooms;
    } else {
        return false;
    };
};

/**
 * 查询聊天室内用户
 * http://www.rongcloud.cn/docs/server.html#查询聊天室内用户_方法
 * 举例:
 * ```
 * // 查询聊天室内用户
 * var chatroomId='0001';
 * var users = yield api.chatroomUserQuery(chatroomId);
 * if (users){
 *   // 操作成功
 * } else {
 *   // 操作失败
 * }
 * ```
 * @param {String} chatroomId 要查询的聊天室（必填）
 * 
 */
exports.chatroomUserQuery = function* (chatroomId) {
    var url = this.genURL('/chatroom/user/query');
    var post_data = {
        chatroomId: chatroomId
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return ret_data.users;
    } else {
        return false;
    };
};
