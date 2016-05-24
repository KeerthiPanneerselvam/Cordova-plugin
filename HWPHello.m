


#import "HWPHello.h"
#import "DBManager.h"

@implementation HWPHello





- (void)sayHello:(CDVInvokedUrlCommand*)command {
    _wrapper=[[SampleJSWrapper alloc] init];
    NSString *name = [command.arguments objectAtIndex:0];
     NSString *pass = [command.arguments objectAtIndex:1];
  //NSString *var =   [_wrapper login:name withPassword:pass ];
    [_wrapper login:name withPassword:pass withSuccessBlock:^(NSNumber *status, NSString *response) {
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Login Successful"];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        
        //[self displayAlert:@"Login" withMessage:@"Login Successfull"];
    } withFailureBlock:^(NSNumber *status, NSString *response) {
         CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Login failed"];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];

    
  //  NSString *responseString = [NSString stringWithFormat:@"Hello %@", [command.arguments objectAtIndex:0]];
    
   
}

- (void)createdb:(CDVInvokedUrlCommand *)command {
    _wrapper=[[SampleJSWrapper alloc] init];
 //   [_wrapper createDatabase:@"Configuration.db"];
    

    bool var1 =   [_wrapper createDatabase:@"Configuration.db"];
    
    
    //  NSString *responseString = [NSString stringWithFormat:@"Hello %@", [command.arguments objectAtIndex:0]];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:var1];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}
@end
