import{_ as e,c as r,o as t,e as a}from"./app.f30d18e1.js";const m=JSON.parse('{"title":"Sentinel-Rust Middleware Supports","description":"Read examples, plz.","frontmatter":{"title":"Sentinel-Rust Middleware Supports","description":"Read examples, plz.","tags":["Rust","Sentinel","中间件"]},"headers":[{"level":2,"title":"Tonic","slug":"tonic","link":"#tonic","children":[]},{"level":2,"title":"Volo","slug":"volo","link":"#volo","children":[]},{"level":2,"title":"Actix Web","slug":"actix-web","link":"#actix-web","children":[]},{"level":2,"title":"Rocket","slug":"rocket","link":"#rocket","children":[]},{"level":2,"title":"Axum","slug":"axum","link":"#axum","children":[]},{"level":2,"title":"One More Thing","slug":"one-more-thing","link":"#one-more-thing","children":[]},{"level":2,"title":"Sentinel-Rust Resources","slug":"sentinel-rust-resources","link":"#sentinel-rust-resources","children":[]}],"relativePath":"zh/blogs/20230101/index.md"}'),o={name:"zh/blogs/20230101/index.md"},i=a('<nav class="table-of-contents"><ul><li><a href="#tonic">Tonic</a></li><li><a href="#volo">Volo</a></li><li><a href="#actix-web">Actix Web</a></li><li><a href="#rocket">Rocket</a></li><li><a href="#axum">Axum</a></li><li><a href="#one-more-thing">One More Thing</a></li><li><a href="#sentinel-rust-resources">Sentinel-Rust Resources</a></li></ul></nav><h1 id="sentinel-rust-middleware-supports" tabindex="-1">Sentinel-Rust Middleware Supports <a class="header-anchor" href="#sentinel-rust-middleware-supports" aria-hidden="true">#</a></h1><p>Currently <a href="https://github.com/sentinel-group/sentinel-rust" target="_blank" rel="noreferrer">Sentinel-Rust</a> supports following RPC/Web frameworks, and provides thorough <a href="https://github.com/sentinel-group/sentinel-rust/tree/main/middleware" target="_blank" rel="noreferrer">examples</a>.</p><h2 id="tonic" tabindex="-1">Tonic <a class="header-anchor" href="#tonic" aria-hidden="true">#</a></h2><p><a href="https://crates.io/crates/tonic" target="_blank" rel="noreferrer">Tonic</a> is A rust implementation of <a href="https://grpc.io/" target="_blank" rel="noreferrer">gRPC</a>, a high performance, open source, general RPC framework that puts mobile and HTTP/2 first.</p><p>The are two kinds of middlewares in Tonic.</p><p>- <a href="https://docs.rs/tonic/latest/tonic/service/interceptor/trait.Interceptor.html" target="_blank" rel="noreferrer"><code>tonic::service::interceptor::Interceptor</code></a></p><p>- <a href="https://docs.rs/tower/latest/tower/trait.Service.html" target="_blank" rel="noreferrer"><code>tower::Service</code></a></p><p>We have implemented both of them, see <a href="https://crates.io/crates/sentinel-tower" target="_blank" rel="noreferrer">sentinel-tower</a> and <a href="https://crates.io/crates/sentinel-tonic" target="_blank" rel="noreferrer">sentinel-tonic</a> on <a href="http://crates.io" target="_blank" rel="noreferrer">crates.io</a>.</p><p>Here is a <a href="https://forsworns.github.io/zh/blogs/20221108/" target="_blank" rel="noreferrer">post</a> related to its implementation.</p><h2 id="volo" tabindex="-1">Volo <a class="header-anchor" href="#volo" aria-hidden="true">#</a></h2><p><a href="https://crates.io/crates/volo" target="_blank" rel="noreferrer">Volo</a> is a high-performance and strong-extensibility Rust RPC framework that helps developers build microservices.</p><p>Different from the Tower in Tonic, Volo uses the <a href="https://github.com/cloudwego/motore" target="_blank" rel="noreferrer">Motore</a> for service abstraction.</p><p>For more information, see <a href="https://crates.io/crates/sentinel-motore" target="_blank" rel="noreferrer">sentinel-motore</a> on <a href="http://crates.io" target="_blank" rel="noreferrer">crates.io</a>.</p><p>Here is a <a href="https://forsworns.github.io/zh/blogs/20221108/" target="_blank" rel="noreferrer">post</a> related to its implementation.</p><h2 id="actix-web" tabindex="-1">Actix Web <a class="header-anchor" href="#actix-web" aria-hidden="true">#</a></h2><p><a href="https://crates.io/crates/actix-web" target="_blank" rel="noreferrer">Actix Web</a> is a powerful, pragmatic, and extremely fast web framework for Rust</p><p>In general, a middleware in Actix Web is a type that implements the <a href="https://docs.rs/actix-web/4/actix_web/dev/trait.Service.html" target="_blank" rel="noreferrer">Service trait</a> and <a href="https://docs.rs/actix-web/4/actix_web/dev/trait.Transform.html" target="_blank" rel="noreferrer">Transform trait</a>.</p><p>For more information, see <a href="https://crates.io/crates/sentinel-actix" target="_blank" rel="noreferrer">sentinel-actix</a> on <a href="http://crates.io" target="_blank" rel="noreferrer">crates.io</a>.</p><p>Here is a <a href="https://forsworns.github.io/zh/blogs/20221108/" target="_blank" rel="noreferrer">post</a> related to routers and handlers in the Actix-Web.</p><h2 id="rocket" tabindex="-1">Rocket <a class="header-anchor" href="#rocket" aria-hidden="true">#</a></h2><p><a href="https://crates.io/crates/rocket" target="_blank" rel="noreferrer">Rocket</a> is a web framework for Rust that makes it simple to write fast, secure web applications without sacrificing flexibility, usability, or type safety.</p><p>There are two ways to implement a Sentinel middleware in Rocket.</p><p>Intuitively, we can implement the <a href="https://api.rocket.rs/v0.5-rc/rocket/fairing/trait.Fairing.html" target="_blank" rel="noreferrer"><code>Fairing</code></a> trait, just as the common <code>Service</code> traits in other frameworks.</p><p>However, as documented in the Rocket guide,</p><blockquote><p>Rocket’s fairings are a lot like middleware from other frameworks, but they bear a few key distinctions:</p><ul><li>Fairings <strong>cannot</strong> terminate or respond to an incoming request directly.</li><li>Fairings <strong>cannot</strong> inject arbitrary, non-request data into a request.</li><li>Fairings <em>can</em> prevent an application from launching.</li><li>Fairings <em>can</em> inspect and modify the application&#39;s configuration.</li></ul></blockquote><p>Since it cannot terminate or respond to the request directly, the implemented <code>SentinelFairing</code> simply rewrites the URI in the Request to a given route. It can be configured via its own methods or <a href="https://rocket.rs/v0.5-rc/guide/state/#managed-state" target="_blank" rel="noreferrer">managed state</a> of <code>SentinelConfig</code>.</p><p>In fact, Rocket <a href="https://rocket.rs/v0.5-rc/guide/fairings/#overview" target="_blank" rel="noreferrer">suggests</a> using request guards, instead of Fairing in this case,</p><blockquote><p>As a general rule of thumb, only <em>globally applicable</em> actions should be effected through fairings. You should *<strong>not*</strong> use a fairing to implement authentication or authorization (preferring to use a <a href="https://rocket.rs/v0.5-rc/guide/requests/#request-guards" target="_blank" rel="noreferrer">request guard</a> instead) <em>unless</em> the authentication or authorization applies to all or the overwhelming majority of the application. On the other hand, you <em>should</em> use a fairing to record timing and usage statistics or to enforce global security policies.</p></blockquote><p>So we follow this <a href="https://rocket.rs/v0.5-rc/guide/requests/#request-guards" target="_blank" rel="noreferrer">suggestion</a></p><blockquote><p>Request guards appear as inputs to handlers. An arbitrary number of request guards can appear as arguments in a route handler. Rocket will automatically invoke the <a href="https://api.rocket.rs/v0.5-rc/rocket/request/trait.FromRequest.html" target="_blank" rel="noreferrer"><code>FromRequest</code></a> implementation for request guards before calling the handler. Rocket only dispatches requests to a handler when all of its guards pass.</p></blockquote><p>and implemented a <code>SentinelGuard</code>. It can be configured via the <a href="https://rocket.rs/v0.5-rc/guide/state/#managed-state" target="_blank" rel="noreferrer">managed state</a> of <code>SentinelConfig</code>,</p><p>For more information, see <a href="https://crates.io/crates/sentinel-rocket" target="_blank" rel="noreferrer">sentinel-rocket</a> on <a href="http://crates.io" target="_blank" rel="noreferrer">crates.io</a>.</p><h2 id="axum" tabindex="-1">Axum <a class="header-anchor" href="#axum" aria-hidden="true">#</a></h2><p><a href="./.html">Axum</a> is a web application framework that focuses on ergonomics and modularity.</p><blockquote><p>In particular the last point is what sets <code>axum</code> apart from other frameworks. <code>axum</code> doesn&#39;t have its own middleware system but instead uses <a href="https://docs.rs/tower/latest/tower/trait.Service.html" target="_blank" rel="noreferrer"><code>tower::Service</code></a>. This means <code>axum</code> gets timeouts, tracing, compression, authorization, and more, for free. It also enables you to share middleware with applications written using <a href="https://crates.io/crates/hyper" target="_blank" rel="noreferrer"><code>hyper</code></a> or <a href="https://crates.io/crates/tonic" target="_blank" rel="noreferrer"><code>tonic</code></a>.</p></blockquote><p>Therefore, we can reuse the middleware in <a href="https://crates.io/crates/sentinel-tower" target="_blank" rel="noreferrer">sentinel-tower</a>. For more information, visit our <a href="https://github.com/sentinel-group/sentinel-rust/tree/main/middleware/axum" target="_blank" rel="noreferrer">example for Axum</a>.</p><h2 id="one-more-thing" tabindex="-1">One More Thing <a class="header-anchor" href="#one-more-thing" aria-hidden="true">#</a></h2><p>Currently, <a href="https://github.com/sentinel-group/sentinel-rust/wiki/Usage#via-dynamic-datasource" target="_blank" rel="noreferrer">dynamic datasources</a> for sentinel are implemented directly in <a href="https://crates.io/crates/sentinel-core" target="_blank" rel="noreferrer">sentinel-core</a> as customized features. Maybe similar to these middlewares, splitting datasources into individual crates or a single crate with customized features is better...</p><h2 id="sentinel-rust-resources" tabindex="-1">Sentinel-Rust Resources <a class="header-anchor" href="#sentinel-rust-resources" aria-hidden="true">#</a></h2><p><a href="https://github.com/sentinel-group/sentinel-rust/wiki" target="_blank" rel="noreferrer">Tutorial</a><a href="https://docs.rs/sentinel-core/latest/sentinel_core/" target="_blank" rel="noreferrer"> API Doc</a><a href="https://github.com/sentinel-group/sentinel-rust/tree/main/examples" target="_blank" rel="noreferrer">Example Codes</a></p>',41),n=[i];function s(l,c,h,d,p,u){return t(),r("div",null,n)}const g=e(o,[["render",s]]);export{m as __pageData,g as default};
