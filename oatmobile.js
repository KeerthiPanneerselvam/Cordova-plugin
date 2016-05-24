var container = intravenous.create();

var XMLHTTPRequest = function() {

}
XMLHTTPRequest.prototype.open = function(method, url) {

};
XMLHTTPRequest.prototype.setRequestHeader = function(header, value) {

};

XMLHTTPRequest.prototype.send = function(data, sucess_callback, failure_callback) {

};

var ServiceManager = function() {

};
ServiceManager.prototype.post = function(url, data) {
    return new Promise(function(resolve, reject) {
        var request = new XMLHTTPRequest();
        //request.open('POST','http://192.168.1.120:8092/axis/rest/scenmsgsvc/authenticate');
        request.open('POST', url);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(data, function(status, response) {
            resolve(response);
        }, function(status, response) {
            reject(response);
        });
    });

};

var DBManager = function() {

};
DBManager.prototype.createDB = function(dbName) {

};
DBManager.prototype.executeQuery = function(dbName, query) {

};


var OatMobileSDK = OatMobileSDK || {};

OatMobileSDK.getVersion = function() {
    OatMobileSDK.log('1.0.0');
    return '1.0.1';
};

OatMobileSDK.log = function(text) {

};

OatMobileSDK.setUpConfigureDB = function(dbName) {
    var dbmanager = new DBManager();
    if (dbmanager.createDB(dbName)) {
        dbmanager.executeQuery(dbName, 'create table if not exists loginDetails(username text,password text)');
    }
};


OatMobileSDK.login = function(username, password, sucess_callback, failure_callback) {
    OatMobileSDK.log('In Login');
    //Do the chaining with dependency injection??
   // var chain = new ServiceLoginHandler(new LoginDBconfigHandler(new LoginDBUpdatHandler(new LoginCallbackHandler())));
    var chain= container.get('serviceLoginHandler');
    
    //return username+password;
    chain.handle({
        username: username,
        password: password,
        sucess_callback: sucess_callback,
        failure_callback: failure_callback
    });

};

function ChainHandler(successor) {
    this.successor = successor;
}

ChainHandler.prototype.currentOperation = function(payload) {

};
ChainHandler.prototype.handle = function(payload) {
    OatMobileSDK.log('From Parent:')
    OatMobileSDK.log(this.successor);
    this.currentOperation(payload);
    if (this.successor) {
        this.successor.handle(payload);
    }

};

var ServiceLoginHandler=function (successor,serviceManager) {
    
    ChainHandler.call(this, successor);
    this.serviceManager=serviceManager;
};
ServiceLoginHandler.prototype = Object.create(ChainHandler.prototype);
ServiceLoginHandler.prototype.handle = function(payload) {

    self = this;
    alert("handler");
    self.serviceManager.post('http://INBANGNBHAREES:8092/axis/rest/scenmsgsvc/authenticate', '{"username":"' + payload.username + '","password":"' + payload.password + '"}').then(function(result) {
        payload.result = result;
        OatMobileSDK.log('Successor');

        OatMobileSDK.log(self.successor);
        if (self.successor) {
            self.successor.handle(payload);
        }
    }, function(error) {

        failure_callback(500, error);
    });

};
ServiceLoginHandler.$inject=["loginDBconfigHandler","serviceManager"];

var LoginDBconfigHandler=function (successor,dbManager) {
    ChainHandler.call(this, successor);
    this.dbManager=dbManager;
    
};
LoginDBconfigHandler.prototype = Object.create(ChainHandler.prototype);
LoginDBconfigHandler.prototype.currentOperation = function(payload) {
  
    if (this.dbManager.createDB('Configuration.db')) {
        this.dbManager.executeQuery('Configuration.db', 'create table if not exists loginDetails(username text,password text)');
    }

};

LoginDBconfigHandler.$inject=["loginDBUpdatHandler","dbManager"];

var LoginDBUpdatHandler=function (successor,dbManager) {
    ChainHandler.call(this, successor);
    this.dbManager=dbManager;
};
LoginDBUpdatHandler.prototype = Object.create(ChainHandler.prototype);
LoginDBUpdatHandler.prototype.currentOperation = function(payload) {
    var query = "insert into loginDetails(username,password) values('" + payload.username + "','" + payload.password + "')";
    
    this.dbManager.executeQuery('Configuration.DB', query);

};
LoginDBUpdatHandler.$inject=["loginCallbackHandler","dbManager"];

var LoginCallbackHandler=function (successor) {
    ChainHandler.call(this, successor);
}

LoginCallbackHandler.prototype = Object.create(ChainHandler.prototype);
LoginCallbackHandler.prototype.currentOperation = function(payload) {
    payload.sucess_callback(200, payload.result);

};

container.register("xMLHTTPRequest",XMLHTTPRequest,"perRequest");
container.register("serviceManager",ServiceManager,"singleton");
container.register("dbManager",DBManager,"perRequest");
container.register("serviceLoginHandler",ServiceLoginHandler,"perRequest");
container.register("loginDBUpdatHandler",LoginDBUpdatHandler,"perRequest");
container.register("loginCallbackHandler",LoginCallbackHandler,"perRequest");
container.register("loginDBconfigHandler",LoginDBconfigHandler,"perRequest");

