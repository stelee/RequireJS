QUnit.test("require js initialized",function(assert){
	assert.ok(typeof require === "function","function require is ready");
	assert.ok(typeof mixin === "function","function mixin is ready");
	assert.ok(typeof injector === "object","object injector is ready");
});

QUnit.test("require function test",function(assert){
	var fn=require('case1').case1;
	assert.ok(fn()===1,"require works");
});

QUnit.test("require third party library test",function(assert){
	require('case2');
	assert.ok(testVal===1,"script works");
});

QUnit.test("mixin function test",function(assert){
	var Duck=function(){

	}

	var flyable={
		hasWing : function(){return true}
		,fly: function(){return "fly"}
	}

	mixin(Duck,flyable);

	var duck=new Duck();

	assert.ok(duck.hasWing()===true,"mixin passed");
	assert.ok(duck.fly()==="fly","mixin passed");
});

QUnit.test("injector function test",function(assert){
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
		});
	var anotherInjector=newInjector();
	anotherInjector.cloneDeps(injector);
	anotherInjector.process('logger','context','outer','auto_outer',
		function(logger,context,outer,autoOuter){
			assert.ok(logger("hello")==="hello","another injection: function injection works");
			assert.ok(context.foo()==="bar","another injection: object injection works");
			assert.ok(outer.echo() === "bart","another injection: outer injection works");
			assert.ok(autoOuter.echo() === "bart","another injection: auto outer injection works");
		});
	anotherInjector.register("logger",function(message){
		return "echo:"+message;
	})
	anotherInjector.process('logger',function(logger){
		assert.ok(logger("hello")==="echo:hello","another injection/function update: function injection works");
	})
});