var extend = require('util')._extend;

// 群组服务

// 同步用户所属群组 方法
// 当第一次连接融云服务器时，需要向融云服务器提交 userId 对应的用户当前所加入的所有群组，此接口主要为防止应用中用户群信息同融云已知的用户所属群信息不同步。
// 方法名：/group/sync
// 调用频率：每秒钟限 100 次
// 签名方法：请参考 通用 API 接口签名规则
// URL：https://api.cn.ronghub.com/group/sync.[format]
// [format] 表示返回格式，可以为 json 或 xml，注意不要带 [ ]。
// HTTP 方法：POST

// 名称             类型      说明
// userId          String  被同步群信息的用户Id。（必传）
// group[id]=name  String  该用户的群信息。

// 当不提交group[id]=name参数时，表示删除userId对应的群信息；此参数可传多个

exports.groupSync = function* (userId, groupData) {
    var url = this.genURL('/group/sync');
    var post_data = {
        userId: userId
    };
    if (groupData) {
        post_data = extend(post_data, groupData);
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 当提交多个userId参数时，表示创建群组，并将多个用户加入该群组，用户将可以收到该群的消息
// userId=[1,2,3,4,5]
exports.groupCreate = exports.groupJoin = function* (userId, groupId, groupName) {
    var url = this.genURL('/group/join');
    var post_data = {
        userId: userId,
        groupId: groupId
    };
    if (groupName) {
        post_data.groupName = groupName;
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 退出群组
exports.groupQuit = function* (userId, groupId) {
    var url = this.genURL('/group/quit');
    var post_data = {
        userId: userId,
        groupId: groupId
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 解散群组
exports.groupDismiss = function* (userId, groupId) {
    var url = this.genURL('/group/dismiss');
    var post_data = {
        userId: userId,
        groupId: groupId
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 刷新群组信息
exports.groupRefresh = function* (groupId, groupName) {
    var url = this.genURL('/group/refresh');
    var post_data = {
        groupId: groupId,
        groupName: groupName
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 查询群成员 
exports.groupUserQuery = function* (groupId) {
    var url = this.genURL('/group/user/query');
    var post_data = {
        groupId: groupId
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return ret_data.users;
    } else {
        return false;
    };
};

// 群组成员禁言服务

exports.groupUserGagAdd = function* (userId, groupId, minute) {
    var url = this.genURL('/group/user/gag/add');
    var post_data = {
        userId: userId,
        groupId: groupId,
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

// 移除禁言群成员
exports.groupUserGagRollback = function* (userId, groupId) {
    var url = this.genURL('/group/user/gag/rollback');
    var post_data = {
        userId: userId,
        groupId: groupId
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 查询被禁言群成员
exports.groupUserGagList = function* (groupId) {
    var url = this.genURL('/group/user/gag/list');
    var post_data = {
        groupId: groupId
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return ret_data.users;
    } else {
        return false;
    };
};
