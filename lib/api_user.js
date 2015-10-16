var extend = require('util')._extend;

// 刷新用户信息
exports.refresh = function* (userId, name, portrait_url) {
    var url = this.genURL('/user/refresh');
    var post_data = {
        minute: userId
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

// 检测用户是否在线
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

// 封禁用户
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

// 获取被封禁用户 
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

// 添加用户到黑名单
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

// 从黑名单中移除用户
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

// 获取某用户的黑名单列表
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