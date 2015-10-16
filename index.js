var API = require('./lib/api_common');
// 用户信息
API.mixin(require('./lib/api_user'));
// 消息服务
API.mixin(require('./lib/api_message'));
// 敏感词服务
API.mixin(require('./lib/api_wordfilter'));
// 群组服务
API.mixin(require('./lib/api_group'));
// 聊天室服务
API.mixin(require('./lib/api_chatroom'));
// 消息历史记录服务
API.mixin(require('./lib/api_history'));

module.exports = API;
