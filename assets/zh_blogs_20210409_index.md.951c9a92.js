import{_ as s,c as a,o as n,e as l}from"./app.db17c96a.js";const F=JSON.parse('{"title":"Makefile 笔记","description":"人傻就要多记笔记","frontmatter":{"title":"Makefile 笔记","description":"人傻就要多记笔记","tags":["C++","配环境"]},"headers":[{"level":2,"title":"伪目标 Phony Target","slug":"伪目标-phony-target","link":"#伪目标-phony-target","children":[]},{"level":2,"title":"预定义的变量","slug":"预定义的变量","link":"#预定义的变量","children":[]},{"level":2,"title":"默认CC","slug":"默认cc","link":"#默认cc","children":[]},{"level":2,"title":"内存泄漏检测","slug":"内存泄漏检测","link":"#内存泄漏检测","children":[]},{"level":2,"title":"代码覆盖率","slug":"代码覆盖率","link":"#代码覆盖率","children":[]},{"level":2,"title":"为目录下所有文件生成目标代码","slug":"为目录下所有文件生成目标代码","link":"#为目录下所有文件生成目标代码","children":[]},{"level":2,"title":"特殊符号","slug":"特殊符号","link":"#特殊符号","children":[]},{"level":2,"title":"赋值符号","slug":"赋值符号","link":"#赋值符号","children":[]},{"level":2,"title":"递归编译多目录","slug":"递归编译多目录","link":"#递归编译多目录","children":[]},{"level":2,"title":"编译时添加宏定义","slug":"编译时添加宏定义","link":"#编译时添加宏定义","children":[]},{"level":2,"title":"杂项","slug":"杂项","link":"#杂项","children":[]},{"level":2,"title":"指定安装目录","slug":"指定安装目录","link":"#指定安装目录","children":[]},{"level":2,"title":"多级目录、多个链接库","slug":"多级目录、多个链接库","link":"#多级目录、多个链接库","children":[]}],"relativePath":"zh/blogs/20210409/index.md"}'),e={name:"zh/blogs/20210409/index.md"},p=l(`<nav class="table-of-contents"><ul><li><a href="#伪目标-phony-target">伪目标 Phony Target</a></li><li><a href="#预定义的变量">预定义的变量</a></li><li><a href="#默认cc">默认CC</a></li><li><a href="#内存泄漏检测">内存泄漏检测</a></li><li><a href="#代码覆盖率">代码覆盖率</a></li><li><a href="#为目录下所有文件生成目标代码">为目录下所有文件生成目标代码</a></li><li><a href="#特殊符号">特殊符号</a></li><li><a href="#赋值符号">赋值符号</a></li><li><a href="#递归编译多目录">递归编译多目录</a></li><li><a href="#编译时添加宏定义">编译时添加宏定义</a></li><li><a href="#杂项">杂项</a></li><li><a href="#指定安装目录">指定安装目录</a></li><li><a href="#多级目录、多个链接库">多级目录、多个链接库</a></li></ul></nav><h1 id="makefile-笔记" tabindex="-1">Makefile 笔记 <a class="header-anchor" href="#makefile-笔记" aria-hidden="true">#</a></h1><p>记录一些遇到的问题</p><h2 id="伪目标-phony-target" tabindex="-1">伪目标 Phony Target <a class="header-anchor" href="#伪目标-phony-target" aria-hidden="true">#</a></h2><p>当目录下路径或文件与 Makefile中 的目标名冲突的时候，可以通过定义伪目标的方式避免冲突：</p><p>如下面这个例子</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">touch</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">clean</span></span>
<span class="line"><span style="color:#FFCB6B;">make</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">clean</span></span>
<span class="line"></span></code></pre></div><p>这样不会执行 Makefile 中定义的 clean 目标，而是会提示我们 <code>clean is up to date</code></p><p>此时需要使用 <code>.PHONY</code> 关键字来定义 clean</p><p>在 Makefile 中需要写</p><div class="language-makefile"><button title="Copy Code" class="copy"></button><span class="lang">makefile</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">.PHONY</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> clean</span></span>
<span class="line"></span></code></pre></div><h2 id="预定义的变量" tabindex="-1">预定义的变量 <a class="header-anchor" href="#预定义的变量" aria-hidden="true">#</a></h2><table><thead><tr><th>预定义变量</th><th>含义</th></tr></thead><tbody><tr><td>AR</td><td>库文件维护程序的名称，默认值为ar</td></tr><tr><td>AS</td><td>汇编程序的名称，默认值为as</td></tr><tr><td>CC</td><td>C 编译器的名称，默认值为cc</td></tr><tr><td>CPP</td><td>C 预编译器的名称，默认值为$(CC) –E</td></tr><tr><td>CXX</td><td>C++编译器的名称，默认值为g++</td></tr><tr><td>FC</td><td>FORTARAN 编译器的名称，默认值为f77</td></tr><tr><td>RM</td><td>文件删除程序的名称，默认值为rm -f</td></tr><tr><td>ARFLAGS</td><td>库文件维护程序的选项，无默认值</td></tr><tr><td>ASFLAGS</td><td>汇编程序的选项，无默认值</td></tr><tr><td>CFLAGS</td><td>C 编译器的选项，无默认值</td></tr><tr><td>CPPFLAGS</td><td>C 预编译的选项，无默认值</td></tr><tr><td>CXXFLAGS</td><td>C++编译器的选项，无默认值</td></tr><tr><td>FFLAGS</td><td>Fortran 编译器的选项，无默认值</td></tr></tbody></table><h2 id="默认cc" tabindex="-1">默认CC <a class="header-anchor" href="#默认cc" aria-hidden="true">#</a></h2><p>在默认情况下，编译器使用 <code>cc</code>，可以通过<code>update-alternatives --list cc</code> 命令查看安装的 C 编译器种类，然后使用 <code>update-alternatives --set cc</code> 按照提示设置。</p><h2 id="内存泄漏检测" tabindex="-1">内存泄漏检测 <a class="header-anchor" href="#内存泄漏检测" aria-hidden="true">#</a></h2><p>之前用过 valgrind 工具辅助分析。还有一个比较好用的是 sanitize，可以在编译时作为 <code>CFLAGS</code> 添加，比如使用 address 选项检测非法内存地址</p><div class="language-makefile"><button title="Copy Code" class="copy"></button><span class="lang">makefile</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">ifeq</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">ASAN</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">1) </span><span style="color:#676E95;font-style:italic;"># 需要定义该参数</span></span>
<span class="line"><span style="color:#A6ACCD;">CFLAGS </span><span style="color:#89DDFF;">+=</span><span style="color:#A6ACCD;"> -fsanitize=address</span></span>
<span class="line"><span style="color:#A6ACCD;">LDFLAGS </span><span style="color:#89DDFF;">+=</span><span style="color:#A6ACCD;"> -fsanitize=address</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">endif</span></span>
<span class="line"></span></code></pre></div><p><code>-fsanitize=leak</code> 则可以检查泄漏</p><h2 id="代码覆盖率" tabindex="-1">代码覆盖率 <a class="header-anchor" href="#代码覆盖率" aria-hidden="true">#</a></h2><p>gcov是在代码运行时统计代码覆盖率的工具，随着gcc一起发布的。 它的使用很简单，需要在编译和链接时增加-fprofile-arcs -ftest-coverage生成二进制文件。</p><div class="language-makefile"><button title="Copy Code" class="copy"></button><span class="lang">makefile</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">ifeq</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">COVERAGE</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">1)</span></span>
<span class="line"><span style="color:#A6ACCD;">CFLAGS </span><span style="color:#89DDFF;">+=</span><span style="color:#A6ACCD;"> -fprofile-arcs -ftest-coverage</span></span>
<span class="line"><span style="color:#A6ACCD;">LDFLAGS </span><span style="color:#89DDFF;">+=</span><span style="color:#A6ACCD;"> -fprofile-arcs</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">endif</span></span>
<span class="line"></span></code></pre></div><p>gcov主要使用.gcno和.gcda两个文件。 .gcno是由-ftest-coverage产生的，它包含了重建基本块图和相应的块的源码的行号的信息。 .gcda是由加了-fprofile-arcs编译参数的编译后的文件运行所产生的，它包含了弧跳变的次数和其他的概要信息。</p><h2 id="为目录下所有文件生成目标代码" tabindex="-1">为目录下所有文件生成目标代码 <a class="header-anchor" href="#为目录下所有文件生成目标代码" aria-hidden="true">#</a></h2><p>可以使用例如下面 Makefile 的写法，使用通配符</p><div class="language-makefile"><button title="Copy Code" class="copy"></button><span class="lang">makefile</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">SOURCES </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#82AAFF;">wildcard</span><span style="color:#C3E88D;"> *.c</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">OBJS </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#82AAFF;">patsubst</span><span style="color:#C3E88D;"> %.c</span><span style="color:#89DDFF;">,</span><span style="color:#C3E88D;">%.o</span><span style="color:#89DDFF;">,$(</span><span style="color:#A6ACCD;">SOURCES</span><span style="color:#89DDFF;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">All</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">OBJS</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><h2 id="特殊符号" tabindex="-1">特殊符号 <a class="header-anchor" href="#特殊符号" aria-hidden="true">#</a></h2><p><code>$@</code> 表示目标文件</p><p><code>$^</code> 表示所有的依赖文件</p><p><code>$&lt;</code> 表示第一个依赖文件</p><p><code>$?</code> 表示比目标还要新的依赖文件列表</p><p><code>$%</code> 仅当目标是函数库文件中，表示规则中的目标成员名。例如，如果一个目标是<code>foo.a(bar.o)</code>，那么，<code>$%</code>就是<code>bar.o</code>，<code>$@</code>就是<code>foo.a</code>。如果目标不是函数库文件，那么，其值为空。</p><p><code>$+</code> 这个变量很像<code>$^</code>，也是所有依赖目标的集合。只是它不去除重复的依赖目标。</p><p><code>$*</code> 这个变量表示目标模式中 <code>% </code>及其之前的部分。如果目标是 <code>dir/a.foo.b</code>，并且目标的模式是<code>a.%.b</code>，那么，<code>$*</code>的值就是<code>dir/a.foo</code>。这个变量对于构造有关联的文件名是比较有较。如果目标中没有模式的定义，那么<code>$*</code>也就不能被推导出，但是，如果目标文件的后缀是make所识别的，那么<code>$*</code>就是除了后缀的那一部分。例如：如果目标是“foo.c”，因为“.c”是make所能识别的后缀名，所以，<code>$*</code>的值就是<code>foo</code>。这个特性是GNU make的，很有可能不兼容于其它版本的make，所以，你应该尽量避免使用<code>$*</code>，除非是在隐含规则或是静态模式中。如果目标中的后缀是make所不能识别的，那么<code>$*</code>就是空值。</p><h2 id="赋值符号" tabindex="-1">赋值符号 <a class="header-anchor" href="#赋值符号" aria-hidden="true">#</a></h2><ul><li><code>=</code> 是最基本的赋值</li><li><code>:=</code> 是覆盖之前的值</li><li><code>?=</code> 是如果没有被赋值过就赋予等号后面的值</li><li><code>+=</code> 是添加等号后面的值</li></ul><h2 id="递归编译多目录" tabindex="-1">递归编译多目录 <a class="header-anchor" href="#递归编译多目录" aria-hidden="true">#</a></h2><p>假设目标代码和可执行文件都在 <code>debug</code> 目录下，其他都是源代码文件，则根目录下 Makefile</p><div class="language-makefile"><button title="Copy Code" class="copy"></button><span class="lang">makefile</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">#设置编译器</span></span>
<span class="line"><span style="color:#A6ACCD;">CC</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">gcc</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#debug文件夹里的makefile文件需要最后执行，所以这里需要执行的子目录要排除debug文件夹，这里使用awk排除了debug文件夹，读取剩下的文件夹</span></span>
<span class="line"><span style="color:#A6ACCD;">SUBDIRS</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">$(</span><span style="color:#82AAFF;">shell</span><span style="color:#C3E88D;"> ls -l | grep ^d | awk &#39;{if(</span><span style="color:#A6ACCD;">$$</span><span style="color:#C3E88D;">9 != &quot;debug&quot;) print </span><span style="color:#A6ACCD;">$$</span><span style="color:#C3E88D;">9}&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#无需下一行的注释代码，因为我们已经知道debug里的makefile是最后执行的，所以最后直接去debug目录下执行指定的makefile文件就行，具体下面有注释</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#DEBUG=$(shell ls -l | grep ^d | awk &#39;{if($$9 == &quot;debug&quot;) print $$9}&#39;)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#记住当前工程的根目录路径</span></span>
<span class="line"><span style="color:#A6ACCD;">ROOT_DIR</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">$(</span><span style="color:#82AAFF;">shell</span><span style="color:#C3E88D;"> pwd</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#最终bin文件的名字，可以更改为自己需要的</span></span>
<span class="line"><span style="color:#A6ACCD;">BIN</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">myapp</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#目标文件所在的目录</span></span>
<span class="line"><span style="color:#A6ACCD;">OBJS_DIR</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">debug/obj</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#bin文件所在的目录</span></span>
<span class="line"><span style="color:#A6ACCD;">BIN_DIR</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">debug/bin</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#获取当前目录下的c文件集，放在变量CUR_SOURCE中</span></span>
<span class="line"><span style="color:#A6ACCD;">CUR_SOURCE</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">\${</span><span style="color:#82AAFF;">wildcard</span><span style="color:#C3E88D;"> *.c</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#将对应的c文件名转为o文件后放在下面的CUR_OBJS变量中</span></span>
<span class="line"><span style="color:#A6ACCD;">CUR_OBJS</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">\${</span><span style="color:#82AAFF;">patsubst</span><span style="color:#C3E88D;"> %.c</span><span style="color:#89DDFF;">,</span><span style="color:#C3E88D;"> %.o</span><span style="color:#89DDFF;">,</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">CUR_SOURCE</span><span style="color:#89DDFF;">)}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#将以下变量导出到子shell中，本次相当于导出到子目录下的makefile中</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> CC BIN OBJS_DIR BIN_DIR ROOT_DIR</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#注意这里的顺序，需要先执行SUBDIRS最后才能是DEBUG</span></span>
<span class="line"><span style="color:#82AAFF;">all</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">SUBDIRS</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">CUR_OBJS</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> DEBUG</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#递归执行子目录下的makefile文件，这是递归执行的关键</span></span>
<span class="line"><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">SUBDIRS</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:ECHO</span></span>
<span class="line"><span style="color:#A6ACCD;">    make -C $@</span></span>
<span class="line"><span style="color:#82AAFF;">DEBUG</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">ECHO</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">#直接去debug目录下执行makefile文件</span></span>
<span class="line"><span style="color:#A6ACCD;">    make -C debug</span></span>
<span class="line"><span style="color:#82AAFF;">ECHO</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    @echo </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">SUBDIRS</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#将c文件编译为o文件，并放在指定放置目标文件的目录中即OBJS_DIR</span></span>
<span class="line"><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">CUR_OBJS</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:%.o:%.c</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">CC</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> -c $^ -o </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">ROOT_DIR</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">OBJS_DIR</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/$@</span></span>
<span class="line"><span style="color:#82AAFF;">CLEAN</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    @rm </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">OBJS_DIR</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/*.o</span></span>
<span class="line"><span style="color:#A6ACCD;">    @rm -rf </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">BIN_DIR</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/*</span></span>
<span class="line"></span></code></pre></div><p>子目录 makefile</p><div class="language-makefile"><button title="Copy Code" class="copy"></button><span class="lang">makefile</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">#子目录的Makefile直接读取其子目录就行，使用 grep 过滤出来目录（ls 后会以d为标识开头）</span></span>
<span class="line"><span style="color:#A6ACCD;">SUBDIRS</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">$(</span><span style="color:#82AAFF;">shell</span><span style="color:#C3E88D;"> ls -l | grep ^d | awk &#39;{print </span><span style="color:#A6ACCD;">$$</span><span style="color:#C3E88D;">9}&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#以下同根目录下的makefile的相同代码的解释</span></span>
<span class="line"><span style="color:#A6ACCD;">CUR_SOURCE</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">\${</span><span style="color:#82AAFF;">wildcard</span><span style="color:#C3E88D;"> *.c</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">CUR_OBJS</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">\${</span><span style="color:#82AAFF;">patsubst</span><span style="color:#C3E88D;"> %.c</span><span style="color:#89DDFF;">,</span><span style="color:#C3E88D;"> %.o</span><span style="color:#89DDFF;">,</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">CUR_SOURCE</span><span style="color:#89DDFF;">)}</span></span>
<span class="line"><span style="color:#82AAFF;">ALL</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">SUBDIRS</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">CUR_OBJS</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">SUBDIRS</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:ECHO</span></span>
<span class="line"><span style="color:#A6ACCD;">    make -C $@</span></span>
<span class="line"><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">CUR_OBJS</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:%.o:%.c</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">CC</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> -c $^ -o </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">ROOT_DIR</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">OBJS_DIR</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/$@</span></span>
<span class="line"><span style="color:#82AAFF;">ECHO</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    @echo </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">SUBDIRS</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><p>生成的目标文件和可执行文件目录<code>debug</code>下 makefile</p><div class="language-makefile"><button title="Copy Code" class="copy"></button><span class="lang">makefile</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">OBJS</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">*.o</span></span>
<span class="line"><span style="color:#A6ACCD;">ODIR</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">obj</span></span>
<span class="line"><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">ROOT_DIR</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">BIN_DIR</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">BIN</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">ODIR</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">OBJS</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">CC</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> -o $@ $^</span></span>
<span class="line"></span></code></pre></div><h2 id="编译时添加宏定义" tabindex="-1">编译时添加宏定义 <a class="header-anchor" href="#编译时添加宏定义" aria-hidden="true">#</a></h2><p>假设代码如下，检查是否存在</p><div class="language-c"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// test.c</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">#include</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">stdio.h</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">#include</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">stdlib.h</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">argc</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">char</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">argv</span><span style="color:#C792EA;">[]</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#89DDFF;">{</span><span style="color:#F07178;">  </span></span>
<span class="line"><span style="color:#F07178;">      </span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">#ifndef</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">A_MACRO</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">printf</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">\\n</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span><span style="color:#F07178;">  </span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">#endif</span><span style="color:#F07178;">  </span></span>
<span class="line"><span style="color:#F07178;">  </span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;">  </span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>命令行直接使用 gcc 编译时，可以传递 <code>-D</code> 参数来定义</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">gcc</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test.c</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">A_MACRO</span></span>
<span class="line"></span></code></pre></div><p>在 Makefile 中，当然可以在 gcc 后面写 -D，也可以直接加在 <code>CFLAGS</code> 中，同时也可以用下面的方式给 make 传递参数决定是否定义该宏</p><div class="language-makefile"><button title="Copy Code" class="copy"></button><span class="lang">makefile</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">MACROS</span><span style="color:#89DDFF;">=</span></span>
<span class="line"><span style="color:#A6ACCD;">CFLAGS</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">-g </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">MACROS</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#82AAFF;">all</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">a.out</span></span>
<span class="line"><span style="color:#A6ACCD;">g++ CFLAGS -o a.out</span></span>
<span class="line"></span></code></pre></div><p>使用 make 时，便可以这样写</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">make</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">DEBUG=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">-D A_MACRO</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><h2 id="杂项" tabindex="-1">杂项 <a class="header-anchor" href="#杂项" aria-hidden="true">#</a></h2><ul><li><p>当没有指明目标时，make 默认执行 Makefile 中定义的第一个目标，也称为默认目标</p></li><li><p>在 Makefile 中，使用 <code>@echo</code> 可以执行 <code>echo</code> 命令</p></li><li><p>在 Makefile 中，目标后可以添加其他目标，表示依赖关系，即当前目标需要这些目标作为支持，会先构建依赖着的其他目标，再执行剩下的命令，即基本语法是</p><div class="language-makefile"><button title="Copy Code" class="copy"></button><span class="lang">makefile</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">target</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> prerequisites</span></span>
<span class="line"><span style="color:#A6ACCD;">	command</span></span>
<span class="line"></span></code></pre></div></li><li><p>直接使用 <code>=</code> 就可以在 Makefile 中定义变量如 <code>CC = gcc</code>，使用 <code>$(CC)</code> 可以读取它</p></li></ul><h1 id="cmake-笔记" tabindex="-1">cmake 笔记 <a class="header-anchor" href="#cmake-笔记" aria-hidden="true">#</a></h1><p>使用 cmake 读取 CMakeList.txt 可以自动生成需要的 Makefile。CMakeList 的语法：</p><h2 id="指定安装目录" tabindex="-1">指定安装目录 <a class="header-anchor" href="#指定安装目录" aria-hidden="true">#</a></h2><p>通过定义 <code>CMAKE_INSTALL_PREFIX:PATH</code> 更改安装路径，在无法获取 sudo 权限时候可以使用这种方式安到当前用户目录下？</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">mkdir</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build</span></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build</span></span>
<span class="line"><span style="color:#FFCB6B;">cmake</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-DCMAKE_INSTALL_PREFIX:PATH=</span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">realpath</span><span style="color:#C3E88D;"> ../install</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">..</span></span>
<span class="line"><span style="color:#FFCB6B;">make</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-j</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">N</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span></span>
<span class="line"></span></code></pre></div><p>例如这个例子中，通过 <code>realpath</code> 获取相对路径的绝对路径名，从而安装在上级的 install 目录下</p><h2 id="多级目录、多个链接库" tabindex="-1">多级目录、多个链接库 <a class="header-anchor" href="#多级目录、多个链接库" aria-hidden="true">#</a></h2><p>例如这里我有一个</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">.</span></span>
<span class="line"><span style="color:#FFCB6B;">├──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">main.c</span></span>
<span class="line"><span style="color:#FFCB6B;">├──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">first.c</span></span>
<span class="line"><span style="color:#FFCB6B;">├──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">first.h</span></span>
<span class="line"><span style="color:#FFCB6B;">└──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">second</span></span>
<span class="line"></span></code></pre></div><p>这样的文件目录，怎么在根目录下构建 <code>main.c</code> 呢？同时依赖于 <code>first.c</code> 文件和 <code>second</code> 目录下的两个库（均为 C 实现），同时 <code>first.c</code> 又依赖于 <code>second</code>目录下的库。</p><p>在根目录下，编写</p><div class="language-cmake"><button title="Copy Code" class="copy"></button><span class="lang">cmake</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">cmake_minimum_required</span><span style="color:#A6ACCD;"> (VERSION 3.10.2)</span></span>
<span class="line"><span style="color:#89DDFF;">project</span><span style="color:#A6ACCD;"> (laser)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">set</span><span style="color:#A6ACCD;">(CMAKE_C_FLAGS </span><span style="color:#C3E88D;">&quot;\${CMAKE_C_FLAGS} -Wall&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">add_definitions</span><span style="color:#A6ACCD;">(-DENABLE_DBG)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># second lib</span></span>
<span class="line"><span style="color:#89DDFF;">add_subdirectory</span><span style="color:#A6ACCD;">(second) </span><span style="color:#676E95;font-style:italic;"># add this directory to project, traverse it, and apply the \`CMakeLists.txt\` inside it</span></span>
<span class="line"><span style="color:#89DDFF;">list</span><span style="color:#A6ACCD;">(APPEND EXTRA_INCLUDES </span><span style="color:#C3E88D;">&quot;\${PROJECT_SOURCE_DIR}/second&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">set_target_properties</span><span style="color:#A6ACCD;">(second PROPERTIES LINKER_LANGUAGE C)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># lib for first main logic</span></span>
<span class="line"><span style="color:#89DDFF;">add_library</span><span style="color:#A6ACCD;">(first first.c)</span></span>
<span class="line"><span style="color:#89DDFF;">target_link_libraries</span><span style="color:#A6ACCD;">(first second) </span><span style="color:#676E95;font-style:italic;"># built target for \`first\` lib would be dependent on on second lib</span></span>
<span class="line"><span style="color:#89DDFF;">target_include_directories</span><span style="color:#A6ACCD;">(first PUBLIC</span></span>
<span class="line"><span style="color:#A6ACCD;">  \${PROJECT_BINARY_DIR}</span></span>
<span class="line"><span style="color:#A6ACCD;">  \${EXTRA_INCLUDES}</span></span>
<span class="line"><span style="color:#A6ACCD;">  ) </span><span style="color:#676E95;font-style:italic;"># the headers in the second lib would be added to include path, so that we do not need to configure relative paths when include them in codes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># main executable file</span></span>
<span class="line"><span style="color:#89DDFF;">set</span><span style="color:#A6ACCD;">(SRC_LIST main.c)</span></span>
<span class="line"><span style="color:#89DDFF;">add_executable</span><span style="color:#A6ACCD;">(laser \${SRC_LIST})</span></span>
<span class="line"><span style="color:#89DDFF;">target_link_libraries</span><span style="color:#A6ACCD;">(laser first)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># or target_link_libraries(laser first second), up to your requirements on second lib</span></span>
<span class="line"></span></code></pre></div><p>对 first 和 second 两个库和 main.c 对应的代码都构建编译 target，通过 <code>target_link_libraries</code> 去声明依赖关系，这样会自动先编译 second 库，再编译 first 库，把 second 库链接给它，再链接 first 库编译 main.c 对应的可执行文件。使用 cmake 就是一个声明依赖关系的过程，而且很多步骤 cmake 都会自动帮忙干。</p><p>那么在 second 目录下，还需要加一个，定义一个名为 second 的库，并用 <code>file()</code> 函数方便地选取目录下所有文件</p><div class="language-cmake"><button title="Copy Code" class="copy"></button><span class="lang">cmake</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">file</span><span style="color:#A6ACCD;">(GLOB SOURCES *.c)</span></span>
<span class="line"><span style="color:#89DDFF;">file</span><span style="color:#A6ACCD;">(GLOB HEADERS *.h)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">add_library</span><span style="color:#A6ACCD;">(second \${SOURCES} \${HEADERS})</span></span>
<span class="line"></span></code></pre></div><h1 id="reference" tabindex="-1">Reference <a class="header-anchor" href="#reference" aria-hidden="true">#</a></h1><p><a href="http://www.gnu.org/software/make/" target="_blank" rel="noreferrer">Make - GNU Project - Free Software Foundation</a></p><p><a href="https://github.com/seisman/how-to-write-makefile" target="_blank" rel="noreferrer">seisman/how-to-write-makefile: 跟我一起写Makefile重制版 (github.com)</a></p><p><a href="https://blog.csdn.net/u014470361/article/details/103447678" target="_blank" rel="noreferrer">gcc编译选项-fprofile-arcs -ftest-coverage之代码覆盖率_夜风的博客-CSDN博客</a></p><p><a href="https://www.cnblogs.com/Shirlies/p/4282182.html" target="_blank" rel="noreferrer">多文件目录下makefile文件递归执行编译所有c文件 - Shirlies - 博客园 (cnblogs.com)</a></p>`,74),o=[p];function c(t,r,i,D,y,C){return n(),a("div",null,o)}const A=s(e,[["render",c]]);export{F as __pageData,A as default};