import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeContent } from "../src/lib/posts/content.mjs";
test("safe editorial formatting survives", () => {
  assert.equal(
    sanitizeContent(
      "<h2>Title</h2><p><strong>Bold</strong> and <em>emphasis</em></p>",
    ),
    "<h2>Title</h2><p><strong>Bold</strong> and <em>emphasis</em></p>",
  );
});
test("stored XSS payloads and active embedded content removed", () => {
  for (const payload of [
    "<script>alert(1)</script>",
    '<svg onload="alert(1)"><script>alert(1)</script></svg>',
    "<img src=x onerror=alert(1)>",
    '<iframe srcdoc="<script>alert(1)</script>"></iframe>',
    '<math><mtext><table><mglyph><style><!--</style><img title="--><img src=1 onerror=alert(1)>">',
    '<p style="background:url(javascript:alert(1))" onclick="alert(1)">ok</p>',
  ]) {
    const result = sanitizeContent(payload);
    assert(!/<(script|svg|img|iframe|math|style)\b/i.test(result));
    assert(!/on(load|error|click)=|style=/i.test(result));
  }
});
test("encoded javascript, protocol-relative and data links removed", () => {
  for (const url of [
    "javascript:alert(1)",
    "java&#x73;cript:alert(1)",
    "jav&#x09;ascript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "//evil.example",
  ])
    assert(
      !sanitizeContent('<a href="' + url + '">click</a>').includes("href="),
    );
});
test("safe links and sanitized idempotence", () => {
  const result = sanitizeContent(
    '<a href="https://example.com" target="_blank" onclick="evil()">Safe & sound</a>',
  );
  assert(result.includes('href="https://example.com"'));
  assert(!result.includes("onclick"));
  assert.equal(sanitizeContent(result), result);
});
test("content body bound and type are enforced", () => {
  assert.throws(() => sanitizeContent({}));
  assert.throws(() => sanitizeContent("x".repeat(120001)));
});

test('raw text end-tag mutation and SVG URI-list payloads remain inert',()=>{for(const input of ['<textarea></textarea/><img src=x onerror="alert(1)">','<xmp></xmp/><img src=x onerror="alert(1)">','<svg><animate attributeName="href" values="https://safe; javascript:alert(1)"/></svg>']){const result=sanitizeContent(input);assert(!/<(?:img|svg|textarea|xmp|animate)\b/i.test(result));assert(!/onerror=/.test(result));}});
