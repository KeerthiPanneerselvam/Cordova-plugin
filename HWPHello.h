

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import "SampleJSWrapper.h"
@interface HWPHello : CDVPlugin

- (void)sayHello:(CDVInvokedUrlCommand*)command;
- (void)createdb:(CDVInvokedUrlCommand*)command;
@property SampleJSWrapper *wrapper;

@end
