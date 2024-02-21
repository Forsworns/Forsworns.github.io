import{_ as e,c as a,o as r,e as i}from"./app.df3dc0f5.js";const t="/assets/action.657c2822.png",l="/assets/config.b62d82ef.png",h="/assets/analyzers.f2360409.png",n="/assets/oneshot.3e3059b4.png",I=JSON.parse('{"title":"GhidrAI - Equip Ghidra with LLM","description":"目前仅支持外部用户使用阿里云 DashScope 服务，内部用户使用 Aone 接口，寻求帮助中 :)","frontmatter":{"title":"GhidrAI - Equip Ghidra with LLM","description":"目前仅支持外部用户使用阿里云 DashScope 服务，内部用户使用 Aone 接口，寻求帮助中 :)","tags":["Tools"]},"headers":[{"level":2,"title":"背景介绍","slug":"背景介绍","link":"#背景介绍","children":[]},{"level":2,"title":"其实就是项目 README 翻译","slug":"其实就是项目-readme-翻译","link":"#其实就是项目-readme-翻译","children":[{"level":3,"title":"环境需求","slug":"环境需求","link":"#环境需求","children":[]},{"level":3,"title":"构建 GhidrAI","slug":"构建-ghidrai","link":"#构建-ghidrai","children":[]},{"level":3,"title":"安装 GhidrAI","slug":"安装-ghidrai","link":"#安装-ghidrai","children":[]},{"level":3,"title":"使用 GhidrAI","slug":"使用-ghidrai","link":"#使用-ghidrai","children":[]}]},{"level":2,"title":"画个大饼","slug":"画个大饼","link":"#画个大饼","children":[]}],"relativePath":"zh/blogs/20240220/index.md"}'),s={name:"zh/blogs/20240220/index.md"},o=i('<nav class="table-of-contents"><ul><li><a href="#背景介绍">背景介绍</a></li><li><a href="#其实就是项目-readme-翻译">其实就是项目 README 翻译</a><ul><li><a href="#环境需求">环境需求</a></li><li><a href="#构建-ghidrai">构建 GhidrAI</a></li><li><a href="#安装-ghidrai">安装 GhidrAI</a></li><li><a href="#使用-ghidrai">使用 GhidrAI</a></li></ul></li><li><a href="#画个大饼">画个大饼</a></li></ul></nav><p>项目地址 <a href="https://github.com/Forsworns/GhidrAI" target="_blank" rel="noreferrer">https://github.com/Forsworns/GhidrAI</a></p><h2 id="背景介绍" tabindex="-1">背景介绍 <a class="header-anchor" href="#背景介绍" aria-hidden="true">#</a></h2><p>如果你做过一些逆向工程，那么一定听说过 IDA Pro，但是很可惜，IDA 太贵了。那有没有可以白嫖的类似工具呢？<a href="https://github.com/NationalSecurityAgency/ghidra" target="_blank" rel="noreferrer">Ghidra</a> 是 GitHub 上的一款开源逆向工程工具，使用 Java 开发，天然具有跨平台的特性。目前它的社区仍然十分活跃。与 IDA 类似，它也提供了接口供用户进行插件开发。</p><p><a href="https://github.com/JusticeRage/Gepetto" target="_blank" rel="noreferrer">Gepetto</a> 是 IDA Pro 的一款网红插件（还参加了 IDA 插件大赛但是很可惜没拿奖），问世于前年 ChatGPT 刚刚出圈的时候，所以受到了大量关注和 star。但是很可惜，我买不起 IDA 也没法获取到 OpenAI 的服务。于是在去年萌生了为 Ghidra 开发一个类似插件的想法，一定是要可以白嫖的那种！</p><p>但我最初走偏了，效仿 NBA 球星杜兰特，选择一条最艰难的道路，想在 Ghidra 里面直接跑 Python 代码，从而直接利用 AI 在 Python 的生态。在这里我花了不少时间折腾 Ghidra 的 Python3 插件 <a href="https://github.com/mandiant/Ghidrathon" target="_blank" rel="noreferrer">Ghidrathon</a> 和 <a href="https://github.com/ninia/jep" target="_blank" rel="noreferrer">Jep</a>。当时也碰到了一些问题，很感谢 Ghidrathon 的维护者最后帮忙解决了。 但是随着时间的发展，可以白嫖的途径越来越多，比如我最后选用的 <a href="https://help.aliyun.com/zh/dashscope/developer-reference/activate-dashscope-and-create-an-api-key" target="_blank" rel="noreferrer">阿里云 DashScope</a>，模型上新都会有免费体验的时间。公司内部的话，则选择偷偷使用 Aone Copilot 的接口，开源社区也有很多一键搭建本地 LLM 服务的项目。而且在我们的需求场景下，模型的输入和输出都很长，网络通信的这点耗时和推理用时比起来根本不值一提。于是我意识到：人生苦短，我不能再折腾 Python 了。</p><p>抱着上述想法，终于在这次过年的时候，我开发了插件 <a href="https://github.com/Forsworns/GhidrAI" target="_blank" rel="noreferrer">GhidrAI</a>。由于本人不是专业的 Java 开发人员，如果你发现代码写得很烂，敬请斧正，来者不拒。</p><h2 id="其实就是项目-readme-翻译" tabindex="-1">其实就是项目 README 翻译 <a class="header-anchor" href="#其实就是项目-readme-翻译" aria-hidden="true">#</a></h2><p>GhidrAI 是一个 Ghidra 扩展，使用 <a href="https://help.aliyun.com/zh/dashscope/developer-reference/activate-dashscope-and-create-an-api-key" target="_blank" rel="noreferrer">阿里云 LLM 服务</a> 来解释函数的作用，并自动重命名其变量。最重要的是，这些服务是免费的！</p><h3 id="环境需求" tabindex="-1">环境需求 <a class="header-anchor" href="#环境需求" aria-hidden="true">#</a></h3><p>目前仅在 Ghidra 10.4 上验证了 GhidrAI。注意：Ghidra 10.4 需要 <a href="https://adoptium.net/temurin/releases/" target="_blank" rel="noreferrer">JDK 17 64-bit</a>。</p><h3 id="构建-ghidrai" tabindex="-1">构建 GhidrAI <a class="header-anchor" href="#构建-ghidrai" aria-hidden="true">#</a></h3><p>使用以下步骤为您的环境构建 GhidrAI</p><ul><li>从 <a href="https://github.com/NationalSecurityAgency/ghidra/blob/stable/GhidraDocs/InstallationGuide.html#InstallationNotes" target="_blank" rel="noreferrer">此处</a> 安装 Ghidra。</li><li>从 <a href="https://gradle.org/releases" target="_blank" rel="noreferrer">此处</a> 安装 Gradle。 从 <a href="https://github.com/Forsworns/GhidrAI" target="_blank" rel="noreferrer">此处</a> 下载最新的 GhidrAI 发布版。</li></ul><p>在 GhidrAI 源目录中运行以下命令： 注意：<strong>您可以选择设置名为 <code>GHIDRA_INSTALL_DIR</code> 的环境变量，而不是指定 <code>-PGHIDRA_INSTALL_DIR</code>。</strong></p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">gradle</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-PGHIDRA_INSTALL_DIR=</span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">Ghidra</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">安装的绝对路</span><span style="color:#A6ACCD;">径</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>如果成功，您将在 GhidrAI 源目录中找到一个名为 <code>dist</code> 的新目录，其中包含您的 GhidrAI 扩展（.zip）。如果您遇到任何问题，请打开一个新问题。（运行中的问题请提供 <code> ~/.ghidra/.ghidra_${VERSION}/application.log</code> 中的日志文件。）</p><h3 id="安装-ghidrai" tabindex="-1">安装 GhidrAI <a class="header-anchor" href="#安装-ghidrai" aria-hidden="true">#</a></h3><p>使用以下步骤将您的 GhidrAI 扩展安装到 Ghidra：</p><ul><li>注意： <strong>对于 <a href="https://help.aliyun.com/zh/dashscope/developer-reference/activate-dashscope-and-create-an-api-key" target="_blank" rel="noreferrer">阿里云 DashScope</a>，您必须使用 DASHSCOPE_API_KEY 环境变量。</strong></li><li>启动 Ghidra</li><li>转至 <code>File &gt; Install Extensions...</code></li><li>点击绿色 + 按钮</li><li>导航到您之前构建的 GhidrAI 扩展（.zip）</li><li>点击 <code>确定</code></li><li>重新启动 Ghidra</li></ul><p>或</p><p>您可以直接将 GhidrAI 扩展（.zip）解压缩到 <code>&lt;Ghidra 安装的绝对路径&gt;\\Ghidra\\Extensions</code>，Ghidra 将在下次启动时提示您配置 GhidrAI。</p><h3 id="使用-ghidrai" tabindex="-1">使用 GhidrAI <a class="header-anchor" href="#使用-ghidrai" aria-hidden="true">#</a></h3><p><strong>选中</strong> 函数并点击鼠标右键，可以找到 GhidrAI 对应的选项。图中右边的紫色注释显然是用 AI 生成的。</p><p><img src="'+t+'" alt="点鼠标右键"></p><p>点击 <code>Tools &gt; GhidrAI</code>，能够找到配置项的对话框，配置项的更多细节可以去读项目中的说明 <a href="https://github.com/Forsworns/GhidrAI/blob/main/data/README.md" target="_blank" rel="noreferrer">说明</a>.</p><p><img src="'+l+'" alt="配置项对话框"></p><p>GhidrAI 也提供了一个自动的分析器，你可以通过 <code>Analysis &gt; Auto Analyze ...</code> 或 <code>Analysis &gt; One Shot</code> 找到它。</p><p><img src="'+h+'" alt="Automatic analyzer"></p><p><img src="'+n+'" alt="One shot analysis"></p><h2 id="画个大饼" tabindex="-1">画个大饼 <a class="header-anchor" href="#画个大饼" aria-hidden="true">#</a></h2><p>我对这个项目还有一些想法，比如：</p><ul><li>首先自然是支持更多的白嫖/付费 LLM 服务途径，去薅各个云厂商的羊毛。</li><li>更一般的支持 <a href="https://github.com/songquanpeng/one-api" target="_blank" rel="noreferrer">One-API</a> 的接口，便捷地请求本地服务。</li><li>支持多个模型生成的结果进行对比，或允许交互选择多个潜在结果，类似现在各类代码补全工具的推荐功能。</li><li>现在的实现其实是非常粗暴的，每次会话并不会携带上下文。希望通过携带更长的上下文，拿到更精确的分析结果，但是相应得响应会更慢？</li></ul>',33),d=[o];function p(c,g,A,G,_,f){return r(),a("div",null,d)}const b=e(s,[["render",p]]);export{I as __pageData,b as default};
