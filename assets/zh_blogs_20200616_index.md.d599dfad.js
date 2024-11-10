import{_ as s,c as n,o,e as a}from"./app.db17c96a.js";const C=JSON.parse('{"title":"NS3 简记","description":"NS3中混编C++/python代码的痛苦经历","frontmatter":{"title":"NS3 简记","description":"NS3中混编C++/python代码的痛苦经历","tags":["配环境","C++"]},"headers":[{"level":2,"title":"运行脚本","slug":"运行脚本","link":"#运行脚本","children":[]},{"level":2,"title":"本地编译文档","slug":"本地编译文档","link":"#本地编译文档","children":[]},{"level":2,"title":"Trace","slug":"trace","link":"#trace","children":[]},{"level":2,"title":"Context","slug":"context","link":"#context","children":[]},{"level":2,"title":"在已有的模块里新增文件","slug":"在已有的模块里新增文件","link":"#在已有的模块里新增文件","children":[]},{"level":2,"title":"Python binding","slug":"python-binding","link":"#python-binding","children":[]},{"level":2,"title":"ns3混编(embedding) Python","slug":"ns3混编-embedding-python","link":"#ns3混编-embedding-python","children":[{"level":3,"title":"一般情况下的c++/python混编","slug":"一般情况下的c-python混编","link":"#一般情况下的c-python混编","children":[]},{"level":3,"title":"可行方案：修改wscript","slug":"可行方案-修改wscript","link":"#可行方案-修改wscript","children":[]},{"level":3,"title":"两年后重新编译这个混编的项目","slug":"两年后重新编译这个混编的项目","link":"#两年后重新编译这个混编的项目","children":[]},{"level":3,"title":"补充：ns3文档中相关内容","slug":"补充-ns3文档中相关内容","link":"#补充-ns3文档中相关内容","children":[]}]},{"level":2,"title":"一个很有趣的repo","slug":"一个很有趣的repo","link":"#一个很有趣的repo","children":[]},{"level":2,"title":"TIPS","slug":"tips","link":"#tips","children":[]}],"relativePath":"zh/blogs/20200616/index.md"}'),e={name:"zh/blogs/20200616/index.md"},p=a(`<h1 id="ns3-简记" tabindex="-1">NS3 简记 <a class="header-anchor" href="#ns3-简记" aria-hidden="true">#</a></h1><nav class="table-of-contents"><ul><li><a href="#运行脚本">运行脚本</a></li><li><a href="#本地编译文档">本地编译文档</a></li><li><a href="#trace">Trace</a></li><li><a href="#context">Context</a></li><li><a href="#在已有的模块里新增文件">在已有的模块里新增文件</a></li><li><a href="#python-binding">Python binding</a></li><li><a href="#ns3混编-embedding-python">ns3混编(embedding) Python</a><ul><li><a href="#一般情况下的c-python混编">一般情况下的c++/python混编</a></li><li><a href="#可行方案-修改wscript">可行方案：修改wscript</a></li><li><a href="#两年后重新编译这个混编的项目">两年后重新编译这个混编的项目</a></li><li><a href="#补充-ns3文档中相关内容">补充：ns3文档中相关内容</a></li></ul></li><li><a href="#一个很有趣的repo">一个很有趣的repo</a></li><li><a href="#tips">TIPS</a></li></ul></nav><h2 id="运行脚本" tabindex="-1">运行脚本 <a class="header-anchor" href="#运行脚本" aria-hidden="true">#</a></h2><p>运行c++脚本 <code>./waf --run=app_name --command-template=&quot;%s --arg_name=arg_value&quot; </code>。要调用gdb可以在command-template里面加，如<code>--command-template=&quot;gdb %s --arg_name=arg_value&quot; </code>。</p><p>如果是python脚本，是要用 <code>./waf --pyrun=app_path --command-template=&quot;%s --arg_name=arg_value&quot; </code>。注意这里要用路径，不像运行c++脚本可以直接写<code>scratch</code>目录下的脚本名字。</p><p>跑python脚本的时候在<code>scratch</code>目录生成<code>__pycache__</code>可能会导致任务执行失败，要及时清理掉cache。也可以改ns3根目录下的<code>wscript</code>中的<code>def add_scratch_programs(bld)</code>函数自动跳过该目录。</p><h2 id="本地编译文档" tabindex="-1">本地编译文档 <a class="header-anchor" href="#本地编译文档" aria-hidden="true">#</a></h2><p>在线文档有些慢，不如在本地编译一个。需要安装doxygen，同时重新配置一下waf</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">apt-get</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">doxygen</span></span>
<span class="line"><span style="color:#82AAFF;">.</span><span style="color:#FFCB6B;">/waf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">configure</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--enable-examples</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--enable-tests</span></span>
<span class="line"><span style="color:#82AAFF;">.</span><span style="color:#FFCB6B;">/waf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--doxygen</span></span>
<span class="line"></span></code></pre></div><p>如果出现错误提示某些脚本里存在<code>&#39;\\r&#39;</code>不能识别，可能是因为Linux下换行符和Windows下不同，用VScode这些编辑器转换CRLF到LF就行了。</p><h2 id="trace" tabindex="-1">Trace <a class="header-anchor" href="#trace" aria-hidden="true">#</a></h2><p>ns3的trace系统定义了一系列的source去追踪不同的变量，在变量发生变化时可以触发sink记录这种变化。在运行模拟实验时，通过用户定义的回调函数来做为trace souce的trace sink。这些source回调函数一般在类内定义为私有变量，命名规则为<code>m_aTraceFunction</code>。在定义的时候，这些回调函数的类型为<code>TracedCallback&lt;T1, T2, ...&gt; </code>。</p><p>需要指出，ns3的回调函数的返回类型默认都是<code>void</code>，模板中的<code>T</code>是回调函数的参数变量类型。那么我们在写sink的时候，需要定义成<code>void aTraceSink(std::string context, T1 xx, T2 xx, ...)</code>。这里的<code>std::string context</code>是表明我们自定义sink与哪个source相连接的，即此刻的变化是从哪个节点发出的。</p><p>绑定sink回调时候使用<code>Config::Connet(a context, MakeCallback(&amp;aTraceSink))</code>。</p><p>自定义sink的时候，<code>std::string context</code>参数也可以省略掉，写成<code>void anotherTraceSink(T1 xx, T2 xx, ...)</code>，在绑定到监听的对象上时使用的是<code>Config::ConnectWithoutContext</code>。</p><p>绑定sink也可以用<code>obj.TraceConnect</code>和<code>obj.TraceConnectWithoutContext</code>绑定到一个具体的对象上，用法与<code>Config::Connect</code>类似，因为后者本来就是调用了前者实现的，详见官方tutorial。</p><h2 id="context" tabindex="-1">Context <a class="header-anchor" href="#context" aria-hidden="true">#</a></h2><p>Context其实就是节点、应用、函数的名字，比如<code>/NodeList/*/DeviceList/*/$ns3::WifiNetDevice/Mac/$ns3::AdhocWifiMac/Txop/CwTrace</code>写的是任意节点上的任意网卡上的任意无线网卡上的Mac层的传输时的congestion window的Trace？然后在ns3文档的api列表中找到<code>CwTrace</code>的定义，写一个回调用<code>Config::Connect</code>到这个context就可以监听了。用下面的函数可以便捷地从Context中提取NodeId。</p><div class="language-cpp"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">uint32_t</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ContextToNodeId</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">std</span><span style="color:#89DDFF;">::</span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">context</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">std</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">string sub </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> context</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">substr</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">);</span><span style="color:#676E95;font-style:italic;"> // skip &quot;/NodeList/&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">uint32_t</span><span style="color:#A6ACCD;"> pos </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> sub</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">find</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/Device</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">NS_LOG_DEBUG</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Found NodeId </span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">atoi</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">sub</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">substr</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> pos</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">c_str</span><span style="color:#89DDFF;">()));</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">atoi</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">sub</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">substr</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> pos</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">c_str</span><span style="color:#89DDFF;">());</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="在已有的模块里新增文件" tabindex="-1">在已有的模块里新增文件 <a class="header-anchor" href="#在已有的模块里新增文件" aria-hidden="true">#</a></h2><p>记得改模块目录下的wscript，把新增的文件编译进<code>build/ns3</code>里，否则去<code>scrach</code>下写测试还是找不到新增的文件。</p><p>有时候会破坏python binding的文件依赖，不会改模块binding目录下的设置，把python binding关了不要生成python的对应包了= =<code>.\\build -- --diable-python</code> 或者<code>.\\nsxxx\\waf configure --disable-python</code></p><p>如果是新增模块，可以用waf自动生成，详见官方文档。</p><h2 id="python-binding" tabindex="-1">Python binding <a class="header-anchor" href="#python-binding" aria-hidden="true">#</a></h2><p>如果不需要python binding，只用C++，官方建议就是直接用<code>./build.py -- --disable-python </code>或<code>./waf --disable-python</code>，这样build快而且不会出现和python有关的问题。</p><p>如果想用python binding，但激活了Anaconda中的环境，在build时python binding会无法enable。</p><p>使用<code>.\\waf configure</code>之后，发现具体问题是&quot;Testing pyembed configuration : Could not build a python embedded interpreter&quot;错误。</p><p>似乎很多使用waf构建的项目中都会出现这个问题，我找不到合适的解决方法。尝试把anaconda环境deactivated掉就好了。这里deactivated后，最好改一下<code>build.py</code> 和<code>waf</code>中的解释器，默认是<code>#! /usr/bin/env python</code>在一些机器上可能会去调用<code>pyhon2</code>。改成<code>#! /usr/bin/env python3</code>。</p><p>然后在用官方提供的<code>build.py</code>脚本或者用<code>waf</code>构建后，再激活Anaconda中的某个环境，<code>waf</code>会自动link一遍build过的python binding，在Anaconda的某个环境里就可用了~</p><p>可惜一切努力全部木大了。python binding不支持很多底层的api，而且<strong>不支持使用回调的tracing</strong>，只可以使用pcap和ascii文件。同时后面会提到的一个repo，我这边又build不了，这也导致我只能去考虑在ns3中混编python，遇到了很多新坑。</p><h2 id="ns3混编-embedding-python" tabindex="-1">ns3混编(embedding) Python <a class="header-anchor" href="#ns3混编-embedding-python" aria-hidden="true">#</a></h2><p>直接用python binding是不可能了，虽然有C++的tensorflow，但是看了一下配置又很麻烦。就想用cpp调用python，查了一下写了一些测试似乎很方便嘛。想着这样算法的实现上可以用python灵活简单一点，也有大段现成的算法实现。那就看看怎么embedding python into c++。😋</p><h3 id="一般情况下的c-python混编" tabindex="-1">一般情况下的c++/python混编 <a class="header-anchor" href="#一般情况下的c-python混编" aria-hidden="true">#</a></h3><p>一般的情况下，在C++中混编python只需要加上python的头文件<code>#include &#39;Python.h&#39;</code> （这里要注意可能需要用绝对路径，看你python怎么装的），然后为g++添加如下参数进行编译就行了</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">g++</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">callpy.cpp</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#FFCB6B;">python3-config</span><span style="color:#C3E88D;"> --cflags</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#FFCB6B;">python3-config</span><span style="color:#C3E88D;"> --ldflags</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">-fPIC</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 添加的参数会自动展开为头文件和链接库参数</span></span>
<span class="line"></span></code></pre></div><p>使用<code>Py_Initialize ();</code>和<code>Py_Finalize ();</code>可以初始化和关闭Python解释器。在C++中，python的变量都被创建为一个类型为<code>PyObject</code>的指针。</p><p>模块导入方面，若是使用 <code>PyRun_SimpleString (&quot;import os&quot;);</code>导入模块，则模块在C++代码中可见，可以使用<code>PyRun_SimpleString (print(os.getcwd())；</code>若使用的是 <code>pName = PyUnicode_DecodeFSDefault (&quot;os&quot;); pModule = PyImport_ImportModule (pName);</code>导入模块，则无法通过\`\`PyRun_SimpleString<code>去使用</code>os\`。</p><p>使用<code>PyModule_GetDict(pModule)</code>从模块中获取一个字典结构。</p><p>使用<code>pFunc = PyDict_GetItemString(pDict,&quot;disp&quot;)</code>去从字典中获取名为<code>disp</code>的函数，使用<code>PyCallable_Check(pFunc)</code>检查获取的指针是否指向一个可以调用的函数。</p><p><code>pArgs = PyTuple_New(0)</code>创建一个空的元组<code>pArgs</code>去作为函数参数，它可以通过<code> PyTuple_SetItem(pArgs, 0, Py_BuildValue(&quot;&quot;));</code> 初始化，之后使用<code>PyObject_CallObject (pFunc, pArgs);</code>调用函数。</p><p>使用函数<code>PyObject* Py_BuildValue(char *format, ...)</code>可以把C++的变量转换成一个Python对象。当需要从C++传递变量到Python时，就会使用这个函数。<code>format</code>参数中常用的格式有</p><ul><li>i 表示int</li><li>I 表示unsigned int</li><li>f 表示float</li><li>O 表示一个Python对象</li><li>更多见Python<a href="https://docs.python.org/3/c-api/arg.html" target="_blank" rel="noreferrer">文档</a></li></ul><p>例如<code>PyTuple_SetItem(pArgs, 0, Py_BuildValue(&quot;i&quot;,3));</code>，把第一个参数设置成了整型变量3。如果是直接用去构造函数的参数，往往需要写成元组形式如<code>pArgs=Py_BuildValue(&quot;(ii)&quot;,3,3)</code>，在只有一个参数的时候尤其需要注意如<code>pArgs=Py_BuildValue(&quot;(i)&quot;,3)</code>。想要取出python函数的返回值要用<code>PyArg_Parse</code>或<code>PyArg_ParseTuple</code>，使用引用传递按上面的<code>format</code>字符串赋值给C++变量，如<code>PyArg_Parse (retObj, &quot;d&quot;, &amp;ret);</code>。这些api在使用的时候一定要注意<code>format</code>字符串中的数据格式！如果把数据格式写错了，bug会很难找。</p><p>使用<code>instanceObj = PyObject_CallMethod(pModule,&quot;clsName&quot;,NULL);</code>可以创建一个<code>clsName</code>类型的对象。对象的<code>disp</code>方法可以用<code> PyObject_CallMethod(instanceObj,&quot;disp&quot;,NULL)</code>调用，如果附加参数的话需要直接用前面<code>format</code>参数的模板语法。（官方文档推荐使用<code>PyInstanceMethod_New</code>去创建实例，但是实际使用时似乎创建失败也不会返回NULL，导致很难debug）。</p><p>在python代码中使用面向对象的思想，是为了维护一些在C++中调用方法去更改的变量。后来测试发现在C++中使用<code>PyImport_ImportModule()</code>加载模块后，模块中的全局变量会自动加载，因此在调用函数的时候，也可以通过global关键字维护全局变量，避免使用对象的概念，在C++里调用的时候会简单一些。</p><p>如果在C++中导入py脚本出现错误，试着先独立运行python脚本，确保它是正确的。出现问题时尝试print输出调试，python中的错误没法报出来，只能<code>print()</code>输出调试。</p><p>更多具体的混编写法，可以参考<a href="https://docs.python.org/3/c-api/" target="_blank" rel="noreferrer">python官方文档</a>中的介绍。</p><h3 id="可行方案-修改wscript" tabindex="-1">可行方案：修改wscript <a class="header-anchor" href="#可行方案-修改wscript" aria-hidden="true">#</a></h3><p>但是写了一段时间真把cpp和python往一起整合的时候，才发现，“不对啊，ns3是用waf去管理编译过程的”。👿天真地以为把<code>build</code>目录下的<code>ns3</code>头文件和<code>lib</code>里的动态链接库的路径都加到g++后就行了。但是果然失败了……</p><p>于是求助万能的google，可惜网上似乎没有这么干的人= =。没办法，自己去读了一下<a href="https://waf.io/apidocs/tools/python.html" target="_blank" rel="noreferrer">waf的文档</a>吧，刚好发现了这段</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># Support for Python, detect the headers and libraries and provide use variables to link C/C++ programs against them:</span></span>
<span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">options</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">opt</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">	opt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">load</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">compiler_c python</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">configure</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">conf</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    conf</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">load</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">compiler_c python</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    conf</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">check_python_version</span><span style="color:#89DDFF;">((</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#A6ACCD;">    conf</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">check_python_headers</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">build</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">bld</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    bld</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">program</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">features</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">pyembed</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">source</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">a.c</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">target</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">myprog</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    bld</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">shlib</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">features</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">pyext</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">source</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">b.c</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">target</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">mylib</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><p>假设环境都合适，那这段的意思就是，要在waf中使用c++和python混编，只需要在<code>build</code>函数里面调用 <code>bld.program(features=&#39;pyembed&#39;, source=&#39;a.c&#39;, target=&#39;myprog&#39;)</code>。再浓缩一下，就是要把生成程序的函数的<code>feature</code>参数设置成<code>&#39;pyembed&#39;</code>。这下我们知道了混编python改waf配置就可以了。</p><p>经过尝试，对于ns3的具体做法是打开ns3主目录下的<code>wscript</code>，搜索一下<code>options</code>函数在哪里，然后做如下改动。</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 修改原来的option函数，加载python解释器</span></span>
<span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">options</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">opt</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;"># options provided by the modules</span></span>
<span class="line"><span style="color:#A6ACCD;">    opt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">load</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">compiler_c</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    opt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">load</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">compiler_cxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    opt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">load</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">cflags</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    opt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">load</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">gnu_dirs</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    opt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">load</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">python</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;"># other commands</span></span>
<span class="line"></span></code></pre></div><p><code>configure</code>函数似乎是可改可不改的，毕竟是自己的机子，默认没问题，不检查环境也行~</p><p>重要的是创建程序时的<code>features</code>参数。因为依赖复杂，ns3的wscript写法也比较复杂，和上面简单的waf示例脚本不同，ns3的wscript中为每个程序创建了一个对象，分别设置各种选项，然后为每个程序添加依赖项。这里我们需要找到<code>create_ns3_program</code>函数的定义，然后做如下修改</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 在features参数后面添加一个pyembed就行了</span></span>
<span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">create_ns3_program</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">bld</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">name</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">dependencies</span><span style="color:#89DDFF;">=(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">core</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,)):</span></span>
<span class="line"><span style="color:#A6ACCD;">    program </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">bld</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">features</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">cxx cxxprogram pyembed</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># waf可以通过空格分隔选项</span></span>
<span class="line"><span style="color:#A6ACCD;">    program</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">is_ns3_program</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">True</span></span>
<span class="line"><span style="color:#A6ACCD;">    program</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">name</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> name</span></span>
<span class="line"></span></code></pre></div><p>这样做其实挺粗暴的，其他一些没有用python的cpp代码也会被添加这项feature，可能更好的做法是单独在<code>scratch</code>下写wscript，但是我不会💔。</p><p>另外因为会有<code>__pycache__</code>生成，最好再在上面的wscript中添加如下代码，在编译时跳过cache，否则要每次清理掉cache再编译。</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">add_scratch_programs</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">bld</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">try</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        ...</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> os</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isdir</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">os</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">join</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scratch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> filename</span><span style="color:#89DDFF;">)):</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> filename </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">__pycache__</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;font-style:italic;">continue</span></span>
<span class="line"><span style="color:#A6ACCD;">            ...</span></span>
<span class="line"></span></code></pre></div><p>还有需要注意的一点是，如果在cpp中导入了自己的python包，要注意下包的路径，否则会找不到。因为ns3的脚本运行时候的路径是在根目录。可以把包copy到ns3的根目录，或者在用<code>PyRun_SimpleString (&quot;sys.path.append(&#39;./where you place package&#39;)&quot;);</code>加个路径。</p><p>如果是用 anaconda 这种，还需要向路径中添加当前环境的包的位置。</p><p>改完之后，万幸，代码能跑起来了~</p><p>体会就是“只要我们不停下脚步，道路就会不断延伸”。</p><p>▏n<br> █▏　､⺍<br> █▏ ⺰ʷʷｨ<br> █◣▄██◣<br> ◥██████▋<br> 　◥████ █▎<br> 　　███▉ █▎<br> 　◢████◣⌠ₘ℩<br> 　　██◥█◣\\≫<br> 　　██　◥█◣<br> 　　█▉　　█▊<br> 　　█▊　　█▊<br> 　　█▊　　█▋<br> 　　 █▏　　█▙<br> 　　 █</p><h3 id="两年后重新编译这个混编的项目" tabindex="-1">两年后重新编译这个混编的项目 <a class="header-anchor" href="#两年后重新编译这个混编的项目" aria-hidden="true">#</a></h3><p>混编是基于<a href="https://bitbucket.org/ns3lteu/ns-3-dev-lbt/src/laa-wifi-coexistence/src/" target="_blank" rel="noreferrer">别人做 lte-u 的版本</a> 做的，只是在 scratch 目录下面添加了自己的代码。</p><p>我现在的 WSL 是安装的 Ubuntu 20，默认是 gcc9 和 python3.9，但是很奇怪的是 <code>/usr/include/</code> 下默认是安装的 python3.8-dev 的头文件，混编很麻烦会有各种奇怪的问题，没法编译过。当时没有写清楚配置，现在又麻烦了。</p><p>既然已经想不起来当时的配置了，只能排列组合尝试了（没有找到 gcc、python-dev 和 python 的对应版本的表）。最后确认是 gcc 7.3，python3.6-dev 和 Python 3.5，成功编译过了。但是当时肯定不是这个组合的，python 代码里用了 <code>f&quot;{}&quot;</code>格式字符串，应该当时是在 python3.6 以上的。</p><p>安装 gcc 7.3：apt 源上的gcc7 不是 gcc 7.3，是 gcc 7.5，会有 LTO 不匹配的问题，类似于 <a href="https://segmentfault.com/a/1190000022655994" target="_blank" rel="noreferrer">该老哥碰到的</a>。所以 gcc 7.3 要从头编译，之后可以用 update-alternative 管理下本机的多版本 gcc，注意在编译 ns3 项目的时候切换回来就行了，同时保持 g++ 和 gcc 版本一致。编译过程中可能会碰到 glibc 新版本丢弃掉了 <code>&lt;sys/ustat.h&gt;</code> 的 <a href="https://blog.csdn.net/weixin_46584887/article/details/122538399" target="_blank" rel="noreferrer">问题</a> 和一个静态检查的<a href="https://stackoverflow.com/questions/63437209/error-narrowing-conversion-of-1-from-int-to-long-unsigned-int-wnarrowi" target="_blank" rel="noreferrer">问题</a>。</p><p>想要安装低版本的 python3.6-dev，想要添加额外的源，可以参考这个<a href="https://stackoverflow.com/questions/43621584/why-cant-i-install-python3-6-dev-on-ubuntu16-04" target="_blank" rel="noreferrer">链接</a>。注意要安的是 python3.6-dev，确保 <code>/usr/include</code> 下有 python3.6 头文件目录，代码里会引用这个下面的 <code>Python.h</code>。最新的 conda 安装目录下的 <code>include</code> 中默认携带的是 python3.9-dev 的头文件，不能直接拿来用。</p><p>之后 conda 里安 python 3.6 的环境，否则也可能会报 LTO 版本不一致问题。此时可以在进入到 conda 的 python 3.6 环境下编译 ns3 项目了。</p><p>以及 Python 出问题的地方可以用，<code>PyErr_Print()</code> 函数可以用来打印错误信息。</p><h3 id="补充-ns3文档中相关内容" tabindex="-1">补充：ns3文档中相关内容 <a class="header-anchor" href="#补充-ns3文档中相关内容" aria-hidden="true">#</a></h3><p>事实上，对于在编译时添加别的依赖ns3文档中有<a href="https://www.nsnam.org/wiki/HOWTO_use_ns-3_with_other_libraries" target="_blank" rel="noreferrer">相关描述</a>（当然去读主目录下的<code>wscript</code>也可以发现，可以试着在<code>wscript</code>中搜索<code>CXXFLAGS</code>），可以用<code>CCFLAGS_EXTRA</code>这些选项为编译器添加参数或者在<code>wscript</code>里面改，原因是<code>wscript</code>中这样定义过了</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># append user defined flags after all our ones</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">confvar</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> envvar</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">CCFLAGS</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">CCFLAGS_EXTRA</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">                          </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">CXXFLAGS</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">CXXFLAGS_EXTRA</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">                          </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">LINKFLAGS</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">LINKFLAGS_EXTRA</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">                          </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">LINKFLAGS</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">LDFLAGS_EXTRA</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">]]:</span></span>
<span class="line"></span></code></pre></div><p>于是<a href="https://stackoverflow.com/questions/11876088/how-to-build-ns-3-to-use-c0x-c11-libraries" target="_blank" rel="noreferrer">stackoverflow</a>上有人提到如果是为编译器添加c++11选项可以这么做</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">CXXFLAGS</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">-std=c++0x</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> ./waf build</span></span>
<span class="line"></span></code></pre></div><p>但是我试过这类方法，失败了，原因是用了<code>CXXFLAGS</code>，<code>CXXDEFINES</code>，<code>LINKFLAGS</code>这些参数对<code>python3-config --cflags</code>，<code>python3-config --ldflags</code> 和<code>-fPIC</code>都不合适= =我不知道咋用这种方法设置了。</p><h2 id="一个很有趣的repo" tabindex="-1">一个很有趣的repo <a class="header-anchor" href="#一个很有趣的repo" aria-hidden="true">#</a></h2><p>之前打算用python的binding api，刚好发现了这个repo：<a href="https://github.com/tkn-tub/ns3-gym" target="_blank" rel="noreferrer">ns3-gym</a> 。</p><p>但是把这个repo clone下来后，先去编译ns3的部分，再按README中<code>pip3 install ./src/opengym/model/ns3gym</code>安python的api，不是像其他模块那样用pybindgen自动生成的api。</p><p>但是很可惜没用build成功，具体情况记录在该<a href="https://github.com/tkn-tub/ns3-gym/issues/32" target="_blank" rel="noreferrer">issue</a>。问题主要出在protobuf和zmq上。protobuf作者用了一个比较旧的版本，从PPA拉取后却检测不到，后来发现是登录用户的环境变量没加<code>/usr/bin</code>，这个主要是用来编译<code>src/opengym/model/messages.proto</code>和提供链接库的，编译方法是在<code>src/opengym/model</code>下调用<code>protoc ./messages.proto --cpp_out=./</code>。而且这里如果anaconda环境中安了python版的protobuf，同样需要关掉anaconda的环境，用<code>which protoc</code>看一下吧。zmq的话，作者提到用 <strong>libzmq5-dev</strong>，但是ubuntu16.04上只能找到 <strong>libzmq3-dev</strong>。不过似乎是没有什么兼容性问题的，毕竟最后可以跑起来。zmq这里出问题的原因是作者接受了一个pr，改了api的调用方式，但是我们的版本里某些参数似乎还是optional的。不写平台、版本乱提pr害人不浅= =</p><h2 id="tips" tabindex="-1">TIPS <a class="header-anchor" href="#tips" aria-hidden="true">#</a></h2><ul><li><p>总是考虑去用Helper</p><p>ns3中的很多类都有helper类，尝试使用它们~</p></li><li><p>直接用官方的ShowProgress绑定到std::cout上会有问题</p></li><li><p>Schedule用来安排函数的执行时，只需要指定运行时间并引用函数的指针，如<code>Simulator::Schedule (Seconds (1), &amp;FunctionName)</code>；用来安排某个类的方法的执行时，要写出执行该方法的对象的指针，如如<code>Simulator::Schedule (Seconds (1), &amp;ClassName::FunctionName,ObjectOfTheClass)</code>。</p></li></ul>`,85),l=[p];function t(c,r,y,i,d,D){return o(),n("div",null,l)}const h=s(e,[["render",t]]);export{C as __pageData,h as default};