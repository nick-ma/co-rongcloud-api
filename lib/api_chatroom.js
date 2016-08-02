var extend = require('util')._extend;
// 聊天室服务
// 名称					类型		说明
// chatroom[id]=name	String	id:要创建的聊天室的id；name:要创建的聊天室的name。（必传）
// chatroomData = {
//     'chatroom[0001]': '1号聊天室',
//     'chatroom[0002]': '2号聊天室',
//     'chatroom[0003]': '3号聊天室',
//     'chatroom[0004]': '4号聊天室',
// }
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

// 销毁聊天室
// 同时销毁多个聊天室： chatroomId=['0001','0002','0003','0004']
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

