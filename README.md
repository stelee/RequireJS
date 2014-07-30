RequireJS
=========

An elegant way to manage your javascript library for web
-----------------------------------
Have you ever had the chance to use node.js, the biggest ehancement of the node.js is the way to mange the javascript package and the libraries.we can very easily use _define_ function to define a module and use _require_ function to load the module. 

Unfortunately, we still don't have an embedded package management soluton for the web. That's way I decided to write this require.js to better mange, import and injection the javascript libraries.

How to use it
--------

It is simple, you only need to include the javascript in your html file

`<script language="javascript" src="libs/require.js"></script>`

If you want to use require to include a javascript library, you need to define that.

```
//file name path/mylib.js
var myFunc=function(){console.log("mylib is running")};
exports.myFunc=myFunc;
```
you can test your code with the following way:

```
var myFunc=require('path/mylib').myFunc;
mylib();//will print the string "my lib is running"
```

Also, you can simply include the other javascript by using:
```
require('path/jquery.js');
```

**New feture**
I finally make it support dependencies injection.

    injector.register("logger",function(message){
		return message;
	});
	injector.register("context",{
		foo: function(){return "bar"}
	});
	injector.register("outer","outer_dep");

	injector.process('logger','context','outer','auto_outer',
		function(logger,context,outer,autoOuter){
			assert.ok(logger("hello")==="hello","function injection works");
			assert.ok(context.foo()==="bar","object injection works");
			assert.ok(outer.echo() === "bart","outer injection works");
			assert.ok(autoOuter.echo() === "bart","auto outer injection works");
		}
	);
	
For those who like to mock the object for testing, I have the *createNewInjector* function to support.

    var anotherInjector=newInjector();
	anotherInjector.cloneDeps(injector); //clone the dependencies if you like
	anotherInjector.register("logger",function(message){ //change some function, here you can use your mock object
		return "echo:"+message;
	})
	anotherInjector.process('logger',function(logger){
		assert.ok(logger("hello")==="echo:hello","another injection/function update: function injection works");
	})

For more details, please check the QUnit included.


How to config it
------------
There is the configuration object in the code, named as _config_, you can config the following:

* contentResolver : normally, this is not suggested to change. It will use _ajaxGet_ function to get the data from another javascript file.
* pathResolver: this is used to get the real path of the javascript. By default, the path of the javascript must be in the same domain of your web app due to the security limitation
* async: by default this is set to false. So you can use the code like ```var func=require('path/lib').fun```. Or else you need to set the callback to handle the js library.
* alias.*: is the name registered for the global

How to test it
------------
In this version, I have included the test. In the node envrionment, you can just run the

    node server
and check the test result from http://localhost:9002/index.html

Enjoy it
---------
My next plan is:

* add more test case for require.js
* pubish more handy javascript libraries

If you have any question, feel free to contact liy#leesoft.ca or follow my twitter @leesoft

Thanks!
