var extend = require('util')._extend;

// 发送单聊消息
// 同时向多人发送消息时，toUserId传入数组。 toUserId=['user01','user02','user03']
exports.messagePrivatePublish = function* (fromUserId, toUserId, objectName, content, optional) {
    var url = this.genURL('/message/private/publish');
    var post_data = {
        fromUserId: fromUserId,
        toUserId: toUserId,
        objectName: objectName,
        content: content,
    };
    if (optional && typeof optional === 'object') {
        post_data = extend(post_data, optoinal);
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 发送单聊模板消息
exports.messagePrivatePublishTemplate = function* (fromUserId, toUserId, objectName, content, values, pushContent, pushData) {
    var url = this.genURL('/message/private/publish_template');
    var post_data = {
        fromUserId: fromUserId,
        toUserId: toUserId,
        objectName: objectName,
        content: content,
        values: values,
        pushContent: pushContent,
        pushData: pushData,
    };
    var opts = this.genPostJsonData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 发送系统消息
// 同时向多人发送消息时，toUserId传入数组。 toUserId=['user01','user02','user03']
exports.messageSystemPublish = function* (fromUserId, toUserId, objectName, content, optional) {
    var url = this.genURL('/message/system/publish');
    var post_data = {
        fromUserId: fromUserId,
        toUserId: toUserId,
        objectName: objectName,
        content: content,
    };
    if (optional && typeof optional === 'object') {
        post_data = extend(post_data, optoinal);
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 发送系统模板消息
exports.messageSystemPublishTemplate = function* (fromUserId, toUserId, objectName, content, values, pushContent, pushData) {
    var url = this.genURL('/message/system/publish_template');
    var post_data = {
        fromUserId: fromUserId,
        toUserId: toUserId,
        objectName: objectName,
        content: content,
        values: values,
        pushContent: pushContent,
        pushData: pushData,
    };
    var opts = this.genPostJsonData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 发送群组消息
exports.messageGroupPublish = function* (fromUserId, toGroupId, objectName, content, optional) {
    var url = this.genURL('/message/group/publish');
    var post_data = {
        fromUserId: fromUserId,
        toGroupId: toGroupId,
        objectName: objectName,
        content: content,
    };
    if (optional && typeof optional === 'object') {
        post_data = extend(post_data, optoinal);
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 发送聊天室消息 
// 说明：一个用户向聊天室发送消息
// 方法名：/message/chatroom/publish
// 调用频率：每秒钟限 100 次
// 签名方法：请参考 通用 API 接口签名规则
// URL：https://api.cn.ronghub.com/message/chatroom/publish.[format]
// [format] 表示返回格式，可以为 json 或 xml，注意不要带 [ ]。
// HTTP 方法：POST
// ---------------表单参数-------------
// 名称               类型      说明
// fromUserId       String  发送人用户 Id。（必传）
// toChatroomId     String  接收聊天室Id，提供多个本参数可以实现向多个聊天室发送消息。（必传）
// objectName       String  消息类型，参考融云消息类型表.消息标志；可自定义消息类型。（必传）
// content          String  发送消息内容，参考融云消息类型表.示例说明；如果 objectName 为自定义消息类型，该参数可自定义格式。（必传）

exports.messageChatroomPublish = function* (fromUserId, toChatroomId, objectName, content) {
    var url = this.genURL('/message/chatroom/publish');
    var post_data = {
        fromUserId: fromUserId,
        toChatroomId: toChatroomId,
        objectName: objectName,
        content: content,
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};

// 发送广播消息
// 说明：发送消息给一个应用下的所有注册用户，如用户未在线会对满足条件（绑定手机终端）的用户发送 Push 信息，会话类型为 SYSTEM。
// 方法名：/message/broadcast
// 调用频率：每小时只能发送 1 次，每天最多发送 3 次。
// 签名方法：请参考 通用 API 接口签名规则
// URL：https://api.cn.ronghub.com/message/broadcast.[format]
// [format] 表示返回格式，可以为 json 或 xml，注意不要带 [ ]。
// HTTP 方法：POST
// ---------------表单参数-------------
// 名称           类型          说明
// fromUserId   String      发送人用户 Id。（必传）
// objectName   String      消息类型，参考融云消息类型表.消息标志；可自定义消息类型。（必传）
// content      String      发送消息内容，参考融云消息类型表.示例说明；如果 objectName 为自定义消息类型，该参数可自定义格式。（必传）
// pushContent  String      定义显示的 Push 内容，如果 objectName 为融云内置消息类型时，则发送后用户一定会收到 Push 信息。 如果为自定义消息，则 pushContent 为自定义消息显示的 Push 内容，如果不传则用户不会收到 Push 通知。(可选)
// pushData     String      Push 通知附加的 payload 字段，字段名为 appData。(可选)
// os           String      针对操作系统发送 Push，值为 iOS 表示对 iOS 手机用户发送 Push ,为 Android 时表示对 Android 手机用户发送 Push ，如对所有用户发送 Push 信息，则不需要传 os 参数。(可选)

exports.messageBroadcast = function* (fromUserId, objectName, content, optional) {
    var url = this.genURL('/message/broadcast');
    var post_data = {
        fromUserId: fromUserId,
        objectName: objectName,
        content: content,
    };
    if (optional && typeof optional === 'object') {
        post_data = extend(post_data, optoinal);
    };
    var opts = this.genPostData(post_data);
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return true;
    } else {
        return false;
    };
};