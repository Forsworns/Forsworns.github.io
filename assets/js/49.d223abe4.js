(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{461:function(t,a,s){"use strict";s.r(a);var n=s(12),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"ns3-简记"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ns3-简记"}},[t._v("#")]),t._v(" NS3 简记")]),t._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#运行脚本"}},[t._v("运行脚本")])]),s("li",[s("a",{attrs:{href:"#本地编译文档"}},[t._v("本地编译文档")])]),s("li",[s("a",{attrs:{href:"#trace"}},[t._v("Trace")])]),s("li",[s("a",{attrs:{href:"#context"}},[t._v("Context")])]),s("li",[s("a",{attrs:{href:"#在已有的模块里新增文件"}},[t._v("在已有的模块里新增文件")])]),s("li",[s("a",{attrs:{href:"#python-binding"}},[t._v("Python binding")])]),s("li",[s("a",{attrs:{href:"#ns3混编-embedding-python"}},[t._v("ns3混编(embedding) Python")]),s("ul",[s("li",[s("a",{attrs:{href:"#一般情况下的c-python混编"}},[t._v("一般情况下的c++/python混编")])]),s("li",[s("a",{attrs:{href:"#可行方案-修改wscript"}},[t._v("可行方案：修改wscript")])]),s("li",[s("a",{attrs:{href:"#补充-ns3文档中相关内容"}},[t._v("补充：ns3文档中相关内容")])])])]),s("li",[s("a",{attrs:{href:"#一个很有趣的repo"}},[t._v("一个很有趣的repo")])]),s("li",[s("a",{attrs:{href:"#tips"}},[t._v("TIPS")])])])]),s("p"),t._v(" "),s("h2",{attrs:{id:"运行脚本"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#运行脚本"}},[t._v("#")]),t._v(" 运行脚本")]),t._v(" "),s("p",[t._v("运行c++脚本 "),s("code",[t._v('./waf --run=app_name --command-template="%s --arg_name=arg_value"')]),t._v("。要调用gdb可以在command-template里面加，如"),s("code",[t._v('--command-template="gdb %s --arg_name=arg_value"')]),t._v("。")]),t._v(" "),s("p",[t._v("如果是python脚本，是要用 "),s("code",[t._v('./waf --pyrun=app_path --command-template="%s --arg_name=arg_value"')]),t._v("。注意这里要用路径，不像运行c++脚本可以直接写"),s("code",[t._v("scratch")]),t._v("目录下的脚本名字。")]),t._v(" "),s("p",[t._v("跑python脚本的时候在"),s("code",[t._v("scratch")]),t._v("目录生成"),s("code",[t._v("__pycache__")]),t._v("可能会导致任务执行失败，要及时清理掉cache。也可以改ns3根目录下的"),s("code",[t._v("wscript")]),t._v("中的"),s("code",[t._v("def add_scratch_programs(bld)")]),t._v("函数自动跳过该目录。")]),t._v(" "),s("h2",{attrs:{id:"本地编译文档"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#本地编译文档"}},[t._v("#")]),t._v(" 本地编译文档")]),t._v(" "),s("p",[t._v("在线文档有些慢，不如在本地编译一个。需要安装doxygen，同时重新配置一下waf")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt-get")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" doxygen\n./waf configure --enable-examples --enable-tests\n./waf --doxygen\n")])])]),s("p",[t._v("如果出现错误提示某些脚本里存在"),s("code",[t._v("'\\r'")]),t._v("不能识别，可能是因为Linux下换行符和Windows下不同，用VScode这些编辑器转换CRLF到LF就行了。")]),t._v(" "),s("h2",{attrs:{id:"trace"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#trace"}},[t._v("#")]),t._v(" Trace")]),t._v(" "),s("p",[t._v("ns3的trace系统定义了一系列的source去追踪不同的变量，在变量发生变化时可以触发sink记录这种变化。在运行模拟实验时，通过用户定义的回调函数来做为trace souce的trace sink。这些source回调函数一般在类内定义为私有变量，命名规则为"),s("code",[t._v("m_aTraceFunction")]),t._v("。在定义的时候，这些回调函数的类型为"),s("code",[t._v("TracedCallback<T1, T2, ...>")]),t._v("。")]),t._v(" "),s("p",[t._v("需要指出，ns3的回调函数的返回类型默认都是"),s("code",[t._v("void")]),t._v("，模板中的"),s("code",[t._v("T")]),t._v("是回调函数的参数变量类型。那么我们在写sink的时候，需要定义成"),s("code",[t._v("void aTraceSink(std::string context, T1 xx, T2 xx, ...)")]),t._v("。这里的"),s("code",[t._v("std::string context")]),t._v("是表明我们自定义sink与哪个source相连接的，即此刻的变化是从哪个节点发出的。")]),t._v(" "),s("p",[t._v("绑定sink回调时候使用"),s("code",[t._v("Config::Connet(a context, MakeCallback(&aTraceSink))")]),t._v("。")]),t._v(" "),s("p",[t._v("自定义sink的时候，"),s("code",[t._v("std::string context")]),t._v("参数也可以省略掉，写成"),s("code",[t._v("void anotherTraceSink(T1 xx, T2 xx, ...)")]),t._v("，在绑定到监听的对象上时使用的是"),s("code",[t._v("Config::ConnectWithoutContext")]),t._v("。")]),t._v(" "),s("p",[t._v("绑定sink也可以用"),s("code",[t._v("obj.TraceConnect")]),t._v("和"),s("code",[t._v("obj.TraceConnectWithoutContext")]),t._v("绑定到一个具体的对象上，用法与"),s("code",[t._v("Config::Connect")]),t._v("类似，因为后者本来就是调用了前者实现的，详见官方tutorial。")]),t._v(" "),s("h2",{attrs:{id:"context"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[t._v("#")]),t._v(" Context")]),t._v(" "),s("p",[t._v("Context其实就是节点、应用、函数的名字，比如"),s("code",[t._v("/NodeList/*/DeviceList/*/$ns3::WifiNetDevice/Mac/$ns3::AdhocWifiMac/Txop/CwTrace")]),t._v("写的是任意节点上的任意网卡上的任意无线网卡上的Mac层的传输时的congestion window的Trace？然后在ns3文档的api列表中找到"),s("code",[t._v("CwTrace")]),t._v("的定义，写一个回调用"),s("code",[t._v("Config::Connect")]),t._v("到这个context就可以监听了。用下面的函数可以便捷地从Context中提取NodeId。")]),t._v(" "),s("div",{staticClass:"language-c++ extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('uint32_t ContextToNodeId(std::string context) {\n    std::string sub = context.substr(10); // skip "/NodeList/"\n    uint32_t pos = sub.find("/Device");\n    NS_LOG_DEBUG("Found NodeId " << atoi(sub.substr(0, pos).c_str()));\n    return atoi(sub.substr(0, pos).c_str());\n}\n')])])]),s("h2",{attrs:{id:"在已有的模块里新增文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#在已有的模块里新增文件"}},[t._v("#")]),t._v(" 在已有的模块里新增文件")]),t._v(" "),s("p",[t._v("记得改模块目录下的wscript，把新增的文件编译进"),s("code",[t._v("build/ns3")]),t._v("里，否则去"),s("code",[t._v("scrach")]),t._v("下写测试还是找不到新增的文件。")]),t._v(" "),s("p",[t._v("有时候会破坏python binding的文件依赖，不会改模块binding目录下的设置，把python binding关了不要生成python的对应包了= ="),s("code",[t._v(".\\build -- --diable-python")]),t._v(" 或者"),s("code",[t._v(".\\nsxxx\\waf configure --disable-python")])]),t._v(" "),s("p",[t._v("如果是新增模块，可以用waf自动生成，详见官方文档。")]),t._v(" "),s("h2",{attrs:{id:"python-binding"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#python-binding"}},[t._v("#")]),t._v(" Python binding")]),t._v(" "),s("p",[t._v("如果不需要python binding，只用C++，官方建议就是直接用"),s("code",[t._v("./build.py -- --disable-python")]),t._v("或"),s("code",[t._v("./waf --disable-python")]),t._v("，这样build快而且不会出现和python有关的问题。")]),t._v(" "),s("p",[t._v("如果想用python binding，但激活了Anaconda中的环境，在build时python binding会无法enable。")]),t._v(" "),s("p",[t._v("使用"),s("code",[t._v(".\\waf configure")]),t._v('之后，发现具体问题是"Testing pyembed configuration   : Could not build a python embedded interpreter"错误。')]),t._v(" "),s("p",[t._v("似乎很多使用waf构建的项目中都会出现这个问题，我找不到合适的解决方法。尝试把anaconda环境deactivated掉就好了。这里deactivated后，最好改一下"),s("code",[t._v("build.py")]),t._v(" 和"),s("code",[t._v("waf")]),t._v("中的解释器，默认是"),s("code",[t._v("#! /usr/bin/env python")]),t._v("在一些机器上可能会去调用"),s("code",[t._v("pyhon2")]),t._v("。改成"),s("code",[t._v("#! /usr/bin/env python3")]),t._v("。")]),t._v(" "),s("p",[t._v("然后在用官方提供的"),s("code",[t._v("build.py")]),t._v("脚本或者用"),s("code",[t._v("waf")]),t._v("构建后，再激活Anaconda中的某个环境，"),s("code",[t._v("waf")]),t._v("会自动link一遍build过的python binding，在Anaconda的某个环境里就可用了~")]),t._v(" "),s("p",[t._v("可惜一切努力全部木大了。python binding不支持很多底层的api，而且"),s("strong",[t._v("不支持使用回调的tracing")]),t._v("，只可以使用pcap和ascii文件。同时后面会提到的一个repo，我这边又build不了，这也导致我只能去考虑在ns3中混编python，遇到了很多新坑。")]),t._v(" "),s("h2",{attrs:{id:"ns3混编-embedding-python"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ns3混编-embedding-python"}},[t._v("#")]),t._v(" ns3混编(embedding) Python")]),t._v(" "),s("p",[t._v("直接用python binding是不可能了，虽然有C++的tensorflow，但是看了一下配置又很麻烦。就想用cpp调用python，查了一下写了一些测试似乎很方便嘛。想着这样算法的实现上可以用python灵活简单一点，也有大段现成的算法实现。那就看看怎么embedding python into c++。😋")]),t._v(" "),s("h3",{attrs:{id:"一般情况下的c-python混编"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一般情况下的c-python混编"}},[t._v("#")]),t._v(" 一般情况下的c++/python混编")]),t._v(" "),s("p",[t._v("一般的情况下，在C++中混编python只需要加上python的头文件"),s("code",[t._v("#include 'Python.h'")]),t._v(" （这里要注意可能需要用绝对路径，看你python怎么装的），然后为g++添加如下参数进行编译就行了")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("g++ callpy.cpp "),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")]),t._v("python3-config --cflags"),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")]),t._v("python3-config --ldflags"),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")])]),t._v(" -fPIC "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 添加的参数会自动展开为头文件和链接库参数")]),t._v("\n")])])]),s("p",[t._v("使用"),s("code",[t._v("Py_Initialize ();")]),t._v("和"),s("code",[t._v("Py_Finalize ();")]),t._v("可以初始化和关闭Python解释器。在C++中，python的变量都被创建为一个类型为"),s("code",[t._v("PyObject")]),t._v("的指针。")]),t._v(" "),s("p",[t._v("模块导入方面，若是使用 "),s("code",[t._v('PyRun_SimpleString ("import os");')]),t._v("导入模块，则模块在C++代码中可见，可以使用"),s("code",[t._v("PyRun_SimpleString (print(os.getcwd())；")]),t._v("若使用的是 "),s("code",[t._v('pName = PyUnicode_DecodeFSDefault ("os"); pModule = PyImport_ImportModule (pName);')]),t._v("导入模块，则无法通过``PyRun_SimpleString"),s("code",[t._v("去使用")]),t._v("os`。")]),t._v(" "),s("p",[t._v("使用"),s("code",[t._v("PyModule_GetDict(pModule)")]),t._v("从模块中获取一个字典结构。")]),t._v(" "),s("p",[t._v("使用"),s("code",[t._v('pFunc = PyDict_GetItemString(pDict,"disp")')]),t._v("去从字典中获取名为"),s("code",[t._v("disp")]),t._v("的函数，使用"),s("code",[t._v("PyCallable_Check(pFunc)")]),t._v("检查获取的指针是否指向一个可以调用的函数。")]),t._v(" "),s("p",[s("code",[t._v("pArgs = PyTuple_New(0)")]),t._v("创建一个空的元组"),s("code",[t._v("pArgs")]),t._v("去作为函数参数，它可以通过"),s("code",[t._v('PyTuple_SetItem(pArgs, 0, Py_BuildValue(""));')]),t._v(" 初始化，之后使用"),s("code",[t._v("PyObject_CallObject (pFunc, pArgs);")]),t._v("调用函数。")]),t._v(" "),s("p",[t._v("使用函数"),s("code",[t._v("PyObject* Py_BuildValue(char *format, ...)")]),t._v("可以把C++的变量转换成一个Python对象。当需要从C++传递变量到Python时，就会使用这个函数。"),s("code",[t._v("format")]),t._v("参数中常用的格式有")]),t._v(" "),s("ul",[s("li",[t._v("i 表示int")]),t._v(" "),s("li",[t._v("I 表示unsigned int")]),t._v(" "),s("li",[t._v("f 表示float")]),t._v(" "),s("li",[t._v("O 表示一个Python对象")]),t._v(" "),s("li",[t._v("更多见Python"),s("a",{attrs:{href:"https://docs.python.org/3/c-api/arg.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("文档"),s("OutboundLink")],1)])]),t._v(" "),s("p",[t._v("例如"),s("code",[t._v('PyTuple_SetItem(pArgs, 0, Py_BuildValue("i",3));')]),t._v("，把第一个参数设置成了整型变量3。如果是直接用去构造函数的参数，往往需要写成元组形式如"),s("code",[t._v('pArgs=Py_BuildValue("(ii)",3,3)')]),t._v("，在只有一个参数的时候尤其需要注意如"),s("code",[t._v('pArgs=Py_BuildValue("(i)",3)')]),t._v("。想要取出python函数的返回值要用"),s("code",[t._v("PyArg_Parse")]),t._v("或"),s("code",[t._v("PyArg_ParseTuple")]),t._v("，使用引用传递按上面的"),s("code",[t._v("format")]),t._v("字符串赋值给C++变量，如"),s("code",[t._v('PyArg_Parse (retObj, "d", &ret);')]),t._v("。这些api在使用的时候一定要注意"),s("code",[t._v("format")]),t._v("字符串中的数据格式！如果把数据格式写错了，bug会很难找。")]),t._v(" "),s("p",[t._v("使用"),s("code",[t._v('instanceObj = PyObject_CallMethod(pModule,"clsName",NULL);')]),t._v("可以创建一个"),s("code",[t._v("clsName")]),t._v("类型的对象。对象的"),s("code",[t._v("disp")]),t._v("方法可以用"),s("code",[t._v('PyObject_CallMethod(instanceObj,"disp",NULL)')]),t._v("调用，如果附加参数的话需要直接用前面"),s("code",[t._v("format")]),t._v("参数的模板语法。（官方文档推荐使用"),s("code",[t._v("PyInstanceMethod_New")]),t._v("去创建实例，但是实际使用时似乎创建失败也不会返回NULL，导致很难debug）。")]),t._v(" "),s("p",[t._v("在python代码中使用面向对象的思想，是为了维护一些在C++中调用方法去更改的变量。后来测试发现在C++中使用"),s("code",[t._v("PyImport_ImportModule()")]),t._v("加载模块后，模块中的全局变量会自动加载，因此在调用函数的时候，也可以通过global关键字维护全局变量，避免使用对象的概念，在C++里调用的时候会简单一些。")]),t._v(" "),s("p",[t._v("如果在C++中导入py脚本出现错误，试着先独立运行python脚本，确保它是正确的。出现问题时尝试print输出调试，python中的错误没法报出来，只能"),s("code",[t._v("print()")]),t._v("输出调试。")]),t._v(" "),s("p",[t._v("更多具体的混编写法，可以参考"),s("a",{attrs:{href:"https://docs.python.org/3/c-api/",target:"_blank",rel:"noopener noreferrer"}},[t._v("python官方文档"),s("OutboundLink")],1),t._v("中的介绍。")]),t._v(" "),s("h3",{attrs:{id:"可行方案-修改wscript"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#可行方案-修改wscript"}},[t._v("#")]),t._v(" 可行方案：修改wscript")]),t._v(" "),s("p",[t._v("但是写了一段时间真把cpp和python往一起整合的时候，才发现，“不对啊，ns3是用waf去管理编译过程的”。👿天真地以为把"),s("code",[t._v("build")]),t._v("目录下的"),s("code",[t._v("ns3")]),t._v("头文件和"),s("code",[t._v("lib")]),t._v("里的动态链接库的路径都加到g++后就行了。但是果然失败了……")]),t._v(" "),s("p",[t._v("于是求助万能的google，可惜网上似乎没有这么干的人= =。没办法，自己去读了一下"),s("a",{attrs:{href:"https://waf.io/apidocs/tools/python.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("waf的文档"),s("OutboundLink")],1),t._v("吧，刚好发现了这段")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Support for Python, detect the headers and libraries and provide use variables to link C/C++ programs against them:")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("options")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("opt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\topt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("load"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'compiler_c python'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("configure")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("conf"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    conf"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("load"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'compiler_c python'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    conf"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("check_python_version"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    conf"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("check_python_headers"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("build")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("bld"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    bld"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("program"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("features"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'pyembed'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" source"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a.c'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" target"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'myprog'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    bld"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("shlib"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("features"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'pyext'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" source"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'b.c'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" target"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mylib'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("假设环境都合适，那这段的意思就是，要在waf中使用c++和python混编，只需要在"),s("code",[t._v("build")]),t._v("函数里面调用 "),s("code",[t._v("bld.program(features='pyembed', source='a.c', target='myprog')")]),t._v("。再浓缩一下，就是要把生成程序的函数的"),s("code",[t._v("feature")]),t._v("参数设置成"),s("code",[t._v("'pyembed'")]),t._v("。这下我们知道了混编python改waf配置就可以了。")]),t._v(" "),s("p",[t._v("经过尝试，对于ns3的具体做法是打开ns3主目录下的"),s("code",[t._v("wscript")]),t._v("，搜索一下"),s("code",[t._v("options")]),t._v("函数在哪里，然后做如下改动。")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 修改原来的option函数，加载python解释器")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("options")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("opt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# options provided by the modules")]),t._v("\n    opt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("load"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'compiler_c'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    opt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("load"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'compiler_cxx'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    opt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("load"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'cflags'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    opt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("load"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'gnu_dirs'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    opt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("load"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'python'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# other commands")]),t._v("\n")])])]),s("p",[s("code",[t._v("configure")]),t._v("函数似乎是可改可不改的，毕竟是自己的机子，默认没问题，不检查环境也行~")]),t._v(" "),s("p",[t._v("重要的是创建程序时的"),s("code",[t._v("features")]),t._v("参数。因为依赖复杂，ns3的wscript写法也比较复杂，和上面简单的waf示例脚本不同，ns3的wscript中为每个程序创建了一个对象，分别设置各种选项，然后为每个程序添加依赖项。这里我们需要找到"),s("code",[t._v("create_ns3_program")]),t._v("函数的定义，然后做如下修改")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 在features参数后面添加一个pyembed就行了")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("create_ns3_program")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("bld"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" dependencies"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'core'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    program "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" bld"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("features"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'cxx cxxprogram pyembed'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# waf可以通过空格分隔选项")]),t._v("\n    program"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("is_ns3_program "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("True")]),t._v("\n    program"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" name\n")])])]),s("p",[t._v("这样做其实挺粗暴的，其他一些没有用python的cpp代码也会被添加这项feature，可能更好的做法是单独在"),s("code",[t._v("scratch")]),t._v("下写wscript，但是我不会💔。")]),t._v(" "),s("p",[t._v("另外因为会有"),s("code",[t._v("__pycache__")]),t._v("生成，最好再在上面的wscript中添加如下代码，在编译时跳过cache，否则要每次清理掉cache再编译。")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add_scratch_programs")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("bld"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" os"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("isdir"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("os"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("join"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"scratch"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" filename"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" filename "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"__pycache__"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n                "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("continue")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n")])])]),s("p",[t._v("还有需要注意的一点是，如果在cpp中导入了自己的python包，要注意下包的路径，否则会找不到。因为ns3的脚本运行时候的路径是在根目录。可以把包copy到ns3的根目录，或者在用"),s("code",[t._v("PyRun_SimpleString (\"sys.path.append('./where you place package')\");")]),t._v("加个路径。")]),t._v(" "),s("p",[t._v("改完之后，万幸，代码能跑起来了~")]),t._v(" "),s("p",[t._v("体会就是“只要我们不停下脚步，道路就会不断延伸”。")]),t._v(" "),s("p",[t._v("▏n"),s("br"),t._v("\n█▏　､⺍"),s("br"),t._v("\n█▏ ⺰ʷʷｨ"),s("br"),t._v("\n█◣▄██◣"),s("br"),t._v("\n◥██████▋"),s("br"),t._v("\n　◥████ █▎"),s("br"),t._v("\n　　███▉ █▎"),s("br"),t._v("\n　◢████◣⌠ₘ℩"),s("br"),t._v("\n　　██◥█◣\\≫"),s("br"),t._v("\n　　██　◥█◣"),s("br"),t._v("\n　　█▉　　█▊"),s("br"),t._v("\n　　█▊　　█▊"),s("br"),t._v("\n　　█▊　　█▋"),s("br"),t._v("\n　　 █▏　　█▙"),s("br"),t._v("\n　　 █")]),t._v(" "),s("h3",{attrs:{id:"补充-ns3文档中相关内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#补充-ns3文档中相关内容"}},[t._v("#")]),t._v(" 补充：ns3文档中相关内容")]),t._v(" "),s("p",[t._v("事实上，对于在编译时添加别的依赖ns3文档中有"),s("a",{attrs:{href:"https://www.nsnam.org/wiki/HOWTO_use_ns-3_with_other_libraries",target:"_blank",rel:"noopener noreferrer"}},[t._v("相关描述"),s("OutboundLink")],1),t._v("（当然去读主目录下的"),s("code",[t._v("wscript")]),t._v("也可以发现，可以试着在"),s("code",[t._v("wscript")]),t._v("中搜索"),s("code",[t._v("CXXFLAGS")]),t._v("），可以用"),s("code",[t._v("CCFLAGS_EXTRA")]),t._v("这些选项为编译器添加参数或者在"),s("code",[t._v("wscript")]),t._v("里面改，原因是"),s("code",[t._v("wscript")]),t._v("中这样定义过了")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# append user defined flags after all our ones")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("confvar"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" envvar"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'CCFLAGS'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'CCFLAGS_EXTRA'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                          "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'CXXFLAGS'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'CXXFLAGS_EXTRA'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                          "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'LINKFLAGS'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'LINKFLAGS_EXTRA'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n                          "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'LINKFLAGS'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'LDFLAGS_EXTRA'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n")])])]),s("p",[t._v("于是"),s("a",{attrs:{href:"https://stackoverflow.com/questions/11876088/how-to-build-ns-3-to-use-c0x-c11-libraries",target:"_blank",rel:"noopener noreferrer"}},[t._v("stackoverflow"),s("OutboundLink")],1),t._v("上有人提到如果是为编译器添加c++11选项可以这么做")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("CXXFLAGS")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"-std=c++0x"')]),t._v(" ./waf build\n")])])]),s("p",[t._v("但是我试过这类方法，失败了，原因是用了"),s("code",[t._v("CXXFLAGS")]),t._v("，"),s("code",[t._v("CXXDEFINES")]),t._v("，"),s("code",[t._v("LINKFLAGS")]),t._v("这些参数对"),s("code",[t._v("python3-config --cflags")]),t._v("，"),s("code",[t._v("python3-config --ldflags")]),t._v(" 和"),s("code",[t._v("-fPIC")]),t._v("都不合适= =我不知道咋用这种方法设置了。")]),t._v(" "),s("h2",{attrs:{id:"一个很有趣的repo"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一个很有趣的repo"}},[t._v("#")]),t._v(" 一个很有趣的repo")]),t._v(" "),s("p",[t._v("之前打算用python的binding api，刚好发现了这个repo："),s("a",{attrs:{href:"https://github.com/tkn-tub/ns3-gym",target:"_blank",rel:"noopener noreferrer"}},[t._v("ns3-gym"),s("OutboundLink")],1),t._v(" 。")]),t._v(" "),s("p",[t._v("但是把这个repo clone下来后，先去编译ns3的部分，再按README中"),s("code",[t._v("pip3 install ./src/opengym/model/ns3gym")]),t._v("安python的api，不是像其他模块那样用pybindgen自动生成的api。")]),t._v(" "),s("p",[t._v("但是很可惜没用build成功，具体情况记录在该"),s("a",{attrs:{href:"https://github.com/tkn-tub/ns3-gym/issues/32",target:"_blank",rel:"noopener noreferrer"}},[t._v("issue"),s("OutboundLink")],1),t._v("。问题主要出在protobuf和zmq上。protobuf作者用了一个比较旧的版本，从PPA拉取后却检测不到，后来发现是登录用户的环境变量没加"),s("code",[t._v("/usr/bin")]),t._v("，这个主要是用来编译"),s("code",[t._v("src/opengym/model/messages.proto")]),t._v("和提供链接库的，编译方法是在"),s("code",[t._v("src/opengym/model")]),t._v("下调用"),s("code",[t._v("protoc ./messages.proto --cpp_out=./")]),t._v("。而且这里如果anaconda环境中安了python版的protobuf，同样需要关掉anaconda的环境，用"),s("code",[t._v("which protoc")]),t._v("看一下吧。zmq的话，作者提到用 "),s("strong",[t._v("libzmq5-dev")]),t._v("，但是ubuntu16.04上只能找到 "),s("strong",[t._v("libzmq3-dev")]),t._v("。不过似乎是没有什么兼容性问题的，毕竟最后可以跑起来。zmq这里出问题的原因是作者接受了一个pr，改了api的调用方式，但是我们的版本里某些参数似乎还是optional的。不写平台、版本乱提pr害人不浅= =")]),t._v(" "),s("h2",{attrs:{id:"tips"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#tips"}},[t._v("#")]),t._v(" TIPS")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("总是考虑去用Helper")]),t._v(" "),s("p",[t._v("ns3中的很多类都有helper类，尝试使用它们~")])]),t._v(" "),s("li",[s("p",[t._v("直接用官方的ShowProgress绑定到std::cout上会有问题")])]),t._v(" "),s("li",[s("p",[t._v("Schedule用来安排函数的执行时，只需要指定运行时间并引用函数的指针，如"),s("code",[t._v("Simulator::Schedule (Seconds (1), &FunctionName)")]),t._v("；用来安排某个类的方法的执行时，要写出执行该方法的对象的指针，如如"),s("code",[t._v("Simulator::Schedule (Seconds (1), &ClassName::FunctionName,ObjectOfTheClass)")]),t._v("。")])])]),t._v(" "),s("p",[s("RouterLink",{attrs:{to:"/zh/blogs/"}},[t._v("返回")])],1),t._v(" "),s("Comment",{attrs:{lang:"zh-CN"}})],1)}),[],!1,null,null,null);a.default=e.exports}}]);