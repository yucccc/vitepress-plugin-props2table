import{_ as e,c as t,o as s,a}from"./app.9fdf7084.js";const u=JSON.parse('{"title":"Hello VitePress-Plugin-props2table","description":"","frontmatter":{},"headers":[{"level":2,"title":"install","slug":"install","link":"#install","children":[]},{"level":2,"title":"usage","slug":"usage","link":"#usage","children":[]},{"level":2,"title":"question","slug":"question","link":"#question","children":[]}],"relativePath":"index.md"}'),n={name:"index.md"},p=a(`<h1 id="hello-vitepress-plugin-props2table" tabindex="-1">Hello VitePress-Plugin-props2table <a class="header-anchor" href="#hello-vitepress-plugin-props2table" aria-hidden="true">#</a></h1><h2 id="install" tabindex="-1">install <a class="header-anchor" href="#install" aria-hidden="true">#</a></h2><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">pnpm i vitepress-plugin-props2table</span></span>
<span class="line"></span></code></pre></div><h2 id="usage" tabindex="-1">usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h2><p>1\u3001add plugin in <code>vite.config.js</code></p><div class="language-typescript"><button class="copy"></button><span class="lang">typescript</span><pre><code><span class="line"><span style="color:#676E95;">// vite.config.ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">props2table</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vitepress-plugin-props2table</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineConfig</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">props2table</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>2\u3001add command in markdown</p><div class="language-markdown"><button class="copy"></button><span class="lang">markdown</span><pre><code><span class="line"><span style="color:#A6ACCD;">@props2table(./test.ts)</span></span>
<span class="line"></span></code></pre></div><p>3\u3001and you will see a table</p><h2>T2</h2><table><thead><tr><th style="white-space:nowrap;">\u53C2\u6570</th><th style="white-space:nowrap;">\u8BF4\u660E</th><th style="white-space:nowrap;">\u7C7B\u578B</th><th style="white-space:nowrap;">\u53EF\u9009\u503C</th><th style="white-space:nowrap;">\u9ED8\u8BA4\u503C</th></tr></thead><tr><td style="white-space:nowrap;">name</td><td style="white-space:nowrap;">undefined</td><td style="white-space:nowrap;">string</td><td>undefined</td><td style="white-space:nowrap;">undefined</td></tr><tr><td style="white-space:nowrap;">age</td><td style="white-space:nowrap;">undefined</td><td style="white-space:nowrap;">number</td><td>undefined</td><td style="white-space:nowrap;">undefined</td></tr><tr><td style="white-space:nowrap;">sex</td><td style="white-space:nowrap;">\u6027\u522B</td><td style="white-space:nowrap;">\u7537 | \u5973</td><td>undefined</td><td style="white-space:nowrap;">undefined</td></tr><tr><td style="white-space:nowrap;">eat</td><td style="white-space:nowrap;">undefined</td><td style="white-space:nowrap;">(food:string) =&gt; void</td><td>undefined</td><td style="white-space:nowrap;">undefined</td></tr></table><h2>T3</h2><table><thead><tr><th style="white-space:nowrap;">\u53C2\u6570</th><th style="white-space:nowrap;">\u8BF4\u660E</th><th style="white-space:nowrap;">\u7C7B\u578B</th><th style="white-space:nowrap;">\u53EF\u9009\u503C</th><th style="white-space:nowrap;">\u9ED8\u8BA4\u503C</th></tr></thead><tr><td style="white-space:nowrap;">name</td><td style="white-space:nowrap;">undefined</td><td style="white-space:nowrap;">string</td><td>undefined</td><td style="white-space:nowrap;">yuc</td></tr><tr><td style="white-space:nowrap;">age</td><td style="white-space:nowrap;">\u5E74\u9F84</td><td style="white-space:nowrap;">number</td><td>undefined</td><td style="white-space:nowrap;">undefined</td></tr></table><h2>Props2</h2><table><thead><tr><th style="white-space:nowrap;">\u53C2\u6570</th><th style="white-space:nowrap;">\u8BF4\u660E</th><th style="white-space:nowrap;">\u7C7B\u578B</th><th style="white-space:nowrap;">\u53EF\u9009\u503C</th><th style="white-space:nowrap;">\u9ED8\u8BA4\u503C</th></tr></thead><tr><td style="white-space:nowrap;">name</td><td style="white-space:nowrap;">undefined</td><td style="white-space:nowrap;">string</td><td>undefined</td><td style="white-space:nowrap;">yuc</td></tr><tr><td style="white-space:nowrap;">age</td><td style="white-space:nowrap;">\u5E74\u9F84</td><td style="white-space:nowrap;">number</td><td>undefined</td><td style="white-space:nowrap;">undefined</td></tr></table><h2 id="question" tabindex="-1">question <a class="header-anchor" href="#question" aria-hidden="true">#</a></h2><p>1\u3001 hmr not work when change props path</p>`,17),l=[p];function o(d,r,i,c,h,w){return s(),t("div",null,l)}const D=e(n,[["render",o]]);export{u as __pageData,D as default};
