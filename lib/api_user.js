var extend = require('util')._extend;

/**
 * 刷新用户信息
 * http://www.rongcloud.cn/docs/server.html#刷新用户信息_方法
 * 举例:
 * ```
 * // 刷新用户信息
 * var flag = yield api.refresh(userid, <name>, <portrait_url>);
 * if (flag){
 *   // 操作成功
 * } else {
 *   // 操作失败
 * }
 * ```
 * @param {String} userid 用户的userid（必填）
 * @param {String} name 姓名（选填）
 * @param {String} portrait_url 头像url（选填）
 * 
 */
exports.refresh = function* (userId, name, portrait_url) {
    var url = this.genURL('/user/refresh');
    var post_data = {
        userId: userId
    };
    if (name) {
        post_data['name'] = name;
    };
    if (portrait_url) {
        post_data['portraitUri'] = portrait_url;
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

/**
 * 检测用户是否在线
 * http://www.rongcloud.cn/docs/server.html#检查用户在线状态_方法
 * 举例:
 * ```
 * // 检测用户是否在线
 * var flag = yield api.checkOnline(userid);
 * if (flag){
 *   // 在线
 * } else {
 *   // 不在线
 * }
 * ```
 * @param {String} userid 用户的userid（必填）
 */
exports.checkOnline = function* (userId) {
    var url = this.genURL('/user/checkOnline');
    var post_data = {
        userId: userId
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        if (ret_data.status == '0') {
            return false;
        } else if (ret_data.status == '1') {
            return true;
        } else {
            return false;
        };
    } else {
        return false;
    };
};

/**
 * 封禁用户
 * http://www.rongcloud.cn/docs/server.html#封禁用户_方法
 * 举例:
 * ```
 * // 封禁用户
 * var flag = yield api.userBlock(userid, minute);
 * if (flag){
 *   // 操作成功
 * } else {
 *   // 操作失败
 * }
 * ```
 * @param {String} userid 用户的userid（必填）
 * @param {String} minute 封禁时长,单位为分钟，最大值为43200分钟。（必填）
 * 
 */
exports.userBlock = function* (userId, minute) {
    var url = this.genURL('/user/block');
    var post_data = {
        userId: userId,
        minute: minute
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 解除封禁用户
/**
 * 解除封禁用户
 * http://www.rongcloud.cn/docs/server.html#解除封禁用户_方法
 * 举例:
 * ```
 * // 解除封禁用户
 * var flag = yield api.userUnblock(userid);
 * if (flag){
 *   // 操作成功
 * } else {
 *   // 操作失败
 * }
 * ```
 * @param {String} userid 用户的userid（必填）
 * 
 */
exports.userUnblock = function* (userId) {
    var url = this.genURL('/user/unblock');
    var post_data = {
        userId: userId
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

/**
 * 获取被封禁用户
 * http://www.rongcloud.cn/docs/server.html#获取被封禁用户_方法
 * 举例:
 * ```
 * // 获取被封禁用户
 * var users = yield api.userBlockQuery(userid);
 * if (users){
 *   // 操作成功，返回被封禁的用户清单
 * } else {
 *   // 操作失败
 * }
 * ```
 * @param {String} userid 用户的userid（必填）
 * 
 */
exports.userBlockQuery = function* (userId) {
    var url = this.genURL('/user/block/query');
    var post_data = {
        userId: userId
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return ret_data.users;
    } else {
        return null;
    };
};

/**
 * 添加用户到黑名单
 * http://www.rongcloud.cn/docs/server.html#添加用户到黑名单_方法
 * 举例:
 * ```
 * // 添加用户到黑名单
 * var flag = yield api.userBlacklistAdd(userid, blackUserId);
 * if (flag){
 *   // 操作成功
 * } else {
 *   // 操作失败
 * }
 * ```
 * @param {String} userid 用户的userid（必填）
 * @param {String} blackUserId 被加黑的用户Id。（必填）
 * 
 */
exports.userBlacklistAdd = function* (userId, blackUserId) {
    var url = this.genURL('/user/blacklist/add');
    var post_data = {
        userId: userId,
        blackUserId: blackUserId
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

/**
 * 从黑名单中移除用户
 * http://www.rongcloud.cn/docs/server.html#从黑名单中移除用户_方法
 * 举例:
 * ```
 * // 从黑名单中移除用户
 * var flag = yield api.userBlacklistRemove(userid, blackUserId);
 * if (flag){
 *   // 操作成功
 * } else {
 *   // 操作失败
 * }
 * ```
 * @param {String} userid 用户的userid（必填）
 * @param {String} blackUserId 被移除的用户Id。（必填）
 * 
 */
exports.userBlacklistRemove = function* (userId, blackUserId) {
    var url = this.genURL('/user/blacklist/remove');
    var post_data = {
        userId: userId,
        blackUserId: blackUserId
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

/**
 * 获取某用户的黑名单列表
 * http://www.rongcloud.cn/docs/server.html#获取某用户的黑名单列表_方法
 * 举例:
 * ```
 * // 获取某用户的黑名单列表
 * var users = yield api.userBlacklistQuery(userid);
 * if (users){
 *   // 操作成功，返回黑名单列表的用户清单
 * } else {
 *   // 操作失败
 * }
 * ```
 * @param {String} userid 用户的userid（必填）
 * 
 */
exports.userBlacklistQuery = function* (userId) {
    var url = this.genURL('/user/blacklist/query');
    var post_data = {
        userId: userId
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return ret_data.users;
    } else {
        return null;
    };
};