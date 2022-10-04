import{o as s,c as a,a as n}from"./app.79f70f1b.js";const t=n(`<h1 id="vitepress-plugin-props2table" tabindex="-1">VitePress-Plugin-props2table <a class="header-anchor" href="#vitepress-plugin-props2table" aria-hidden="true">#</a></h1><h2 id="install" tabindex="-1">install <a class="header-anchor" href="#install" aria-hidden="true">#</a></h2><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">pnpm i vitepress-plugin-props2table</span></span>
<span class="line"></span></code></pre></div><h2 id="usage" tabindex="-1">usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h2><p>1\u3001add plugin in <code>vite.config.js</code></p><div class="language-typescript"><button class="copy"></button><span class="lang">typescript</span><pre><code><span class="line"><span style="color:#676E95;">// vite.config.ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">props2table</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vitepress-plugin-props2table</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineConfig</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">props2table</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>2\u3001add command in markdown</p><div class="language-markdown"><button class="copy"></button><span class="lang">markdown</span><pre><code><span class="line"><span style="color:#676E95;">&lt;!-- ./path.ts is you file path --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">@props2table(./path.ts)</span></span>
<span class="line"></span></code></pre></div><p>3\u3001and you will see a table</p><h2>PropsAllType</h2><table><thead><tr><th style="white-space:nowrap;text-align:left;"> \u53C2\u6570 </th><th style="white-space:nowrap;text-align:left;"> \u8BF4\u660E </th><th style="white-space:nowrap;text-align:left;"> \u7C7B\u578B </th><th style="white-space:nowrap;text-align:left;"> \u662F\u5426\u5FC5\u586B </th><th style="white-space:nowrap;text-align:left;"> \u53EF\u9009\u503C </th><th style="white-space:nowrap;text-align:left;"> \u9ED8\u8BA4\u503C </th></tr></thead><tbody><tr><td style="white-space:nowrap;text-align:left;"> a</td><td style="white-space:nowrap;text-align:left;"> \u63CF\u8FF0a</td><td style="white-space:nowrap;text-align:left;"> string</td><td style="white-space:nowrap;text-align:left;"> true</td><td style="white-space:nowrap;text-align:left;"></td><td style="white-space:nowrap;text-align:left;"> \u9ED8\u8BA4\u503C\u662F1</td></tr><tr><td style="white-space:nowrap;text-align:left;"> b</td><td style="white-space:nowrap;text-align:left;"> \u63CF\u8FF0b \u662F\u4E00\u4E2A\u679A\u4E3E\u503C</td><td style="white-space:nowrap;text-align:left;"> a | b | c</td><td style="white-space:nowrap;text-align:left;"> true</td><td style="white-space:nowrap;text-align:left;"></td><td style="white-space:nowrap;text-align:left;"> \u9ED8\u8BA4\u503C\u662Fa</td></tr><tr><td style="white-space:nowrap;text-align:left;"> c</td><td style="white-space:nowrap;text-align:left;"> \u63CF\u8FF0c\u662F\u4E00\u4E2A\u5916\u90E8\u5F15\u7528\u7684\u7C7B\u578B</td><td style="white-space:nowrap;text-align:left;"> Props2</td><td style="white-space:nowrap;text-align:left;"> true</td><td style="white-space:nowrap;text-align:left;"></td><td style="white-space:nowrap;text-align:left;"></td></tr><tr><td style="white-space:nowrap;text-align:left;"> e</td><td style="white-space:nowrap;text-align:left;"> \u63CF\u8FF0e \u662F\u4E00\u4E2A\u6570\u7EC4</td><td style="white-space:nowrap;text-align:left;"> string[]</td><td style="white-space:nowrap;text-align:left;"> true</td><td style="white-space:nowrap;text-align:left;"></td><td style="white-space:nowrap;text-align:left;"></td></tr></tbody></table><h2 id="\u81EA\u5B9A\u4E49\u8868\u683C" tabindex="-1">\u81EA\u5B9A\u4E49\u8868\u683C <a class="header-anchor" href="#\u81EA\u5B9A\u4E49\u8868\u683C" aria-hidden="true">#</a></h2><p>1\u3001 \u9700\u8981\u589E\u52A0\u4E00\u4E2Aid\u4EE5\u5BF9\u5E94\u914D\u7F6E\u7684id id\u53EF\u4EE5\u662F\u4EFB\u610F\u503C</p><blockquote><p>\u{1F437}: id\u4E0D\u586B\u4E3A<code>default</code> \u5982\u679C\u60F3\u8981\u591A\u4E2A\u8868\u683C\u4F7F\u7528\u540C\u4E00\u4E2A\u914D\u7F6E\uFF0Cid\u76F8\u540C\u5373\u53EF \u6216\u8005\u91CD\u5199default\u914D\u7F6E</p></blockquote><div class="language-markdown"><button class="copy"></button><span class="lang">markdown</span><pre><code><span class="line"><span style="color:#A6ACCD;">@props2table(./path.ts)</span></span>
<span class="line"></span></code></pre></div><p>2\u3001\u7136\u540E\u5728<code>vite.config.js</code>\u4E2D\u914D\u7F6E</p><div class="language-typescript"><button class="copy"></button><span class="lang">typescript</span><pre><code><span class="line"></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">props2table</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vitepress-plugin-props2table</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineConfig</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">props2table</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;">// id\u5BF9\u5E94\u4E0A\u9762\u7684\u586B\u5199\u7684id</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">myid1</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u81EA\u5B9A\u4E49\u8868\u683C\u6807\u9898</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#F07178;">columns</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">                    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                        </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u81EA\u5B9A\u4E49header\u6807\u9898</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        </span><span style="color:#F07178;">dataKey</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        </span><span style="color:#F07178;">align</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">center</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">                    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                        </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u81EA\u5B9A\u4E49\u63CF\u8FF0--</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        </span><span style="color:#F07178;">dataKey</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">comments.description</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        </span><span style="color:#F07178;">align</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">center</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">                    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                        </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u652F\u6301\u7248\u672C</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        </span><span style="color:#82AAFF;">dataKey</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                        </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`\${</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">comments</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">version </span><span style="color:#89DDFF;">||</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;&#39;}\`</span></span>
<span class="line"><span style="color:#F07178;">                        </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">                    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">                ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>3\u3001\u6700\u540E\u4F60\u4F1A\u770B\u5230\u4E00\u4E2A\u81EA\u5B9A\u4E49\u7684\u8868\u683C</p><h2>\u81EA\u5B9A\u4E49\u8868\u683C\u6807\u9898</h2><table><thead><tr><th style="white-space:nowrap;text-align:center;"> \u81EA\u5B9A\u4E49header\u6807\u9898 </th><th style="white-space:nowrap;text-align:center;"> \u81EA\u5B9A\u4E49\u63CF\u8FF0-- </th><th style="white-space:nowrap;text-align:left;"> \u652F\u6301\u7248\u672C </th></tr></thead><tbody><tr><td style="white-space:nowrap;text-align:center;"> a</td><td style="white-space:nowrap;text-align:center;"> \u63CF\u8FF0a</td><td style="white-space:nowrap;text-align:left;"></td></tr><tr><td style="white-space:nowrap;text-align:center;"> b</td><td style="white-space:nowrap;text-align:center;"> \u63CF\u8FF0b \u662F\u4E00\u4E2A\u679A\u4E3E\u503C</td><td style="white-space:nowrap;text-align:left;"></td></tr><tr><td style="white-space:nowrap;text-align:center;"> c</td><td style="white-space:nowrap;text-align:center;"> \u63CF\u8FF0c\u662F\u4E00\u4E2A\u5916\u90E8\u5F15\u7528\u7684\u7C7B\u578B</td><td style="white-space:nowrap;text-align:left;"></td></tr><tr><td style="white-space:nowrap;text-align:center;"> e</td><td style="white-space:nowrap;text-align:center;"> \u63CF\u8FF0e \u662F\u4E00\u4E2A\u6570\u7EC4</td><td style="white-space:nowrap;text-align:left;"> 1.0.0</td></tr></tbody></table><h2 id="\u53EA\u89E3\u6790\u67D0\u4E2A\u8FD4\u56DE" tabindex="-1">\u53EA\u89E3\u6790\u67D0\u4E2A\u8FD4\u56DE <a class="header-anchor" href="#\u53EA\u89E3\u6790\u67D0\u4E2A\u8FD4\u56DE" aria-hidden="true">#</a></h2><p>\u6709\u4E9B\u60C5\u51B5\u4E0B \u4F60\u4E0D\u60F3\u5230\u628A\u6574\u4E2A\u5BFC\u51FA\u90FD\u89E3\u6790\u51FA\u6765 \u56E0\u6B64\u4F60\u53EF\u4EE5\u6307\u5B9A\u89E3\u6790\u67D0\u4E2A\u8FD4\u56DE</p><div class="language-markdown"><button class="copy"></button><span class="lang">markdown</span><pre><code><span class="line"><span style="color:#676E95;">&lt;!-- \u53EA\u89E3\u6790./path.ts\u6587\u4EF6\u4E0B interface Props \u7684\u8FD4\u56DE --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">@props2table(./path.ts, &#39;default&#39;, &#39;Emits&#39;)</span></span>
<span class="line"></span></code></pre></div><h2>Emits</h2><table><thead><tr><th style="white-space:nowrap;text-align:left;"> \u53C2\u6570 </th><th style="white-space:nowrap;text-align:left;"> \u8BF4\u660E </th><th style="white-space:nowrap;text-align:left;"> \u7C7B\u578B </th><th style="white-space:nowrap;text-align:left;"> \u662F\u5426\u5FC5\u586B </th><th style="white-space:nowrap;text-align:left;"> \u53EF\u9009\u503C </th><th style="white-space:nowrap;text-align:left;"> \u9ED8\u8BA4\u503C </th></tr></thead><tbody><tr><td style="white-space:nowrap;text-align:left;"> eat</td><td style="white-space:nowrap;text-align:left;"> \u5403\u70B9\u4E1C\u897F</td><td style="white-space:nowrap;text-align:left;"> (foods: string) =&gt; void</td><td style="white-space:nowrap;text-align:left;"> true</td><td style="white-space:nowrap;text-align:left;"></td><td style="white-space:nowrap;text-align:left;"></td></tr></tbody></table>`,25),l=[t],i=JSON.parse('{"title":"VitePress-Plugin-props2table","description":"","frontmatter":{},"headers":[{"level":2,"title":"install","slug":"install","link":"#install","children":[]},{"level":2,"title":"usage","slug":"usage","link":"#usage","children":[]},{"level":2,"title":"\u81EA\u5B9A\u4E49\u8868\u683C","slug":"\u81EA\u5B9A\u4E49\u8868\u683C","link":"#\u81EA\u5B9A\u4E49\u8868\u683C","children":[]},{"level":2,"title":"\u53EA\u89E3\u6790\u67D0\u4E2A\u8FD4\u56DE","slug":"\u53EA\u89E3\u6790\u67D0\u4E2A\u8FD4\u56DE","link":"#\u53EA\u89E3\u6790\u67D0\u4E2A\u8FD4\u56DE","children":[]}],"relativePath":"index.md"}'),e={name:"index.md"},y=Object.assign(e,{setup(p){return(o,c)=>(s(),a("div",null,l))}});export{i as __pageData,y as default};
