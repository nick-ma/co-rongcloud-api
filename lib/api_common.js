// 本文件用于wechat API，基础文件，主要用于Token的处理和mixin机制
var httpx = require('httpx');
var streamx = require('streamx');
var crypto = require('crypto');
var extend = require('util')._extend;
var querystring = require('querystring');

var API = function (appKey, appSecert) {
    this.__baseurl__ = 'http://api.cn.ronghub.com';
    this.__format__ = 'json';
    this.__appkey__ = appKey;
    this.__appsecret__ = appSecert;
    this.__headers__ = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'App-Key': this.__appkey__,
    };
    this.defaults = {};

};

API.prototype.getSignature = function (nonce, timestamp) {
    var shasum = crypto.createHash('sha1');
    shasum.update(this.__appsecret__ + nonce + timestamp);
    return shasum.digest('hex');
};

API.prototype.updateHeader = function () {
    var nonce = parseInt(Math.random() * 0xffffff);
    var timestamp = Date.parse(new Date()) / 1000;
    var signature = this.getSignature(nonce, timestamp);
    return extend(this.__headers__, {
        'Nonce': nonce,
        'Timestamp': timestamp,
        'Signature': signature
    });
};

API.prototype.setOpts = function (opts) {
    this.defaults = opts;
};

API.prototype.request = function* (url, opts) {
    var options = {};
    extend(options, this.defaults);
    opts || (opts = {});
    for (var key in opts) {
        if (key !== 'headers') {
            options[key] = opts[key];
        } else {
            if (opts.headers) {
                options.headers = options.headers || {};
                extend(options.headers, opts.headers);
            }
        }
    }

    var res = yield httpx.request(url, options);
    if (res.statusCode < 200 || res.statusCode > 204) {
        var err = new Error("url: " + url + ", status code: " + res.statusCode);
        err.name = "RongCloudAPIError";
        throw err;
    }

    var buffer = yield streamx.read(res);
    var contentType = res.headers['content-type'] || '';
    if (contentType.indexOf('application/json') !== -1) {
        var data;
        try {
            data = JSON.parse(buffer);
        } catch (ex) {
            var err = new Error('JSON.parse error. buffer is ' + buffer.toString());
            err.name = "RongCloudAPIError";
            throw err;
        }
        if (data && data.errcode) {
            var err = new Error(data.errmsg);
            err.name = 'RongCloudAPIError';
            err.code = data.errcode;
            throw err;
        }

        return data;
    }

    return buffer;
};

API.prototype.genURL = function (path) {
    return [this.__baseurl__, path, '.', this.__format__].join('');
};

API.prototype.genPostData = function (post_data) {
    return {
        headers: this.updateHeader(),
        method: 'POST',
        data: querystring.stringify(post_data)
    };
};

API.prototype.genPostJsonData = function (post_data) {
    var data = {
        headers: this.updateHeader(),
        method: 'POST',
        data: post_data
    };
    data.headers['Content-Type'] = 'Application/json';
    return data;
};

// 换取userid的token
API.prototype.getToken = function* (userid, name, portrait_url) {
    var url = this.genURL('/user/getToken');
    var post_data = {
        userId: userid
    };
    if (name) {
        post_data['name'] = name;
    };
    if (portrait_url) {
        post_data['portraitUri'] = portrait_url;
    };
    var opts = {
        headers: this.updateHeader(),
        method: 'POST',
        data: querystring.stringify(post_data)
    };
    var ret_data = yield * this.request(url, opts);
    if (ret_data.code == 200) {
        return ret_data.token;
    } else {
        return null;
    };
};

/**
 * 用于支持对象合并。将对象合并到API.prototype上，使得能够支持扩展
 * Examples:
 * ```
 * // 媒体管理（上传、下载）
 * API.mixin(require('./lib/api_media'));
 * ```
 * @param {Object} obj 要合并的对象
 */
API.mixin = function (obj) {
    for (var key in obj) {
        if (API.prototype.hasOwnProperty(key)) {
            throw new Error('Don\'t allow override existed prototype method. method: ' + key);
        }
        API.prototype[key] = obj[key];
    }
};

module.exports = API;
